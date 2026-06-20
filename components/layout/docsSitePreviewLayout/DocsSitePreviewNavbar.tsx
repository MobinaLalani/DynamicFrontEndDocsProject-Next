import { SessionMenu } from "@/components/auth/SessionMenu";
import { Navbar } from "@/components/layout/Navbar";
import type { AuthSession } from "@/lib/auth/types";

type DocsSitePreviewNavbarProps = {
  session?: AuthSession;
  title: string;
  subtitle?: string;
  className?: string;
};

export function DocsSitePreviewNavbar({
  session,
  title,
  subtitle,
  className,
}: DocsSitePreviewNavbarProps) {
  return (
    <Navbar
      className={`sticky top-0 z-50 border-b border-slate-200/60 bg-white/80 backdrop-blur-sm px-5 py-4 rounded-3xl m-3 shadow-lg sm:px-6 ${
        className ?? ""
      }`}
      leftSlot={
        session ? (
          <SessionMenu
            session={session}
            position="bottom-left"
            triggerClassName="flex h-10 w-10 items-center justify-center rounded-full border border-[#42648A] bg-[#42648A] text-white shadow-sm transition hover:border-[#1A3F76] hover:bg-[#1A3F76]"
            panelClassName="w-[260px] p-4"
          />
        ) : null
      }
      rightSlot={
        <>
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-(--darkGray)">
            Navigation
          </p>

          <h2 className="truncate text-lg font-semibold text-slate-950 sm:text-xl">
            {title}
          </h2>

          {subtitle ? (
            <p className="mt-1 truncate text-sm text-slate-500">{subtitle}</p>
          ) : null}
        </>
      }
    />
  );
}
