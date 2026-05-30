"use client";

import { useMemo, useState, type DragEvent } from "react";

import { insertComponent, moveComponent } from "@/lib/docs/builder";
import type {
  ApiField,
  DocPage,
  PageComponent,
  PageComponentType,
} from "@/lib/docs/schema";
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

export function useDocsBuilder() {
  const [workspace, setWorkspace] = useState<DocsWorkspace>(
    createDefaultWorkspace,
  );
  const [activeView, setActiveView] = useState<BuilderView>("editor");
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
  const [copied, setCopied] = useState(false);

  const activePage =
    workspace.pages.find((page) => page.slug === selectedPageSlug) ??
    workspace.pages[0] ??
    null;

  const selectedComponent =
    activePage?.components.find(
      (component) => component.id === selectedComponentId,
    ) ?? null;

  const jsonOutput = useMemo(() => buildPrettyJson(workspace), [workspace]);

  const updateWorkspace = (
    updater: (current: DocsWorkspace) => DocsWorkspace,
  ) => {
    setWorkspace((current) => updater(current));
  };

  const updateActivePage = (updater: (page: DocPage) => DocPage) => {
    if (!activePage) {
      return;
    }

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

  const selectPage = (slug: string) => {
    const nextPage = workspace.pages.find((page) => page.slug === slug);

    setActiveView("editor");
    setSelectedPageSlug(slug);
    setSelectedComponentId(nextPage?.components[0]?.id ?? null);
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
  };

  const handleCreatePage = () => {
    if (!newPageMenuGroupId) {
      return;
    }

    updateWorkspace((current) => {
      const draft = createPageFromTemplate(current.pages, {
        title: newPageTitle,
        slug: newPageSlug || newPageTitle,
        menuGroupId: newPageMenuGroupId,
        menuTitle: newPageMenuTitle || newPageTitle,
      });
      const page = {
        ...draft,
        slug: buildUniqueSlug(draft.slug, current.pages),
      };

      setActiveView("editor");
      setSelectedPageSlug(page.slug);
      setSelectedComponentId(page.components[0]?.id ?? null);

      return {
        ...current,
        pages: [...current.pages, page],
      };
    });

    setNewPageTitle("");
    setNewPageSlug("");
    setNewPageMenuTitle("");
  };

  const copyJson = async () => {
    await navigator.clipboard.writeText(jsonOutput);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
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
      copied,
      activePage,
      selectedComponent,
      jsonOutput,
    },
    actions: {
      setActiveView,
      setSelectedComponentId,
      setNewMenuTitle,
      setNewMenuDescription,
      setNewPageTitle,
      setNewPageSlug,
      setNewPageMenuTitle,
      setNewPageMenuGroupId,
      updateActivePage,
      updateSelectedComponent,
      updateActivePageSlug,
      selectPage,
      handleDropAt,
      addBlockToActivePage,
      removeComponent,
      duplicateComponentInActivePage,
      addFieldToSelectedGroup,
      addColumnToSelectedTable,
      addRowToSelectedTable,
      handleCreateMenu,
      handleCreatePage,
      copyJson,
    },
  };
}
