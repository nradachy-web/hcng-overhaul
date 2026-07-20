"use client";

/**
 * The Brass Dial (DESIGN_DIRECTION 4). One circular SVG instrument traced
 * from the photographed sunburst mirror in container02.jpg: radial ticks at
 * two lengths, three broken concentric arcs, 1px strokes, no fills, and a
 * gap in the outer arc forming the logo's crescent C in negative space.
 *
 * Licensed placements ONLY: home hero (once per site), stat gauges,
 * Call Dial arc on the four service LP heroes, sequence crescents on
 * genuinely sequential content, favicon/OG. Never a background texture,
 * never spins, never behind body text, never any color but brass-300 (dark)
 * or brass-600 (light), max one gauge row per page, never a divider or
 * footer flourish.
 */

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { SETTLE } from "@/lib/motion";

const C = 100;

function polar(r: number, deg: number): [number, number] {
  const a = ((deg - 90) * Math.PI) / 180;
  return [
    +(C + r * Math.cos(a)).toFixed(3),
    +(C + r * Math.sin(a)).toFixed(3),
  ];
}

function arcPath(r: number, startDeg: number, endDeg: number): string {
  const [sx, sy] = polar(r, startDeg);
  const [ex, ey] = polar(r, endDeg);
  const large = Math.abs(endDeg - startDeg) > 180 ? 1 : 0;
  return `M ${sx} ${sy} A ${r} ${r} 0 ${large} 1 ${ex} ${ey}`;
}

/** 40 radial ticks, every 5th long, per the mirror's graduation rhythm. */
const TICKS = Array.from({ length: 40 }, (_, i) => {
  const deg = i * 9;
  const long = i % 5 === 0;
  const [x1, y1] = polar(long ? 60 : 66, deg);
  const [x2, y2] = polar(74, deg);
  return { x1, y1, x2, y2, deg };
});

/** Outer arc leaves a gap centered at 3 o'clock: the crescent C. */
const OUTER_ARC = arcPath(88, 115, 425);
const MID_ARCS = [arcPath(80, 140, 230), arcPath(80, 262, 352)];
const INNER_ARCS = [arcPath(52, 350, 460), arcPath(52, 150, 268)];

type DialProps = {
  /** "draw" animates on mount (hero); "static" renders complete. */
  mode?: "draw" | "static";
  /** Delay in seconds before the draw begins (hero: 0.25). */
  delay?: number;
  /** Gauge sweep fraction 0..1; renders the value arc when defined. */
  sweep?: number;
  /** Whether the gauge sweep is active (parent controls via in-view). */
  sweepActive?: boolean;
  sweepDelay?: number;
  className?: string;
  "aria-hidden"?: boolean;
};

