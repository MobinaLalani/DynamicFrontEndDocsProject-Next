"use client";

import { useState } from "react";
import { BuilderCenterPanel } from "@/components/docs/builder/editor-sections";
import {
  AdminDocsFooter,
  AdminDocsNavbar,
  AdminDocsSidebar,
} from "@/components/layout/docsSiteBuilderLayout";
import { ToolsPanelContent } from "@/components/layout/sidebars";
import { useDocsBuilder } from "@/features/docs-builder/model";
import type { AuthSession } from "@/lib/auth/types";
import type { DocsWorkspace } from "@/lib/docs/workspace";

type DocsBuilderDemoProps = {
  initialWorkspace: DocsWorkspace;
  session: AuthSession;
};

export function DocsBuilderDemo({
  initialWorkspace,
  session,
}: DocsBuilderDemoProps) {
  const { state, actions } = useDocsBuilder(initialWorkspace);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const displayPage = state.activePage ?? state.createPageDraft;

  return (
    <section
      dir="ltr"
      className="relative min-h-screen overflow-hidden bg-slate-100"
    >
      <div
        className={`absolute inset-x-0 top-0 z-30 transition-[padding] duration-300 ${
          isSidebarOpen ? "xl:pr-[384px]" : "xl:pr-24"
        }`}
      >
        <AdminDocsNavbar session={session} />
      </div>

      <main
        dir="rtl"
        className={`flex min-h-screen flex-col p-4 pt-28 transition-[padding] duration-300 sm:p-6 sm:pt-32 ${
          isSidebarOpen ? "xl:pr-[384px]" : "xl:pr-24"
        }`}
      >
        {/* <BuilderStats
          workspace={state.workspace}
          activePageSlug={displayPage.slug}
        /> */}

        <div className="flex-1">
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
              createMenuIsActive={state.createMenuForm.isActive}
              hasUnsavedPageChanges={state.hasUnsavedPageChanges}
              isSavingPage={state.isSavingPage}
              saveMessage={state.saveMessage}
              onSaveActivePage={actions.saveActivePage}
              onSetNewMenuActive={actions.setNewMenuActive}
              onSaveMenuGroupChanges={actions.saveMenuGroupChanges}
              onDeleteMenuGroup={actions.deleteMenuGroup}
              onResetMenuForm={actions.resetMenuForm}
            />
          )}
        </div>

        <div className="mt-6">
          <AdminDocsFooter
            workspace={state.workspace}
            activePage={displayPage}
          />
        </div>
      </main>

      <AdminDocsSidebar
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
