import type { Metadata } from "next";
import { Band, Eyebrow, Rule } from "@/components/Band";
import { Button, CallButton, TelText } from "@/components/Button";
import { CrescentMark } from "@/components/BrassDial";
import { SlimHero } from "@/components/PageHero";
import { Plate } from "@/components/Plate";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { StickyCallBar } from "@/components/StickyCallBar";
import { EV } from "@/lib/constants";
import { CuratedGallery, type GalleryPhoto } from "@/components/CuratedGallery";

/** The team, together. Sent by Dr. Christine 2026-09-21 ("add to meet the
 *  team"). People, so plain captions and no figure numbers. */
const TEAM_PHOTOS: GalleryPhoto[] = [
  { src: "/assets/images/sep26/team-four-window.jpg", alt: "The four of them by the front window, Dr. Christine in the patterned chair", caption: "The team", aspect: "aspect-[3/4]" },
  { src: "/assets/images/sep26/team-kelli-christine-laugh.jpg", alt: "Kelli and Dr. Christine laughing together on the sofa", caption: "Kelli and Dr. Christine", aspect: "aspect-[3/4]" },
  { src: "/assets/images/sep26/team-three-window.jpg", alt: "Three of the team by the front window", caption: "By the window", aspect: "aspect-[3/4]" },
  { src: "/assets/images/sep26/team-kelli-christine-mirror.jpg", alt: "Kelli and Dr. Christine seated under the brass sunburst mirror", caption: "Under the mirror", aspect: "aspect-[3/4]" },
  { src: "/assets/images/sep26/team-christine-kelli-sofa.jpg", alt: "Dr. Christine and Kelli on the black leather sofa", caption: "The sofa", aspect: "aspect-[3/4]" },
  { src: "/assets/images/sep26/team-kelli-christine-mirror-2.jpg", alt: "Kelli and Dr. Christine in front of the mirror", caption: "Kelli and Dr. Christine", aspect: "aspect-[3/4]" },
  /* Landscape group shots: nobody gets cropped out, so lightbox only. */
  { src: "/assets/images/sep26/team-three-bw.jpg", alt: "Three of the team in black and white in front of the brass mirror", caption: "The reception room" },
  { src: "/assets/images/sep26/team-four-sofa.jpg", alt: "The whole team seated on the sofa under the brass mirror", caption: "All four" },
];

/**
 * /meet-the-team/ (DESIGN_DIRECTION 8.7): physicians and staff merged onto
 * one page. One Micheil block only (the source duplicates it; image03 and
 * image09 are byte-identical, image03 ships). Bios verbatim, typos and all;
 * portraits in true color with plain captions and NO figure numbers; the
 * legacy wp-content PDF links around portraits are removed. Wendy gets her
 * name only; no invented title or bio. Long-form reading stays on light.
 */

export const metadata: Metadata = {
  title: "Meet the Team",
  description:
    "Dr. Christine Hanczaryk, Dr. Micheil Hanczaryk, and the staff at Hanczaryk Chiropractic Neurology Group in Grand Blanc, MI. Call 810.584.7170.",
  alternates: { canonical: "/meet-the-team/" },
};

/** Verbatim first-person bio, one paragraph, typos preserved. */
const CHRISTINE_BIO =
  "My first love for chiropractic came at a very early age-actually, I’m sure I was innately born with it. My father is a chiropractor and from the day I could say adjust me I knew it was the career path I would be taking. At the end of the day, my goal is thriving on being who I am and telling it like it is. Come see us to experience what it’s like for us to assist your body in a life change. My father always said “when your body is in a state of dis-ease, the disease process begins.” This could not be more true. We live our lives to the fullest and because of this normal wear and tear happens to our bodies. With that said, losing your passions because of pain and needing to get your life back is not normal and is not wear and tear. My passion for not only chiropractic care but the human heart and soul is what makes me different. I truly care. You as the patients are my first priority. I have made it my life’s mission to get as many people under chiropractic care as I can so they can live the life they deserve. No matter the circumstance, it can always be better. Step in to our urban retreat and we will prove to you that you can change your life and live at the potential you deserve. Welcome to our home!";

