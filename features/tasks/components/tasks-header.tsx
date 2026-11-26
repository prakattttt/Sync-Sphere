"use client";

import { Plus } from "lucide-react";
import { motion } from "motion/react";

import { Button } from "@/components/ui/button";
import { StatusChip } from "@/components/ui/status-chip";
import { easeOut } from "@/lib/motion";

import { STATUS_ORDER } from "../constants";
import { useTasksStore } from "../store";

export function TasksHeader() {
  const tasks = useTasksStore((state) => state.tasks);
  const openCreate = useTasksStore((state) => state.openCreate);

  const total = tasks.length;
  const done = tasks.filter((task) => task.status === "done").length;
  const percent = total === 0 ? 0 : Math.round((done / total) * 100);

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <p className="type-label-sm uppercase text-ink-meta">
            Workspace / College Project / Tasks
          </p>
          <h1 className="type-headline-lg text-foreground">Tasks</h1>
          <p className="type-body-md max-w-xl text-ink-body">
            Plan and track the work. Drag cards between columns, or use the{" "}
            <span className="font-semibold text-foreground">⋯</span> menu on a
            card.
          </p>
        </div>
        <Button size="compact" onClick={() => openCreate("todo")} className="shrink-0">
          <Plus aria-hidden />
          New task
        </Button>
      </div>

      <section
        aria-label="Progress"
        className="panel flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:gap-6"
      >
        <div className="min-w-0 flex-1 space-y-2">
          <div className="flex items-baseline justify-between gap-3">
            <p className="type-label-md uppercase text-ink-meta">Progress</p>
            <p className="type-label-md text-foreground">
              {done} of {total} done · {percent}%
            </p>
          </div>
          <div
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={percent}
            aria-label="Tasks completed"
            className="h-1.5 overflow-hidden rounded-full bg-border"
          >
            <motion.div
              className="h-full rounded-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: `${percent}%` }}
              transition={{ duration: 0.6, ease: easeOut }}
            />
          </div>
        </div>

        <ul className="flex flex-wrap items-center gap-x-4 gap-y-2">
          {STATUS_ORDER.map((status) => (
            <li key={status} className="flex items-center gap-2">
              <StatusChip status={status} />
              <span className="type-label-md text-foreground">
                {tasks.filter((task) => task.status === status).length}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
