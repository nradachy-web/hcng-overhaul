"use client";

/**
 * Dual CTA pattern (DESIGN_DIRECTION 7.2): the call button is solid teal-500,
 * always first, always above the fold at 360px. Book/form actions are outline
 * secondaries. Phone is never demoted. Labels are mono. Brass never fills a
 * button; teal acts, brass measures.
 */

import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { asset } from "@/lib/asset";
import { track } from "@/lib/track";
import { EV, PHONE_DISPLAY, PHONE_TEL, type TelLocation } from "@/lib/constants";
import { isPatientDataPath } from "@/lib/patientData";

type TrackSpec = { event: string; params?: Record<string, string> };

export type ButtonProps = {
  href?: string;
  variant?: "solid" | "outline";
  size?: "md" | "sm";
  /** true renders a right arrow that nudges 4px on hover; "down" a chevron. */
  arrow?: boolean | "down";
  external?: boolean;
  onClick?: () => void;
  trackEvent?: TrackSpec;
  className?: string;
  children: React.ReactNode;
};

export function Button({
  href,
  variant = "solid",
  size = "md",
  arrow,
  external,
  onClick,
  trackEvent,
  className,
  children,
}: ButtonProps) {
  const classes = cn(
    "btn text-mono-label inline-flex items-center justify-center gap-2 rounded-[4px] text-center transition-colors duration-150",
    size === "md" ? "min-h-12 px-6 py-3" : "min-h-10 px-4 py-2",
    variant === "solid" &&
      "bg-teal-500 text-paper-50 hover:bg-teal-600 active:bg-teal-600",
    variant === "outline" &&
      "border border-current/40 text-current hover:border-current/70 hover:bg-current/5",
    className,
  );

  const handleClick = () => {
    if (trackEvent) track(trackEvent.event, trackEvent.params);
    onClick?.();
  };

  const inner = (
    <>
      <span>{children}</span>
      {arrow === "down" ? (
        <ChevronDown aria-hidden="true" className="btn-arrow btn-arrow-down h-4 w-4" />
      ) : arrow ? (
        <ArrowRight aria-hidden="true" className="btn-arrow h-4 w-4" />
      ) : null}
    </>
  );

  // Patient-data routes (the intake) get a plain anchor: a full page load, so
  // no Google tag from this page can come along (lib/patientData.ts).
  if (href && href.startsWith("/") && !isPatientDataPath(href.split(/[?#]/)[0])) {
    return (
      <Link href={href} className={classes} onClick={handleClick}>
        {inner}
      </Link>
    );
  }
  if (href) {
    return (
      <a
        href={href.startsWith("/") ? asset(href) : href}
        className={classes}
        onClick={handleClick}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {inner}
      </a>
    );
  }
  return (
    <button type="button" className={classes} onClick={handleClick}>
      {inner}
    </button>
  );
}

/** The primary conversion action, everywhere. Fires tel_click{location}. */
export function CallButton({
  location,
  variant = "solid",
  size = "md",
  className,
}: {
  location: TelLocation;
  variant?: "solid" | "outline";
  size?: "md" | "sm";
  className?: string;
}) {
  return (
    <Button
      href={PHONE_TEL}
      variant={variant}
      size={size}
      className={className}
      trackEvent={{ event: EV.TEL_CLICK, params: { location } }}
    >
      CALL {PHONE_DISPLAY}
    </Button>
  );
}

/**
 * Inline phone number as text plus tel link, for body copy prompts like
 * "Not sure? Call and describe it." Fires tel_click{location:"body"}.
 */
export function TelText({
  location = "body",
  className,
  children,
}: {
  location?: TelLocation;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <a
      href={PHONE_TEL}
      className={cn(
        "font-semibold text-(--link) underline decoration-1 underline-offset-4",
        className,
      )}
      onClick={() => track(EV.TEL_CLICK, { location })}
    >
      {children ?? PHONE_DISPLAY}
    </a>
  );
}
