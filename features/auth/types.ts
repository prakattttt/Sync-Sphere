export type OAuthProvider = "google" | "github";

/** What the user is currently doing; used to disable/spin the right control. */
export type AuthMethod = "credentials" | OAuthProvider;

export type AuthResult =
  | { ok: true }
  | {
      ok: false;
      message: string;
      /** When set, the message belongs to a single field instead of the form. */
      field?: "email" | "password";
    };
