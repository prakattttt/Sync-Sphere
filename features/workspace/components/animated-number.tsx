"use client";

import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import { useEffect } from "react";

import { easeOut } from "@/lib/motion";

/** Counts up from 0 to `value` on mount (instant when reduced motion is on). */
export function AnimatedNumber({ value }: { value: number }) {
  const reduced = useReducedMotion();
  const raw = useMotionValue(reduced ? value : 0);
  const rounded = useTransform(raw, (latest) => Math.round(latest));

  useEffect(() => {
    if (reduced) {
      raw.set(value);
      return;
    }
    const controls = animate(raw, value, { duration: 0.9, ease: easeOut });
    return () => controls.stop();
  }, [raw, value, reduced]);

  return <motion.span>{rounded}</motion.span>;
}
