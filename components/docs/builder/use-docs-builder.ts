"use client";

import { useMemo, useState, type DragEvent } from "react";

import { insertComponent, moveComponent } from "@/lib/docs/builder";
import { saveDocPage } from "@/lib/docs/client";
import type {
  ApiField,
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

import {
  componentTransferKey,
  paletteTransferKey,
} from "@/components/docs/builder/constants";

export type BuilderView =
  | "editor"
  | "create-page"
  | "blocks"
  | "preview"
  | "json";

function buildPrettyJson(workspace: DocsWorkspace) {
  return JSON.stringify(workspace, null, 2);
}

function createField(): ApiField {
  return {
    id: `field-${Math.random().toString(36).slice(2, 10)}`,
    name: "newField",
    type: "string",
    required: false,
    description: "توضیح این فیلد را وارد کنید.",
  };
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

export function useDocsBuilder() {
  const [workspace, setWorkspace] = useState<DocsWorkspace>(
    createDefaultWorkspace,
  );
  const [activeView, setActiveView] = useState<BuilderView>("preview");
  const [selectedPageSlug, setSelectedPageSlug] = useState<string>(
    workspace.pages[0]?.slug ?? "",
  );
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(
    workspace.pages[0]?.components[0]?.id ?? null,
  );
  const [newMenuTitle, setNewMenuTitle] = useState("");
  const [newMenuDescription, setNewMenuDescription] = useState("");
  const [newPageTitle, setNewPageTitle] = useState("");
  const [newPageSlug, setNewPageSlug] = useState("");
  const [newPageMenuTitle, setNewPageMenuTitle] = useState("");
  const [newPageMenuGroupId, setNewPageMenuGroupId] = useState(
    workspace.menuGroups[0]?.id ?? "",
  );
  const [newPageDraft, setNewPageDraft] = useState<DocPage>(() =>
    createEmptyDraftPage(workspace.menuGroups[0]?.id ?? ""),
  );
  const [selectedCreateComponentId, setSelectedCreateComponentId] = useState<
    string | null
  >(null);
  const [copied, setCopied] = useState(false);
  const [isSavingPage, setIsSavingPage] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  const activePage =
    workspace.pages.find((page) => page.slug === selectedPageSlug) ??
    workspace.pages[0] ??
    null;

  const selectedComponent =
    activePage?.components.find(
      (component) => component.id === selectedComponentId,
    ) ?? null;
  const selectedCreateComponent =
    newPageDraft.components.find(
      (component) => component.id === selectedCreateComponentId,
    ) ?? null;

  const jsonOutput = useMemo(() => buildPrettyJson(workspace), [workspace]);
  const activePageSnapshot = useMemo(
    () => JSON.stringify(activePage ?? null),
    [activePage],
  );
  const [lastSavedPageSnapshot, setLastSavedPageSnapshot] =
    useState(activePageSnapshot);
  const hasUnsavedPageChanges =
    !!activePage && activePageSnapshot !== lastSavedPageSnapshot;

  const updateWorkspace = (
    updater: (current: DocsWorkspace) => DocsWorkspace,
  ) => {
    setWorkspace((current) => updater(current));
  };

  const updateActivePage = (updater: (page: DocPage) => DocPage) => {
    if (!activePage) {
      return;
    }

    setSaveMessage(null);
    updateWorkspace((current) => ({
      ...current,
      pages: current.pages.map((page) =>
        page.slug === activePage.slug ? updater(page) : page,
      ),
    }));
  };

  const updateSelectedComponent = (
    updater: (component: PageComponent) => PageComponent,
  ) => {
    if (!activePage || !selectedComponentId) {
      return;
    }

    updateActivePage((page) => ({
      ...page,
      components: page.components.map((component) =>
        component.id === selectedComponentId ? updater(component) : component,
      ),
    }));
  };

  const updateNewPageDraft = (updater: (page: DocPage) => DocPage) => {
    setNewPageDraft((current) => updater(current));
  };

  const updateSelectedCreateComponent = (
    updater: (component: PageComponent) => PageComponent,
  ) => {
    if (!selectedCreateComponentId) {
      return;
    }

    updateNewPageDraft((page) => ({
      ...page,
      components: page.components.map((component) =>
        component.id === selectedCreateComponentId
          ? updater(component)
          : component,
      ),
    }));
  };

  const selectPage = (slug: string) => {
    const nextPage = workspace.pages.find((page) => page.slug === slug);

    setActiveView("preview");
    setSelectedPageSlug(slug);
    setSelectedComponentId(nextPage?.components[0]?.id ?? null);
    setLastSavedPageSnapshot(JSON.stringify(nextPage ?? null));
    setSaveMessage(null);
  };

  const handleDropAt = (
    event: DragEvent<HTMLDivElement>,
    targetIndex: number,
  ) => {
    event.preventDefault();

    if (!activePage) {
      return;
    }

    const paletteType = event.dataTransfer.getData(
      paletteTransferKey,
    ) as PageComponentType;
    const componentId = event.dataTransfer.getData(componentTransferKey);

    if (paletteType) {
      updateActivePage((page) => {
        const result = insertComponent(page, paletteType, targetIndex);
        setSelectedComponentId(result.componentId);
        return result.page;
      });
      return;
    }

    if (componentId) {
      updateActivePage((page) => moveComponent(page, componentId, targetIndex));
      setSelectedComponentId(componentId);
    }
  };

  const addBlockToActivePage = (type: PageComponentType) => {
    updateActivePage((page) => {
      const result = insertComponent(page, type, page.components.length);
      setSelectedComponentId(result.componentId);
      return result.page;
    });
  };

  const handleCreatePageDropAt = (
    event: DragEvent<HTMLDivElement>,
    targetIndex: number,
  ) => {
    event.preventDefault();

    const paletteType = event.dataTransfer.getData(
      paletteTransferKey,
    ) as PageComponentType;
    const componentId = event.dataTransfer.getData(componentTransferKey);

    if (paletteType) {
      updateNewPageDraft((page) => {
        const result = insertComponent(page, paletteType, targetIndex);
        setSelectedCreateComponentId(result.componentId);
        return result.page;
      });
      return;
    }

    if (componentId) {
      updateNewPageDraft((page) =>
        moveComponent(page, componentId, targetIndex),
      );
      setSelectedCreateComponentId(componentId);
    }
  };

  const addBlockToNewPage = (type: PageComponentType) => {
    updateNewPageDraft((page) => {
      const result = insertComponent(page, type, page.components.length);
      setSelectedCreateComponentId(result.componentId);
      return result.page;
    });
  };

  const removeComponent = (componentId: string) => {
    if (!activePage) {
      return;
    }

    updateActivePage((page) => {
      const nextComponents = page.components.filter(
        (component) => component.id !== componentId,
      );

      if (selectedComponentId === componentId) {
        setSelectedComponentId(nextComponents[0]?.id ?? null);
      }

      return {
        ...page,
        components: nextComponents,
      };
    });
  };

  const removeDraftComponent = (componentId: string) => {
    updateNewPageDraft((page) => {
      const nextComponents = page.components.filter(
        (component) => component.id !== componentId,
      );

      if (selectedCreateComponentId === componentId) {
        setSelectedCreateComponentId(nextComponents[0]?.id ?? null);
      }

      return {
        ...page,
        components: nextComponents,
      };
    });
  };

  const duplicateComponentInActivePage = (component: PageComponent) => {
    const duplicated = {
      ...component,
      id: `${component.type}-${Math.random().toString(36).slice(2, 10)}`,
    } as PageComponent;

    updateActivePage((page) => ({
      ...page,
      components: page.components.flatMap((item) =>
        item.id === component.id ? [item, duplicated] : [item],
      ),
    }));
    setSelectedComponentId(duplicated.id);
  };

  const duplicateDraftComponent = (component: PageComponent) => {
    const duplicated = {
      ...component,
      id: `${component.type}-${Math.random().toString(36).slice(2, 10)}`,
    } as PageComponent;

    updateNewPageDraft((page) => ({
      ...page,
      components: page.components.flatMap((item) =>
        item.id === component.id ? [item, duplicated] : [item],
      ),
    }));
    setSelectedCreateComponentId(duplicated.id);
  };

  const addFieldToSelectedGroup = () => {
    updateSelectedComponent((component) => {
      if (component.type !== "field-group") {
        return component;
      }

      return {
        ...component,
        fields: [...component.fields, createField()],
      };
    });
  };

  const addFieldToCreateGroup = () => {
    updateSelectedCreateComponent((component) => {
      if (component.type !== "field-group") {
        return component;
      }

      return {
        ...component,
        fields: [...component.fields, createField()],
      };
    });
  };

  const addColumnToSelectedTable = () => {
    updateSelectedComponent((component) => {
      if (component.type !== "table") {
        return component;
      }

      const nextColumnIndex = component.columns.length + 1;
      const field = `field${nextColumnIndex}`;

      return {
        ...component,
        columns: [
          ...component.columns,
          { title: `ستون ${nextColumnIndex}`, field },
        ],
        rows: (component.rows ?? []).map((row) => ({ ...row, [field]: "" })),
      };
    });
  };

  const addColumnToCreateTable = () => {
    updateSelectedCreateComponent((component) => {
      if (component.type !== "table") {
        return component;
      }

      const nextColumnIndex = component.columns.length + 1;
      const field = `field${nextColumnIndex}`;

      return {
        ...component,
        columns: [
          ...component.columns,
          { title: `ستون ${nextColumnIndex}`, field },
        ],
        rows: (component.rows ?? []).map((row) => ({ ...row, [field]: "" })),
      };
    });
  };

  const addRowToSelectedTable = () => {
    updateSelectedComponent((component) => {
      if (component.type !== "table") {
        return component;
      }

      const row = component.columns.reduce<
        Record<string, string | number | null>
      >((result, column) => {
        result[column.field] = "";
        return result;
      }, {});

      return {
        ...component,
        rows: [...(component.rows ?? []), row],
      };
    });
  };

  const addRowToCreateTable = () => {
    updateSelectedCreateComponent((component) => {
      if (component.type !== "table") {
        return component;
      }

      const row = component.columns.reduce<
        Record<string, string | number | null>
      >((result, column) => {
        result[column.field] = "";
        return result;
      }, {});

      return {
        ...component,
        rows: [...(component.rows ?? []), row],
      };
    });
  };

  const updateActivePageSlug = (value: string) => {
    if (!activePage) {
      return;
    }

    const nextSlug = buildUniqueSlug(
      value || activePage.slug,
      workspace.pages.filter((page) => page.slug !== activePage.slug),
    );

    updateActivePage((page) => ({ ...page, slug: nextSlug }));
    setSelectedPageSlug(nextSlug);
  };

  const handleCreateMenu = () => {
    const menu = createMenuGroup({
      title: newMenuTitle,
      description: newMenuDescription,
    });

    updateWorkspace((current) => ({
      ...current,
      menuGroups: [...current.menuGroups, menu],
    }));
    setNewMenuTitle("");
    setNewMenuDescription("");
    setNewPageMenuGroupId(menu.id);
    setNewPageDraft((current) => ({
      ...current,
      menuGroupId: menu.id,
    }));
  };

  const handleCreatePage = () => {
    if (!newPageMenuGroupId) {
      return;
    }

    updateWorkspace((current) => {
      const draft = createPageFromTemplate(current.pages, {
        title: newPageDraft.title || newPageTitle,
        slug: newPageDraft.slug || newPageSlug || newPageTitle,
        menuGroupId: newPageDraft.menuGroupId || newPageMenuGroupId,
        menuTitle: newPageDraft.menuTitle || newPageMenuTitle || newPageTitle,
      });
      const page = {
        ...draft,
        slug: buildUniqueSlug(draft.slug, current.pages),
        title: newPageDraft.title.trim() || draft.title,
        description: newPageDraft.description?.trim() || draft.description,
        menuGroupId: newPageDraft.menuGroupId || draft.menuGroupId,
        menuTitle: newPageDraft.menuTitle.trim() || draft.menuTitle,
        components: JSON.parse(
          JSON.stringify(newPageDraft.components),
        ) as DocPage["components"],
      };

      setActiveView("editor");
      setSelectedPageSlug(page.slug);
      setSelectedComponentId(page.components[0]?.id ?? null);
      setLastSavedPageSnapshot(JSON.stringify(page));
      setSaveMessage(null);

      return {
        ...current,
        pages: [...current.pages, page],
      };
    });

    setNewPageTitle("");
    setNewPageSlug("");
    setNewPageMenuTitle("");
    setNewPageDraft(createEmptyDraftPage(newPageMenuGroupId));
    setSelectedCreateComponentId(null);
  };

  const setCreatePageTitle = (value: string) => {
    setNewPageTitle(value);
    setNewPageDraft((current) => ({
      ...current,
      title: value,
    }));
  };

  const setCreatePageSlug = (value: string) => {
    setNewPageSlug(value);
    setNewPageDraft((current) => ({
      ...current,
      slug: value,
    }));
  };

  const setCreatePageMenuTitle = (value: string) => {
    setNewPageMenuTitle(value);
    setNewPageDraft((current) => ({
      ...current,
      menuTitle: value,
    }));
  };

  const setCreatePageMenuGroup = (value: string) => {
    setNewPageMenuGroupId(value);
    setNewPageDraft((current) => ({
      ...current,
      menuGroupId: value,
    }));
  };

  const setCreatePageDescription = (value: string) => {
    setNewPageDraft((current) => ({
      ...current,
      description: value,
    }));
  };

  const copyJson = async () => {
    await navigator.clipboard.writeText(jsonOutput);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  };

  const saveActivePage = async () => {
    if (!activePage || !hasUnsavedPageChanges || isSavingPage) {
      return;
    }

    setIsSavingPage(true);
    setSaveMessage(null);

    try {
      const savedPage = await saveDocPage(activePage);
      const savedSnapshot = JSON.stringify(savedPage);

      updateWorkspace((current) => ({
        ...current,
        pages: current.pages.map((page) =>
          page.id === savedPage.id ? savedPage : page,
        ),
      }));
      setSelectedPageSlug(savedPage.slug);
      setLastSavedPageSnapshot(savedSnapshot);
      setSaveMessage("تغییرات صفحه با موفقیت ذخیره شد.");
    } catch (error) {
      setSaveMessage(
        error instanceof Error ? error.message : "ذخیره صفحه انجام نشد.",
      );
    } finally {
      setIsSavingPage(false);
    }
  };

  return {
    state: {
      workspace,
      activeView,
      selectedPageSlug,
      selectedComponentId,
      newMenuTitle,
      newMenuDescription,
      newPageTitle,
      newPageSlug,
      newPageMenuTitle,
      newPageMenuGroupId,
      newPageDraft,
      selectedCreateComponentId,
      selectedCreateComponent,
      copied,
      isSavingPage,
      saveMessage,
      hasUnsavedPageChanges,
      activePage,
      selectedComponent,
      jsonOutput,
    },
    actions: {
      setActiveView,
      setSelectedComponentId,
      setNewMenuTitle,
      setNewMenuDescription,
      setNewPageTitle: setCreatePageTitle,
      setNewPageSlug: setCreatePageSlug,
      setNewPageMenuTitle: setCreatePageMenuTitle,
      setNewPageMenuGroupId: setCreatePageMenuGroup,
      setNewPageDescription: setCreatePageDescription,
      updateActivePage,
      updateSelectedComponent,
      updateNewPageDraft,
      updateSelectedCreateComponent,
      updateActivePageSlug,
      selectPage,
      handleDropAt,
      addBlockToActivePage,
      handleCreatePageDropAt,
      addBlockToNewPage,
      removeComponent,
      removeDraftComponent,
      duplicateComponentInActivePage,
      duplicateDraftComponent,
      addFieldToSelectedGroup,
      addFieldToCreateGroup,
      addColumnToSelectedTable,
      addColumnToCreateTable,
      addRowToSelectedTable,
      addRowToCreateTable,
      handleCreateMenu,
      handleCreatePage,
      copyJson,
      saveActivePage,
      setSelectedCreateComponentId,
    },
  };
}
