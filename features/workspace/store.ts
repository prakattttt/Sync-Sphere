import { create } from "zustand";

type ShellState = {
  /** Mobile/tablet navigation drawer. Desktop sidebar is always visible. */
  drawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
};

/**
 * Shared shell state: the topbar's menu button opens a drawer that lives in
 * a different component, and nav links inside it must close it.
 */
export const useShellStore = create<ShellState>()((set) => ({
  drawerOpen: false,
  openDrawer: () => set({ drawerOpen: true }),
  closeDrawer: () => set({ drawerOpen: false }),
}));
