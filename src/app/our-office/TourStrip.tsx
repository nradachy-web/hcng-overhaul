"use client";

/**
 * Page-local to /our-office/: a scroll-snap photo strip with arrow
 * affordances and a lightbox for full-size viewing (gallery completeness
 * lives in the lightbox; no masonry dumps). Figure numbers are licensed on
 * these room chapters. Stacks to a swipeable strip without JS; the arrows
 * are an enhancement. Uses the shared Lightbox and the plate recipe.
 */

import { useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { asset } from "@/lib/asset";
import { Lightbox } from "@/components/Lightbox";

export type TourPhoto = {
  src: string;
  alt: string;
  caption: string;
  fig: string;
  /** Landscape sources get the wide crop; portrait sources the tall crop. */
  wide?: boolean;
};

export function TourStrip({
  photos,
  ariaLabel,
}: {
  photos: TourPhoto[];
  ariaLabel: string;
}) {
  const scroller = useRef<HTMLUListElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const reduced = useReducedMotion();

  const current = openIndex === null ? photos[0] : photos[openIndex];

  const nudge = (dir: 1 | -1) => {
    const el = scroller.current;
    if (!el) return;
    el.scrollBy({
      left: dir * Math.round(el.clientWidth * 0.8),
      behavior: reduced ? "auto" : "smooth",
    });
  };

  return (
    <div>
      <ul
        ref={scroller}
        aria-label={ariaLabel}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2"
      >
        {photos.map((photo, i) => (
          <li
            key={photo.src}
            className={cn(
              "shrink-0 snap-start",
              photo.wide ? "w-[min(78vw,440px)]" : "w-[min(62vw,280px)]",
            )}
          >
            <figure className="plate rounded-[4px] border border-(--hairline) p-2">
              <button
                type="button"
                className="plate-media block w-full"
                onClick={() => setOpenIndex(i)}
                aria-label={`View full size: ${photo.caption}`}
              >
                <img
                  src={asset(photo.src)}
                  alt={photo.alt}
                  loading="lazy"
                  className={cn(
                    "h-full w-full object-cover",
                    photo.wide ? "aspect-[3/2]" : "aspect-[3/4]",
                  )}
                />
              </button>
              <figcaption className="text-mono-cap flex items-baseline justify-between gap-4 px-1 pt-2 pb-0.5 text-(--muted) uppercase">
                <span>{photo.caption}</span>
                <span className="shrink-0">{photo.fig}</span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
      <div className="mt-3 hidden items-center gap-2 md:flex">
        <button
          type="button"
          onClick={() => nudge(-1)}
          aria-label="Scroll the strip back"
          className="inline-flex h-9 w-9 items-center justify-center rounded-[4px] border border-(--hairline) text-current/70 hover:border-current/50 hover:text-current"
        >
          <ChevronLeft aria-hidden="true" className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => nudge(1)}
          aria-label="Scroll the strip forward"
          className="inline-flex h-9 w-9 items-center justify-center rounded-[4px] border border-(--hairline) text-current/70 hover:border-current/50 hover:text-current"
        >
          <ChevronRight aria-hidden="true" className="h-4 w-4" />
        </button>
      </div>
      <Lightbox
        open={openIndex !== null}
        onClose={() => setOpenIndex(null)}
        src={current.src}
        alt={current.alt}
        caption={`${current.caption}, ${current.fig}`}
      />
    </div>
  );
}
