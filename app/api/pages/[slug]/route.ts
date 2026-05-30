import { NextResponse } from "next/server";

import { getPageBySlug } from "@/lib/docs/page-service";

type RouteContext = {
  params: Promise<{
    slug: string;
  }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { slug } = await context.params;
  const page = await getPageBySlug(slug);

  if (!page) {
    return NextResponse.json({ message: "Page not found." }, { status: 404 });
  }

  return NextResponse.json(page);
}
