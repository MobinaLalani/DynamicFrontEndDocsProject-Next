import { connection } from "next/server";

import { DocsBuilderDemo } from "@/features/docs-builder";
import { requireRole } from "@/lib/auth/server";
import { getStoredWorkspace } from "@/lib/docs/workspace-service";

export default async function AdminPage() {
  await connection();
  const session = await requireRole("admin");
  const workspace = await getStoredWorkspace();

  return <DocsBuilderDemo initialWorkspace={workspace} session={session} />;
}
