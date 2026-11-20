"use client";

import { motion } from "motion/react";

import { fadeUp, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";

import { documents, members, tasks } from "../data/mock";
import { AnimatedNumber } from "./animated-number";

const open = tasks.filter((task) => task.status !== "done");
const inProgress = tasks.filter((task) => task.status === "in_progress");
const online = members.filter((member) => member.online);

const STATS = [
  { label: "Open tasks", value: open.length, note: "2 due this week", tone: "accent" },
  { label: "In progress", value: inProgress.length, note: "of " + open.length + " open", tone: "brand" },
  { label: "Documents", value: documents.length, note: "1 new today", tone: "neutral" },
  { label: "Online now", value: online.length, note: "of " + members.length + " members", tone: "brand" },
] as const;

const TONE = {
  accent: "chip-accent",
  brand: "chip-brand",
  neutral: "chip-neutral",
} as const;

export function StatsRow() {
  return (
    <motion.ul
      variants={staggerContainer}
      className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4"
    >
      {STATS.map((stat) => (
        <motion.li key={stat.label} variants={fadeUp} className="panel space-y-3 p-4">
          <p className="type-label-md uppercase text-ink-meta">{stat.label}</p>
          <p className="type-display-lg text-foreground tabular-nums">
            <AnimatedNumber value={stat.value} />
          </p>
          <span className={cn("chip", TONE[stat.tone])}>{stat.note}</span>
        </motion.li>
      ))}
    </motion.ul>
  );
}
