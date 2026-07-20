import type { Metadata } from "next";
import { Band, Eyebrow } from "@/components/Band";
import { Button, CallButton, TelText } from "@/components/Button";
import { CallDialArc, CrescentMark } from "@/components/BrassDial";
import { PhotoHero } from "@/components/PageHero";
import { Plate } from "@/components/Plate";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { StickyCallBar } from "@/components/StickyCallBar";
import { TestimonialPlate } from "@/components/TestimonialPlate";
import { EV } from "@/lib/constants";

/**
 * /massage-therapy/ (DESIGN_DIRECTION 8.4): service LP on the 8.2 template,
 * room-umber accent (eyebrow ticks only). The nine types render as a true
 * two-column index with expandable verbatim definitions and the source
 * citations kept as footnotes. Benefits checklists verbatim on bone. The
 * room band recrops the candle wall hero plus two quiet office picks. No
 * gauges on this page. Sticky call bar from load.
 */

export const metadata: Metadata = {
  title: "Massage Therapy",
  description:
    "Nine kinds of massage, from craniosacral to Swedish, in the quietest room in the building. Grand Blanc, MI. Call 810.584.7170.",
  alternates: { canonical: "/massage-therapy/" },
};

const ACCENT = "var(--color-room-umber)";

type MassageType = { name: string; paragraphs: string[] };

/** Verbatim definitions (source dashes render as commas per do-not 1;
 *  obvious typos fixed; [1]/[2] citations kept, footnoted below). */
const TYPES_LEFT: MassageType[] = [
  {
    name: "Craniosacral Therapy",
    paragraphs: [
      "Craniosacral therapy (also called CST, also spelled CranioSacral bodywork or therapy) is an alternative medicine therapy used by osteopaths, massage therapists, naturopaths, chiropractors, and occupational therapists. A craniosacral therapy session involves the therapist placing their hands on the patient, which they say allows them to tune into what they call the craniosacral system. The practitioner gently works with the spine and the skull and its cranial sutures, diaphragms, and fascia. In this way, the restrictions of nerve passages are said to be eased, the movement of cerebrospinal fluid through the spinal cord is said to be optimized, and misaligned bones are said to be restored to their proper position. Craniosacral therapists use the therapy to treat mental stress, neck and back pain, migraines, TMJ Syndrome, and for chronic pain conditions such as fibromyalgia.[2]",
    ],
  },
  {
    name: "Prenatal Massage",
    paragraphs: [
      "Prenatal massage is similar to massage during non-pregnancy in terms of the goals (relaxation, pain relief, increased circulation & mobility, etc.). However, due to the changes undergone during pregnancy, modifications are made. To accommodate swollen tender breasts and a growing belly, special pillows, positioning and techniques are utilized to ensure comfort for both the expecting mother and baby. With increasing weight, a changing center of gravity and the many other changes associated with pregnancy, prenatal massage can help provide relief and a sense of well being that is much deserved.[1]",
    ],
  },
  {
    name: "Sports Massage",
    paragraphs: [
      "Sports massage is actually a form of Swedish massage that is delivered to athletes. Most commonly, sports massage focuses on increasing blood and lymphatic fluid flow, reducing and eliminating pain as well as tender trigger points, and increasing range of motion of the affected area. Sports massages can be broken into 4 distinct types: the pre-event sports massage, the post-event sports massage, the restorative sports massage and the rehabilitative sports massage. As the names indicate, each type of sports massage has a different focus for the athlete as they are delivered at different times during their training and performance schedule.[1]",
    ],
  },
  {
    name: "Trigger Point Therapy",
    paragraphs: [
      "Trigger points or trigger sites are described as hyperirritable spots in skeletal muscle that are associated with palpable nodules in taut bands of muscle fibers. Trigger point practitioners believe that palpable nodules are small contraction knots and a common cause of pain. Compression of a trigger point may elicit local tenderness, referred pain, or local twitch response. The local twitch response is not the same as a muscle spasm. This is because a muscle spasm refers to the entire muscle entirely contracting whereas the local twitch response also refers to the entire muscle but only involves a small twitch, no contraction. The trigger point model states that unexplained pain frequently radiates from these points of local tenderness to broader areas, sometimes distant from the trigger point itself. Practitioners claim to have identified reliable referred pain patterns, allowing practitioners to associate pain in one location with trigger points elsewhere.[2]",
    ],
  },
];

