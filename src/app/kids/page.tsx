import type { Metadata } from "next";
import { Band, Eyebrow, Rule } from "@/components/Band";
import { Button, CallButton, TelText } from "@/components/Button";
import { CallDialArc } from "@/components/BrassDial";
import { PhotoHero } from "@/components/PageHero";
import { Plate } from "@/components/Plate";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { StickyCallBar } from "@/components/StickyCallBar";
import { EV } from "@/lib/constants";
import { CuratedGallery, type GalleryPhoto } from "@/components/CuratedGallery";

/**
 * /kids/ (DESIGN_DIRECTION 8.5): the warm variant of the 8.2 template,
 * room-moss accent (eyebrow ticks only). No gauges beyond the hero. Theo's
 * story verbatim on a quiet card (typos and all). Galleries 04+03 curated
 * to 10 including the two dog photos; plain warm captions, NO figure
 * numbers on children. The dog caption is the page's one wink. Sticky call
 * bar from load.
 */

export const metadata: Metadata = {
  title: "Chiropractic and Kids",
  description:
    "Gentle, playful chiropractic visits for kids and families in Grand Blanc, MI. Call 810.584.7170.",
  alternates: { canonical: "/kids/" },
};

const ACCENT = "var(--color-room-moss)";

/** Theo's story, verbatim from the source testimonial (typos preserved). */
const THEO_STORY = [
  "Theo is almost 6 years old. He has been nonverbal with the exception of a couple words he used very sporadically (ma, go, eat). He never echoed a word or made sounds in response to someone queuing him.",
  "Theo usually only picked up a toy to put it in his mouth to chew on it.",
  "Theo has had insomnia for since he was 1.5 years old.",
  "Waking up almost every night around 3am.",
  "Theo has had severe self injurious behaviors since he was about 3 years old and started biting other people at about 4 and scratching others at 5.",
  "Two months ago, on a whim, and after discussing Theo with my chiropractor, I decided to see if chiropractic care would help him. Dr appointments can be really stressful for us and result in behaviors, so committing to going to an appointment a few times a week was not an easy decision. We completed the X-rays, he visited her 3 times a week the first couple weeks to get familiar with her and we are now successfully getting him adjusted twice a week.",
  "Theo has slept all night, 12 hours a night most nights ever since. He is starting to talk. He is playing with toys. He is looking at people's mouths when they talk to him. The difference our chiropractor has made in our lives is priceless, life changing and feels so much like a miracle or too good to be true. Never once did our pediatrician or neuro-psychologist suggest it. Thank you Dr. Christine for taking such good care of Theo and being so patient, kind and loving towards him!",
  "I'm still waking up at 3am but for no reason at all!",
  "Hoping that changes for me soon as my body adjusts to not being woke up all the time -Pickrell",
];

/** Galleries 04+03 curated to 10 (dogs included); all 29 in the lightbox.
 *  Plain warm captions; figure numbers never appear on children. */
const KIDS_PHOTOS: GalleryPhoto[] = [
  {
    src: "/assets/images/gallery04/29df79cd.jpg",
    alt: "A young boy getting a gentle back check in the green kids room",
    caption: "The green kids room",
    aspect: "aspect-square",
  },
  {
    src: "/assets/images/gallery04/9aab6244.jpg",
    alt: "A newborn on the table for a first check",
    caption: "A newborn visit",
    aspect: "aspect-square",
  },
  {
    src: "/assets/images/gallery04/2c221148.jpg",
    alt: "Dr. Micheil Hanczaryk smiling with a newborn on the table",
    caption: "Dr. Micheil and a new patient",
    aspect: "aspect-square",
  },
  {
    src: "/assets/images/gallery04/2d3fc440.jpg",
    alt: "A smiling doctor with an infant on the blanket in the green room",
    caption: "A first visit",
    aspect: "aspect-square",
  },
  {
    src: "/assets/images/gallery03/af04d915.jpg",
    alt: "A boy lying on the table for a gentle check in the plum room",
    caption: "The plum room",
    aspect: "aspect-square",
  },
  {
    src: "/assets/images/gallery03/1a7fa260.jpg",
    alt: "A toddler prone on the drop table during a visit",
    caption: "On the drop table",
    aspect: "aspect-square",
  },
  {
    src: "/assets/images/gallery03/1416e38b.jpg",
    alt: "A laughing toddler in plaid, held up high",
    caption: "Up and happy",
    aspect: "aspect-square",
  },
  {
    src: "/assets/images/gallery03/511d677e.jpg",
    alt: "A newborn cradled in the doctor's arms",
    caption: "The littlest patients",
    aspect: "aspect-square",
  },
  {
    src: "/assets/images/gallery03/3e2c2324.jpg",
    alt: "A dog sitting on a towel getting checked with an activator",
    caption: "We occasionally adjust a very good boy.",
    aspect: "aspect-square",
  },
  {
    src: "/assets/images/gallery03/9dd63d36.jpg",
    alt: "A scruffy dog held steady during his adjustment, treats nearby",
    aspect: "aspect-square",
  },
  {
    src: "/assets/images/gallery04/aaa4119b.jpg",
    alt: "Photo from the kids galleries",
  },
  {
    src: "/assets/images/gallery04/53896e02.jpg",
    alt: "Photo from the kids galleries",
  },
  {
    src: "/assets/images/gallery04/f2f84687.jpg",
    alt: "Photo from the kids galleries",
  },
  {
    src: "/assets/images/gallery04/bb81a6d2.jpg",
    alt: "Photo from the kids galleries",
  },
  {
    src: "/assets/images/gallery04/e59233df.jpg",
    alt: "Photo from the kids galleries",
  },
  {
    src: "/assets/images/gallery04/cde0ea62.jpg",
    alt: "Photo from the kids galleries",
  },
  {
    src: "/assets/images/gallery04/4ae27645.jpg",
    alt: "Photo from the kids galleries",
  },
  {
    src: "/assets/images/gallery04/b52b66f2.jpg",
    alt: "A collage of a toddler helping during his mom's adjustment",
  },
  {
    src: "/assets/images/gallery04/00a7b4ba.jpg",
    alt: "Photo from the kids galleries",
  },
  {
    src: "/assets/images/gallery04/91ace1e2.jpg",
    alt: "Photo from the kids galleries",
  },
  {
    src: "/assets/images/gallery04/396cd236.jpg",
    alt: "Photo from the kids galleries",
  },
  {
    src: "/assets/images/gallery04/a82e7288.jpg",
    alt: "A collage of a toddler's visit in the purple room",
  },
  {
    src: "/assets/images/gallery04/4a3eacb6.jpg",
    alt: "Photo from the kids galleries",
  },
  {
    src: "/assets/images/gallery04/cedf1792.jpg",
    alt: "Photo from the kids galleries",
  },
  {
    src: "/assets/images/gallery04/64359a04.jpg",
    alt: "Photo from the kids galleries",
  },
  {
    src: "/assets/images/gallery04/90e4789a.jpg",
    alt: "Photo from the kids galleries",
  },
  {
    src: "/assets/images/gallery03/44f4bdd3.jpg",
    alt: "Photo from the kids galleries",
  },
  {
    src: "/assets/images/gallery03/7c64cd1b.jpg",
    alt: "Photo from the kids galleries",
  },
  {
    src: "/assets/images/gallery03/24799c0c.jpg",
    alt: "Photo from the kids galleries",
  },
];

