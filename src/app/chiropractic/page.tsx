import type { Metadata } from "next";
import { Band, Eyebrow, Rule } from "@/components/Band";
import { Button, CallButton, TelText } from "@/components/Button";
import { CallDialArc } from "@/components/BrassDial";
import { YouTubeFacade } from "@/components/Embeds";
import { Faq, type FaqItem } from "@/components/Faq";
import { PhotoHero } from "@/components/PageHero";
import { Plate } from "@/components/Plate";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { GaugeRow } from "@/components/StatDial";
import { StickyCallBar } from "@/components/StickyCallBar";
import { TestimonialPlate } from "@/components/TestimonialPlate";
import { EV, STATS, YOUTUBE_TESTIMONIALS } from "@/lib/constants";
import { CuratedGallery, type GalleryPhoto } from "@/components/CuratedGallery";

/**
 * /chiropractic/ (DESIGN_DIRECTION 8.3): service LP on the 8.2 template,
 * room-violet accent (eyebrow ticks only). Pain-first serif H1, gauges plus
 * claims strip, benefits checklist, the verbatim education copy folded into
 * accordions on a light band, the adjustment plate strip (galleries 05+01
 * curated to 8, rest in lightbox), doctors, proof, closing. No candidacy or
 * MRI blocks. Sticky call bar from load.
 */

export const metadata: Metadata = {
  title: "Chiropractic Care",
  description:
    "Precise, brain-based chiropractic adjustments for neck and back pain, stiffness, and headaches in Grand Blanc, MI. Call 810.584.7170.",
  alternates: { canonical: "/chiropractic/" },
};

const ACCENT = "var(--color-room-violet)";

/** Verbatim: The Benefits Of Chiropractic. */
const BENEFITS = [
  "Spinal and extremity pain relief",
  "Headache relief",
  "Increased mobility and range of motion",
  "Decreased stiffness and muscular spasms",
  "Arthritic joint pain relief",
  "Increased performance and energy",
  "Increased sense of well being and relaxation",
  "Increased balance and coordination",
  "Reduced degeneration and risk of injury",
  "Enhanced tissue healing",
  "Decreased tissue inflammation",
];

/** The verbatim education copy, folded into accordions (light band). */
const EDUCATION: FaqItem[] = [
  {
    q: "The Goal Of Chiropractic",
    a: (
      <p>
        Because chiropractic treatments are primarily applied to the spinal
        region, many individuals incorrectly assume that chiropractors treat
        only back and neck ailments. While we do quickly and effectively
        eliminate back and neck pain, it&rsquo;s not the only goal. The
        objective is to restore and optimize human health. In fact, according
        to a statement from The Association of Chiropractic Colleges,
        &ldquo;The purpose of chiropractic is to optimize health.&rdquo;
      </p>
    ),
  },
  {
    q: "What Chiropractors Do",
    a: (
      <>
        <p>
          Practically speaking, chiropractors are primarily concerned with
          locating and treating vertebral subluxations.
        </p>
        <p>
          A vertebral subluxation is a complex of functional and/or structural
          and/or pathological articular (joint) changes that compromise neural
          integrity and may influence organ system function and general
          health.
        </p>
        <p>
          Using a number of unique and highly refined skills, the chiropractor
          checks the patient&rsquo;s spine for any misalignments, fixations or
          other abnormalities (vertebral subluxations). If subluxations or
          other abnormalities are detected, the chiropractor will generally
          apply a gentle force in a corrective manner to the affected spinal
          area.
        </p>
        <p>
          Chiropractors use many specialized techniques to identify and treat
          these spinal abnormalities and optimize overall health. In addition
          to spinal adjustive techniques, soft tissue techniques such as
          massage, dietary and nutritional counseling, physical therapies, and
          lifestyle modification programs are commonly employed.
        </p>
      </>
    ),
  },
  {
    q: "How Chiropractic Differs",
    a: (
      <>
        <p>
          There is a significant and very important difference between the way
          chiropractors and medical doctors approach health ailments.
        </p>
        <p>
          When evaluating and treating patients, chiropractors take a holistic
          approach which includes identifying and correcting the cause(s) of
          the patient&rsquo;s health ailment. In contrast, the medical
          approach tends to focus more on the treating the symptoms of a
          condition rather than focusing primarily on the actual cause(s).
        </p>
        <p>
          Chiropractors believe that correcting the cause of the problem
          provides significant long-term benefits over only treating the
          symptoms.
        </p>
      </>
    ),
  },
  {
    q: "How Chiropractic Works",
    a: (
      <>
        <p>
          You may be wondering&hellip; how can the same chiropractic treatment
          which effectively treats my back pain also optimize my health? The
          answer can be found by looking into the relationship between the
          spine and the nervous system.
        </p>
        <p>
          As you may already know, the nervous system is the master controller
          of all living cells, tissues and organs; orchestrating and
          coordinating all cellular functions. The spinal column encases the
          nervous system (spinal cord and nerve roots) and is responsible for
          its protection.
        </p>
        <p>
          Because of this intimate relationship, biomechanical and structural
          problems in the spinal column can irritate parts of the enclosed
          nervous system. This irritation can result from noxious inflammatory
          biochemicals released during tissue injury or may result from direct
          mechanical pressure. In either case, the functioning of the nervous
          system is negatively influenced as is the functioning of the cells,
          tissues and organs which are supplied by the affected nerve(s).
        </p>
        <p>
          The resulting ailment(s) depends on the cells, tissues and organs
          affected as well as the extent of nervous system compromise.
        </p>
        <p>
          In short, because the body&rsquo;s innate recuperative powers are
          affected by and integrated through the nervous system, correcting
          spinal abnormalities which irritate the nervous system can lead to a
          number of favorable results in patients suffering from various,
          seemingly non-spinal health conditions.
        </p>
      </>
    ),
  },
];

