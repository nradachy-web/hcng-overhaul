import type { Metadata } from "next";
import { Band, Eyebrow } from "@/components/Band";
import { Button, CallButton, TelText } from "@/components/Button";
import { SequenceCrescent } from "@/components/BrassDial";
import { JotFormShell, MapFacade } from "@/components/Embeds";
import { OpenNow } from "@/components/OpenNow";
import { SlimHero } from "@/components/PageHero";
import { Plate } from "@/components/Plate";
import { Reveal } from "@/components/Reveal";
import { StickyCallBar } from "@/components/StickyCallBar";
import {
  HOURS_TABLE,
  JOTFORM_CONTACT_ID,
  NEW_PATIENT_FORMS_URL,
} from "@/lib/constants";

/**
 * /new-patients/ (DESIGN_DIRECTION 8.10): pure utility, fastest page on the
 * site, no photo hero. Slim dark band, then the sequential first-visit steps
 * (measure rail numerals licensed here), insurance and payment cards, the
 * home visit module, and the #book JotForm shell. One wink, below the form.
 */

export const metadata: Metadata = {
  title: "New Patients",
  description:
    "Your first visit, start to finish. Call 810.584.7170, complete your forms at home, and book online. 8185 Holly Road Suite 14, Grand Blanc, MI.",
  alternates: { canonical: "/new-patients/" },
};

/** First-visit steps. Step copy is verbatim where the source provides it. */
function Step({
  n,
  heading,
  children,
}: {
  n: number;
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <li className="relative flex items-start gap-5 sm:gap-7">
      <span className="inline-flex rounded-full bg-plaster-100">
        <SequenceCrescent n={n} size={44} />
      </span>
      <div className="min-w-0 pt-2.5">
        <h3 className="text-mono-label">{heading}</h3>
        <div className="text-body measure mt-3">{children}</div>
      </div>
    </li>
  );
}

export default function NewPatientsPage() {
  return (
    <>
      {/* Brand photos sent by Dr. Christine 2026-09-21: the crescent C
          reflected in the sunburst mirror carries the hero; the patient
          folder sits beside the steps. */}
      <SlimHero
        image="/assets/images/sep26/brand-mirror-logo.jpg"
        imageAlt="The crescent C logo reflected in the center of the brass sunburst mirror"
        objectPosition="50% 38%"
        eyebrow="New patients"
        title="Your first visit, start to finish."
        openNow
      >
        <CallButton location="hero" />
      </SlimHero>

      {/* BEFORE YOU ARRIVE: sequential content, measure rail licensed. */}
      <Band tone="plaster">
        <Reveal>
          <Eyebrow>Step by step</Eyebrow>
          <h2 className="text-h2s mt-4">Before you arrive</h2>
        </Reveal>
        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-14">
        <Reveal delay={0.07} className="lg:col-span-7">
          <div className="relative">
            <div
              aria-hidden="true"
              className="tick-rule-v absolute top-2 bottom-2 left-[22px] hidden sm:block"
            />
            <ol className="space-y-12">
            <Step n={1} heading="Call us">
              <p>
                <TelText location="body" />. Our staff will set your
                appointment time.
              </p>
            </Step>
            <Step n={2} heading="The forms">
              <div className="rounded-[4px] border border-(--hairline) bg-(--card-bg) p-6 shadow-(--card-shadow)">
                <p className="text-mono-label">New patient forms</p>
                <p className="text-body mt-3">
                  Our patient forms are made available online so they can be
                  completed in the convenience of your own home or office.
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3">
                  <Button
                    variant="outline"
                    size="sm"
                    href={NEW_PATIENT_FORMS_URL}
                    external
                    arrow
                  >
                    Open the forms
                  </Button>
                  <p className="text-mono-cap text-(--muted) uppercase">
                    Opens in Google Docs
                  </p>
                </div>
              </div>
            </Step>
            <Step n={3} heading="What to bring">
              <p>
                Copies or reports of your MRIs, as well as any
                diagnostic tests you may have had indicating your condition.
                Bring your completed forms with you.
              </p>
            </Step>
            </ol>
          </div>
        </Reveal>
        <Reveal delay={0.14} className="lg:col-span-5">
          <Plate
            src="/assets/images/sep26/brand-folder-monstera.jpg"
            alt="Dr. Christine holding the black HCNG patient folder beside a monstera"
            caption="Your folder, ready at the desk"
            aspect="aspect-[3/4]"
            objectPosition="50% 35%"
            className="lg:max-w-[380px] lg:justify-self-end"
          />
        </Reveal>
        </div>
      </Band>

      {/* GOOD TO KNOW: two quiet cards, verbatim insurance and payment copy. */}
      <Band tone="bone">
        <Reveal>
          <Eyebrow>Insurance and payment</Eyebrow>
          <h2 className="text-h2s mt-4">Good to know</h2>
        </Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          <Reveal className="h-full">
            <div className="h-full rounded-[4px] border border-(--hairline) bg-(--card-bg) p-6">
              <h3 className="text-mono-label">Insurance</h3>
              <p className="text-body mt-3">
                At your first consultation, we can verify any coverage you may
                have, and our insurance department will discuss that
                information with you then.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.07} className="h-full">
            <div className="h-full rounded-[4px] border border-(--hairline) bg-(--card-bg) p-6">
              <h3 className="text-mono-label">Payment</h3>
              <p className="text-body mt-3">
                We have different plans for Cash, Check, or personal Credit
                Card Payments. We also offer financing through Chase Health
                Advance.
              </p>
              <p className="text-body mt-3">
                Interested in financing? Call <TelText location="body" /> and
                we will help.
              </p>
            </div>
          </Reveal>
        </div>
      </Band>

      {/* HOURS + MAP: the visit module. */}
      <Band tone="plaster">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal>
            <Eyebrow as="h2">Office hours</Eyebrow>
            <table className="text-mono-cap mt-6 w-full max-w-sm">
              <tbody>
                {HOURS_TABLE.map((row) => (
                  <tr key={row.day} className="border-b border-(--hairline)">
                    <th scope="row" className="py-2.5 pr-4 text-left font-normal">
                      {row.day}
                    </th>
                    <td className="py-2.5 text-right text-(--muted)">
                      {row.hours}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <OpenNow className="mt-6" />
            <div className="mt-8">
              <CallButton location="body" />
            </div>
          </Reveal>
          <Reveal delay={0.07}>
            <MapFacade />
          </Reveal>
        </div>
      </Band>

      {/* BOOK: the closing band; the ask repeats, phone first. */}
      <Band tone="bone" id="book">
        <Reveal className="max-w-3xl">
          <Eyebrow as="h2">Book an appointment</Eyebrow>
          <p className="text-body mt-5">
            Call <TelText location="body" />. Or send the form and we will
            call you.
          </p>
        </Reveal>
        <Reveal delay={0.07} className="mt-8">
          <JotFormShell
            formId={JOTFORM_CONTACT_ID}
            form="jotform_contact"
            heading="Prefer to book online?"
            reassurance="We will call you back to set your appointment time."
            className="max-w-3xl"
          />
        </Reveal>
        <Reveal className="mt-6">
          <p className="text-body text-(--muted) italic">
            Rather talk to a person? <TelText location="body" />. We agree,
            actually.
          </p>
        </Reveal>
      </Band>

      <StickyCallBar />
    </>
  );
}
