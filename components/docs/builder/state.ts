"use client";

import { insertComponent, moveComponent } from "@/lib/docs/builder";
import type {
  DocPage,
  PageComponent,
  PageComponentType,
} from "@/lib/docs/schema";
import { createDefaultPage } from "@/lib/docs/schema";
import {
  createDefaultWorkspace,
  createMenuGroup,
  createPageFromTemplate,
  type DocsWorkspace,
} from "@/lib/docs/workspace";

export type BuilderView =
  | "editor"
  | "create-page"
  | "blocks"
  | "preview"
  | "json";

type PageEditorScope = "active" | "create";

type CreateMenuForm = {
  title: string;
  description: string;
};

type SaveState = {
  status: "idle" | "saving" | "success" | "error";
  message: string | null;
  lastSavedPageSnapshot: string;
};

type DocsBuilderState = {
  workspace: DocsWorkspace;
  activeView: BuilderView;
  selectedPageSlug: string;
  selectedComponentId: string | null;
  createPageDraft: DocPage;
  selectedCreateComponentId: string | null;
  createMenuForm: CreateMenuForm;
  copied: boolean;
  save: SaveState;
};

type BuilderAction =
  | { type: "set-active-view"; view: BuilderView }
  | { type: "select-page"; slug: string }
  | { type: "select-active-component"; componentId: string | null }
  | { type: "select-create-component"; componentId: string | null }
  | { type: "set-copied"; copied: boolean }
  | { type: "set-create-menu-title"; value: string }
  | { type: "set-create-menu-description"; value: string }
  | {
      type: "update-page";
      scope: PageEditorScope;
      updater: (page: DocPage) => DocPage;
    }
  | {
      type: "update-selected-component";
      scope: PageEditorScope;
      updater: (component: PageComponent) => PageComponent;
    }
  | { type: "update-active-page-slug"; value: string }
  | {
      type: "insert-block";
      scope: PageEditorScope;
      blockType: PageComponentType;
    }
  | {
      type: "move-block";
      scope: PageEditorScope;
      componentId: string;
      targetIndex: number;
    }
  | { type: "remove-block"; scope: PageEditorScope; componentId: string }
  | {
      type: "duplicate-block";
      scope: PageEditorScope;
      component: PageComponent;
    }
  | { type: "create-menu" }
  | { type: "create-page" }
  | { type: "start-save" }
  | { type: "save-success"; page: DocPage }
  | { type: "save-error"; message: string }
  | { type: "clear-save-message" };

function buildPrettyJson(workspace: DocsWorkspace) {
  return JSON.stringify(workspace, null, 2);
}

function cloneComponent<T extends PageComponent>(component: T): T {
  return JSON.parse(JSON.stringify(component)) as T;
}

