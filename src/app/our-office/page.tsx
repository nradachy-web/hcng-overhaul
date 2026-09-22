import type { Metadata } from "next";
import { Band, Eyebrow, Rule } from "@/components/Band";
import { Button, CallButton, TelText } from "@/components/Button";
import { VideoPlate } from "@/components/Embeds";
import { OpenNow } from "@/components/OpenNow";
import { PhotoHero } from "@/components/PageHero";
import { Plate } from "@/components/Plate";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { StickyCallBar } from "@/components/StickyCallBar";
import { EV, HOURS_TABLE, SOCIALS, TIKTOK_HANDLE } from "@/lib/constants";
import { TourStrip, type TourPhoto } from "./TourStrip";
import { CuratedGallery, type GalleryPhoto } from "@/components/CuratedGallery";

/**
 * /our-office/ (DESIGN_DIRECTION 8.8): the retreat, the one licensed
 * dark-majority page. The 32 gallery02 photos become a named-room tour with
 * scroll-snap strips and a lightbox for completeness; figure numbers are
 * licensed on these room chapters (never on people or events). Closes on
 * plaster as the visual rest. The old What's Happening content folds in as
 * the Life at HCNG strip; Fun Fact Friday becomes the TikTok plaque card.
 */

export const metadata: Metadata = {
  title: "Our Urban Retreat",
  description:
    "Tour the office: the reception room, treatment rooms, rehabilitation room, and the words on our walls. 8185 Holly Road Suite 14, Grand Blanc, MI. Call 810.584.7170.",
  alternates: { canonical: "/our-office/" },
};

const TIKTOK_URL = SOCIALS.find((s) => s.label === "TikTok")!.href;

type Chapter = {
  id: string;
  n: string;
  title: string;
  photos: TourPhoto[];
};

