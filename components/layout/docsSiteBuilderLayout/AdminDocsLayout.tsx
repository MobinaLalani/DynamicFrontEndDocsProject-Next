"use client";

import {
  AdminDocsNavbar,
  AdminDocsSidebar,
} from "@/components/layout/docsSiteBuilderLayout";
import { useSidebar } from "@/context/SidebarContext";

import type { AuthSession } from "@/lib/auth/types";
import type { BuilderView } from "@/features/docs-builder/model";
import type { DocsWorkspace } from "@/lib/docs/workspace";

export default function BuilderLayout({
  children,
  session,
  workspace,
  activeView,
  selectedPageSlug,
  onOpenView,
  onSelectPage,
}: {
  children: React.ReactNode;
  session: AuthSession;
  workspace: DocsWorkspace;
  activeView: BuilderView;
  selectedPageSlug: string;
  onOpenView: (v: BuilderView) => void;
  onSelectPage: (slug: string) => void;
}) {
  const { isOpen } = useSidebar();

  return (
    <section dir="ltr" className="min-h-screen">
      <div
        className={`flex flex-col transition-[padding] duration-300 ${
          isOpen ? "xl:pr-90" : "xl:pr-18"
        }`}
      >
        <AdminDocsNavbar session={session} />

        <main dir="rtl" className="p-6">
          {children}
        </main>
      </div>

      <AdminDocsSidebar
        activeView={activeView}
        workspace={workspace}
        selectedPageSlug={selectedPageSlug}
        onOpenView={onOpenView}
        onSelectPage={onSelectPage}
      />
    </section>
  );
}
