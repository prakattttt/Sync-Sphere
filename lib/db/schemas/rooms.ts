import { sql } from "drizzle-orm";
import {
  boolean,
  check,
  index,
  pgTable,
  primaryKey,
  text,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

import { user } from "./auth";
import { createdAt, pk, tstz, updatedAt } from "./helpers";
import { workspace } from "./workspaces";

/**
 * A focused communication space inside a workspace (PROJECT.md section 3).
 * The UI addresses rooms by slug: /workspaces/rooms/[slug].
 */
export const room = pgTable(
  "room",
  {
    id: pk(),
    workspaceId: uuid("workspace_id")
      .notNull()
      .references(() => workspace.id, { onDelete: "cascade" }),
    /** Display name, e.g. "backend-development". */
    name: text("name").notNull(),
    /** Unique within the workspace; used in URLs. */
    slug: text("slug").notNull(),
    topic: text("topic"),
    /**
     * Public rooms: every workspace member may join.
     * Private rooms: only users with a `room_member` row may join.
     */
    isPrivate: boolean("is_private").notNull().default(false),
    createdById: text("created_by_id").references(() => user.id, {
      onDelete: "set null",
    }),
    archivedAt: tstz("archived_at"),
    createdAt: createdAt(),
    updatedAt: updatedAt(),
  },
  (t) => [
    uniqueIndex("room_workspace_slug_unique").on(t.workspaceId, t.slug),
    index("room_workspace_idx").on(t.workspaceId),
    check("room_slug_format", sql`${t.slug} ~ '^[a-z0-9]+(-[a-z0-9]+)*$'`),
    check("room_name_length", sql`char_length(${t.name}) between 1 and 80`),
  ],
);

/**
 * Per-user room state. A row exists once a user has joined a room.
 * `lastReadAt` powers the unread badges in the sidebar:
 *   unread = messages in the room with createdAt > lastReadAt.
 */
export const roomMember = pgTable(
  "room_member",
  {
    roomId: uuid("room_id")
      .notNull()
      .references(() => room.id, { onDelete: "cascade" }),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    joinedAt: tstz("joined_at").notNull().defaultNow(),
    lastReadAt: tstz("last_read_at").notNull().defaultNow(),
  },
  (t) => [
    primaryKey({ columns: [t.roomId, t.userId] }),
    index("room_member_user_idx").on(t.userId),
  ],
);
