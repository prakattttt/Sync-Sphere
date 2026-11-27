import { pgEnum } from "drizzle-orm/pg-core";

/** PROJECT.md: roles are `owner`, `admin` and `member`. */
export const workspaceRole = pgEnum("workspace_role", ["owner", "admin", "member"]);

export const invitationStatus = pgEnum("invitation_status", [
  "pending",
  "accepted",
  "revoked",
  "expired",
]);

/** Matches `TaskStatus` in the UI (components/ui/status-chip.tsx). */
export const taskStatus = pgEnum("task_status", ["todo", "in_progress", "done"]);

export const activityTargetType = pgEnum("activity_target_type", [
  "workspace",
  "room",
  "task",
  "document",
  "comment",
  "member",
]);

export const notificationType = pgEnum("notification_type", [
  "invitation",
  "task_assigned",
  "comment",
  "reply",
  "mention",
]);
