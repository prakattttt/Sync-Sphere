"use client";

import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useId, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

import { Button } from "@/components/ui/button";
import { easeOut } from "@/lib/motion";
import { cn } from "@/lib/utils";

const noopSubscribe = () => () => {};

/** False on the server and during hydration, true afterwards (portal-safe). */
function useIsClient() {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}

const FOCUSABLE =
  'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

type DialogProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  /** Extra classes for the panel (e.g. a wider max width). */
  className?: string;
  children: React.ReactNode;
};

/**
 * Modal dialog; a bottom sheet on phones. Rendered in a portal so transformed
 * ancestors (animated page wrappers) can't break `position: fixed`.
 * Handles Escape, scrim click, focus trap, focus restore and scroll lock.
 */
export function Dialog({ open, ...props }: DialogProps) {
  const isClient = useIsClient();
  if (!isClient) return null;

  return createPortal(
    <AnimatePresence>
      {open ? <DialogPanel key="dialog" {...props} /> : null}
    </AnimatePresence>,
    document.body,
  );
}

function DialogPanel({
  onClose,
  title,
  description,
  className,
  children,
}: Omit<DialogProps, "open">) {
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    (panel.querySelector<HTMLElement>("[data-autofocus]") ?? panel).focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        onClose();
        return;
      }
      if (event.key !== "Tab") return;

      const focusable = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (focusable.length === 0) {
        event.preventDefault();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === first || active === panel)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus?.();
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4">
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.18 }}
        onClick={onClose}
        className="absolute inset-0 bg-foreground/40"
      />
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        tabIndex={-1}
        initial={{ opacity: 0, y: 24, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.985 }}
        transition={{ duration: 0.22, ease: easeOut }}
        className={cn(
          "relative flex max-h-[92dvh] w-full flex-col rounded-t-xl border border-border-strong bg-popover text-popover-foreground shadow-popover outline-none sm:max-w-140 sm:rounded-lg",
          className,
        )}
      >
        <header className="flex items-start justify-between gap-4 border-b px-5 py-4">
          <div className="min-w-0 space-y-1">
            <h2 id={titleId} className="type-headline-sm text-foreground">
              {title}
            </h2>
            {description ? (
              <p id={descriptionId} className="type-body-sm text-ink-body">
                {description}
              </p>
            ) : null}
          </div>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Close dialog"
            onClick={onClose}
            className="-mr-2 -mt-1 size-8 shrink-0"
          >
            <X aria-hidden />
          </Button>
        </header>
        <div className="overflow-y-auto px-5 py-5">{children}</div>
      </motion.div>
    </div>
  );
}
