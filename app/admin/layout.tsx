import { connection } from "next/server";

import { requireRole } from "@/lib/auth/server";

type AdminLayoutProps = {
  children: React.ReactNode;
};

export default async function AdminLayout({ children }: AdminLayoutProps) {
  await connection();
  await requireRole("admin");

  return <section className="min-h-screen bg-slate-100">{children}</section>;
}
