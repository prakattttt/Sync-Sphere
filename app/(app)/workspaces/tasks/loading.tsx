import { cn } from "@/lib/utils";

/** Pulsing placeholder block. Animation is skipped when reduced motion is on. */
function Bone({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("rounded-md bg-muted motion-safe:animate-pulse", className)}
    />
  );
}

function CardSkeleton() {
  return (
    <div className="panel space-y-2.5 p-3">
      <Bone className="h-4 w-4/5" />
      <Bone className="h-3.5 w-full" />
      <div className="flex items-center gap-2 pt-1">
        <Bone className="h-3 w-24" />
        <Bone className="ml-auto h-5 w-16" />
        <Bone className="size-6 rounded-full" />
      </div>
    </div>
  );
}

/** Loading UI for /workspaces/tasks. Mirrors header, progress, toolbar and board. */
export default function TasksLoading() {
  return (
    <div
      role="status"
      aria-busy="true"
      aria-live="polite"
      className="mx-auto w-full max-w-7xl space-y-6 px-4 py-6 md:px-6 lg:py-8"
    >
      <span className="sr-only">Loading tasks…</span>

      <div aria-hidden className="space-y-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-3">
            <Bone className="h-4 w-60" />
            <Bone className="h-9 w-32" />
            <Bone className="h-4 w-96 max-w-full" />
          </div>
          <Bone className="h-9 w-28" />
        </div>
        <div className="panel space-y-3 p-4">
          <div className="flex justify-between">
            <Bone className="h-3.5 w-20" />
            <Bone className="h-3.5 w-36" />
          </div>
          <Bone className="h-1.5 w-full rounded-full" />
        </div>
      </div>

      <div
        aria-hidden
        className="flex flex-col gap-3 lg:flex-row lg:items-center"
      >
        <Bone className="h-9 w-full lg:w-75" />
        <div className="flex gap-3">
          <Bone className="h-9 flex-1 sm:w-42.5 sm:flex-none" />
          <Bone className="h-9 flex-1 sm:w-47.5 sm:flex-none" />
        </div>
      </div>

      <div aria-hidden className="grid items-start gap-4 md:grid-cols-3">
        {[3, 3, 2].map((cards, column) => (
          <div
            key={column}
            className={cn(
              "space-y-2.5 rounded-lg border bg-surface-nav p-2.5",
              column > 0 && "max-md:hidden",
            )}
          >
            <div className="flex items-center gap-2 px-0.5 py-0.5">
              <Bone className="h-5 w-24" />
              <Bone className="h-4 w-4" />
            </div>
            {Array.from({ length: cards }, (_, index) => (
              <CardSkeleton key={index} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
