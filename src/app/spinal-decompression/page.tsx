import type { Metadata } from "next";
import Link from "next/link";
import { Band, Eyebrow, Rule } from "@/components/Band";
import { Button, CallButton, TelText } from "@/components/Button";
import { CallDialArc, SequenceCrescent } from "@/components/BrassDial";
import { JotFormShell, TypeformFacade, YouTubeFacade } from "@/components/Embeds";
import { Faq, type FaqItem } from "@/components/Faq";
import { PhotoHero } from "@/components/PageHero";
import { Plate } from "@/components/Plate";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { GaugeRow } from "@/components/StatDial";
import { StickyCallBar } from "@/components/StickyCallBar";
import {
  EMAIL_MAILTO,
  EV,
  JOTFORM_CONSULT_ID,
  STATS,
  TYPEFORM_QUIZ_ID,
  YOUTUBE_NSSD,
} from "@/lib/constants";
import { CuratedGallery, type GalleryPhoto } from "@/components/CuratedGallery";

/**
 * /spinal-decompression/ (DESIGN_DIRECTION 8.2): the flagship service LP and
 * the template for all four. Pain-first serif H1, Call Dial arc on the hero
 * call CTA, credibility strip, symptom checklist, mechanism rail (numerals
 * licensed here), candidacy, consult form + quiz facades, doctors, proof,
 * FAQ aligned to the canonical 89.9%, repeated call CTA. Room accent:
 * room-signal, eyebrow ticks only. Sticky call bar from load.
 */

export const metadata: Metadata = {
  title: "Spinal Decompression",
  description:
    "Hill DT spinal decompression in Grand Blanc, MI for herniated discs, sciatica, and stenosis. Free MRI review. Call 810.584.7170.",
  alternates: { canonical: "/spinal-decompression/" },
};

const ACCENT = "var(--color-room-signal)";

/** Verbatim condition list; source list dashes render as commas (do-not 1). */
const CONDITIONS = [
  "Bulging discs, pinched nerve",
  "Herniated discs, sciatic pain",
  "Degenerative discs, whiplash",
  "Facet joint syndrome, spondylosis",
  "Failed back surgery, radicular pain",
  "Foraminal stenosis",
];

/** Verbatim from the NSSD copy. */
const DIFFERENCE = [
  "Faster recovery times",
  "Less pain, trauma and no surgical recovery time",
  "State of the art Non Surgical Spinal Decompression",
  "Therapy and spinal rehabilitation to minimize re-injury",
  "Over 35 years of experience",
  "Over 94% Patient Satisfaction",
  "Tens of thousands of procedures performed since 1976",
];

/** The 8 verbatim yes/no candidacy questions. */
const CANDIDACY_QUESTIONS = [
  "Have you been diagnosed with sciatica or a herniated disc?",
  "Have you tried pills and muscle relaxants without success?",
  "Has your back or neck caused you to miss work?",
  "Did extended bed rest fail to improve your back?",
  "Is your back stiff from arthritis or spinal imbalance?",
  "Does your back feel like it is out of alignment?",
  "Do you have difficulty sleeping through the night?",
  "Have you been told surgery is the only answer?",
];

/** Mechanism steps: sequential content, measure rail numerals licensed. */
const STEPS = [
  { heading: "Mapped", body: "Digital x-ray finds the disc at fault." },
  {
    heading: "Decompressed",
    body: "Negative pressure draws the disc back toward position.",
  },
  {
    heading: "Replenished",
    body: "Blood flow and nutrients return to the disc.",
  },
  {
    heading: "Rebuilt",
    body: "Therapy and spinal rehabilitation to minimize re-injury.",
  },
];

/** gallery06, curated pair on the rail, all six reachable in the lightbox.
 *  Figure numbers licensed on NSSD equipment plates only. */
