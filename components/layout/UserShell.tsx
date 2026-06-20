"use client";

import { usePathname } from "next/navigation";

import { DocsSitePreviewSidebar } from "@/components/layout/docsSitePreviewLayout";
import { useSidebar } from "@/context/SidebarContext";
import type { AuthSession } from "@/lib/auth/types";
import type { DocsWorkspace } from "@/lib/docs/workspace";

type UserShellProps = {
  workspace: DocsWorkspace;
  session: AuthSession;
  children: React.ReactNode;
};

export function UserShell({ workspace, session, children }: UserShellProps) {
  const { isOpen } = useSidebar();
  const pathname = usePathname();

  const slugMatch = pathname.match(/^\/pages\/([^/]+)$/);
  const activePageSlug = slugMatch?.[1];

  const groupMatch = pathname.match(/^\/pages\/group\/([^/]+)$/);
  const activeGroupId = groupMatch?.[1];

  return (
    <section dir="ltr" className="flex min-h-screen overflow-hidden">
      <div
        className={`flex flex-1 flex-col transition-[padding] duration-300 ${
          isOpen ? "xl:pr-[360px]" : "xl:pr-[72px]"
        }`}
      >
        {children}
      </div>

      <DocsSitePreviewSidebar
        isOpen={isOpen}
        menuGroups={workspace.menuGroups}
        pages={workspace.pages}
        activePageSlug={activePageSlug}
        activeGroupId={activeGroupId}
        role={session.role}
      />
    </section>
  );
}
