"use client";

import { useRouter } from "next/navigation";

import { Sidebar } from "@/components/layout/Sidebar";
import { SidebarPageItem } from "@/components/layout/sidebar/SidebarPageItem";
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

type NavActionProps = {
  label: string;
  short: string;
  isActive: boolean;
  isExpanded: boolean;
  onClick: () => void;
};

function NavAction({ label, short, isActive, isExpanded, onClick }: NavActionProps) {
  const className = isExpanded
    ? `w-full rounded-2xl px-4 py-3 text-right font-semibold transition overflow-hidden ${
        isActive
          ? "bg-white text-slate-950 shadow-sm"
          : "bg-white/5 text-white hover:bg-white/10"
      }`
    : `flex h-11 w-11 mx-auto items-center justify-center rounded-2xl transition ${
        isActive ? "bg-white text-slate-950 shadow-sm" : "bg-white/5 text-white hover:bg-white/10"
      }`;

  return (
    <button type="button" onClick={onClick} className={className} title={label}>
      {isExpanded ? label : short}
    </button>
  );
}

export function AdminDocsSidebar({
  activeView,
  workspace,
  selectedPageSlug,
  onOpenView,
  onSelectPage,
}: AdminDocsSidebarProps) {
  const { isOpen } = useSidebar();
  const router = useRouter();

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
            <p className="text-xl font-bold text-white truncate">بخش‌های اصلی</p>
          )}

          <NavAction
            label="مدیریت کامپوننت ها"
            short="C"
            isActive={false}
            isExpanded={isOpen}
            onClick={() => router.push("/componentsSetting")}
          />
          <NavAction
            label="ایمپورت از Swagger"
            short="S"
            isActive={false}
            isExpanded={isOpen}
            onClick={() => router.push("/swagger-import")}
          />
          <NavAction
            label="ایجاد صفحه جدید"
            short="+"
            isActive={activeView === "create-page"}
            isExpanded={isOpen}
            onClick={() => onOpenView("create-page")}
          />
          <NavAction
            label="تعریف منو جدید"
            short="M"
            isActive={activeView === "menus"}
            isExpanded={isOpen}
            onClick={() => onOpenView("menus")}
          />
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
                  {groupPages.map((page) => (
                    <SidebarPageItem
                      key={page.slug}
                      title={page.menuTitle}
                      subtitle={`/pages/${page.slug}`}
                      initial={page.menuTitle.slice(0, 1)}
                      isActive={selectedPageSlug === page.slug}
                      isExpanded={isOpen}
                      onClick={() => onSelectPage(page.slug)}
                    />
                  ))}
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
