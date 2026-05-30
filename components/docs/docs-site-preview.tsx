"use client";

import Link from "next/link";
import { useState } from "react";

import { PageRenderer } from "@/components/docs/page-renderer";
import type { DocPage } from "@/lib/docs/schema";
import type { MenuGroup } from "@/lib/docs/workspace";

type DocsSitePreviewProps = {
  menuGroups: MenuGroup[];
  pages: DocPage[];
  activePageSlug: string;
  interactive?: boolean;
  onSelectPage?: (slug: string) => void;
  onCreatePage?: () => void;
  showSidebar?: boolean;
};

export function DocsSitePreview({
  menuGroups,
  pages,
  activePageSlug,
  interactive = false,
  onSelectPage,
  onCreatePage,
  showSidebar = true,
}: DocsSitePreviewProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const activePage =
    pages.find((page) => page.slug === activePageSlug) ?? pages[0] ?? null;

  if (!activePage) {
    return null;
  }

  return (
    <div
      dir="ltr"
      className="relative overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-sm"
    >
      <div className="relative min-h-[820px] bg-slate-100">
        <main
          dir="rtl"
          className={`min-w-0 p-4 transition-[padding] duration-300 sm:p-6 ${
            showSidebar ? (isSidebarOpen ? "xl:pr-[344px]" : "xl:pr-24") : ""
          }`}
        >
          <PageRenderer page={activePage} />
        </main>

        {showSidebar ? (
          <aside
            dir="rtl"
            className={`absolute inset-y-0 right-0 z-20 flex h-full flex-col border-l border-white/10 bg-slate-950 text-white transition-all duration-300 ${
              isSidebarOpen ? "w-full sm:w-[320px]" : "w-[72px]"
            }`}
          >
          <button
            type="button"
            onClick={() => setIsSidebarOpen((current) => !current)}
            className="absolute left-4 top-4 rounded-full border border-white/10 bg-white/10 px-3 py-2 text-xs font-medium text-white transition hover:bg-white/20"
          >
            {isSidebarOpen ? "بستن" : "باز"}
          </button>

          <div
            className={`border-b border-white/10 px-5 pb-4 pt-16 ${isSidebarOpen ? "" : "px-3"}`}
          >
            {isSidebarOpen ? (
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
            className={`mt-5 flex-1 overflow-y-auto ${isSidebarOpen ? "space-y-5 px-5 pb-5" : "space-y-3 px-3 pb-4"}`}
          >
            {interactive && onCreatePage ? (
              <div className="pb-2">
                <button
                  type="button"
                  onClick={onCreatePage}
                  className={`w-full rounded-2xl border border-dashed transition ${
                    isSidebarOpen
                      ? "border-white/20 bg-emerald-500/15 px-4 py-3 text-right text-sm font-medium text-emerald-100 hover:bg-emerald-500/25"
                      : "flex h-11 items-center justify-center border-white/20 bg-emerald-500/15 text-emerald-100 hover:bg-emerald-500/25"
                  }`}
                >
                  {isSidebarOpen ? "ایجاد صفحه جدید" : "+"}
                </button>
              </div>
            ) : null}

            {menuGroups.map((group) => {
              const groupPages = pages.filter(
                (page) => page.menuGroupId === group.id,
              );

              return (
                <section key={group.id} className="space-y-3">
                  {isSidebarOpen ? (
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

                  <div className={isSidebarOpen ? "space-y-2" : "space-y-2"}>
                    {groupPages.map((page) => {
                      const isActive = page.slug === activePageSlug;
                      const buttonClass = isSidebarOpen
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

                      if (interactive) {
                        return (
                          <button
                            key={page.slug}
                            type="button"
                            onClick={() => onSelectPage?.(page.slug)}
                            className={buttonClass}
                          >
                            {isSidebarOpen ? (
                              <>
                                <span className="block font-medium">
                                  {page.menuTitle}
                                </span>
                                <span
                                  className={`mt-1 block text-xs ${
                                    isActive
                                      ? "text-slate-500"
                                      : "text-slate-400"
                                  }`}
                                >
                                  /pages/{page.slug}
                                </span>
                              </>
                            ) : (
                              <span
                                title={page.menuTitle}
                                className="font-medium"
                              >
                                {page.menuTitle.slice(0, 1)}
                              </span>
                            )}
                          </button>
                        );
                      }

                      return (
                        <Link
                          key={page.slug}
                          href={`/pages/${page.slug}`}
                          className={buttonClass}
                        >
                          {isSidebarOpen ? (
                            <>
                              <span className="block font-medium">
                                {page.menuTitle}
                              </span>
                              <span
                                className={`mt-1 block text-xs ${
                                  isActive ? "text-slate-500" : "text-slate-400"
                                }`}
                              >
                                /pages/{page.slug}
                              </span>
                            </>
                          ) : (
                            <span
                              title={page.menuTitle}
                              className="font-medium"
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
          </aside>
        ) : null}
      </div>
    </div>
  );
}
