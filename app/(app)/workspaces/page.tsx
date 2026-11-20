import type { Metadata } from "next";

import { WorkspaceHome } from "@/features/workspace/components/workspace-home";
import { requireSession } from "@/features/auth/auth-session";

export const metadata: Metadata = {
  title: "Workspace",
  description:
    "Your workspace at a glance: rooms, tasks, documents and activity.",
};

export default async function WorkspacePage() {
  const session = await requireSession();

  return <WorkspaceHome user={session.user} />;
}
