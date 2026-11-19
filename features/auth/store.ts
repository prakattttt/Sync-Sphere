import { create } from "zustand";

import type { AuthMethod } from "./types";

type AuthUiState = {
  pendingMethod: AuthMethod | null;
  formError: string | null;
  start: (method: AuthMethod) => void;
  finish: () => void;
  setFormError: (message: string | null) => void;
  reset: () => void;
};

export const useAuthUiStore = create<AuthUiState>()((set) => ({
  pendingMethod: null,
  formError: null,

  start: (method) =>
    set({
      pendingMethod: method,
      formError: null,
    }),

  finish: () =>
    set({
      pendingMethod: null,
    }),

  setFormError: (message) =>
    set({
      formError: message,
    }),

  reset: () =>
    set({
      pendingMethod: null,
      formError: null,
    }),
}));
