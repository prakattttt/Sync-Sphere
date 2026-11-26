"use client";

import { motion } from "motion/react";

import { Avatar } from "@/components/ui/avatar";
import { easeOut } from "@/lib/motion";
import { cn } from "@/lib/utils";

import { members } from "@/features/workspace/data/mock";

import { useTasksStore } from "../store";
import type { TaskItem } from "../types";
import { DueChip } from "./due-chip";
import { TaskMoveMenu } from "./task-move-menu";

/**
 * Board card. The title button stretches over the whole card (click to edit);
 * the move menu sits above it. The inner div is natively draggable.
 */
export function TaskCard({ task }: { task: TaskItem }) {
  const openEdit = useTasksStore((state) => state.openEdit);
  const setDragging = useTasksStore((state) => state.setDragging);
  const isDragging = useTasksStore((state) => state.draggingId === task.id);

  const assignee = members.find((member) => member.id === task.assigneeId);

  return (
    <motion.li
      layout="position"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.2, ease: easeOut }}
      className="relative has-[[aria-expanded=true]]:z-30"
    >
      <div
        draggable
        onDragStart={(event) => {
          event.dataTransfer.setData("text/plain", task.id);
          event.dataTransfer.effectAllowed = "move";
          setDragging(task.id);
        }}
        onDragEnd={() => setDragging(null)}
        className={cn(
          "panel group relative cursor-grab space-y-2.5 p-3 transition-colors hover:border-border-strong active:cursor-grabbing has-[h3_button:focus-visible]:border-primary",
          isDragging && "opacity-40",
        )}
      >
        <div className="flex items-start gap-2">
          <h3 className="min-w-0 flex-1 text-[13px] font-semibold leading-[18px] text-foreground">
            <button
              type="button"
              onClick={() => openEdit(task.id)}
              className="text-left outline-none after:absolute after:inset-0 after:content-['']"
            >
              {task.title}
            </button>
          </h3>
          <TaskMoveMenu taskId={task.id} title={task.title} status={task.status} />
        </div>

        {task.description ? (
          <p className="type-body-sm line-clamp-2 text-ink-body">
            {task.description}
          </p>
        ) : null}

        <div className="flex items-center gap-2">
          {task.roomSlug ? (
            <span className="type-label-sm min-w-0 truncate text-ink-meta">
              #{task.roomSlug}
            </span>
          ) : null}

          <div className="ml-auto flex shrink-0 items-center gap-2">
            <DueChip dueDate={task.dueDate} status={task.status} />
            {assignee ? (
              <span title={assignee.name}>
                <Avatar initials={assignee.initials} size="sm" />
                <span className="sr-only">Assigned to {assignee.name}</span>
              </span>
            ) : (
              <span
                title="Unassigned"
                className="grid size-6 place-items-center rounded-full border border-dashed border-control-border text-ink-meta"
              >
                <span className="sr-only">Unassigned</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.li>
  );
}
