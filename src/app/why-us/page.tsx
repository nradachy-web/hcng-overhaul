import type { Metadata } from "next";
import Link from "next/link";
import { Band, Eyebrow, Rule } from "@/components/Band";
import { Button, CallButton, TelText } from "@/components/Button";
import { SlimHero } from "@/components/PageHero";
import { Plate } from "@/components/Plate";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { GaugeRow } from "@/components/StatDial";
import { StickyCallBar } from "@/components/StickyCallBar";
import { EV, STATS } from "@/lib/constants";

/**
 * /why-us/ (DESIGN_DIRECTION 8.6): slim dark hero, the loudest four-dial
 * gauge row on the site, the comparison ledger built strictly from the
 * verbatim Why Us bullets, the pledge band, closing dual CTA. All figures
 * are the practice's own published claims, verbatim; 89.9% is the one
 * canonical success number.
 */

export const metadata: Metadata = {
  title: "Why Us",
  description:
    "The Hanczaryk Method: neurology, spinal biomechanics, and 48 years of combined practice. How it compares to open back surgery. Call 810.584.7170.",
  alternates: { canonical: "/why-us/" },
};

/** Verbatim Why Us bullets, split into the two ledger columns. */
const LEDGER_ROWS = [
  {
    label: "Success rate",
    surgery:
      "While most published statistics claim a success rate of approximately 65% for open back surgery, physician practice reports that the actual success rate for open spina surgery ranges from 30%-38%.",
    method: "The Hanczaryk Methods produce a success rate of 89.9%.",
  },
  {
    label: "Recovery",
    surgery:
      "According to The New England Journal of Medicine, open fusion back surgery is associated with more complications than any other type of back surgery and recovery from open back surgery can take month to a year in some cases.",
    method:
      "The Hanczaryk Method is non surgical, pain free in most cases, does not limit your current activities and you are able to resume your normal daily activities in a fraction of the time compared to patients who have had open back surgery.",
  },
];

/** Verbatim commitments from the Why Us copy. */
const COMMITMENTS = [
  "We strive to find the cause of the disease as well as develop an individualized treatment plan specially designed for each patient.",
  "We acknowledge and recognize the innate wisdom of the body and its own recuperative powers.",
  "We are a chiropractic neurology based center which is committed to improving brain and nerve function, thus improving the quality of life.",
  "Our health care team strives to anticipate the unexpressed health care wishes of each patient which will provide one of a kind world class healthcare in a world class facility.",
];

export default function WhyUsPage() {
  return (
    <>
      <SlimHero
        eyebrow="Why us"
        title="Why patients choose the Hanczaryk Method."
      >
        <CallButton location="hero" />
      </SlimHero>

      {/* GAUGES: the loudest full four-dial row on the site. One row max. */}
      <Band tone="espresso-deep" pad="strip">
        <GaugeRow
          items={[STATS.success, STATS.satisfaction, STATS.years, STATS.since]}
        />
      </Band>

      {/* THE METHOD + THE LEDGER */}
      <Band tone="plaster">
        <Reveal>
          <Eyebrow>The Hanczaryk Method</Eyebrow>
          <p className="text-body measure mt-6">
            At Hanczaryk Chiropractic Neurology Group we have both doctors of
            chiropractic and chiropractic neurologists. They both offer the
            same non-drug and non-invasive treatment that targets the
            underlying problem, not just the symptoms. To learn more about{" "}
            <Link
              href="/chiropractic/"
              className="text-(--link) underline decoration-1 underline-offset-4"
            >
              ailments we treat
            </Link>
            , read more here.
          </p>
          <blockquote className="mt-8 max-w-3xl">
            <p className="text-quote">
              &ldquo;The Hanczaryk Method lies at the core of our exceptional
              results. The Hanczaryk Method blends neurology, spinal
              biomechanics and over 48 years of combined chiropractic practice
              along with true Computerized Non-Surgical Spinal Decompression
              for those serious debilitating disc issues, stenosis and/ or
              radicular extremity pain.&rdquo;
            </p>
          </blockquote>
        </Reveal>

        <Reveal className="mt-16">
          <h2 className="text-h2s">How The Hanczaryk Method Compares</h2>
          <p className="text-lead mt-4 text-(--muted)">
            The proven alternative to open back surgery.
          </p>
        </Reveal>

        <div className="mt-10">
          <Rule />
          {LEDGER_ROWS.map((row) => (
            <Reveal key={row.label}>
              <div className="grid gap-6 py-8 lg:grid-cols-12">
                <p className="text-mono-label text-(--muted) lg:col-span-2">
                  {row.label}
                </p>
                <div className="lg:col-span-5">
                  <p className="text-mono-cap text-(--muted) uppercase">
                    Open back surgery
                  </p>
                  <p className="text-body mt-3">{row.surgery}</p>
                </div>
                <div className="lg:col-span-5">
                  <p className="text-mono-cap text-(--muted) uppercase">
                    The Hanczaryk Method
                  </p>
                  <p className="text-body mt-3 font-semibold">{row.method}</p>
                </div>
              </div>
              <Rule />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10">
          <p className="text-body">
            Questions about your case? Call and describe it.{" "}
            <TelText location="body" />
          </p>
        </Reveal>
      </Band>

      {/* THE PLEDGE */}
      <Band tone="bone">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow as="h2">The pledge</Eyebrow>
              <blockquote className="mt-7">
                <p className="text-quote">
                  &ldquo;We pledge to provide the finest state of the art carte
                  and facilities for our patients who will always enjoy a warm,
                  relaxed yet refined ambience.&rdquo;
                </p>
              </blockquote>
            </Reveal>
            <RevealGroup as="ul" className="mt-10">
              {COMMITMENTS.map((line) => (
                <RevealItem
                  key={line}
                  as="li"
                  className="text-body border-b border-(--hairline) py-4"
                >
                  {line}
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
          <div className="lg:col-span-5">
            <RevealGroup className="grid gap-5">
              <RevealItem as="figure">
                <Plate
                  src="/assets/images/sep26/reception-room.jpg"
                  alt="The reception room: a black leather sofa, monstera plants, the brass mirror, and the fireplace room beyond"
                  caption="The reception room"
                  aspect="aspect-[3/2]"
                />
              </RevealItem>
              <RevealItem as="figure">
                <Plate
                  src="/assets/images/gallery02/51164a8a.jpg"
                  alt="The front desk: a tiled reception counter under warm downlights, succulents mounted on the wall"
                  caption="The front desk"
                  aspect="aspect-[3/2]"
                />
              </RevealItem>
            </RevealGroup>
          </div>
        </div>
      </Band>

      {/* CLOSING: dual CTA, no dead ends. */}
      <Band tone="espresso">
        <Reveal className="max-w-2xl">
          <h2 className="text-h2s">Ready when you are.</h2>
          <p className="text-body mt-4 text-paper-50/80">
            Call <TelText location="body" />. Or send the form and we will call
            you.
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
