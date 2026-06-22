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
    <div className="flex min-h-screen w-full items-center justify-center bg-[#D5E4F7] p-4">
      <div
        className="relative flex w-full max-w-5xl overflow-hidden rounded-[36px] shadow-[0_32px_80px_rgba(0,0,0,0.6)]"
        style={{ minHeight: "620px" }}
      >
        {/* ── LEFT PANEL ────────────────────────────────────── */}
        <div className="relative hidden overflow-hidden lg:flex lg:w-[58%] flex-col justify-between bg-gradient-to-br from-[#0d2550] via-[#1A3F76] to-[#1d5ba8] p-12">

          {/* Dot-grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                "radial-gradient(circle, #ffffff 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />

          {/* Animated orbs */}
          <div className="login-orb-1 login-pulse absolute left-[10%] top-[8%] h-72 w-72 rounded-full bg-[#1078F9]/25 blur-3xl" />
          <div className="login-orb-2 absolute bottom-[8%] right-[2%] h-80 w-80 rounded-full bg-[#1078F9]/15 blur-3xl" />
          <div className="login-orb-3 absolute left-[55%] top-[42%] h-52 w-52 rounded-full bg-white/8 blur-2xl" />

          {/* Rotating rings */}
          <div className="login-ring-1 absolute right-[-80px] top-[25%] h-72 w-72 rounded-full border border-white/10" />
          <div className="login-ring-2 absolute bottom-[18%] left-[-50px] h-56 w-56 rounded-full border border-[#1078F9]/25" />
          <div className="login-ring-3 absolute left-[28%] top-[-60px] h-[420px] w-[420px] rounded-full border border-white/[0.04]" />

          {/* Small floating accent circles */}
          <div className="login-orb-1 absolute left-[70%] top-[15%] h-4 w-4 rounded-full bg-[#1078F9]/60" />
          <div className="login-orb-2 absolute left-[20%] top-[65%] h-3 w-3 rounded-full bg-white/40" />
          <div className="login-orb-3 absolute left-[80%] top-[70%] h-2.5 w-2.5 rounded-full bg-[#1078F9]/50" />

          {/* ── Brand ── */}
          <div className="relative z-10 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#1078F9]">
              <span className="text-sm font-bold text-white">D</span>
            </div>
            <span className="text-sm font-semibold tracking-[0.18em] text-white/50 uppercase">
              DocsPlatform
            </span>
          </div>

          {/* ── Hero text ── */}
          <div className="relative z-10">
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-white">
              پلتفرم داینامیک
              <br />
              <span className="text-[#1078F9]">مستندسازی API</span>
            </h1>
            <p className="mt-4 max-w-xs text-sm leading-7 text-white/45">
              داکیومنت API بسازید، فرم‌های داینامیک طراحی کنید و کامپوننت‌های
              سفارشی توسعه دهید — همه در یک پلتفرم.
            </p>

            {/* Feature chips */}
            <div className="mt-7 flex flex-wrap gap-2">
              {["RBAC", "API Builder", "CMS Blocks", "Live Preview"].map(
                (f) => (
                  <span
                    key={f}
                    className="rounded-full border border-white/12 bg-white/5 px-3 py-1 text-xs text-white/50"
                  >
                    {f}
                  </span>
                ),
              )}
            </div>
          </div>

          {/* ── Bottom rule ── */}
          <div className="relative z-10 flex items-center gap-3">
            <div className="h-1.5 w-1.5 rounded-full bg-[#1078F9]" />
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-xs text-white/25">v2.0</span>
          </div>
        </div>

        {/* ── RIGHT PANEL ───────────────────────────────────── */}
        <div className="relative flex flex-1 items-center justify-center bg-white px-8 py-12 sm:px-12">
          {/* Subtle dot bg */}
          <div
            className="absolute inset-0 opacity-[0.018]"
            style={{
              backgroundImage:
                "radial-gradient(circle, #1A3F76 1px, transparent 1px)",
              backgroundSize: "22px 22px",
            }}
          />

          <form
            action={formAction}
            className="relative z-10 w-full max-w-[340px]"
            dir="rtl"
          >
            {/* Mobile brand */}
            <div className="mb-8 flex items-center gap-2 lg:hidden">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#1A3F76]">
                <span className="text-sm font-bold text-white">D</span>
              </div>
              <span className="text-sm font-semibold text-slate-600">
                DocsPlatform
              </span>
            </div>

            {/* Heading */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                ورود به حساب
              </h2>
              <p className="mt-1.5 text-sm text-slate-400">
                اطلاعات خود را وارد کنید
              </p>
              <div className="mt-4 h-0.5 w-10 rounded-full bg-[#1078F9]" />
            </div>

            {/* Fields */}
            <div className="mt-8 space-y-5">
              <div>
                <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                  نام کاربری
                </label>
                <input
                  name="username"
                  autoComplete="username"
                  placeholder="username"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-300 focus:border-[#1078F9] focus:bg-white focus:shadow-[0_0_0_3px_rgba(16,120,249,0.10)]"
                />
              </div>

              <div>
                <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                  رمز عبور
                </label>
                <input
                  type="password"
                  name="password"
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-300 focus:border-[#1078F9] focus:bg-white focus:shadow-[0_0_0_3px_rgba(16,120,249,0.10)]"
                />
              </div>
            </div>

            {/* Error */}
            {state?.error && (
              <div className="mt-5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs text-rose-600">
                {state.error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={pending}
              className="mt-6 w-full rounded-xl bg-[#1A3F76] py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#1078F9] hover:shadow-[0_6px_24px_rgba(16,120,249,0.35)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {pending ? "در حال ورود..." : "ورود به سیستم"}
            </button>

            {/* Test accounts */}
            <div className="mt-6 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3.5">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                اکانت‌های تست
              </p>
              <div className="space-y-1">
                <p className="font-mono text-xs text-slate-500">
                  admin / admin123
                </p>
                <p className="font-mono text-xs text-slate-500">
                  user / user123
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
