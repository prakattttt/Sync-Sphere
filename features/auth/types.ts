export type OAuthProvider = "google" | "github";

export type AuthMethod = "credentials" | OAuthProvider;

export type LoginField = "email" | "password";

export type RegisterField =
  | "name"
  | "email"
  | "password"
  | "confirmPassword"
  | "acceptTerms";

export type AuthResult<TField extends string = never> =
  | { ok: true }
  | {
      ok: false;
      message: string;
      field?: TField;
    };

export type LoginResult = AuthResult<LoginField>;
export type RegisterResult = AuthResult<RegisterField>;
