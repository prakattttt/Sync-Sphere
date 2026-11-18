import { cn } from "@/lib/utils";

type DividerProps = {
  /** Optional centered label, rendered in JetBrains Mono. */
  label?: string;
  className?: string;
};

/** Hairline rule with an optional centered label. */
export function Divider({ label, className }: DividerProps) {
  if (!label) {
    return <hr className={cn("border-border", className)} />;
  }

  return (
    <div
      role="separator"
      aria-label={label}
      className={cn("flex items-center gap-3", className)}
    >
      <span className="h-px flex-1 bg-border" />
      <span className="type-label-sm uppercase text-ink-meta">{label}</span>
      <span className="h-px flex-1 bg-border" />
    </div>
  );
}
