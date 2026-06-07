import { notFound, redirect } from "next/navigation";
import { connection } from "next/server";

import { requireAuth } from "@/lib/auth/server";
import { getStoredWorkspace } from "@/lib/docs/workspace-service";

export default async function DocsIndexPage() {
  await connection();
  await requireAuth();

  const workspace = await getStoredWorkspace();
  const firstGroup = workspace.menuGroups[0];
  const firstPage = workspace.pages[0];

  if (firstGroup) {
    redirect(`/pages/group/${firstGroup.id}`);
  }

  if (!firstPage) {
    notFound();
  }

  redirect(`/pages/${firstPage.slug}`);
}