const HILL_DT_PHOTOS: GalleryPhoto[] = [
  {
    src: "/assets/images/gallery06/2b2e02d5.jpg",
    alt: "The Hill DT console readout during a lumbar decompression session",
    caption: "The Hill DT console",
    fig: "FIG. 01",
    aspect: "aspect-[3/4]",
  },
  {
    src: "/assets/images/gallery06/53adfc94.jpg",
    alt: "The Hill DT table mid-session, console readouts in the foreground",
    caption: "The Hill DT table",
    fig: "FIG. 02",
    aspect: "aspect-[3/4]",
  },
  {
    src: "/assets/images/gallery06/ea16892b.jpg",
    alt: "A wide view of the decompression room during a session",
  },
  {
    src: "/assets/images/gallery06/11279319.jpg",
    alt: "Dr. Christine Hanczaryk at the Hill DT console with a patient on the table",
  },
  {
    src: "/assets/images/gallery06/6d022089.jpg",
    alt: "Adjusting the console settings during a decompression session",
  },
  {
    src: "/assets/images/gallery06/24567813.jpg",
    alt: "A staff member beside the upright Hill DT table",
  },
];

/** FAQ: verbatim Q/A aligned to 89.9%; dead click-here refs replaced with
 *  the real actions (call). */
const FAQ_ITEMS: FaqItem[] = [
  {
    q: "When can I schedule an appointment for a consultation with the doctors?",
    a: "Call and speak to any of our capable staff members. Mention that you are interested in a consultation for the DRX9000 Spinal Decompression. We will take some of your information over the phone, and get you set up with an appointment time.",
  },
  {
    q: "If I qualify, what do I need to bring with me on my first visit?",
    a: (
      <p>
        Copies or reports of your MRI&rsquo;s, as well as any diagnostic tests
        you may have had indicating your condition. It will also benefit you if
        you go to the{" "}
        <Link
          href="/new-patients/"
          className="text-(--link) underline decoration-1 underline-offset-4"
        >
          New Patient Center
        </Link>{" "}
        of our web page, and print out the required online forms for your
        consultation with the doctor, fill them out, and bring them with you.
      </p>
    ),
  },
  {
    q: "What is the success rate for the DRX9000 Spinal Decompression Treatment?",
    a: "The success rate for patients who undergo spinal decompression treatment is an astounding 89.9%, compared to surgeries and spinal fusion that report only a 30-40% success rate. Additionally, 60% of spinal fusion patients continue to suffer from back pain, post-operation. A full recovery is uncommon.",
  },
  {
    q: "How does the DRX9000 actually work?",
    a: "The DRX imparts a negative pressure into the disc, which essentially creates a vacuum, moving the disc back into its original position. It creates space in the back of the spine, reducing herniation and restoring the flow of blood to a disc that has no blood supply. This negative pressure pushes healing nutrients and restorative spinal fluids into the disc, reducing pain and opening the space occupied by the nerve.",
  },
  {
    q: "Am I the only one that is suffering from this condition?",
    a: "Low back pain is the 3rd leading cause for hospital admissions. It is a condition that affects so many people worldwide, but with treatment through spinal decompression, there is finally an option for back pain sufferers other than surgery. Your condition is unique, and this treatment could be standing between you and the operating table.",
  },
  {
    q: "Is treatment on the DRX9000 painful?",
    a: "No. The DRX9000 is non-invasive, non-surgical, and virtually pain-free. There are no prescription drugs involved, and in fact most patients report experiencing a 50% reduction in pain after the first treatment.",
  },
  {
    q: "How does treatment on the DRX 9000 Compare to other surgical treatment options?",
    a: (
      <p>
        We keep a full list of comparisons at the office. Call{" "}
        <TelText location="body" /> and we will walk you through how
        decompression compares for your case.
      </p>
    ),
  },
  {
    q: "Will my insurance pay for this treatment?",
    a: "For the spinal decompression treatment outline, it is possible a certain portion of your treatment may be covered. At your first consultation, we can verify any coverage you may have, and our insurance department will discuss that information with you then.",
  },
  {
    q: "What payment options do you accept?",
    a: (
      <>
        <p>
          We have different plans for Cash, Check, or personal Credit Card
          Payments. We also offer financing through Chase Health Advance.
        </p>
        <p>
          Interested in filling out a financing application in advance? Call{" "}
          <TelText location="body" /> and we will have it ready for your
          consultation.
        </p>
      </>
    ),
  },
];

