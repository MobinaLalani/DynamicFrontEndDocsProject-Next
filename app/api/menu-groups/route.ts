import { NextResponse } from "next/server";

import { getCurrentSession } from "@/lib/auth/server";
import { saveWorkspaceMenuGroups } from "@/lib/docs/workspace-service";
import type { MenuGroup } from "@/lib/docs/workspace";

type SaveMenuGroupsRequest = {
  menuGroups: MenuGroup[];
};

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

  const payload = (await request.json()) as SaveMenuGroupsRequest;
  const menuGroups = payload.menuGroups ?? [];

  await saveWorkspaceMenuGroups(menuGroups);

  return NextResponse.json(menuGroups, { status: 200 });
}
