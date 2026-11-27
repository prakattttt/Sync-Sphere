import { sql } from "drizzle-orm";
import { check, index, pgTable, text, uniqueIndex, uuid } from "drizzle-orm/pg-core";

import { user } from "./auth";
import { invitationStatus, workspaceRole } from "./enums";
import { createdAt, pk, tstz, updatedAt } from "./helpers";

/**
 * A workspace is the persistent home of a team (PROJECT.md section 3).
 * It owns members, rooms, tasks, documents and activity.
 */
export const workspace = pgTable(
  "workspace",
  {
    id: pk(),
    name: text("name").notNull(),
    /** URL-safe unique handle, e.g. "college-project". */
    slug: text("slug").notNull(),
    description: text("description"),
    /**
     * The creator. Also has a `workspace_member` row with role "owner"
     * (create both in one batch). RESTRICT: a user who owns a workspace
     * can't be deleted until ownership is transferred.
     */
    ownerId: text("owner_id")
      .notNull()
      .references(() => user.id, { onDelete: "restrict" }),
    /** Soft "archive" (PROJECT.md: create, rename and archive). */
    archivedAt: tstz("archived_at"),
    createdAt: createdAt(),
    updatedAt: updatedAt(),
  },
  (t) => [
    uniqueIndex("workspace_slug_unique").on(t.slug),
    index("workspace_owner_idx").on(t.ownerId),
    check("workspace_name_length", sql`char_length(${t.name}) between 1 and 80`),
    check("workspace_slug_format", sql`${t.slug} ~ '^[a-z0-9]+(-[a-z0-9]+)*$'`),
  ],
);

/** Who belongs to a workspace, and with which role. */
export const workspaceMember = pgTable(
  "workspace_member",
  {
    id: pk(),
    workspaceId: uuid("workspace_id")
      .notNull()
      .references(() => workspace.id, { onDelete: "cascade" }),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    role: workspaceRole("role").notNull().default("member"),
    joinedAt: tstz("joined_at").notNull().defaultNow(),
  },
  (t) => [
    // A user can only be a member of a workspace once.
    uniqueIndex("workspace_member_unique").on(t.workspaceId, t.userId),
    // "Which workspaces am I in?" (workspace switcher).
    index("workspace_member_user_idx").on(t.userId),
  ],
);

/**
 * Expiring invite links (PROJECT.md section B). Only the hash of the token is
 * stored; the raw token exists only in the link that is shown/sent once.
 */
export const workspaceInvitation = pgTable(
  "workspace_invitation",
  {
    id: pk(),
    workspaceId: uuid("workspace_id")
      .notNull()
      .references(() => workspace.id, { onDelete: "cascade" }),
    /** Optional: set when the invite is for a specific address. */
    email: text("email"),
    /** Role granted on acceptance. Never "owner". */
    role: workspaceRole("role").notNull().default("member"),
    tokenHash: text("token_hash").notNull(),
    status: invitationStatus("status").notNull().default("pending"),
    expiresAt: tstz("expires_at").notNull(),
    invitedById: text("invited_by_id").references(() => user.id, {
      onDelete: "set null",
    }),
    acceptedById: text("accepted_by_id").references(() => user.id, {
      onDelete: "set null",
    }),
    acceptedAt: tstz("accepted_at"),
    createdAt: createdAt(),
  },
  (t) => [
    uniqueIndex("workspace_invitation_token_unique").on(t.tokenHash),
    index("workspace_invitation_workspace_status_idx").on(t.workspaceId, t.status),
    check("workspace_invitation_role", sql`${t.role} <> 'owner'`),
  ],
);
