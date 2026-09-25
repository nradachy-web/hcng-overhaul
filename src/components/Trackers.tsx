"use client";

/**
 * Every third-party tracker on hcng.net loads here, and only here.
 *
 * HIPAA rule (2026-09-25, audit item C2): nothing third party runs on a
 * patient-data route (lib/patientData.ts). The Google tag G-GKMRPF0LE3 carries
 * Google Ads AW-16508184554 with automatic form events and user-provided data
 * collection, and on the intake it sent form_start and form data to Google.
 * Google offers no BAA.
 *
 * How the rule holds, including Next.js client-side navigation:
 *  1. Trackers load only when the page load itself started on a non-patient
 *     route. A load that starts on the intake never gets them.
 *  2. Any link click that crosses into or out of a patient route becomes a
 *     full page load (capture-phase listener on window, ahead of next/link),
 *     so a Google tag loaded on another page never stays alive on the intake.
 *  3. Fallback: if a page that has trackers ever reaches a patient route
 *     anyway, Google is disabled and consent denied at once, then the page
 *     reloads clean.
 *
 * Sitewide for this healthcare client: ad_user_data and ad_personalization
 * are denied (no enhanced conversions or user data to Google Ads, no
 * remarketing), Google signals off. Ads conversions still count by click.
 */

import { useEffect, useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import { ADS_ID, CALLRAIL_SWAP_SRC, GA4_ID } from "@/lib/constants";
import { isPatientDataPath } from "@/lib/patientData";

declare global {
  interface Window {
    __hcngTrackers?: "loaded" | "blocked";
    dataLayer?: unknown[];
  }
}

function addScript(src: string) {
  const s = document.createElement("script");
  s.async = true;
  s.src = src;
  document.head.appendChild(s);
}

function disableGoogle() {
  const w = window as unknown as Record<string, unknown>;
  w[`ga-disable-${GA4_ID}`] = true;
  w[`ga-disable-${ADS_ID}`] = true;
  window.gtag?.("consent", "update", {
    ad_storage: "denied",
    analytics_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
}

function loadTrackers() {
  if (window.__hcngTrackers) return;
  window.__hcngTrackers = "loaded";
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // gtag.js reads the arguments object itself, not an array copy.
    // eslint-disable-next-line prefer-rest-params
    (window.dataLayer as unknown[]).push(arguments);
  };
  const gtag = window.gtag;
  gtag("consent", "default", {
    ad_storage: "granted",
    analytics_storage: "granted",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  gtag("set", "allow_ad_personalization_signals", false);
  gtag("js", new Date());
  gtag("config", GA4_ID, {
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });
  addScript(`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`);
  addScript(CALLRAIL_SWAP_SRC);
}

/** Full page load for any same-tab link that crosses the patient-data line. */
function onClickCapture(e: MouseEvent) {
  if (e.defaultPrevented || e.button !== 0) return;
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  const el = e.target instanceof Element ? e.target.closest("a[href]") : null;
  if (!(el instanceof HTMLAnchorElement)) return;
  if (el.target && el.target !== "_self") return;
  if (el.hasAttribute("download")) return;
  let url: URL;
  try {
    url = new URL(el.href, window.location.href);
  } catch {
    return;
  }
  if (url.origin !== window.location.origin) return;
  if (isPatientDataPath(url.pathname) === isPatientDataPath(window.location.pathname)) return;
  e.preventDefault();
  e.stopImmediatePropagation();
  window.location.assign(url.href);
}

export function Trackers() {
  const pathname = usePathname();

  useEffect(() => {
    window.addEventListener("click", onClickCapture, true);
    if (isPatientDataPath(window.location.pathname)) {
      window.__hcngTrackers = "blocked";
      disableGoogle();
    } else {
      loadTrackers();
    }
    return () => window.removeEventListener("click", onClickCapture, true);
  }, []);

  useLayoutEffect(() => {
    if (window.__hcngTrackers === "loaded" && isPatientDataPath(pathname)) {
      disableGoogle();
      window.location.reload();
    }
  }, [pathname]);

  return null;
}
