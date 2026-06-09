import type { DocPage } from "@/lib/docs/schema";
import type { MenuGroup } from "@/lib/docs/workspace";

export type FooterLinkItem = {
  href: string;
  label: string;
  description?: string;
};

export type DocsFooterSections = {
  serviceLinks: FooterLinkItem[];
  webServiceLinks: FooterLinkItem[];
};

export function getFooterSections(
  menuGroups: MenuGroup[],
  pages: DocPage[],
  activeGroupId?: string,
): DocsFooterSections {
  const visibleMenuGroups = menuGroups.filter((group) => group.isActive);
  const preferredGroupId =
    activeGroupId ??
    pages.find((page) => page.menuGroupId)?.menuGroupId ??
    visibleMenuGroups[0]?.id;

  const serviceLinks = visibleMenuGroups.map((group) => ({
    href: `/pages/group/${group.id}`,
    label: group.title,
    description:
      group.description?.trim() || "مشاهده سرویس‌ها و مستندات این بخش",
  }));

  const relatedPages = pages
    .filter((page) => page.menuGroupId === preferredGroupId)
    .slice(0, 6);

  const fallbackPages = pages.slice(0, 6);
  const webServiceSource =
    relatedPages.length > 0 ? relatedPages : fallbackPages;

  const webServiceLinks = webServiceSource.map((page) => ({
    href: `/pages/${page.slug}`,
    label: page.menuTitle || page.title,
    description: page.description?.trim() || `/pages/${page.slug}`,
  }));

  return {
    serviceLinks,
    webServiceLinks,
  };
}
