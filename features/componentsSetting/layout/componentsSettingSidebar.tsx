import React from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { componentsSettingSidebarType } from "../types/componentsSettingType";
import { MenuGroup } from "@/lib/docs/workspace";


export const mockMenuGroups: MenuGroup[] = [
  {
    id: "group-1",
    title: "مدیریت محتوا",
    description: "ساخت و مدیریت صفحات داکیومنت و API",
    isActive: true,
  },
  {
    id: "group-2",
    title: "تنظیمات سیستم",
    description: "تنظیمات کلی و پیکربندی پروژه",
    isActive: true,
  },
  {
    id: "group-3",
    title: "کاربران",
    description: "مدیریت کاربران و دسترسی‌ها",
    isActive: true,
  },
  {
    id: "group-4",
    title: "بایگانی",
    description: "صفحات و آیتم‌های آرشیو شده",
    isActive: false,
  },
  {
    id: "group-5",
    title: "تست‌ها",
    description: "محیط تست و دیباگ کامپوننت‌ها",
    isActive: true,
  },
];
export function ComponentsSettingSidebar({
  isOpen,
  menuGroups,
  pages,
  activePageSlug,
  activeGroupId,
  interactive = false,
  onSelectPage,
  onCreatePage,
}: componentsSettingSidebarType) {
  
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
              Components Settings
            </p>
            <h2 className="mt-2 text-2xl font-semibold truncate">
              تنظیمات کامپوننت‌ها
            </h2>
          </div>
        ) : (
          <div className="flex justify-center">
            <span className="rounded-2xl bg-white/10 px-3 py-2 text-xs text-slate-300">
              C
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
        {/* CREATE */}
        {interactive && onCreatePage && (
          <button
            type="button"
            onClick={onCreatePage}
            className={
              isOpen
                ? "w-full rounded-2xl border border-dashed border-white/20 bg-emerald-500/10 px-4 py-3 text-right text-sm font-medium text-emerald-100 hover:bg-emerald-500/20"
                : "flex h-11 w-11 mx-auto items-center justify-center rounded-2xl border border-white/20 bg-emerald-500/10 text-emerald-100"
            }
          >
            {isOpen ? "ایجاد کامپوننت جدید" : "+"}
          </button>
        )}

        {/* GROUPS */}
        {mockMenuGroups?.map((group) => {
          const groupPages = pages?.filter((p) => p.menuGroupId === group.id);

          const isActiveGroup =
            group.id === activeGroupId ||
            groupPages?.some((p) => p.slug === activePageSlug);

          return (
            <section key={group.id} className="space-y-3 overflow-hidden">
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

              {/* PAGES */}
              <div className="space-y-2 overflow-hidden">
                {groupPages?.map((page) => {
                  const isActive = page.slug === activePageSlug;

                  const baseClass = isOpen
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
                      onClick={() => onSelectPage?.(page.slug)}
                      className={baseClass}
                      title={page.menuTitle}
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
                            /components/{page.slug}
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
            </section>
          );
        })}
      </div>
    </Sidebar>
  );
}
