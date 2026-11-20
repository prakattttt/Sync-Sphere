import { cn } from "@/lib/utils";

/** Pulsing placeholder block. Animation is skipped when reduced motion is on. */
export function Bone({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("rounded-md bg-muted motion-safe:animate-pulse", className)}
    />
  );
}

/** Card shell matching `.panel` + `.panel-header` so sizes line up with the real page. */
export function PanelSkeleton({
  rows,
  className,
}: {
  rows: number;
  className?: string;
}) {
  return (
    <div aria-hidden className={cn("panel overflow-hidden", className)}>
      <div className="panel-header flex min-h-13 items-center justify-between gap-3">
        <Bone className="h-5 w-28" />
        <Bone className="h-4 w-16" />
      </div>
      <div className="divide-y">
        {Array.from({ length: rows }, (_, index) => (
          <div key={index} className="flex items-center gap-3 px-4 py-2.5">
            <Bone className="size-8 shrink-0 rounded-full" />
            <div className="flex-1 space-y-1.5">
              <Bone className="h-3.5 w-2/5" />
              <Bone className="h-3 w-3/5" />
            </div>
            <Bone className="hidden h-4 w-14 sm:block" />
          </div>
        ))}
      </div>
    </div>
  );
}
