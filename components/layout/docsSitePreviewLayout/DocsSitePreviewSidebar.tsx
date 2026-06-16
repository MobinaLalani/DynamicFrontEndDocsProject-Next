"use client";

import Link from "next/link";
import { Sidebar } from "@/components/layout/Sidebar";
import type { DocPage } from "@/lib/docs/schema";
import type { MenuGroup } from "@/lib/docs/workspace";

type DocsSitePreviewSidebarProps = {
  isOpen: boolean;
  menuGroups: MenuGroup[];
  pages: DocPage[];
  activePageSlug?: string;
  activeGroupId?: string;
  interactive?: boolean;
  onToggle: () => void;
  onSelectPage?: (slug: string) => void;
  onCreatePage?: () => void;
};

export function DocsSitePreviewSidebar({
  isOpen,
  menuGroups,
  pages,
  activePageSlug,
  activeGroupId,
  interactive = false,
  onSelectPage,
  onCreatePage,
}: DocsSitePreviewSidebarProps) {
  const visibleMenuGroups = interactive
    ? menuGroups
    : menuGroups.filter((group) => group.isActive);

  const pageButtonClass = (active: boolean) =>
    isOpen
      ? `w-full min-w-0 overflow-hidden rounded-2xl px-4 py-3 text-right text-sm transition ${
          active
            ? "bg-white text-slate-950 shadow-sm"
            : "bg-white/5 text-white hover:bg-white/10"
        }`
      : `flex h-11 w-11 mx-auto items-center justify-center overflow-hidden rounded-2xl text-sm transition ${
          active
            ? "bg-white text-slate-950 shadow-sm"
            : "bg-white/5 text-white hover:bg-white/10"
        }`;

  return (
    <Sidebar
      className="border-l border-white/10 bg-(--darkBlue) text-white overflow-hidden"
      expandedWidthClassName="w-full sm:w-[360px]"
    >
      {/* HEADER */}
      <div
        className={`border-b border-white/10 px-5 pb-5 overflow-hidden ${
          isOpen ? "" : "px-3"
        }`}
      >
        {isOpen ? (
          <div className="overflow-hidden">
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400 truncate">
              مستندات API
            </p>
            <h2 className="mt-2 text-2xl font-semibold truncate">
              منوی داکیومنت
            </h2>
          </div>
        ) : (
          <div className="flex justify-center">
            <span className="rounded-2xl bg-white/10 px-3 py-2 text-xs text-slate-300">
              M
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
        {/* CREATE PAGE */}
        {interactive && onCreatePage && (
          <button
            type="button"
            onClick={onCreatePage}
            className={
              isOpen
                ? "w-full overflow-hidden rounded-2xl border border-dashed border-white/20 bg-emerald-500/10 px-4 py-3 text-right text-sm font-medium text-emerald-100 hover:bg-emerald-500/20"
                : "flex h-11 w-11 mx-auto items-center justify-center overflow-hidden rounded-2xl border border-white/20 bg-emerald-500/10 text-emerald-100 hover:bg-emerald-500/20"
            }
          >
            {isOpen ? "ایجاد صفحه جدید" : "+"}
          </button>
        )}

        {/* GROUPS */}
        {visibleMenuGroups.map((group) => {
          const groupPages = pages.filter(
            (page) => page.menuGroupId === group.id,
          );

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
                {groupPages.map((page) => {
                  const isActive = page.slug === activePageSlug;

                  return interactive ? (
                    <button
                      key={page.slug}
                      type="button"
                      onClick={() => onSelectPage?.(page.slug)}
                      className={pageButtonClass(isActive)}
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
                  ) : (
                    <Link
                      key={page.slug}
                      href={`/pages/${page.slug}`}
                      className={pageButtonClass(isActive)}
                    >
                      {isOpen ? (
                        <span
                          className={`block truncate font-medium ${
                            isActive ? "text-slate-950" : "text-white"
                          }`}
                        >
                          {page.menuTitle}
                        </span>
                      ) : (
                        <span className="font-medium">
                          {page.menuTitle.slice(0, 1)}
                        </span>
                      )}
                    </Link>
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

export default DocsSitePreviewSidebar;
