import "server-only";

import type { DocsWorkspace, MenuGroup } from "@/lib/docs/workspace";
import { getAllPages } from "@/lib/docs/page-service";
import { readStoredMenuGroups, writeStoredMenuGroups } from "@/lib/docs/storage";

export async function getStoredWorkspace(): Promise<DocsWorkspace> {
  const [menuGroups, pages] = await Promise.all([
    readStoredMenuGroups(),
    getAllPages(),
  ]);

  return {
    menuGroups,
    pages,
  };
}

export async function saveWorkspaceMenuGroups(menuGroups: MenuGroup[]) {
  await writeStoredMenuGroups(menuGroups);
}
