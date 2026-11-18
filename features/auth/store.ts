import { create } from "zustand";

import type { AuthMethod } from "./types";

type AuthUiState = {
  /** Which sign-in method is in flight, or null when idle. */
  pendingMethod: AuthMethod | null;
  /** Form-level error shown in the banner above the fields. */
  formError: string | null;
  start: (method: AuthMethod) => void;
  finish: () => void;
  setFormError: (message: string | null) => void;
  reset: () => void;
};

/**
 * Shared UI state for the auth screens. The OAuth buttons, the credentials
 * form and the error banner live in different components but must agree on
 * "what is loading right now", so this lives in a store instead of props.
 */
export const useAuthUiStore = create<AuthUiState>()((set) => ({
  pendingMethod: null,
  formError: null,
  start: (method) => set({ pendingMethod: method }),
  finish: () => set({ pendingMethod: null }),
  setFormError: (message) => set({ formError: message }),
  reset: () => set({ pendingMethod: null, formError: null }),
}));
