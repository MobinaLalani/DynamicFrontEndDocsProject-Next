import { connection } from "next/server";

import { requireRole } from "@/lib/auth/server";
import { SwaggerImportWizard } from "@/features/swagger-import";

export default async function SwaggerImportPage() {
  await connection();
  await requireRole("admin");

  return <SwaggerImportWizard />;
}
