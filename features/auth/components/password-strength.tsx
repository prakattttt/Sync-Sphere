"use client";

import { AnimatePresence, motion } from "motion/react";
import { useMemo } from "react";

import { collapse, easeOut } from "@/lib/motion";
import { cn } from "@/lib/utils";

import { getPasswordStrength } from "../lib/password-strength";

const SEGMENT_COLORS = [
  "",
  "bg-destructive",
  "bg-tertiary",
  "bg-primary",
  "bg-primary",
] as const;

/** Four-segment strength meter with a one-line hint. Purely advisory. */
export function PasswordStrength({ password }: { password: string }) {
  const { score, label, hint } = useMemo(
    () => getPasswordStrength(password),
    [password],
  );

  return (
    <AnimatePresence initial={false}>
      {password ? (
        <motion.div key="meter" {...collapse} className="overflow-hidden">
          <div className="space-y-1.5 pt-2" aria-live="polite">
            <div className="flex items-center gap-3">
              <div className="grid flex-1 grid-cols-4 gap-1" aria-hidden>
                {[1, 2, 3, 4].map((segment) => (
                  <span
                    key={segment}
                    className="h-1 overflow-hidden rounded-full bg-border"
                  >
                    <motion.span
                      className={cn(
                        "block h-full origin-left rounded-full transition-colors",
                        SEGMENT_COLORS[score],
                      )}
                      initial={false}
                      animate={{ scaleX: segment <= score ? 1 : 0 }}
                      transition={{ duration: 0.25, ease: easeOut }}
                    />
                  </span>
                ))}
              </div>
              <span className="type-label-sm w-12 text-right uppercase text-ink-meta">
                {label}
              </span>
            </div>
            {hint ? (
              <p className="text-xs leading-4 text-ink-meta">{hint}</p>
            ) : null}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
