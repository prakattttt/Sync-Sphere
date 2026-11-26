import type { TaskFilters, TaskItem } from "../types";

export function hasActiveFilters(filters: TaskFilters): boolean {
  return (
    filters.query.trim() !== "" ||
    filters.assignee !== "all" ||
    filters.room !== "all"
  );
}

export function filterTasks(tasks: TaskItem[], filters: TaskFilters): TaskItem[] {
  const query = filters.query.trim().toLowerCase();

  return tasks.filter((task) => {
    if (query) {
      const haystack = `${task.title} ${task.description}`.toLowerCase();
      if (!haystack.includes(query)) return false;
    }

    if (filters.assignee === "unassigned") {
      if (task.assigneeId !== null) return false;
    } else if (filters.assignee !== "all" && task.assigneeId !== filters.assignee) {
      return false;
    }

    if (filters.room === "none") {
      if (task.roomSlug !== null) return false;
    } else if (filters.room !== "all" && task.roomSlug !== filters.room) {
      return false;
    }

    return true;
  });
}
