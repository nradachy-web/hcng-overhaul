/**
 * Fills Dr. Christine's own new patient form. The template is her Google
 * Doc exported to PDF (public/assets/forms/hcng-new-patient-form.pdf);
 * every answer is typed onto the blank it belongs to, checkboxes get an X,
 * the circle-one letters (Sex, Marital) get a ring, and the symptom bullets
 * get an X. Coordinates come from formLayout.ts. Text that will not fit its
 * blank shrinks to 6.5pt; anything still too long is cut at the blank and
 * printed in full on an addendum page so nothing the patient typed is lost.
 * Runs entirely in the patient's browser with pdf-lib.
 */

import { PDFDocument, PDFFont, PDFPage, StandardFonts, rgb } from "pdf-lib";
import { asset } from "@/lib/asset";
import { NEW_PATIENT_FORMS_URL } from "@/lib/constants";
import { SECTIONS, ageFromDob, visibleFields, type Answers } from "./fields";
import { LAYOUT, SIGNATURE_NOTE, type Multi, type Ring, type Spot, type Target } from "./formLayout";

const INK = rgb(0.05, 0.1, 0.35);
const PAGE_W = 612;
const PAGE_H = 792;

function isSpot(t: Target): t is Spot {
  return typeof (t as Spot).x === "number" && typeof (t as Spot).p === "number";
}
function isMulti(t: Target): t is Multi {
  return Array.isArray((t as Multi).lines);
}
function isRing(t: Spot | Ring): t is Ring {
  return typeof (t as Ring).cx === "number";
}

/** Date inputs give YYYY-MM-DD; the office reads MM/DD/YYYY. */
function usDate(v: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(v.trim());
  return m ? `${m[2]}/${m[3]}/${m[1]}` : v;
}

/** pdf-lib standard fonts are WinAnsi; strip anything they cannot encode. */
function clean(s: string): string {
  return s
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201c\u201d]/g, '"')
    .replace(/\u2013|\u2014/g, "-")
    .replace(/\s+/g, " ")
    .replace(/[^\x20-\x7e\xa0-\xff]/g, "?")
    .trim();
}

type Overflow = { label: string; text: string };

function drawFit(page: PDFPage, font: PDFFont, spot: Spot, text: string, overflow: Overflow[], label: string): void {
  const t = clean(text);
  if (!t) return;
  const width = spot.w ?? 200;
  let size = 9;
  while (size > 6.5 && font.widthOfTextAtSize(t, size) > width) size -= 0.5;
  if (font.widthOfTextAtSize(t, size) <= width) {
    page.drawText(t, { x: spot.x, y: spot.y, size, font, color: INK });
    return;
  }
  // Cut at the blank, mark it, and carry the full text to the addendum.
  let cut = t;
  while (cut.length > 1 && font.widthOfTextAtSize(`${cut}... (see addendum)`, 6.5) > width) cut = cut.slice(0, -1);
  page.drawText(`${cut.trimEnd()}... (see addendum)`, { x: spot.x, y: spot.y, size: 6.5, font, color: INK });
  overflow.push({ label, text: t });
}

/** Flow one answer across several blank lines; leftovers go to the addendum. */
function drawLines(doc: PDFDocument, font: PDFFont, target: Multi, text: string, overflow: Overflow[], label: string): void {
  const t = clean(text);
  if (!t) return;
  const size = 8.5;
  const words = t.split(" ");
  let i = 0;
  for (const spot of target.lines) {
    const width = spot.w ?? 200;
    let line = "";
    while (i < words.length) {
      const probe = line ? `${line} ${words[i]}` : words[i];
      if (font.widthOfTextAtSize(probe, size) > width) break;
      line = probe;
      i += 1;
    }
    if (!line && i < words.length) {
      // A single word wider than the line: force it, then move on.
      line = words[i];
      i += 1;
    }
    if (line) doc.getPage(spot.p - 1).drawText(line, { x: spot.x, y: spot.y, size, font, color: INK });
    if (i >= words.length) return;
  }
  overflow.push({ label, text: t });
}

