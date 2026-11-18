import { redirect } from "next/navigation";

import { ROUTES } from "@/lib/constants";

/** Placeholder: the marketing/landing page comes later. Send visitors to sign in. */
export default function HomePage() {
  redirect(ROUTES.login);
}
