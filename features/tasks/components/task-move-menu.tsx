"use client";

import { Check, Ellipsis } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useLayoutEffect, useRef, useState } from "react";

import { useDismiss } from "@/lib/hooks/use-dismiss";
import { cn } from "@/lib/utils";

import { STATUS_LABEL, STATUS_ORDER } from "../constants";
import { useTasksStore } from "../store";
import type { TaskStatus } from "../types";

/**
 * "Move to" menu on each card. Keyboard- and touch-friendly alternative to
 * dragging (drag and drop doesn't work on touch screens).
 */
export function TaskMoveMenu({
  taskId,
  title,
  status,
}: {
  taskId: string;
  title: string;
  status: TaskStatus;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const moveTask = useTasksStore((state) => state.moveTask);
  const close = useCallback(() => setOpen(false), []);

  useDismiss(open, rootRef, close);

  // Transient popover: closed whenever the screen is hidden/re-shown.
  useLayoutEffect(() => {
    return () => setOpen(false);
  }, []);

  return (
    <div ref={rootRef} className="relative z-10 shrink-0">
      <button
        type="button"
        aria-label={`Move “${title}”`}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="-mr-1 -mt-1 -mb-1 grid size-6 place-items-center rounded-md text-ink-meta transition-colors hover:bg-surface-nav hover:text-foreground aria-expanded:bg-surface-nav aria-expanded:text-foreground"
      >
        <Ellipsis className="size-4" aria-hidden />
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            role="menu"
            aria-label="Move to"
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.14 }}
            className="absolute right-0 top-[calc(100%+4px)] z-30 w-44 origin-top-right rounded-lg border border-border-strong bg-popover p-1 shadow-popover"
          >
            <p className="type-label-sm px-2.5 pb-1 pt-1.5 uppercase text-ink-meta">
              Move to
            </p>
            {STATUS_ORDER.map((target) => {
              const current = target === status;
              return (
                <button
                  key={target}
                  type="button"
                  role="menuitemradio"
                  aria-checked={current}
                  onClick={() => {
                    moveTask(taskId, target);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-left text-[13px] text-foreground transition-colors hover:bg-surface-nav",
                    current && "bg-surface-nav",
                  )}
                >
                  <span className="flex-1">{STATUS_LABEL[target]}</span>
                  {current ? (
                    <Check className="size-4 text-primary" aria-hidden />
                  ) : null}
                </button>
              );
            })}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
