import { cn } from "@/lib/utils";

/**
 * Band discipline (DESIGN_DIRECTION 3.4): interior pages carry at most ONE
 * dark band between light neighbors. Home is licensed three dark moments
 * (hero, retreat, closing). /our-office/ is the one dark-majority page.
 * Long-form reading (FAQ, lists, bios, legal) never sits on a dark band.
 */

export type BandTone =
  | "plaster"
  | "bone"
  | "espresso"
  | "espresso-deep"
  | "charcoal";

const TONE_CLASS: Record<BandTone, string> = {
  plaster: "band-plaster",
  bone: "band-bone",
  espresso: "band-espresso",
  "espresso-deep": "band-espresso-deep",
  charcoal: "band-charcoal",
};

type BandProps = {
  tone: BandTone;
  id?: string;
  /** "section" = 112/64px rhythm; "strip" = tight credibility strips. */
  pad?: "section" | "strip" | "none";
  /** Wrap children in the 1200px container (default true). */
  container?: boolean;
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
};

export function Band({
  tone,
  id,
  pad = "section",
  container = true,
  className,
  containerClassName,
  children,
}: BandProps) {
  return (
    <section
      id={id}
      className={cn(
        "band",
        TONE_CLASS[tone],
        pad === "section" && "py-16 lg:py-28",
        pad === "strip" && "py-10 lg:py-14",
        className,
      )}
    >
      {container ? (
        <div className={cn("container-site", containerClassName)}>{children}</div>
      ) : (
        children
      )}
    </section>
  );
}

/**
 * Eyebrow anatomy, everywhere: an 8x1px brass tick, then the mono label in
 * caps. On service pages the tick takes the room accent (pass `accent` as a
 * CSS color value, e.g. "var(--color-room-signal)").
 */
export function Eyebrow({
  children,
  accent,
  as: Tag = "p",
  className,
}: {
  children: React.ReactNode;
  accent?: string;
  as?: "p" | "h2" | "h3" | "span" | "div";
  className?: string;
}) {
  return (
    <Tag className={cn("text-mono-label flex items-center gap-3", className)}>
      <span
        aria-hidden="true"
        className="inline-block h-px w-2 shrink-0"
        style={{ background: accent ?? "var(--brass, var(--color-brass-600))" }}
      />
      <span>{children}</span>
    </Tag>
  );
}

/** 1px hairline with 8px end ticks: the entire instrument line language. */
export function Rule({ className }: { className?: string }) {
  return <div aria-hidden="true" className={cn("tick-rule", className)} />;
}
