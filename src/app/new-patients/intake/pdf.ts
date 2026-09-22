/**
 * Renders the intake answers as a letter-size PDF in the order of the paper
 * form, entirely in the patient's browser (pdf-lib, standard fonts, no
 * network). Header and "Patient Confidential" footer match the Google Doc.
 * Checkbox groups print as [x] / [ ] lists so the office can scan them the
 * way they scan the paper.
 */

import { PDFDocument, PDFFont, PDFPage, StandardFonts, rgb } from "pdf-lib";
import { SECTIONS, ageFromDob, visibleFields, type Answers, type Field } from "./fields";

const PAGE_W = 612;
const PAGE_H = 792;
const MARGIN = 48;
const CONTENT_W = PAGE_W - MARGIN * 2;
const FOOT = 40;

const INK = rgb(0.15, 0.13, 0.12);
const MUTED = rgb(0.42, 0.38, 0.34);
const RULE = rgb(0.75, 0.72, 0.68);

type Ctx = {
  doc: PDFDocument;
  page: PDFPage;
  y: number;
  regular: PDFFont;
  bold: PDFFont;
  pageNo: number;
  stamp: string;
};

function wrap(text: string, font: PDFFont, size: number, width: number): string[] {
  const lines: string[] = [];
  for (const para of String(text).split(/\r?\n/)) {
    const words = para.split(/\s+/).filter(Boolean);
    let line = "";
    for (const w of words) {
      const probe = line ? `${line} ${w}` : w;
      if (font.widthOfTextAtSize(probe, size) <= width) {
        line = probe;
      } else {
        if (line) lines.push(line);
        line = w;
      }
    }
    lines.push(line);
  }
  return lines.length ? lines : [""];
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
    .replace(/[^\x20-\x7e\xa0-\xff]/g, "?");
}

function footer(ctx: Ctx) {
  const t = clean(`2026/2027 Hanczaryk Chiropractic Neurology Group - Patient Confidential`);
  ctx.page.drawText(t, { x: MARGIN, y: FOOT - 14, size: 8, font: ctx.regular, color: MUTED });
  const p = `Page ${ctx.pageNo}`;
  ctx.page.drawText(p, {
    x: PAGE_W - MARGIN - ctx.regular.widthOfTextAtSize(p, 8),
    y: FOOT - 14,
    size: 8,
    font: ctx.regular,
    color: MUTED,
  });
}

function header(ctx: Ctx, first: boolean) {
  const title = "Hanczaryk Chiropractic Neurology Group";
  const sub = "8185 Holly Rd. Suite 14, Grand Blanc, Michigan 48439   |   810.584.7170";
  ctx.page.drawText(title, {
    x: MARGIN,
    y: PAGE_H - MARGIN,
    size: first ? 15 : 11,
    font: ctx.bold,
    color: INK,
  });
  ctx.page.drawText(sub, {
    x: MARGIN,
    y: PAGE_H - MARGIN - (first ? 18 : 14),
    size: 8.5,
    font: ctx.regular,
    color: MUTED,
  });
  const label = first ? "New Patient Intake" : `New Patient Intake, continued`;
  ctx.page.drawText(label, {
    x: PAGE_W - MARGIN - ctx.regular.widthOfTextAtSize(label, 8.5),
    y: PAGE_H - MARGIN - (first ? 18 : 14),
    size: 8.5,
    font: ctx.regular,
    color: MUTED,
  });
  const ruleY = PAGE_H - MARGIN - (first ? 30 : 24);
  ctx.page.drawLine({ start: { x: MARGIN, y: ruleY }, end: { x: PAGE_W - MARGIN, y: ruleY }, thickness: 0.6, color: RULE });
  ctx.y = ruleY - 18;
}

function newPage(ctx: Ctx) {
  footer(ctx);
  ctx.page = ctx.doc.addPage([PAGE_W, PAGE_H]);
  ctx.pageNo += 1;
  header(ctx, false);
}

function ensure(ctx: Ctx, needed: number) {
  if (ctx.y - needed < FOOT + 10) newPage(ctx);
}

function sectionTitle(ctx: Ctx, title: string) {
  ensure(ctx, 34);
  ctx.y -= 6;
  ctx.page.drawText(clean(title.toUpperCase()), { x: MARGIN, y: ctx.y, size: 9, font: ctx.bold, color: INK });
  ctx.y -= 5;
  ctx.page.drawLine({ start: { x: MARGIN, y: ctx.y }, end: { x: PAGE_W - MARGIN, y: ctx.y }, thickness: 0.5, color: RULE });
  ctx.y -= 14;
}

function paragraph(ctx: Ctx, text: string, size = 8.5) {
  const lines = wrap(clean(text), ctx.regular, size, CONTENT_W);
  ensure(ctx, lines.length * (size + 3) + 6);
  for (const l of lines) {
    ctx.page.drawText(l, { x: MARGIN, y: ctx.y, size, font: ctx.regular, color: MUTED });
    ctx.y -= size + 3;
  }
  ctx.y -= 4;
}

