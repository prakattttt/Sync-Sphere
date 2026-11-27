import type {
  activity,
  comment,
  document,
  message,
  notification,
  room,
  roomMember,
  task,
  workspace,
  workspaceInvitation,
  workspaceMember,
} from "./schemas";

/** Row types inferred from the schema (what a SELECT returns). */
export type WorkspaceRow = typeof workspace.$inferSelect;
export type WorkspaceMemberRow = typeof workspaceMember.$inferSelect;
export type WorkspaceInvitationRow = typeof workspaceInvitation.$inferSelect;
export type RoomRow = typeof room.$inferSelect;
export type RoomMemberRow = typeof roomMember.$inferSelect;
export type MessageRow = typeof message.$inferSelect;
export type TaskRow = typeof task.$inferSelect;
export type DocumentRow = typeof document.$inferSelect;
export type CommentRow = typeof comment.$inferSelect;
export type ActivityRow = typeof activity.$inferSelect;
export type NotificationRow = typeof notification.$inferSelect;

/** Insert types (what is passed to `db.insert(...).values(...)`). */
export type NewTask = typeof task.$inferInsert;
export type NewMessage = typeof message.$inferInsert;
export type NewRoom = typeof room.$inferInsert;
export type NewWorkspace = typeof workspace.$inferInsert;
