"use client";

import { useState } from "react";
import {
  AdminDocsNavbar,
  AdminDocsSidebar,
} from "@/components/layout/docsSiteBuilderLayout";

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
  onOpenView: (v: unknown) => void;
  onSelectPage: (slug: string) => void;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <section dir="ltr" className="flex min-h-screen overflow-hidden">
      {/* MAIN AREA */}
      <div
        className={`flex flex-1 flex-col transition-[padding] duration-300 ${
          isSidebarOpen ? "xl:pr-[360px]" : "xl:pr-18"
        }`}
      >
        {/* NAVBAR */}
        <AdminDocsNavbar session={session} />

        {/* PAGE CONTENT */}
        <main dir="rtl" className="flex-1 p-6">
          {children}
        </main>
      </div>

      {/* SIDEBAR */}
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
