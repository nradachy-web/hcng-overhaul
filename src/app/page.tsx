import type { Metadata } from "next";
import Script from "next/script";
import { Band, Eyebrow } from "@/components/Band";
import { Button, CallButton, TelText } from "@/components/Button";
import { SequenceCrescent } from "@/components/BrassDial";
import { MapFacade, VideoPlate } from "@/components/Embeds";
import { HomeHero } from "@/components/HomeHero";
import { OpenNow } from "@/components/OpenNow";
import { Plate } from "@/components/Plate";
import { CuratedGallery, type GalleryPhoto } from "@/components/CuratedGallery";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { GaugeRow } from "@/components/StatDial";
import { StickyCallBar } from "@/components/StickyCallBar";
import { TestimonialPlate } from "@/components/TestimonialPlate";
import { asset } from "@/lib/asset";
import { HOURS_TABLE, REVIEWWAVE_ID, STATS } from "@/lib/constants";

/**
 * Home (DESIGN_DIRECTION 8.1): instrument first, pain router, lounge, proof,
 * logistics. Licensed dark moments: hero, retreat band, closing. Everything
 * else on plaster/bone. One wink (retreat band). One gauge row.
 */

/** Title and description come from the root layout; canonical is per-page. */
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/** Per Dr. Christine (2026-09-22): her favorite photos sit here, front and
 *  center; the previous ones went back behind the LP headlines. Three are
 *  portrait, so the card media is 4:5. Order per her 9/22 text: kids third,
 *  massage fourth. */
const ROUTER_CARDS = [
  {
    n: 1,
    title: "Neck & back pain",
    symptoms: "stiffness, headaches",
    label: "Chiropractic",
    href: "/chiropractic/",
    image: "/assets/images/gallery05/41564038.jpg",
    alt: "Dr. Christine, laughing under a green Malibu cap, adjusting a patient in front of the brass hex wall",
    objectPosition: "50% 40%",
  },
  {
    n: 2,
    title: "Discs & sciatica",
    symptoms: "herniated, numbness",
    label: "Decompression",
    href: "/spinal-decompression/",
    image: "/assets/images/sep26/decompression-hero-console.jpg",
    alt: "Dr. Christine at the Hill DT console, a patient on the decompression table behind her",
    objectPosition: "50% 40%",
  },
  {
    n: 3,
    title: "Kids & families",
    symptoms: "gentle, playful",
    label: "Kids",
    href: "/kids/",
    image: "/assets/images/sep26/kids-hero-baby-green.jpg",
    alt: "Dr. Christine gently checking a baby on a dinosaur blanket in the green kids room",
    objectPosition: "50% 45%",
  },
  {
    n: 4,
    title: "Tension & stress",
    symptoms: "headaches, knots",
    label: "Massage",
    href: "/massage-therapy/",
    image: "/assets/images/container50.jpg",
    alt: "The massage room, lit by the candle wall",
    objectPosition: "50% 55%",
  },
];

const REVIEWS = [
  {
    name: "Megan Smith",
    screenshot: "/assets/images/image12.jpg",
    quote:
      "I love this place. I started coming due to having a completely numb and painful right arm. Orthopedic doctors couldn't tell me what was wrong. I had every test you could. All it took was one visit here to realize I had mild degenerative disc disease already in my neck. I started adjustments and decompression and it has gotten so much better. I sleep better, I function better and it doesn't bother me at work anymore.",
  },
  {
    name: "Nicole Smith",
    screenshot: "/assets/images/image13.jpg",
    quote:
      "I absolutely love being a patient at Hanczaryk Chiropractic. The staff alone is worth coming for, always entertaining, always welcoming, and always attentive. I've dealt with severe back pain for over 15 years and have gone to other chiropractors who have not addressed the root of the issue and instead gave a one size fits all approach. Dr. Hanczaryk has been the first to fully dig into the root of my back pain and tailored a protocol for my unique situation.",
  },
  {
    name: "Corey Nichols",
    screenshot: "/assets/images/image14.jpg",
    quote:
      "Dr. Christine is so incredibly knowledgeable about the chiropractic craft and Kelly is the bow on top - those type of people you can just enjoy and trust. It is very apparent they care about you and your health more than your pocket book and anyone who goes or has gone through their program would agree. I truly recommend the Hanczaryk Chiropractic Neurology Group to anyone seeking chiropractic care. Period.",
  },
];

/** The reception room, then every treatment room. Rooms, so figure numbers
 *  would be licensed, but this strip stays plain and hands off to the tour. */
