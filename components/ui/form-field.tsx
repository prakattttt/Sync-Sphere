"use client";

import { CircleAlert } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { Label } from "@/components/ui/label";
import { collapse } from "@/lib/motion";
import { cn } from "@/lib/utils";

/** Props to spread on the control so it is wired to its error message. */
export function fieldA11y(id: string, error?: string) {
  return {
    id,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? `${id}-error` : undefined,
  } as const;
}

type FormFieldProps = {
  /** Must match the `id` of the control inside. */
  id: string;
  label: string;
  error?: string;
  /** Rendered on the right side of the label row (e.g. "Forgot password?"). */
  action?: React.ReactNode;
  /** Rendered below the error message (e.g. a strength meter). */
  footer?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
};

/** Label + control + animated validation message. */
export function FormField({
  id,
  label,
  error,
  action,
  footer,
  className,
  children,
}: FormFieldProps) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <div className="flex items-center justify-between gap-2">
        <Label htmlFor={id}>{label}</Label>
        {action}
      </div>
      {children}
      <AnimatePresence initial={false}>
        {error ? (
          <motion.div key="error" {...collapse} className="overflow-hidden">
            <p
              id={`${id}-error`}
              role="alert"
              className="flex items-start gap-1.5 pt-0.5 text-xs leading-4 text-destructive"
            >
              <CircleAlert className="mt-px size-3.5 shrink-0" aria-hidden />
              <span>{error}</span>
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
      {footer}
    </div>
  );
}
