import { createHmac, timingSafeEqual } from "node:crypto";

import { AUTH_COOKIE_NAME, AUTH_SESSION_TTL_SECONDS, getAuthSecret } from "@/lib/auth/config";
import type { AuthSession, AuthUser } from "@/lib/auth/types";

function base64UrlEncode(value: string) {
  return Buffer.from(value, "utf8").toString("base64url");
}

function base64UrlDecode(value: string) {
  return Buffer.from(value, "base64url").toString("utf8");
}

function signPayload(payload: string) {
  return createHmac("sha256", getAuthSecret()).update(payload).digest("base64url");
}

export function createSessionToken(user: AuthUser) {
  const session: AuthSession = {
    userId: user.id,
    role: user.role,
    username: user.username,
    displayName: user.displayName,
    expiresAt: Date.now() + AUTH_SESSION_TTL_SECONDS * 1000,
  };

  const payload = base64UrlEncode(JSON.stringify(session));
  const signature = signPayload(payload);

  return `${payload}.${signature}`;
}

export function verifySessionToken(token: string): AuthSession | null {
  const [payload, signature] = token.split(".");

  if (!payload || !signature) {
    return null;
  }

  const expectedSignature = signPayload(payload);
  const signatureBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSignature);

  if (
    signatureBuffer.length !== expectedBuffer.length ||
    !timingSafeEqual(signatureBuffer, expectedBuffer)
  ) {
    return null;
  }

  try {
    const session = JSON.parse(base64UrlDecode(payload)) as AuthSession;

    if (session.expiresAt <= Date.now()) {
      return null;
    }

    return session;
  } catch {
    return null;
  }
}

export const sessionCookieConfig = {
  name: AUTH_COOKIE_NAME,
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: AUTH_SESSION_TTL_SECONDS,
};
