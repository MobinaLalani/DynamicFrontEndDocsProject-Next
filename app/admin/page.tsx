import { connection } from "next/server";

import { DocsBuilderDemo } from "@/features/docs-builder";
import { requireRole } from "@/lib/auth/server";
import { getStoredWorkspace } from "@/lib/docs/workspace-service";

export default async function AdminPage() {
  await connection();
  const session = await requireRole("admin");
  const workspace = await getStoredWorkspace();

  return (
    <main className="relative flex min-h-screen w-full flex-1 flex-col overflow-hidden bg-(--color-background)">
      <DocsBuilderDemo initialWorkspace={workspace} session={session} />

      
    </main>
  );
}
