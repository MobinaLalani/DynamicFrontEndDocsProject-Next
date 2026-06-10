import { Sidebar } from "@/components/layout/Sidebar";
import { ArrowIcon } from "@/components/ui/icons/ArrowIcon";
import type { BuilderView } from "@/features/docs-builder/model";
import type { DocsWorkspace } from "@/lib/docs/workspace";

type AdminDocsSidebarProps = {
  isOpen: boolean;
  activeView: BuilderView;
  workspace: DocsWorkspace;
  selectedPageSlug: string;
  onToggle: () => void;
  onOpenView: (view: BuilderView) => void;
  onSelectPage: (slug: string) => void;
};

export function AdminDocsSidebar({
  isOpen,
  activeView,
  workspace,
  selectedPageSlug,
  onToggle,
  onOpenView,
  onSelectPage,
}: AdminDocsSidebarProps) {
  const expandedNavButtonClass = (view: BuilderView) =>
    `w-full rounded-2xl bg-white px-4 py-3 text-right text-lg font-bold text-black transition ${
      activeView === view ? "shadow-sm" : ""
    }`;

  return (
    <Sidebar
      isOpen={isOpen}
      className="border-l border-white/10 bg-(--darkBlue) text-white"
      expandedWidthClassName="w-full sm:w-[360px]"
    >
      <div
        className={`flex items-center justify-end p-4 ${
          isOpen ? "flex-row" : "flex-col gap-2"
        }`}
      >
        <button
          type="button"
          onClick={onToggle}
          aria-label={isOpen ? "بستن سایدبار" : "باز کردن سایدبار"}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-900 transition hover:bg-slate-100"
        >
          <ArrowIcon
            strokeColor="#0f172a"
            className={`h-4 w-4 transition-transform duration-300 ${
              isOpen ? "rotate-270" : "rotate-90"
            }`}
          />
        </button>
      </div>

      <div
        className={`border-b border-white/10 px-5 pb-5 pt-6 ${isOpen ? "" : "px-3"}`}
      >
        {isOpen ? (
          <div className="space-y-3">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400">
                API DOCS CMS
              </p>
              <h2 className="mt-2 text-2xl font-semibold">
                پنل مدیریت داکیومنت
              </h2>
            </div>
            <p className="text-sm leading-6 text-slate-400">
              سایدبار پایه از `components/layout/Sidebar` آمده و محتوای مختص
              ادمین از `docsSiteBuilderLayout` تامین می‌شود.
            </p>
          </div>
        ) : (
          <div className="flex justify-center">
            <span className="rounded-2xl bg-white/10 px-3 py-2 text-xs text-slate-300">
              پنل
            </span>
          </div>
        )}
      </div>

      <div
        className={`flex-1 overflow-y-auto ${isOpen ? "space-y-6 px-5 py-5" : "space-y-3 px-3 py-4"}`}
      >
        <section className="space-y-2">
          {isOpen ? (
            <p className="text-xs font-medium text-slate-400">بخش‌های اصلی</p>
          ) : null}

          <button
            type="button"
            onClick={() => onOpenView("create-page")}
            className={
              isOpen
                ? expandedNavButtonClass("create-page")
                : "flex h-11 w-full items-center justify-center rounded-2xl bg-white/10 text-white transition hover:bg-white/20"
            }
            title="ایجاد صفحه جدید"
          >
            {isOpen ? "ایجاد صفحه جدید" : "+"}
          </button>

          <button
            type="button"
            onClick={() => onOpenView("menus")}
            className={
              isOpen
                ? expandedNavButtonClass("menus")
                : "flex h-11 w-full items-center justify-center rounded-2xl bg-white/10 text-white transition hover:bg-white/20"
            }
            title="تعریف منو جدید"
          >
            {isOpen ? "تعریف منو جدید" : "م"}
          </button>
        </section>

        <section className="space-y-4 border-t border-white/10 pt-4">
          {isOpen ? (
            <p className="text-xs font-medium text-slate-400">صفحه‌ها</p>
          ) : null}

          {workspace.menuGroups.map((group) => {
            const groupPages = workspace.pages.filter(
              (page) => page.menuGroupId === group.id,
            );

            return (
              <div key={group.id} className="space-y-3">
                {isOpen ? (
                  <div>
                    <p className="font-semibold text-white">{group.title}</p>
                    {group.description ? (
                      <p className="mt-1 text-sm leading-6 text-slate-400">
                        {group.description}
                      </p>
                    ) : null}
                  </div>
                ) : (
                  <div className="flex justify-center">
                    <span
                      title={group.title}
                      className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-xs font-semibold text-white"
                    >
                      {group.title.slice(0, 1)}
                    </span>
                  </div>
                )}

                <div className="space-y-2">
                  {groupPages.map((page) => {
                    const isActive =
                      activeView !== "create-page" &&
                      selectedPageSlug === page.slug;

                    const pageButtonClass = isOpen
                      ? `block w-full rounded-2xl px-4 py-3 text-right text-sm transition ${
                          isActive
                            ? "bg-white text-slate-950 shadow-sm"
                            : "bg-white/5 text-slate-200 hover:bg-white/10"
                        }`
                      : `flex h-11 w-full items-center justify-center rounded-2xl text-sm transition ${
                          isActive
                            ? "bg-white text-slate-950 shadow-sm"
                            : "bg-white/5 text-slate-200 hover:bg-white/10"
                        }`;

                    return (
                      <button
                        key={page.slug}
                        type="button"
                        onClick={() => onSelectPage(page.slug)}
                        className={pageButtonClass}
                      >
                        {isOpen ? (
                          <>
                            <span className="block font-medium text-black">
                              {page.menuTitle}
                            </span>
                            <span className="mt-1 block text-xs text-black">
                              /pages/{page.slug}
                            </span>
                          </>
                        ) : (
                          <span
                            title={page.menuTitle}
                            className="font-medium text-black"
                          >
                            {page.menuTitle.slice(0, 1)}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </section>
      </div>
    </Sidebar>
  );
}
