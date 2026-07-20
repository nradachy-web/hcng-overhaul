import type { Metadata } from "next";
import { Band, Eyebrow } from "@/components/Band";
import { Button, CallButton, TelText } from "@/components/Button";
import { JotFormShell, MapFacade } from "@/components/Embeds";
import { OpenNow } from "@/components/OpenNow";
import { SlimHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { StickyCallBar } from "@/components/StickyCallBar";
import {
  ADDRESS_LINE_1,
  ADDRESS_LINE_2,
  EMAIL,
  EMAIL_MAILTO,
  EV,
  HOURS_TABLE,
  JOTFORM_CONTACT_ID,
} from "@/lib/constants";
import { SocialRow, Web3FormsFallback } from "./contact-client";

/**
 * /contact/ (DESIGN_DIRECTION 8.11): 44vh photo hero (container39), then the
 * 40/60 split with the phone rail (the number is the largest element on the
 * page, Poiret numerals, tel link) beside the JotForm shell and the native
 * Web3Forms fallback, the full-width map facade, and the verbatim booking
 * headline as the closing band. Phone first everywhere.
 */

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to a real person. Call 810.584.7170, email, or send the form. 8185 Holly Road Suite 14, Grand Blanc, MI 48439.",
  alternates: { canonical: "/contact/" },
};

/** Mono row label inside the phone rail. */
function RailLabel({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-mono-cap text-(--muted) uppercase">{children}</h3>
  );
}

export default function ContactPage() {
  return (
    <>
      {/* Taller hero + high crop so both heads stay fully visible with
          headroom at both breakpoints; the headline lands low, over the
          dark scrubs and the full dual scrim, never over hair or faces. */}
      <SlimHero
        image="/assets/images/container39.jpg"
        imageAlt="Two smiling staff members behind the front desk"
        objectPosition="50% 6%"
        minH="min-h-[48svh] lg:min-h-[60svh]"
        eyebrow="Contact us"
        title="Talk to a real person."
      >
        <CallButton location="hero" />
      </SlimHero>

      {/* SPLIT: phone rail beside the forms. Phone is never demoted. */}
      <Band tone="plaster">
        <div className="grid gap-10 lg:grid-cols-5 lg:gap-14">
          <Reveal className="lg:col-span-2">
            <div className="rounded-[4px] border border-(--hairline) bg-(--card-bg) p-6 shadow-(--card-shadow) sm:p-8">
              <Eyebrow as="h2">Reach us</Eyebrow>
              {/* The largest element on the page (8.11): the display-num
                  token, clearly outsizing the H1. */}
              <p className="mt-6">
                <TelText
                  location="body"
                  className="text-display-num font-normal tracking-tight whitespace-nowrap no-underline"
                />
              </p>
              <OpenNow className="mt-5" />
              <div className="mt-8 space-y-7">
                <div>
                  <RailLabel>Email</RailLabel>
                  <p className="text-body mt-1.5">
                    <a
                      href={EMAIL_MAILTO}
                      className="text-(--link) underline decoration-1 underline-offset-4"
                    >
                      {EMAIL}
                    </a>
                  </p>
                </div>
                <div>
                  <RailLabel>Address</RailLabel>
                  <p className="text-body mt-1.5">
                    <a
                      href="#map"
                      className="text-(--link) underline decoration-1 underline-offset-4"
                    >
                      {ADDRESS_LINE_1}
                      <br />
                      {ADDRESS_LINE_2}
                    </a>
                  </p>
                </div>
                <div>
                  <RailLabel>Hours</RailLabel>
                  <table className="text-mono-cap mt-2 w-full">
                    <tbody>
                      {HOURS_TABLE.map((row) => (
                        <tr key={row.day} className="border-b border-(--hairline)">
                          <th
                            scope="row"
                            className="py-2.5 pr-4 text-left font-normal"
                          >
                            {row.day}
                          </th>
                          <td className="py-2.5 text-right text-(--muted)">
                            {row.hours}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div>
                  <RailLabel>Social</RailLabel>
                  <SocialRow className="mt-2" />
                </div>
              </div>
            </div>
          </Reveal>

          <div className="lg:col-span-3">
            <h2 className="sr-only">Send the form</h2>
            <Reveal delay={0.07}>
              <JotFormShell
                formId={JOTFORM_CONTACT_ID}
                form="jotform_contact"
                heading="Send the form"
                reassurance="Tell us what is going on and we will call you back."
              />
            </Reveal>
            <Reveal delay={0.14} className="mt-6">
              <Web3FormsFallback />
            </Reveal>
          </div>
        </div>
      </Band>

      {/* MAP: full-width click-to-load facade in a plate frame. */}
      <Band tone="plaster" pad="strip" id="map">
        <Reveal>
          <h2 className="sr-only">Find the office</h2>
          <MapFacade height={460} />
        </Reveal>
      </Band>

      {/* CLOSING: their booking headline, verbatim. No dead ends. */}
      <Band tone="bone">
        <Reveal className="max-w-2xl">
          <h2 className="text-h2s">We will change your life.</h2>
          <p className="text-body mt-4">
            Whether you are a current or new patient, we look forward to
            helping you live pain free, naturally. Contact us to schedule your
            appointment today!
          </p>
          <p className="text-body mt-3">
            Call <TelText location="body" />. Or send the form and we will
            call you.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-4">
            <CallButton location="body" />
            <Button
              variant="outline"
              href="/new-patients/#book"
              arrow
              trackEvent={{ event: EV.BOOK_CLICK, params: { location: "body" } }}
            >
              Book an appointment
            </Button>
          </div>
        </Reveal>
      </Band>

      <StickyCallBar />
    </>
  );
}
