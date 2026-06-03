import { insertComponent, moveComponent } from "@/lib/docs/builder";
import type { DocPage, PageComponent, PageComponentType } from "@/lib/docs/schema";

import type { DocsBuilderState, PageEditorScope } from "@/features/docs-builder/model/types";

export function buildPrettyJson(workspace: DocsBuilderState["workspace"]) {
  return JSON.stringify(workspace, null, 2);
}

export function cloneComponent<T extends PageComponent>(component: T): T {
  return JSON.parse(JSON.stringify(component)) as T;
}

export function buildUniqueSlug(baseSlug: string, pages: DocPage[]) {
  const normalized =
    baseSlug.trim().toLowerCase().replace(/\s+/g, "-") || "new-page";

  if (!pages.some((page) => page.slug === normalized)) {
    return normalized;
  }

  let index = 2;
  let nextSlug = `${normalized}-${index}`;

  while (pages.some((page) => page.slug === nextSlug)) {
    index += 1;
    nextSlug = `${normalized}-${index}`;
  }

  return nextSlug;
}

export function createEmptyDraftPage(menuGroupId: string): DocPage {
  return {
    id: 0,
    slug: "",
    title: "",
    description: "",
    menuGroupId,
    menuTitle: "",
    components: [],
  };
}

export function getPageByScope(
  state: DocsBuilderState,
  scope: PageEditorScope,
) {
  if (scope === "create") {
    return state.createPageDraft;
  }

  return (
    state.workspace.pages.find((page) => page.slug === state.selectedPageSlug) ??
    state.workspace.pages[0] ??
    null
  );
}

export function updateSaveStateForDirtyPage(
  state: DocsBuilderState,
): DocsBuilderState {
  return {
    ...state,
    save: {
      ...state.save,
      status: "idle",
      message: null,
    },
  };
}

export function updatePageForScope(
  state: DocsBuilderState,
  scope: PageEditorScope,
  updater: (page: DocPage) => DocPage,
) {
  if (scope === "create") {
    return {
      ...state,
      createPageDraft: updater(state.createPageDraft),
    };
  }

  const activePage = getPageByScope(state, "active");

  if (!activePage) {
    return state;
  }

  return updateSaveStateForDirtyPage({
    ...state,
    workspace: {
      ...state.workspace,
      pages: state.workspace.pages.map((page) =>
        page.slug === activePage.slug ? updater(page) : page,
      ),
    },
  });
}

export function updateSelectedComponentForScope(
  state: DocsBuilderState,
  scope: PageEditorScope,
  updater: (component: PageComponent) => PageComponent,
) {
  const page = getPageByScope(state, scope);
  const selectedComponentId =
    scope === "create"
      ? state.selectedCreateComponentId
      : state.selectedComponentId;

  if (!page || !selectedComponentId) {
    return state;
  }

  return updatePageForScope(state, scope, (currentPage) => ({
    ...currentPage,
    components: currentPage.components.map((component) =>
      component.id === selectedComponentId ? updater(component) : component,
    ),
  }));
}

export function insertBlock(
  state: DocsBuilderState,
  scope: PageEditorScope,
  blockType: PageComponentType,
) {
  const page = getPageByScope(state, scope);

  if (!page) {
    return state;
  }

  const result = insertComponent(page, blockType, page.components.length);
  const nextState = updatePageForScope(state, scope, () => result.page);

  return scope === "create"
    ? { ...nextState, selectedCreateComponentId: result.componentId }
    : { ...nextState, selectedComponentId: result.componentId };
}

export function moveBlock(
  state: DocsBuilderState,
  scope: PageEditorScope,
  componentId: string,
  targetIndex: number,
) {
  const page = getPageByScope(state, scope);

  if (!page) {
    return state;
  }

  const nextState = updatePageForScope(state, scope, () =>
    moveComponent(page, componentId, targetIndex),
  );

  return scope === "create"
    ? { ...nextState, selectedCreateComponentId: componentId }
    : { ...nextState, selectedComponentId: componentId };
}

export function removeBlock(
  state: DocsBuilderState,
  scope: PageEditorScope,
  componentId: string,
) {
  const page = getPageByScope(state, scope);

  if (!page) {
    return state;
  }

  const nextComponents = page.components.filter(
    (component) => component.id !== componentId,
  );
  const nextState = updatePageForScope(state, scope, (currentPage) => ({
    ...currentPage,
    components: nextComponents,
  }));

  if (scope === "create") {
    return {
      ...nextState,
      selectedCreateComponentId:
        state.selectedCreateComponentId === componentId
          ? (nextComponents[0]?.id ?? null)
          : state.selectedCreateComponentId,
    };
  }

  return {
    ...nextState,
    selectedComponentId:
      state.selectedComponentId === componentId
        ? (nextComponents[0]?.id ?? null)
        : state.selectedComponentId,
  };
}

export function duplicateBlock(
  state: DocsBuilderState,
  scope: PageEditorScope,
  component: PageComponent,
) {
  const duplicated = cloneComponent({
    ...component,
    id: `${component.type}-${Math.random().toString(36).slice(2, 10)}`,
  });

  const nextState = updatePageForScope(state, scope, (page) => ({
    ...page,
    components: page.components.flatMap((item) =>
      item.id === component.id ? [item, duplicated] : [item],
    ),
  }));

  return scope === "create"
    ? { ...nextState, selectedCreateComponentId: duplicated.id }
    : { ...nextState, selectedComponentId: duplicated.id };
}
