import { connection } from "next/server";

import { UserShell } from "@/components/layout/UserShell";
import { requireAuth } from "@/lib/auth/server";
import { getStoredWorkspace } from "@/lib/docs/workspace-service";

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await connection();
  const session = await requireAuth();
  const workspace = await getStoredWorkspace();

  return (
    <UserShell workspace={workspace} session={session}>
      {children}
    </UserShell>
  );
}
