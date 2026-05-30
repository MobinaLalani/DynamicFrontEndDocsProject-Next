import { NextResponse } from "next/server";

import { getAllPages, savePage } from "@/lib/docs/page-service";
import type { DocPage } from "@/lib/docs/schema";

export async function GET() {
  const pages = await getAllPages();

  return NextResponse.json(pages);
}

export async function POST(request: Request) {
  const page = (await request.json()) as DocPage;
  const savedPage = await savePage(page);

  return NextResponse.json(savedPage, { status: 201 });
}
