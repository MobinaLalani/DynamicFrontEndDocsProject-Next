import "server-only";

import type { DocPage } from "@/lib/docs/schema";
import { readStoredPages, writeStoredPage } from "@/lib/docs/storage";

function getNextPageId(pages: DocPage[]) {
  return pages.reduce((max, page) => Math.max(max, page.id), 0) + 1;
}

export async function getAllPages(): Promise<DocPage[]> {
  return readStoredPages();
}

export async function getPageBySlug(slug: string): Promise<DocPage | null> {
  const pages = await readStoredPages();
  return pages.find((page) => page.slug === slug) ?? null;
}

export async function savePage(page: DocPage): Promise<DocPage> {
  const pages = await readStoredPages();
  const existingPage = pages.find((item) => item.id === page.id);
  const pageWithId = {
    ...page,
    id: page.id > 0 ? page.id : (existingPage?.id ?? getNextPageId(pages)),
  };

  await writeStoredPage(pageWithId);

  return pageWithId;
}
