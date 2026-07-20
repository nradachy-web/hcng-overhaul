"use client";

/**
 * Stat gauges (DESIGN_DIRECTION 4, placement 2): credibility figures as 96px
 * dials whose outer arc sweeps to value when the strip enters the viewport
 * (the Sweep verb, 650ms, once). Numeral in Poiret One with per-digit
 * fixed-width spans so the count-up does not jitter; caption in serif.
 * MAX ONE GAUGE ROW PER PAGE. No citation notes in the UI.
 */

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { SETTLE } from "@/lib/motion";
import { BrassDial } from "./BrassDial";

export type StatItem = {
  value: number;
  decimals?: number;
  suffix?: string;
  caption: string;
  /** Arc sweep fraction 0..1. Defaults to value/100 for %, else full. */
  sweep?: number;
};

function format(value: number, decimals: number): string {
  return value.toFixed(decimals);
}

function CountUp({
  value,
  decimals = 0,
  suffix = "",
  active,
  delay,
}: {
  value: number;
  decimals?: number;
  suffix?: string;
  active: boolean;
  delay: number;
}) {
  const reduced = useReducedMotion();
  const final = format(value, decimals);
  const [text, setText] = useState(reduced ? final : format(0, decimals));

  useEffect(() => {
    if (!active) return;
    if (reduced) {
      setText(final);
      return;
    }
    const controls = animate(0, value, {
      delay,
      duration: 0.6,
      ease: SETTLE,
      onUpdate: (v) => setText(format(v, decimals)),
      onComplete: () => setText(final),
    });
    return () => controls.stop();
  }, [active, value, decimals, delay, reduced, final]);

  // Pad to the final length so the layout never shifts mid-count.
  const padded = text.padStart(final.length, "0");

  return (
    <span aria-label={`${final}${suffix}`}>
      {padded.split("").map((ch, i) => (
        <span
          key={i}
          aria-hidden="true"
          className={cn(/\d/.test(ch) && "inline-block w-[0.62em] text-center")}
        >
          {ch}
        </span>
      ))}
      {suffix && <span aria-hidden="true">{suffix}</span>}
    </span>
  );
}

export function StatDial({
  item,
  active,
  delay = 0,
  size = 96,
  className,
}: {
  item: StatItem;
  active: boolean;
  delay?: number;
  size?: number;
  className?: string;
}) {
  const sweep =
    item.sweep ?? (item.suffix === "%" ? Math.min(item.value / 100, 1) : 1);
  return (
    <div className={cn("flex flex-col items-center gap-3 text-center", className)}>
      <span className="text-(--brass)" style={{ width: size, height: size }}>
        <BrassDial sweep={sweep} sweepActive={active} sweepDelay={delay} />
      </span>
      <p className="text-display-num-sm">
        <CountUp
          value={item.value}
          decimals={item.decimals}
          suffix={item.suffix}
          active={active}
          delay={delay}
        />
      </p>
      <p className="text-body text-(--muted)">{item.caption}</p>
    </div>
  );
}

/**
 * The gauge row: hairline separators with end ticks between cells.
 * If the home hero orchestration is fresh (first view this session), the
 * count begins on the orchestration's t=950ms beat.
 */
export function GaugeRow({
  items,
  heroSync = false,
  className,
}: {
  items: StatItem[];
  /** Home only: sync the count-up to the hero orchestration timeline. */
  heroSync?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [mountedAt] = useState(() => Date.now());
  const [delay, setDelay] = useState(0);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!inView) return;
    let extra = 0;
    if (heroSync) {
      try {
        const played = window.sessionStorage.getItem("hcng:heroPlayed");
        if (!played) {
          extra = Math.max(0, 0.95 - (Date.now() - mountedAt) / 1000);
        }
      } catch {
        /* storage unavailable: sweep immediately */
      }
    }
    setDelay(extra);
    setActive(true);
  }, [inView, heroSync, mountedAt]);

  return (
    <div
      ref={ref}
      className={cn(
        "grid grid-cols-2 gap-x-0 gap-y-10 lg:grid-cols-4",
        className,
      )}
    >
      {items.map((item, i) => (
        <div
          key={item.caption}
          className={cn(
            "px-4",
            i > 0 && "lg:border-l lg:border-(--hairline)",
            i % 2 === 1 && "border-l border-(--hairline) lg:border-l",
          )}
        >
          <StatDial item={item} active={active} delay={delay + i * 0.07} />
        </div>
      ))}
    </div>
  );
}
