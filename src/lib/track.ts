/**
 * GA4 event helper. Tag G-GKMRPF0LE3 is loaded by components/Trackers.tsx,
 * and never on patient-data routes (lib/patientData.ts), where window.gtag
 * does not exist and every call here is a no-op.
 * Event names live in constants.ts (EV). Invent nothing else, and never pass
 * anything a patient typed as a parameter.
 */

import { ADS_APPOINTMENT_REQUEST_SEND_TO, EV } from "./constants";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function track(event: string, params?: Record<string, string>): void {
  if (typeof window === "undefined") return;
  window.gtag?.("event", event, params ?? {});
}

/**
 * An appointment or consult request finished sending. GA4 gets the event with
 * the form name only; Google Ads gets its conversion with no user data.
 */
export function trackAppointmentRequest(form: string): void {
  if (typeof window === "undefined") return;
  track(EV.APPOINTMENT_REQUEST, { form });
  window.gtag?.("event", "conversion", { send_to: ADS_APPOINTMENT_REQUEST_SEND_TO });
}