/** All 32 gallery02 photos, assigned to named rooms once at build time. */
const CHAPTERS: Chapter[] = [
  {
    id: "front-desk",
    n: "01",
    title: "The Front Desk",
    photos: [
      {
        src: "/assets/images/gallery02/51164a8a.jpg",
        alt: "The front desk: a tiled reception counter under warm downlights, plants mounted on the wall",
        caption: "The front desk",
        fig: "FIG. 01",
        wide: true,
      },
      {
        src: "/assets/images/gallery02/19e327e5.jpg",
        alt: "A succulent, a carved hand, and the crescent C card on the granite counter",
        caption: "Desk details",
        fig: "FIG. 02",
      },
      {
        src: "/assets/images/gallery02/d9df5df5.jpg",
        alt: "A ladder shelf of plants, pillows, and products beside a sign that reads the things you take for granted someone else is praying for",
        caption: "The wellness shelf",
        fig: "FIG. 03",
      },
      {
        src: "/assets/images/gallery02/fcad252a.jpg",
        alt: "A glass-top side table holding a book titled Live Good",
        caption: "Live good",
        fig: "FIG. 04",
        wide: true,
      },
    ],
  },
  {
    id: "reception-room",
    n: "02",
    title: "The Reception Room",
    photos: [
      {
        src: "/assets/images/sep26/reception-room.jpg",
        alt: "The reception room: black leather sofa, monstera, the brass sunburst mirror, and the fireplace room beyond",
        caption: "The reception room",
        fig: "FIG. 05",
        wide: true,
      },
      {
        src: "/assets/images/gallery02/7a0edab8.jpg",
        alt: "The reception room: a black leather sofa and the brass sunburst mirror on a charcoal wall",
        caption: "The mirror wall",
        fig: "FIG. 06",
        wide: true,
      },
      {
        src: "/assets/images/gallery02/a2217a66.jpg",
        alt: "The reception room looking toward the fireplace room, monstera plants and a black sofa",
        caption: "Toward the fireplace",
        fig: "FIG. 07",
        wide: true,
      },
      {
        src: "/assets/images/gallery02/dcdc267f.jpg",
        alt: "The fireplace corner: white mantel, fur rug, poufs, and a geometric wood pendant light",
        caption: "The fireplace corner",
        fig: "FIG. 08",
      },
      {
        src: "/assets/images/gallery02/8aa12982.jpg",
        alt: "A Pac-Man arcade table with two yellow stools under an antler and macrame wall hanging",
        caption: "The arcade corner",
        fig: "FIG. 09",
      },
    ],
  },
  {
    id: "treatment-rooms",
    n: "03",
    title: "The Treatment Rooms",
    photos: [
      {
        src: "/assets/images/gallery02/35f2f78a.jpg",
        alt: "The purple treatment room: white geometric lines on the wall and a black lounge chair",
        caption: "The purple room",
        fig: "FIG. 10",
      },
      {
        src: "/assets/images/gallery02/07f1ea7f.jpg",
        alt: "The green treatment room: adjustment table, two black chairs, and a table lamp",
        caption: "The green room",
        fig: "FIG. 11",
        wide: true,
      },
      {
        src: "/assets/images/gallery02/ae894733.jpg",
        alt: "The plum treatment room, lit by a table lamp",
        caption: "The plum room",
        fig: "FIG. 12",
      },
      {
        src: "/assets/images/gallery02/b1335fd7.jpg",
        alt: "The red treatment room: an adjustment table, a corkboard map of the United States, and a lamp",
        caption: "The red room",
        fig: "FIG. 13",
        wide: true,
      },
      {
        src: "/assets/images/gallery02/407b4013.jpg",
        alt: "The red treatment room with two adjustment tables and framed art",
        caption: "Two tables",
        fig: "FIG. 14",
        wide: true,
      },
      {
        src: "/assets/images/gallery02/81242a0c.jpg",
        alt: "The chartreuse treatment room: two adjustment tables under a Be A Good Person canvas",
        caption: "The chartreuse room",
        fig: "FIG. 15",
      },
    ],
  },
  {
    id: "rehabilitation-room",
    n: "04",
    title: "The Rehabilitation Room",
    photos: [
      {
        src: "/assets/images/sep26/rehab-room.jpg",
        alt: "The rehabilitation room: teal walls, posture stations, foam rollers, and stability balls on a wood floor",
        caption: "The rehabilitation room",
        fig: "FIG. 16",
        wide: true,
      },
      {
        src: "/assets/images/gallery02/5db6c183.jpg",
        alt: "The hallway approach to the rehabilitation room, barn doors and track lighting",
        caption: "The approach",
        fig: "FIG. 17",
      },
      {
        src: "/assets/images/gallery02/12cc45a1.jpg",
        alt: "The rehabilitation room: green walls, posture stations, and stability balls on a wood floor",
        caption: "The stations",
        fig: "FIG. 18",
        wide: true,
      },
      {
        src: "/assets/images/gallery02/2c853bd1.jpg",
        alt: "Posture stations and stability balls along the therapy room wall",
        caption: "Posture stations",
        fig: "FIG. 19",
      },
      {
        src: "/assets/images/gallery02/40e2abc3.jpg",
        alt: "The therapy room's green wall with training stations and mirrors",
        caption: "The green wall",
        fig: "FIG. 20",
      },
      {
        src: "/assets/images/gallery02/88ab75c1.jpg",
        alt: "Foam rollers and stability balls in the therapy room",
        caption: "Rollers and balls",
        fig: "FIG. 21",
      },
      {
        src: "/assets/images/gallery02/d3764c20.jpg",
        alt: "Foam rollers and stability balls below the wood slat wall",
        caption: "The gear",
        fig: "FIG. 22",
        wide: true,
      },
    ],
  },
  {
    id: "gallery-hall",
    n: "05",
    title: "The Gallery Hall",
    photos: [
      {
        src: "/assets/images/gallery02/aceb31f1.jpg",
        alt: "Framed photographs along the carpeted hallway",
        caption: "The gallery hall",
        fig: "FIG. 23",
      },
      {
        src: "/assets/images/gallery02/798d6e6d.jpg",
        alt: "The hallway of barn doors and track lighting, the lobby at the far end",
        caption: "Down the hall",
        fig: "FIG. 24",
      },
      {
        src: "/assets/images/gallery02/4e624f4c.jpg",
        alt: "A framed print that reads Life is very short and there's no time for fussing and fighting my friends",
        caption: "Life is very short",
        fig: "FIG. 25",
      },
      {
        src: "/assets/images/gallery02/575fbd1d.jpg",
        alt: "A wall sign that reads The only way to do great work is to love what you do",
        caption: "Great work",
        fig: "FIG. 26",
      },
      {
        src: "/assets/images/gallery02/4a6b97c9.jpg",
        alt: "A canvas by the window that reads Live like you mean it",
        caption: "Live like you mean it",
        fig: "FIG. 27",
        wide: true,
      },
      {
        src: "/assets/images/gallery02/f90b1284.jpg",
        alt: "The welcome manifesto sign beside the window blinds",
        caption: "You are welcome here",
        fig: "FIG. 28",
        wide: true,
      },
    ],
  },
  {
    id: "words",
    n: "06",
    title: "The Words on Our Walls",
    photos: [
      {
        src: "/assets/images/sep26/sign-healthy-self.jpg",
        alt: "The Healthy Self Heal Thy Self sign under warm light",
        caption: "Healthy self, heal thy self",
        fig: "FIG. 29",
        wide: true,
      },
      {
        src: "/assets/images/sep26/sign-what-starts-here.jpg",
        alt: "A hand-lettered canvas that reads What starts here changes lives, above a table lamp",
        caption: "What starts here",
        fig: "FIG. 30",
      },
      {
        src: "/assets/images/gallery02/2c8d01de.jpg",
        alt: "A wood sign that reads Stressed, Blessed and Coffee Obsessed",
        caption: "Stressed, blessed",
        fig: "FIG. 31",
        wide: true,
      },
      {
        src: "/assets/images/gallery02/adfb1892.jpg",
        alt: "A painted sign that reads Healthy Self Heal Thy Self",
        caption: "Healthy self, heal thy self",
        fig: "FIG. 32",
        wide: true,
      },
      {
        src: "/assets/images/gallery02/097dee03.jpg",
        alt: "A pink canvas that reads Faith isn't hoping God will help you, faith is knowing help is on the way",
        caption: "Faith",
        fig: "FIG. 33",
      },
      {
        src: "/assets/images/gallery02/27891f3d.jpg",
        alt: "A canvas that reads What starts here changes lives, beside a table lamp",
        caption: "What starts here",
        fig: "FIG. 34",
      },
      {
        src: "/assets/images/gallery02/16f81aac.jpg",
        alt: "A patterned canvas with Dream Big in gold script",
        caption: "Dream big",
        fig: "FIG. 35",
        wide: true,
      },
      {
        src: "/assets/images/gallery02/d33b90f4.jpg",
        alt: "A printed manifesto that ends You are welcome here",
        caption: "You are welcome here",
        fig: "FIG. 36",
      },
    ],
  },
];

