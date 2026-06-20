import { connection } from "next/server";

import { UserShell } from "@/components/layout/UserShell";
import { requireAnyRole } from "@/lib/auth/server";
import { getStoredWorkspace } from "@/lib/docs/workspace-service";
import { SidebarProvider } from "@/context/SidebarContext";

export default async function EditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await connection();
  const session = await requireAnyRole(["admin", "editor"]);
  const workspace = await getStoredWorkspace();

  return (
    <SidebarProvider>
      <UserShell workspace={workspace} session={session}>
        {children}
      </UserShell>
    </SidebarProvider>
  );
}
