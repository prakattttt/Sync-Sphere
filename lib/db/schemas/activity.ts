import { sql } from "drizzle-orm";
import { index, jsonb, pgTable, text, uuid } from "drizzle-orm/pg-core";

import { user } from "./auth";
import { activityTargetType, notificationType } from "./enums";
import { createdAt, pk, tstz } from "./helpers";
import { workspace } from "./workspaces";

/** Meaningful actions only. */
export type ActivityAction =
  | "workspace.created"
  | "member.joined"
  | "member.removed"
  | "room.created"
  | "room.archived"
  | "task.created"
  | "task.assigned"
  | "task.status_changed"
  | "task.completed"
  | "document.created"
  | "comment.created";

/** Workspace activity feed. Append-only. */
export const activity = pgTable(
  "activity",
  {
    id: pk(),
    workspaceId: uuid("workspace_id")
      .notNull()
      .references(() => workspace.id, { onDelete: "cascade" }),
    actorId: text("actor_id").references(() => user.id, { onDelete: "set null" }),
    /** Stored as text (not an enum) so new actions don't need a migration. */
    action: text("action").$type<ActivityAction>().notNull(),
    targetType: activityTargetType("target_type").notNull(),
    /** Id of the room/task/document/... (a uuid, or a user id for "member"). */
    targetId: text("target_id").notNull(),
    /** Name of the target at the time, so the feed still reads well after a delete. */
    targetLabel: text("target_label").notNull(),
    /** Extra context, e.g. { from: "todo", to: "in_progress", assigneeId }. */
    metadata: jsonb("metadata").$type<Record<string, unknown>>().notNull().default({}),
    createdAt: createdAt(),
  },
  (t) => [index("activity_workspace_created_idx").on(t.workspaceId, t.createdAt.desc())],
);

/** Persistent per-user notification */
export const notification = pgTable(
  "notification",
  {
    id: pk(),
    recipientId: text("recipient_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    workspaceId: uuid("workspace_id").references(() => workspace.id, {
      onDelete: "cascade",
    }),
    type: notificationType("type").notNull(),
    payload: jsonb("payload").$type<Record<string, unknown>>().notNull().default({}),
    /** NULL = unread. */
    readAt: tstz("read_at"),
    createdAt: createdAt(),
  },
  (t) => [
    index("notification_recipient_created_idx").on(t.recipientId, t.createdAt.desc()),
    // Small, fast index for the unread badge count.
    index("notification_recipient_unread_idx")
      .on(t.recipientId)
      .where(sql`${t.readAt} is null`),
  ],
);
