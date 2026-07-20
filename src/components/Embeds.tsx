"use client";

/**
 * Third-party embed facades (DESIGN_DIRECTION 7.4). Every embed sits on a
 * light band inside a styled shell: static serif heading, one reassurance
 * line, reserved min-height (zero CLS), brass top rule, and a "Prefer the
 * phone?" mono line. Nothing third-party on first paint; iframes mount on
 * approach or click only. GA4 events fire on activation.
 */

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { asset } from "@/lib/asset";
import { track } from "@/lib/track";
import {
  ADDRESS_LINE_1,
  ADDRESS_LINE_2,
  EV,
  MAPS_DIRECTIONS_URL,
  MAPS_EMBED_URL,
} from "@/lib/constants";
import { Button, TelText } from "./Button";
import { CrescentMark } from "./BrassDial";

/* ------------------------------------------------------------------ */
/* Shared shell                                                        */
/* ------------------------------------------------------------------ */

export function EmbedShell({
  heading,
  reassurance,
  minHeight,
  id,
  children,
  className,
}: {
  heading: string;
  reassurance?: string;
  minHeight: number;
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      id={id}
      className={cn(
        "rounded-[4px] border border-(--hairline) bg-(--card-bg)",
        className,
      )}
    >
      <div aria-hidden="true" className="h-px bg-(--brass)" />
      <div className="p-6 sm:p-8">
        <h3 className="text-h3s">{heading}</h3>
        {reassurance && (
          <p className="text-body mt-2 text-(--muted)">{reassurance}</p>
        )}
        <div className="mt-6" style={{ minHeight }}>
          {children}
        </div>
        <p className="text-mono-cap mt-4 text-(--muted) uppercase">
          Prefer the phone? <TelText location="body" />
        </p>
      </div>
    </div>
  );
}

function useApproach<T extends HTMLElement>(margin = "320px") {
  const ref = useRef<T>(null);
  const [near, setNear] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || near) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setNear(true);
      },
      { rootMargin: margin },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [near, margin]);
  return { ref, near };
}

/* ------------------------------------------------------------------ */
/* JotForm: one shell for every instance (contact, new-patients,       */
/* spinal-decompression) so loading states are identical. The reserved */
/* interior is painted token-native and local-only (plaster fill,      */
/* hairline, mono line); the iframe mounts on approach but stays       */
/* invisible until its load event fires, so a slow or blocked embed    */
/* shows the designed plate, never a blank void or a broken glyph.     */
/* ------------------------------------------------------------------ */

