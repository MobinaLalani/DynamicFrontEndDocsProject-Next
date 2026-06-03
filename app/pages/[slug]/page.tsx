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
    <main className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col px-4 py-8 sm:px-6 lg:px-8">
      <SessionBar session={session} />
      <DocsSitePreview
        menuGroups={workspace.menuGroups}
        pages={workspace.pages}
        activePageSlug={page.slug}
      />
    </main>
  );
}
