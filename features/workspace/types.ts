import type { TaskStatus } from "@/components/ui/status-chip";

export type Role = "owner" | "admin" | "member";

export type Member = {
  id: string;
  name: string;
  initials: string;
  role: Role;
  online: boolean;
  /** Where the member currently is, e.g. "#general". */
  location?: string;
};

export type Workspace = {
  id: string;
  name: string;
  initials: string;
  role: Role;
  members: number;
};

export type Room = {
  id: string;
  slug: string;
  name: string;
  unread: number;
  online: number;
  lastAuthor: string;
  lastMessage: string;
  lastAt: string;
};

export type Task = {
  id: string;
  title: string;
  status: TaskStatus;
  room: string | null;
  /** Short human label, e.g. "Fri" or "Next week". */
  due: string;
  dueSoon: boolean;
};

export type ActivityKind = "task" | "room" | "doc" | "comment";

export type ActivityItem = {
  id: string;
  kind: ActivityKind;
  actor: string;
  actorInitials: string;
  verb: string;
  target: string;
  time: string;
};

export type DocItem = {
  id: string;
  title: string;
  updated: string;
  editors: string[];
};
