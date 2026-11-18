import { APP_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";

type LogoProps = {
  showWordmark?: boolean;
  className?: string;
};

export function Logo({ showWordmark = true, className }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg
        viewBox="0 0 24 24"
        className="size-7 shrink-0"
        fill="none"
        aria-hidden
      >
        <rect
          x="3.75"
          y="3.75"
          width="11.5"
          height="11.5"
          rx="2"
          className="stroke-brand-secondary"
          strokeWidth="1.5"
        />
        <rect
          x="9"
          y="9"
          width="12"
          height="12"
          rx="2"
          className="fill-primary stroke-background"
          strokeWidth="1.5"
        />
      </svg>
      {showWordmark ? (
        <span className="type-headline-sm tracking-tight text-foreground">
          {APP_NAME}
        </span>
      ) : (
        <span className="sr-only">{APP_NAME}</span>
      )}
    </span>
  );
}
