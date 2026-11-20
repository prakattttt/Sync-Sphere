import { AppShell } from "@/features/workspace/components/app-shell";

/** Authenticated area. Route protection is added with the backend. */
export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <AppShell>{children}</AppShell>;
}
