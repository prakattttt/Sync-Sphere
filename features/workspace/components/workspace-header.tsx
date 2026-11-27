"use client";

import { Plus, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants";

import { useTasksStore } from "@/features/tasks/store";
import { User } from "better-auth";
import { tasks } from "../data/mock";

interface Props {
  user: User;
}

const myDueSoon = tasks.filter(
  (task) => task.dueSoon && task.status !== "done",
).length;

export function WorkspaceHeader({ user }: Props) {
  const router = useRouter();

  // Open the tasks screen with the "New task" dialog already showing.
  const createTask = () => {
    useTasksStore.getState().openCreate("todo");
    router.push(ROUTES.tasks);
  };

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <p className="type-label-sm uppercase text-ink-meta">
            Workspace / College Project
          </p>
          <span className="chip chip-brand">owner</span>
        </div>
        <h1 className="type-headline-lg text-foreground">
          Welcome back, {user.name.split(" ")[0]}
        </h1>
        <p className="type-body-md max-w-xl text-ink-body">
          {myDueSoon > 0 ? (
            <>
              You have{" "}
              <span className="font-semibold text-foreground">
                {myDueSoon} {myDueSoon === 1 ? "task" : "tasks"} due soon
              </span>{" "}
              and unread messages in{" "}
            </>
          ) : (
            <>Nothing is due soon. You have unread messages in </>
          )}
          <span className="type-code-sm rounded-sm bg-surface-nav px-1 py-0.5 text-foreground">
            #backend-development
          </span>
          .
        </p>
      </div>

      <div className="flex shrink-0 gap-2">
        <Button variant="secondary" size="compact">
          <UserPlus aria-hidden />
          Invite
        </Button>
        <Button size="compact" onClick={createTask}>
          <Plus aria-hidden />
          New task
        </Button>
      </div>
    </div>
  );
}
