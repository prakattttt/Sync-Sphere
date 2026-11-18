import type { Variants } from "motion/react";

/** Shared easing: quick start, soft landing. */
export const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Parent container that staggers its motion children. */
export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

/** Child that fades in while rising slightly. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: easeOut },
  },
};

/** Expand/collapse used for validation messages and banners. */
export const collapse = {
  initial: { opacity: 0, height: 0 },
  animate: { opacity: 1, height: "auto" },
  exit: { opacity: 0, height: 0 },
  transition: { duration: 0.2, ease: easeOut },
} as const;
