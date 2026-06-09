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

  return (
    <Sidebar
      isOpen={isOpen}
      className="border-l border-white/10 bg-slate-950 text-white"
    >
      <button
        type="button"
        onClick={onToggle}
        aria-label={isOpen ? "بستن سایدبار" : "باز کردن سایدبار"}
        className="absolute -left-5 top-4 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-900 transition hover:bg-slate-100"
      >
        <ArrowIcon
          strokeColor="#0f172a"
          className={`h-4 w-4 transition-transform duration-300 ${
            isOpen ? "rotate-270" : "rotate-90"
          }`}
        />
      </button>

      <div
        className={`border-b border-white/10 px-5 pb-4 pt-16 ${
          isOpen ? "" : "px-3"
        }`}
      >
        {isOpen ? (
          <div className="space-y-2">
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400">
              مستندات API
            </p>
            <h3 className="text-xl font-semibold">منوی داکیومنت</h3>
          </div>
        ) : (
          <div className="flex justify-center">
            <span className="rounded-2xl bg-white/10 px-3 py-2 text-xs text-slate-300">
              منو
            </span>
          </div>
        )}
      </div>

      <div
        className={`mt-5 flex-1 overflow-y-auto ${
          isOpen ? "space-y-5 px-5 pb-5" : "space-y-3 px-3 pb-4"
        }`}
      >
        {interactive && onCreatePage ? (
          <div className="pb-2">
            <button
              type="button"
              onClick={onCreatePage}
              className={`w-full rounded-2xl border border-dashed transition ${
                isOpen
                  ? "border-white/20 bg-emerald-500/15 px-4 py-3 text-right text-sm font-medium text-emerald-100 hover:bg-emerald-500/25"
                  : "flex h-11 items-center justify-center border-white/20 bg-emerald-500/15 text-emerald-100 hover:bg-emerald-500/25"
              }`}
            >
              {isOpen ? "ایجاد صفحه جدید" : "+"}
            </button>
          </div>
        ) : null}

        {visibleMenuGroups.map((group) => {
          const groupPages = pages.filter(
            (page) => page.menuGroupId === group.id,
          );
          const isGroupActive =
            group.id === activeGroupId ||
            groupPages.some((page) => page.slug === activePageSlug);

          return (
            <section key={group.id} className="space-y-3">
              {isOpen ? (
                <div>
                  {interactive ? (
                    <p className="font-semibold">{group.title}</p>
                  ) : (
                    <Link
                      href={`/pages/group/${group.id}`}
                      className={`block rounded-2xl px-3 py-2 font-semibold transition ${
                        isGroupActive
                          ? "bg-white text-black shadow-sm"
                          : "text-white hover:bg-white/10"
                      }`}
                    >
                      {group.title}
                    </Link>
                  )}

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
                  const isActive = page.slug === activePageSlug;
                  const pageClass = isOpen
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

                  return interactive ? (
                    <button
                      key={page.slug}
                      type="button"
                      onClick={() => onSelectPage?.(page.slug)}
                      className={pageClass}
                    >
                      {isOpen ? page.menuTitle : page.menuTitle.slice(0, 1)}
                    </button>
                  ) : (
                    <Link
                      key={page.slug}
                      href={`/pages/${page.slug}`}
                      className={pageClass}
                    >
                      {isOpen ? page.menuTitle : page.menuTitle.slice(0, 1)}
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
