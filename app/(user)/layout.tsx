import { connection } from "next/server";

import { requireAuth } from "@/lib/auth/server";

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await connection();
  await requireAuth();

  return <>{children}</>;
}
