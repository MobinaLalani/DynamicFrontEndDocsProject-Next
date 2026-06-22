"use client";

import { BuilderCenterPanel } from "@/components/docs/builder/editor-sections";
import { ToolsPanelContent } from "@/components/layout/sidebars";
import { useDocsBuilder } from "@/features/docs-builder/model";
import type { DocsWorkspace } from "@/lib/docs/workspace";

type Props = {
  initialWorkspace: DocsWorkspace;
};

export function DocsBuilderPage({ initialWorkspace }: Props) {
  const { state, actions } = useDocsBuilder(initialWorkspace);

  const displayPage = state.activePage ?? state.createPageDraft;

  return (
    <>
      <p className="mr-6 text-2xl font-bold mb-4">پیش نمایش صفحه</p>

      <div className="m-6 flex-1 rounded-3xl border border-(--darkBlue) bg-white p-3">
        
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
    </>
  );
}