const ROOM_PHOTOS: GalleryPhoto[] = [
  { src: "/assets/images/sep26/reception-room.jpg", alt: "The reception room: black leather sofa, monstera, the brass sunburst mirror, and the fireplace room beyond", caption: "The reception room", aspect: "aspect-[4/3]" },
  { src: "/assets/images/gallery02/35f2f78a.jpg", alt: "The purple treatment room with its white geometric lines", caption: "The purple room", aspect: "aspect-[4/3]" },
  { src: "/assets/images/gallery02/07f1ea7f.jpg", alt: "The green treatment room, table and lamp", caption: "The green room", aspect: "aspect-[4/3]" },
  { src: "/assets/images/gallery02/ae894733.jpg", alt: "A treatment room in deep plum, lit by a table lamp", caption: "The plum room", aspect: "aspect-[4/3]" },
  { src: "/assets/images/gallery02/b1335fd7.jpg", alt: "The red treatment room", caption: "The red room", aspect: "aspect-[4/3]" },
  { src: "/assets/images/gallery02/81242a0c.jpg", alt: "The chartreuse treatment room with two tables", caption: "The chartreuse room", aspect: "aspect-[4/3]" },
  { src: "/assets/images/sep26/rehab-room.jpg", alt: "The rehabilitation room: teal walls, posture stations, foam rollers, and stability balls", caption: "The rehabilitation room", aspect: "aspect-[4/3]" },
  { src: "/assets/images/gallery02/aceb31f1.jpg", alt: "The gallery hall: framed photographs along a warm hallway", caption: "The gallery hall", aspect: "aspect-[4/3]" },
];