/** Galleries 05+01 curated to 8; all 23 reachable in the lightbox. */
const ADJUSTMENT_PHOTOS: GalleryPhoto[] = [
  {
    src: "/assets/images/gallery05/0bf767fa.jpg",
    alt: "A low back adjustment in the green treatment room",
    caption: "The green room",
    aspect: "aspect-[3/4]",
  },
  {
    src: "/assets/images/gallery01/12b59e9f.jpg",
    alt: "Dr. Christine adjusting a patient in the plum room, circle mirror behind",
    caption: "The plum room",
    aspect: "aspect-[3/4]",
  },
  {
    src: "/assets/images/gallery05/2274990e.jpg",
    alt: "A seated neck adjustment against the geometric wall mural",
    caption: "A seated adjustment",
    aspect: "aspect-[3/4]",
  },
  {
    src: "/assets/images/gallery01/8a40a8ed.jpg",
    alt: "Dr. Christine working on a patient's low back beneath the city art",
    caption: "Low back work",
    aspect: "aspect-[3/4]",
  },
  {
    src: "/assets/images/gallery05/ca52bce2.jpg",
    alt: "A neck check in the green room lamplight",
    caption: "A neck check",
    aspect: "aspect-[3/4]",
  },
  {
    src: "/assets/images/gallery01/594c253a.jpg",
    alt: "An adjustment on the drop table in the plum room",
    caption: "The drop table",
    aspect: "aspect-[3/4]",
  },
  {
    src: "/assets/images/gallery05/41564038.jpg",
    alt: "An adjustment in front of the brass hex tiles",
    caption: "The hex wall",
    aspect: "aspect-[3/4]",
  },
  {
    src: "/assets/images/gallery01/f0617784.jpg",
    alt: "An adjustment against the black and purple geometric wall",
    caption: "The purple room",
    aspect: "aspect-[3/4]",
  },
  {
    src: "/assets/images/gallery05/a6133a59.jpg",
    alt: "Dr. Christine at the standing desk between patients",
  },
  {
    src: "/assets/images/gallery05/24b27174.jpg",
    alt: "A conversation in the lobby chairs by the front window",
  },
  {
    src: "/assets/images/gallery01/cf97724d.jpg",
    alt: "A mom adjusted while her toddler watches",
  },
  {
    src: "/assets/images/gallery01/362d41f9.jpg",
    alt: "Holding a young patient's hand before an adjustment",
  },
  {
    src: "/assets/images/gallery01/0291af40.jpg",
    alt: "Adjustment photo from the treatment rooms",
  },
  {
    src: "/assets/images/gallery01/0a3b0022.jpg",
    alt: "Adjustment photo from the treatment rooms",
  },
  {
    src: "/assets/images/gallery01/210c4274.jpg",
    alt: "Adjustment photo from the treatment rooms",
  },
  {
    src: "/assets/images/gallery01/21b268d5.jpg",
    alt: "Adjustment photo from the treatment rooms",
  },
  {
    src: "/assets/images/gallery01/248ea426.jpg",
    alt: "Adjustment photo from the treatment rooms",
  },
  {
    src: "/assets/images/gallery01/26583b07.jpg",
    alt: "Adjustment photo from the treatment rooms",
  },
  {
    src: "/assets/images/gallery01/5b1c0ce9.jpg",
    alt: "Adjustment photo from the treatment rooms",
  },
  {
    src: "/assets/images/gallery01/69ec3dc1.jpg",
    alt: "Adjustment photo from the treatment rooms",
  },
  {
    src: "/assets/images/gallery01/720573ec.jpg",
    alt: "Adjustment photo from the treatment rooms",
  },
  {
    src: "/assets/images/gallery01/77ff229b.jpg",
    alt: "Adjustment photo from the treatment rooms",
  },
  {
    src: "/assets/images/gallery01/fae2770b.jpg",
    alt: "Adjustment photo from the treatment rooms",
  },
];

