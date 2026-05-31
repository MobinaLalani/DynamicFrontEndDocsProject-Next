"use client";

import type { DocPage } from "@/lib/docs/schema";
import type { DocsWorkspace } from "@/lib/docs/workspace";

export type BuilderView =
  | "editor"
  | "create-page"
  | "blocks"
  | "preview"
  | "json";

export type PageEditorScope = "active" | "create";

export type CreateMenuForm = {
  title: string;
  description: string;
};

export type SaveState = {
  status: "idle" | "saving" | "success" | "error";
  message: string | null;
  lastSavedPageSnapshot: string;
};

export type DocsBuilderState = {
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
