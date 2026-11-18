"use client";

import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

import { ROUTES } from "@/lib/constants";

import { signInWithEmail, signInWithProvider, signUpWithEmail } from "../api";
import type { LoginValues, RegisterValues } from "../schemas";
import { useAuthUiStore } from "../store";
import type { AuthMethod, AuthResult, OAuthProvider } from "../types";

/**
 * Runs an auth action while keeping the shared UI store in sync:
 * marks the method as pending, surfaces form-level errors, and navigates on
 * success. Field-level errors are returned so the calling form can attach
 * them to the right input.
 */
export function useAuthFlow() {
  const router = useRouter();

  const run = useCallback(
    async (
      method: AuthMethod,
      action: () => Promise<AuthResult>,
    ): Promise<AuthResult | undefined> => {
      const { pendingMethod, start, finish, setFormError } =
        useAuthUiStore.getState();

      // Ignore re-entry (double click, Enter key while a request is running).
      if (pendingMethod) return undefined;

      setFormError(null);
      start(method);

      try {
        const result = await action();

        if (!result.ok) {
          if (!result.field) setFormError(result.message);
          finish();
          return result;
        }

        // Keep the spinner running while the next route loads. The store is
        // reset when this screen is hidden (see the forms' layout effects).
        router.push(ROUTES.afterAuth);
        return result;
      } catch {
        setFormError("Something went wrong. Please try again.");
        finish();
        return undefined;
      }
    },
    [router],
  );

  return useMemo(
    () => ({
      signIn: (values: LoginValues) =>
        run("credentials", () => signInWithEmail(values)),
      signUp: (values: RegisterValues) =>
        run("credentials", () => signUpWithEmail(values)),
      signInWithProvider: (provider: OAuthProvider) =>
        run(provider, () => signInWithProvider(provider)),
    }),
    [run],
  );
}
