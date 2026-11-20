"use client";

import { Bell, Menu, Search } from "lucide-react";

import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import { members } from "../data/mock";
import { useShellStore } from "../store";

export function Topbar() {
  const openDrawer = useShellStore((state) => state.openDrawer);
  const online = members.filter((member) => member.online);

  return (
    <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b bg-background/85 px-4 backdrop-blur md:px-6">
      <Button
        variant="ghost"
        size="icon"
        aria-label="Open navigation"
        className="-ml-2 lg:hidden"
        onClick={openDrawer}
      >
        <Menu aria-hidden />
      </Button>

      <nav aria-label="Breadcrumb" className="type-label-md hidden min-w-0 items-center gap-2 sm:flex">
        <span className="truncate text-ink-meta">College Project</span>
        <span aria-hidden className="text-ink-meta">
          /
        </span>
        <span className="text-foreground">Home</span>
      </nav>

      <button
        type="button"
        className="ml-auto flex h-9 w-full max-w-[320px] items-center gap-2 rounded-md border bg-card px-3 text-left text-[13px] text-ink-meta transition-colors hover:border-border-strong sm:ml-6 sm:mr-auto"
      >
        <Search className="size-4 shrink-0" aria-hidden />
        <span className="flex-1 truncate">Search rooms, tasks, docs</span>
        <kbd className="type-label-sm hidden rounded-sm border bg-surface-nav px-1.5 py-0.5 sm:inline">
          ⌘K
        </kbd>
      </button>

      <div className="hidden items-center md:flex" aria-label={`${online.length} members online`}>
        <div className="flex -space-x-1 [--dot-ring:var(--background)]">
          {online.slice(0, 3).map((member) => (
            <Avatar
              key={member.id}
              initials={member.initials}
              size="sm"
              className="ring-2 ring-background"
            />
          ))}
        </div>
        <span className="type-label-sm ml-2 text-ink-meta">{online.length} online</span>
      </div>

      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" aria-label="Notifications, 2 unread" className="relative">
          <Bell aria-hidden />
          <span
            aria-hidden
            className="absolute right-2 top-2 size-2 rounded-full border-2 border-background bg-tertiary"
          />
        </Button>
        <ThemeToggle />
      </div>
    </header>
  );
}