/** Verbatim narrative lead, two paragraphs, typos preserved. */
const MICHEIL_PARAGRAPHS = [
  "Dr. Hanczaryk, who founded and owned Bristol Chiropractic Centre, P.C. for 47 years, is a Flint native, and a graduate of the University of Michigan. Dr. Hanczaryk received his Doctorate from Palmer Chiropractic University graduating Magna Cum Laude in 1976. His post-graduate studies include University of Michigan, Gonstead Chiropractic Clinic, Erhardt Roentenological Studies, Parker Resource Foundation, along with certification in Paraspinal Surface Electromyography.",
  "Dr. Hanczaryk was featured in Parker Resource Foundation Profiles and was awarded the Chiropractor of the Year award. He is one of the most sought after speakers in the chiropractic profession, an author of numerous published chiropractic articles, and co-author of three books including Chicken Soup for the Chiropractic Soul. Dr. Hanczaryk belongs to many organizations including the A.C.A., M.A.C., and is the chairman of the prestigious Chiropractic Knights of the Round Table.",
];

/** The record: ledger rows condensed from the verbatim credentials. */
const RECORD_ROWS = [
  {
    label: "Doctorate",
    value: "Palmer College of Chiropractic, Magna Cum Laude, 1976",
  },
  { label: "Board", value: "Certified, Surface EMG" },
  { label: "Honors", value: "Chiropractor of the Year, Parker Foundation, 1985" },
  { label: "Lectures", value: "Over 5,000 given" },
];

/** The long credential lists, verbatim, folded into labeled accordions. */
const MICHEIL_ACCORDIONS: {
  title: string;
  quote: string;
  lines: string[];
}[] = [
  {
    title: "A Lifelong Commitment to education…",
    quote:
      "“With so many advancements being made each year in chiropractic, I don’t think my education will ever end. I plan to continually take classes to learn the latest ways to soothe your pain.”",
    lines: [
      "Graduate: B.A University of Michigan, D.C., Palmer College of Chiropractic",
      "Continuing Education Classes taken annually",
    ],
  },
  {
    title: "Working with others to find the best ways to care for you…",
    quote:
      "“Having a team of professionals on your side is of great importance. When we get together, we discuss which treatments we’ve found most effective. So when you come to me, you won’t jsut get the expertise of one chiropractor. You will benefit from the shared knowledge of our team.”",
    lines: [
      "Past District 4 President and Board Member: Michigan Chiropractic Society",
      "Board Certified: Surface EMG",
      "Member: American Chiropractic Society",
      "Michigan Association of Chiropractors",
      "International Chiropractic Association",
    ],
  },
  {
    title: "Using his expertise to help people around the world",
    quote:
      "“I believe it’s important to share what I’ve learned. My articles, lectures, videos, classes, and consultations give me the opportunity to help people in other communities live to the fullest. I think that’s the whole point of healthcare.”",
    lines: [
      "United States and Canada Chiropractic Management Consultant",
      "Instructor: Parker Chiropractic Resource Foundation",
      "Lecturer: Over 5,000 lectures given on a variety of key topics",
      "Coauthor: Seven Steps to Success, Volumes 1and 2",
      "Author: Several professional journal articles, Chicken Soup for the Chiropractic Soul contributing story “You’re No Doctor”",
      "Producer/Director: More than 25 chiropractic training videos.",
    ],
  },
  {
    title: "Honored by the professional community",
    quote:
      "“Being honored by other professionals is exciting. It shows that they truly value my work and my contribution to the chiropractic profession.”",
    lines: [
      "Voted Chiropractor of the year: Parker Chiropractic Research Foundation, 1985",
      "Member: Chiropractic Knights of the Roundtable",
      "One of only six chiropractors featured in the publication “Profiles: An Invitation to Success”",
    ],
  },
  {
    title: "Donating his time to help end America’s back and neck pain",
    quote:
      "“There are thousands of people around the country who face terrible pain everyday. I want to do my part to help them feel good again. That’s why I’m actively involved in these important national groups.”",
    lines: [
      "Member: National Posture Week Chairman",
      "National Ski Patrol",
      "Scoliosis Committee",
    ],
  },
];

