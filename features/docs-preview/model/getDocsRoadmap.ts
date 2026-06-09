import type { DocPage } from "@/lib/docs/schema";
import type { MenuGroup } from "@/lib/docs/workspace";

export type DocsRoadmapItem = {
  label: string;
  href?: string;
  isHome?: boolean;
};

type GetDocsRoadmapInput = {
  activePage?: DocPage;
  activeGroup?: MenuGroup;
};

export function getDocsRoadmap({
  activePage,
  activeGroup,
}: GetDocsRoadmapInput): DocsRoadmapItem[] {
  const items: DocsRoadmapItem[] = [
    {
      label: "خانه",
      href: "/pages",
      isHome: true,
    },
  ];

  if (activeGroup) {
    items.push({
      label: activeGroup.title,
      href: `/pages/group/${activeGroup.id}`,
    });
  }

  if (activePage) {
    items.push({
      label: activePage.menuTitle || activePage.title,
    });
  }

  return items;
}
