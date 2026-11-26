import type { TaskStatus } from "./types";

/** Board column order. */
export const STATUS_ORDER: TaskStatus[] = ["todo", "in_progress", "done"];

export const STATUS_LABEL: Record<TaskStatus, string> = {
  todo: "To do",
  in_progress: "In progress",
  done: "Done",
};

export const STATUS_HINT: Record<TaskStatus, string> = {
  todo: "Not started yet",
  in_progress: "Someone is on it",
  done: "Finished and checked",
};
