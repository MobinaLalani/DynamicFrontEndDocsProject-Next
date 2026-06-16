"use client";

import React, { useState } from "react";
import {
  ComponentsSettingSidebar,
  ComponentsSettingNavbar,
} from "./layout/index";
import { ComponentsSettingProps } from "./types/componentsSettingType";

export function ComponentsSetting(props: ComponentsSettingProps) {
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
    <section dir="ltr" className="relative min-h-screen overflow-hidden">
      {/* SIDEBAR SPACE ADJUSTMENT */}
      <div
        className={`transition-[padding] duration-300 ${
          isSidebarOpen ? "xl:pr-[360px]" : "xl:pr-18"
        }`}
      >
        {/* NAVBAR */}
        {/* <ComponentsSettingNavbar session={session} /> */}

        {/* MAIN CONTENT */}
        <main className="p-6">{content}</main>
      </div>

      {/* SIDEBAR */}
      {showSidebar && (
        <ComponentsSettingSidebar
          isOpen={isSidebarOpen}
          menuGroups={menuGroups}
          pages={pages}
          activePageSlug={activePageSlug}
          activeGroupId={activeGroupId}
          interactive={interactive}
          onToggle={() => setIsSidebarOpen((v) => !v)}
          onSelectPage={onSelectPage}
          onCreatePage={onCreatePage}
        />
      )}
    </section>
  );
}
