import { cn } from "@/lib/utils";

/** Multi-line input following the Input spec. */
export function Textarea({
  className,
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        "min-h-24 w-full resize-y rounded-md border border-input bg-card px-3 py-2.5 text-sm leading-5 text-foreground transition-colors",
        "placeholder:text-ink-meta disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive",
        className,
      )}
      {...props}
    />
  );
}
