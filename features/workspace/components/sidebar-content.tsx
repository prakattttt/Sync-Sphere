"use client";

import {
  Activity,
  FileText,
  House,
  ListChecks,
  LogOut,
  Plus,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";

import { Avatar } from "@/components/ui/avatar";
import { Logo } from "@/components/shared/logo";
import { ROUTES } from "@/lib/constants";

import { currentUser, rooms } from "../data/mock";
import { useShellStore } from "../store";
import { WorkspaceSwitcher } from "./workspace-switcher";
import { logOutUser } from "@/features/auth/api";

const NAV: { href: string; label: string; Icon: LucideIcon }[] = [
  { href: ROUTES.workspace, label: "Home", Icon: House },
  { href: ROUTES.tasks, label: "Tasks", Icon: ListChecks },
  { href: ROUTES.documents, label: "Documents", Icon: FileText },
  { href: ROUTES.activity, label: "Activity", Icon: Activity },
];

/** Sidebar body, shared by the fixed desktop sidebar and the mobile drawer. */
export function SidebarContent() {
  const pathname = usePathname();
  const closeDrawer = useShellStore((state) => state.closeDrawer);

  const logout = async () => {
    const response = await logOutUser();

    if (response.ok) {
      redirect(ROUTES.login);
    }
  };

  return (
    <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground [--dot-ring:var(--sidebar)]">
      <div className="flex h-14 shrink-0 items-center px-4">
        <Link
          href={ROUTES.workspace}
          onNavigate={closeDrawer}
          className="rounded-md"
        >
          <Logo />
        </Link>
      </div>

      <div className="px-3 pb-3">
        <WorkspaceSwitcher />
      </div>

      <nav
        aria-label="Workspace"
        className="flex-1 space-y-5 overflow-y-auto py-2"
      >
        <ul className="space-y-0.5">
          {NAV.map(({ href, label, Icon }) => (
            <li key={href}>
              <Link
                href={href}
                onNavigate={closeDrawer}
                data-active={pathname === href ? "true" : undefined}
                aria-current={pathname === href ? "page" : undefined}
                className="row type-body-md"
              >
                <Icon className="size-4 shrink-0" aria-hidden />
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div>
          <div className="flex items-center justify-between px-3 pb-1.5">
            <h2 className="type-label-sm uppercase text-ink-meta">Rooms</h2>
            <button
              type="button"
              aria-label="Create room"
              className="grid size-6 place-items-center rounded-sm text-ink-meta transition-colors hover:bg-background hover:text-foreground"
            >
              <Plus className="size-4" aria-hidden />
            </button>
          </div>
          <ul className="space-y-0.5">
            {rooms.map((room) => {
              const href = ROUTES.room(room.slug);
              const active = pathname === href;
              return (
                <li key={room.id}>
                  <Link
                    href={href}
                    onNavigate={closeDrawer}
                    data-active={active ? "true" : undefined}
                    aria-current={active ? "page" : undefined}
                    className="row type-body-md"
                  >
                    <span className="row-prefix">#</span>
                    <span className="truncate">{room.name}</span>
                    {room.unread > 0 ? (
                      <span className="type-label-sm ml-auto grid h-4 min-w-4 place-items-center rounded-full bg-tertiary px-1 text-tertiary-foreground">
                        <span className="sr-only">{room.unread} unread</span>
                        <span aria-hidden>{room.unread}</span>
                      </span>
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      <div className="flex shrink-0 items-center gap-2.5 border-t p-3">
        <Avatar initials={currentUser.initials} online />
        <div className="min-w-0 flex-1">
          <p className="truncate text-[13px] font-semibold leading-4 text-foreground">
            {currentUser.name}
          </p>
          <p className="type-label-sm truncate text-ink-meta">
            {currentUser.email}
          </p>
        </div>
        <button
          onClick={logout}
          aria-label="Sign out"
          className="grid size-8 place-items-center rounded-md text-ink-meta transition-colors hover:bg-background hover:text-foreground"
        >
          <LogOut className="size-4" aria-hidden />
        </button>
      </div>
    </div>
  );
}
