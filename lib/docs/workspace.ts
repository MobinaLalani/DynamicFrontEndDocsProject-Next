import { samplePages } from "@/lib/docs/sample-pages";
import { createDefaultPage, type DocPage } from "@/lib/docs/schema";

export type MenuGroup = {
  id: string;
  title: string;
  description?: string;
};

export type DocsWorkspace = {
  menuGroups: MenuGroup[];
  pages: DocPage[];
};

export const sampleMenuGroups: MenuGroup[] = [
  {
    id: "core-apis",
    title: "مستندات اصلی",
    description: "endpoint های اصلی پروژه",
  },
  {
    id: "monitoring",
    title: "مانیتورینگ",
    description: "سلامت سرویس و وضعیت سیستم",
  },
];

function clonePages(pages: DocPage[]) {
  return JSON.parse(JSON.stringify(pages)) as DocPage[];
}

export function createDefaultWorkspace(): DocsWorkspace {
  return {
    menuGroups: [...sampleMenuGroups],
    pages: clonePages(samplePages),
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
  }
): DocPage {
  const nextId = currentPages.reduce((max, page) => Math.max(max, page.id), 0) + 1;
  const template = createDefaultPage();
  const slug = sanitizeSlug(input.slug) || `page-${nextId}`;

  return {
    ...template,
    id: nextId,
    slug,
    title: input.title.trim() || "صفحه جدید",
    description: "این صفحه تازه ایجاد شده و آماده ویرایش است.",
    menuGroupId: input.menuGroupId,
    menuTitle: input.menuTitle.trim() || input.title.trim() || "صفحه جدید",
    components: template.components.map((component) => ({ ...component })),
  };
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
