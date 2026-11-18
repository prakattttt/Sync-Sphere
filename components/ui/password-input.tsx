"use client";

import { Eye, EyeOff } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useLayoutEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type PasswordInputProps = Omit<React.ComponentProps<typeof Input>, "type">;

/** Password field with an animated show/hide toggle. */
export function PasswordInput({ className, ...props }: PasswordInputProps) {
  const [visible, setVisible] = useState(false);

  // Cache Components keeps hidden routes mounted; re-mask the password
  // whenever this field is hidden so it never reappears in plain text.
  useLayoutEffect(() => {
    return () => {
      setVisible(false);
    };
  }, []);

  return (
    <div className="relative">
      <Input
        {...props}
        type={visible ? "text" : "password"}
        className={cn("pr-11", className)}
      />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? "Hide password" : "Show password"}
        aria-pressed={visible}
        className="absolute inset-y-0 right-0 grid w-11 place-items-center rounded-r-md text-ink-meta transition-colors hover:text-foreground"
      >
        <AnimatePresence initial={false} mode="wait">
          <motion.span
            key={visible ? "hide" : "show"}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.12 }}
            className="grid place-items-center"
          >
            {visible ? (
              <EyeOff className="size-4" aria-hidden />
            ) : (
              <Eye className="size-4" aria-hidden />
            )}
          </motion.span>
        </AnimatePresence>
      </button>
    </div>
  );
}
