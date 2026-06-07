import type { DocPage } from "@/lib/docs/schema";
import type { MenuGroup } from "@/lib/docs/workspace";

export async function saveDocPage(page: DocPage): Promise<DocPage> {
  return saveDocPageWithWorkspace(page);
}

export async function saveDocPageWithWorkspace(
  page: DocPage,
  menuGroups?: MenuGroup[],
): Promise<DocPage> {
  const response = await fetch("/api/pages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(menuGroups ? { page, menuGroups } : page),
  });

  if (!response.ok) {
    const payload = (await response.json().catch(() => null)) as {
      message?: string;
    } | null;

    throw new Error(payload?.message ?? "ذخیره صفحه با خطا مواجه شد.");
  }

  return (await response.json()) as DocPage;
}

export async function saveMenuGroups(
  menuGroups: MenuGroup[],
): Promise<MenuGroup[]> {
  const response = await fetch("/api/menu-groups", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ menuGroups }),
  });

  if (!response.ok) {
    const payload = (await response.json().catch(() => null)) as {
      message?: string;
    } | null;

    throw new Error(payload?.message ?? "ذخیره منوها با خطا مواجه شد.");
  }

  return (await response.json()) as MenuGroup[];
}