export function JotFormShell({
  formId,
  form,
  heading,
  reassurance,
  minHeight = 680,
  id,
  className,
}: {
  formId: string;
  /** GA4 form_open param: "jotform_contact" | "jotform_consult". */
  form: string;
  heading: string;
  reassurance?: string;
  minHeight?: number;
  id?: string;
  className?: string;
}) {
  const { ref, near } = useApproach<HTMLDivElement>();
  const fired = useRef(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (near && !fired.current) {
      fired.current = true;
      track(EV.FORM_OPEN, { form });
    }
  }, [near, form]);

  return (
    <div ref={ref}>
      <EmbedShell
        heading={heading}
        reassurance={reassurance}
        minHeight={minHeight}
        id={id}
        className={className}
      >
        <div className="relative" style={{ minHeight }}>
          <div
            aria-hidden="true"
            className="absolute inset-0 flex flex-col items-center justify-center gap-5 rounded-[2px] border border-(--hairline) bg-plaster-100 p-6 text-center"
          >
            <span className="text-(--brass)">
              <CrescentMark size={24} />
            </span>
            <p className="text-mono-cap text-(--muted) uppercase">
              Secure form. It loads right here.
            </p>
            <div aria-hidden="true" className="tick-rule w-24" />
          </div>
          {near && (
            <iframe
              src={`https://form.jotform.com/${formId}`}
              title={heading}
              onLoad={() => setLoaded(true)}
              className={cn(
                "relative w-full rounded-[2px] border-0 transition-opacity duration-300",
                loaded ? "opacity-100" : "opacity-0",
              )}
              style={{ height: minHeight }}
              loading="lazy"
              allow="geolocation; microphone; camera"
            />
          )}
        </div>
      </EmbedShell>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Typeform candidacy quiz: click-to-start facade card.                */
/* ------------------------------------------------------------------ */

export function TypeformFacade({
  quizId,
  heading,
  reassurance,
  buttonLabel,
  minHeight = 520,
  className,
}: {
  quizId: string;
  heading: string;
  reassurance?: string;
  buttonLabel: string;
  minHeight?: number;
  className?: string;
}) {
  const [started, setStarted] = useState(false);

  return (
    <EmbedShell
      heading={heading}
      reassurance={reassurance}
      minHeight={minHeight}
      className={className}
    >
      {started ? (
        <iframe
          src={`https://form.typeform.com/to/${quizId}`}
          title={heading}
          className="w-full rounded-[2px] border-0"
          style={{ height: minHeight }}
          allow="camera; microphone; autoplay; encrypted-media"
        />
      ) : (
        <div
          className="flex flex-col items-center justify-center gap-5 border border-(--hairline) p-6"
          style={{ height: minHeight }}
        >
          <span className="text-(--brass)">
            <CrescentMark size={28} />
          </span>
          <Button
            variant="outline"
            onClick={() => {
              track(EV.FORM_OPEN, { form: "typeform_quiz" });
              setStarted(true);
            }}
          >
            {buttonLabel}
          </Button>
        </div>
      )}
    </EmbedShell>
  );
}

/* ------------------------------------------------------------------ */
/* YouTube: poster + brass play tick; iframe on click only.            */
/* ------------------------------------------------------------------ */

function PlayTick() {
  return (
    <span className="relative inline-flex h-16 w-16 items-center justify-center text-brass-300">
      {/* Filled espresso disc so the control reads over busy posters. */}
      <span
        aria-hidden="true"
        className="absolute inset-1.5 rounded-full bg-espresso-950/80"
      />
      <CrescentMark size={64} className="absolute inset-0" />
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="relative h-6 w-6 translate-x-0.5"
      >
        <path d="M7 4.5v15l13-7.5z" fill="currentColor" />
      </svg>
    </span>
  );
}

export function YouTubeFacade({
  videoId,
  title,
  className,
}: {
  videoId: string;
  title: string;
  className?: string;
}) {
  const [playing, setPlaying] = useState(false);

  return (
    <div
      className={cn(
        "plate rounded-[4px] border border-(--hairline) p-2",
        className,
      )}
    >
      <div className="plate-media relative aspect-video bg-espresso-950">
        {playing ? (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
            title={title}
            className="absolute inset-0 h-full w-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            className="group absolute inset-0 flex h-full w-full items-center justify-center"
            onClick={() => {
              track(EV.VIDEO_PLAY, { id: videoId });
              setPlaying(true);
            }}
          >
            {/* Poster baked locally (public/assets/posters); nothing
                third-party loads before the click. */}
            <img
              src={asset(`/assets/posters/${videoId}.jpg`)}
              alt=""
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover opacity-80"
            />
            <span className="relative">
              <PlayTick />
            </span>
            <span className="sr-only">Play video: {title}</span>
          </button>
        )}
      </div>
      <p className="text-mono-cap flex items-baseline justify-between px-1 pt-2 pb-0.5 text-(--muted) uppercase">
        <span>{title}</span>
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Local video plate: poster-first, preload none, click to play.       */
/* ------------------------------------------------------------------ */

export function VideoPlate({
  src,
  poster,
  caption,
  title,
  aspect = "aspect-[9/16]",
  className,
}: {
  src: string;
  poster: string;
  caption?: string;
  title: string;
  /** Tailwind aspect class matching the source video. */
  aspect?: string;
  className?: string;
}) {
  const [playing, setPlaying] = useState(false);
  const videoId = src.split("/").pop() ?? src;

  return (
    <figure
      className={cn(
        "plate rounded-[4px] border border-(--hairline) p-2",
        className,
      )}
    >
      <div className={cn("plate-media relative bg-espresso-950", aspect)}>
        {playing ? (
          <video
            src={asset(src)}
            poster={asset(poster)}
            controls
            autoPlay
            playsInline
            preload="none"
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <button
            type="button"
            className="absolute inset-0 flex h-full w-full items-center justify-center"
            onClick={() => {
              track(EV.VIDEO_PLAY, { id: videoId });
              setPlaying(true);
            }}
          >
            <img
              src={asset(poster)}
              alt=""
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <span className="relative">
              <PlayTick />
            </span>
            <span className="sr-only">Play video: {title}</span>
          </button>
        )}
      </div>
      {caption && (
        <figcaption className="text-mono-cap px-1 pt-2 pb-0.5 text-(--muted) uppercase">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* Google Maps: click-to-load facade in a plate frame.                 */
/* ------------------------------------------------------------------ */

export function MapFacade({
  height = 380,
  className,
}: {
  height?: number;
  className?: string;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={cn("plate rounded-[4px] border border-(--hairline) p-2", className)}>
      <div className="relative overflow-hidden rounded-[2px]" style={{ height }}>
        {loaded ? (
          <iframe
            src={MAPS_EMBED_URL}
            title="Map to Hanczaryk Chiropractic Neurology Group"
            className="absolute inset-0 h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-espresso-900 p-6 text-center text-paper-50">
            <p className="text-mono-label text-paper-50/60">Google Maps</p>
            <p className="text-body">
              {ADDRESS_LINE_1}
              <br />
              {ADDRESS_LINE_2}
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLoaded(true)}
              className="text-paper-50"
            >
              Load the map
            </Button>
          </div>
        )}
      </div>
      <p className="text-mono-cap flex items-baseline justify-between px-1 pt-2 pb-0.5 text-(--muted)">
        <span className="uppercase">8185 Holly Road Suite 14, Grand Blanc</span>
        <a
          href={MAPS_DIRECTIONS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 text-(--link) underline decoration-1 underline-offset-4"
          onClick={() => track(EV.DIRECTIONS_CLICK)}
        >
          Get directions
        </a>
      </p>
    </div>
  );
}
