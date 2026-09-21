"use client";

/**
 * The orchestrated home hero moment (DESIGN_DIRECTION 5), once per session:
 *
 *   t=0ms    photo settles scale(1.035) to 1.0 over 900ms
 *   t=250ms  the Dial draws: arcs pathLength 0 to 1, ticks stagger, 800ms
 *   t=400ms  H1 lines rise from a baseline mask, 90ms stagger, 500ms each
 *   t=700ms  lead and both CTAs fade up 12px, 320ms
 *   t=950ms  gauge numerals count up (GaugeRow heroSync reads the same flag)
 *
 * Repeat views this session render settled. Reduced motion: one 160ms fade.
 * Text readable by 700ms; the photo is the LCP and loads eagerly.
 *
 * The photo is Dr. Christine in her lobby beside the real brass sunburst
 * mirror (container37). Photo and drawn Dial share one coordinate space (the
 * cover-wrapper emulates object-cover via min sizes plus the photo's aspect
 * ratio), so the instrument stays registered concentric over the mirror at
 * every viewport. On lg the Dial draws at t=250ms over 800ms; below lg it
 * does not render. Below lg the photo sits above the copy so her face stays
 * clear of text; on lg it anchors right and fades into the espresso band
 * behind the headline. The wrapper overscans so the drop ceiling crops out.
 *
 * H1 note: the brand chorus exceeds 2 lines at 360px in Poiret One, so per
 * the 3.2 fallback rule this H1 renders Source Serif 4 600. Poiret One stays
 * in the gauges and wordmark.
 */

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { asset } from "@/lib/asset";
import { HERO_PLAYED_KEY, SETTLE } from "@/lib/motion";
import { BrassDial } from "./BrassDial";
import { Button, CallButton } from "./Button";
import { Eyebrow } from "./Band";
import { OpenNow } from "./OpenNow";

const H1_LINES = ["We Have What", "Healthcare Is Missing!"];

export function HomeHero() {
  const reduced = useReducedMotion();
  const [mode, setMode] = useState<"pending" | "play" | "instant">("pending");

  useEffect(() => {
    let played = false;
    try {
      played = window.sessionStorage.getItem(HERO_PLAYED_KEY) === "1";
    } catch {
      /* storage unavailable: play */
    }
    if (played || reduced) {
      setMode("instant");
      return;
    }
    setMode("play");
    const t = window.setTimeout(() => {
      try {
        window.sessionStorage.setItem(HERO_PLAYED_KEY, "1");
      } catch {
        /* ignore */
      }
    }, 1600);
    return () => window.clearTimeout(t);
  }, [reduced]);

  const started = mode !== "pending";
  const instant = mode === "instant" || !!reduced;
  const tr = (delay: number, duration: number) =>
    instant ? { duration: 0 } : { delay, duration, ease: SETTLE };

  const hidden = reduced ? { opacity: 0 } : { opacity: 0, y: 12 };
  const shown = reduced ? { opacity: 1 } : { opacity: 1, y: 0 };

  return (
    <section className="band band-espresso-deep relative flex flex-col overflow-hidden lg:min-h-[680px]">
      <div className="relative aspect-[4/3] max-h-[58svh] w-full shrink-0 overflow-hidden sm:aspect-[3/2] lg:absolute lg:inset-y-0 lg:right-0 lg:aspect-auto lg:max-h-none lg:w-[62%]">
        <div
          className="absolute top-[80%] left-[27%] min-h-full min-w-[135%] -translate-x-[27%] -translate-y-[80%] sm:min-w-full lg:top-[70%] lg:left-[34%] lg:min-h-[118%] lg:-translate-x-[34%] lg:-translate-y-[70%]"
          style={{ aspectRatio: "1800 / 1350" }}
        >
          <motion.div
            className="absolute inset-0"
            initial={instant ? { scale: 1 } : { scale: 1.035 }}
            animate={started ? { scale: 1 } : undefined}
            transition={
              instant ? { duration: 0 } : { duration: 0.9, ease: SETTLE }
            }
          >
            <img
              src={asset("/assets/images/container37.jpg")}
              alt="Dr. Christine Hanczaryk smiling in the HCNG lobby beside the brass sunburst mirror, with the black leather sofa, plants, and the gallery hallway behind her"
              width={1800}
              height={1350}
              fetchPriority="high"
              className="absolute inset-0 h-full w-full object-cover"
            />
            {/* The Dial, once per site: concentric over the mirror (its
                center sits at 33.9% / 36.4% of container37), drawn just
                outside the sunburst ring so the ticks graduate the real
                object. Draws itself on load. */}
            <div
              aria-hidden="true"
              className="absolute hidden text-brass-300 lg:block"
              style={{
                left: "33.9%",
                top: "36.4%",
                width: "25%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <BrassDial
                key={mode}
                mode={mode === "play" ? "draw" : "static"}
                delay={0.25}
              />
            </div>
          </motion.div>
        </div>
        {/* Phone-camera daylight, graded down toward the espresso band. */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: "rgba(30,26,22,0.2)" }}
        />
        {/* lg: the portrait dissolves into the band behind the headline. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 hidden lg:block"
          style={{
            background:
              "linear-gradient(90deg, rgba(30,26,22,1) 0%, rgba(30,26,22,0.82) 12%, rgba(30,26,22,0.38) 28%, rgba(30,26,22,0) 46%)",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-1/3 lg:h-2/5"
          style={{
            background:
              "linear-gradient(0deg, rgba(30,26,22,1) 0%, rgba(30,26,22,0.6) 40%, rgba(30,26,22,0) 100%)",
          }}
        />
      </div>

      <motion.div
        className="container-site relative z-10 grid flex-1 items-center gap-8 pt-8 pb-14 lg:grid-cols-12 lg:pt-32 lg:pb-20"
        initial={reduced ? { opacity: 0 } : { opacity: 1 }}
        animate={started ? { opacity: 1 } : undefined}
        transition={reduced ? { duration: 0.16 } : { duration: 0 }}
      >
        <div className="lg:col-span-7">
          <motion.div
            initial={hidden}
            animate={started ? shown : hidden}
            transition={tr(0.38, 0.32)}
          >
            <Eyebrow>
              Chiropractic Neurology,{" "}
              <span className="whitespace-nowrap">Grand Blanc MI</span>
            </Eyebrow>
          </motion.div>

          <h1 className="text-lp-h1 mt-6">
            {H1_LINES.map((line, i) => (
              <span key={line} className="block overflow-hidden">
                <motion.span
                  className="block"
                  initial={{ y: reduced ? 0 : "110%" }}
                  animate={started ? { y: 0 } : undefined}
                  transition={tr(0.4 + i * 0.09, 0.5)}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            className="text-lead measure mt-6 text-paper-50/85"
            initial={hidden}
            animate={started ? shown : hidden}
            transition={tr(0.7, 0.32)}
          >
            Brain-based care, digital x-ray, and the only Hill DT spinal
            decompression table in Genesee County.
          </motion.p>

          <motion.div
            className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4"
            initial={hidden}
            animate={started ? shown : hidden}
            transition={tr(0.7, 0.32)}
          >
            <CallButton location="hero" />
            <Button variant="outline" href="#router" arrow="down">
              Which treatment fits my pain?
            </Button>
          </motion.div>

          <motion.div
            className="mt-7"
            initial={hidden}
            animate={started ? shown : hidden}
            transition={tr(0.75, 0.32)}
          >
            <OpenNow className="text-paper-50/80" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
