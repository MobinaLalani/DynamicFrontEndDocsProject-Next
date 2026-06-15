import React from 'react';
import { Navbar } from "@/components/layout/Navbar";
import { componentsSettingNavbarType } from '../types/componentsSettingType';
import { SessionMenu } from '@/components/auth/SessionMenu';

export function ComponentsSettingNavbar({
    session ,
    title = "sdfsdf",
    className
}: componentsSettingNavbarType) {
  return (
    <Navbar
      className={`sticky top-0 z-50 border-b border-white/20   bg-white/70 px-5 py-4 rounded-3xl m-3 shadow-lg  sm:px-6 ${
        className ?? ""
      }`}
      leftSlot={
        <SessionMenu
          session={session}
          position="bottom-left"
          triggerClassName="flex h-10 w-10 items-center justify-center rounded-full border border-(--lightBlue) bg-(--lightBlue) text-white shadow-sm transition hover:border-sky-500 hover:bg-sky-600"
          panelClassName="w-[260px] p-4"
        />
      }
      rightSlot={
        <>
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-sky-600">
            Admin Navigation
          </p>
          <h2 className="truncate text-lg font-semibold text-slate-950 sm:text-xl">
            {title}
          </h2>
        </>
      }
    />
  )
}
