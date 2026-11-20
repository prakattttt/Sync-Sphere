"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useId, useLayoutEffect, useState } from "react";

import { Panel } from "@/components/ui/panel";
import { StatusChip, type TaskStatus } from "@/components/ui/status-chip";
import { ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";

import { tasks } from "../data/mock";

type Filter = "all" | TaskStatus;

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "in_progress", label: "In progress" },
  { id: "todo", label: "Todo" },
  { id: "done", label: "Done" },
];

export function MyTasks() {
  const [filter, setFilter] = useState<Filter>("all");
  const tabsId = useId();

  // Filter is view state, not something to keep across navigations.
  useLayoutEffect(() => {
    return () => setFilter("all");
  }, []);

  const visible = tasks.filter((task) => filter === "all" || task.status === filter);

  return (
    <Panel
      title="My tasks"
      meta={String(tasks.length)}
      action={
        <Link
          href={ROUTES.tasks}
          className="type-label-md text-chip-brand-text underline-offset-4 hover:underline"
        >
          View board
        </Link>
      }
    >
      <div
        role="tablist"
        aria-label="Filter tasks"
        className="flex gap-1 overflow-x-auto border-b px-3 pt-2"
      >
        {FILTERS.map(({ id, label }) => {
          const selected = filter === id;
          return (
            <button
              key={id}
              type="button"
              role="tab"
              id={`${tabsId}-${id}`}
              aria-selected={selected}
              aria-controls={`${tabsId}-panel`}
              onClick={() => setFilter(id)}
              className={cn(
                "type-label-md relative whitespace-nowrap rounded-t-md px-3 py-2 transition-colors",
                selected ? "text-foreground" : "text-ink-meta hover:text-foreground",
              )}
            >
              {label}
              {selected ? (
                <motion.span
                  layoutId={`${tabsId}-underline`}
                  className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-primary"
                />
              ) : null}
            </button>
          );
        })}
      </div>

      <ul
        role="tabpanel"
        id={`${tabsId}-panel`}
        aria-labelledby={`${tabsId}-${filter}`}
        className="divide-y"
      >
        <AnimatePresence initial={false} mode="popLayout">
          {visible.map((task) => (
            <motion.li
              key={task.id}
              layout
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="grid grid-cols-[1fr_auto] items-center gap-x-3 gap-y-1.5 px-4 py-3 transition-colors hover:bg-background sm:flex"
            >
              <StatusChip
                status={task.status}
                className="w-22 shrink-0 justify-center justify-self-start"
              />
              <span
                className={cn(
                  "order-first col-span-2 min-w-0 truncate text-sm sm:order-0 sm:flex-1",
                  task.status === "done" ? "text-ink-meta line-through" : "text-foreground",
                )}
              >
                {task.title}
              </span>
              <span className="type-label-sm hidden text-ink-meta sm:inline">
                #{task.room}
              </span>
              <span
                className={cn(
                  "type-label-sm w-17 shrink-0 text-right",
                  task.dueSoon ? "text-chip-accent-text" : "text-ink-meta",
                )}
              >
                {task.due}
              </span>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </Panel>
  );
}
