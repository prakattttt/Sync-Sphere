import { sql } from "drizzle-orm";
import { check, date, index, pgTable, text, uuid } from "drizzle-orm/pg-core";

import { user } from "./auth";
import { taskStatus } from "./enums";
import { createdAt, pk, updatedAt } from "./helpers";
import { room } from "./rooms";
import { workspace } from "./workspaces";

/**
 * Board task. Fields mirror `TaskItem` in features/tasks/types.ts, so the
 * UI types barely change when mock data is replaced.
 *
 * Board order: query `ORDER BY updated_at DESC`. Moving a card (or editing it)
 * bumps `updated_at`, which matches the "moved card goes to the top" behaviour.
 *
 * NOTE: the database can't check that `assignee_id` is a member of the
 * workspace, or that `room_id` belongs to the same workspace. Enforce both in
 * the server action that creates/updates a task.
 */
export const task = pgTable(
  "task",
  {
    id: pk(),
    workspaceId: uuid("workspace_id")
      .notNull()
      .references(() => workspace.id, { onDelete: "cascade" }),
    /** Optional link to a room. */
    roomId: uuid("room_id").references(() => room.id, { onDelete: "set null" }),
    title: text("title").notNull(),
    description: text("description").notNull().default(""),
    status: taskStatus("status").notNull().default("todo"),
    assigneeId: text("assignee_id").references(() => user.id, {
      onDelete: "set null",
    }),
    createdById: text("created_by_id").references(() => user.id, {
      onDelete: "set null",
    }),
    /** Calendar date as "YYYY-MM-DD" (same as the UI's `dueDate`). */
    dueDate: date("due_date", { mode: "string" }),
    createdAt: createdAt(),
    updatedAt: updatedAt(),
  },
  (t) => [
    index("task_workspace_status_idx").on(t.workspaceId, t.status),
    index("task_assignee_idx").on(t.assigneeId),
    index("task_room_idx").on(t.roomId),
    check("task_title_length", sql`char_length(${t.title}) between 1 and 120`),
    check("task_description_length", sql`char_length(${t.description}) <= 1000`),
  ],
);
