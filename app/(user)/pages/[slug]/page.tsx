import { notFound } from "next/navigation";
import { connection } from "next/server";

import { DocsSitePreview } from "@/features/docs-preview";
import { requireAuth } from "@/lib/auth/server";
import { getStoredWorkspace } from "@/lib/docs/workspace-service";

type DynamicPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function DynamicPage({ params }: DynamicPageProps) {
  await connection();
  const session = await requireAuth();
  const { slug } = await params;
  const workspace = await getStoredWorkspace();
  const page = workspace.pages.find((item) => item.slug === slug) ?? null;

  if (!page) {
    notFound();
  }

  return (
    <main className="relative flex min-h-screen w-full flex-1 flex-col overflow-hidden">
      <DocsSitePreview
        menuGroups={workspace.menuGroups}
        pages={workspace.pages}
        activePageSlug={page.slug}
        session={session}
      />
    </main>
  );
}