/** Label on one line, value beneath; two columns when both fields are half. */
function valueRow(ctx: Ctx, fields: { field: Field; value: string }[]) {
  const cols = fields.length;
  const colW = (CONTENT_W - (cols - 1) * 14) / cols;
  const labelSize = 7.5;
  const valueSize = 10;
  const wrapped = fields.map((f) => wrap(clean(f.value || " "), ctx.regular, valueSize, colW));
  const tallest = Math.max(...wrapped.map((w) => w.length));
  const rowH = labelSize + 4 + tallest * (valueSize + 3) + 8;
  ensure(ctx, rowH);
  fields.forEach((f, i) => {
    const x = MARGIN + i * (colW + 14);
    ctx.page.drawText(clean(f.field.label), { x, y: ctx.y, size: labelSize, font: ctx.regular, color: MUTED });
    let y = ctx.y - labelSize - 4;
    for (const l of wrapped[i]) {
      ctx.page.drawText(l, { x, y: y - valueSize + 2, size: valueSize, font: ctx.bold, color: INK });
      y -= valueSize + 3;
    }
    ctx.page.drawLine({ start: { x, y: y + 1 }, end: { x: x + colW, y: y + 1 }, thickness: 0.4, color: RULE });
  });
  ctx.y -= rowH;
}

/** A checkbox group: label, then [x]/[ ] items flowed across the width. */
function checkRow(ctx: Ctx, field: Field, chosen: string[], perLine: number) {
  const size = 8.5;
  const opts = field.options ?? [];
  const lines = Math.ceil(opts.length / perLine);
  ensure(ctx, 12 + lines * (size + 5) + 6);
  ctx.page.drawText(clean(field.label), { x: MARGIN, y: ctx.y, size: 7.5, font: ctx.regular, color: MUTED });
  ctx.y -= 12;
  const colW = CONTENT_W / perLine;
  opts.forEach((o, i) => {
    const x = MARGIN + (i % perLine) * colW;
    const on = chosen.includes(o);
    ctx.page.drawText(`${on ? "[x]" : "[  ]"} ${clean(o)}`, {
      x,
      y: ctx.y,
      size,
      font: on ? ctx.bold : ctx.regular,
      color: on ? INK : MUTED,
    });
    if ((i + 1) % perLine === 0 || i === opts.length - 1) ctx.y -= size + 5;
  });
  ctx.y -= 6;
}

export async function buildIntakePdf(a: Answers): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  doc.setTitle("New Patient Intake");
  doc.setAuthor("Hanczaryk Chiropractic Neurology Group");
  const regular = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);
  const stamp = new Date().toLocaleString("en-US", { timeZone: "America/Detroit" });
  const ctx: Ctx = { doc, page: doc.addPage([PAGE_W, PAGE_H]), y: 0, regular, bold, pageNo: 1, stamp };
  header(ctx, true);

  // Identity strip the office reads first.
  valueRow(ctx, [
    { field: { key: "name", label: "Name", kind: "text" }, value: String(a.name ?? "") },
    { field: { key: "dob", label: "Date of birth", kind: "text" }, value: usDate(String(a.dob ?? "")) },
    { field: { key: "age", label: "Age", kind: "text" }, value: ageFromDob(String(a.dob ?? "")) },
    { field: { key: "submitted", label: "Submitted", kind: "text" }, value: stamp },
  ]);

  for (const section of SECTIONS) {
    if (section.when && !section.when(a)) continue;
    const fields = visibleFields(section, a).filter((f) => f.key !== "name" && f.key !== "dob");
    if (fields.length === 0) continue;
    sectionTitle(ctx, section.title);
    if (section.intro && section.id !== "about" && section.id !== "complaint-1" && section.id !== "complaint-2") {
      paragraph(ctx, section.intro);
    }
    let pending: { field: Field; value: string }[] = [];
    const flush = () => {
      if (pending.length) valueRow(ctx, pending);
      pending = [];
    };
    for (const f of fields) {
      const raw = a[f.key];
      if (f.kind === "checks") {
        flush();
        const chosen = Array.isArray(raw) ? raw : [];
        const perLine = (f.options?.length ?? 0) > 12 ? 4 : 3;
        checkRow(ctx, f, chosen, perLine);
        continue;
      }
      const value = Array.isArray(raw)
        ? raw.join(", ")
        : f.kind === "date"
          ? usDate(String(raw ?? ""))
          : String(raw ?? "");
      if (f.kind === "textarea") {
        flush();
        valueRow(ctx, [{ field: f, value }]);
        continue;
      }
      if (f.half) {
        pending.push({ field: f, value });
        if (pending.length === 2) flush();
      } else {
        flush();
        valueRow(ctx, [{ field: f, value }]);
      }
    }
    flush();
  }

  ctx.y -= 10;
  ensure(ctx, 30);
  paragraph(
    ctx,
    `Signed electronically by ${String(a.signature ?? "")} on ${usDate(String(a.signature_date ?? ""))} from the patient's own device, submitted ${stamp}.`,
    8,
  );
  footer(ctx);
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
