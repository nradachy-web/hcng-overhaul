/**
 * Routes where a patient types health information into the page itself
 * (HIPAA). No third-party script may run on these routes: no Google tag
 * (GA4 G-GKMRPF0LE3 carries Google Ads AW-16508184554 with automatic form
 * events and user-provided data collection), no CallRail, nothing added later.
 * Google offers no BAA.
 *
 * Enforced in src/components/Trackers.tsx:
 *  - trackers load only in a page load that STARTED on a non-patient route;
 *  - every navigation into or out of a patient route is a full page load, so a
 *    Google tag loaded on another page can never stay alive on these routes
 *    (Next.js client-side navigation would otherwise keep it running).
 * Button.tsx also renders links to these routes as plain anchors.
 *
 * Add a route here BEFORE shipping any new page with patient-data fields.
 */
import { BASE } from "./asset";

export const PATIENT_DATA_ROUTES = ["/new-patients/intake"] as const;

function stripBase(pathname: string): string {
  if (BASE && (pathname === BASE || pathname.startsWith(`${BASE}/`))) {
    return pathname.slice(BASE.length) || "/";
  }
  return pathname;
}

export function isPatientDataPath(pathname: string | null | undefined): boolean {
  if (!pathname) return false;
  const p = stripBase(pathname).replace(/\/+$/, "") || "/";
  return PATIENT_DATA_ROUTES.some((r) => p === r || p.startsWith(`${r}/`));
}
