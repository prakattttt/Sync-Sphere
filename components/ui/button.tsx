"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { LoaderCircle } from "lucide-react";
import { motion, type HTMLMotionProps } from "motion/react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex shrink-0 select-none items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-primary-hover",
        secondary:
          "border border-brand-secondary bg-card text-ink-body hover:bg-surface-nav dark:border-border-strong",
        ghost: "text-brand-secondary hover:bg-surface-nav",
      },
      size: {
        compact: "h-9 px-3 text-[13px]",
        regular: "h-[42px] px-4 text-sm",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "regular",
    },
  },
);

type ButtonProps = Omit<HTMLMotionProps<"button">, "children"> &
  VariantProps<typeof buttonVariants> & {
    children?: React.ReactNode;
    /** Shows a spinner and blocks pointer interaction while true. */
    loading?: boolean;
    /** Replaces the label while `loading` is true. */
    loadingText?: string;
  };

export function Button({
  className,
  variant,
  size,
  loading = false,
  loadingText,
  disabled,
  children,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <motion.button
      type={type}
      disabled={disabled}
      aria-busy={loading || undefined}
      whileTap={disabled || loading ? undefined : { scale: 0.98 }}
      transition={{ duration: 0.12 }}
      className={cn(
        buttonVariants({ variant, size }),
        loading && "pointer-events-none",
        className,
      )}
      {...props}
    >
      {loading ? <LoaderCircle className="animate-spin" aria-hidden /> : null}
      {loading && loadingText ? loadingText : children}
    </motion.button>
  );
}

export { buttonVariants };
