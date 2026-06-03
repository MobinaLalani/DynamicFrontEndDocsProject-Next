import {
  createDefaultWorkspace,
  createMenuGroup,
  createPageFromDraft,
} from "@/lib/docs/workspace";

import {
  buildUniqueSlug,
  cloneComponent,
  createEmptyDraftPage,
  duplicateBlock,
  getPageByScope,
  insertBlock,
  moveBlock,
  removeBlock,
  updatePageForScope,
  updateSelectedComponentForScope,
} from "@/features/docs-builder/model/helpers";
import type {
  BuilderAction,
  DocsBuilderState,
} from "@/features/docs-builder/model/types";

export function getInitialBuilderState(
  workspace = createDefaultWorkspace(),
): DocsBuilderState {
  const activePage = workspace.pages[0] ?? null;

  return {
    workspace,
    activeView: activePage ? "preview" : "create-page",
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

      const generatedPage = createPageFromDraft(
        state.workspace.pages,
        state.createPageDraft,
      );
      const page = action.page ?? {
        ...generatedPage,
        slug: buildUniqueSlug(generatedPage.slug, state.workspace.pages),
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