function buildUniqueSlug(baseSlug: string, pages: DocPage[]) {
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

function createEmptyDraftPage(menuGroupId: string): DocPage {
  const template = createDefaultPage();

  return {
    ...template,
    id: 0,
    slug: "",
    title: "",
    description: "",
    menuGroupId: menuGroupId || template.menuGroupId,
    menuTitle: "",
    components: [],
  };
}

function getPageByScope(state: DocsBuilderState, scope: PageEditorScope) {
  if (scope === "create") {
    return state.createPageDraft;
  }

  return (
    state.workspace.pages.find(
      (page) => page.slug === state.selectedPageSlug,
    ) ??
    state.workspace.pages[0] ??
    null
  );
}

function updateSaveStateForDirtyPage(
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

function updatePageForScope(
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

function updateSelectedComponentForScope(
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

function insertBlock(
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

function moveBlock(
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

function removeBlock(
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

function duplicateBlock(
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

export function getInitialBuilderState(): DocsBuilderState {
  const workspace = createDefaultWorkspace();
  const activePage = workspace.pages[0] ?? null;

  return {
    workspace,
    activeView: "preview",
    selectedPageSlug: activePage?.slug ?? "",
    selectedComponentId: activePage?.components[0]?.id ?? null,
    createPageDraft: createEmptyDraftPage(workspace.menuGroups[0]?.id ?? ""),
    selectedCreateComponentId: null,
    createMenuForm: {
      title: "",
      description: "",
    },
    copied: false,
    save: {
      status: "idle",
      message: null,
      lastSavedPageSnapshot: JSON.stringify(activePage),
    },
  };
}

export function docsBuilderReducer(
  state: DocsBuilderState,
  action: BuilderAction,
): DocsBuilderState {
  switch (action.type) {
    case "set-active-view":
      return {
        ...state,
        activeView: action.view,
      };

    case "select-page": {
      const nextPage =
        state.workspace.pages.find((page) => page.slug === action.slug) ?? null;

      return {
        ...state,
        activeView: "preview",
        selectedPageSlug: action.slug,
        selectedComponentId: nextPage?.components[0]?.id ?? null,
        save: {
          ...state.save,
          status: "idle",
          message: null,
          lastSavedPageSnapshot: JSON.stringify(nextPage),
        },
      };
    }

    case "select-active-component":
      return {
        ...state,
        selectedComponentId: action.componentId,
      };

    case "select-create-component":
      return {
        ...state,
        selectedCreateComponentId: action.componentId,
      };

    case "set-copied":
      return {
        ...state,
        copied: action.copied,
      };

    case "set-create-menu-title":
      return {
        ...state,
        createMenuForm: {
          ...state.createMenuForm,
          title: action.value,
        },
      };

    case "set-create-menu-description":
      return {
        ...state,
        createMenuForm: {
          ...state.createMenuForm,
          description: action.value,
        },
      };

    case "update-page":
      return updatePageForScope(state, action.scope, action.updater);

    case "update-selected-component":
      return updateSelectedComponentForScope(
        state,
        action.scope,
        action.updater,
      );

    case "update-active-page-slug": {
      const activePage = getPageByScope(state, "active");

      if (!activePage) {
        return state;
      }

      const nextSlug = buildUniqueSlug(
        action.value || activePage.slug,
        state.workspace.pages.filter((page) => page.slug !== activePage.slug),
      );

      const nextState = updatePageForScope(state, "active", (page) => ({
        ...page,
        slug: nextSlug,
      }));

      return {
        ...nextState,
        selectedPageSlug: nextSlug,
      };
    }

    case "insert-block":
      return insertBlock(state, action.scope, action.blockType);

    case "move-block":
      return moveBlock(
        state,
        action.scope,
        action.componentId,
        action.targetIndex,
      );

    case "remove-block":
      return removeBlock(state, action.scope, action.componentId);

    case "duplicate-block":
      return duplicateBlock(state, action.scope, action.component);

    case "create-menu": {
      const menu = createMenuGroup({
        title: state.createMenuForm.title,
        description: state.createMenuForm.description,
      });

      return {
        ...state,
        workspace: {
          ...state.workspace,
          menuGroups: [...state.workspace.menuGroups, menu],
        },
        createMenuForm: {
          title: "",
          description: "",
        },
        createPageDraft: {
          ...state.createPageDraft,
          menuGroupId: menu.id,
        },
      };
    }

    case "create-page": {
      if (!state.createPageDraft.menuGroupId) {
        return state;
      }

      const draft = createPageFromTemplate(state.workspace.pages, {
        title: state.createPageDraft.title,
        slug: state.createPageDraft.slug || state.createPageDraft.title,
        menuGroupId: state.createPageDraft.menuGroupId,
        menuTitle:
          state.createPageDraft.menuTitle || state.createPageDraft.title,
      });
      const page = {
        ...draft,
        slug: buildUniqueSlug(draft.slug, state.workspace.pages),
        title: state.createPageDraft.title.trim() || draft.title,
        description:
          state.createPageDraft.description?.trim() || draft.description,
        menuGroupId: state.createPageDraft.menuGroupId || draft.menuGroupId,
        menuTitle: state.createPageDraft.menuTitle.trim() || draft.menuTitle,
        components: state.createPageDraft.components.map((component) =>
          cloneComponent(component),
        ),
      };

      return {
        ...state,
        workspace: {
          ...state.workspace,
          pages: [...state.workspace.pages, page],
        },
        activeView: "editor",
        selectedPageSlug: page.slug,
        selectedComponentId: page.components[0]?.id ?? null,
        createPageDraft: createEmptyDraftPage(
          state.createPageDraft.menuGroupId,
        ),
        selectedCreateComponentId: null,
        save: {
          ...state.save,
          status: "idle",
          message: null,
          lastSavedPageSnapshot: JSON.stringify(page),
        },
      };
    }

    case "start-save":
      return {
        ...state,
        save: {
          ...state.save,
          status: "saving",
          message: null,
        },
      };

    case "save-success":
      return {
        ...state,
        workspace: {
          ...state.workspace,
          pages: state.workspace.pages.map((page) =>
            page.id === action.page.id ? action.page : page,
          ),
        },
        selectedPageSlug: action.page.slug,
        save: {
          status: "success",
          message: "تغییرات صفحه با موفقیت ذخیره شد.",
          lastSavedPageSnapshot: JSON.stringify(action.page),
        },
      };

    case "save-error":
      return {
        ...state,
        save: {
          ...state.save,
          status: "error",
          message: action.message,
        },
      };

    case "clear-save-message":
      return {
        ...state,
        save: {
          ...state.save,
          status: "idle",
          message: null,
        },
      };

    default:
      return state;
  }
}

export function getBuilderSelectors(state: DocsBuilderState) {
  const activePage =
    state.workspace.pages.find(
      (page) => page.slug === state.selectedPageSlug,
    ) ??
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
