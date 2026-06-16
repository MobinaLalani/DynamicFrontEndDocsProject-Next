"use client";

import { Sidebar } from "@/components/layout/Sidebar";
import { useSidebar } from "@/context/SidebarContext";
import type { BuilderView } from "@/features/docs-builder/model";
import type { DocsWorkspace } from "@/lib/docs/workspace";

type AdminDocsSidebarProps = {
  activeView: BuilderView;
  workspace: DocsWorkspace;
  selectedPageSlug: string;
  onOpenView: (view: BuilderView) => void;
  onSelectPage: (slug: string) => void;
};

export function AdminDocsSidebar({
  activeView,
  workspace,
  selectedPageSlug,
  onOpenView,
  onSelectPage,
}: AdminDocsSidebarProps) {
  const { isOpen } = useSidebar();

  const baseButton = "transition overflow-hidden";

  const expandedNavButtonClass = (active: boolean) =>
    `w-full rounded-2xl px-4 py-3 text-right font-semibold text-black ${
      active ? "bg-white shadow-sm" : "bg-white"
    } ${baseButton}`;

  const collapsedNavButtonClass =
    "flex h-11 w-11 mx-auto items-center justify-center rounded-2xl bg-white/10 text-white";

  return (
    <Sidebar
      className="border-l border-white/10 bg-(--darkBlue) text-white overflow-hidden"
      expandedWidthClassName="w-full sm:w-[360px]"
    >
      {/* HEADER */}
      <div
        className={`border-b border-white/10 pb-5 overflow-hidden ${
          isOpen ? "px-5" : "px-3"
        }`}
      >
        {isOpen ? (
          <div className="overflow-hidden">
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400 truncate">
              API DOCS CMS
            </p>
            <h2 className="mt-2 text-2xl font-semibold truncate">
              پنل مدیریت داکیومنت
            </h2>
          </div>
        ) : (
          <div className="flex justify-center">
            <span className="rounded-2xl bg-white/10 px-3 py-2 text-xs text-slate-300">
              P
            </span>
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div
        className={`flex-1 overflow-y-auto overflow-x-hidden ${
          isOpen ? "space-y-6 px-5 py-5" : "space-y-3 px-2 py-4"
        }`}
      >
        {/* MAIN ACTIONS */}
        <section className="space-y-2 overflow-hidden">
          {isOpen && (
            <p className="text-xl font-bold text-white truncate">
              بخش‌های اصلی
            </p>
          )}

          {/* COMPONENTS */}
          <button
            type="button"
            onClick={() => (window.location.href = "/componentsSetting")}
            className={
              isOpen ? expandedNavButtonClass(false) : collapsedNavButtonClass
            }
            title="مدیریت کامپوننت ها"
          >
            {isOpen ? "مدیریت کامپوننت ها" : "C"}
          </button>

          {/* CREATE PAGE */}
          <button
            type="button"
            onClick={() => onOpenView("create-page")}
            className={
              isOpen
                ? expandedNavButtonClass(activeView === "create-page")
                : collapsedNavButtonClass
            }
            title="ایجاد صفحه جدید"
          >
            {isOpen ? "ایجاد صفحه جدید" : "+"}
          </button>

          {/* MENUS */}
          <button
            type="button"
            onClick={() => onOpenView("menus")}
            className={
              isOpen
                ? expandedNavButtonClass(activeView === "menus")
                : collapsedNavButtonClass
            }
            title="تعریف منو جدید"
          >
            {isOpen ? "تعریف منو جدید" : "M"}
          </button>
        </section>

        {/* PAGES */}
        <section className="space-y-4 border-t border-white/10 pt-4 overflow-hidden">
          {isOpen && (
            <p className="font-medium text-slate-400 truncate">صفحه‌ها</p>
          )}

          {workspace.menuGroups.map((group) => {
            const groupPages = workspace.pages.filter(
              (page) => page.menuGroupId === group.id,
            );

            return (
              <div key={group.id} className="space-y-3 overflow-hidden">
                {/* GROUP HEADER */}
                {isOpen ? (
                  <div className="overflow-hidden">
                    <p className="font-semibold text-white truncate">
                      {group.title}
                    </p>

                    {group.description && (
                      <p className="mt-1 text-sm text-slate-400 truncate">
                        {group.description}
                      </p>
                    )}
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

                {/* PAGE LIST */}
                <div className="space-y-2 overflow-hidden">
                  {groupPages.map((page) => {
                    const isActive = selectedPageSlug === page.slug;

                    const className = isOpen
                      ? `w-full rounded-2xl px-4 py-3 text-right text-sm transition overflow-hidden ${
                          isActive
                            ? "bg-white text-slate-950 shadow-sm"
                            : "bg-white/5 text-white hover:bg-white/10"
                        }`
                      : `flex h-11 w-11 mx-auto items-center justify-center rounded-2xl transition overflow-hidden ${
                          isActive
                            ? "bg-white text-slate-950 shadow-sm"
                            : "bg-white/5 text-white hover:bg-white/10"
                        }`;

                    return (
                      <button
                        key={page.slug}
                        type="button"
                        onClick={() => onSelectPage(page.slug)}
                        className={className}
                      >
                        {isOpen ? (
                          <div className="min-w-0 overflow-hidden">
                            <span
                              className={`block truncate font-medium ${
                                isActive ? "text-slate-950" : "text-white"
                              }`}
                            >
                              {page.menuTitle}
                            </span>

                            <span
                              className={`mt-1 block truncate text-xs ${
                                isActive ? "text-slate-600" : "text-slate-300"
                              }`}
                            >
                              /pages/{page.slug}
                            </span>
                          </div>
                        ) : (
                          <span className="font-medium">
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

export default AdminDocsSidebar;
