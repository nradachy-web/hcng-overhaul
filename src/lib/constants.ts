/**
 * Single source of truth for NAP, hours, embeds, nav, and GA4 event names.
 * Every value here is verbatim from the source site content docs.
 * Never invent IDs, stats, or links; add new values only from source copy.
 */

export const SITE_NAME = "Hanczaryk Chiropractic Neurology Group";
export const SITE_URL = "https://hcng.net";
export const SITE_TITLE =
  "Hanczaryk Chiropractic Neurology Group - Chiropractor in Grand Blanc, MI";
export const SITE_DESCRIPTION =
  "We are located conveniently at 8185 Holly Rd Suite #14, Grand Blanc, MI 48439. Hanczaryk is a chiropractor near you. If you’re looking for chiropractic adjustments or neurology for life improvement through pain relief near Grand Blanc, Holly, or Fenton MI, contact us today. Yours in health, Dr. Christine Hanczaryk.";

/* ---------------------------------------------------------------- */
/* NAP                                                               */
/* ---------------------------------------------------------------- */

export const PHONE_DISPLAY = "810.584.7170";
/** E.164 tel target (DESIGN_DIRECTION section 6): display text stays 810.584.7170. */
export const PHONE_TEL = "tel:+18105847170";
/** Fax renders on /hipaa/ ONLY. */
export const FAX_DISPLAY = "810.584.7173";
export const EMAIL = "hcng8185@gmail.com";
export const EMAIL_MAILTO = "mailto:hcng8185@gmail.com";
export const ADDRESS_LINE_1 = "8185 Holly Road Suite 14,";
export const ADDRESS_LINE_2 = "Grand Blanc, MI 48439";

/** Verbatim Google Maps embed URL from the source footer. */
export const MAPS_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2922.1946107276385!2d-83.62587512322615!3d42.91093647114703!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88237dda93f80593%3A0x5c42f3f9be1159d4!2sHanczaryk%20Chiropractic%20Neurology%20Group!5e0!3m2!1sen!2sus!4v1711662538837!5m2!1sen!2sus";

/** Standard Google Maps directions deep link built from the verbatim NAP. */
export const MAPS_DIRECTIONS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=" +
  encodeURIComponent(
    "Hanczaryk Chiropractic Neurology Group, 8185 Holly Road Suite 14, Grand Blanc, MI 48439",
  );

/* ---------------------------------------------------------------- */
/* Hours (verbatim strings; ranges in minutes for open-now compute)  */
/* America/Detroit. Index 0 = Sunday to match Date/Intl weekday.     */
/* ---------------------------------------------------------------- */

export type DayHours = {
  /** Verbatim day label as rendered in the hours table. */
  day: string;
  /** Verbatim hours string. */
  hours: string;
  /** Open ranges as [startMinute, endMinute] pairs, empty = closed. */
  ranges: [number, number][];
};

const WEEKDAY_RANGES: [number, number][] = [
  [8 * 60, 12 * 60],
  [14 * 60, 18 * 60],
];

/** Sunday-first, aligned with JS weekday indexes. */
export const HOURS_BY_WEEKDAY: DayHours[] = [
  { day: "Sunday", hours: "Closed", ranges: [] },
  { day: "Monday", hours: "8am-12pm & 2pm-6pm", ranges: WEEKDAY_RANGES },
  { day: "Tuesday", hours: "8am-12pm & 2pm-6pm", ranges: WEEKDAY_RANGES },
  { day: "Wednesday", hours: "8am-12pm & 2pm-6pm", ranges: WEEKDAY_RANGES },
  { day: "Thursday", hours: "8am-12pm", ranges: [[8 * 60, 12 * 60]] },
  { day: "Friday", hours: "8am-12pm & 2pm-6pm", ranges: WEEKDAY_RANGES },
  { day: "Saturday", hours: "Closed", ranges: [] },
];

/** Verbatim display rows for hours tables (source order, Sat & Sun merged). */
export const HOURS_TABLE: { day: string; hours: string }[] = [
  { day: "Monday", hours: "8am-12pm & 2pm-6pm" },
  { day: "Tuesday", hours: "8am-12pm & 2pm-6pm" },
  { day: "Wednesday", hours: "8am-12pm & 2pm-6pm" },
  { day: "Thursday", hours: "8am-12pm" },
  { day: "Friday", hours: "8am-12pm & 2pm-6pm" },
  { day: "Sat & Sun", hours: "Closed" },
];

/* ---------------------------------------------------------------- */
/* Socials                                                           */
/* ---------------------------------------------------------------- */

