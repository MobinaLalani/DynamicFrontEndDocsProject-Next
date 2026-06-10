"use client";

import { useState } from "react";
import {
  DocsSitePreviewFooter,
  DocsSitePreviewNavbar,
  DocsSitePreviewSidebar,
} from "@/components/layout/docsSitePreviewLayout";
import { getDocsRoadmap } from "./model/getDocsRoadmap";
import { getFooterSections } from "./model/getFooterSections";
import { getPageNavigation } from "./model/getPageNavigation";
import { DocsRoadmap } from "./ui/DocsRoadmap";
import { PageNavigation } from "./ui/PageNavigation";
import { PageRenderer } from "../page-renderer";
import type { AuthSession } from "@/lib/auth/types";
import type { DocPage } from "@/lib/docs/schema";
import type { MenuGroup } from "@/lib/docs/workspace";

type DocsSitePreviewProps = {
  menuGroups: MenuGroup[];
  pages: DocPage[];
  activePageSlug?: string;
  activeGroupId?: string;
  session?: AuthSession;
  interactive?: boolean;
  onSelectPage?: (slug: string) => void;
  onCreatePage?: () => void;
  showSidebar?: boolean;
  content?: React.ReactNode;
};
export function DocsSitePreview(props: DocsSitePreviewProps) {
  const {
    menuGroups,
    pages,
    activePageSlug,
    activeGroupId,
    session,
    interactive,
    onSelectPage,
    onCreatePage,
    showSidebar = true,
    content,
  } = props;
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const activePage = activePageSlug
    ? (pages.find((p) => p.slug === activePageSlug) ?? pages[0])
    : undefined;
  const navigation = getPageNavigation(pages, activePage?.slug);
  const resolvedActiveGroupId = activeGroupId ?? activePage?.menuGroupId;
  const footerSections = getFooterSections(
    menuGroups,
    pages,
    resolvedActiveGroupId,
  );
  const activeGroup = menuGroups.find(
    (group) => group.id === resolvedActiveGroupId,
  );
  const roadmapItems = getDocsRoadmap({
    activePage: activePageSlug ? activePage : undefined,
    activeGroup,
  });
  const sidebarPaddingClass = showSidebar
    ? isSidebarOpen
      ? "xl:pr-[344px]"
      : "xl:pr-24"
    : "";
  const navTitle = activePage?.title ?? activeGroup?.title ?? "مستندات API";
  const navSubtitle =
    activePage?.menuTitle ??
    activeGroup?.description?.trim() ??
    "مرور مستندات سرویس‌ها و وب‌سرویس‌ها";

  return (
    <div dir="ltr" className="relative h-screen ">
      <div className="relative h-screen ">
        <div
          className={`absolute inset-x-0 top-0 z-30 transition-[padding] duration-300 ${sidebarPaddingClass}`}
        >
          <DocsSitePreviewNavbar
            session={session}
            title={navTitle}
            subtitle={navSubtitle}
          />
        </div>

        <main
          dir="rtl"
          className={`h-screen min-w-0 overflow-y-auto p-4 pt-28 transition-[padding] duration-300 sm:p-6 sm:pt-32 ${sidebarPaddingClass}`}
        >
          <div className="flex min-h-full flex-col gap-6">
            <div className="flex-1">
              <DocsRoadmap items={roadmapItems} />

              {content ? (
                <div className="mt-6">{content}</div>
              ) : activePage ? (
                <div className="mt-6 flex min-h-[80vh] flex-col gap-4">
                  <PageRenderer
                    page={activePage}
                    className="flex-1 min-h-[calc(80vh-12rem)]"
                  />
                  <PageNavigation
                    previousPage={navigation.previousPage}
                    nextPage={navigation.nextPage}
                    interactive={interactive}
                    onSelectPage={onSelectPage}
                  />
                </div>
              ) : null}
            </div>

            <DocsSitePreviewFooter
              serviceLinks={footerSections.serviceLinks}
              webServiceLinks={footerSections.webServiceLinks}
            />
          </div>
        </main>

        {showSidebar && (
          <DocsSitePreviewSidebar
            isOpen={isSidebarOpen}
            menuGroups={menuGroups}
            pages={pages}
            activePageSlug={activePageSlug}
            activeGroupId={activeGroupId}
            interactive={interactive}
            onToggle={() => setIsSidebarOpen((current) => !current)}
            onSelectPage={onSelectPage}
            onCreatePage={onCreatePage}
          />
        )}
      </div>
    </div>
  );
}
