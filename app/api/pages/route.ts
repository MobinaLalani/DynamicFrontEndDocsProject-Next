import { NextResponse } from "next/server";

import { getCurrentSession } from "@/lib/auth/server";
import { getAllPages, savePage } from "@/lib/docs/page-service";
import type { DocPage } from "@/lib/docs/schema";
import { saveWorkspaceMenuGroups } from "@/lib/docs/workspace-service";
import type { MenuGroup } from "@/lib/docs/workspace";

type SavePageRequest = DocPage | { page: DocPage; menuGroups?: MenuGroup[] };

export async function GET() {
  const session = await getCurrentSession();

  if (!session) {
    return NextResponse.json(
      { message: "Authentication required." },
      { status: 401 },
    );
  }

  const pages = await getAllPages();

  return NextResponse.json(pages);
}

export async function POST(request: Request) {
  const session = await getCurrentSession();

  if (!session) {
    return NextResponse.json(
      { message: "Authentication required." },
      { status: 401 },
    );
  }

  if (session.role !== "admin") {
    return NextResponse.json({ message: "Forbidden." }, { status: 403 });
  }

  const payload = (await request.json()) as SavePageRequest;
  const page = "page" in payload ? payload.page : payload;
  const menuGroups = "page" in payload ? payload.menuGroups : undefined;

  if (menuGroups) {
    await saveWorkspaceMenuGroups(menuGroups);
  }

  const savedPage = await savePage(page);

  return NextResponse.json(savedPage, { status: 201 });
}