/** Dr. Christine around the office, sent 2026-09-21. No figure numbers. */
const CHRISTINE_PHOTOS: GalleryPhoto[] = [
  { src: "/assets/images/sep26/christine-xray-screen.jpg", alt: "Dr. Christine reading a digital x-ray on the wall screen", caption: "Reading the x-ray", aspect: "aspect-[3/4]" },
  { src: "/assets/images/sep26/christine-shake-your-booty.jpg", alt: "Dr. Christine holding a letter board that reads Why be moody, shake your booty", caption: "House rules", aspect: "aspect-[3/4]" },
  { src: "/assets/images/sep26/christine-window-chair.jpg", alt: "Dr. Christine seated in the patterned chair by the front window", caption: "The front window", aspect: "aspect-[3/4]" },
  { src: "/assets/images/sep26/christine-adjustment-rooms-sign.jpg", alt: "Dr. Christine at the Adjustment Rooms sign", caption: "Adjustment rooms", aspect: "aspect-[3/4]" },
  { src: "/assets/images/sep26/christine-bubble-chair.jpg", alt: "Dr. Christine in the hanging bubble chair", caption: "The bubble chair", aspect: "aspect-[3/4]" },
  { src: "/assets/images/sep26/christine-arms-up-tables.jpg", alt: "Dr. Christine, arms up, between two adjusting tables in the red and yellow room", caption: "Two tables", aspect: "aspect-[3/4]" },
  { src: "/assets/images/sep26/christine-on-the-counter.jpg", alt: "Dr. Christine seated on the granite front counter", caption: "The front counter", aspect: "aspect-[3/4]" },
  { src: "/assets/images/sep26/christine-hat-boots-logo.jpg", alt: "Dr. Christine in a hat and white boots beside the crescent C logo", caption: "By the crescent", aspect: "aspect-[3/4]" },
  { src: "/assets/images/sep26/christine-portrait-bw.jpg", alt: "A black and white portrait of Dr. Christine", caption: "Portrait", aspect: "aspect-[3/4]" },
  { src: "/assets/images/sep26/christine-purple-doorway.jpg", alt: "Dr. Christine in the doorway of the purple geometric room", caption: "The purple room", aspect: "aspect-[3/4]" },
  { src: "/assets/images/sep26/christine-yellow-suit.jpg", alt: "Dr. Christine in a yellow striped suit and hat in the hallway", caption: "The hallway" },
  { src: "/assets/images/sep26/christine-black-jumpsuit-hall.jpg", alt: "Dr. Christine in the gallery hallway", caption: "The gallery hall" },
  { src: "/assets/images/sep26/christine-leopard-hall.jpg", alt: "Dr. Christine in the hallway by the posture station", caption: "The posture station" },
  { src: "/assets/images/sep26/christine-hall-arms-out.jpg", alt: "Dr. Christine, arms out, in the hallway", caption: "Welcome in" },
  { src: "/assets/images/sep26/christine-hat-chair.jpg", alt: "Dr. Christine in a hat, seated in a wingback chair", caption: "The wingback" },
  { src: "/assets/images/sep26/christine-coke.jpg", alt: "Dr. Christine sipping a Coke", caption: "Break time" },
  { src: "/assets/images/sep26/christine-drip-painting-2.jpg", alt: "Dr. Christine seated in a white skirt under the drip painting", caption: "Under the painting" },
  { src: "/assets/images/sep26/christine-healthy-self-bw-2.jpg", alt: "Dr. Christine pointing at the Healthy Self Heal Thy Self sign", caption: "Healthy self" },
];

