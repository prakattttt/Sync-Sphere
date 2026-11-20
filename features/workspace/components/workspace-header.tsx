"use client";

import { Plus, UserPlus } from "lucide-react";

import { Button } from "@/components/ui/button";

import type { User } from "better-auth";

interface Props {
  user: User;
}

export function WorkspaceHeader({ user }: Props) {
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
          Welcome back, {user.name}
        </h1>
        <p className="type-body-md max-w-xl text-ink-body">
          You have{" "}
          <span className="font-semibold text-foreground">
            2 tasks due this week
          </span>{" "}
          and unread messages in{" "}
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
        <Button size="compact">
          <Plus aria-hidden />
          New task
        </Button>
      </div>
    </div>
  );
}