export default function KidsPage() {
  return (
    <>
      {/* The lg zoom shifts the bright white jacket right of the scrim
          feather; the capped text measure keeps every display word on
          scrimmed ground (QA contrast fix). */}
      <PhotoHero
        image="/assets/images/container16.jpg"
        imageAlt="A mom smiling over her baby during an adjustment in the green kids room"
        objectPosition="58% 35%"
        imgClassName="lg:scale-[1.22] lg:origin-[0%_60%]"
        textMaxW="max-w-xl"
        eyebrow="Chiropractic and kids"
        accent={ACCENT}
        title="Gentle care for growing spines."
        lead="Safe, playful visits for kids and families."
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

      {/* WHY KIDS SEE US: education copy, verbatim, on light. */}
      <Band tone="plaster">
        <Reveal>
          <Eyebrow accent={ACCENT}>Chiropractic care and kids</Eyebrow>
          <h2 className="text-h2s mt-4">Why kids see us</h2>
          <div className="text-body measure mt-6 grid gap-5">
            <p>
              Using a number of unique and highly refined skills, the
              chiropractor checks the patient&rsquo;s spine for any
              misalignments, fixations or other abnormalities (vertebral
              subluxations). If subluxations or other abnormalities are
              detected, the chiropractor will generally apply a gentle force
              in a corrective manner to the affected spinal area.
            </p>
            <p>
              While we do quickly and effectively eliminate back and neck
              pain, it&rsquo;s not the only goal. The objective is to restore
              and optimize human health.
            </p>
            <p>
              Visits are short and gentle, and the rooms are built for kids.
              Questions about your child? Call <TelText location="body" /> and
              ask.
            </p>
          </div>
          <div className="mt-8">
            <Button variant="outline" size="sm" href="/chiropractic/" arrow>
              What is chiropractic
            </Button>
          </div>
        </Reveal>
      </Band>

      {/* THEO'S STORY: quiet card, verbatim, gentle serif treatment. */}
      <Band tone="bone">
        <Reveal>
          <Eyebrow accent={ACCENT} as="h2">
            Theo&rsquo;s story
          </Eyebrow>
        </Reveal>
        <Reveal delay={0.07} className="mt-8">
          <figure className="max-w-3xl rounded-[4px] border border-(--hairline) bg-(--card-bg) p-7 shadow-(--card-shadow) sm:p-10">
            <blockquote className="text-body grid gap-4">
              {THEO_STORY.map((p) => (
                <p key={p.slice(0, 32)}>{p}</p>
              ))}
            </blockquote>
            <figcaption className="mt-6 border-t border-(--hairline) pt-4">
              <span className="text-mono-cap text-(--muted) uppercase">
                A patient family, in their own words
              </span>
            </figcaption>
          </figure>
        </Reveal>
      </Band>

      {/* THE KIDS ROOMS: curated strip, completeness in the lightbox. */}
      <Band tone="plaster">
        <Reveal>
          <Eyebrow accent={ACCENT}>The kids rooms</Eyebrow>
          <h2 className="text-h2s mt-4">Small patients, bright rooms.</h2>
        </Reveal>
        <CuratedGallery
          photos={KIDS_PHOTOS}
          visibleCount={10}
          gridClassName="mt-10 grid gap-5 grid-cols-2 lg:grid-cols-5"
          viewAllLabel="View all 29 photos"
        />
      </Band>

      {/* YOUR DOCTORS */}
      <Band tone="bone">
        <Reveal>
          <Eyebrow accent={ACCENT}>Your doctors</Eyebrow>
          <h2 className="text-h2s mt-4">The doctors behind the gentle visits.</h2>
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
              My father is a chiropractor and from the day I could say adjust
              me I knew it was the career path I would be taking.
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

      {/* CLOSING: the ask repeats; no dead ends. */}
      <Band tone="espresso">
        <Reveal className="max-w-2xl">
          <h2 className="text-h2s">Bring the whole family.</h2>
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
