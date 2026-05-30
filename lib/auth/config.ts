export const AUTH_COOKIE_NAME = "dynamic-docs-session";
export const AUTH_SESSION_TTL_SECONDS = 60 * 60 * 8;

export function getAuthSecret() {
  return (
    process.env.AUTH_SESSION_SECRET ??
    "dynamic-docs-dev-secret-change-me-before-production"
  );
}
