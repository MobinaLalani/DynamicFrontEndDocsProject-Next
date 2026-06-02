import { buildPrettyJson } from "@/features/docs-builder/model/helpers";
import type { DocsBuilderState } from "@/features/docs-builder/model/types";

export function getBuilderSelectors(state: DocsBuilderState) {
  const activePage =
    state.workspace.pages.find((page) => page.slug === state.selectedPageSlug) ??
    state.workspace.pages[0] ??
    null;
  const selectedComponent =
    activePage?.components.find(
      (component) => component.id === state.selectedComponentId,
    ) ?? null;
  const selectedCreateComponent =
    state.createPageDraft.components.find(
      (component) => component.id === state.selectedCreateComponentId,
    ) ?? null;
  const activePageSnapshot = JSON.stringify(activePage);

  return {
    activePage,
    selectedComponent,
    selectedCreateComponent,
    jsonOutput: buildPrettyJson(state.workspace),
    hasUnsavedPageChanges:
      !!activePage && activePageSnapshot !== state.save.lastSavedPageSnapshot,
  };
}
