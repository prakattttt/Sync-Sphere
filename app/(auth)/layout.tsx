import { Suspense } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";

import { Logo } from "@/components/shared/logo";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { AuthBrandPanel } from "@/features/auth/components/auth-brand-panel";
import { ROUTES } from "@/lib/constants";
import { getSession } from "@/features/auth/auth-session";

async function AuthSessionCheck() {
  const session = await getSession();

  if (session) {
    redirect("/workspaces");
  }

  return null;
}

/**
 * Shared shell for sign in / register.
 * Desktop: brand column on the left, form on the right.
 * Mobile/tablet: single column with the logo in the header.
 */
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Suspense fallback={null}>
        <AuthSessionCheck />
      </Suspense>

      <div className="grid min-h-dvh lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
        <AuthBrandPanel />

        <div className="flex min-h-dvh flex-col">
          <header className="flex items-center justify-between px-4 py-4 md:px-6">
            <Link href={ROUTES.login} className="rounded-md lg:hidden">
              <Logo />
            </Link>

            <div className="ml-auto">
              <ThemeToggle />
            </div>
          </header>

          <main className="flex flex-1 items-center justify-center px-4 py-6 md:px-6 md:py-10">
            {children}
          </main>

          <footer className="type-label-sm flex items-center justify-center gap-4 px-4 py-5 text-ink-meta">
            <Link href={ROUTES.terms} className="hover:text-foreground">
              Terms
            </Link>

            <span aria-hidden>·</span>

            <Link href={ROUTES.privacy} className="hover:text-foreground">
              Privacy
            </Link>
          </footer>
        </div>
      </div>
    </>
  );
}