const TYPES_RIGHT: MassageType[] = [
  {
    name: "Deep Tissue Massage",
    paragraphs: [
      "Deep Tissue massage is designed to relieve severe tension in the muscle and the connective tissue or fascia. This type of massage focuses on the muscles located below the surface of the top muscles. Deep tissue massage is often recommended for individuals who experience consistent pain, are involved in heavy physical activity, such as athletes, and patients who have sustained physical injury. It is also not uncommon for receivers of Deep Tissue Massage to have their pain replaced with a new muscle ache for a day or two. Deep tissue work varies greatly. What one calls deep tissue another will call light. When receiving deep tissue work it is important to communicate what you are feeling.[2]",
    ],
  },
  {
    name: "Myofascial Release",
    paragraphs: [
      "Myofascial release is a form of soft tissue therapy used to treat somatic dysfunction and accompanying pain and restriction of motion. This is accomplished by relaxing contracted muscles, increasing circulation, increasing venous and lymphatic drainage, and stimulating the stretch reflex of muscles and overlying fascia.[2]",
    ],
  },
  {
    name: "Hydrotherapy",
    paragraphs: [
      "Hydrotherapy, formerly called hydropathy involves the use of water for pain-relief and treating illness. The term hydrotherapy itself is synonymous with the term water cure as it was originally marketed by practitioners and promoters in the 1800s. A hydrotherapist therefore, is someone who practices hydrotherapy. According to the International SPA Association (ISPA), hydrotherapy has long been a staple in European spas. It's the generic term for water therapies using jets, underwater massage and mineral baths (e.g. balneotherapy, Iodine-Grine therapy, Kneipp treatments, Scotch hose, Swiss shower, thalassotherapy) and others. It also can mean a whirlpool bath, hot Roman bath, hot tub, Jacuzzi, cold plunge and mineral bath. These treatments use physical water properties, such as temperature and pressure, for therapeutic purposes, to stimulate blood circulation and treat the symptoms of certain diseases.[2]",
    ],
  },
  {
    name: "Shiatsu",
    paragraphs: [
      "Shiatsu (指圧) (“shi” meaning finger and “atsu” meaning pressure.) is an eastern (oriental) born therapy that uses pressure applied with thumbs, fingers and palms to the same energy meridians as acupressure and incorporates stretching. It also uses techniques such as rolling, brushing, vibrating, grasping and in one particular technique developed by Suzuki Yamamoto, pressure is applied with the feet on the persons back, legs and feet (special set up is required for the “foot” shiatsu).[2]",
    ],
  },
  {
    name: "Swedish Massage",
    paragraphs: [
      "Swedish massage uses five styles of long, flowing strokes to massage. The five basic strokes are effleurage (sliding or gliding), petrissage (kneading), tapotement (rhythmic tapping), friction (cross fiber) and vibration/shaking. Swedish massage has shown to be helpful in reducing pain, joint stiffness, and improving function in patients with osteoarthritis of the knee over a period of eight weeks. It has also been shown to be helpful in individuals with poor circulation. The development of Swedish massage is credited to Per Henrik Ling, though the Dutch practitioner Johan Georg Mezger adopted the French names to denote the basic strokes. The term “Swedish” massage is not really known in the country of Sweden, where it is called “classic massage”.[2]",
    ],
  },
];

/** The index is a true A to Z (spec 8.4): all nine types alphabetized,
 *  renumbered 01-09, then split into the two columns. Definitions are
 *  self-contained, so ordering is presentation only. */
