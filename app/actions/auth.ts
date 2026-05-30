"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { authProvider } from "@/lib/auth/provider";
import { clearAuthSession } from "@/lib/auth/server";
import { createSessionToken, sessionCookieConfig } from "@/lib/auth/session";

export type LoginFormState = {
  error?: string;
};

export async function loginAction(
  _previousState: LoginFormState | undefined,
  formData: FormData
): Promise<LoginFormState | undefined> {
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!username || !password) {
    return {
      error: "نام کاربری و رمز عبور الزامی است.",
    };
  }

  const result = await authProvider.login({ username, password });

  if (!result.success) {
    return {
      error: result.message,
    };
  }

  const cookieStore = await cookies();
  cookieStore.set({
    ...sessionCookieConfig,
    value: createSessionToken(result.user),
  });

  if (result.user.role === "admin") {
    redirect("/admin");
  }

  redirect("/pages");
}

export async function logoutAction() {
  await clearAuthSession();
  redirect("/login");
}
