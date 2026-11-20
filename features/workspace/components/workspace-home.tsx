"use client";

import { motion } from "motion/react";

import { fadeUp, staggerContainer } from "@/lib/motion";

import { ActivityFeed } from "./activity-feed";
import { MyTasks } from "./my-tasks";
import { OnlineMembers } from "./online-members";
import { RecentDocuments } from "./recent-documents";
import { RoomCards } from "./room-cards";
import { StatsRow } from "./stats-row";
import { WorkspaceHeader } from "./workspace-header";
import type { User } from "better-auth";

interface Props {
  user: User;
}

export function WorkspaceHome({ user }: Props) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      className="mx-auto w-full max-w-7xl space-y-6 px-4 py-6 md:px-6 lg:py-8"
    >
      <motion.div variants={fadeUp}>
        <WorkspaceHeader user={user} />
      </motion.div>

      <StatsRow />

      <motion.div variants={fadeUp}>
        <RoomCards />
      </motion.div>

      <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_var(--inspector-width)]">
        <motion.div variants={fadeUp} className="min-w-0 space-y-6">
          <MyTasks />
          <ActivityFeed />
        </motion.div>

        <motion.div variants={fadeUp} className="min-w-0 space-y-6">
          <OnlineMembers />
          <RecentDocuments />
        </motion.div>
      </div>
    </motion.div>
  );
}
