import type { TaskStatus } from "@/components/ui/status-chip";

export type { TaskStatus };

/**
 * A task as shown on the board (PROJECT.md: title, optional description,
 * assignee, status, optional due date, optional room).
 */
export type TaskItem = {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  /** Workspace member id, or null when unassigned. */
  assigneeId: string | null;
  /** Room slug, or null when the task is not tied to a room. */
  roomSlug: string | null;
  /** ISO calendar date (YYYY-MM-DD), or null when there is no due date. */
  dueDate: string | null;
};

export type TaskInput = Omit<TaskItem, "id">;

export type TaskFilters = {
  query: string;
  /** "all", "unassigned", or a member id. */
  assignee: string;
  /** "all", "none" (no room), or a room slug. */
  room: string;
};

/** Which task dialog is showing, if any. */
export type TaskDialogState =
  | { mode: "closed" }
  | { mode: "create"; status: TaskStatus }
  | { mode: "edit"; taskId: string };
