import {
  PanelSkeleton,
  Bone,
} from "@/features/workspace/components/workspace-skeleton";

export default function WorkspaceLoading() {
  return (
    <div
      role="status"
      aria-busy="true"
      aria-live="polite"
      className="mx-auto w-full max-w-7xl space-y-6 px-4 py-6 md:px-6 lg:py-8"
    >
      <span className="sr-only">Loading workspace…</span>

      {/* Header */}
      <div
        aria-hidden
        className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
      >
        <div className="space-y-3">
          <Bone className="h-4 w-56" />
          <Bone className="h-9 w-72 max-w-full" />
          <Bone className="h-4 w-96 max-w-full" />
        </div>
        <div className="flex gap-2">
          <Bone className="h-9 w-24" />
          <Bone className="h-9 w-28" />
        </div>
      </div>

      {/* Stats */}
      <div
        aria-hidden
        className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4"
      >
        {Array.from({ length: 4 }, (_, index) => (
          <div key={index} className="panel space-y-3 p-4">
            <Bone className="h-3.5 w-24" />
            <Bone className="h-10 w-14" />
            <Bone className="h-5 w-28" />
          </div>
        ))}
      </div>

      {/* Rooms */}
      <div aria-hidden className="space-y-3">
        <div className="flex items-center justify-between">
          <Bone className="h-5 w-32" />
          <Bone className="h-3.5 w-14" />
        </div>
        <div className="grid gap-3 md:grid-cols-3 lg:gap-4">
          {Array.from({ length: 3 }, (_, index) => (
            <div key={index} className="panel space-y-3 p-4">
              <Bone className="h-4 w-40" />
              <div className="space-y-1.5">
                <Bone className="h-3.5 w-full" />
                <Bone className="h-3.5 w-2/3" />
              </div>
              <div className="flex items-center justify-between">
                <Bone className="h-3 w-16" />
                <Bone className="h-3 w-10" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main column + inspector */}
      <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_var(--inspector-width)]">
        <div className="min-w-0 space-y-6">
          <PanelSkeleton rows={6} />
          <PanelSkeleton rows={5} />
        </div>
        <div className="min-w-0 space-y-6">
          <PanelSkeleton rows={5} />
          <PanelSkeleton rows={3} />
        </div>
      </div>
    </div>
  );
}
