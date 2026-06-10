import { SessionMenu } from "@/components/auth/SessionMenu";
import { Navbar } from "@/components/layout/Navbar";
import type { AuthSession } from "@/lib/auth/types";

type AdminDocsNavbarProps = {
  session: AuthSession;
  title?: string;
  subtitle?: string;
  className?: string;
};

export function AdminDocsNavbar({
  session,
  title = "پنل مدیریت داکیومنت",
  className,
}: AdminDocsNavbarProps) {
  return (
    <Navbar
      className={`border-b border-slate-200 bg-white/95 px-5 py-4 shadow-sm backdrop-blur sm:px-6 ${
        className ?? ""
      }`}
      leftSlot={
        <SessionMenu
          session={session}
          position="bottom-left"
          triggerClassName="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
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
  );
}
