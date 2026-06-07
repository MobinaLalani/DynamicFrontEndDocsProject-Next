import { notFound } from "next/navigation";

import { SessionBar } from "@/components/auth/session-bar";
import { DocsSitePreview } from "@/features/docs-preview";
import { requireAuth } from "@/lib/auth/server";
import { getStoredWorkspace } from "@/lib/docs/workspace-service";

type DynamicPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function DynamicPage({ params }: DynamicPageProps) {
  const session = await requireAuth();
  const { slug } = await params;
  const workspace = await getStoredWorkspace();
  const page = workspace.pages.find((item) => item.slug === slug) ?? null;

  if (!page) {
    notFound();
  }

  return (
    <main className="relative flex min-h-screen w-full flex-1 flex-col overflow-hidden bg-slate-100">
      <SessionBar session={session} className="absolute left-4 top-4 z-30" />
      <DocsSitePreview
        menuGroups={workspace.menuGroups}
        pages={workspace.pages}
        activePageSlug={page.slug}
      />
    </main>
  );
}
