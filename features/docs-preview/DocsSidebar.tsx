"use client";

import Link from "next/link";
import { useState } from "react";
import { SessionMenu } from "@/components/auth/SessionMenu";
import Arrowdown from '@/components/ui/icons/arrow-down.svg'
import type { AuthSession } from "@/lib/auth/types";
import type { DocPage } from "@/lib/docs/schema";
import type { MenuGroup } from "@/lib/docs/workspace";

type DocsSidebarProps = {
  menuGroups: MenuGroup[];
  pages: DocPage[];
  activePageSlug?: string;
  activeGroupId?: string;
  session?: AuthSession;
  interactive?: boolean;
  onSelectPage?: (slug: string) => void;
  onCreatePage?: () => void;
};

export function DocsSidebar({
  menuGroups,
  pages,
  activePageSlug,
  activeGroupId,
  session,
  interactive = false,
  onSelectPage,
  onCreatePage,
}: DocsSidebarProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const visibleMenuGroups = interactive
    ? menuGroups
    : menuGroups.filter((group) => group.isActive);

  return (
    <aside
      dir="rtl"
      className={`absolute inset-y-0 right-0 z-20 flex h-full flex-col border-l border-white/10 bg-slate-950 text-white transition-all duration-300 ${
        isSidebarOpen ? "w-full sm:w-[320px]" : "w-[72px]"
      }`}
    >
      {/* Toggle Button (بیرون‌زده از سایدبار) */}
      <button
        type="button"
        onClick={() => setIsSidebarOpen((current) => !current)}
        aria-label={isSidebarOpen ? "بستن سایدبار" : "باز کردن سایدبار"}
        className="absolute -left-5 top-4 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-black bg-white! text-white transition hover:bg-white/20"
      >
        <svg
          viewBox="0 0 12 12"
          className={`h-4 w-4 transition-transform duration-300 ${
            isSidebarOpen ? "rotate-270" : "rotate-90"
          }`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 4.50002C9 4.50002 6.79053 7.49999 5.99998 7.5C5.20942 7.50001 3 4.5 3 4.5"
            stroke="black"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5.99998 7.5C6.79053 7.49999 9 4.50002 9 4.50002"
            stroke="black"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Header */}
      <div
        className={`border-b border-white/10 px-5 pb-4 pt-16 ${
          isSidebarOpen ? "" : "px-3"
        }`}
      >
        <div
          className={`mb-4 flex items-center ${
            isSidebarOpen ? "justify-between gap-3" : "flex-col gap-2"
          }`}
        >
          {session ? (
            <SessionMenu
              session={session}
              position="bottom-left"
              triggerClassName="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/10 p-2 text-white transition hover:bg-white/20"
              panelClassName="w-[240px] p-4"
            />
          ) : (
            <div />
          )}

          <div className="h-10 w-10" />
        </div>

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

      {/* Content */}
      <div
        className={`mt-5 flex-1 overflow-y-auto ${
          isSidebarOpen ? "space-y-5 px-5 pb-5" : "space-y-3 px-3 pb-4"
        }`}
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

        {visibleMenuGroups.map((group) => {
          const groupPages = pages.filter(
            (page) => page.menuGroupId === group.id,
          );

          const isGroupActive =
            group.id === activeGroupId ||
            groupPages.some((page) => page.slug === activePageSlug);

          return (
            <section key={group.id} className="space-y-3">
              {isSidebarOpen ? (
                <div>
                  {interactive ? (
                    <p className="font-semibold">{group.title}</p>
                  ) : (
                    <Link
                      href={`/pages/group/${group.id}`}
                      className={`block rounded-2xl px-3 py-2 font-semibold transition ${
                        isGroupActive
                          ? "bg-white text-slate-950 shadow-sm"
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

                  return interactive ? (
                    <button
                      key={page.slug}
                      type="button"
                      onClick={() => onSelectPage?.(page.slug)}
                      className={buttonClass}
                    >
                      {isSidebarOpen
                        ? page.menuTitle
                        : page.menuTitle.slice(0, 1)}
                    </button>
                  ) : (
                    <Link
                      key={page.slug}
                      href={`/pages/${page.slug}`}
                      className={buttonClass}
                    >
                      {isSidebarOpen
                        ? page.menuTitle
                        : page.menuTitle.slice(0, 1)}
                    </Link>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </aside>
  );
}
