"use client";

import { useState } from "react";

import {
  AdminSidebar,
  BuilderStats,
  SaveChangesBanner,
} from "@/components/docs/builder/admin-shell";
import { BuilderCenterPanel } from "@/components/docs/builder/editor-sections";
import { ToolsPanelContent } from "@/components/docs/builder/sidebars";
import { useDocsBuilder } from "@/components/docs/builder/use-docs-builder";

export function PageBuilderDemo() {
  const { state, actions } = useDocsBuilder();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  if (!state.activePage) {
    return null;
  }

  return (
    <section
      dir="ltr"
      className="relative min-h-[calc(100vh-4rem)] overflow-hidden rounded-[32px] border border-slate-200 bg-slate-100 shadow-sm"
    >
      <main
        dir="rtl"
        className={`min-h-[calc(100vh-4rem)] p-4 transition-[padding] duration-300 sm:p-6 ${
          isSidebarOpen ? "xl:pr-[384px]" : "xl:pr-24"
        }`}
      >
        <BuilderStats
          workspace={state.workspace}
          activePageSlug={state.activePage.slug}
        />

        <SaveChangesBanner
          hasUnsavedChanges={state.hasUnsavedPageChanges}
          isSaving={state.isSavingPage}
          message={state.saveMessage}
          onSave={actions.saveActivePage}
        />

        {state.activeView === "blocks" ? (
          <div dir="rtl" className="space-y-6">
            <ToolsPanelContent
              selectedComponent={state.selectedComponent}
              onAddBlock={actions.addBlockToActivePage}
              onUpdateSelectedComponent={actions.updateSelectedComponent}
              onAddFieldToSelectedGroup={actions.addFieldToSelectedGroup}
              onAddColumnToSelectedTable={actions.addColumnToSelectedTable}
              onAddRowToSelectedTable={actions.addRowToSelectedTable}
            />
          </div>
        ) : (
          <BuilderCenterPanel
            activeView={state.activeView}
            activePage={state.activePage}
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
            onAddFieldToSelectedGroup={actions.addFieldToSelectedGroup}
            onAddColumnToSelectedTable={actions.addColumnToSelectedTable}
            onAddRowToSelectedTable={actions.addRowToSelectedTable}
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
            onAddFieldToCreateGroup={actions.addFieldToCreateGroup}
            onAddColumnToCreateTable={actions.addColumnToCreateTable}
            onAddRowToCreateTable={actions.addRowToCreateTable}
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
