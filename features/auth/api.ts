/**
 * Auth API boundary.
 *
 * FRONTEND-ONLY STUBS. Replace the bodies with your Better Auth client calls
 * (e.g. `authClient.signIn.email`, `authClient.signUp.email`,
 * `authClient.signIn.social`) and map their errors to `AuthResult`.
 * The UI only depends on these function signatures.
 *
 * Demo triggers while the backend is not connected:
 *  - sign in with `error@syncspace.dev`  -> form-level error banner
 *  - register with `taken@syncspace.dev` -> field-level error on email
 */
import type { LoginValues, RegisterValues } from "./schemas";
import type { AuthResult, OAuthProvider } from "./types";

const wait = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

export async function signInWithEmail(values: LoginValues): Promise<AuthResult> {
  await wait(900);

  if (values.email.toLowerCase() === "error@syncspace.dev") {
    return { ok: false, message: "Incorrect email or password. Try again." };
  }
  return { ok: true };
}

export async function signUpWithEmail(
  values: RegisterValues,
): Promise<AuthResult> {
  await wait(1100);

  if (values.email.toLowerCase() === "taken@syncspace.dev") {
    return {
      ok: false,
      field: "email",
      message: "An account with this email already exists.",
    };
  }
  return { ok: true };
}

export async function signInWithProvider(
  provider: OAuthProvider,
): Promise<AuthResult> {
  // Real implementation redirects the browser to the provider.
  void provider;
  await wait(1200);
  return { ok: true };
}
