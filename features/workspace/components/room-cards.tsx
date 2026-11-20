"use client";

import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

import { ROUTES } from "@/lib/constants";
import { fadeUp, staggerContainer } from "@/lib/motion";

import { rooms } from "../data/mock";

export function RoomCards() {
  return (
    <section aria-labelledby="rooms-heading" className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 id="rooms-heading" className="type-headline-sm text-foreground">
          Jump back in
        </h2>
        <span className="type-label-sm uppercase text-ink-meta">
          {rooms.length} rooms
        </span>
      </div>

      <motion.ul
        variants={staggerContainer}
        className="grid gap-3 md:grid-cols-3 lg:gap-4"
      >
        {rooms.map((room) => (
          <motion.li key={room.id} variants={fadeUp}>
            <Link
              href={ROUTES.room(room.slug)}
              className="panel group flex h-full flex-col gap-3 p-4 transition-colors hover:border-border-strong"
            >
              <div className="flex items-center gap-2">
                <span className="row-prefix">#</span>
                <span className="truncate text-sm font-semibold text-foreground">
                  {room.name}
                </span>
                {room.unread > 0 ? (
                  <span className="type-label-sm grid h-4 min-w-4 place-items-center rounded-full bg-tertiary px-1 text-tertiary-foreground">
                    <span className="sr-only">{room.unread} unread</span>
                    <span aria-hidden>{room.unread}</span>
                  </span>
                ) : null}
                <ArrowUpRight
                  className="ml-auto size-4 text-ink-meta transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
                  aria-hidden
                />
              </div>

              <p className="type-body-sm line-clamp-2 flex-1 text-ink-body">
                <span className="font-semibold text-foreground">{room.lastAuthor}:</span>{" "}
                {room.lastMessage}
              </p>

              <div className="type-label-sm flex items-center justify-between text-ink-meta">
                <span className="inline-flex items-center gap-1.5">
                  <span aria-hidden className="size-1.5 rounded-full bg-primary" />
                  {room.online} online
                </span>
                <span>{room.lastAt}</span>
              </div>
            </Link>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}
