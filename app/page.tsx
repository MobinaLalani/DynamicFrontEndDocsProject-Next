import { redirect } from "next/navigation";

import { requireAuth } from "@/lib/auth/server";

export default async function Home() {
  const session = await requireAuth();

  if (session.role === "admin") {
    redirect("/admin");
  }

  redirect("/pages");
}
