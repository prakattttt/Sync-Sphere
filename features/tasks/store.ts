import { create } from "zustand";

import { initialTasks } from "./data/mock";
import type {
  TaskDialogState,
  TaskFilters,
  TaskInput,
  TaskItem,
  TaskStatus,
} from "./types";

export const DEFAULT_FILTERS: TaskFilters = {
  query: "",
  assignee: "all",
  room: "all",
};

type TasksState = {
  tasks: TaskItem[];
  filters: TaskFilters;
  dialog: TaskDialogState;
  /** Id of the card being dragged (drives the column drop highlight). */
  draggingId: string | null;

  addTask: (input: TaskInput) => void;
  updateTask: (id: string, input: TaskInput) => void;
  deleteTask: (id: string) => void;
  /** Changes status and puts the card at the top of its new column. */
  moveTask: (id: string, status: TaskStatus) => void;

  setFilters: (patch: Partial<TaskFilters>) => void;
  clearFilters: () => void;

  openCreate: (status?: TaskStatus) => void;
  openEdit: (taskId: string) => void;
  closeDialog: () => void;
  setDragging: (id: string | null) => void;
  /** Clears transient view state (filters, dialog, drag). Keeps the tasks. */
  resetView: () => void;
};

/**
 * Board state. Tasks live here because the board, the dialog, the header
 * progress bar and the workspace home all read and change the same list.
 * This is the seam to replace with server actions + live updates later.
 */
export const useTasksStore = create<TasksState>()((set) => ({
  tasks: initialTasks,
  filters: DEFAULT_FILTERS,
  dialog: { mode: "closed" },
  draggingId: null,

  addTask: (input) =>
    set((state) => ({
      tasks: [{ id: crypto.randomUUID(), ...input }, ...state.tasks],
    })),

  updateTask: (id, input) =>
    set((state) => ({
      tasks: state.tasks.map((task) => (task.id === id ? { id, ...input } : task)),
    })),

  deleteTask: (id) =>
    set((state) => ({ tasks: state.tasks.filter((task) => task.id !== id) })),

  moveTask: (id, status) =>
    set((state) => {
      const task = state.tasks.find((item) => item.id === id);
      if (!task || task.status === status) return state;
      return {
        tasks: [
          { ...task, status },
          ...state.tasks.filter((item) => item.id !== id),
        ],
      };
    }),

  setFilters: (patch) => set((state) => ({ filters: { ...state.filters, ...patch } })),
  clearFilters: () => set({ filters: DEFAULT_FILTERS }),

  openCreate: (status = "todo") => set({ dialog: { mode: "create", status } }),
  openEdit: (taskId) => set({ dialog: { mode: "edit", taskId } }),
  closeDialog: () => set({ dialog: { mode: "closed" } }),
  setDragging: (id) => set({ draggingId: id }),
  resetView: () =>
    set({ filters: DEFAULT_FILTERS, dialog: { mode: "closed" }, draggingId: null }),
}));