/** Verbatim staff bios; Wendy has no title or bio in source, invent nothing. */
const KELLI_BIO =
  "My name is Kelli Boothe and I am one of the first faces you’ll see when coming to Hanczaryk Chiropractic Neurology Group. I graduated from Michigan State University and was a member of the Spartan Marching Band’s Color Guard. I have many hobbies including scrapbooking and photography. Aside from those, I have many passions. One of my greatest passions is Spartan Football! Through the years, I have personally been a patient under chiropractic care and after learning about the benefits of it this has become another passion of mine. With my own symptoms, I have firsthand experience of how much chiropractic care can help and I am fortunate to have a career that allows me to watch others find relief! I have been working at Hanczaryk Chiropractic Neurology Group since September 2014 and have since watched many people experience the advantages of chiropractic care. I love to pass on the good word in health care!";

const BECKI_BIO =
  "Becki has been employed by Hanczaryk Chiropractic Neurology Group for 21 years, she is our Administrative Service and Insurance Manager. Her purpose is to insure that patient care and insurance coverage are as seamless and smooth as possible. Becki has earned an associates degree in Insurance Billing and is a certified coder and biller. She has been teaching billing/coding for 15 years at the college level.";

function CredentialAccordion({
  title,
  quote,
  lines,
}: {
  title: string;
  quote: string;
  lines: string[];
}) {
  return (
    <details className="faq-item border-b border-(--hairline)">
      <summary className="flex items-center justify-between gap-4 py-5">
        <span className="font-serif text-[18px] leading-snug font-semibold">
          {title}
        </span>
        <span className="faq-marker shrink-0 text-(--brass)">
          <CrescentMark size={16} />
        </span>
      </summary>
      <div className="grid gap-4 pb-6">
        <p className="text-body text-(--muted) italic">{quote}</p>
        <ul className="text-body grid gap-1.5">
          {lines.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </div>
    </details>
  );
}

export default function MeetTheTeamPage() {
  return (
    <>
      {/* Hero: the whole team on the sofa under the mirror, sent by Dr.
          Christine 2026-09-21. */}
      <SlimHero
        image="/assets/images/sep26/team-four-sofa.jpg"
        imageAlt="The whole team seated on the black leather sofa under the brass sunburst mirror"
        objectPosition="50% 42%"
        minH="min-h-[56vh]"
        eyebrow="The practice"
        title="Meet the team that answers when you call."
      >
        <CallButton location="hero" />
      </SlimHero>

      {/* PLATE 01: Dr. Christine */}
      <Band tone="plaster">
        <Reveal>
          <Eyebrow as="h2">Meet The Physicians</Eyebrow>
        </Reveal>
        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Her two portraits, sent 2026-09-21 ("add to me page"). */}
          <div className="lg:col-span-5">
            <RevealGroup className="grid max-w-[380px] gap-5">
              <RevealItem as="div">
                <Plate
                  src="/assets/images/sep26/christine-drip-painting.jpg"
                  alt="Dr. Christine Hanczaryk seated in a white skirt beneath the drip painting, a monstera beside her"
                  caption="Dr. Christine Hanczaryk"
                />
              </RevealItem>
              <RevealItem as="div">
                <Plate
                  src="/assets/images/sep26/christine-healthy-self-bw.jpg"
                  alt="Dr. Christine pointing at the Healthy Self Heal Thy Self sign, in black and white"
                  caption="Healthy self, heal thy self"
                  aspect="aspect-[4/5]"
                  objectPosition="50% 30%"
                />
              </RevealItem>
            </RevealGroup>
          </div>
          <div className="lg:col-span-7">
            <Reveal>
              <h3 className="text-h2s">Dr. Christine Hanczaryk</h3>
              <p className="text-mono-label mt-2 text-(--muted)">Chiropractor</p>
              <blockquote className="mt-7">
                <p className="text-quote">
                  &ldquo;from the day I could say adjust me&hellip;&rdquo;
                </p>
              </blockquote>
              <p className="text-body measure mt-7">{CHRISTINE_BIO}</p>
            </Reveal>
          </div>
        </div>
      </Band>

      {/* PLATE 02: Dr. Micheil, mirrored */}
      <Band tone="bone">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <Reveal>
              <h3 className="text-h2s">Dr. Micheil Hanczaryk</h3>
              <p className="text-mono-label mt-2 text-(--muted)">Chiropractor</p>
              <div className="text-body measure mt-7 grid gap-5">
                {MICHEIL_PARAGRAPHS.map((paragraph) => (
                  <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                ))}
              </div>
            </Reveal>

            <Reveal className="mt-10">
              <h4 className="text-mono-label text-(--muted)">The record</h4>
              <div className="mt-4">
                <Rule />
                {RECORD_ROWS.map((row) => (
                  <div key={row.label}>
                    <div className="grid grid-cols-12 items-baseline gap-4 py-3.5">
                      <p className="text-mono-label col-span-4 text-(--muted) sm:col-span-3">
                        {row.label}
                      </p>
                      <p className="text-body col-span-8 sm:col-span-9">
                        {row.value}
                      </p>
                    </div>
                    <Rule />
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal className="mt-10">
              <h4 className="sr-only">Full credentials</h4>
              <div className="measure border-t border-(--hairline)">
                {MICHEIL_ACCORDIONS.map((section) => (
                  <CredentialAccordion key={section.title} {...section} />
                ))}
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            <Reveal delay={0.07} className="lg:sticky lg:top-24">
              <Plate
                src="/assets/images/image03.jpg"
                alt="Dr. Micheil Hanczaryk, Chiropractor"
                caption="Dr. Micheil Hanczaryk"
                className="max-w-[380px]"
              />
            </Reveal>
          </div>
        </div>
      </Band>

      {/* THE STAFF */}
      <Band tone="plaster">
        <Reveal>
          <Eyebrow as="h2">Meet The Staff</Eyebrow>
        </Reveal>
        <RevealGroup className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <RevealItem as="article">
            <Plate
              src="/assets/images/image08.jpg"
              alt="Kelli, Office Coordinator"
              caption="Kelli"
              aspect="aspect-[3/4]"
              objectPosition="50% 25%"
            />
            <h3 className="text-h3s mt-6">Kelli</h3>
            <p className="text-mono-label mt-1 text-(--muted)">
              Office Coordinator
            </p>
            <p className="text-body mt-4">{KELLI_BIO}</p>
          </RevealItem>
          <RevealItem as="article">
            <Plate
              src="/assets/images/image10.jpg"
              alt="Becki, Biller"
              caption="Becki"
              aspect="aspect-[3/4]"
              objectPosition="50% 30%"
            />
            <h3 className="text-h3s mt-6">Becki</h3>
            <p className="text-mono-label mt-1 text-(--muted)">Biller</p>
            <p className="text-body mt-4">{BECKI_BIO}</p>
          </RevealItem>
          <RevealItem as="article">
            <Plate
              src="/assets/images/image05.jpg"
              alt="Wendy"
              caption="Wendy"
              aspect="aspect-[3/4]"
              objectPosition="50% 30%"
            />
            <h3 className="text-h3s mt-6">Wendy</h3>
          </RevealItem>
        </RevealGroup>
      </Band>

      {/* THE TEAM, TOGETHER */}
      <Band tone="bone">
        <Reveal>
          <Eyebrow as="h2">Together</Eyebrow>
          <p className="text-h2s mt-4 max-w-2xl">The faces you will see every visit.</p>
        </Reveal>
        <CuratedGallery
          photos={TEAM_PHOTOS}
          visibleCount={6}
          gridClassName="mt-10 grid gap-5 grid-cols-2 lg:grid-cols-3"
          viewAllLabel="View all 8 photos"
        />
      </Band>

      {/* CLOSING: no dead ends. */}
      <Band tone="espresso">
        <Reveal className="max-w-2xl">
          <h2 className="text-h2s">
            48 years of combined practice. One phone number.
          </h2>
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

      <StickyCallBar />
    </>
  );
}
