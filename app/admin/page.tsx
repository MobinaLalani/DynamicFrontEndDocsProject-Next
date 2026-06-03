import { SessionBar } from "@/components/auth/session-bar";
import { DocsBuilderDemo } from "@/features/docs-builder";
import { requireRole } from "@/lib/auth/server";
import { getStoredWorkspace } from "@/lib/docs/workspace-service";

export default async function AdminPage() {
  const session = await requireRole("admin");
  const workspace = await getStoredWorkspace();

  return (
    <main className="relative flex min-h-screen w-full flex-1 flex-col overflow-hidden bg-slate-100">
      <SessionBar
        session={session}
        className="absolute left-4 top-4 z-30 mb-0 w-[calc(100%-6rem)] max-w-md"
      />
      <DocsBuilderDemo initialWorkspace={workspace} />
    </main>
  );
}
