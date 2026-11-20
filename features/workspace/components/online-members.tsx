"use client";

import { UserPlus } from "lucide-react";
import { motion } from "motion/react";

import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";
import { fadeUp, staggerContainer } from "@/lib/motion";

import { members } from "../data/mock";

// Online members first, then by name.
const sorted = [...members].sort(
  (a, b) => Number(b.online) - Number(a.online) || a.name.localeCompare(b.name),
);

export function OnlineMembers() {
  const onlineCount = members.filter((member) => member.online).length;

  return (
    <Panel title="Members" meta={`${onlineCount} online`}>
      <motion.ul variants={staggerContainer} className="divide-y">
        {sorted.map((member) => (
          <motion.li
            key={member.id}
            variants={fadeUp}
            className="flex items-center gap-3 px-4 py-2.5"
          >
            <Avatar initials={member.initials} online={member.online} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-semibold leading-4 text-foreground">
                {member.name}
              </p>
              <p className="type-label-sm truncate text-ink-meta">
                {member.online ? member.location : "offline"}
              </p>
            </div>
            <span className="chip chip-neutral">{member.role}</span>
          </motion.li>
        ))}
      </motion.ul>
      <div className="border-t p-3">
        <Button variant="secondary" size="compact" className="w-full">
          <UserPlus aria-hidden />
          Invite member
        </Button>
      </div>
    </Panel>
  );
}
