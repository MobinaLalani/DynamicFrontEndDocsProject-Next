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
      className={`border-b border-slate-200 bg-white/95 px-5 py-4 shadow-sm backdrop-blur sm:px-6 ${
        className ?? ""
      }`}
      leftSlot={
        session ? (
          <SessionMenu
            session={session}
            position="bottom-left"
            triggerClassName="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
            panelClassName="w-[240px] p-4"
          />
        ) : null
      }
      rightSlot={
        <>
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-sky-600">
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
