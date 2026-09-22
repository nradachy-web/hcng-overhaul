/**
 * The new patient intake, field by field, in the order of Dr. Christine's
 * paper form (the Google Doc linked from /new-patients/, exported
 * 2026-09-22). One schema drives both the on-screen form and the PDF so the
 * office reads the PDF the way they read the paper.
 *
 * Nothing here is stored by the site. Answers live in the browser's
 * sessionStorage until the PDF is built, then they are cleared.
 */

export type FieldKind =
  | "text"
  | "date"
  | "number"
  | "email"
  | "tel"
  | "textarea"
  | "radio"
  | "checks"
  | "yesno";

export type Field = {
  key: string;
  label: string;
  kind: FieldKind;
  options?: string[];
  required?: boolean;
  /** Half-width on the form and the PDF. */
  half?: boolean;
  placeholder?: string;
  autoComplete?: string;
  /** Only shown when this predicate on the answers is true. */
  when?: (a: Answers) => boolean;
};

export type Section = {
  id: string;
  title: string;
  intro?: string;
  fields: Field[];
  when?: (a: Answers) => boolean;
};

export type Answers = Record<string, string | string[]>;

const FREQUENCY = ["Constantly", "Frequent (75%)", "Often (50%)", "Rarely (25%)"];
const TREND = ["Worsening", "Improving", "Remaining unchanged"];
const INTENSITY = ["Mild", "Moderate", "Severe"];
const CHARACTER = ["Dull", "Sharp", "Burning", "Aching", "Knife-like", "Throbbing"];
const ASSOCIATED = ["Pins and needles", "Tingling", "Numbness", "Twitching of muscles"];
const PROVOKES = [
  "Sitting",
  "Standing",
  "Walking",
  "Lying",
  "Lifting",
  "Pushing",
  "Pulling",
  "Gripping",
  "Hot/Cold",
  "Coughing/Sneezing",
  "Mental activities",
  "Bright lights",
];
const RELIEVES = ["Sitting", "Standing", "Walking", "Lying", "Heat/Cold", "Rest", "Medications"];
const HABIT_LEVELS = ["Heavy", "Moderate", "Light", "None"];

export const SYMPTOMS = [
  "Low blood pressure",
  "Low back pain",
  "Difficulty digestion",
  "Stroke",
  "Eye pain",
  "Varicose veins",
  "High blood pressure",
  "Sciatica",
  "Hemorrhoids",
  "Chest pain",
  "Failing vision",
  "Bed wetting",
  "Allergy",
  "Neck pain/stiffness",
  "Nausea",
  "Difficulty breathing",
  "Tuberculosis",
  "Frequent urination",
  "Headache",
  "Poor posture",
  "Dizziness",
  "Swelling of ankles",
  "Bruise easily",
  "Kidney infection/stone",
  "Loss of sleep",
  "Spinal curvatures",
  "Fatigue",
  "Sinus infection",
  "Hay fever",
  "Prostate trouble",
  "Ulcers",
  "Swollen joints",
  "Pain over heart",
  "Asthma",
  "Nose bleeds",
  "Cramps or backache",
  "Numbness",
  "Venereal disease",
  "Poor circulation",
  "Colds",
  "Cancer",
  "Excessive menses",
  "Arthritis",
];

