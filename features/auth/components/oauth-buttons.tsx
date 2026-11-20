"use client";

import { FaGoogle, FaGithub } from "react-icons/fa";
import type { IconType } from "react-icons";
import { Button } from "@/components/ui/button";

import { useAuthFlow } from "../hooks/use-auth-flow";
import { useAuthUiStore } from "../store";
import type { OAuthProvider } from "../types";

const PROVIDERS: {
  id: OAuthProvider;
  label: string;
  Icon: IconType;
}[] = [
  { id: "google", label: "Google", Icon: FaGoogle },
  { id: "github", label: "GitHub", Icon: FaGithub },
];

/** "Continue with" buttons. Disabled while any other method is in flight. */
export function OAuthButtons() {
  const pendingMethod = useAuthUiStore((state) => state.pendingMethod);
  const { signInWithProvider } = useAuthFlow();

  return (
    <div className="grid grid-cols-2 gap-3">
      {PROVIDERS.map(({ id, label, Icon }) => (
        <Button
          key={id}
          variant="secondary"
          aria-label={`Continue with ${label}`}
          loading={pendingMethod === id}
          loadingText={label}
          disabled={pendingMethod !== null && pendingMethod !== id}
          onClick={() => signInWithProvider(id)}
        >
          <Icon className="size-4" />
          {label}
        </Button>
      ))}
    </div>
  );
}
