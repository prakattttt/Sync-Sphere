"use client";

import { useState } from "react";

import { Dialog } from "@/components/ui/dialog";

import { useTasksStore } from "../store";
import type { TaskDialogState, TaskItem } from "../types";
import { TaskForm } from "./task-form";

type Session = {
  source: Exclude<TaskDialogState, { mode: "closed" }>;
  task?: TaskItem;
};

/**
 * Create/edit dialog driven by the store. A snapshot of what was opened is
 * kept in `session` so the content stays stable while the exit animation runs
 * (the store goes back to "closed" immediately on close).
 */
export function TaskDialog() {
  const dialog = useTasksStore((state) => state.dialog);
  const tasks = useTasksStore((state) => state.tasks);
  const closeDialog = useTasksStore((state) => state.closeDialog);

  const [session, setSession] = useState<Session | null>(null);

  // Derived-state pattern: capture a new snapshot whenever a dialog is opened.
  if (dialog.mode !== "closed" && session?.source !== dialog) {
    setSession({
      source: dialog,
      task:
        dialog.mode === "edit"
          ? tasks.find((task) => task.id === dialog.taskId)
          : undefined,
    });
  }

  const editing = session?.source.mode === "edit";

  return (
    <Dialog
      open={dialog.mode !== "closed"}
      onClose={closeDialog}
      title={editing ? "Edit task" : "New task"}
      description={
        editing
          ? "Update the details, or move it to another column."
          : "Add a task to the board. Only the title is required."
      }
    >
      {session?.source.mode === "create" ? (
        <TaskForm
          key={`create-${session.source.status}`}
          mode="create"
          initialStatus={session.source.status}
        />
      ) : null}
      {session?.source.mode === "edit" && session.task ? (
        <TaskForm key={session.task.id} mode="edit" task={session.task} />
      ) : null}
    </Dialog>
  );
}