function complaint(n: 1 | 2): Section {
  const k = (s: string) => `c${n}_${s}`;
  return {
    id: `complaint-${n}`,
    title: n === 1 ? "Your main complaint" : "Your second complaint",
    intro:
      n === 1
        ? "Tell us about the problem that brought you in."
        : "Only if there is a second, separate problem.",
    when: n === 2 ? (a) => a.has_second_complaint === "Yes" : undefined,
    fields: [
      { key: k("onset"), label: "When did you first notice this condition?", kind: "text", required: n === 1 },
      { key: k("location"), label: "What is the exact location of your symptoms?", kind: "text", required: n === 1 },
      { key: k("radiates"), label: "Do your symptoms radiate? If yes, where?", kind: "text" },
      { key: k("frequency"), label: "How often are you experiencing these symptoms?", kind: "radio", options: FREQUENCY },
      { key: k("trend"), label: "Is this condition", kind: "radio", options: TREND },
      { key: k("intensity"), label: "What is the intensity of your symptoms?", kind: "radio", options: INTENSITY },
      {
        key: k("scale"),
        label: "Rate your symptoms from 1 (minimal) to 10 (severe, excruciating)",
        kind: "radio",
        options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
      },
      { key: k("depth"), label: "Is your pain", kind: "radio", options: ["Superficial", "Deep"] },
      { key: k("character"), label: "The character of your pain", kind: "checks", options: CHARACTER },
      { key: k("associated"), label: "Associated symptoms", kind: "checks", options: ASSOCIATED },
      { key: k("associated_desc"), label: "If yes, please describe", kind: "textarea" },
      { key: k("provokes"), label: "What provokes or aggravates your condition", kind: "checks", options: PROVOKES },
      { key: k("provokes_other"), label: "Other", kind: "text" },
      { key: k("relieves"), label: "What helps you relieve the pain", kind: "checks", options: RELIEVES },
    ],
  };
}

