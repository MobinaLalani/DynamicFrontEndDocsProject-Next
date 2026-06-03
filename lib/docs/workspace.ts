import type { DocPage } from "@/lib/docs/schema";

export type MenuGroup = {
  id: string;
  title: string;
  description?: string;
};

export type DocsWorkspace = {
  menuGroups: MenuGroup[];
  pages: DocPage[];
};

export function createDefaultWorkspace(): DocsWorkspace {
  return {
    menuGroups: [],
    pages: [],
  };
}

function sanitizeSlug(input: string) {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function createPageFromTemplate(
  currentPages: DocPage[],
  input: {
    title: string;
    slug: string;
    menuGroupId: string;
    menuTitle: string;
    description?: string;
    components?: DocPage["components"];
  },
): DocPage {
  const nextId =
    currentPages.reduce((max, page) => Math.max(max, page.id), 0) + 1;
  const slug = sanitizeSlug(input.slug) || `page-${nextId}`;

  return {
    id: nextId,
    slug,
    title: input.title.trim() || "صفحه جدید",
    description: input.description?.trim() || "",
    menuGroupId: input.menuGroupId,
    menuTitle: input.menuTitle.trim() || input.title.trim() || "صفحه جدید",
    components:
      input.components?.map((component) =>
        JSON.parse(JSON.stringify(component)),
      ) ?? [],
  };
}

export function createPageFromDraft(
  currentPages: DocPage[],
  draftPage: DocPage,
): DocPage {
  return createPageFromTemplate(currentPages, {
    title: draftPage.title,
    slug: draftPage.slug || draftPage.title,
    menuGroupId: draftPage.menuGroupId,
    menuTitle: draftPage.menuTitle || draftPage.title,
    description: draftPage.description,
    components: draftPage.components,
  });
}

export function createMenuGroup(input: {
  title: string;
  description?: string;
}): MenuGroup {
  const normalizedTitle = input.title.trim() || "منوی جدید";

  return {
    id: `menu-${Math.random().toString(36).slice(2, 10)}`,
    title: normalizedTitle,
    description: input.description?.trim() || "گروه منوی تازه ایجاد شده",
  };
}
