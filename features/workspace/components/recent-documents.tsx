"use client";

import { FileText, Plus } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";
import { ROUTES } from "@/lib/constants";
import { fadeUp, staggerContainer } from "@/lib/motion";

import { documents } from "../data/mock";

export function RecentDocuments() {
  return (
    <Panel
      title="Documents"
      meta={String(documents.length)}
      action={
        <Button variant="ghost" size="icon" aria-label="New document" className="-mr-2 size-8">
          <Plus aria-hidden />
        </Button>
      }
    >
      <motion.ul variants={staggerContainer} className="divide-y">
        {documents.map((doc) => (
          <motion.li key={doc.id} variants={fadeUp}>
            <Link
              href={ROUTES.documents}
              className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-background"
            >
              <span className="grid size-8 shrink-0 place-items-center rounded-md border bg-surface-nav text-brand-secondary">
                <FileText className="size-4" aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-semibold leading-4 text-foreground">
                  {doc.title}
                </p>
                <p className="type-label-sm text-ink-meta">{doc.updated}</p>
              </div>
              <div className="flex -space-x-1">
                {doc.editors.map((initials) => (
                  <Avatar
                    key={initials}
                    initials={initials}
                    size="sm"
                    className="ring-2 ring-card"
                  />
                ))}
              </div>
            </Link>
          </motion.li>
        ))}
      </motion.ul>
    </Panel>
  );
}
