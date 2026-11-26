import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Native `<select>` styled like Input. Native keeps keyboard, screen reader
 * and mobile pickers working.
 */
export function Select({
  className,
  children,
  ...props
}: React.ComponentProps<"select">) {
  return (
    <div className="relative">
      <select
        className={cn(
          "h-10.5 w-full appearance-none rounded-md border border-input bg-card pl-3 pr-9 text-sm text-foreground transition-colors dark:scheme-dark",
          "disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive",
          className,
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown
        aria-hidden
        className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-ink-meta"
      />
    </div>
  );
}
