import { SessionBar } from "@/components/auth/session-bar";
import { DocsBuilderDemo } from "@/features/docs-builder";
import { requireRole } from "@/lib/auth/server";
import { getStoredWorkspace } from "@/lib/docs/workspace-service";

export default async function AdminPage() {
  const session = await requireRole("admin");
  const workspace = await getStoredWorkspace();

  return (
    <main className="flex w-full flex-1 flex-col p-4 sm:p-6">
      <SessionBar session={session} />
      <DocsBuilderDemo initialWorkspace={workspace} />
    </main>
  );
}