/** Life at HCNG: event photos and clips. Plain captions, no figure numbers. */
const LIFE_PHOTOS = [
  {
    src: "/assets/images/gallery12/f1982040.jpg",
    alt: "Three staff in Santa Baby sweaters beside the flocked Christmas tree",
    caption: "Santa Baby",
  },
  {
    src: "/assets/images/gallery12/716ecbae.jpg",
    alt: "Two staff smiling behind the front desk in holiday sweaters",
    caption: "The front desk, December",
  },
  {
    src: "/assets/images/gallery12/eac9b832.jpg",
    alt: "The Grinch posing with Dr. Christine by the purple geometric wall",
    caption: "The Grinch, indoors",
  },
  {
    src: "/assets/images/gallery12/ca7b47ab.jpg",
    alt: "The Grinch dancing on the sidewalk outside the office",
    caption: "The Grinch, kept proudly",
  },
  {
    src: "/assets/images/gallery12/9dc76897.jpg",
    alt: "Staff on a ladder decorating the front windows for the holidays",
    caption: "Decorating day",
  },
  {
    src: "/assets/images/gallery12/d92d90d3.jpg",
    alt: "A letterboard that reads 2 4 6 8 who do we appreciate, the best patients around",
    caption: "For the best patients around",
  },
];

const LIFE_VIDEOS = [
  {
    src: "/assets/videos/video08.mp4",
    poster: "/assets/videos/video08_poster.jpg",
    title: "The therapy room sign",
    caption: "The therapy room sign",
    aspect: "aspect-[9/16]",
  },
  {
    src: "/assets/videos/video09.mp4",
    poster: "/assets/videos/video09_poster.jpg",
    title: "The Grinch dancing outside the office",
    caption: "The Grinch, dancing",
    aspect: "aspect-square",
  },
  {
    src: "/assets/videos/video10.mp4",
    poster: "/assets/videos/video10_poster.jpg",
    title: "Who you chose for chiropractic care matters",
    caption: "Who you chose matters",
    aspect: "aspect-[9/16]",
  },
  {
    src: "/assets/videos/video11.mp4",
    poster: "/assets/videos/video11_poster.jpg",
    title: "A walk down the hall",
    caption: "Down the hall",
    aspect: "aspect-[9/16]",
  },
];

