"use client";

import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

import { ROUTES } from "@/lib/constants";

import { signInWithEmail, signInWithProvider, signUpWithEmail } from "../api";

import type { LoginValues, RegisterValues } from "../schemas";

import { useAuthUiStore } from "../store";

import type { AuthMethod, AuthResult, OAuthProvider } from "../types";

export function useAuthFlow() {
  const router = useRouter();

  const run = useCallback(
    async <TField extends string>(
      method: AuthMethod,
      action: () => Promise<AuthResult<TField>>,
    ): Promise<AuthResult<TField> | undefined> => {
      const { pendingMethod, start, finish, setFormError } =
        useAuthUiStore.getState();

      if (pendingMethod) return undefined;

      setFormError(null);
      start(method);

      try {
        const result = await action();

        if (!result.ok) {
          if (!result.field) {
            setFormError(result.message);
          }

          finish();
          return result;
        }

        router.replace(ROUTES.afterAuth);
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