export const SECTIONS: Section[] = [
  {
    id: "about",
    title: "About you",
    intro: "Everything on this page is confidential and goes only to the office.",
    fields: [
      { key: "name", label: "Full name", kind: "text", required: true, autoComplete: "name" },
      { key: "dob", label: "Date of birth", kind: "date", required: true, half: true, autoComplete: "bday" },
      { key: "sex", label: "Sex", kind: "radio", options: ["M", "F"], required: true, half: true },
      { key: "ssn", label: "Social Security number", kind: "text", half: true, placeholder: "Optional online; you can give it at the desk" },
      { key: "height", label: "Height", kind: "text", half: true, placeholder: "5 ft 7 in" },
      { key: "weight", label: "Weight", kind: "text", half: true, placeholder: "lbs" },
      { key: "marital", label: "Marital status", kind: "radio", options: ["Married", "Single", "Widowed", "Divorced"], half: true },
      { key: "children", label: "How many children?", kind: "text", half: true },
      {
        key: "race",
        label: "Race",
        kind: "radio",
        options: ["Asian", "African American", "Caucasian", "Latin American", "Native American", "Pacific Islander", "Other"],
      },
      { key: "language", label: "Language", kind: "text", half: true },
      { key: "address", label: "Street address", kind: "text", required: true, autoComplete: "street-address" },
      { key: "city", label: "City", kind: "text", required: true, half: true, autoComplete: "address-level2" },
      { key: "zip", label: "Zip", kind: "text", required: true, half: true, autoComplete: "postal-code" },
      { key: "cell", label: "Cell phone", kind: "tel", required: true, half: true, autoComplete: "tel" },
      { key: "work_phone", label: "Work phone", kind: "tel", half: true },
      { key: "home_phone", label: "Home phone", kind: "tel", half: true },
      { key: "email", label: "Email", kind: "email", half: true, autoComplete: "email" },
      { key: "ref_patient", label: "Referred by a patient (name)", kind: "text", half: true },
      { key: "ref_physician", label: "Referred by a physician (name)", kind: "text", half: true },
      { key: "ref_ad", label: "Referred by an ad (where)", kind: "text", half: true },
      { key: "ref_other", label: "Referred by, other", kind: "text", half: true },
    ],
  },
  {
    id: "history",
    title: "Your history",
    fields: [
      { key: "work_injury", label: "Is your condition due to injury or sickness arising out of your employment?", kind: "yesno" },
      { key: "accident_date", label: "Date of accident", kind: "date", half: true, when: (a) => a.work_injury === "Yes" },
      { key: "last_physical", label: "Date of last physical examination", kind: "date", half: true },
      { key: "pregnant", label: "Are you pregnant?", kind: "yesno", half: true, when: (a) => a.sex === "F" },
      { key: "operations", label: "What operations have you had?", kind: "textarea" },
      { key: "illnesses", label: "Serious illnesses", kind: "text", half: true },
      { key: "fractures", label: "Fractured bones", kind: "text", half: true },
      { key: "prior_chiro", label: "Have you ever been under chiropractic care?", kind: "yesno", half: true },
      { key: "prior_chiro_doctor", label: "Doctor's name", kind: "text", half: true, when: (a) => a.prior_chiro === "Yes" },
      { key: "emergency_contact", label: "In case of emergency, contact", kind: "text", half: true },
      { key: "emergency_phone", label: "Emergency contact phone", kind: "tel", half: true },
    ],
  },
  {
    id: "work-insurance",
    title: "Work and insurance",
    fields: [
      {
        key: "work_status",
        label: "Work status",
        kind: "radio",
        options: ["Employed", "Retired", "Disabled", "Full-time student", "Part-time student"],
      },
      { key: "occupation", label: "Occupation", kind: "text", half: true },
      { key: "employer", label: "Employer", kind: "text", half: true },
      { key: "employer_address", label: "Employer address", kind: "text" },
      { key: "employer_city", label: "Employer city", kind: "text", half: true },
      { key: "employer_zip", label: "Employer zip", kind: "text", half: true },
      { key: "insurance_company", label: "Name of insurance company", kind: "text", half: true },
      { key: "insurance_phone", label: "Insurance phone", kind: "tel", half: true },
      { key: "policy_holder", label: "Policy holder", kind: "text", half: true },
      { key: "policy_holder_dob", label: "Policy holder's date of birth", kind: "date", half: true },
      { key: "contract_no", label: "Contract number", kind: "text", half: true },
      { key: "group_no", label: "Group number", kind: "text", half: true },
      { key: "spouse", label: "Name of spouse or partner", kind: "text", half: true },
      { key: "spouse_occupation", label: "Their occupation", kind: "text", half: true },
      { key: "spouse_employer", label: "Their employer", kind: "text", half: true },
      { key: "spouse_employer_address", label: "Their employer's address", kind: "text", half: true },
    ],
  },
  {
    id: "care",
    title: "The care you want",
    intro:
      "People go to chiropractors for a variety of reasons. Some go for symptomatic relief of pain or discomfort (Relief Care). Others want the cause of the problem corrected along with the symptoms, to avoid future relapses (Corrective Care). Still others want what is malfunctioning brought to the highest state of health possible, to optimize physical and emotional well-being (Comprehensive Care). It is always your choice, and your doctor will weigh your needs when recommending a treatment program.",
    fields: [
      {
        key: "care_type",
        label: "Please check the type of care you wish to receive",
        kind: "radio",
        required: true,
        options: ["Relief Care", "Corrective Care", "Comprehensive Care", "I would like to discuss my options with the doctor"],
      },
    ],
  },
  complaint(1),
  {
    id: "second",
    title: "A second complaint?",
    fields: [
      { key: "has_second_complaint", label: "Do you have a second, separate complaint?", kind: "yesno", required: true },
    ],
  },
  complaint(2),
  {
    id: "family",
    title: "Family history and medications",
    fields: [
      {
        key: "family_history",
        label: "Have any of your family members ever suffered from the following?",
        kind: "checks",
        options: [
          "Diabetes",
          "Neurological disorders",
          "Depression / mental illness",
          "Cancer",
          "Heart disease",
          "Autoimmune disorders",
          "Stroke",
          "Other",
        ],
      },
      { key: "family_other", label: "Other, please describe", kind: "text", when: (a) => (a.family_history ?? []).includes("Other") },
      { key: "medications", label: "Current medications and what they are taken for", kind: "textarea" },
      { key: "vitamins", label: "Do you take any vitamins or minerals?", kind: "yesno", half: true },
      { key: "vitamins_need", label: "If no, do you think you may need them?", kind: "yesno", half: true, when: (a) => a.vitamins === "No" },
      { key: "inner_soles", label: "Inner soles, now or ever", kind: "yesno", half: true },
      { key: "heel_lifts", label: "Heel lifts, now or ever", kind: "yesno", half: true },
      { key: "sole_lifts", label: "Sole lifts, now or ever", kind: "yesno", half: true },
      { key: "arch_supports", label: "Arch supports, now or ever", kind: "yesno", half: true },
    ],
  },
  {
    id: "habits",
    title: "Habits",
    fields: [
      { key: "habit_alcohol", label: "Alcohol", kind: "radio", options: HABIT_LEVELS, half: true },
      { key: "habit_coffee", label: "Coffee", kind: "radio", options: HABIT_LEVELS, half: true },
      { key: "habit_tobacco", label: "Tobacco", kind: "radio", options: HABIT_LEVELS, half: true },
      { key: "habit_cannabis", label: "Cannabis", kind: "radio", options: HABIT_LEVELS, half: true },
      { key: "habit_drugs", label: "Drugs", kind: "radio", options: HABIT_LEVELS, half: true },
      { key: "habit_exercise", label: "Exercise", kind: "radio", options: HABIT_LEVELS, half: true },
      { key: "habit_sleep", label: "Sleep", kind: "radio", options: HABIT_LEVELS, half: true },
      { key: "habit_appetite", label: "Appetite", kind: "radio", options: HABIT_LEVELS, half: true },
    ],
  },
  {
    id: "symptoms",
    title: "Check any you have now or have had",
    fields: [{ key: "symptoms", label: "Symptoms", kind: "checks", options: SYMPTOMS }],
  },
  {
    id: "acknowledgment",
    title: "Financial acknowledgment",
    intro:
      "I understand and agree that health and accident insurance policies are an arrangement between an insurance carrier and myself. Furthermore, I understand that Hanczaryk Chiropractic Neurology Group will prepare any necessary reports and forms to assist me in making collections from the insurance company and that any amount authorized to be paid directly to HCNG will be credited to my account on receipt. However, I clearly understand and agree that all services rendered to me are charged directly to me and that I am personally responsible for payment. I also understand that if I suspend or terminate my care and treatment, any fees for professional services rendered to me will be immediately due and payable.",
    fields: [
      { key: "signature", label: "Type your full name as your signature", kind: "text", required: true, autoComplete: "off" },
      { key: "signature_date", label: "Date", kind: "date", required: true, half: true },
    ],
  },
];

