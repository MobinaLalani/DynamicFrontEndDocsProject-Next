"use client";

import { useActionState } from "react";
import { loginAction, type LoginFormState } from "@/app/actions/auth";

const initialState: LoginFormState = {};

export function LoginForm() {
  const [state, formAction, pending] = useActionState(
    loginAction,
    initialState,
  );

return (
  <div className="min-h-screen bg-[#eef2f7] flex items-center justify-center p-6">
    <div className="relative w-full max-w-6xl overflow-hidden rounded-[40px] bg-white shadow-2xl">
      <div className="grid min-h-[700px] lg:grid-cols-2">
        {/* LEFT SIDE - FORM */}
        <div className="relative flex items-center justify-center px-10 py-16 bg-white">
          {/* Background shape */}
          <div className="absolute left-0 top-10 text-[420px] font-bold text-slate-100 select-none">
            M
          </div>

          <form action={formAction} className="relative z-10 w-full max-w-md">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-slate-800">خوش آمدید</h2>

              <p className="mt-3 text-slate-500">
                برای مدیریت داکیومنت‌های API، فرم‌ها و کامپوننت‌ها وارد شوید
              </p>

              <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-[#111827]" />
            </div>

            <div className="mt-14 space-y-10">
              <div>
                <input
                  name="username"
                  placeholder="نام کاربری"
                  className="w-full border-0 border-b-2 border-slate-200 bg-transparent py-3 text-lg outline-none transition focus:border-[#111827]"
                />
              </div>

              <div>
                <input
                  type="password"
                  name="password"
                  placeholder="رمز عبور"
                  className="w-full border-0 border-b-2 border-slate-200 bg-transparent py-3 text-lg outline-none transition focus:border-[#111827]"
                />
              </div>
            </div>

            {state?.error && (
              <div className="mt-8 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                {state.error}
              </div>
            )}

            <button
              type="submit"
              disabled={pending}
              className="mt-12 w-full rounded-full bg-[#111827] py-4 text-lg font-semibold text-white shadow-lg transition hover:scale-[1.02] hover:bg-black disabled:opacity-60"
            >
              {pending ? "در حال ورود..." : "ورود"}
            </button>

            <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
              <p className="font-semibold text-slate-900">اکانت‌های تست</p>
              <p className="mt-2">admin / admin123</p>
              <p>user / user123</p>
            </div>
          </form>
        </div>

        {/* RIGHT SIDE - HERO */}
        <div className="relative bg-gradient-to-br from-[#111827] to-[#2F80ED] px-16 py-20 text-white flex flex-col justify-center">
          <div>
            <h1 className="text-5xl font-bold tracking-wide leading-tight">
              ساخت CMS برای API
            </h1>

            <div className="mt-5 h-1 w-28 rounded-full bg-white/80" />

            <p className="mt-10 max-w-md text-lg leading-9 text-white/80">
              داکیومنت API بسازید، فرم‌های داینامیک طراحی کنید و سیستم خود را با
              کامپوننت‌های سفارشی توسعه دهید — همه در یک پلتفرم.
            </p>

            <button
              type="button"
              className="mt-14 rounded-full border-2 border-white/80 px-10 py-4 text-lg font-medium transition hover:bg-white hover:text-[#111827]"
            >
              مشاهده امکانات
            </button>
          </div>

          {/* Decorative */}
          <div className="absolute right-[-70px] bottom-28 h-44 w-44 rounded-full border-[30px] border-white/20" />
        </div>
      </div>
    </div>
  </div>
);
}
