import { connection } from "next/server";

import { requireRole } from "@/lib/auth/server";

export default async function ComponentsSettingPage() {
  await connection();
  await requireRole("admin");

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="text-xs font-medium uppercase tracking-[0.24em] text-sky-600">
          Components Setting
        </p>
        <h1 className="mt-2 text-2xl font-semibold text-slate-950">
          تنظیمات کامپوننت‌ها
        </h1>
        <p className="mt-2 text-slate-500">
          از این بخش می‌توانید کامپوننت‌های سیستم را مدیریت و پیکربندی کنید.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-sky-600">
            مدیریت محتوا
          </p>
          <p className="mt-2 text-lg font-semibold text-slate-950">
            کامپوننت‌های محتوا
          </p>
          <p className="mt-1 text-sm text-slate-500">
            ساخت و مدیریت بلاک‌های محتوایی صفحات
          </p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-sky-600">
            تنظیمات سیستم
          </p>
          <p className="mt-2 text-lg font-semibold text-slate-950">
            پیکربندی سیستم
          </p>
          <p className="mt-1 text-sm text-slate-500">
            تنظیمات کلی و پیکربندی پروژه
          </p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-sky-600">
            کاربران
          </p>
          <p className="mt-2 text-lg font-semibold text-slate-950">
            مدیریت کاربران
          </p>
          <p className="mt-1 text-sm text-slate-500">
            مدیریت کاربران و سطوح دسترسی
          </p>
        </div>
      </div>
    </div>
  );
}
