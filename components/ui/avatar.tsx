import { cn } from "@/lib/utils";

const sizes = {
  sm: "size-6 text-[10px]",
  md: "size-8 text-[11px]",
  lg: "size-10 text-xs",
} as const;

type AvatarProps = {
  initials: string;
  size?: keyof typeof sizes;
  /** When defined, shows a presence dot (true = online). */
  online?: boolean;
  /** Colour behind the presence dot's ring; match the surface the avatar sits on. */
  className?: string;
};

/** Initials avatar. Circles are reserved for avatars and status dots. */
export function Avatar({ initials, size = "md", online, className }: AvatarProps) {
  return (
    <span
      className={cn(
        "relative inline-grid shrink-0 place-items-center rounded-full border border-chip-brand-border bg-chip-brand-bg font-mono font-medium text-chip-brand-text [--dot-ring:var(--card)]",
        sizes[size],
        className,
      )}
    >
      {initials}
      {online !== undefined ? (
        <>
          <span
            aria-hidden
            className={cn(
              "absolute -right-0.5 -bottom-0.5 size-2.5 rounded-full border-2 border-(--dot-ring)",
              online ? "bg-primary" : "bg-control-border",
            )}
          />
          <span className="sr-only">{online ? "online" : "offline"}</span>
        </>
      ) : null}
    </span>
  );
}
