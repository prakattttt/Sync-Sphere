import { CalendarDays } from "lucide-react";

import { cn } from "@/lib/utils";

import { getDue, type DueTone } from "../lib/dates";
import type { TaskStatus } from "../types";

const TONE: Record<DueTone, string> = {
  overdue:
    "border-destructive/30 bg-destructive-container text-on-destructive-container",
  soon: "chip-accent",
  normal: "chip-neutral",
  done: "chip-neutral",
};

/** Due-date chip: ochre when due soon, red when overdue, neutral otherwise. */
export function DueChip({
  dueDate,
  status,
  className,
}: {
  dueDate: string | null;
  status: TaskStatus;
  className?: string;
}) {
  const due = getDue(dueDate, status);
  if (!due) return null;

  return (
    <span className={cn("chip", TONE[due.tone], className)}>
      <CalendarDays className="size-3" aria-hidden />
      {due.tone === "overdue" ? <span className="sr-only">Overdue: </span> : null}
      {due.label}
    </span>
  );
}
