"use client";

/**
 * Open-now indicator, computed client-side from the verbatim hours in
 * America/Detroit. Server-renders the neutral "Office hours" label and swaps
 * after hydration so the static export never mismatches. The led-500 dot is
 * licensed for this indicator and form success only.
 */

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { getOpenState, NEUTRAL_LABEL, type OpenState } from "@/lib/hours";

export function useOpenNow(): OpenState & { ready: boolean } {
  const [state, setState] = useState<OpenState | null>(null);

  useEffect(() => {
    const update = () => setState(getOpenState());
    update();
    const timer = window.setInterval(update, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  return {
    ready: state !== null,
    open: state?.open ?? false,
    label: state?.label ?? NEUTRAL_LABEL,
  };
}

export function OpenNowDot({ open }: { open: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-block h-1.5 w-1.5 shrink-0 rounded-full",
        open ? "bg-led-500" : "bg-current opacity-30",
      )}
    />
  );
}

/** Inline dot + mono label, for heroes and visit modules. */
export function OpenNow({ className }: { className?: string }) {
  const { open, label } = useOpenNow();
  return (
    <p className={cn("text-mono-label flex items-center gap-2.5", className)}>
      <OpenNowDot open={open} />
      <span>{label}</span>
    </p>
  );
}