/** ACA infographics (image06-07): plates with lightbox, education section. */
const ACA_PLATES: GalleryPhoto[] = [
  {
    src: "/assets/images/image07.jpg",
    alt: "American Chiropractic Association Key Facts infographic, page 1",
    caption: "ACA Key Facts, page 1",
    aspect: "aspect-[3/4]",
  },
  {
    src: "/assets/images/image06.jpg",
    alt: "American Chiropractic Association Key Facts infographic, page 2",
    caption: "ACA Key Facts, page 2",
    aspect: "aspect-[3/4]",
  },
];

export default function ChiropracticPage() {
  return (
    <>
      <PhotoHero
        image="/assets/images/container29.jpg"
        imageAlt="Dr. Christine Hanczaryk adjusting a patient in the purple treatment room"
        objectPosition="60% 38%"
        eyebrow="Chiropractic care"
        accent={ACCENT}
        title="When your back gives out, everything else does too."
        lead="Precise, brain-based adjustments for neck and back pain, stiffness, and headaches."
        openNow
      >
        <CallDialArc>
          <CallButton location="hero" />
        </CallDialArc>
        <Button
          variant="outline"
          href="/new-patients/#book"
          trackEvent={{ event: EV.BOOK_CLICK, params: { location: "hero" } }}
        >
          Book an appointment
        </Button>
      </PhotoHero>

      {/* GAUGES: the one licensed gauge row, plus two grounded claims. */}
      <Band tone="espresso" pad="strip">
        <div className="grid items-center gap-x-12 gap-y-10 lg:grid-cols-2">
          <GaugeRow
            items={[STATS.years, STATS.since]}
            className="lg:grid-cols-2"
          />
          <Reveal>
            <Rule />
            <p className="text-lead py-5">
              A chiropractic neurology based center, committed to improving
              brain and nerve function.
            </p>
            <Rule />
            <p className="text-lead py-5">
              State-of-the-art digital x-ray technology.
            </p>
            <Rule />
          </Reveal>
        </div>
      </Band>

      {/* IS THIS YOUR PAIN? Benefits checklist on light. */}
      <Band tone="plaster">
        <Reveal>
          <Eyebrow accent={ACCENT}>Chiropractic care</Eyebrow>
          <h2 className="text-h2s mt-4">Is this your pain?</h2>
          <p className="text-body measure mt-6">
            Each year more than 15 million North Americans choose chiropractic
            for safe, natural and effective relief from back pain, neck pain,
            headaches, extremity pain, poor overall health, low energy levels
            and much more.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal>
            <div className="rounded-[4px] border border-(--hairline) bg-(--card-bg) p-6 shadow-(--card-shadow) sm:p-8">
              <h3 className="text-h3s">The Benefits Of Chiropractic</h3>
              <ul className="mt-4">
                {BENEFITS.map((line) => (
                  <li
                    key={line}
                    className="text-body border-b border-(--hairline) py-3"
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
            <blockquote className="lg:pt-4">
              <p className="text-quote">
                &ldquo;The purpose of chiropractic is to optimize
                health.&rdquo;
              </p>
              <footer className="text-mono-label mt-5 text-(--muted)">
                The Association of Chiropractic Colleges
              </footer>
            </blockquote>
            <p className="text-body measure mt-8">
              Welcome new, veteran and prospective chiropractic patients!
            </p>
            <p className="text-body measure mt-4">
              Thank you in advance for taking the time to discover chiropractic
              and its powerful effects on human health.
            </p>
          </Reveal>
        </div>
      </Band>

      {/* WHAT IS CHIROPRACTIC: education copy folded into accordions. */}
      <Band tone="bone">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow accent={ACCENT}>The education</Eyebrow>
              <h2 className="text-h2s mt-4">What Is Chiropractic?</h2>
              <p className="text-body measure mt-6">
                Chiropractors are primarily concerned with locating and
                treating vertebral subluxations. Open a section for the full
                copy, or call <TelText location="body" /> and ask the doctors
                directly.
              </p>
            </Reveal>
            <Reveal delay={0.07} className="mt-10">
              <CuratedGallery
                photos={ACA_PLATES}
                visibleCount={2}
                gridClassName="grid grid-cols-2 gap-5 max-w-md"
              />
            </Reveal>
          </div>
          <Reveal delay={0.07} className="lg:col-span-7">
            <Faq items={EDUCATION} phonePromptAfter={0} className="max-w-none" />
          </Reveal>
        </div>
      </Band>

      {/* THE ADJUSTMENT: curated strip, completeness in the lightbox. */}
      <Band tone="plaster">
        <Reveal>
          <Eyebrow accent={ACCENT}>The adjustment</Eyebrow>
          <h2 className="text-h2s mt-4">Real rooms, real adjustments.</h2>
        </Reveal>
        <CuratedGallery
          photos={ADJUSTMENT_PHOTOS}
          visibleCount={8}
          gridClassName="mt-10 grid gap-5 grid-cols-2 lg:grid-cols-4"
          viewAllLabel="View all 23 photos"
        />
      </Band>

      {/* YOUR DOCTORS */}
      <Band tone="bone">
        <Reveal>
          <Eyebrow accent={ACCENT}>Your doctors</Eyebrow>
          <h2 className="text-h2s mt-4">The hands behind the adjustment.</h2>
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

      {/* PROOF: one Google review card plus one video facade. */}
      <Band tone="plaster">
        <h2 className="sr-only">Patient proof</h2>
        <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-14">
          <Reveal>
            <TestimonialPlate
              name="Nicole Smith"
              screenshot="/assets/images/image13.jpg"
              screenshotAlt="Original Google review by Nicole Smith"
              quote="I absolutely love being a patient at Hanczaryk Chiropractic. The staff alone is worth coming for, always entertaining, always welcoming, and always attentive. I've dealt with severe back pain for over 15 years and have gone to other chiropractors who have not addressed the root of the issue and instead gave a one size fits all approach. Dr. Hanczaryk has been the first to fully dig into the root of my back pain and tailored a protocol for my unique situation."
            />
          </Reveal>
          <Reveal delay={0.07}>
            <YouTubeFacade
              videoId={YOUTUBE_TESTIMONIALS[0]}
              title="A patient story on video"
            />
            <div className="mt-6">
              <Button variant="outline" size="sm" href="/testimonials/" arrow>
                Read patient stories
              </Button>
            </div>
          </Reveal>
        </div>
      </Band>

      {/* CLOSING: the ask repeats; no dead ends. */}
      <Band tone="espresso">
        <Reveal className="max-w-2xl">
          <h2 className="text-h2s">Ready for your first adjustment?</h2>
          <p className="text-body mt-4 text-paper-50/80">
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

      <StickyCallBar fromLoad />
    </>
  );
}
