"use client";

import { useActionState } from "react";

import { loginAction, type LoginFormState } from "@/app/actions/auth";

const initialState: LoginFormState = {};

const inputClass =
  "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-slate-400";

export function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, initialState);

  return (
    <form action={formAction} className="space-y-5">
      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 text-sm leading-7 text-slate-600">
        <p className="font-semibold text-slate-900">ورود آزمایشی</p>
        <p className="mt-2">ادمین: `admin / admin123`</p>
        <p>کاربر: `user / user123`</p>
      </div>

      <label className="block space-y-2">
        <span className="text-sm font-medium text-slate-700">نام کاربری</span>
        <input name="username" className={inputClass} placeholder="admin" />
      </label>

      <label className="block space-y-2">
        <span className="text-sm font-medium text-slate-700">رمز عبور</span>
        <input
          name="password"
          type="password"
          className={inputClass}
          placeholder="••••••••"
        />
      </label>

      {state?.error ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {state.error}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-2xl bg-slate-950 px-4 py-3 font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "در حال ورود..." : "ورود به پنل"}
      </button>
    </form>
  );
}
