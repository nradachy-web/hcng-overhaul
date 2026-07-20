"use client";

/**
 * Shared curated gallery (direction 8.x + do-not 18): a curated strip of
 * clickable plates on the band, with EVERY photo in the set reachable in the
 * lightbox via prev/next. It layers a fixed control bar over the shared
 * Lightbox because Lightbox has no built-in navigation; if Lightbox ever
 * grows prev/next controls, the local bar can go.
 */

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Lightbox } from "./Lightbox";
import { Plate } from "./Plate";
import { RevealGroup, RevealItem } from "./Reveal";

export type GalleryPhoto = {
  src: string;
  alt: string;
  /** Plate caption; also shown in the lightbox caption row. */
  caption?: string;
  /** Figure number. Licensed ONLY on NSSD equipment plates. */
  fig?: string;
  /** Tailwind aspect class for the plate crop. */
  aspect?: string;
  objectPosition?: string;
};

export function CuratedGallery({
  photos,
  visibleCount,
  gridClassName = "grid gap-5 sm:grid-cols-2 lg:grid-cols-4",
  viewAllLabel,
  className,
}: {
  photos: GalleryPhoto[];
  /** How many plates render on the band; the rest live in the lightbox. */
  visibleCount: number;
  gridClassName?: string;
  /** e.g. "View all 23 photos". Omit to hide the completeness link. */
  viewAllLabel?: string;
  className?: string;
}) {
  const [index, setIndex] = useState<number | null>(null);
  const open = index !== null;

  const close = useCallback(() => setIndex(null), []);
  const step = useCallback(
    (dir: 1 | -1) =>
      setIndex((i) =>
        i === null ? i : (i + dir + photos.length) % photos.length,
      ),
    [photos.length],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, step]);

  const current = index === null ? null : photos[index];

  return (
    <div className={className}>
      <RevealGroup className={gridClassName}>
        {photos.slice(0, visibleCount).map((photo, i) => (
          <RevealItem key={photo.src} as="div">
            <button
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`View larger: ${photo.alt}`}
              className="block w-full cursor-zoom-in rounded-[4px] text-left"
            >
              <Plate
                src={photo.src}
                alt={photo.alt}
                caption={photo.caption}
                fig={photo.fig}
                aspect={photo.aspect}
                objectPosition={photo.objectPosition}
              />
            </button>
          </RevealItem>
        ))}
      </RevealGroup>

      {viewAllLabel && photos.length > visibleCount && (
        <button
          type="button"
          onClick={() => setIndex(0)}
          className="text-mono-label mt-6 inline-flex items-center gap-2 text-(--link) underline decoration-1 underline-offset-4"
        >
          {viewAllLabel}
        </button>
      )}

      {current && (
        <>
          <Lightbox
            open={open}
            onClose={close}
            src={current.src}
            alt={current.alt}
            caption={
              current.caption
                ? `${current.caption} (${(index ?? 0) + 1} of ${photos.length})`
                : `${(index ?? 0) + 1} of ${photos.length}`
            }
          />
          {photos.length > 1 && (
            <div
              className="fixed inset-x-0 bottom-6 z-[110] flex items-center justify-center gap-5"
              style={{ ["--focus-ring" as string]: "var(--color-teal-300)" }}
            >
              <button
                type="button"
                aria-label="Previous photo"
                onClick={(e) => {
                  e.stopPropagation();
                  step(-1);
                }}
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-[4px]",
                  "border border-paper-50/40 bg-espresso-950/80 text-paper-50 hover:border-paper-50/70",
                )}
              >
                <ChevronLeft aria-hidden="true" className="h-4 w-4" />
              </button>
              <span className="text-mono-cap text-paper-50/80">
                {(index ?? 0) + 1} / {photos.length}
              </span>
              <button
                type="button"
                aria-label="Next photo"
                onClick={(e) => {
                  e.stopPropagation();
                  step(1);
                }}
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-[4px]",
                  "border border-paper-50/40 bg-espresso-950/80 text-paper-50 hover:border-paper-50/70",
                )}
              >
                <ChevronRight aria-hidden="true" className="h-4 w-4" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
