"use client";

import { SessionMenu } from "@/components/auth/SessionMenu";
import type { AuthSession } from "@/lib/auth/types";

type SessionBarProps = {
  session: AuthSession;
  className?: string;
};

export function SessionBar({ session, className }: SessionBarProps) {
  return (
    <div className={`relative w-fit ${className ?? ""}`}>
      <SessionMenu session={session} />
    </div>
  );
}
