import Link from "next/link";

import { getCurrentSession } from "@/lib/auth/server";

export default async function UnauthorizedPage() {
  const session = await getCurrentSession();
  const target = session?.role === "admin" ? "/admin" : session ? "/pages" : "/login";

  return (
    <main className="flex min-h-screen items-center justify-center p-4 sm:p-6">
      <section className="w-full max-w-lg rounded-[32px] border border-slate-200 bg-white p-6 text-center shadow-sm sm:p-8">
        <p className="text-sm font-medium text-rose-600">دسترسی غیرمجاز</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
          شما به این بخش دسترسی ندارید
        </h1>
        <p className="mt-4 text-sm leading-7 text-slate-600">
          اگر فکر می‌کنی باید به این صفحه دسترسی داشته باشی، نقش کاربر یا منبع احراز هویت را بررسی کن.
        </p>

        <Link
          href={target}
          className="mt-6 inline-flex rounded-2xl bg-slate-950 px-5 py-3 text-sm font-medium text-white"
        >
          بازگشت
        </Link>
      </section>
    </main>
  );
}
