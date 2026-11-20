import { cn } from "@/lib/utils";

export type TaskStatus = "todo" | "in_progress" | "done";

const STATUS: Record<TaskStatus, { label: string; className: string }> = {
  todo: { label: "todo", className: "chip-neutral" },
  in_progress: { label: "in_progress", className: "chip-accent" },
  done: { label: "done", className: "chip-brand" },
};

/** Task status chip */
export function StatusChip({
  status,
  className,
}: {
  status: TaskStatus;
  className?: string;
}) {
  const { label, className: tone } = STATUS[status];
  return <span className={cn("chip", tone, className)}>{label}</span>;
}
