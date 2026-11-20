"use client";

import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useLayoutEffect } from "react";

import { Button } from "@/components/ui/button";
import { easeOut } from "@/lib/motion";

import { useShellStore } from "../store";
import { SidebarContent } from "./sidebar-content";
import { Topbar } from "./topbar";

export function AppShell({ children }: { children: React.ReactNode }) {
  const drawerOpen = useShellStore((state) => state.drawerOpen);
  const closeDrawer = useShellStore((state) => state.closeDrawer);

  // Close on Escape while the drawer is open.
  useEffect(() => {
    if (!drawerOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeDrawer();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [drawerOpen, closeDrawer]);

  // Never leave the drawer open when the screen is hidden/re-shown.
  useLayoutEffect(() => {
    return () => useShellStore.getState().closeDrawer();
  }, []);

  return (
    <div className="min-h-dvh lg:grid lg:grid-cols-[var(--sidebar-width)_minmax(0,1fr)]">
      <a
        href="#main"
        className="sr-only z-50 rounded-md bg-primary px-3 py-2 text-primary-foreground focus:not-sr-only focus:fixed focus:left-3 focus:top-3"
      >
        Skip to content
      </a>

      <aside
        aria-label="Sidebar"
        className="sticky top-0 hidden h-dvh border-r bg-sidebar lg:block"
      >
        <SidebarContent />
      </aside>

      <AnimatePresence>
        {drawerOpen ? (
          <div className="lg:hidden">
            <motion.div
              key="scrim"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              onClick={closeDrawer}
              aria-hidden
              className="fixed inset-0 z-40 bg-foreground/40"
            />
            <motion.aside
              key="drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.26, ease: easeOut }}
              className="fixed inset-y-0 left-0 z-50 w-[min(300px,85vw)] border-r bg-sidebar shadow-popover"
            >
              <Button
                variant="ghost"
                size="icon"
                aria-label="Close navigation"
                onClick={closeDrawer}
                className="absolute right-2 top-2.5 z-10"
              >
                <X aria-hidden />
              </Button>
              <SidebarContent />
            </motion.aside>
          </div>
        ) : null}
      </AnimatePresence>

      <div className="flex min-w-0 flex-col">
        <Topbar />
        <main id="main" className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
