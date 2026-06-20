export const AUTH_COOKIE_NAME = "dynamic-docs-session";
export const AUTH_SESSION_TTL_SECONDS = 60 * 60 * 8;

export function getAuthSecret() {
  const secret = process.env.AUTH_SESSION_SECRET;

  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      throw new Error(
        "AUTH_SESSION_SECRET environment variable is required in production.",
      );
    }
    return "dynamic-docs-dev-secret-change-me-before-production";
  }

  return secret;
}
