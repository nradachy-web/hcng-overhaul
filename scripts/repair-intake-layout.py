"""Rebuild the four-page intake and its answer coordinates from the original.

Run with Python and pypdf from the repository. The source revision is kept
in git so repeated runs never compact an already corrected form.
"""

from io import BytesIO
import json
from pathlib import Path
import re
import subprocess

from pypdf import PdfReader, PdfWriter, Transformation
from pypdf.generic import FloatObject

ROOT = Path(__file__).resolve().parents[1]
SOURCE_REVISION = "fa13fe0"
PDF_PATH = "public/assets/forms/hcng-new-patient-form.pdf"
LAYOUT_PATH = "src/app/new-patients/intake/formLayout.ts"
TOP_SHIFT = 44.0
FIRST_ROW_TOP = 351.9353
OLD_ROW_STEP = (642.8062 - FIRST_ROW_TOP) / 11
NEW_ROW_STEP = 18.0
BOTTOM_SHIFT = TOP_SHIFT + 11 * (OLD_ROW_STEP - NEW_ROW_STEP)
# Continue the acknowledgment at its existing line spacing.
LAST_PAGE_SHIFT = 39.7 + BOTTOM_SHIFT - 12.8 - 745.9


def original(path):
    return subprocess.check_output(
        ["git", "show", f"{SOURCE_REVISION}:{path}"], cwd=ROOT
    )


reader = PdfReader(BytesIO(original(PDF_PATH)))
assert len(reader.pages) == 5, "The source form changed; inspect it before rebuilding."
before_text = "".join(p.extract_text() for p in reader.pages)
writer = PdfWriter(clone_from=reader)
page = writer.pages[3]
stream = page.get_contents()
for args, op in stream.operations:
    # The symptom table clips each cell in page space before drawing text.
    # Move those clips with their contents so all checklist labels stay visible.
    if op == b"re" and FIRST_ROW_TOP - 0.1 <= float(args[1]) < 660:
        row = max(0, min(11, round((float(args[1]) - FIRST_ROW_TOP) / OLD_ROW_STEP)))
        args[1] = FloatObject(float(args[1]) - TOP_SHIFT - row * (OLD_ROW_STEP - NEW_ROW_STEP))
        continue
    if op != b"cm" or list(map(float, args[:4])) != [0.75, 0, 0, 0.75]:
        continue
    # The page background stays put. Each remaining matrix positions a line.
    if float(args[4]) == 0 and float(args[5]) == 0:
        continue
    top = float(args[5])
    if top < FIRST_ROW_TOP - 0.1:
        shift = TOP_SHIFT
    elif top < 660:
        row = max(0, min(11, int((top - FIRST_ROW_TOP + 0.1) / OLD_ROW_STEP)))
        shift = TOP_SHIFT + row * (OLD_ROW_STEP - NEW_ROW_STEP)
    else:
        shift = BOTTOM_SHIFT
    args[5] = FloatObject(top - shift)
page.replace_contents(stream)

last_page = writer.pages[4]
last_stream = last_page.get_contents()
# Remove only its white page background before overlaying its content.
assert [op for _, op in last_stream.operations[1:9]] == [
    b"q", b"cm", b"RG", b"rg", b"gs", b"re", b"f", b"Q"
]
last_stream.operations = last_stream.operations[:1] + last_stream.operations[9:]
last_page.replace_contents(last_stream)
page.merge_transformed_page(last_page, Transformation().translate(0, LAST_PAGE_SHIFT))

del writer.pages[4]
writer.add_metadata({"/Title": "HCNG New Patient Intake", "/Author": "HCNG"})
output = BytesIO()
writer.write(output)
check = PdfReader(BytesIO(output.getvalue()))
after_text = "".join(p.extract_text() for p in check.pages)
assert re.sub(r"\s+", "", before_text) == re.sub(r"\s+", "", after_text), "Form text changed."
assert len(check.pages) == 4
assert "Signature" in check.pages[3].extract_text()
(ROOT / PDF_PATH).write_bytes(output.getvalue())

source = original(LAYOUT_PATH).decode()
layout = json.loads(source.split("export const LAYOUT: Record<string, Target> = ", 1)[1].rstrip().removesuffix(";"))


def move(target):
    if isinstance(target, list):
        for child in target:
            move(child)
    elif isinstance(target, dict):
        if "p" in target:
            key = "cy" if "cy" in target else "y"
            if target["p"] == 4:
                y = target[key]
                if y > 445:
                    shift = TOP_SHIFT
                elif y > 130:
                    row = max(0, min(11, round((433.3 - y) / OLD_ROW_STEP)))
                    shift = TOP_SHIFT + row * (OLD_ROW_STEP - NEW_ROW_STEP)
                else:
                    shift = BOTTOM_SHIFT
                target[key] = round(y + shift, 2)
            elif target["p"] == 5:
                target["p"] = 4
                target[key] = round(target[key] + LAST_PAGE_SHIFT, 2)
        else:
            for child in target.values():
                move(child)


move(layout)
header = """/**
 * Answer positions on the four-page HCNG intake. PDF space is measured
 * from the bottom of a 612 x 792 page. Generated with the template by
 * scripts/repair-intake-layout.py from the original September 22 export.
 * Regenerate the PDF and this map together; do not move fields by hand.
 */

export type Spot = { p: number; x: number; y: number; w?: number };
export type Ring = { p: number; cx: number; cy: number; rx: number; ry: number };
export type Multi = { lines: Spot[] };
export type Target = Spot | Multi | Record<string, Spot | Ring>;

"""
note = {"p": 4, "x": 36, "y": round(664 + LAST_PAGE_SHIFT, 2), "w": 540}
(ROOT / LAYOUT_PATH).write_text(
    header
    + "export const SIGNATURE_NOTE: Spot = " + json.dumps(note) + ";\n\n"
    + "export const LAYOUT: Record<string, Target> = " + json.dumps(layout, indent=1) + ";\n"
)
print("Rebuilt four-page template and matching answer map; all original text preserved.")
