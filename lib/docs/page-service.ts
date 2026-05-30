import { samplePages } from "@/lib/docs/sample-pages";
import type { DocPage } from "@/lib/docs/schema";

const mockDatabase = new Map(samplePages.map((page) => [page.slug, page]));

export async function getAllPages(): Promise<DocPage[]> {
  return Array.from(mockDatabase.values());
}

export async function getPageBySlug(slug: string): Promise<DocPage | null> {
  return mockDatabase.get(slug) ?? null;
}

export async function savePage(page: DocPage): Promise<DocPage> {
  for (const [slug, existingPage] of mockDatabase.entries()) {
    if (existingPage.id === page.id && slug !== page.slug) {
      mockDatabase.delete(slug);
    }
  }

  mockDatabase.set(page.slug, page);

  return page;
}
