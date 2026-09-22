"use client";

/**
 * Global header (DESIGN_DIRECTION 6): charcoal-850, sticky, 76px compressing
 * to 60px on scroll. Logo left, sized up per the client (2026-09-21); text
 * links Decompression, Chiropractic, Massage, Kids, then at xl the six
 * secondary pages inline (the client asked for them "up top"), below xl a
 * More menu; right, the phone chip (the only pill on the site): brass
 * hairline border, led open-now dot with computed label, mono
 * CALL 810.584.7170. The open-now label shows only at 2xl and drops when
 * compressed; the number never does. Icon-plus-number below 420px.
 */

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { asset } from "@/lib/asset";
import { track } from "@/lib/track";
import {
  EV,
  NAV_MORE,
  NAV_PRIMARY,
  PHONE_DISPLAY,
  PHONE_TEL,
  SITE_NAME,
} from "@/lib/constants";
import { OpenNowDot, useOpenNow } from "./OpenNow";

export function Header() {
  const [compressed, setCompressed] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const moreRef = useRef<HTMLLIElement>(null);
  const { open, label } = useOpenNow();

  useEffect(() => {
    const onScroll = () => setCompressed(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!moreOpen) return;
    const onDown = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMoreOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [moreOpen]);

  const linkClass =
    "text-mono-label px-3 py-2 whitespace-nowrap text-paper-50/80 transition-colors duration-150 hover:text-paper-50 xl:px-2 xl:text-[12px]";

  return (
    <header className="band-charcoal sticky top-0 z-50 border-b border-(--hairline) bg-charcoal-850">
      <div
        className={cn(
          "container-site flex items-center justify-between gap-3 transition-[height] duration-200 xl:max-w-[1440px]",
          compressed ? "h-[60px]" : "h-[76px]",
        )}
      >
        <Link
          href="/"
          className="flex shrink-0 items-center"
          onClick={() => setMenuOpen(false)}
        >
          <img
            src={asset("/assets/images/image01.png")}
            alt={SITE_NAME}
            className={cn(
              "w-auto transition-[height] duration-200",
              compressed ? "h-12" : "h-[60px]",
            )}
          />
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center">
            {NAV_PRIMARY.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
            {NAV_MORE.map((item) => (
              <li key={item.href} className="hidden xl:block">
                <Link href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
            <li ref={moreRef} className="relative xl:hidden">
              <button
                type="button"
                className={cn(linkClass, "flex items-center gap-1")}
                aria-expanded={moreOpen}
                aria-haspopup="true"
                onClick={() => setMoreOpen((v) => !v)}
              >
                More
                <ChevronDown
                  aria-hidden="true"
                  className={cn(
                    "h-3.5 w-3.5 transition-transform duration-150",
                    moreOpen && "rotate-180",
                  )}
                />
              </button>
              {moreOpen && (
                <ul className="absolute top-full right-0 mt-2 w-52 rounded-[4px] border border-(--hairline) bg-charcoal-850 p-1.5 shadow-lamp">
                  {NAV_MORE.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-mono-label block rounded-[4px] px-3 py-2.5 text-paper-50/80 hover:bg-espresso-900 hover:text-paper-50"
                        onClick={() => setMoreOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={PHONE_TEL}
            onClick={() => track(EV.TEL_CLICK, { location: "header" })}
            className="text-mono-label flex items-center gap-2.5 rounded-full border border-brass-300/40 py-2 pr-4 pl-3.5 whitespace-nowrap text-paper-50 transition-colors duration-150 hover:border-brass-300/70"
          >
            <OpenNowDot open={open} />
            <span
              className={cn(
                "hidden text-paper-50/70 2xl:inline",
                compressed && "2xl:hidden",
              )}
            >
              {label}
            </span>
            <span
              aria-hidden="true"
              className={cn(
                "hidden h-3 w-px bg-paper-50/25 2xl:block",
                compressed && "2xl:hidden",
              )}
            />
            <Phone aria-hidden="true" className="h-3.5 w-3.5 min-[421px]:hidden" />
            <span className="hidden min-[421px]:inline">CALL {PHONE_DISPLAY}</span>
            <span className="min-[421px]:hidden">{PHONE_DISPLAY}</span>
          </a>

          <button
            type="button"
            className="text-mono-label rounded-[4px] px-3 py-2.5 text-paper-50/80 hover:text-paper-50 lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          id="mobile-menu"
          aria-label="Primary, mobile"
          className="border-t border-(--hairline) bg-charcoal-850 lg:hidden"
        >
          <ul className="container-site grid gap-0.5 py-4">
            {[...NAV_PRIMARY, ...NAV_MORE].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-mono-label block rounded-[4px] px-3 py-3 text-paper-50/85 hover:bg-espresso-900 hover:text-paper-50"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