export default function OurOfficePage() {
  return (
    <>
      <PhotoHero
        image="/assets/images/container49.jpg"
        imageAlt="The reception: a geometric painted mural behind the front desk and a green armchair"
        objectPosition="55% 45%"
        eyebrow="Our urban retreat"
        title="A clinic that feels like a night off."
        lead="More than just a health care clinic, we are an urban retreat dedicated to the overall health and well being of our patients."
        openNow
      >
        <CallButton location="hero" />
        <Button
          variant="outline"
          href="/new-patients/"
          arrow
          trackEvent={{ event: EV.BOOK_CLICK, params: { location: "hero" } }}
        >
          Plan your first visit
        </Button>
      </PhotoHero>

      {/* WALK IN WITH US */}
      <Band tone="espresso">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="min-w-0 lg:col-span-5">
            <Reveal>
              <Eyebrow as="h2">Walk in with us</Eyebrow>
              <p className="text-lead measure mt-5 text-current/85">
                Two minutes through the front door.
              </p>
            </Reveal>
          </div>
          <div className="min-w-0 lg:col-span-7">
            <Reveal delay={0.07}>
              <VideoPlate
                src="/assets/videos/video03.mp4"
                poster="/assets/videos/video03_poster.jpg"
                title="A walkthrough of the office from the entrance"
                caption="The entrance, Holly Road"
                className="max-w-[340px]"
              />
            </Reveal>
          </div>
        </div>
      </Band>

      {/* THE TOUR */}
      <Band tone="espresso-deep">
        <Reveal>
          <Eyebrow as="h2">The tour</Eyebrow>
          <p className="text-h2s mt-4 max-w-2xl">Six rooms, thirty six photographs.</p>
        </Reveal>
        {/* grid-cols-1 (repeat(1, minmax(0,1fr))) so the TourStrip's
            shrink-0 plates scroll inside the ul instead of expanding the
            implicit min-content track and blowing the page out sideways. */}
        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          <nav
            aria-label="Rooms"
            className="min-w-0 lg:col-span-3 lg:self-start lg:sticky lg:top-24"
          >
            <ul className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
              {CHAPTERS.map((chapter) => (
                <li key={chapter.id} className="shrink-0">
                  <a
                    href={`#${chapter.id}`}
                    className="text-mono-label inline-flex items-center gap-3 rounded-[4px] border border-(--hairline) px-3 py-2 whitespace-nowrap hover:border-current/50"
                  >
                    <span className="text-(--muted)">{chapter.n}</span>
                    {chapter.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="min-w-0 space-y-16 lg:col-span-9">
            {CHAPTERS.map((chapter) => (
              <section
                key={chapter.id}
                id={chapter.id}
                aria-labelledby={`${chapter.id}-label`}
              >
                <Reveal>
                  <div className="flex items-baseline gap-4">
                    <span
                      aria-hidden="true"
                      className="text-mono-label text-(--muted)"
                    >
                      {chapter.n}
                    </span>
                    <h3 id={`${chapter.id}-label`} className="text-h3s">
                      {chapter.title}
                    </h3>
                  </div>
                  <Rule className="mt-4" />
                </Reveal>
                <Reveal delay={0.07} className="mt-6">
                  <TourStrip
                    photos={chapter.photos}
                    ariaLabel={`${chapter.title} photos`}
                  />
                </Reveal>
              </section>
            ))}
          </div>
        </div>
      </Band>

      {/* THE DOCTOR, AROUND THE OFFICE: eighteen portraits Dr. Christine
          sent 2026-09-21 ("add to wherever is cool"). People, so plain
          captions and no figure numbers. */}
      <Band tone="bone">
        <Reveal>
          <Eyebrow as="h2">The doctor, around the office</Eyebrow>
          <p className="text-h2s mt-4 max-w-2xl">
            Dr. Christine, in her element.
          </p>
        </Reveal>
        <CuratedGallery
          photos={CHRISTINE_PHOTOS}
          visibleCount={10}
          gridClassName="mt-10 grid gap-5 grid-cols-2 lg:grid-cols-5"
          viewAllLabel="View all 18 photos"
        />
      </Band>

      {/* LIFE AT HCNG */}
      <Band tone="espresso">
        <Reveal>
          <Eyebrow as="h2">Life at HCNG</Eyebrow>
        </Reveal>
        <RevealGroup className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {LIFE_PHOTOS.map((photo) => (
            <RevealItem key={photo.src} as="figure">
              <Plate
                src={photo.src}
                alt={photo.alt}
                caption={photo.caption}
                aspect="aspect-[3/4]"
              />
            </RevealItem>
          ))}
        </RevealGroup>
        <RevealGroup className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {LIFE_VIDEOS.map((video) => (
            <RevealItem key={video.src} as="div">
              <VideoPlate
                src={video.src}
                poster={video.poster}
                title={video.title}
                caption={video.caption}
                aspect={video.aspect}
              />
            </RevealItem>
          ))}
        </RevealGroup>
        <Reveal className="mt-10">
          <div className="max-w-md rounded-[4px] border border-(--hairline) bg-(--card-bg) p-6 shadow-(--card-shadow)">
            <h3 className="text-mono-label">Fun Fact Friday</h3>
            <p className="text-body mt-3 text-current/85">
              Every Friday, a fun fact. Follow along.
            </p>
            <div className="mt-5">
              <Button
                variant="outline"
                size="sm"
                href={TIKTOK_URL}
                external
                arrow
                trackEvent={{ event: EV.TIKTOK_OUT }}
              >
                {TIKTOK_HANDLE}
              </Button>
            </div>
          </div>
        </Reveal>
      </Band>

      {/* CLOSING: the visual rest. No dead ends. */}
      <Band tone="plaster">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal>
            <h2 className="text-h2s">See it in person.</h2>
            <p className="text-body mt-4 text-(--muted)">
              Call <TelText location="body" />. Or send the form and we will
              call you.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-4">
              <CallButton location="body" />
              <Button
                variant="outline"
                href="/new-patients/"
                arrow
                trackEvent={{ event: EV.BOOK_CLICK, params: { location: "body" } }}
              >
                Plan your first visit
              </Button>
            </div>
          </Reveal>
          <Reveal delay={0.07}>
            <Eyebrow as="h3">Office hours</Eyebrow>
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
          </Reveal>
        </div>
      </Band>

      <StickyCallBar />
    </>
  );
}