/** Steps for the on-screen form: sections grouped so no step runs long. */
export const STEPS: { title: string; sections: string[] }[] = [
  { title: "About you", sections: ["about", "history"] },
  { title: "Work and insurance", sections: ["work-insurance", "care"] },
  { title: "Your complaint", sections: ["complaint-1", "second", "complaint-2"] },
  { title: "Health history", sections: ["family", "habits", "symptoms"] },
  { title: "Sign", sections: ["acknowledgment"] },
];

export function sectionById(id: string): Section {
  const s = SECTIONS.find((x) => x.id === id);
  if (!s) throw new Error(`unknown section ${id}`);
  return s;
}

export function visibleFields(section: Section, a: Answers): Field[] {
  return section.fields.filter((f) => !f.when || f.when(a));
}

export function ageFromDob(dob: string): string {
  const d = new Date(dob);
  if (Number.isNaN(d.getTime())) return "";
  const now = new Date();
  let age = now.getFullYear() - d.getFullYear();
  const m = now.getMonth() - d.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < d.getDate())) age -= 1;
  return age >= 0 && age < 130 ? String(age) : "";
}

/** Fields that must be answered before leaving a step. */
export function missingRequired(section: Section, a: Answers): Field[] {
  return visibleFields(section, a).filter((f) => {
    if (!f.required) return false;
    const v = a[f.key];
    return Array.isArray(v) ? v.length === 0 : !v || !String(v).trim();
  });
}
