import type { Metadata } from "next";
import { Band, Eyebrow, Rule } from "@/components/Band";
import { Button, CallButton, TelText } from "@/components/Button";
import { YouTubeFacade } from "@/components/Embeds";
import { SlimHero } from "@/components/PageHero";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { StickyCallBar } from "@/components/StickyCallBar";
import { TestimonialPlate } from "@/components/TestimonialPlate";
import { EV, YOUTUBE_TESTIMONIALS } from "@/lib/constants";

/**
 * /testimonials/ (DESIGN_DIRECTION 8.9): retyped Google review cards with
 * view-original screenshot provenance (image11-14), the long-form patient
 * stories as quote bands, and the six-video wall as click-to-play facades.
 * Review text is retyped VERBATIM from the screenshots, hyphens and typos
 * included. No counts, no aggregate ratings, no stars, ever.
 */

export const metadata: Metadata = {
  title: "Testimonials",
  description:
    "Real patients, in their own words. Google reviews, patient stories, and video testimonials for Hanczaryk Chiropractic Neurology Group. Call 810.584.7170.",
  alternates: { canonical: "/testimonials/" },
};

/** Retyped verbatim from the untouched screenshots (the provenance). */
const REVIEWS = [
  {
    name: "Megan Smith",
    screenshot: "/assets/images/image12.jpg",
    quote:
      "I love this place. I started coming due to having a completely numb and painful right arm. Orthopedic doctors couldn't tell me what was wrong. I had every test you could. All it took was one visit here to realize I had mild degenerative disc disease already in my neck. I started adjustments and decompression and it has gotten so much better. I sleep better, I function better and it doesn't bother me at work anymore. My back has also improved from the adjustments I get. I have had so many mid back issues since a work injury in 2015, and since getting adjustments, it is SO much better. Along with my low back pain with standing for long periods of time, has decreased significantly. The staff is great, so funny and so welcoming. It's hard to find staff and offices that makes you feel accepted, welcomed and comfortable. But I have at this office from day 1. I have recommended this office to family and friends, and recommend it to anyone else also.",
  },
  {
    name: "Nicole Smith",
    screenshot: "/assets/images/image13.jpg",
    quote:
      "I absolutely love being a patient at Hanczaryk Chiropractic. The staff alone is worth coming for, always entertaining, always welcoming, and always attentive. I've dealt with severe back pain for over 15 years and have gone to other chiropractors who have not addressed the root of the issue and instead gave a one size fits all approach. Dr. Hanczaryk has been the first to fully dig into the root of my back pain and tailored a protocol for my unique situation. I still have a ways to go before I am to a pain free state, but have been able to find pretty dramatic relief for the first time in years. One of the best decisions I have ever made was deciding to come to this office, I only wish I did sooner!",
  },
  {
    name: "Corey Nichols",
    screenshot: "/assets/images/image14.jpg",
    quote:
      "There are not enough words to express how phenomenal Hanczaryk Chiropractic Neurology Group is - I've seen a few chiropractors in my day but Dr. Christine and Kelly have made every visit uniquely chaotic and such a great time to the point I feel like a part of a family created by the environment they've fostered. Dr. Christine is so incredibly knowledgeable about the chiropractic craft and Kelly is the bow on top - those type of people you can just enjoy and trust. It is very apparent they care about you and your health more than your pocket book and anyone who goes or has gone through their program would agree. I truly recommend the Hanczaryk Chiropractic Neurology Group to anyone seeking chiropractic care. Period.",
  },
  {
    name: "Kristine Mince",
    screenshot: "/assets/images/image11.jpg",
    quote:
      "Five stars are not enough!!! I had horrible all over body stiffness and neuropathy pain in my neck, both ankles and feet! So bad that by the end of my 8 hour shift I was visibly limping! I often drove home in tears thinking I'm too young to feel this old!! Fast forward 5 weeks and I no longer have ANY pain ANYWHERE!!! I'm no longer living on Tylenol and Motrin!! Dr Christine Hanczaryk and staff scooped me up at my lowest physical and mental point like a breath of fresh air! They have changed my life. I will be forever grateful and look forward to being a lifelong patient!!",
  },
];

/** The Harley story, verbatim from the home copy. */
const CANTU_QUOTE =
  "I am an avid Harley rider and before treatment, I was not able to walk correctly right after getting off my motorcycle. After only a few treatments of Non-Surgical Spinal Decompression and adjustments, I went for a trip that consisted of a 953 mile round trip motorcycle ride. I was able to do so with NO pain and was able to walk upright at each stop. I feel great and have referred several people to this office and Dr. Hanczaryk.";

/** Verbatim, attribution lifted to the footer. */
const VANESSA_QUOTE =
  "I was disappointed when I had to switch chiropractors due to insurance. However, when I got to this chiropractor, I was happily surprised. They are very comprehensive. They are fast, efficient and provide a wide range of services. Rather than just a basic adjustment I received Decompression, electrical muscle stimulation, and exercises to help support my new adjustments. We went over my follow up x-rays and progression of my spinal correction results. I am showing improvement. I am still not there yet, but I do have faith care chiropractic now.";

