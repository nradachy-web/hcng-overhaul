import { HOURS_BY_WEEKDAY } from "./constants";

/**
 * Open-now computation in America/Detroit, client-side only.
 * Server-render the neutral "Office hours" label and swap after hydration
 * (static export; there is no request-time clock).
 */

export type OpenState = { open: boolean; label: string };

export const NEUTRAL_LABEL = "Office hours";

function detroitNow(date: Date): { weekday: number; minutes: number } {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Detroit",
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  }).formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  const dayIndex = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(
    get("weekday"),
  );
  const hour = parseInt(get("hour"), 10) % 24;
  const minute = parseInt(get("minute"), 10) || 0;
  return { weekday: dayIndex < 0 ? 0 : dayIndex, minutes: hour * 60 + minute };
}

function fmtTime(minutes: number): string {
  const h = Math.floor(minutes / 60);
  if (h === 12) return "12pm";
  if (h > 12) return `${h - 12}pm`;
  return `${h}am`;
}

export function getOpenState(date: Date = new Date()): OpenState {
  const { weekday, minutes } = detroitNow(date);
  const today = HOURS_BY_WEEKDAY[weekday];

  for (const [start, end] of today.ranges) {
    if (minutes >= start && minutes < end) {
      return { open: true, label: `Open today until ${fmtTime(end)}` };
    }
  }

  const later = today.ranges.find(([start]) => minutes < start);
  if (later) {
    return { open: false, label: `Opens today ${fmtTime(later[0])}` };
  }

  for (let offset = 1; offset <= 7; offset++) {
    const next = HOURS_BY_WEEKDAY[(weekday + offset) % 7];
    if (next.ranges.length > 0) {
      const at = fmtTime(next.ranges[0][0]);
      return {
        open: false,
        label: offset === 1 ? `Opens tomorrow ${at}` : `Opens ${next.day} ${at}`,
      };
    }
  }

  return { open: false, label: NEUTRAL_LABEL };
}
