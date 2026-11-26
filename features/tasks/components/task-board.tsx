"use client";

import { SearchX } from "lucide-react";
import { motion } from "motion/react";
import { useId, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { STATUS_LABEL, STATUS_ORDER } from "../constants";
import { filterTasks } from "../lib/filter";
import { useTasksStore } from "../store";
import type { TaskStatus } from "../types";
import { TaskColumn } from "./task-column";

/**
 * Three-column board on tablet/desktop. On phones the columns collapse into
 * tabs so one column is shown at a time.
 */
export function TaskBoard() {
  const tabsId = useId();
  const [activeStatus, setActiveStatus] = useState<TaskStatus>("in_progress");

  const tasks = useTasksStore((state) => state.tasks);
  const filters = useTasksStore((state) => state.filters);
  const clearFilters = useTasksStore((state) => state.clearFilters);

  const visible = useMemo(() => filterTasks(tasks, filters), [tasks, filters]);

  const byStatus = useMemo(
    () =>
      Object.fromEntries(
        STATUS_ORDER.map((status) => [
          status,
          visible.filter((task) => task.status === status),
        ]),
      ) as Record<TaskStatus, typeof visible>,
    [visible],
  );

  if (tasks.length > 0 && visible.length === 0) {
    return (
      <div className="panel flex flex-col items-center gap-3 px-6 py-14 text-center">
        <span className="grid size-10 place-items-center rounded-md border bg-surface-nav text-brand-secondary">
          <SearchX className="size-5" aria-hidden />
        </span>
        <div className="space-y-1">
          <p className="type-headline-sm text-foreground">No tasks match</p>
          <p className="type-body-md text-ink-body">
            Try a different search, or clear the filters to see everything.
          </p>
        </div>
        <Button variant="secondary" size="compact" onClick={clearFilters}>
          Clear filters
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Phone tabs */}
      <div
        role="tablist"
        aria-label="Task status"
        className="grid grid-cols-3 gap-1 rounded-lg border bg-surface-nav p-1 md:hidden"
      >
        {STATUS_ORDER.map((status) => {
          const selected = activeStatus === status;
          return (
            <button
              key={status}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setActiveStatus(status)}
              className={cn(
                "type-label-md relative rounded-md px-2 py-2 transition-colors",
                selected ? "text-foreground" : "text-ink-meta",
              )}
            >
              {selected ? (
                <motion.span
                  layoutId={`${tabsId}-pill`}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0 rounded-md border bg-card"
                />
              ) : null}
              <span className="relative">
                {STATUS_LABEL[status]} · {byStatus[status].length}
              </span>
            </button>
          );
        })}
      </div>

      <div className="grid items-start gap-4 md:grid-cols-3">
        {STATUS_ORDER.map((status) => (
          <TaskColumn
            key={status}
            status={status}
            tasks={byStatus[status]}
            active={activeStatus === status}
          />
        ))}
      </div>
    </div>
  );
}
