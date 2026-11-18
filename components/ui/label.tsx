import { cn } from "@/lib/utils";

/**
 * Form label. Typography (12px JetBrains Mono, uppercase, tracked) comes from
 * the `label` rule in globals.css.
 */
export function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label className={cn("block text-ink-body", className)} {...props} />
  );
}
