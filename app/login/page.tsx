import { LoginForm } from "@/components/auth/login-form";
import { redirectIfAuthenticated } from "@/lib/auth/server";

export default async function LoginPage() {
  await redirectIfAuthenticated();

  return (
    <main className="flex min-h-screen items-center justify-center p-4 sm:p-6">
      <section className="w-full max-w-md rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="space-y-3">
          <p className="text-sm font-medium text-slate-500">ورود</p>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-950">
            ورود به پنل داکیومنت
          </h1>
          <p className="text-sm leading-7 text-slate-600">
            ادمین به پنل مدیریت و کاربر عادی فقط به صفحه‌های مستندات دسترسی خواهد داشت.
          </p>
        </div>

        <div className="mt-6">
          <LoginForm />
        </div>
      </section>
    </main>
  );
}
