"use client";

import { Plus } from "lucide-react";
import { AnimatePresence } from "motion/react";
import { useId, useState } from "react";

import { StatusChip } from "@/components/ui/status-chip";
import { cn } from "@/lib/utils";

import { STATUS_HINT, STATUS_LABEL } from "../constants";
import { useTasksStore } from "../store";
import type { TaskItem, TaskStatus } from "../types";
import { TaskCard } from "./task-card";

type TaskColumnProps = {
  status: TaskStatus;
  tasks: TaskItem[];
  /** On phones only the active column is shown; desktop shows all three. */
  active: boolean;
};

/** One status column. Also a drop target for dragged cards. */
export function TaskColumn({ status, tasks, active }: TaskColumnProps) {
  const headingId = useId();
  const [over, setOver] = useState(false);

  const moveTask = useTasksStore((state) => state.moveTask);
  const openCreate = useTasksStore((state) => state.openCreate);
  const setDragging = useTasksStore((state) => state.setDragging);
  const draggingId = useTasksStore((state) => state.draggingId);
  const canDrop = useTasksStore((state) => {
    const dragged = state.tasks.find((task) => task.id === state.draggingId);
    return dragged !== undefined && dragged.status !== status;
  });

  const highlight = over && canDrop;

  return (
    <section
      aria-labelledby={headingId}
      onDragOver={(event) => {
        if (draggingId) event.preventDefault();
      }}
      onDragEnter={() => setOver(true)}
      onDragLeave={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setOver(false);
        }
      }}
      onDrop={(event) => {
        event.preventDefault();
        const id = event.dataTransfer.getData("text/plain") || draggingId;
        if (id) moveTask(id, status);
        setOver(false);
        setDragging(null);
      }}
      className={cn(
        "flex min-w-0 flex-col rounded-lg border bg-surface-nav transition-colors",
        highlight && "border-primary bg-chip-brand-bg",
        !active && "max-md:hidden",
      )}
    >
      <header className="flex items-center gap-2 px-3 py-2.5">
        <h2 id={headingId} className="sr-only">
          {STATUS_LABEL[status]}
        </h2>
        <StatusChip status={status} />
        <span
          className="type-label-md text-ink-meta"
          aria-label={`${tasks.length} tasks`}
        >
          {tasks.length}
        </span>
        <span className="type-body-sm hidden truncate text-ink-meta xl:inline">
          {STATUS_HINT[status]}
        </span>
        <button
          type="button"
          onClick={() => openCreate(status)}
          aria-label={`Add task to ${STATUS_LABEL[status]}`}
          className="-mr-1 ml-auto grid size-7 place-items-center rounded-md text-ink-meta transition-colors hover:bg-background hover:text-foreground"
        >
          <Plus className="size-4" aria-hidden />
        </button>
      </header>

      <div className="flex-1 px-2.5 pb-2.5">
        {tasks.length > 0 ? (
          <ul className="flex flex-col gap-2.5">
            <AnimatePresence initial={false}>
              {tasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </AnimatePresence>
          </ul>
        ) : (
          <button
            type="button"
            onClick={() => openCreate(status)}
            className="type-body-sm flex min-h-24 w-full flex-col items-center justify-center gap-1 rounded-md border border-dashed border-control-border text-ink-meta transition-colors hover:bg-background hover:text-foreground"
          >
            <span>No tasks here</span>
            <span className="type-label-sm uppercase">Drop a card or add one</span>
          </button>
        )}
      </div>
    </section>
  );
}
