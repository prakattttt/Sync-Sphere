"use client";

import { FileText, Hash, ListChecks, MessageSquare, type LucideIcon } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

import { Avatar } from "@/components/ui/avatar";
import { Panel } from "@/components/ui/panel";
import { ROUTES } from "@/lib/constants";
import { fadeUp, staggerContainer } from "@/lib/motion";

import { activity } from "../data/mock";
import type { ActivityKind } from "../types";

const ICONS: Record<ActivityKind, LucideIcon> = {
  task: ListChecks,
  room: Hash,
  doc: FileText,
  comment: MessageSquare,
};

export function ActivityFeed() {
  return (
    <Panel
      title="Recent activity"
      action={
        <Link
          href={ROUTES.activity}
          className="type-label-md text-chip-brand-text underline-offset-4 hover:underline"
        >
          View all
        </Link>
      }
    >
      <motion.ol variants={staggerContainer} className="divide-y">
        {activity.map((item) => {
          const Icon = ICONS[item.kind];
          return (
            <motion.li
              key={item.id}
              variants={fadeUp}
              className="flex items-start gap-3 px-4 py-3"
            >
              <Avatar initials={item.actorInitials} size="md" />
              <p className="type-body-md min-w-0 flex-1 text-ink-body">
                <span className="font-semibold text-foreground">{item.actor}</span>{" "}
                {item.verb}{" "}
                <span className="font-medium text-foreground">{item.target}</span>
              </p>
              <span className="type-label-sm mt-0.5 inline-flex shrink-0 items-center gap-1.5 text-ink-meta">
                <Icon className="size-3.5" aria-hidden />
                {item.time}
              </span>
            </motion.li>
          );
        })}
      </motion.ol>
    </Panel>
  );
}
