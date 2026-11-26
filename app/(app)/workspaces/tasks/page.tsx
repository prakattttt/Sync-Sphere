import type { Metadata } from "next";

import { TasksPage } from "@/features/tasks/components/tasks-page";
import { requireSession } from "@/features/auth/auth-session";

export const metadata: Metadata = {
  title: "Tasks",
  description: "Plan, assign and track your team's work on a shared board.",
};

export default async function TasksRoute() {
  await requireSession();

  return <TasksPage />;
}
