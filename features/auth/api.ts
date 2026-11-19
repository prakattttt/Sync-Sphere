import { authClient } from "@/lib/auth-client";

import type { LoginValues, RegisterValues } from "./schemas";
import type {
  LoginResult,
  RegisterResult,
  AuthResult,
  OAuthProvider,
} from "./types";

export async function signInWithEmail(
  values: LoginValues,
): Promise<LoginResult> {
  const { error } = await authClient.signIn.email({
    email: values.email,
    password: values.password,
    rememberMe: values.rememberMe,
  });

  if (error) {
    return {
      ok: false,
      message: error.message || "Invalid email or password.",
    };
  }

  return { ok: true };
}

export async function signUpWithEmail(
  values: RegisterValues,
): Promise<RegisterResult> {
  const { error } = await authClient.signUp.email({
    name: values.name,
    email: values.email,
    password: values.password,
  });

  if (error) {
    return {
      ok: false,
      message: error.message || "Unable to create your account.",
    };
  }

  return { ok: true };
}

export async function signInWithProvider(
  provider: OAuthProvider,
): Promise<AuthResult> {
  const { error } = await authClient.signIn.social({
    provider,
    callbackURL: "/",
  });

  if (error) {
    return {
      ok: false,
      message: error.message || `Unable to sign in with ${provider}.`,
    };
  }

  return { ok: true };
}