export const SOCIALS = [
  { label: "Facebook", href: "https://www.facebook.com/gbchiro/" },
  {
    label: "YouTube",
    href: "https://www.youtube.com/channel/UCZaKGsNCsV2VhNy9EJSAJOw",
  },
  { label: "Instagram", href: "https://www.instagram.com/gbchiro/" },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@hcng.chiropractor_mi",
    /** TikTok outbound links fire the tiktok_out GA4 event. */
    tiktok: true,
  },
] as const;

export const TIKTOK_HANDLE = "@hcng.chiropractor_mi";

/* ---------------------------------------------------------------- */
/* Embeds and third-party IDs (source-verified; invent nothing)      */
/* ---------------------------------------------------------------- */

export const JOTFORM_CONTACT_ID = "240744791416056";
export const JOTFORM_CONSULT_ID = "240735375352053";
export const TYPEFORM_QUIZ_ID = "01HQXGR4GR4PC36HBJXVJ4DWJG";
export const REVIEWWAVE_ID = "9691e662011613264022a6e80226b2de6b53";
export const GA4_ID = "G-GKMRPF0LE3";

/** Web3Forms fallback form on /contact/: Nick supplies the real key later. */
export const WEB3FORMS_ACCESS_KEY = "WEB3FORMS_ACCESS_KEY_PLACEHOLDER";

export const YOUTUBE_TESTIMONIALS = [
  "nnp28LQTsR4",
  "I336s1gNmuc",
  "stb-zBsdS5E",
  "cFAQ8It9SMc",
  "LJ0QaWxSGNs",
  "wWD9anSFBjg",
] as const;

export const YOUTUBE_NSSD = "stb-zBsdS5E";

/** The same versioned, four-page template used by the online intake. */
export const NEW_PATIENT_FORMS_URL =
  "/assets/forms/hcng-new-patient-form.pdf?v=20260924";

/* ---------------------------------------------------------------- */
/* Navigation                                                        */
/* ---------------------------------------------------------------- */

export type NavItem = { label: string; href: string };

export const NAV_PRIMARY: NavItem[] = [
  { label: "Decompression", href: "/spinal-decompression/" },
  { label: "Chiropractic", href: "/chiropractic/" },
  { label: "Massage", href: "/massage-therapy/" },
  { label: "Kids", href: "/kids/" },
];

export const NAV_MORE: NavItem[] = [
  { label: "Why Us", href: "/why-us/" },
  { label: "Team", href: "/meet-the-team/" },
  { label: "Our Office", href: "/our-office/" },
  { label: "Reviews", href: "/testimonials/" },
  { label: "New Patients", href: "/new-patients/" },
  { label: "Contact", href: "/contact/" },
];

export const NAV_FOOTER: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Spinal Decompression", href: "/spinal-decompression/" },
  { label: "Chiropractic Care", href: "/chiropractic/" },
  { label: "Massage Therapy", href: "/massage-therapy/" },
  { label: "Chiropractic and Kids", href: "/kids/" },
  { label: "Why Us", href: "/why-us/" },
  { label: "Meet the Team", href: "/meet-the-team/" },
  { label: "Our Office", href: "/our-office/" },
  { label: "Testimonials", href: "/testimonials/" },
  { label: "New Patients", href: "/new-patients/" },
  { label: "Contact", href: "/contact/" },
];

export const NAV_LEGAL: NavItem[] = [
  { label: "Privacy Policy", href: "/privacy-policy/" },
  { label: "Terms and Conditions", href: "/terms/" },
  { label: "HIPAA Privacy Notice", href: "/hipaa/" },
];

/* ---------------------------------------------------------------- */
/* GA4 event names (DESIGN_DIRECTION 7.5). The only tracking id is   */
/* G-GKMRPF0LE3; these are the only events.                          */
/* ---------------------------------------------------------------- */

export const EV = {
  TEL_CLICK: "tel_click",
  BOOK_CLICK: "book_click",
  FORM_OPEN: "form_open",
  MRI_EMAIL_CLICK: "mri_email_click",
  VIDEO_PLAY: "video_play",
  DIRECTIONS_CLICK: "directions_click",
  REVIEW_ORIGINAL_VIEW: "review_original_view",
  TIKTOK_OUT: "tiktok_out",
} as const;

export type TelLocation = "header" | "hero" | "sticky" | "body" | "footer";

/* ---------------------------------------------------------------- */
/* Claims (7.6). Display the success stat as a whole percentage.     */
/* If a figure gets pulled, degrade to the two uncontested facts.    */
/* ---------------------------------------------------------------- */

export const STATS = {
  success: { value: 90, decimals: 0, suffix: "%", caption: "method success rate" },
  satisfaction: { value: 94, decimals: 0, suffix: "%", caption: "patient satisfaction" },
  years: { value: 48, decimals: 0, suffix: "", caption: "years combined practice" },
  since: { value: 1976, decimals: 0, suffix: "", caption: "caring for spines since" },
} as const;
