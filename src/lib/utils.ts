import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * The custom type-scale utilities (globals.css) start with "text-", which
 * tailwind-merge would otherwise classify as text-color classes and drop
 * when a real color like text-paper-50 follows. Register them as font-size
 * classes so they only conflict with each other.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        "text-display-1",
        "text-display-num",
        "text-lp-h1",
        "text-h2s",
        "text-h3s",
        "text-lead",
        "text-body",
        "text-quote",
        "text-mono-label",
        "text-mono-cap",
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
