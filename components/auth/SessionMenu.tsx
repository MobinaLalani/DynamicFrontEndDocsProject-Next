"use client";

import { LogOut, Shield, User } from "lucide-react";

import { logoutAction } from "@/app/actions/auth";
import { Popover } from "@/components/ui/Popover";
import type { AuthSession } from "@/lib/auth/types";

type SessionMenuProps = {
  session: AuthSession;
  triggerClassName?: string;
  panelClassName?: string;
  position?: "bottom-left" | "bottom-right" | "top-left" | "top-right";
};

export function SessionMenu({
  session,
  triggerClassName,
  panelClassName,
  position = "bottom-left",
}: SessionMenuProps) {
  const roleLabel = session.role === "admin" ? "ادمین" : "کاربر";

  return (
    <Popover
      position={position}
      trigger={
        <button
          type="button"
          aria-label="باز کردن منوی کاربر"
          className={
            triggerClassName ??
            "flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
          }
        >
          <User className="h-5 w-5" />
        </button>
      }
    >
      <div dir="rtl" className={panelClassName ?? "w-[280px] p-4"}>
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1">
              <p className="text-sm font-medium text-slate-500">فعال</p>
              <p className="text-lg font-semibold text-slate-950">
                {session.displayName}
              </p>
              <p className="text-sm text-slate-600">{session.username}</p>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
              <Shield className="h-3.5 w-3.5" />
              {roleLabel}
            </span>
          </div>

          <form action={logoutAction}>
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
            >
              <LogOut className="h-4 w-4" />
              خروج
            </button>
          </form>
        </div>
      </div>
    </Popover>
  );
}
