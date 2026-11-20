/**
 * Static demo data so the UI can be designed without a backend.
 * Replace each export with a real query (Server Component fetch / Server
 * Action) when the API exists; the component props already match these shapes.
 */
import type {
  ActivityItem,
  DocItem,
  Member,
  Room,
  Task,
  Workspace,
} from "../types";

export const currentUser = {
  name: "Ada Lovelace",
  email: "ada@syncspace.dev",
  initials: "AL",
};

export const workspaces: Workspace[] = [
  { id: "college", name: "College Project", initials: "CP", role: "owner", members: 5 },
  { id: "studio", name: "Studio Notes", initials: "SN", role: "admin", members: 3 },
  { id: "launch", name: "Launch Squad", initials: "LS", role: "member", members: 8 },
];

export const members: Member[] = [
  { id: "m1", name: "Ada Lovelace", initials: "AL", role: "owner", online: true, location: "Workspace home" },
  { id: "m2", name: "Anita Maharjan", initials: "AM", role: "admin", online: true, location: "#backend-development" },
  { id: "m3", name: "Rohan Karki", initials: "RK", role: "member", online: true, location: "Tasks board" },
  { id: "m4", name: "Sita Paudel", initials: "SP", role: "member", online: true, location: "#general" },
  { id: "m5", name: "Dev Thapa", initials: "DT", role: "member", online: false },
];

export const rooms: Room[] = [
  {
    id: "r1",
    slug: "general",
    name: "general",
    unread: 0,
    online: 3,
    lastAuthor: "Sita",
    lastMessage: "Lunch call moved to 1:30, same link.",
    lastAt: "10:51",
  },
  {
    id: "r2",
    slug: "backend-development",
    name: "backend-development",
    unread: 3,
    online: 2,
    lastAuthor: "Anita",
    lastMessage: "Schema draft is up. Can someone review the membership table?",
    lastAt: "10:42",
  },
  {
    id: "r3",
    slug: "frontend-development",
    name: "frontend-development",
    unread: 0,
    online: 1,
    lastAuthor: "Rohan",
    lastMessage: "Login and register screens are merged.",
    lastAt: "Yesterday",
  },
];

export const tasks: Task[] = [
  { id: "t1", title: "Implement authentication", status: "in_progress", room: "backend-development", due: "Fri", dueSoon: true },
  { id: "t2", title: "Design database schema", status: "in_progress", room: "backend-development", due: "Thu", dueSoon: true },
  { id: "t3", title: "Build workspace home screen", status: "in_progress", room: "frontend-development", due: "Mon", dueSoon: false },
  { id: "t4", title: "Write API documentation", status: "todo", room: "general", due: "Next week", dueSoon: false },
  { id: "t5", title: "Set up Docker Compose for Postgres", status: "todo", room: "backend-development", due: "Next week", dueSoon: false },
  { id: "t6", title: "Choose colour palette", status: "done", room: "frontend-development", due: "Done", dueSoon: false },
];

export const activity: ActivityItem[] = [
  { id: "a1", kind: "task", actor: "Rohan K.", actorInitials: "RK", verb: "moved", target: "Implement authentication to in_progress", time: "10:44" },
  { id: "a2", kind: "comment", actor: "Anita M.", actorInitials: "AM", verb: "commented on", target: "Project Requirements", time: "10:31" },
  { id: "a3", kind: "doc", actor: "Sita P.", actorInitials: "SP", verb: "created", target: "API Documentation", time: "09:58" },
  { id: "a4", kind: "room", actor: "Ada L.", actorInitials: "AL", verb: "created room", target: "#frontend-development", time: "Yesterday" },
  { id: "a5", kind: "task", actor: "Anita M.", actorInitials: "AM", verb: "assigned", target: "Design database schema to Rohan K.", time: "Yesterday" },
];

export const documents: DocItem[] = [
  { id: "d1", title: "Project Requirements", updated: "Edited 12m ago", editors: ["AM", "AL"] },
  { id: "d2", title: "API Documentation", updated: "Edited 1h ago", editors: ["SP"] },
  { id: "d3", title: "Database Schema Notes", updated: "Edited yesterday", editors: ["AM", "RK", "AL"] },
];
