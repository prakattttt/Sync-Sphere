export const APP_NAME = "SyncSpace";

export const ROUTES = {
  home: "/",
  login: "/login",
  register: "/register",
  forgotPassword: "/forgot-password",
  terms: "/terms",
  privacy: "/privacy",
  /** Where a user lands after a successful sign in or registration. */
  afterAuth: "/workspaces",
} as const;
