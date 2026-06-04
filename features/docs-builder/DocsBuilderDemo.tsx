"use client";

import { useState } from "react";
import { User } from "lucide-react";
import { BuilderCenterPanel } from "@/components/docs/builder/editor-sections";
import { ToolsPanelContent } from "@/components/layout/sidebars";
import { StatCard } from "@/components/docs/builder/shared";
import type { BuilderView } from "@/features/docs-builder/model";
import { useDocsBuilder } from "@/features/docs-builder/model";
import type { DocsWorkspace } from "@/lib/docs/workspace";

type DocsBuilderDemoProps = {
  initialWorkspace: DocsWorkspace;
};

export function DocsBuilderDemo({ initialWorkspace }: DocsBuilderDemoProps) {
  const { state, actions } = useDocsBuilder(initialWorkspace);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const displayPage = state.activePage ?? state.createPageDraft;

  return (
    <section
      dir="ltr"
      className="relative min-h-screen overflow-hidden bg-slate-100"
    >
      <main
        dir="rtl"
        className={`min-h-screen p-4 pt-24 transition-[padding] duration-300 sm:p-6 sm:pt-28 ${
          isSidebarOpen ? "xl:pr-[384px]" : "xl:pr-24"
        }`}
      >
        {/* <BuilderStats
          workspace={state.workspace}
          activePageSlug={displayPage.slug}
        /> */}

        {state.activeView !== "create-page" ? (
          <SaveChangesBanner
            hasUnsavedChanges={state.hasUnsavedPageChanges}
            isSaving={state.isSavingPage}
            message={state.saveMessage}
            onSave={actions.saveActivePage}
          />
        ) : null}

        {state.activeView === "blocks" ? (
          <div dir="rtl" className="space-y-6">
            <ToolsPanelContent
              selectedComponent={state.selectedComponent}
              onAddBlock={actions.addBlockToActivePage}
              onUpdateSelectedComponent={actions.updateSelectedComponent}
            />
          </div>
        ) : (
          <BuilderCenterPanel
            activeView={state.activeView}
            activePage={displayPage}
            menuGroups={state.workspace.menuGroups}
            pages={state.workspace.pages}
            selectedComponentId={state.selectedComponentId}
            selectedComponent={state.selectedComponent}
            copied={state.copied}
            jsonOutput={state.jsonOutput}
            createPageDraft={state.createPageDraft}
            selectedCreateComponentId={state.selectedCreateComponentId}
            selectedCreateComponent={state.selectedCreateComponent}
            onUpdatePage={actions.updateActivePage}
            onUpdatePageSlug={actions.updateActivePageSlug}
            onSelectComponent={actions.setSelectedComponentId}
            onDropAt={actions.handleDropAt}
            onDuplicateComponent={actions.duplicateComponentInActivePage}
            onRemoveComponent={actions.removeComponent}
            onUpdateSelectedComponent={actions.updateSelectedComponent}
            onSetNewMenuTitle={actions.setNewMenuTitle}
            onSetNewMenuDescription={actions.setNewMenuDescription}
            onSetNewPageTitle={actions.setNewPageTitle}
            onSetNewPageSlug={actions.setNewPageSlug}
            onSetNewPageMenuTitle={actions.setNewPageMenuTitle}
            onSetNewPageMenuGroupId={actions.setNewPageMenuGroupId}
            onSetNewPageDescription={actions.setNewPageDescription}
            onCreateMenu={actions.handleCreateMenu}
            onCreatePage={actions.handleCreatePage}
            onBackToEditor={() => actions.setActiveView("editor")}
            onOpenEditPage={() => actions.setActiveView("editor")}
            onSelectPage={actions.selectPage}
            onOpenCreatePage={() => actions.setActiveView("create-page")}
            onCopyJson={actions.copyJson}
            onAddBlockToActivePage={actions.addBlockToActivePage}
            onCreatePageDropAt={actions.handleCreatePageDropAt}
            onAddBlockToNewPage={actions.addBlockToNewPage}
            onSelectCreateComponent={actions.setSelectedCreateComponentId}
            onDuplicateCreateComponent={actions.duplicateDraftComponent}
            onRemoveCreateComponent={actions.removeDraftComponent}
            onUpdateSelectedCreateComponent={
              actions.updateSelectedCreateComponent
            }
            createMenuTitle={state.createMenuForm.title}
            createMenuDescription={state.createMenuForm.description}
          />
        )}
      </main>

      <AdminSidebar
        isOpen={isSidebarOpen}
        activeView={state.activeView}
        workspace={state.workspace}
        selectedPageSlug={state.selectedPageSlug}
        onToggle={() => setIsSidebarOpen((current) => !current)}
        onOpenView={actions.setActiveView}
        onSelectPage={actions.selectPage}
      />
    </section>
  );
}

type SaveChangesBannerProps = {
  hasUnsavedChanges: boolean;
  isSaving: boolean;
  message: string | null;
  onSave: () => void;
};