const TYPES_AZ = [...TYPES_LEFT, ...TYPES_RIGHT].sort((a, b) =>
  a.name.localeCompare(b.name),
);
const COLUMN_LEFT = TYPES_AZ.slice(0, 5);
const COLUMN_RIGHT = TYPES_AZ.slice(5);

/** Verbatim benefits lists. */
const ENHANCES = [
  "Massage enhances ones state of well being",
  "Massage enhances soft tissue healing",
  "Massage increases flexibility & range of motion",
  "Massage increases muscle tone",
  "Massage increases blood flow",
  "Massage increases dopamine & serotonin levels",
  "Massage increases and improves lymphatic fluid flow & drainage",
  "Massage induces relaxation",
  "Massage stimulates the immune system",
];

const REDUCES = [
  "Massage reduces constipation",
  "Massage reduces cortisol levels",
  "Massage reduces depression",
  "Massage reduces emotional stress",
  "Massage reduces joint stiffness",
  "Massage reduces muscular tension",
  "Massage reduces pain",
  "Massage reduces scar tissue formation",
  "Massage reduces soft tissue knots and trigger points",
];

/** True index entry: mono number, serif name, expandable definition.
 *  Reuses the global faq-item recipe (native details/summary, 200ms ease). */
function TypeEntry({
  n,
  name,
  paragraphs,
}: {
  n: number;
  name: string;
  paragraphs: string[];
}) {
  return (
    <details className="faq-item border-b border-(--hairline)">
      <summary className="flex items-center justify-between gap-4 py-5">
        <span className="flex items-baseline gap-4">
          <span className="text-mono-cap text-(--muted)">
            {String(n).padStart(2, "0")}
          </span>
          <span className="font-serif text-[18px] leading-snug font-semibold">
            {name}
          </span>
        </span>
        <span className="faq-marker shrink-0 text-(--brass)">
          <CrescentMark size={16} />
        </span>
      </summary>
      <div className="text-body grid gap-4 pb-6 text-(--muted)">
        {paragraphs.map((p) => (
          <p key={p.slice(0, 32)}>{p}</p>
        ))}
      </div>
    </details>
  );
}

