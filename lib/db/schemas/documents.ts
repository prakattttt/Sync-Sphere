import { sql } from "drizzle-orm";
import {
  type AnyPgColumn,
  check,
  index,
  pgTable,
  text,
  uuid,
} from "drizzle-orm/pg-core";

import { user } from "./auth";
import { createdAt, pk, tstz, updatedAt } from "./helpers";
import { workspace } from "./workspaces";

/**
 * Shared document. MVP: plain `content` saved explicitly. When Yjs arrives
 * (PROJECT.md Phase 5) add a `bytea` snapshot column and a revisions table.
 */
export const document = pgTable(
  "document",
  {
    id: pk(),
    workspaceId: uuid("workspace_id")
      .notNull()
      .references(() => workspace.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    content: text("content").notNull().default(""),
    createdById: text("created_by_id").references(() => user.id, {
      onDelete: "set null",
    }),
    updatedById: text("updated_by_id").references(() => user.id, {
      onDelete: "set null",
    }),
    createdAt: createdAt(),
    updatedAt: updatedAt(),
  },
  (t) => [
    index("document_workspace_updated_idx").on(t.workspaceId, t.updatedAt.desc()),
    check("document_title_length", sql`char_length(${t.title}) between 1 and 200`),
  ],
);

/** Comment on a document. `parentId` makes it a reply (one level is enough for the MVP). */
export const comment = pgTable(
  "comment",
  {
    id: pk(),
    documentId: uuid("document_id")
      .notNull()
      .references(() => document.id, { onDelete: "cascade" }),
    authorId: text("author_id").references(() => user.id, { onDelete: "set null" }),
    parentId: uuid("parent_id").references((): AnyPgColumn => comment.id, {
      onDelete: "cascade",
    }),
    content: text("content").notNull(),
    createdAt: createdAt(),
    updatedAt: updatedAt(),
    deletedAt: tstz("deleted_at"),
  },
  (t) => [
    index("comment_document_created_idx").on(t.documentId, t.createdAt),
    index("comment_parent_idx").on(t.parentId),
    check("comment_content_length", sql`char_length(${t.content}) between 1 and 2000`),
  ],
);
