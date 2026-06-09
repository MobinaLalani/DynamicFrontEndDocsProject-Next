import { DocsSidebar } from "./DocsSidebar";
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

  return (
    <div dir="ltr" className="relative h-[99vh]  bg-white">
      <div className="relative h-screen bg-slate-100">
        <main
          dir="rtl"
          className={`h-[97vh] min-w-0  p-4 pt-24 transition-[padding] duration-300 sm:p-6 sm:pt-28 ${
            showSidebar ? "xl:pr-[344px]" : ""
          }`}
        >
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
        </main>

        {showSidebar && (
          <DocsSidebar
            menuGroups={menuGroups}
            pages={pages}
            activePageSlug={activePageSlug}
            activeGroupId={activeGroupId}
            session={session}
            interactive={interactive}
            onSelectPage={onSelectPage}
            onCreatePage={onCreatePage}
          />
        )}
      </div>
    </div>
  );
}
