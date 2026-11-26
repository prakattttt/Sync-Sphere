/**
 * Demo tasks. Assignee ids match `members` and room slugs match `rooms` in
 * features/workspace/data/mock.ts. Replace with a server fetch later.
 */
import type { TaskItem } from "../types";

export const initialTasks: TaskItem[] = [
  {
    id: "t1",
    title: "Implement authentication",
    description:
      "Email sign in plus Google and GitHub. The session cookie must also be readable by the realtime server.",
    status: "in_progress",
    assigneeId: "m1",
    roomSlug: "backend-development",
    dueDate: "2026-11-21",
  },
  {
    id: "t2",
    title: "Design database schema",
    description:
      "Users, workspaces, memberships, rooms and messages. Add indexes for the common lookups.",
    status: "in_progress",
    assigneeId: "m2",
    roomSlug: "backend-development",
    dueDate: "2026-11-19",
  },
  {
    id: "t3",
    title: "Build workspace home screen",
    description: "Sidebar, stats, room cards, tasks, activity and members.",
    status: "in_progress",
    assigneeId: "m1",
    roomSlug: "frontend-development",
    dueDate: "2026-11-23",
  },
  {
    id: "t4",
    title: "Build tasks board UI",
    description: "Three columns, filters, and a create/edit dialog.",
    status: "todo",
    assigneeId: "m1",
    roomSlug: "frontend-development",
    dueDate: "2026-11-25",
  },
  {
    id: "t5",
    title: "Write API documentation",
    description: "",
    status: "todo",
    assigneeId: "m4",
    roomSlug: "general",
    dueDate: "2026-11-27",
  },
  {
    id: "t6",
    title: "Set up Docker Compose for Postgres",
    description: "Local database with a named volume and a health check.",
    status: "todo",
    assigneeId: "m3",
    roomSlug: "backend-development",
    dueDate: "2026-11-26",
  },
  {
    id: "t10",
    title: "Plan Socket.IO event names",
    description: "Agree on the room, message and presence event contract.",
    status: "todo",
    assigneeId: null,
    roomSlug: "backend-development",
    dueDate: null,
  },
  {
    id: "t7",
    title: "Choose colour palette",
    description: "",
    status: "done",
    assigneeId: "m1",
    roomSlug: "frontend-development",
    dueDate: "2026-11-17",
  },
  {
    id: "t8",
    title: "Define roles and permissions",
    description: "Owner, admin and member, enforced on the server.",
    status: "done",
    assigneeId: "m2",
    roomSlug: "general",
    dueDate: "2026-11-16",
  },
  {
    id: "t9",
    title: "Draft project requirements",
    description: "",
    status: "done",
    assigneeId: "m4",
    roomSlug: null,
    dueDate: null,
  },
];
