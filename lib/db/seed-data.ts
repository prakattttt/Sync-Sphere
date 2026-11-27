/**
 * Demo data for a "College Project" workspace, taken from the UI mock data
 * (the mock.ts files under features/). Used to check the schema end to end and to make
 * the real UI look the same as the mock one.
 */
import { createHash } from "node:crypto";

import type { PgDatabase } from "drizzle-orm/pg-core";

import * as schema from "./schemas";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SeedDb = PgDatabase<any, typeof schema>;

/** Stable UUID derived from a name, so re-running the seed doesn't duplicate rows. */
function uid(name: string): string {
  const h = createHash("sha1").update(`syncspace-seed:${name}`).digest("hex");
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-5${h.slice(13, 16)}-a${h.slice(17, 20)}-${h.slice(20, 32)}`;
}

const minutesAgo = (n: number) => new Date(Date.now() - n * 60_000);

export type SeedSummary = Record<string, number>;

/** `owner` must already exist in the `user` table (register through Better Auth first). */
export async function seedDemoWorkspace(
  db: SeedDb,
  owner: { id: string },
): Promise<SeedSummary> {
  const s = schema;

  // ---- Teammates (no password/account: they can't sign in, they just fill the UI) ----
  const mates = [
    {
      id: "seed-anita",
      name: "Anita Maharjan",
      email: "anita@seed.syncspace.dev",
    },
    {
      id: "seed-rohan",
      name: "Rohan Karki",
      email: "rohan@seed.syncspace.dev",
    },
    { id: "seed-sita", name: "Sita Paudel", email: "sita@seed.syncspace.dev" },
    { id: "seed-dev", name: "Dev Thapa", email: "dev@seed.syncspace.dev" },
  ];
  await db
    .insert(s.user)
    .values(mates.map((m) => ({ ...m, emailVerified: true })))
    .onConflictDoNothing();

  const anita = "seed-anita";
  const rohan = "seed-rohan";
  const sita = "seed-sita";
  const dev = "seed-dev";

  // ---- Workspace + members ----
  const workspaceId = uid("workspace:college-project");
  await db
    .insert(s.workspace)
    .values({
      id: workspaceId,
      name: "College Project",
      slug: "college-project",
      description: "Rooms, tasks and docs for the semester project.",
      ownerId: owner.id,
    })
    .onConflictDoNothing();

  await db
    .insert(s.workspaceMember)
    .values([
      {
        id: uid("member:owner"),
        workspaceId,
        userId: owner.id,
        role: "owner" as const,
      },
      {
        id: uid("member:anita"),
        workspaceId,
        userId: anita,
        role: "admin" as const,
      },
      {
        id: uid("member:rohan"),
        workspaceId,
        userId: rohan,
        role: "member" as const,
      },
      {
        id: uid("member:sita"),
        workspaceId,
        userId: sita,
        role: "member" as const,
      },
      {
        id: uid("member:dev"),
        workspaceId,
        userId: dev,
        role: "member" as const,
      },
    ])
    .onConflictDoNothing();

  // ---- Rooms ----
  const general = uid("room:general");
  const backend = uid("room:backend-development");
  const frontend = uid("room:frontend-development");
  await db
    .insert(s.room)
    .values([
      {
        id: general,
        workspaceId,
        name: "general",
        slug: "general",
        topic: "Everything else",
        createdById: owner.id,
      },
      {
        id: backend,
        workspaceId,
        name: "backend-development",
        slug: "backend-development",
        topic: "API, database and realtime",
        createdById: owner.id,
      },
      {
        id: frontend,
        workspaceId,
        name: "frontend-development",
        slug: "frontend-development",
        topic: "UI and design system",
        createdById: owner.id,
      },
    ])
    .onConflictDoNothing();

  // Everyone joins every public room. The owner has read general and frontend
  // but not the latest backend messages, so the sidebar shows an unread badge.
  const everyone = [owner.id, anita, rohan, sita, dev];
  await db
    .insert(s.roomMember)
    .values(
      [general, backend, frontend].flatMap((roomId) =>
        everyone.map((userId) => ({
          roomId,
          userId,
          lastReadAt:
            userId === owner.id && roomId === backend
              ? minutesAgo(180)
              : minutesAgo(1),
        })),
      ),
    )
    .onConflictDoNothing();

  // ---- Messages ----
  await db
    .insert(s.message)
    .values([
      {
        id: uid("msg:1"),
        roomId: backend,
        senderId: anita,
        content: "Schema draft is up. Can someone review the membership table?",
        createdAt: minutesAgo(130),
      },
      {
        id: uid("msg:2"),
        roomId: backend,
        senderId: rohan,
        content: "On it. Moving the auth task to in progress.",
        createdAt: minutesAgo(125),
      },
      {
        id: uid("msg:3"),
        roomId: backend,
        senderId: anita,
        content: "Thanks! Also, should invitations expire after 7 days?",
        createdAt: minutesAgo(100),
      },
      {
        id: uid("msg:4"),
        roomId: general,
        senderId: sita,
        content: "Lunch call moved to 1:30, same link.",
        createdAt: minutesAgo(20),
      },
      {
        id: uid("msg:5"),
        roomId: frontend,
        senderId: rohan,
        content: "Login and register screens are merged.",
        createdAt: minutesAgo(1500),
      },
    ])
    .onConflictDoNothing();

  // ---- Tasks (same 10 as the board mock) ----
  const T = (n: string) => uid(`task:${n}`);
  await db
    .insert(s.task)
    .values([
      {
        id: T("t1"),
        workspaceId,
        roomId: backend,
        title: "Implement authentication",
        description:
          "Email sign in plus Google and GitHub. The session cookie must also be readable by the realtime server.",
        status: "in_progress" as const,
        assigneeId: owner.id,
        createdById: owner.id,
        dueDate: "2026-11-21",
      },
      {
        id: T("t2"),
        workspaceId,
        roomId: backend,
        title: "Design database schema",
        description:
          "Users, workspaces, memberships, rooms and messages. Add indexes for the common lookups.",
        status: "in_progress" as const,
        assigneeId: anita,
        createdById: owner.id,
        dueDate: "2026-11-19",
      },
      {
        id: T("t3"),
        workspaceId,
        roomId: frontend,
        title: "Build workspace home screen",
        description: "Sidebar, stats, room cards, tasks, activity and members.",
        status: "in_progress" as const,
        assigneeId: owner.id,
        createdById: owner.id,
        dueDate: "2026-11-23",
      },
      {
        id: T("t4"),
        workspaceId,
        roomId: frontend,
        title: "Build tasks board UI",
        description: "Three columns, filters, and a create/edit dialog.",
        status: "todo" as const,
        assigneeId: owner.id,
        createdById: owner.id,
        dueDate: "2026-11-25",
      },
      {
        id: T("t5"),
        workspaceId,
        roomId: general,
        title: "Write API documentation",
        description: "",
        status: "todo" as const,
        assigneeId: sita,
        createdById: anita,
        dueDate: "2026-11-27",
      },
      {
        id: T("t6"),
        workspaceId,
        roomId: backend,
        title: "Set up Docker Compose for Postgres",
        description: "Local database with a named volume and a health check.",
        status: "todo" as const,
        assigneeId: rohan,
        createdById: anita,
        dueDate: "2026-11-26",
      },
      {
        id: T("t10"),
        workspaceId,
        roomId: backend,
        title: "Plan Socket.IO event names",
        description: "Agree on the room, message and presence event contract.",
        status: "todo" as const,
        assigneeId: null,
        createdById: anita,
        dueDate: null,
      },
      {
        id: T("t7"),
        workspaceId,
        roomId: frontend,
        title: "Choose colour palette",
        description: "",
        status: "done" as const,
        assigneeId: owner.id,
        createdById: owner.id,
        dueDate: "2026-11-17",
      },
      {
        id: T("t8"),
        workspaceId,
        roomId: general,
        title: "Define roles and permissions",
        description: "Owner, admin and member, enforced on the server.",
        status: "done" as const,
        assigneeId: anita,
        createdById: owner.id,
        dueDate: "2026-11-16",
      },
      {
        id: T("t9"),
        workspaceId,
        roomId: null,
        title: "Draft project requirements",
        description: "",
        status: "done" as const,
        assigneeId: sita,
        createdById: owner.id,
        dueDate: null,
      },
    ])
    .onConflictDoNothing();

  // ---- Documents + comments ----
  const docReq = uid("doc:requirements");
  const docApi = uid("doc:api");
  const docSchema = uid("doc:schema");
  await db
    .insert(s.document)
    .values([
      {
        id: docReq,
        workspaceId,
        title: "Project Requirements",
        content:
          "# Project requirements\n\nA small team workspace with rooms, tasks and documents.",
        createdById: owner.id,
        updatedById: anita,
      },
      {
        id: docApi,
        workspaceId,
        title: "API Documentation",
        content: "# API\n\nDraft.",
        createdById: sita,
        updatedById: sita,
      },
      {
        id: docSchema,
        workspaceId,
        title: "Database Schema Notes",
        content: "# Schema notes\n\nWorkspaces own rooms, tasks and documents.",
        createdById: anita,
        updatedById: rohan,
      },
    ])
    .onConflictDoNothing();

  const c1 = uid("comment:1");
  await db
    .insert(s.comment)
    .values([
      {
        id: c1,
        documentId: docReq,
        authorId: anita,
        content: "Should private rooms be in the MVP?",
        createdAt: minutesAgo(90),
      },
      {
        id: uid("comment:2"),
        documentId: docReq,
        authorId: owner.id,
        parentId: c1,
        content: "Yes, but only as an `is_private` flag for now.",
        createdAt: minutesAgo(80),
      },
    ])
    .onConflictDoNothing();

  // ---- Activity + a notification ----
  await db
    .insert(s.activity)
    .values([
      {
        id: uid("act:1"),
        workspaceId,
        actorId: rohan,
        action: "task.status_changed" as const,
        targetType: "task" as const,
        targetId: T("t1"),
        targetLabel: "Implement authentication",
        metadata: { from: "todo", to: "in_progress" },
        createdAt: minutesAgo(45),
      },
      {
        id: uid("act:2"),
        workspaceId,
        actorId: anita,
        action: "comment.created" as const,
        targetType: "document" as const,
        targetId: docReq,
        targetLabel: "Project Requirements",
        createdAt: minutesAgo(58),
      },
      {
        id: uid("act:3"),
        workspaceId,
        actorId: sita,
        action: "document.created" as const,
        targetType: "document" as const,
        targetId: docApi,
        targetLabel: "API Documentation",
        createdAt: minutesAgo(95),
      },
      {
        id: uid("act:4"),
        workspaceId,
        actorId: owner.id,
        action: "room.created" as const,
        targetType: "room" as const,
        targetId: frontend,
        targetLabel: "#frontend-development",
        createdAt: minutesAgo(1600),
      },
      {
        id: uid("act:5"),
        workspaceId,
        actorId: owner.id,
        action: "task.assigned" as const,
        targetType: "task" as const,
        targetId: T("t2"),
        targetLabel: "Design database schema",
        metadata: { assigneeId: anita },
        createdAt: minutesAgo(1700),
      },
    ])
    .onConflictDoNothing();

  await db
    .insert(s.notification)
    .values({
      id: uid("notif:1"),
      recipientId: owner.id,
      workspaceId,
      type: "task_assigned" as const,
      payload: {
        taskId: T("t4"),
        title: "Build tasks board UI",
        by: "Anita Maharjan",
      },
    })
    .onConflictDoNothing();

  return {
    users: mates.length,
    members: 5,
    rooms: 3,
    messages: 5,
    tasks: 10,
    documents: 3,
    comments: 2,
    activity: 5,
  };
}
