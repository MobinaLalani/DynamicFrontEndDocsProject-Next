import { DocsBuilderDemo } from "@/features/docs-builder";
import { requireRole } from "@/lib/auth/server";
import { getStoredWorkspace } from "@/lib/docs/workspace-service";

export default async function AdminPage() {
  const session = await requireRole("admin");
  const workspace = await getStoredWorkspace();

  return (
    <main className="relative flex min-h-screen w-full flex-1 flex-col overflow-hidden bg-slate-100">
      <DocsBuilderDemo initialWorkspace={workspace} session={session} />
    </main>
  );
}
