/**
 * GA4 event helper. Tag G-GKMRPF0LE3 is loaded in layout.tsx.
 * Event names live in constants.ts (EV). Invent nothing else.
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function track(event: string, params?: Record<string, string>): void {
  if (typeof window === "undefined") return;
  window.gtag?.("event", event, params ?? {});
}
