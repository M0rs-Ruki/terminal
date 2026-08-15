const UNITS: [Intl.RelativeTimeFormatUnit, number][] = [
  ["year", 31536000],
  ["month", 2592000],
  ["week", 604800],
  ["day", 86400],
  ["hour", 3600],
  ["minute", 60],
];

const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

export function formatRelativeTime(iso: string): string {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return iso;

  const diffSec = Math.round((Date.now() - then) / 1000);
  if (diffSec < 60) return "just now";

  for (const [unit, secondsInUnit] of UNITS) {
    const delta = Math.floor(diffSec / secondsInUnit);
    if (delta >= 1) return rtf.format(-delta, unit);
  }
  return "just now";
}