export default function HomePage() {
  return (
    <>
      <HomeHero />

      {/* GAUGES: the one licensed gauge row on this page. */}
      <Band tone="espresso" pad="strip">
        <GaugeRow
          heroSync
          items={[
            STATS.success,
            STATS.satisfaction,
            STATS.years,
            STATS.since,
          ]}
        />
      </Band>

      {/* PAIN ROUTER */}
      <Band tone="plaster" id="router">
        <Reveal>
          <Eyebrow>Treatments</Eyebrow>
          <h2 className="text-h2s mt-4">Where does it hurt?</h2>
        </Reveal>
        <RevealGroup className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ROUTER_CARDS.map((card) => (
            <RevealItem
              key={card.href}
              as="article"
              className="plate flex h-full flex-col overflow-hidden rounded-[4px] border border-(--hairline) bg-(--card-bg) shadow-(--card-shadow)"
            >
              <div className="plate-media aspect-[4/5]">
                <img
                  src={asset(card.image)}
                  alt={card.alt}
                  loading="lazy"
                  className="h-full w-full object-cover"
                  style={{ objectPosition: card.objectPosition }}
                />
              </div>
              <div className="flex flex-1 flex-col gap-3 p-5">
                <div className="flex items-center gap-3">
                  <SequenceCrescent n={card.n} size={40} />
                  <h3 className="text-h3s">{card.title}</h3>
                </div>
                <p className="text-mono-cap text-(--muted) uppercase">
                  {card.symptoms}
                </p>
                <div className="mt-auto pt-2">
                  <Button variant="outline" size="sm" href={card.href} arrow>
                    {card.label}
                  </Button>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
        <Reveal className="mt-10">
          <p className="text-body">
            Not sure? Call and describe it. <TelText location="body" />
          </p>
        </Reveal>
      </Band>

      {/* WELCOME */}
      <Band tone="bone">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-24">
              <Reveal>
                <Eyebrow as="h2">A welcome from Dr. Christine</Eyebrow>
                <VideoPlate
                  src="/assets/videos/video04.mp4"
                  poster="/assets/videos/video04_poster.jpg"
                  title="A welcome from Dr. Christine Hanczaryk"
                  caption="Dr. Christine Hanczaryk"
                  className="mt-6 max-w-[340px]"
                />
              </Reveal>
            </div>
          </div>
          <div className="lg:col-span-7">
            <Reveal>
              <div className="text-body measure grid gap-5">
                <p>
                  Welcome to our cutting edge, high-tech, and exceptionally fun
                  office! We&rsquo;re revolutionizing healthcare with
                  state-of-the-art digital x-ray technology, innovative
                  Non-Surgical Spinal Decompression treatments, and advanced
                  chiropractic neurological services. Our commitment to
                  excellence ensures that our patients receive the most
                  effective and personalized care available. Join us on your
                  journey to optimal health and wellness in a uniquely
                  enjoyable environment.
                </p>
                <p>
                  Hanczaryk Chiropractic Neurology Group is more than just a
                  health care clinic, we are an urban retreat dedicated to the
                  overall health and well being of our patients. We have what
                  modern healthcare is missing, genuine care and comfort of our
                  patients is our highest mission. With our state of the art
                  training and equipment, our patients receive the highest
                  level of chiropractic and neurology healthcare that focuses
                  on getting them out of pain and back to living the life they
                  deserve! We strive to find the cause of disease as well as
                  develop an individualized treatment plan specially designed
                  for each patient. Pain relief is our passion.
                </p>
                <p>
                  We acknowledge and recognize the innate wisdom of the body
                  and its own recuperative powers. We are a chiropractic
                  neurology based center that is committed to improving brain
                  and nerve function, thus improving the quality of life,
                  through pain relief. Our health care team strives to
                  anticipate the unexpressed health care wishes of each patient
                  which will provide one of a kind world class health care in a
                  world class facility. We are located conveniently at 8185
                  Holly Rd Suite #14, Grand Blanc, MI 48439.
                </p>
                <p>Yours in health,</p>
              </div>
              <p className="mt-4 font-serif text-[22px] italic">
                Dr. Christine Hanczaryk
              </p>
              <p className="text-mono-cap mt-1 text-(--muted) uppercase">
                Chiropractor
              </p>
            </Reveal>
          </div>
        </div>
      </Band>

      {/* RETREAT: licensed dark moment two of three. */}
      <Band tone="espresso-deep">
        <Reveal>
          <Eyebrow as="h2">Our urban retreat</Eyebrow>
          <blockquote className="mt-7 max-w-3xl">
            <p className="text-quote">
              &ldquo;Step in to our urban retreat and we will prove to you that
              you can change your life.&rdquo;
            </p>
            <footer className="text-mono-label mt-5 text-paper-50/60">
              Dr. Christine Hanczaryk
            </footer>
          </blockquote>
        </Reveal>
        {/* Per Dr. Christine (2026-09-21): the front reception room leads,
            and every treatment room shows, not one. */}
        <CuratedGallery
          photos={ROOM_PHOTOS}
          visibleCount={8}
          gridClassName="mt-12 grid gap-5 grid-cols-2 lg:grid-cols-4"
        />
        <Reveal className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
          <Button variant="outline" href="/our-office/" arrow>
            Tour the office
          </Button>
          <p className="text-body text-paper-50/60 italic">
            Yes, that is a candle wall. Yes, you may nap.
          </p>
        </Reveal>
      </Band>

      {/* PROOF */}
      <Band tone="plaster">
        <h2 className="sr-only">Patient stories</h2>
        <Reveal>
          <blockquote className="max-w-4xl">
            <p className="text-quote">
              &ldquo;I am an avid Harley rider and before treatment, I was not
              able to walk correctly right after getting off my motorcycle.
              After only a few treatments of Non-Surgical Spinal Decompression
              and adjustments, I went for a trip that consisted of a 953 mile
              round trip motorcycle ride. I was able to do so with NO pain and
              was able to walk upright at each stop. I feel great and have
              referred several people to this office and Dr.
              Hanczaryk.&rdquo;
            </p>
            <footer className="text-mono-label mt-6">
              N. Cantu, Patient
            </footer>
          </blockquote>
        </Reveal>
        <RevealGroup className="mt-14 grid gap-5 lg:grid-cols-3">
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
        <Reveal className="mt-10">
          <Button variant="outline" href="/testimonials/" arrow>
            Read patient stories
          </Button>
        </Reveal>
      </Band>

      {/* VISIT */}
      <Band tone="bone">
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

      {/* CLOSING: licensed dark moment three of three. No dead ends. */}
      <Band tone="espresso">
        <Reveal className="max-w-2xl">
          <h2 className="text-h2s">New Patient Forms</h2>
          <p className="text-body mt-4 text-paper-50/80">
            Our patient forms are made available online so they can be
            completed in the convenience of your own home or office.
          </p>
          <p className="text-body mt-3 text-paper-50/80">
            Call <TelText location="body" />. Or send the form and we will
            call you.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-4">
            <CallButton location="body" />
            <Button variant="outline" href="/new-patients/" arrow>
              New patient forms
            </Button>
          </div>
        </Reveal>
      </Band>

      <StickyCallBar />

      {/* ReviewWave widget: deferred, home only, as on the source site. */}
      <Script
        src="https://cdn.reviewwave.com/js/reviewwave.js"
        data-id={REVIEWWAVE_ID}
        strategy="lazyOnload"
      />
    </>
  );
}
