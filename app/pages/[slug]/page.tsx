import { notFound } from "next/navigation";

import { SessionBar } from "@/components/auth/session-bar";
import { DocsSitePreview } from "@/features/docs-preview";
import { requireAuth } from "@/lib/auth/server";
import { getAllPages, getPageBySlug } from "@/lib/docs/page-service";
import { sampleMenuGroups } from "@/lib/docs/workspace";

type DynamicPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function DynamicPage({ params }: DynamicPageProps) {
  const session = await requireAuth();
  const { slug } = await params;
  const pages = await getAllPages();
  const page = await getPageBySlug(slug);

  if (!page) {
    notFound();
  }

  return (
    <main className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col px-4 py-8 sm:px-6 lg:px-8">
      <SessionBar session={session} />
      <DocsSitePreview
        menuGroups={sampleMenuGroups}
        pages={pages}
        activePageSlug={page.slug}
      />
    </main>
  );
}
