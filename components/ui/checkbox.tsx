import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

type CheckboxProps = Omit<React.ComponentProps<"input">, "type">;

/**
 * Native checkbox (works with react-hook-form `register`) styled per the
 * design system: 2px radius, #94A3B8 border, solid brand fill when checked.
 */
export function Checkbox({ className, ...props }: CheckboxProps) {
  return (
    <span className="relative mt-px inline-flex size-4 shrink-0">
      <input
        type="checkbox"
        className={cn(
          "peer size-4 cursor-pointer appearance-none rounded-sm border border-control-border bg-card transition-colors",
          "checked:border-primary checked:bg-primary aria-invalid:border-destructive disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...props}
      />
      <Check
        aria-hidden
        strokeWidth={3}
        className="pointer-events-none absolute inset-0 m-auto size-3 scale-50 text-primary-foreground opacity-0 transition duration-150 peer-checked:scale-100 peer-checked:opacity-100"
      />
    </span>
  );
}
