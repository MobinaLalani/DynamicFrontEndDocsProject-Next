import { SessionBar } from "@/components/auth/session-bar";
import { PageBuilderDemo } from "@/components/docs/page-builder-demo";
import { requireRole } from "@/lib/auth/server";

export default async function AdminPage() {
  const session = await requireRole("admin");

  return (
    <main className="flex w-full flex-1 flex-col p-4 sm:p-6">
      <SessionBar session={session} />
      <PageBuilderDemo />
    </main>
  );
}
