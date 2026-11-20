"use client";

import { Check, ChevronsUpDown, Plus } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

import { workspaces } from "../data/mock";

/** Workspace picker with an animated popover. Selection is local demo state. */
export function WorkspaceSwitcher() {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState(workspaces[0].id);
  const rootRef = useRef<HTMLDivElement>(null);
  const active = workspaces.find((w) => w.id === activeId) ?? workspaces[0];

  // Transient popover: always closed when the screen is hidden/re-shown.
  useLayoutEffect(() => {
    return () => setOpen(false);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex w-full items-center gap-2.5 rounded-md border bg-card px-2.5 py-2 text-left transition-colors hover:bg-background"
      >
        <span className="type-label-md grid size-8 shrink-0 place-items-center rounded-md bg-primary text-primary-foreground">
          {active.initials}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[13px] font-semibold leading-4 text-foreground">
            {active.name}
          </span>
          <span className="type-label-sm block uppercase text-ink-meta">
            {active.role} · {active.members} members
          </span>
        </span>
        <ChevronsUpDown className="size-4 shrink-0 text-ink-meta" aria-hidden />
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            role="listbox"
            aria-label="Switch workspace"
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.14 }}
            className="absolute inset-x-0 top-[calc(100%+6px)] z-30 origin-top rounded-lg border border-border-strong bg-popover p-1 shadow-popover"
          >
            <p className="type-label-sm px-2.5 pb-1 pt-1.5 uppercase text-ink-meta">
              Workspaces
            </p>
            {workspaces.map((workspace) => {
              const selected = workspace.id === activeId;
              return (
                <button
                  key={workspace.id}
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => {
                    setActiveId(workspace.id);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center gap-2.5 rounded-md px-2.5 py-1.5 text-left transition-colors hover:bg-surface-nav",
                    selected && "bg-surface-nav",
                  )}
                >
                  <span className="type-label-sm grid size-6 shrink-0 place-items-center rounded-sm border bg-card text-ink-body">
                    {workspace.initials}
                  </span>
                  <span className="flex-1 truncate text-[13px] text-foreground">
                    {workspace.name}
                  </span>
                  {selected ? (
                    <Check className="size-4 text-primary" aria-hidden />
                  ) : null}
                </button>
              );
            })}
            <div className="my-1 border-t" />
            <button
              type="button"
              className="flex w-full items-center gap-2.5 rounded-md px-2.5 py-1.5 text-left text-[13px] text-ink-body transition-colors hover:bg-surface-nav"
            >
              <Plus className="size-4" aria-hidden />
              Create workspace
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
