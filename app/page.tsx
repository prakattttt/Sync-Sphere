import { requireSession } from "@/features/auth/auth-session";

export default async function HomePage() {
  const session = await requireSession();
  return (
    <div>Welcome, {session.user.name}!</div>
  )
}
