"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "motion/react";
import Link from "next/link";
import { useLayoutEffect } from "react";
import { useForm, useWatch } from "react-hook-form";

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
import { registerSchema, type RegisterValues } from "../schemas";
import { useAuthUiStore } from "../store";
import { AuthAlert } from "./auth-alert";
import { AuthFormShell } from "./auth-form-shell";
import { OAuthButtons } from "./oauth-buttons";
import { PasswordStrength } from "./password-strength";

const checkboxLabelClass =
  "cursor-pointer font-sans text-[13px] font-normal normal-case leading-[18px] tracking-normal";

export function RegisterForm() {
  const {
    register,
    handleSubmit,
    control,
    trigger,
    getValues,
    setError,
    resetField,
    formState: { errors },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
    mode: "onTouched",
  });

  const password = useWatch({
    control,
    name: "password",
  });

  const pendingMethod = useAuthUiStore((state) => state.pendingMethod);

  const { signUp } = useAuthFlow();

  // Clear password fields and shared auth UI state
  // whenever this screen is unmounted or hidden.
  useLayoutEffect(() => {
    return () => {
      resetField("password");
      resetField("confirmPassword");
      useAuthUiStore.getState().reset();
    };
  }, [resetField]);

  const onSubmit = handleSubmit(async (values) => {
    const result = await signUp(values);

    if (result && !result.ok && result.field) {
      setError(result.field, {
        type: "server",
        message: result.message,
      });
    }
  });

  return (
    <AuthFormShell
      eyebrow="02 / Create account"
      title="Start your workspace"
      description="Create an account to set up rooms, tasks and docs with your team."
      footer={
        <>
          Already have an account?{" "}
          <Link href={ROUTES.login} className={authLinkClass}>
            Sign in
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
              id="register-name"
              label="Display name"
              error={errors.name?.message}
            >
              <Input
                {...fieldA11y("register-name", errors.name?.message)}
                autoComplete="name"
                placeholder="Ada Lovelace"
                {...register("name")}
              />
            </FormField>
          </motion.div>

          <motion.div variants={fadeUp}>
            <FormField
              id="register-email"
              label="Email"
              error={errors.email?.message}
            >
              <Input
                {...fieldA11y("register-email", errors.email?.message)}
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
              id="register-password"
              label="Password"
              error={errors.password?.message}
              footer={<PasswordStrength password={password} />}
            >
              <PasswordInput
                {...fieldA11y("register-password", errors.password?.message)}
                autoComplete="new-password"
                placeholder="At least 8 characters"
                {...register("password", {
                  onChange: () => {
                    if (getValues("confirmPassword")) {
                      void trigger("confirmPassword");
                    }
                  },
                })}
              />
            </FormField>
          </motion.div>

          <motion.div variants={fadeUp}>
            <FormField
              id="register-confirm"
              label="Confirm password"
              error={errors.confirmPassword?.message}
            >
              <PasswordInput
                {...fieldA11y(
                  "register-confirm",
                  errors.confirmPassword?.message,
                )}
                autoComplete="new-password"
                placeholder="Re-enter your password"
                {...register("confirmPassword")}
              />
            </FormField>
          </motion.div>

          <motion.div variants={fadeUp} className="space-y-1.5">
            <div className="flex items-start gap-2.5">
              <Checkbox
                {...fieldA11y("register-terms", errors.acceptTerms?.message)}
                {...register("acceptTerms")}
              />

              <Label htmlFor="register-terms" className={checkboxLabelClass}>
                I agree to the{" "}
                <Link href={ROUTES.terms} className={authLinkClass}>
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href={ROUTES.privacy} className={authLinkClass}>
                  Privacy Policy
                </Link>
              </Label>
            </div>

            {errors.acceptTerms?.message && (
              <p
                id="register-terms-error"
                role="alert"
                className="text-xs leading-4 text-destructive"
              >
                {errors.acceptTerms.message}
              </p>
            )}
          </motion.div>

          <motion.div variants={fadeUp}>
            <Button
              type="submit"
              className="w-full"
              loading={pendingMethod === "credentials"}
              loadingText="Creating account…"
              disabled={
                pendingMethod !== null && pendingMethod !== "credentials"
              }
            >
              Create account
            </Button>
          </motion.div>
        </form>
      </div>
    </AuthFormShell>
  );
}
