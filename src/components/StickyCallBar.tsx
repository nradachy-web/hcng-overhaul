"use client";

/**
 * Sticky mobile call bar (DESIGN_DIRECTION 7.3): below 1024px, fixed bottom,
 * espresso-950 with a 1px brass top rule. CALL solid teal at 60% width, BOOK
 * outline at 40% linking to /new-patients/#book. Present from load on the
 * four service LPs (fromLoad); appears after 480px of scroll elsewhere;
 * hides while the footer is on screen. Mono labels. GA4 on both segments.
 */

import { useEffect, useState } from "react";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { track } from "@/lib/track";
import { EV, PHONE_DISPLAY, PHONE_TEL } from "@/lib/constants";

export function StickyCallBar({ fromLoad = false }: { fromLoad?: boolean }) {
  const [scrolled, setScrolled] = useState(fromLoad);
  const [footerVisible, setFooterVisible] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (fromLoad) return;
    const onScroll = () => setScrolled(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [fromLoad]);

  useEffect(() => {
    const footer = document.getElementById("site-footer");
    if (!footer) return;
    const observer = new IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  const visible = scrolled && !footerVisible;

  return (
    <div
      aria-hidden={!visible}
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-brass-300/50 bg-espresso-950 pb-[env(safe-area-inset-bottom)] lg:hidden",
        !reduced && "transition-transform duration-250 ease-(--ease-settle)",
        visible ? "translate-y-0" : "translate-y-full",
      )}
    >
      <div className="flex h-14 items-stretch gap-2 p-2">
        <a
          href={PHONE_TEL}
          tabIndex={visible ? 0 : -1}
          onClick={() => track(EV.TEL_CLICK, { location: "sticky" })}
          className="text-mono-label flex w-[60%] items-center justify-center rounded-[4px] bg-teal-500 text-paper-50 active:bg-teal-600"
        >
          CALL {PHONE_DISPLAY}
        </a>
        <Link
          href="/new-patients/#book"
          tabIndex={visible ? 0 : -1}
          onClick={() => track(EV.BOOK_CLICK, { location: "sticky" })}
          className="text-mono-label flex w-[40%] items-center justify-center rounded-[4px] border border-paper-50/40 text-paper-50"
        >
          BOOK
        </Link>
      </div>
    </div>
  );
}
