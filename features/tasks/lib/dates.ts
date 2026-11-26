import type { TaskStatus } from "@/components/ui/status-chip";

/**
 * Fixed "today" for the mock UI. Using a constant keeps the server and client
 * renders identical (no hydration mismatch) and works with Cache Components.
 * Replace it with the real date from the server once the backend exists.
 */
export const MOCK_TODAY = "2026-11-20";

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
] as const;
const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

const DAY_MS = 86_400_000;

function toUtc(iso: string): number {
  const [year, month, day] = iso.split("-").map(Number);
  return Date.UTC(year, month - 1, day);
}

/** Whole days from today to `iso` (negative = in the past). */
export function daysFromToday(iso: string, today: string = MOCK_TODAY): number {
  return Math.round((toUtc(iso) - toUtc(today)) / DAY_MS);
}

export type DueTone = "overdue" | "soon" | "normal" | "done";

export type DueInfo = { label: string; tone: DueTone };

/** Short, locale-independent label such as "Tomorrow", "Mon" or "Nov 27". */
export function getDue(
  iso: string | null,
  status: TaskStatus,
  today: string = MOCK_TODAY,
): DueInfo | null {
  if (!iso) return null;

  const date = new Date(toUtc(iso));
  const shortDate = `${MONTHS[date.getUTCMonth()]} ${date.getUTCDate()}`;

  if (status === "done") return { label: shortDate, tone: "done" };

  const days = daysFromToday(iso, today);

  if (days < 0) return { label: `${-days}d overdue`, tone: "overdue" };
  if (days === 0) return { label: "Today", tone: "soon" };
  if (days === 1) return { label: "Tomorrow", tone: "soon" };
  if (days === 2) return { label: WEEKDAYS[date.getUTCDay()], tone: "soon" };
  if (days < 7) return { label: WEEKDAYS[date.getUTCDay()], tone: "normal" };
  return { label: shortDate, tone: "normal" };
}

/** True for open tasks that are overdue or due within two days. */
export function isDueSoon(
  iso: string | null,
  status: TaskStatus,
  today: string = MOCK_TODAY,
): boolean {
  const due = getDue(iso, status, today);
  return due?.tone === "overdue" || due?.tone === "soon";
}
