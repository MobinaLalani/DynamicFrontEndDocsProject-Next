import { DocsSidebar } from "./DocsSidebar";
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

  return (
    <div dir="ltr" className="relative min-h-screen overflow-hidden bg-white">
      <div className="relative min-h-screen bg-slate-100">
        <main
          dir="rtl"
          className={`min-w-0 p-4 pt-24 transition-[padding] duration-300 sm:p-6 sm:pt-28 ${
            showSidebar ? "xl:pr-[344px]" : ""
          }`}
        >
          {content ?? (activePage ? <PageRenderer page={activePage} /> : null)}
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
