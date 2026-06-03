import { logoutAction } from "@/app/actions/auth";
import type { AuthSession } from "@/lib/auth/types";

type SessionBarProps = {
  session: AuthSession;
  className?: string;
};

export function SessionBar({ session, className }: SessionBarProps) {
  const roleLabel = session.role === "admin" ? "ادمین" : "کاربر";

  return (
    <div
      className={`mb-6 flex flex-col gap-3 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between ${className ?? ""}`}
    >
      <div className="space-y-1">
        <p className="text-sm font-medium text-slate-500"> فعال</p>
        <p className="text-lg font-semibold text-slate-950">
          {session.displayName}
        </p>
        <p className="text-sm text-slate-600">
          {session.username} | {roleLabel}
        </p>
      </div>

      <form action={logoutAction}>
        <button
          type="submit"
          className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-400"
        >
          خروج
        </button>
      </form>
    </div>
  );
}
