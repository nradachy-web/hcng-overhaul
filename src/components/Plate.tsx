import { cn } from "@/lib/utils";
import { asset } from "@/lib/asset";

/**
 * Photo plate (DESIGN_DIRECTION 3.4): every non-hero photo sits in a 1px
 * hairline frame with 8px padding and a mono caption row beneath, label left,
 * optional figure number right. Figure numbers are licensed ONLY on
 * /our-office/ chapter plates and NSSD equipment plates; never on people,
 * children, or event photos. Imagery scales 1.02 inside the fixed frame.
 */

export function Plate({
  src,
  alt,
  caption,
  fig,
  aspect,
  objectPosition,
  className,
  eager,
}: {
  src: string;
  alt: string;
  /** Mono caption, rendered in caps. Omit for a frame with no caption row. */
  caption?: string;
  /** Figure number, e.g. "FIG. 02". Licensed on rooms and equipment only. */
  fig?: string;
  /** Tailwind aspect class for the media crop, e.g. "aspect-[3/4]". */
  aspect?: string;
  objectPosition?: string;
  className?: string;
  eager?: boolean;
}) {
  return (
    <figure
      className={cn(
        "plate rounded-[4px] border border-(--hairline) p-2",
        className,
      )}
    >
      <div className={cn("plate-media", aspect)}>
        <img
          src={asset(src)}
          alt={alt}
          loading={eager ? "eager" : "lazy"}
          className={cn("block w-full", aspect && "h-full object-cover")}
          style={objectPosition ? { objectPosition } : undefined}
        />
      </div>
      {(caption || fig) && (
        <figcaption className="text-mono-cap flex items-baseline justify-between gap-4 px-1 pt-2 pb-0.5 text-(--muted) uppercase">
          <span>{caption}</span>
          {fig && <span className="shrink-0">{fig}</span>}
        </figcaption>
      )}
    </figure>
  );
}
