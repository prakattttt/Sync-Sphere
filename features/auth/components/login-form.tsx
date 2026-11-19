"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "motion/react";
import Link from "next/link";
import { useLayoutEffect } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Divider } from "@/components/ui/divider";
import { FormField, fieldA11y } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";
import { ROUTES } from "@/lib/constants";
import { fadeUp } from "@/lib/motion";

import { useAuthFlow } from "../hooks/use-auth-flow";
import { authLinkClass } from "../lib/styles";
import { loginSchema, type LoginValues } from "../schemas";
import { useAuthUiStore } from "../store";
import { AuthAlert } from "./auth-alert";
import { AuthFormShell } from "./auth-form-shell";
import { OAuthButtons } from "./oauth-buttons";

const checkboxLabelClass =
  "cursor-pointer font-sans text-[13px] font-normal normal-case leading-[18px] tracking-normal";

export function LoginForm() {
  const {
    register,
    handleSubmit,
    resetField,
    setError,
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: true,
    },
    mode: "onTouched",
  });

  const pendingMethod = useAuthUiStore((state) => state.pendingMethod);

  const { signIn } = useAuthFlow();

  // Clear the password and shared auth UI state
  // whenever this screen is unmounted or hidden.
  useLayoutEffect(() => {
    return () => {
      resetField("password");
      useAuthUiStore.getState().reset();
    };
  }, [resetField]);

  const onSubmit = handleSubmit(async (values) => {
    const result = await signIn(values);

    if (result && !result.ok && result.field) {
      setError(result.field, {
        type: "server",
        message: result.message,
      });
    }
  });

  return (
    <AuthFormShell
      eyebrow="01 / Sign in"
      title="Welcome back"
      description="Sign in to pick up where your team left off."
      footer={
        <>
          New to SyncSpace?{" "}
          <Link href={ROUTES.register} className={authLinkClass}>
            Create an account
          </Link>
        </>
      }
    >
      <div className="space-y-5">
        <motion.div variants={fadeUp}>
          <OAuthButtons />
        </motion.div>

        <motion.div variants={fadeUp}>
          <Divider label="or with email" />
        </motion.div>

        <form onSubmit={onSubmit} noValidate className="space-y-4">
          <AuthAlert />

          <motion.div variants={fadeUp}>
            <FormField
              id="login-email"
              label="Email"
              error={errors.email?.message}
            >
              <Input
                {...fieldA11y("login-email", errors.email?.message)}
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="you@team.com"
                {...register("email")}
              />
            </FormField>
          </motion.div>

          <motion.div variants={fadeUp}>
            <FormField
              id="login-password"
              label="Password"
              error={errors.password?.message}
              action={
                <Link
                  href={ROUTES.forgotPassword}
                  className={`type-label-sm normal-case ${authLinkClass}`}
                >
                  Forgot password?
                </Link>
              }
            >
              <PasswordInput
                {...fieldA11y("login-password", errors.password?.message)}
                autoComplete="current-password"
                placeholder="Enter your password"
                {...register("password")}
              />
            </FormField>
          </motion.div>

          <motion.div variants={fadeUp} className="flex items-center gap-2.5">
            <Checkbox id="login-remember" {...register("rememberMe")} />

            <Label htmlFor="login-remember" className={checkboxLabelClass}>
              Keep me signed in on this device
            </Label>
          </motion.div>

          <motion.div variants={fadeUp}>
            <Button
              type="submit"
              className="w-full"
              loading={pendingMethod === "credentials"}
              loadingText="Signing in…"
              disabled={
                pendingMethod !== null && pendingMethod !== "credentials"
              }
            >
              Sign in
            </Button>
          </motion.div>
        </form>
      </div>
    </AuthFormShell>
  );
}
