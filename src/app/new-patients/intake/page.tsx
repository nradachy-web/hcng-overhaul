import type { Metadata } from "next";
import { Band } from "@/components/Band";
import { SlimHero } from "@/components/PageHero";
import { IntakeForm } from "./IntakeForm";

/**
 * /new-patients/intake/: the online version of the paper new patient form.
 * Built 2026-09-22 at Dr. Christine's request. Not indexed: patients reach
 * it from /new-patients/ or a link the office sends. No sticky call bar, so
 * nothing covers the form on a phone.
 */

export const metadata: Metadata = {
  title: "New Patient Intake",
  description: "Fill out your new patient forms online before your first visit at Hanczaryk Chiropractic Neurology Group.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/new-patients/intake/" },
};

export default function IntakePage() {
  return (
    <>
      <SlimHero
        eyebrow="New patients"
        title="Your new patient forms, online."
        lead="About ten minutes. Your answers go straight to our front desk, and you can save a copy for yourself."
      />
      <Band tone="plaster">
        <div className="max-w-3xl">
          <IntakeForm />
        </div>
      </Band>
    </>
  );
}