function Step({ n, heading, body }: { n: number; heading: string; body: string }) {
  return (
    <li className="relative flex items-start gap-5 sm:gap-7">
      <span className="inline-flex rounded-full bg-bone-200">
        <SequenceCrescent n={n} size={44} />
      </span>
      <div className="min-w-0 pt-2.5">
        <h3 className="text-mono-label">{heading}</h3>
        <p className="text-body measure mt-2">{body}</p>
      </div>
    </li>
  );
}

export default function SpinalDecompressionPage() {
  return (
    <>
      {/* Hero photo picked by Dr. Christine (2026-09-21): her at the Hill DT
          console with a patient on the table. Portrait source, so on lg it
          rides the right half, masked into the band. */}
      <PhotoHero
        image="/assets/images/sep26/decompression-hero-console.jpg"
        imageAlt="Dr. Christine Hanczaryk at the Hill DT console, a patient lying on the decompression table behind her"
        objectPosition="50% 30%"
        imgClassName="lg:left-[44%] lg:[mask-image:linear-gradient(90deg,transparent,black_28%)]"
        eyebrow="Non-surgical spinal decompression, Hill DT"
        accent={ACCENT}
        title="A herniated disc does not have to mean surgery."
        lead="Computer-guided decompression for herniated, bulging, and degenerative discs, sciatica, and stenosis."
        openNow
      >
        <CallDialArc>
          <CallButton location="hero" />
        </CallDialArc>
        <Button
          variant="outline"
          href="#consultation"
          trackEvent={{ event: EV.BOOK_CLICK, params: { location: "hero" } }}
        >
          Free consultation
        </Button>
      </PhotoHero>

      {/* GAUGES: the one licensed gauge row, plus their two verbatim claims. */}
      <Band tone="espresso" pad="strip">
        <div className="grid items-center gap-x-12 gap-y-10 lg:grid-cols-2">
          <GaugeRow
            items={[STATS.success, STATS.since]}
            className="lg:grid-cols-2"
          />
          <Reveal>
            <Rule />
            <p className="text-lead py-5">
              The only Hill DT spinal decompression table in Genesee County.
            </p>
            <Rule />
            <p className="text-lead py-5">
              Our Staff is Certified in Non-Surgical Spinal Decompression
              through Hill Laboratories.
            </p>
            <Rule />
          </Reveal>
        </div>
      </Band>

      {/* IS THIS YOUR PAIN? Condition list on light, per band discipline. */}
      <Band tone="plaster">
        <Reveal>
          <Eyebrow accent={ACCENT}>Non-surgical spinal decompression</Eyebrow>
          <h2 className="text-h2s mt-4">Is this your pain?</h2>
          <p className="text-body measure mt-6">
            Hanczaryk Chiropractic Neurology Group is the only health care
            clinic in Genesee County to present a major breakthrough in medical
            technology that significantly reduces or eliminates back pain with
            the use of the 2011 Hill DT&trade; decompression table.
            Non-surgical Spinal Decompression is used for treatment of serious
            spinal conditions such as herniated discs, bulging and protruding
            discs, posterior facet syndrome, sciatica, brachial neuritis, and
            degenerative discs, without the invasive surgery that used to be
            the final option for most back pain sufferers. Not all qualify for
            this remarkable treatment, below is all the information you will
            need to get you started.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal>
            <div className="rounded-[4px] border border-(--hairline) bg-(--card-bg) p-6 shadow-(--card-shadow) sm:p-8">
              <h3 className="text-h3s">Neck and Back Conditions We Treat</h3>
              <ul className="mt-4">
                {CONDITIONS.map((line) => (
                  <li
                    key={line}
                    className="text-body border-b border-(--hairline) py-3.5"
                  >
                    {line}
                  </li>
                ))}
              </ul>
              <p className="text-body mt-6">
                Three or more sound familiar? Call <TelText location="body" />.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.07}>
            <h3 className="text-h3s">The Hanczaryk Difference</h3>
            <ul className="mt-4">
              {DIFFERENCE.map((line) => (
                <li
                  key={line}
                  className="text-body border-b border-(--hairline) py-3.5"
                >
                  {line}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Band>

      {/* HOW THE TABLE WORKS: sequential content, measure rail licensed. */}
      <Band tone="bone">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow accent={ACCENT}>The mechanism</Eyebrow>
              <h2 className="text-h2s mt-4">How the table works</h2>
            </Reveal>
            <Reveal delay={0.07}>
              <ol className="relative mt-12 space-y-12">
                <div
                  aria-hidden="true"
                  className="tick-rule-v absolute top-2 bottom-2 left-[22px] hidden sm:block"
                />
                {STEPS.map((step, i) => (
                  <Step key={step.heading} n={i + 1} {...step} />
                ))}
              </ol>
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            <CuratedGallery
              photos={HILL_DT_PHOTOS}
              visibleCount={2}
              gridClassName="grid gap-5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2"
              viewAllLabel="View all 6 photos"
            />
          </div>
        </div>
      </Band>

      {/* ARE YOU A CANDIDATE? The one dark band between light neighbors. */}
      <Band tone="espresso-deep">
        <Reveal>
          <Eyebrow accent={ACCENT}>Are You A Candidate?</Eyebrow>
          <h2 className="text-h2s mt-4">
            If you can answer yes to the following questions:
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          <Reveal className="lg:col-span-2">
            <div className="h-full rounded-[4px] border border-(--hairline) bg-(--card-bg) p-6 shadow-(--card-shadow) sm:p-8">
              <ol>
                {CANDIDACY_QUESTIONS.map((q) => (
                  <li
                    key={q}
                    className="text-body border-b border-(--hairline) py-3.5"
                  >
                    {q}
                  </li>
                ))}
              </ol>
              <p className="text-body mt-6 text-(--muted)">
                If so, contact us immediately to schedule a further
                consultation for your condition.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-4">
                <CallButton location="body" />
                <Button variant="outline" href="#quiz">
                  Start the 60 second quiz
                </Button>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.07}>
            <div className="h-full rounded-[4px] border border-(--hairline) bg-(--card-bg) p-6 shadow-(--card-shadow) sm:p-8">
              <h3 className="text-mono-label">Free MRI Review</h3>
              <p className="text-body mt-4">
                Our doctors will review your MRI or CT to help identify the
                cause of your pain.
              </p>
              <div className="mt-6">
                <Button
                  variant="outline"
                  href={EMAIL_MAILTO}
                  trackEvent={{ event: EV.MRI_EMAIL_CLICK }}
                >
                  Send Us Your MRI
                </Button>
              </div>
              <p className="text-mono-cap mt-4 text-(--muted) uppercase">
                Or call and we will help. <TelText location="body" />
              </p>
            </div>
          </Reveal>
        </div>
      </Band>

      {/* CONSULTATION: JotForm + Typeform, light band, facade shells. */}
      <Band tone="plaster" id="consultation">
        <Reveal className="max-w-3xl">
          <Eyebrow accent={ACCENT} as="h2">
            Free consultation
          </Eyebrow>
          <p className="text-body mt-5">
            Call <TelText location="body" />. Or send the form and we will
            call you.
          </p>
        </Reveal>
        <div className="mt-8 grid items-start gap-8 lg:grid-cols-2">
          <Reveal>
            <JotFormShell
              formId={JOTFORM_CONSULT_ID}
              form="jotform_consult"
              heading="Schedule your free consultation"
              reassurance="We will call you back to set your appointment time."
            />
          </Reveal>
          <Reveal delay={0.07}>
            <div id="quiz">
              <TypeformFacade
                quizId={TYPEFORM_QUIZ_ID}
                heading="Are you a candidate?"
                reassurance="Sixty seconds, a few questions, no obligation to book."
                buttonLabel="Start the 60 second quiz"
              />
            </div>
          </Reveal>
        </div>
      </Band>

      {/* YOUR DOCTORS */}
      <Band tone="plaster">
        <Reveal>
          <Eyebrow accent={ACCENT}>Your doctors</Eyebrow>
          <h2 className="text-h2s mt-4">The doctors reading your MRI.</h2>
        </Reveal>
        <RevealGroup className="mt-10 grid gap-10 sm:grid-cols-2 lg:gap-14">
          <RevealItem as="article">
            <Plate
              src="/assets/images/image04.jpg"
              alt="Dr. Christine Hanczaryk, Chiropractor"
              aspect="aspect-[3/4]"
              objectPosition="50% 20%"
            />
            <h3 className="text-h3s mt-5">Dr. Christine Hanczaryk</h3>
            <p className="text-mono-cap mt-1 text-(--muted) uppercase">
              Chiropractor
            </p>
            <p className="text-body measure mt-4">
              My passion for not only chiropractic care but the human heart and
              soul is what makes me different. I truly care. You as the
              patients are my first priority.
            </p>
          </RevealItem>
          <RevealItem as="article">
            <Plate
              src="/assets/images/image03.jpg"
              alt="Dr. Micheil Hanczaryk, Chiropractor"
              aspect="aspect-[3/4]"
              objectPosition="50% 20%"
            />
            <h3 className="text-h3s mt-5">Dr. Micheil Hanczaryk</h3>
            <p className="text-mono-cap mt-1 text-(--muted) uppercase">
              Chiropractor
            </p>
            <p className="text-body measure mt-4">
              Dr. Hanczaryk, who founded and owned Bristol Chiropractic Centre,
              P.C. for 47 years, is a Flint native, and a graduate of the
              University of Michigan.
            </p>
          </RevealItem>
        </RevealGroup>
        <Reveal className="mt-10">
          <Rule />
          <div className="flex flex-wrap items-center justify-between gap-4 py-4">
            <p className="text-mono-cap text-(--muted) uppercase">
              Doctorate, Palmer College of Chiropractic, Magna Cum Laude, 1976
            </p>
            <Button variant="outline" size="sm" href="/meet-the-team/" arrow>
              Meet the team
            </Button>
          </div>
          <Rule />
        </Reveal>
      </Band>

      {/* PROOF: the Cantu ride, verbatim, plus the NSSD video facade. */}
      <Band tone="bone">
        <h2 className="sr-only">Patient proof</h2>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-7">
            <blockquote>
              <p className="text-quote">
                &ldquo;I am an avid Harley rider and before treatment, I was
                not able to walk correctly right after getting off my
                motorcycle. After only a few treatments of Non-Surgical Spinal
                Decompression and adjustments, I went for a trip that consisted
                of a 953 mile round trip motorcycle ride. I was able to do so
                with NO pain and was able to walk upright at each stop. I feel
                great and have referred several people to this office and Dr.
                Hanczaryk.&rdquo;
              </p>
              <footer className="text-mono-label mt-6">N. Cantu, Patient</footer>
            </blockquote>
          </Reveal>
          <Reveal delay={0.07} className="lg:col-span-5">
            <YouTubeFacade
              videoId={YOUTUBE_NSSD}
              title="Spinal decompression on video"
            />
          </Reveal>
        </div>
      </Band>

      {/* FAQ: light band, canonical 89.9%, phone prompt after item 3. */}
      <Band tone="plaster">
        <Reveal>
          <Eyebrow accent={ACCENT}>FAQ</Eyebrow>
          <h2 className="text-h2s mt-4">Questions about decompression</h2>
        </Reveal>
        <Reveal delay={0.07} className="mt-8">
          <Faq items={FAQ_ITEMS} />
        </Reveal>
      </Band>

      {/* CLOSING: the ask repeats; no dead ends. */}
      <Band tone="espresso">
        <Reveal className="max-w-2xl">
          <h2 className="text-h2s">
            Bring us your MRI. We will tell you the truth about it.
          </h2>
          <p className="text-body mt-4 text-paper-50/80">
            Call <TelText location="body" />. Or send the form and we will
            call you.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-4">
            <CallButton location="body" />
            <Button
              variant="outline"
              href={EMAIL_MAILTO}
              trackEvent={{ event: EV.MRI_EMAIL_CLICK }}
            >
              Send us your MRI
            </Button>
          </div>
        </Reveal>
      </Band>

      <StickyCallBar fromLoad />
    </>
  );
}