export default function MassageTherapyPage() {
  return (
    <>
      <PhotoHero
        image="/assets/images/container50.jpg"
        imageAlt="The massage room: a made-up massage bed beneath the candle wall"
        objectPosition="55% 45%"
        eyebrow="Massage therapy"
        accent={ACCENT}
        title="Nine kinds of massage. One goal, relief."
        lead="Tension, stress, headaches, and tight backs, worked out by hand in the quietest room in the building."
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

      {/* THE NINE TYPES: a true index, two columns, verbatim definitions. */}
      <Band tone="plaster">
        <Reveal>
          <Eyebrow accent={ACCENT}>Types Of Massage</Eyebrow>
          <h2 className="text-h2s mt-4">The nine types, A to Z.</h2>
          <p className="text-body measure mt-6">
            Open a type for its full definition. Not sure which one fits? Call{" "}
            <TelText location="body" /> and describe what hurts.
          </p>
        </Reveal>
        <div className="mt-10 grid gap-x-14 lg:grid-cols-2">
          <Reveal>
            <div>
              {COLUMN_LEFT.map((type, i) => (
                <TypeEntry key={type.name} n={i + 1} {...type} />
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.07}>
            <div>
              {COLUMN_RIGHT.map((type, i) => (
                <TypeEntry
                  key={type.name}
                  n={COLUMN_LEFT.length + i + 1}
                  {...type}
                />
              ))}
            </div>
          </Reveal>
        </div>
        <Reveal className="mt-10">
          <p className="text-mono-cap text-(--muted)">
            [1] Content Copyright ProfessionalPlanets.com LLC dba
            MassagePlanet.com
          </p>
          <p className="text-mono-cap mt-1 text-(--muted)">
            [2] Content Obtained from Wikipedia.com.
          </p>
        </Reveal>
      </Band>

      {/* BENEFITS: verbatim checklists on bone. */}
      <Band tone="bone">
        <Reveal>
          <Eyebrow accent={ACCENT}>Benefits Of Massage</Eyebrow>
          <h2 className="text-h2s mt-4">What massage does.</h2>
          <p className="text-body measure mt-6">
            Therapeutic massage provides a number of health and wellness
            related benefits. These benefits are delivered in a natural and
            safe non-invasive method and thus, do not carry the harmful side
            effects associated with prescribed medications and the many
            invasive medical procedures used today.
          </p>
        </Reveal>
        <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:gap-14">
          <Reveal className="h-full">
            <div className="h-full rounded-[4px] border border-(--hairline) bg-(--card-bg) p-6 shadow-(--card-shadow) sm:p-8">
              <p className="text-body">
                Therapeutic massage is wonderful at enhancing and increasing a
                number of beneficial processes and functions within the human
                body.
              </p>
              <ul className="mt-4">
                {ENHANCES.map((line) => (
                  <li
                    key={line}
                    className="text-body border-b border-(--hairline) py-3"
                  >
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.07} className="h-full">
            <div className="h-full rounded-[4px] border border-(--hairline) bg-(--card-bg) p-6 shadow-(--card-shadow) sm:p-8">
              <p className="text-body">
                Similarly, therapeutic massage is extremely effective at
                reducing and often eliminating a number of uncomfortable and
                restrictive symptoms and conditions.
              </p>
              <ul className="mt-4">
                {REDUCES.map((line) => (
                  <li
                    key={line}
                    className="text-body border-b border-(--hairline) py-3"
                  >
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Band>

      {/* THE ROOM: the candle wall, recropped, plus two quiet picks. */}
      <Band tone="plaster">
        <Reveal>
          <Eyebrow accent={ACCENT} as="h2">
            The room
          </Eyebrow>
        </Reveal>
        <RevealGroup className="mt-8 grid gap-5">
          <RevealItem as="figure">
            <Plate
              src="/assets/images/container50.jpg"
              alt="The massage room, wide: the candle wall glowing over the made-up bed"
              caption="The massage room"
              aspect="aspect-[21/9]"
              objectPosition="50% 55%"
            />
          </RevealItem>
        </RevealGroup>
        <RevealGroup className="mt-5 grid gap-5 sm:grid-cols-2">
          <RevealItem as="figure">
            <Plate
              src="/assets/images/gallery02/d9df5df5.jpg"
              alt="A shelf of lotions and comforts beside a lit candle on a wood stump table"
              caption="The comfort shelf"
              aspect="aspect-[4/3]"
            />
          </RevealItem>
          <RevealItem as="figure">
            <Plate
              src="/assets/images/gallery02/798d6e6d.jpg"
              alt="The warm hallway leading back to the treatment rooms"
              caption="The hallway"
              aspect="aspect-[4/3]"
              objectPosition="50% 60%"
            />
          </RevealItem>
        </RevealGroup>
      </Band>

      {/* PROOF: one review card; stories live on /testimonials/. */}
      <Band tone="bone">
        <h2 className="sr-only">Patient proof</h2>
        <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-14">
          <Reveal>
            <TestimonialPlate
              name="Corey Nichols"
              screenshot="/assets/images/image14.jpg"
              screenshotAlt="Original Google review by Corey Nichols"
              quote="Dr. Christine is so incredibly knowledgeable about the chiropractic craft and Kelly is the bow on top - those type of people you can just enjoy and trust. It is very apparent they care about you and your health more than your pocket book and anyone who goes or has gone through their program would agree. I truly recommend the Hanczaryk Chiropractic Neurology Group to anyone seeking chiropractic care. Period."
            />
          </Reveal>
          <Reveal delay={0.07} className="lg:pt-4">
            <p className="text-body measure">
              Massage at HCNG pairs with the chiropractic and decompression
              care down the hall. Read what patients say about the whole
              building.
            </p>
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
          <h2 className="text-h2s">Book your massage.</h2>
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
