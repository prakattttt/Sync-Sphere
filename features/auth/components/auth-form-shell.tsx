"use client";

import { motion } from "motion/react";

import { fadeUp, staggerContainer } from "@/lib/motion";

type AuthFormShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  /** Switch-screen prompt, e.g. "New here? Create an account". */
  footer: React.ReactNode;
  children: React.ReactNode;
};

/**
 * Card used by both auth screens. Owns the entrance choreography: any
 * descendant `motion` element with `variants={fadeUp}` is staggered in.
 */
export function AuthFormShell({
  eyebrow,
  title,
  description,
  footer,
  children,
}: AuthFormShellProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      className="panel w-full max-w-105 p-5 sm:p-8"
    >
      <motion.header variants={fadeUp} className="mb-6 space-y-2">
        <p className="type-label-sm uppercase text-ink-meta">{eyebrow}</p>
        <h1 className="type-headline-lg text-foreground">{title}</h1>
        <p className="type-body-md text-ink-body">{description}</p>
      </motion.header>

      {children}

      <motion.p
        variants={fadeUp}
        className="type-body-md mt-6 border-t pt-5 text-center text-ink-body"
      >
        {footer}
      </motion.p>
    </motion.div>
  );
}
