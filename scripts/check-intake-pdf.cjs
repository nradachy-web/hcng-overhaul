/* Generate synthetic QA forms without sending patient information anywhere. */
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const ts = require("typescript");
const { PDFDocument } = require("pdf-lib");

const root = path.resolve(__dirname, "..");
require.extensions[".ts"] = (module, filename) => {
  const source = fs.readFileSync(filename, "utf8");
  const compiled = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText.replace(/require\("(@\/[^\"]+)"\)/g, (_, name) =>
    `require(${JSON.stringify(path.join(root, "src", name.slice(2) + ".ts"))})`);
  module._compile(compiled, filename);
};

const { SECTIONS } = require("../src/app/new-patients/intake/fields.ts");
const { LAYOUT, SIGNATURE_NOTE } = require("../src/app/new-patients/intake/formLayout.ts");
const { NEW_PATIENT_FORMS_URL } = require("../src/lib/constants.ts");
const { buildIntakePdf } = require("../src/app/new-patients/intake/pdf.ts");
const template = fs.readFileSync(path.join(root, "public", NEW_PATIENT_FORMS_URL.split("?")[0]));
global.fetch = async (url) => {
  assert.equal(url, NEW_PATIENT_FORMS_URL);
  return new Response(template, { headers: { "Content-Type": "application/pdf" } });
};

const allFields = {};
for (const section of SECTIONS) {
  for (const field of section.fields) {
    allFields[field.key] = field.kind === "checks" ? field.options
      : field.kind === "yesno" ? "Yes"
      : field.kind === "radio" ? field.options[0]
      : field.kind === "date" ? "1990-01-02"
      : field.kind === "tel" ? "000-000-0000"
      : field.kind === "email" ? "test@example.com"
      : "TEST";
  }
}
Object.assign(allFields, {
  name: "QA Test Patient", signature: "QA Test Patient", signature_date: "2026-09-24",
  sex: "F", has_second_complaint: "Yes", vitamins: "No", height: "5 ft 7", weight: "150",
  address: "TEST ONLY", city: "TEST", zip: "00000", ssn: "",
  medications: "TEST ONLY. No actual patient information.",
  c1_associated_desc: "Synthetic test of the main complaint answer lines.",
  c2_associated_desc: "Synthetic test of the second complaint answer lines.",
});
const minimal = {
  name: "QA Test Patient", dob: "1990-01-02", sex: "F", address: "TEST ONLY",
  city: "TEST", zip: "00000", cell: "000-000-0000", care_type: "Relief Care",
  c1_onset: "TEST", c1_location: "TEST", has_second_complaint: "No",
  signature: "QA Test Patient", signature_date: "2026-09-24",
};

async function main() {
  const outputDir = process.argv[2];
  assert.equal((await PDFDocument.load(template)).getPageCount(), 4);
  assert.equal(LAYOUT.signature.p, 4);
  assert.equal(LAYOUT.signature_date.p, 4);
  assert.equal(SIGNATURE_NOTE.p, 4);
  assert.equal(Object.keys(LAYOUT.symptoms).length, 68);
  for (const [name, answers] of Object.entries({ minimal, complete: allFields })) {
    const bytes = await buildIntakePdf(answers);
    assert.equal((await PDFDocument.load(bytes)).getPageCount(), 4, `${name} should have four pages`);
    if (outputDir) {
      fs.mkdirSync(outputDir, { recursive: true });
      fs.writeFileSync(path.join(outputDir, `${name}.pdf`), bytes);
    }
  }
  global.fetch = async () => new Response("not found", { status: 404 });
  await assert.rejects(buildIntakePdf(minimal), /could not be loaded/);
  const wrongTemplate = await PDFDocument.create();
  wrongTemplate.addPage();
  global.fetch = async () => new Response(await wrongTemplate.save());
  await assert.rejects(buildIntakePdf(minimal), /template has changed/);
  console.log("PASS: blank, minimal and complete forms have four pages; signature is on page four; all 68 symptoms retained; missing/stale templates fail safely.");
}
main().catch((error) => { console.error(error); process.exitCode = 1; });