function SaveChangesBanner({
  hasUnsavedChanges,
  isSaving,
  message,
  onSave,
}: SaveChangesBannerProps) {
  return (
    <div className="mb-6 flex flex-col gap-3 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm lg:flex-row lg:items-center lg:justify-between">
      <div>
        <p className="text-sm font-medium text-slate-500">ذخیره تغییرات صفحه</p>
        <p className="mt-1 text-sm text-slate-600">
          این دکمه فقط وقتی فعال می‌شود که محتوای صفحه یا JSON آن تغییر کرده
          باشد.
        </p>
        {message ? (
          <p className="mt-2 text-sm text-emerald-700">{message}</p>
        ) : null}
      </div>

      <button
        type="button"
        onClick={onSave}
        disabled={!hasUnsavedChanges || isSaving}
        className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500"
      >
        {isSaving ? "در حال ذخیره..." : "ذخیره تغییرات"}
      </button>
    </div>
  );
}

type BuilderStatsProps = {
  workspace: DocsWorkspace;
  activePageSlug: string;
};

// function BuilderStats({ workspace, activePageSlug }: BuilderStatsProps) {
//   return (
//     <div className="mb-6 grid gap-3 sm:grid-cols-3">
//       <StatCard label="تعداد صفحه" value={String(workspace.pages.length)} />
//       <StatCard label="تعداد منو" value={String(workspace.menuGroups.length)} />
//       <StatCard label="مسیر فعال" value={`/pages/${activePageSlug}`} />
//     </div>
//   );
// }

type AdminSidebarProps = {
  isOpen: boolean;
  activeView: BuilderView;
  workspace: DocsWorkspace;
  selectedPageSlug: string;
  onToggle: () => void;
  onOpenView: (view: BuilderView) => void;
  onSelectPage: (slug: string) => void;
};

function AdminSidebar({
  isOpen,
  activeView,
  workspace,
  selectedPageSlug,
  onToggle,
  onOpenView,
  onSelectPage,
}: AdminSidebarProps) {
  const expandedNavButtonClass = (view: BuilderView) =>
    `w-full bg-white text-black rounded-2xl px-4 py-3 text-right text-xl font-bold transition ${
      activeView === view ? " shadow-sm" : " "
    }`;

  return (
    <aside
      dir="rtl"
      className={`absolute inset-y-0 right-0 z-20 flex h-full flex-col border-l border-white/10 bg-slate-950 text-white transition-all duration-300 ${
        isOpen ? "w-full sm:w-[360px]" : "w-[72px]"
      }`}
    >
  <div className={`flex ${isOpen?'flex-row':'flex-col gap-2'} items-center justify-between  p-4`}>
<div className="rounded-full bg-white p-1">
  <User className="text-black" />
    </div>
      <button
        type="button"
        onClick={onToggle}
        className="rounded-full border border-white/10 bg-white/10 px-3 py-2 text-xs font-medium text-white transition hover:bg-white/20"
      >
        {isOpen ? "بستن" : "باز"}
      </button>

    </div>
    

      <div
        className={`border-b border-white/10 px-5 pb-5 pt-16 ${isOpen ? "" : "px-3"}`}
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
              همه بخش‌های پنل فقط از همین سایدبار در دسترس هستند.
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

          {/* <button
            type="button"
            onClick={() => onOpenView("editor")}
            className={
              isOpen
                ? expandedNavButtonClass("editor")
                : collapsedNavButtonClass("editor")
            }
            title="ویرایش صفحه"
          >
            {isOpen ? "ویرایش صفحه" : "و"}
          </button> */}

          {/* <button
            type="button"
            onClick={() => onOpenView("blocks")}
            className={
              isOpen
                ? expandedNavButtonClass("blocks")
                : collapsedNavButtonClass("blocks")
            }
            title="بلوک‌ها و بازرس"
          >
            {isOpen ? "بلوک‌ها و بازرس" : "ب"}
          </button> */}

          {/* <button
            type="button"
            onClick={() => onOpenView("preview")}
            className={
              isOpen
                ? expandedNavButtonClass("preview")
                : collapsedNavButtonClass("preview")
            }
            title="پیش‌نمایش"
          >
            {isOpen ? "پیش‌نمایش" : "پ"}
          </button> */}
          {/* 
          <button
            type="button"
            onClick={() => onOpenView("json")}
            className={
              isOpen
                ? expandedNavButtonClass("json")
                : collapsedNavButtonClass("json")
            }
            title="JSON ساختار"
          >
            {isOpen ? "JSON ساختار" : "J"}
          </button> */}

          <button
            type="button"
            onClick={() => onOpenView("create-page")}
            className={
              isOpen
                ? expandedNavButtonClass("create-page")
                : "flex h-11 w-full items-center justify-center rounded-2xl bg-white-500/20 text-black  "
            }
            title="ایجاد صفحه جدید"
          >
            {isOpen ? "ایجاد صفحه جدید" : "+"}
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
                            <span
                              className={`mt-1 block text-xs ${
                                isActive ? "text-black" : "text-black"
                              }`}
                            >
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
    </aside>
  );
}
