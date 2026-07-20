/**
 * The motion contract (DESIGN_DIRECTION 5). Two verbs sitewide (Rise, Sweep)
 * plus the one orchestrated home hero moment. Nothing loops, nothing
 * parallaxes, nothing moves after settle.
 */

export const SETTLE: [number, number, number, number] = [0.2, 0.7, 0.2, 1];

export const RISE = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
} as const;

export const RISE_TRANSITION = { duration: 0.32, ease: SETTLE } as const;

/** Reduced motion: every Rise becomes a 160ms opacity fade. */
export const FADE_TRANSITION = { duration: 0.16 } as const;

export const VIEWPORT_ONCE = { once: true, margin: "-80px" } as const;

/** sessionStorage flag for the once-per-session home hero orchestration. */
export const HERO_PLAYED_KEY = "hcng:heroPlayed";
