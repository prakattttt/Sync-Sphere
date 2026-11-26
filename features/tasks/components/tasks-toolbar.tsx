"use client";

import { Search, UserRound, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { cn } from "@/lib/utils";

import { currentUser, members, rooms } from "@/features/workspace/data/mock";

import { filterTasks, hasActiveFilters } from "../lib/filter";
import { useTasksStore } from "../store";

export function TasksToolbar() {
  const tasks = useTasksStore((state) => state.tasks);
  const filters = useTasksStore((state) => state.filters);
  const setFilters = useTasksStore((state) => state.setFilters);
  const clearFilters = useTasksStore((state) => state.clearFilters);

  const active = hasActiveFilters(filters);
  const shown = filterTasks(tasks, filters).length;
  const mine = filters.assignee === currentUser.id;

  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
      <div className="relative min-w-0 lg:w-[300px]">
        <Search
          aria-hidden
          className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-meta"
        />
        <Input
          type="search"
          value={filters.query}
          onChange={(event) => setFilters({ query: event.target.value })}
          placeholder="Search tasks"
          aria-label="Search tasks"
          className="h-9 pl-9 text-[13px]"
        />
      </div>

      <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:items-center">
        <Select
          aria-label="Filter by assignee"
          value={filters.assignee}
          onChange={(event) => setFilters({ assignee: event.target.value })}
          className="h-9 text-[13px] sm:w-[170px]"
        >
          <option value="all">All assignees</option>
          <option value="unassigned">Unassigned</option>
          {members.map((member) => (
            <option key={member.id} value={member.id}>
              {member.name}
            </option>
          ))}
        </Select>

        <Select
          aria-label="Filter by room"
          value={filters.room}
          onChange={(event) => setFilters({ room: event.target.value })}
          className="h-9 text-[13px] sm:w-[190px]"
        >
          <option value="all">All rooms</option>
          <option value="none">No room</option>
          {rooms.map((room) => (
            <option key={room.id} value={room.slug}>
              #{room.name}
            </option>
          ))}
        </Select>

        <Button
          variant="secondary"
          size="compact"
          aria-pressed={mine}
          onClick={() => setFilters({ assignee: mine ? "all" : currentUser.id })}
          className={cn(
            "col-span-2 sm:col-span-1",
            mine &&
              "border-chip-brand-border bg-chip-brand-bg text-chip-brand-text hover:bg-chip-brand-bg",
          )}
        >
          <UserRound aria-hidden />
          Assigned to me
        </Button>

        {active ? (
          <Button
            variant="ghost"
            size="compact"
            onClick={clearFilters}
            className="col-span-2 sm:col-span-1"
          >
            <X aria-hidden />
            Clear
          </Button>
        ) : null}
      </div>

      <p
        role="status"
        className="type-label-sm text-ink-meta lg:ml-auto"
      >
        {shown} of {tasks.length} tasks
      </p>
    </div>
  );
}
