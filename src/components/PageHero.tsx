"use client";

/**
 * Page hero variants for interior pages. Service LPs do NOT run the home
 * orchestration: photo settle plus Rise only; the Call Dial arc draws in
 * 650ms (inside CallDialArc). The last thing that finishes moving on any
 * hero is the call CTA. Reduced motion: one 160ms fade, nothing withheld.
 *
 * H1 rule: service LP H1s are Source Serif 4 600 (pain-first sentences).
 * Poiret One display H1s are licensed for SHORT brand-page titles only and
 * never exceed 2 lines at 360px; when in doubt, serif.
 */

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { asset } from "@/lib/asset";
import { SETTLE } from "@/lib/motion";
import { Eyebrow } from "./Band";
import { OpenNow } from "./OpenNow";

type Common = {
  eyebrow: string;
  /** Room accent CSS color for the eyebrow tick, e.g. "var(--color-room-signal)". */
  accent?: string;
  title: React.ReactNode;
  /** Poiret One display treatment; short brand titles only. Default serif. */
  display?: boolean;
  lead?: React.ReactNode;
  /** CTA row; put the CallButton first, wrapped in CallDialArc on LPs. */
  children?: React.ReactNode;
  openNow?: boolean;
  className?: string;
};

function HeroText({
  eyebrow,
  accent,
  title,
  display,
  lead,
  children,
  openNow,
  index = 0,
}: Common & { index?: number }) {
  const reduced = useReducedMotion();
  const rise = (order: number) => ({
    initial: reduced ? { opacity: 0 } : { opacity: 0, y: 12 },
    animate: reduced ? { opacity: 1 } : { opacity: 1, y: 0 },
    transition: reduced
      ? { duration: 0.16 }
      : { delay: 0.12 + order * 0.07, duration: 0.32, ease: SETTLE },
  });

  return (
    <>
      <motion.div {...rise(index)}>
        <Eyebrow accent={accent}>{eyebrow}</Eyebrow>
      </motion.div>
      <motion.h1
        {...rise(index + 1)}
        className={cn("mt-5", display ? "text-display-1" : "text-lp-h1")}
      >
        {title}
      </motion.h1>
      {lead && (
        <motion.p
          {...rise(index + 2)}
          className="text-lead measure mt-5 text-current/85"
        >
          {lead}
        </motion.p>
      )}
      {children && (
        <motion.div
          {...rise(index + 3)}
          className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-4"
        >
          {children}
        </motion.div>
      )}
      {openNow && (
        <motion.div {...rise(index + 3)} className="mt-6">
          <OpenNow className="text-current/80" />
        </motion.div>
      )}
    </>
  );
}

/**
 * Dual scrim (DESIGN_DIRECTION 3.4): espresso-950 held deep across the
 * text side then feathered to 0, plus a soft bottom anchor. Below lg the
 * side scrim deepens and the anchor grows, because the text column spans
 * most of the photo there. Never a flat black overlay.
 */
function HeroScrims() {
  return (
    <>
      <div
        aria-hidden="true"
        className="absolute inset-0 hidden lg:block"
        style={{
          background:
            "linear-gradient(90deg, rgba(30,26,22,0.92) 0%, rgba(30,26,22,0.86) 42%, rgba(30,26,22,0.5) 60%, rgba(30,26,22,0.16) 76%, rgba(30,26,22,0) 90%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 lg:hidden"
        style={{
          background:
            "linear-gradient(90deg, rgba(30,26,22,0.92) 0%, rgba(30,26,22,0.82) 55%, rgba(30,26,22,0.52) 80%, rgba(30,26,22,0.28) 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 hidden h-2/5 lg:block"
        style={{
          background:
            "linear-gradient(0deg, rgba(30,26,22,0.72) 0%, rgba(30,26,22,0) 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-3/5 lg:hidden"
        style={{
          background:
            "linear-gradient(0deg, rgba(30,26,22,0.85) 0%, rgba(30,26,22,0) 100%)",
        }}
      />
    </>
  );
}

/**
 * Full-bleed photo hero for the four service LPs and photo brand pages.
 */
export function PhotoHero({
  image,
  imageAlt,
  objectPosition = "50% 40%",
  minH = "min-h-[72svh]",
  textMaxW = "max-w-2xl",
  imgClassName,
  ...text
}: Common & {
  image: string;
  imageAlt: string;
  objectPosition?: string;
  minH?: string;
  /** Cap the text column short of the feather when the photo is bright. */
  textMaxW?: string;
  /** Optional crop refinement (e.g. an lg-only zoom) on the photo wrapper. */
  imgClassName?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <section
      className={cn(
        "band band-espresso-deep relative flex overflow-hidden",
        minH,
        text.className,
      )}
    >
      <div className={cn("absolute inset-0", imgClassName)}>
        <motion.img
          src={asset(image)}
          alt={imageAlt}
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition }}
          initial={reduced ? { scale: 1 } : { scale: 1.035 }}
          animate={{ scale: 1 }}
          transition={reduced ? { duration: 0 } : { duration: 0.9, ease: SETTLE }}
        />
      </div>
      <HeroScrims />
      <div className="container-site relative z-10 flex w-full flex-col justify-end pt-36 pb-14 lg:pb-20">
        <div className={textMaxW}>
          <HeroText {...text} />
        </div>
      </div>
    </section>
  );
}

/**
 * Slim hero: espresso-900 band, no photo (why-us, testimonials,
 * new-patients, legal). Pass a photo for the 44vh variant (team, contact).
 */
export function SlimHero({
  image,
  imageAlt,
  objectPosition = "50% 35%",
  minH = "min-h-[44vh]",
  ...text
}: Common & {
  image?: string;
  imageAlt?: string;
  objectPosition?: string;
  minH?: string;
}) {
  const reduced = useReducedMotion();
  if (!image) {
    return (
      <section className={cn("band band-espresso", text.className)}>
        <div className="container-site pt-32 pb-14 lg:pt-40 lg:pb-20">
          <div className="max-w-2xl">
            <HeroText {...text} />
          </div>
        </div>
      </section>
    );
  }
  /* Photo variant: shares the full PhotoHero scrim stack, including the
     bottom anchor, because its text is bottom-anchored the same way. */
  return (
    <section
      className={cn(
        "band band-espresso-deep relative flex overflow-hidden",
        minH,
        text.className,
      )}
    >
      <motion.img
        src={asset(image)}
        alt={imageAlt ?? ""}
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition }}
        initial={reduced ? { scale: 1 } : { scale: 1.035 }}
        animate={{ scale: 1 }}
        transition={reduced ? { duration: 0 } : { duration: 0.9, ease: SETTLE }}
      />
      <HeroScrims />
      <div className="container-site relative z-10 flex w-full flex-col justify-end pt-32 pb-12">
        <div className="max-w-2xl">
          <HeroText {...text} />
        </div>
      </div>
    </section>
  );
}
