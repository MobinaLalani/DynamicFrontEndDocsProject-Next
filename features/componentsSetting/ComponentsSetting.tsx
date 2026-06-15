"use client";
import React, { useState } from "react";
import {
  ComponentsSettingSidebar,
  ComponentsSettingNavbar,
} from "./layout/index";
import { ComponentsSettingProps } from "./types/componentsSettingType";

function ComponentsSetting(props: ComponentsSettingProps) {
    
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const {
    menuGroups,
    pages,
    activePageSlug,
    activeGroupId,
    session,
    interactive,
    onSelectPage,
    onCreatePage,
    showSidebar = true,
    content,
  } = props;
  return (
    <>
      {showSidebar && (
        <ComponentsSettingSidebar
          isOpen={isSidebarOpen}
          menuGroups={menuGroups}
          pages={pages}
          activePageSlug={activePageSlug}
          activeGroupId={activeGroupId}
          interactive={interactive}
          onToggle={() => setIsSidebarOpen((current) => !current)}
          onSelectPage={onSelectPage}
          onCreatePage={onCreatePage}
        />
      )}
    </>
  );
}

export default ComponentsSetting;
