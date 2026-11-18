"use client";

import { CircleAlert } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { collapse } from "@/lib/motion";

import { useAuthUiStore } from "../store";

/** Form-level error banner driven by the shared auth store. */
export function AuthAlert() {
  const message = useAuthUiStore((state) => state.formError);

  return (
    <AnimatePresence initial={false}>
      {message ? (
        <motion.div key="alert" {...collapse} className="overflow-hidden">
          <div
            role="alert"
            className="flex items-start gap-2 rounded-md border border-destructive/30 bg-destructive-container px-3 py-2.5 text-[13px] leading-4.5 text-on-destructive-container"
          >
            <CircleAlert className="mt-px size-4 shrink-0" aria-hidden />
            <span>{message}</span>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
