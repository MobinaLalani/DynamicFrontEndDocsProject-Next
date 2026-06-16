"use client";
import Link from "next/link";

import { Sidebar } from "@/components/layout/Sidebar";
import { ArrowIcon } from "@/components/ui/icons/ArrowIcon";
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
  onToggle,
  onSelectPage,
  onCreatePage,
}: DocsSitePreviewSidebarProps) {
  const visibleMenuGroups = interactive
    ? menuGroups
    : menuGroups.filter((group) => group.isActive);

  const pageButtonClass = (active: boolean) =>
    isOpen
      ? `block w-full rounded-2xl px-4 py-3 text-right text-sm transition ${
          active
            ? "bg-white text-slate-950 shadow-sm"
            : "bg-white/5 text-white hover:bg-white/10"
        }`
      : `flex h-11 w-full items-center justify-center rounded-2xl text-sm transition ${
          active
            ? "bg-white text-slate-950 shadow-sm"
            : "bg-white/5 text-white hover:bg-white/10"
        }`;

  return (
    <Sidebar
      className="border-l border-white/10 bg-(--darkBlue) text-white"
      expandedWidthClassName="w-full sm:w-[360px]"
    >
      {/* toggle */}
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

      {/* header */}
      <div
        className={`border-b border-white/10 px-5 pb-5 ${isOpen ? "" : "px-3"}`}
      >
        {isOpen ? (
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400">
              مستندات API
            </p>
            <h2 className="mt-2 text-2xl font-semibold">منوی داکیومنت</h2>
          </div>
        ) : (
          <div className="flex justify-center">
            <span className="rounded-2xl bg-white/10 px-3 py-2 text-xs text-slate-300">
              منو
            </span>
          </div>
        )}
      </div>

      {/* content */}
      <div
        className={`flex-1 overflow-y-auto ${
          isOpen ? "space-y-6 px-5 py-5" : "space-y-3 px-3 py-4"
        }`}
      >
        {/* create page */}
        {interactive && onCreatePage ? (
          <button
            type="button"
            onClick={onCreatePage}
            className={
              isOpen
                ? "w-full rounded-2xl border border-dashed border-white/20 bg-emerald-500/10 px-4 py-3 text-right text-sm font-medium text-emerald-100 hover:bg-emerald-500/20"
                : "flex h-11 w-full items-center justify-center rounded-2xl border border-white/20 bg-emerald-500/10 text-emerald-100 hover:bg-emerald-500/20"
            }
          >
            {isOpen ? "ایجاد صفحه جدید" : "+"}
          </button>
        ) : null}

        {/* groups */}
        {visibleMenuGroups.map((group) => {
          const groupPages = pages.filter(
            (page) => page.menuGroupId === group.id,
          );

          const isGroupActive =
            group.id === activeGroupId ||
            groupPages.some((p) => p.slug === activePageSlug);

          return (
            <section key={group.id} className="space-y-3">
              {isOpen ? (
                <div>
                  <p className="font-semibold text-white">{group.title}</p>
                  {group.description ? (
                    <p className="mt-1 text-sm text-slate-400">
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

              {/* pages */}
              <div className="space-y-2">
                {groupPages.map((page) => {
                  const isActive = page.slug === activePageSlug;

                  const baseClass = pageButtonClass(isActive);

                  return interactive ? (
                    <button
                      key={page.slug}
                      type="button"
                      onClick={() => onSelectPage?.(page.slug)}
                      className={baseClass}
                    >
                      {isOpen ? (
                        <div>
                          <span
                            className={`block font-medium ${
                              isActive ? "text-slate-950" : "text-white"
                            }`}
                          >
                            {page.menuTitle}
                          </span>

                          <span
                            className={`mt-1 block text-xs ${
                              isActive ? "text-slate-600" : "text-slate-300"
                            }`}
                          >
                            /pages/{page.slug}
                          </span>
                        </div>
                      ) : (
                        <span
                          className={`font-medium ${
                            isActive ? "text-slate-950" : "text-white"
                          }`}
                        >
                          {page.menuTitle.slice(0, 1)}
                        </span>
                      )}
                    </button>
                  ) : (
                    <Link
                      key={page.slug}
                      href={`/pages/${page.slug}`}
                      className={baseClass}
                    >
                      {isOpen ? (
                        <span
                          className={`font-medium ${
                            isActive ? "text-slate-950" : "text-slate-200"
                          }`}
                        >
                          {page.menuTitle}
                        </span>
                      ) : (
                        <span
                          className={`font-medium ${
                            isActive ? "text-slate-950" : "text-white"
                          }`}
                        >
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
