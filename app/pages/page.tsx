import { notFound, redirect } from "next/navigation";

import { requireAuth } from "@/lib/auth/server";
import { getAllPages } from "@/lib/docs/page-service";

export default async function DocsIndexPage() {
  await requireAuth();

  const pages = await getAllPages();
  const firstPage = pages[0];

  if (!firstPage) {
    notFound();
  }

  redirect(`/pages/${firstPage.slug}`);
}
