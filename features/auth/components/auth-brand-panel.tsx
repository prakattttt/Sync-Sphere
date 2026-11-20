"use client";

import { motion, type Variants } from "motion/react";

import { Logo } from "@/components/shared/logo";
import { easeOut } from "@/lib/motion";

const ROOMS = [
  { name: "general", unread: 0, active: true },
  { name: "backend-development", unread: 3, active: false },
  { name: "frontend-development", unread: 0, active: false },
];

const MESSAGES = [
  {
    initials: "AM",
    name: "Anita M.",
    time: "10:42",
    text: "Schema draft is up. Can someone review the membership table?",
  },
  {
    initials: "RK",
    name: "Rohan K.",
    time: "10:44",
    text: "On it. Moving the auth task to in progress.",
  },
];

const FEATURES = [
  { index: "01", title: "Rooms", body: "Live, persistent conversation." },
  { index: "02", title: "Tasks", body: "A shared board for the work." },
  { index: "03", title: "Docs", body: "Write it down. Discuss it." },
];

const list: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.55 } },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: easeOut } },
};

const slideIn: Variants = {
  hidden: { opacity: 0, x: -8 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: easeOut } },
};

/**
 * Left-hand brand column (desktop only). A static, decorative preview of the
 * product: rooms list, a short conversation, a task update and a typing hint.
 */
export function AuthBrandPanel() {
  return (
    <aside className="relative hidden flex-col justify-between gap-12 overflow-hidden border-r bg-surface-nav p-10 lg:flex xl:p-14">
      {/* Blueprint grid, faded toward the edges. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-size-[32px_32px] mask-[radial-gradient(ellipse_at_center,black_30%,transparent_78%)]"
      />

      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: easeOut }}
        className="relative"
      >
        <Logo />
      </motion.div>

      <div className="relative space-y-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: easeOut, delay: 0.1 }}
          className="max-w-xl space-y-4"
        >
          <p className="type-display-lg text-foreground">
            Chat, tasks and docs in one live workspace.
          </p>
          <p className="type-body-lg text-ink-body">
            Rooms for focused conversation, a shared board for the work, and
            documents your team can discuss, all updating in real time.
          </p>
        </motion.div>

        {/* Decorative product preview. */}
        <motion.div
          aria-hidden
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeOut, delay: 0.25 }}
          className="panel grid w-full max-w-155 grid-cols-1 overflow-hidden xl:grid-cols-[208px_minmax(0,1fr)]"
        >
          <div className="hidden border-r bg-surface-nav py-3 xl:block">
            <p className="type-label-sm px-3 pb-2 uppercase text-ink-meta">
              College Project
            </p>
            <motion.ul
              variants={list}
              initial="hidden"
              animate="show"
              className="space-y-0.5"
            >
              {ROOMS.map((room) => (
                <motion.li
                  key={room.name}
                  variants={slideIn}
                  data-active={room.active ? "true" : undefined}
                  className="row type-body-sm"
                >
                  <span className="row-prefix">#</span>
                  <span className="truncate">{room.name}</span>
                  {room.unread ? (
                    <span className="type-label-sm ml-auto grid h-4 min-w-4 place-items-center rounded-full bg-tertiary px-1 text-tertiary-foreground">
                      {room.unread}
                    </span>
                  ) : null}
                </motion.li>
              ))}
            </motion.ul>
          </div>

          <div className="flex min-w-0 flex-col">
            <div className="panel-header flex items-center justify-between gap-2">
              <span className="type-label-md text-foreground"># general</span>
              <span className="chip chip-brand">
                <span className="size-1.5 rounded-full bg-primary" />3 online
              </span>
            </div>

            <motion.ul
              variants={list}
              initial="hidden"
              animate="show"
              className="flex-1 space-y-4 p-4"
            >
              {MESSAGES.map((message) => (
                <motion.li
                  key={message.name}
                  variants={rise}
                  className="flex gap-2.5"
                >
                  <span className="type-label-sm grid size-7 shrink-0 place-items-center rounded-full border border-chip-brand-border bg-chip-brand-bg text-chip-brand-text">
                    {message.initials}
                  </span>
                  <div className="min-w-0 space-y-0.5">
                    <p className="flex items-baseline gap-2">
                      <span className="text-[13px] font-semibold text-foreground">
                        {message.name}
                      </span>
                      <span className="type-label-sm text-ink-meta">
                        {message.time}
                      </span>
                    </p>
                    <p className="type-body-sm text-ink-body">{message.text}</p>
                  </div>
                </motion.li>
              ))}

              <motion.li
                variants={rise}
                className="flex items-center gap-2 rounded-md border bg-background px-3 py-2"
              >
                <span className="chip chip-accent">in_progress</span>
                <span className="type-body-sm truncate text-ink-body">
                  Implement authentication
                </span>
                <span className="type-label-sm ml-auto text-ink-meta">RK</span>
              </motion.li>

              <motion.li
                variants={rise}
                className="flex items-center gap-2 pl-9.5"
              >
                <span className="flex gap-1">
                  {[0, 1, 2].map((dot) => (
                    <motion.span
                      key={dot}
                      className="size-1.5 rounded-full bg-ink-meta"
                      animate={{ opacity: [0.25, 1, 0.25] }}
                      transition={{
                        duration: 1.1,
                        repeat: Infinity,
                        delay: dot * 0.18,
                      }}
                    />
                  ))}
                </span>
                <span className="type-label-sm text-ink-meta">
                  Sita is typing
                </span>
              </motion.li>
            </motion.ul>
          </div>
        </motion.div>
      </div>

      <motion.ul
        variants={list}
        initial="hidden"
        animate="show"
        className="relative grid grid-cols-3 gap-6 border-t pt-6"
      >
        {FEATURES.map((feature) => (
          <motion.li key={feature.index} variants={rise} className="space-y-1">
            <p className="type-label-sm text-ink-meta">{feature.index}</p>
            <p className="type-body-md font-semibold text-foreground">
              {feature.title}
            </p>
            <p className="type-body-sm text-ink-body">{feature.body}</p>
          </motion.li>
        ))}
      </motion.ul>
    </aside>
  );
}
