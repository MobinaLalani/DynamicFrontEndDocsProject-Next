import "server-only";

import { mkdir, readdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";

import type { DocPage } from "@/lib/docs/schema";
import type { MenuGroup } from "@/lib/docs/workspace";

const docsDataDirectory = path.join(process.cwd(), "data", "docs");
const pagesDirectory = path.join(docsDataDirectory, "pages");
const menuGroupsFilePath = path.join(docsDataDirectory, "menu-groups.json");

async function pathExists(targetPath: string) {
  try {
    await stat(targetPath);
    return true;
  } catch {
    return false;
  }
}

async function ensureDocsDataDirectory() {
  await mkdir(pagesDirectory, { recursive: true });
}

async function readJsonFile<T>(filePath: string, fallback: T): Promise<T> {
  if (!(await pathExists(filePath))) {
    return fallback;
  }

  try {
    const fileContent = await readFile(filePath, "utf8");
    return JSON.parse(fileContent) as T;
  } catch {
    return fallback;
  }
}

export async function readStoredPages(): Promise<DocPage[]> {
  await ensureDocsDataDirectory();

  const fileNames = await readdir(pagesDirectory).catch(() => []);
  const pages = await Promise.all(
    fileNames
      .filter((fileName) => fileName.endsWith(".json"))
      .map((fileName) =>
        readJsonFile<DocPage | null>(path.join(pagesDirectory, fileName), null),
      ),
  );

  return pages
    .filter((page): page is DocPage => !!page)
    .sort((left, right) => left.id - right.id);
}

export async function writeStoredPage(page: DocPage) {
  await ensureDocsDataDirectory();

  const existingPages = await readStoredPages();
  const previousPage = existingPages.find((item) => item.id === page.id);

  if (previousPage && previousPage.slug !== page.slug) {
    const previousFilePath = path.join(pagesDirectory, `${previousPage.slug}.json`);
    if (await pathExists(previousFilePath)) {
      await rm(previousFilePath, { force: true });
    }
  }

  const nextFilePath = path.join(pagesDirectory, `${page.slug}.json`);
  await writeFile(nextFilePath, JSON.stringify(page, null, 2), "utf8");
}

export async function readStoredMenuGroups(): Promise<MenuGroup[]> {
  await ensureDocsDataDirectory();
  return readJsonFile<MenuGroup[]>(menuGroupsFilePath, []);
}

export async function writeStoredMenuGroups(menuGroups: MenuGroup[]) {
  await ensureDocsDataDirectory();
  await writeFile(menuGroupsFilePath, JSON.stringify(menuGroups, null, 2), "utf8");
}
