import Link from "next/link";
import { notFound } from "next/navigation";

import { SessionBar } from "@/components/auth/session-bar";
import { DocsSitePreview } from "@/features/docs-preview";
import { requireAuth } from "@/lib/auth/server";
import { getStoredWorkspace } from "@/lib/docs/workspace-service";

type GroupLandingPageProps = {
  params: Promise<{
    groupId: string;
  }>;
};

export default async function GroupLandingPage({
  params,
}: GroupLandingPageProps) {
  const session = await requireAuth();
  const { groupId } = await params;
  const workspace = await getStoredWorkspace();
  const group = workspace.menuGroups.find((item) => item.id === groupId) ?? null;

  if (!group) {
    notFound();
  }

  const groupPages = workspace.pages.filter((page) => page.menuGroupId === group.id);

  return (
    <main className="relative flex min-h-screen w-full flex-1 flex-col overflow-hidden bg-slate-100">
      <SessionBar
        session={session}
        className="absolute left-4 top-4 z-30 mb-0 w-[calc(100%-6rem)] max-w-md"
      />
      <DocsSitePreview
        menuGroups={workspace.menuGroups}
        pages={workspace.pages}
        activeGroupId={group.id}
        content={
          <section className="space-y-6 rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm sm:p-8">
            <header className="space-y-3">
              <p className="text-sm font-medium tracking-[0.2em] text-slate-500">
                /pages/group/{group.id}
              </p>
              <h1 className="text-3xl font-semibold tracking-tight text-slate-950">
                {group.title}
              </h1>
              <p className="max-w-3xl text-base leading-7 text-slate-600">
                {group.description?.trim() ||
                  "در این بخش می‌توانی همه صفحه‌های این زیرمنو را ببینی و وارد هر کدام شوی."}
              </p>
            </header>

            {groupPages.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {groupPages.map((page) => (
                  <Link
                    key={page.slug}
                    href={`/pages/${page.slug}`}
                    className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
                  >
                    <p className="text-lg font-semibold text-slate-950">
                      {page.menuTitle}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {page.description?.trim() || "این صفحه توضیحی ثبت نشده است."}
                    </p>
                    <p className="mt-4 text-xs font-medium text-slate-500">
                      /pages/{page.slug}
                    </p>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-8 text-center text-sm leading-7 text-slate-600">
                هنوز صفحه‌ای برای این زیرمنو تعریف نشده است.
              </div>
            )}
          </section>
        }
      />
    </main>
  );
}
