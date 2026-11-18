import { cn } from "@/lib/utils";

type InputProps = React.ComponentProps<"input">;

/**
 * Text input following the design system: white surface, 1px hairline,
 * brand border + ambient glow on focus (handled in globals.css base layer).
 * Set `aria-invalid` to show the error state.
 */
export function Input({ className, type = "text", ...props }: InputProps) {
  return (
    <input
      type={type}
      className={cn(
        "h-[42px] w-full rounded-md border border-input bg-card px-3 text-sm text-foreground transition-colors",
        "placeholder:text-ink-meta disabled:cursor-not-allowed disabled:opacity-50",
        "aria-invalid:border-destructive",
        className,
      )}
      {...props}
    />
  );
}