function drawMark(page: PDFPage, bold: PDFFont, spot: Spot | Ring): void {
  if (isRing(spot)) {
    page.drawEllipse({ x: spot.cx, y: spot.cy, xScale: spot.rx, yScale: spot.ry, borderColor: INK, borderWidth: 1.1 });
    return;
  }
  page.drawText("X", { x: spot.x, y: spot.y, size: 9, font: bold, color: INK });
}

export async function buildIntakePdf(a: Answers): Promise<Uint8Array> {
  const res = await fetch(asset(NEW_PATIENT_FORMS_URL));
  if (!res.ok) throw new Error("The form template could not be loaded.");
  const doc = await PDFDocument.load(await res.arrayBuffer());
  if (doc.getPageCount() !== 4) throw new Error("The intake template has changed. Please refresh the page and try again.");
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);
  const pages = doc.getPages();
  const at = (p: number) => pages[p - 1];
  const overflow: Overflow[] = [];
  const stamp = new Date().toLocaleString("en-US", { timeZone: "America/Detroit" });

  for (const section of SECTIONS) {
    if (section.when && !section.when(a)) continue;
    for (const field of visibleFields(section, a)) {
      const target = LAYOUT[field.key];
      const raw = a[field.key];
      if (!target || raw === undefined || raw === "") continue;
      if (isMulti(target)) {
        drawLines(doc, font, target, String(raw), overflow, field.label);
      } else if (isSpot(target)) {
        const text =
          field.kind === "date" ? usDate(String(raw)) : field.key.endsWith("_scale") ? `${String(raw)} / 10` : String(raw);
        drawFit(at(target.p), font, target, text, overflow, field.label);
      } else {
        const chosen = Array.isArray(raw) ? raw : [String(raw)];
        for (const c of chosen) {
          const spot = target[c];
          if (spot) drawMark(at(spot.p), bold, spot);
        }
      }
    }
  }

  // The paper form's own "Date:" and "Age:" blanks, which the patient does not type.
  const dateSpot = LAYOUT.date;
  if (isSpot(dateSpot)) {
    drawFit(at(dateSpot.p), font, dateSpot, new Date().toLocaleDateString("en-US", { timeZone: "America/Detroit" }), overflow, "Date");
  }
  const ageSpot = LAYOUT.age;
  if (isSpot(ageSpot)) drawFit(at(ageSpot.p), font, ageSpot, ageFromDob(String(a.dob ?? "")), overflow, "Age");

  // Provenance line under the signature, in the office-use gap.
  drawFit(at(SIGNATURE_NOTE.p), font, SIGNATURE_NOTE,
    `Signed electronically by ${String(a.signature ?? "")} from the patient's own device, submitted ${stamp}.`,
    overflow, "Electronic signature record");

  if (overflow.length) {
    const page = doc.addPage([PAGE_W, PAGE_H]);
    let y = PAGE_H - 60;
    page.drawText("New Patient Intake, addendum", { x: 48, y, size: 13, font: bold, color: INK });
    y -= 16;
    page.drawText(clean(`${String(a.name ?? "")}: answers that did not fit their blank on the form.`), { x: 48, y, size: 9, font, color: INK });
    y -= 24;
    for (const item of overflow) {
      page.drawText(clean(item.label), { x: 48, y, size: 8, font: bold, color: INK });
      y -= 12;
      let line = "";
      for (const w of item.text.split(" ")) {
        const probe = line ? `${line} ${w}` : w;
        if (font.widthOfTextAtSize(probe, 9.5) > PAGE_W - 96) {
          page.drawText(line, { x: 48, y, size: 9.5, font, color: INK });
          y -= 13;
          line = w;
        } else line = probe;
      }
      if (line) {
        page.drawText(line, { x: 48, y, size: 9.5, font, color: INK });
        y -= 13;
      }
      y -= 8;
    }
    page.drawText("2026/2027 Hanczaryk Chiropractic Neurology Group - Patient Confidential", { x: 48, y: 40, size: 8, font, color: INK });
  }

  doc.setTitle(`New Patient Intake, ${clean(String(a.name ?? ""))}`);
  return doc.save();
}

export function toBase64(bytes: Uint8Array): string {
  let s = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    s += String.fromCharCode.apply(null, Array.from(bytes.subarray(i, i + chunk)));
  }
  return btoa(s);
}
