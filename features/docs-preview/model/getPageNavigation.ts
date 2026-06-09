import type { DocPage } from "@/lib/docs/schema";

export type PageNavigationItem = {
  slug: string;
  title: string;
};

export type PageNavigationState = {
  previousPage: PageNavigationItem | null;
  nextPage: PageNavigationItem | null;
};

export function getPageNavigation(
  pages: DocPage[],
  activePageSlug?: string,
): PageNavigationState {
  if (!activePageSlug) {
    return {
      previousPage: null,
      nextPage: null,
    };
  }

  const activePage = pages.find((page) => page.slug === activePageSlug);

  if (!activePage) {
    return {
      previousPage: null,
      nextPage: null,
    };
  }

  const siblingPages = pages.filter(
    (page) => page.menuGroupId === activePage.menuGroupId,
  );
  const activePageIndex = siblingPages.findIndex(
    (page) => page.slug === activePageSlug,
  );

  if (activePageIndex === -1) {
    return {
      previousPage: null,
      nextPage: null,
    };
  }

  const previousPage = siblingPages[activePageIndex - 1];
  const nextPage = siblingPages[activePageIndex + 1];

  return {
    previousPage: previousPage
      ? {
          slug: previousPage.slug,
          title: previousPage.menuTitle || previousPage.title,
        }
      : null,
    nextPage: nextPage
      ? {
          slug: nextPage.slug,
          title: nextPage.menuTitle || nextPage.title,
        }
      : null,
  };
}