/** Theo's story, verbatim, line structure preserved as paragraphs. */
const THEO_PARAGRAPHS = [
  "Theo is almost 6 years old. He has been nonverbal with the exception of a couple words he used very sporadically (ma, go, eat). He never echoed a word or made sounds in response to someone queuing him.",
  "Theo usually only picked up a toy to put it in his mouth to chew on it.",
  "Theo has had insomnia for since he was 1.5 years old.",
  "Waking up almost every night around 3am.",
  "Theo has had severe self injurious behaviors since he was about 3 years old and started biting other people at about 4 and scratching others at 5.",
  "Two months ago, on a whim, and after discussing Theo with my chiropractor, I decided to see if chiropractic care would help him. Dr appointments can be really stressful for us and result in behaviors, so committing to going to an appointment a few times a week was not an easy decision. We completed the X-rays, he visited her 3 times a week the first couple weeks to get familiar with her and we are now successfully getting him adjusted twice a week.",
  "Theo has slept all night, 12 hours a night most nights ever since. He is starting to talk. He is playing with toys. He is looking at people's mouths when they talk to him. The difference our chiropractor has made in our lives is priceless, life changing and feels so much like a miracle or too good to be true. Never once did our pediatrician or neuro-psychologist suggest it. Thank you Dr. Christine for taking such good care of Theo and being so patient, kind and loving towards him!",
  "I'm still waking up at 3am but for no reason at all!",
  "Hoping that changes for me soon as my body adjusts to not being woke up all the time",
];

export default function TestimonialsPage() {
  return (
    <>
      <SlimHero
        eyebrow="Patient stories"
        title="Real patients, in their own words."
      >
        <CallButton location="hero" />
      </SlimHero>

      {/* GOOGLE REVIEWS: retyped verbatim, screenshots as provenance. */}
      <Band tone="plaster">
        <Reveal>
          <Eyebrow as="h2">Google reviews</Eyebrow>
        </Reveal>
        <RevealGroup className="mt-10 grid gap-5 sm:grid-cols-2">
          {REVIEWS.map((review) => (
            <RevealItem key={review.name} as="div" className="h-full">
              <TestimonialPlate
                quote={review.quote}
                name={review.name}
                screenshot={review.screenshot}
                screenshotAlt={`Original Google review by ${review.name}`}
                className="h-full"
              />
            </RevealItem>
          ))}
        </RevealGroup>
      </Band>

      {/* LONG-FORM STORIES */}
      <Band tone="bone">
        <Reveal>
          <Eyebrow as="h2">The longer stories</Eyebrow>
        </Reveal>

        <Reveal className="mt-10">
          <blockquote className="max-w-4xl">
            <p className="text-quote">&ldquo;{CANTU_QUOTE}&rdquo;</p>
            <footer className="text-mono-label mt-6">N. Cantu, Patient</footer>
          </blockquote>
        </Reveal>

        <Rule className="mt-14" />

        <Reveal className="mt-14">
          <blockquote className="max-w-3xl">
            <p className="text-quote">&ldquo;{VANESSA_QUOTE}&rdquo;</p>
            <footer className="text-mono-label mt-6">Vanessa</footer>
          </blockquote>
        </Reveal>

        <Rule className="mt-14" />

        {/* Theo's story keeps the quote-band frame: a designed serif
            italic opening line, then the verbatim body paragraphs. */}
        <Reveal className="mt-14">
          <h3 className="text-mono-label text-(--muted)">Theo&rsquo;s story</h3>
          <blockquote className="mt-6 max-w-3xl">
            <p className="text-lead italic">{THEO_PARAGRAPHS[0]}</p>
            <div className="text-body mt-5 grid gap-4">
              {THEO_PARAGRAPHS.slice(1).map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>
            <footer className="text-mono-label mt-6">Pickrell</footer>
          </blockquote>
        </Reveal>
      </Band>

      {/* VIDEO WALL: six facades, iframe on click only. */}
      <Band tone="plaster">
        <Reveal>
          <Eyebrow as="h2">Video stories</Eyebrow>
        </Reveal>
        <RevealGroup className="mt-10 grid gap-5 sm:grid-cols-2">
          {YOUTUBE_TESTIMONIALS.map((videoId, i) => (
            <RevealItem key={videoId} as="div">
              <YouTubeFacade
                videoId={videoId}
                title={`Patient story ${String(i + 1).padStart(2, "0")}`}
              />
            </RevealItem>
          ))}
        </RevealGroup>
      </Band>

      {/* CLOSING: no dead ends. */}
      <Band tone="espresso">
        <Reveal className="max-w-2xl">
          <h2 className="text-h2s">Your story could be next.</h2>
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
