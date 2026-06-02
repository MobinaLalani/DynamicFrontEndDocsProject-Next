"use client";

import { useMemo, useReducer, type DragEvent } from "react";

import { saveDocPage } from "@/lib/docs/client";
import type {
  DocPage,
  PageComponent,
  PageComponentType,
} from "@/lib/docs/schema";

import {
  componentTransferKey,
  paletteTransferKey,
} from "@/components/docs/builder/constants";
import {
  type BuilderView,
  docsBuilderReducer,
  getBuilderSelectors,
  getInitialBuilderState,
} from "@/components/docs/builder/state";

export function useDocsBuilder() {
  const [state, dispatch] = useReducer(
    docsBuilderReducer,
    undefined,
    getInitialBuilderState,
  );
  const selectors = useMemo(() => getBuilderSelectors(state), [state]);

  const selectPage = (slug: string) => {
    dispatch({ type: "select-page", slug });
  };

  const handleDropAt =
    (scope: "active" | "create") =>
    (event: DragEvent<HTMLDivElement>, targetIndex: number) => {
      event.preventDefault();

      const paletteType = event.dataTransfer.getData(
        paletteTransferKey,
      ) as PageComponentType;
      const componentId = event.dataTransfer.getData(componentTransferKey);

      if (paletteType) {
        dispatch({ type: "insert-block", scope, blockType: paletteType });
        return;
      }

      if (componentId) {
        dispatch({
          type: "move-block",
          scope,
          componentId,
          targetIndex,
        });
      }
    };

  const handleActiveDropAt = handleDropAt("active");
  const handleCreatePageDropAt = handleDropAt("create");

  const updatePage =
    (scope: "active" | "create") => (updater: (page: DocPage) => DocPage) => {
      dispatch({ type: "update-page", scope, updater });
    };

  const updateSelectedComponent =
    (scope: "active" | "create") =>
    (updater: (component: PageComponent) => PageComponent) => {
      dispatch({ type: "update-selected-component", scope, updater });
    };

  const addBlockToPage =
    (scope: "active" | "create") => (type: PageComponentType) => {
      dispatch({ type: "insert-block", scope, blockType: type });
    };

  const duplicateComponent =
    (scope: "active" | "create") => (component: PageComponent) => {
      dispatch({ type: "duplicate-block", scope, component });
    };

  const removeComponent =
    (scope: "active" | "create") => (componentId: string) => {
      dispatch({ type: "remove-block", scope, componentId });
    };

  const updateActivePageSlug = (value: string) => {
    dispatch({ type: "update-active-page-slug", value });
  };

  const copyJson = async () => {
    await navigator.clipboard.writeText(selectors.jsonOutput);
    dispatch({ type: "set-copied", copied: true });
    window.setTimeout(
      () => dispatch({ type: "set-copied", copied: false }),
      1200,
    );
  };

  const saveActivePage = async () => {
    if (
      !selectors.activePage ||
      !selectors.hasUnsavedPageChanges ||
      state.save.status === "saving"
    ) {
      return;
    }

    dispatch({ type: "start-save" });

    try {
      const savedPage = await saveDocPage(selectors.activePage);
      dispatch({ type: "save-success", page: savedPage });
    } catch (error) {
      dispatch({
        type: "save-error",
        message:
          error instanceof Error ? error.message : "ذخیره صفحه انجام نشد.",
      });
    }
  };

  return {
    state: {
      ...state,
      ...selectors,
      isSavingPage: state.save.status === "saving",
      saveMessage: state.save.message,
    },
    actions: {
      setActiveView: (view: BuilderView) =>
        dispatch({ type: "set-active-view", view }),
      setSelectedComponentId: (componentId: string | null) =>
        dispatch({ type: "select-active-component", componentId }),
      setSelectedCreateComponentId: (componentId: string | null) =>
        dispatch({ type: "select-create-component", componentId }),
      setNewMenuTitle: (value: string) =>
        dispatch({ type: "set-create-menu-title", value }),
      setNewMenuDescription: (value: string) =>
        dispatch({ type: "set-create-menu-description", value }),
      setNewPageTitle: (value: string) =>
        dispatch({
          type: "update-page",
          scope: "create",
          updater: (page) => ({ ...page, title: value }),
        }),
      setNewPageSlug: (value: string) =>
        dispatch({
          type: "update-page",
          scope: "create",
          updater: (page) => ({ ...page, slug: value }),
        }),
      setNewPageMenuTitle: (value: string) =>
        dispatch({
          type: "update-page",
          scope: "create",
          updater: (page) => ({ ...page, menuTitle: value }),
        }),
      setNewPageMenuGroupId: (value: string) =>
        dispatch({
          type: "update-page",
          scope: "create",
          updater: (page) => ({ ...page, menuGroupId: value }),
        }),
      setNewPageDescription: (value: string) =>
        dispatch({
          type: "update-page",
          scope: "create",
          updater: (page) => ({ ...page, description: value }),
        }),
      updateActivePage: updatePage("active"),
      updateSelectedComponent: updateSelectedComponent("active"),
      updateNewPageDraft: updatePage("create"),
      updateSelectedCreateComponent: updateSelectedComponent("create"),
      updateActivePageSlug,
      selectPage,
      handleDropAt: handleActiveDropAt,
      addBlockToActivePage: addBlockToPage("active"),
      handleCreatePageDropAt,
      addBlockToNewPage: addBlockToPage("create"),
      removeComponent: removeComponent("active"),
      removeDraftComponent: removeComponent("create"),
      duplicateComponentInActivePage: duplicateComponent("active"),
      duplicateDraftComponent: duplicateComponent("create"),
      handleCreateMenu: () => dispatch({ type: "create-menu" }),
      handleCreatePage: () => dispatch({ type: "create-page" }),
      copyJson,
      saveActivePage,
    },
  };
}
