import { NextResponse } from "next/server";

import { getCurrentSession } from "@/lib/auth/server";
import { getAllPages, savePage } from "@/lib/docs/page-service";
import type { DocPage } from "@/lib/docs/schema";

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

  const page = (await request.json()) as DocPage;
  const savedPage = await savePage(page);

  return NextResponse.json(savedPage, { status: 201 });
}
