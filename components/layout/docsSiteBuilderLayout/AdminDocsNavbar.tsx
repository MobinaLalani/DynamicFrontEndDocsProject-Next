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
      className={`sticky top-0 z-50 border-b border-white/20   bg-(--lightGray) px-5 py-4 rounded-3xl m-3 shadow-lg  sm:px-6 ${
        className ?? ""
      }`}
      leftSlot={
        <SessionMenu
          session={session}
          position="bottom-left"
          triggerClassName="flex h-10 w-10 items-center justify-center rounded-full border border-black bg-[#e9c46a] text-black shadow-sm transition hover:border-sky-500 hover:bg-sky-600"
          panelClassName="w-[260px] p-4"
        />
      }
      rightSlot={
        <>
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-sky-100">
            Admin Navigation
          </p>
          <h2 className="truncate text-lg font-semibold text-white sm:text-xl">
            {title}
          </h2>
        </>
      }
    />
  );
}