export function BrassDial({
  mode = "static",
  delay = 0,
  sweep,
  sweepActive = false,
  sweepDelay = 0,
  className,
}: DialProps) {
  const reduced = useReducedMotion();
  const draw = mode === "draw" && !reduced;

  const arcInitial = draw ? { pathLength: 0, opacity: 0 } : undefined;
  const arcAnimate = draw ? { pathLength: 1, opacity: 1 } : undefined;

  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      aria-hidden="true"
      className={cn("block h-auto w-full", className)}
    >
      {TICKS.map((t, i) => (
        <motion.line
          key={t.deg}
          x1={t.x1}
          y1={t.y1}
          x2={t.x2}
          y2={t.y2}
          stroke="currentColor"
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
          initial={draw ? { opacity: 0 } : undefined}
          animate={draw ? { opacity: 1 } : undefined}
          transition={
            draw
              ? { delay: delay + (i / TICKS.length) * 0.8, duration: 0.18 }
              : undefined
          }
        />
      ))}
      <motion.path
        d={OUTER_ARC}
        stroke="currentColor"
        strokeWidth={1}
        vectorEffect="non-scaling-stroke"
        initial={arcInitial}
        animate={arcAnimate}
        transition={draw ? { delay, duration: 0.8, ease: SETTLE } : undefined}
      />
      {MID_ARCS.map((d) => (
        <motion.path
          key={d}
          d={d}
          stroke="currentColor"
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
          initial={arcInitial}
          animate={arcAnimate}
          transition={
            draw ? { delay: delay + 0.15, duration: 0.65, ease: SETTLE } : undefined
          }
        />
      ))}
      {INNER_ARCS.map((d) => (
        <motion.path
          key={d}
          d={d}
          stroke="currentColor"
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
          initial={arcInitial}
          animate={arcAnimate}
          transition={
            draw ? { delay: delay + 0.3, duration: 0.5, ease: SETTLE } : undefined
          }
        />
      ))}
      {typeof sweep === "number" && (
        <>
          <circle
            cx={C}
            cy={C}
            r={94}
            stroke="currentColor"
            strokeWidth={1}
            vectorEffect="non-scaling-stroke"
            opacity={0.25}
          />
          <motion.circle
            cx={C}
            cy={C}
            r={94}
            stroke="currentColor"
            strokeWidth={2}
            vectorEffect="non-scaling-stroke"
            transform={`rotate(-90 ${C} ${C})`}
            strokeLinecap="butt"
            initial={reduced ? { pathLength: sweep } : { pathLength: 0 }}
            animate={
              sweepActive || reduced ? { pathLength: sweep } : { pathLength: 0 }
            }
            transition={
              reduced
                ? { duration: 0 }
                : { delay: sweepDelay, duration: 0.65, ease: SETTLE }
            }
          />
        </>
      )}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Sequence crescent: numbered steps (01 to 04) in genuinely           */
/* sequential content only. Same license as the measure rail.          */
/* ------------------------------------------------------------------ */

const CRESCENT_ARC = arcPath(88, 115, 425);
const CRESCENT_TICKS = [180, 210, 240, 270, 300, 330].map((deg) => {
  const [x1, y1] = polar(74, deg);
  const [x2, y2] = polar(82, deg);
  return { x1, y1, x2, y2, deg };
});

export function SequenceCrescent({
  n,
  size = 44,
  className,
}: {
  n: number;
  size?: number;
  className?: string;
}) {
  const label = String(n).padStart(2, "0");
  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center",
        className,
      )}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 200 200"
        fill="none"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full text-(--brass)"
      >
        <path
          d={CRESCENT_ARC}
          stroke="currentColor"
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
        />
        {CRESCENT_TICKS.map((t) => (
          <line
            key={t.deg}
            x1={t.x1}
            y1={t.y1}
            x2={t.x2}
            y2={t.y2}
            stroke="currentColor"
            strokeWidth={1}
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>
      <span className="text-mono-label relative">{label}</span>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Crescent mark: the logo's crescent C alone. Footer mark and 404.    */
/* Not a dial; carries no ticks beyond the C itself.                   */
/* ------------------------------------------------------------------ */

export function CrescentMark({
  size = 28,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      aria-hidden="true"
      className={className}
      style={{ width: size, height: size }}
    >
      <path
        d={arcPath(80, 115, 425)}
        stroke="currentColor"
        strokeWidth={10}
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Call Dial arc: service LP heroes ONLY. A quarter-arc of brass       */
/* graduation ticks cradles the primary call button; at mobile widths  */
/* it collapses to a small crescent flourish on the button's left cap. */
/* ------------------------------------------------------------------ */

/* The arc is centered on the call button's LEFT CAP (its left-edge
   midpoint) and cradles it from upper-left to lower-left. The wrapper
   reserves the arc's gutter in-flow (md:pl-10) so the geometry always
   stays inside the container edge instead of spilling into the page
   margin. Tick opacity peaks nearest the cap and falls off at the arc
   ends (4.3). */
const ARC_C = 48;
const CALL_TICKS = Array.from({ length: 15 }, (_, i) => {
  const deg = 200 + i * 10; // around the left cap: 200..340, through 270
  const long = i % 3 === 0;
  const a = ((deg - 90) * Math.PI) / 180;
  const pt = (r: number): [number, number] => [
    +(ARC_C + r * Math.cos(a)).toFixed(3),
    +(ARC_C + r * Math.sin(a)).toFixed(3),
  ];
  const [x1, y1] = pt(long ? 26 : 30);
  const [x2, y2] = pt(40);
  const p = i / 14;
  const opacity = 0.15 + 0.85 * Math.sin(p * Math.PI);
  return { x1, y1, x2, y2, deg, opacity };
});

export function CallDialArc({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <span className={cn("relative inline-flex md:pl-10", className)}>
      <svg
        viewBox="0 0 96 96"
        fill="none"
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-10 hidden h-24 w-24 -translate-x-1/2 -translate-y-1/2 text-(--brass) md:block"
      >
        {CALL_TICKS.map((t, i) => (
          <motion.line
            key={t.deg}
            x1={t.x1}
            y1={t.y1}
            x2={t.x2}
            y2={t.y2}
            stroke="currentColor"
            strokeWidth={1}
            vectorEffect="non-scaling-stroke"
            initial={reduced ? { opacity: t.opacity } : { opacity: 0 }}
            animate={{ opacity: t.opacity }}
            transition={
              reduced
                ? { duration: 0 }
                : { delay: 0.2 + (i / CALL_TICKS.length) * 0.65, duration: 0.2 }
            }
          />
        ))}
      </svg>
      {/* Mobile: the crescent flourish overlaps the button's left cap
          itself, never the gutter. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 -left-1 -translate-y-1/2 text-(--brass) md:hidden"
      >
        <CrescentMark size={22} />
      </span>
      {children}
    </span>
  );
}
