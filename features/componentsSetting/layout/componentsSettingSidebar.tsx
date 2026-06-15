import React from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { componentsSettingSidebarType } from "../types/componentsSettingType";

export function ComponentsSettingSidebar({
  isOpen,
  menuGroups,
  pages,
  activePageSlug,
  activeGroupId,
  interactive = false,
  onToggle,
  onSelectPage,
  onCreatePage,
}: componentsSettingSidebarType) {
  return (
    <Sidebar
      isOpen={isOpen}
      className="border-l border-white/10 bg-(--darkBlue) text-white"
      expandedWidthClassName="w-full sm:w-[360px]"
    >
      test
    </Sidebar>
  );
}


