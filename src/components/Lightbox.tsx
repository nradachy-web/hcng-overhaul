"use client";

/**
 * Lightbox: fades in with a 1.02 settle. Esc or backdrop click closes.
 * Used for gallery completeness and review-screenshot provenance.
 */

import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { asset } from "@/lib/asset";
import { SETTLE } from "@/lib/motion";

export function Lightbox({
  open,
  onClose,
  src,
  alt,
  caption,
}: {
  open: boolean;
  onClose: () => void;
  src: string;
  alt: string;
  caption?: string;
}) {
  const reduced = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0.16 : 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-espresso-950/95 p-4"
          onClick={onClose}
        >
          <button
            ref={closeRef}
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="text-mono-label absolute top-4 right-4 flex items-center gap-2 rounded-[4px] px-3 py-2 text-paper-50/80 hover:text-paper-50"
            style={{ ["--focus-ring" as string]: "var(--color-teal-300)" }}
          >
            CLOSE <X aria-hidden="true" className="h-4 w-4" />
          </button>
          <motion.figure
            initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 1.02 }}
            transition={{ duration: reduced ? 0.16 : 0.24, ease: SETTLE }}
            className="max-h-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={asset(src)}
              alt={alt}
              className="max-h-[85vh] w-auto max-w-full rounded-[4px]"
            />
            {caption && (
              <figcaption className="text-mono-cap mt-3 text-center text-paper-50/70 uppercase">
                {caption}
              </figcaption>
            )}
          </motion.figure>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
