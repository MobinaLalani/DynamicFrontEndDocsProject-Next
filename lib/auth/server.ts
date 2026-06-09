import "server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { AUTH_COOKIE_NAME } from "@/lib/auth/config";
import { authProvider } from "@/lib/auth/provider";
import { sessionCookieConfig, verifySessionToken } from "@/lib/auth/session";
import type { AuthRole, AuthSession } from "@/lib/auth/types";

export async function getCurrentSession(): Promise<AuthSession | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  const session = verifySessionToken(token);

  if (!session) {
    return null;
  }

  const user = await authProvider.getUserById(session.userId);

  if (!user || user.role !== session.role) {
    return null;
  }

  return session;
}

export async function requireAuth() {
  const session = await getCurrentSession();

  if (!session) {
    redirect("/login");
  }

  return session;
}

export async function requireRole(role: AuthRole) {
  const session = await requireAuth();

  if (session.role !== role) {
    redirect("/unauthorized");
  }

  return session;
}

export async function redirectIfAuthenticated() {
  const session = await getCurrentSession();

  if (!session) {
    return;
  }

  if (session.role === "admin") {
    redirect("/admin");
  }

  redirect("/pages");
}

export async function clearAuthSession() {
  const cookieStore = await cookies();
  cookieStore.set({
    ...sessionCookieConfig,
    name: AUTH_COOKIE_NAME,
    value: "",
    
    maxAge: 0,
  });
}
