"use client";

import { motion } from "motion/react";
import { useLayoutEffect } from "react";

import { fadeUp, staggerContainer } from "@/lib/motion";

import { useTasksStore } from "../store";
import { TaskBoard } from "./task-board";
import { TaskDialog } from "./task-dialog";
import { TasksHeader } from "./tasks-header";
import { TasksToolbar } from "./tasks-toolbar";

/** Tasks screen: header + progress, filters, board, and the create/edit dialog. */
export function TasksPage() {
  // Cache Components keeps hidden routes mounted. Reset the transient view
  // state (filters, open dialog, drag) whenever this screen is hidden.
  useLayoutEffect(() => {
    return () => useTasksStore.getState().resetView();
  }, []);

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      className="mx-auto w-full max-w-7xl space-y-6 px-4 py-6 md:px-6 lg:py-8"
    >
      <motion.div variants={fadeUp}>
        <TasksHeader />
      </motion.div>

      <motion.div variants={fadeUp}>
        <TasksToolbar />
      </motion.div>

      <motion.div variants={fadeUp}>
        <TaskBoard />
      </motion.div>

      <TaskDialog />
    </motion.div>
  );
}
