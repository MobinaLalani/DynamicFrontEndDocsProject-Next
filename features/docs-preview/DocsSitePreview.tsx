import {
  DocsSitePreviewFooter,
  DocsSitePreviewNavbar,
  DocsSitePreviewSidebar,
} from "@/components/layout/docsSitePreviewLayout";
import { getFooterSections } from "./model/getFooterSections";
import { getPageNavigation } from "./model/getPageNavigation";
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

  const activePage = pages.find((p) => p.slug === activePageSlug) ?? pages[0];
  const navigation = getPageNavigation(pages, activePage?.slug);
  const footerSections = getFooterSections(menuGroups, pages, activeGroupId);
  const activeGroup = menuGroups.find((group) => group.id === activeGroupId);
  const navTitle = activePage?.title ?? activeGroup?.title ?? "مستندات API";
  const navSubtitle =
    activePage?.menuTitle ??
    activeGroup?.description?.trim() ??
    "مرور مستندات سرویس‌ها و وب‌سرویس‌ها";

  return (
    <div dir="ltr" className="relative h-screen bg-white">
      <div className="relative h-screen bg-slate-100">
        <div
          className={`absolute inset-x-0 top-0 z-30 ${
            showSidebar ? "xl:pr-[344px]" : ""
          }`}
        >
          <DocsSitePreviewNavbar
            session={session}
            title={navTitle}
            subtitle={navSubtitle}
          />
        </div>

        <main
          dir="rtl"
          className={`h-screen min-w-0 overflow-y-auto p-4 pt-28 transition-[padding] duration-300 sm:p-6 sm:pt-32 ${
            showSidebar ? "xl:pr-[344px]" : ""
          }`}
        >
          <div className="space-y-6">
            {content ??
              (activePage ? (
                <div className="flex min-h-[80vh] flex-col gap-4">
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
              ) : null)}

            <DocsSitePreviewFooter
              serviceLinks={footerSections.serviceLinks}
              webServiceLinks={footerSections.webServiceLinks}
            />
          </div>
        </main>

        {showSidebar && (
          <DocsSitePreviewSidebar
            menuGroups={menuGroups}
            pages={pages}
            activePageSlug={activePageSlug}
            activeGroupId={activeGroupId}
            interactive={interactive}
            onSelectPage={onSelectPage}
            onCreatePage={onCreatePage}
          />
        )}
      </div>
    </div>
  );
}
