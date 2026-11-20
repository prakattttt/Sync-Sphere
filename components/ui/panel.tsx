import { cn } from "@/lib/utils";

type PanelProps = {
  title: string;
  /** Small neutral chip next to the title, e.g. a count. */
  meta?: string;
  /** Right-aligned header control (link, button). */
  action?: React.ReactNode;
  className?: string;
  bodyClassName?: string;
  children: React.ReactNode;
};

export function Panel({
  title,
  meta,
  action,
  className,
  bodyClassName,
  children,
}: PanelProps) {
  return (
    <section className={cn("panel overflow-hidden", className)}>
      <header className="panel-header flex min-h-13 items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <h2 className="type-headline-sm truncate text-foreground">{title}</h2>
          {meta ? <span className="chip chip-neutral">{meta}</span> : null}
        </div>
        {action}
      </header>
      <div className={bodyClassName}>{children}</div>
    </section>
  );
}
