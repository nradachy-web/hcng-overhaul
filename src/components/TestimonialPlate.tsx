"use client";

/**
 * Retyped Google review card with view-original provenance. Review text is
 * retyped VERBATIM (typos and all); the untouched screenshot opens in a
 * lightbox and fires review_original_view. Never invent counts, aggregate
 * ratings, or star totals.
 */

import { useState } from "react";
import { cn } from "@/lib/utils";
import { track } from "@/lib/track";
import { EV } from "@/lib/constants";
import { Lightbox } from "./Lightbox";

export function TestimonialPlate({
  quote,
  name,
  sourceLabel = "Google review",
  screenshot,
  screenshotAlt,
  className,
}: {
  quote: string;
  name: string;
  sourceLabel?: string;
  /** Path to the untouched review screenshot, e.g. /assets/images/image12.jpg */
  screenshot?: string;
  screenshotAlt?: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <figure
      className={cn(
        "flex h-full flex-col rounded-[4px] border border-(--hairline) bg-(--card-bg) p-6 shadow-(--card-shadow)",
        className,
      )}
    >
      <blockquote className="text-body flex-1">
        <p>&ldquo;{quote}&rdquo;</p>
      </blockquote>
      <figcaption className="mt-5 border-t border-(--hairline) pt-4">
        <div className="flex items-baseline justify-between gap-4">
          <span className="text-mono-label">{name}</span>
          <span className="text-mono-cap text-(--muted) uppercase">
            {sourceLabel}
          </span>
        </div>
        {screenshot && (
          <button
            type="button"
            className="text-mono-cap mt-2 text-(--link) underline decoration-1 underline-offset-4"
            onClick={() => {
              track(EV.REVIEW_ORIGINAL_VIEW);
              setOpen(true);
            }}
          >
            View original
          </button>
        )}
      </figcaption>
      {screenshot && (
        <Lightbox
          open={open}
          onClose={() => setOpen(false)}
          src={screenshot}
          alt={screenshotAlt ?? `Original Google review by ${name}`}
          caption={`ORIGINAL REVIEW, ${name}`}
        />
      )}
    </figure>
  );
}
