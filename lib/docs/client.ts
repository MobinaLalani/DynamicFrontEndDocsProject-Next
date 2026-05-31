import type { DocPage } from "@/lib/docs/schema";

export async function saveDocPage(page: DocPage): Promise<DocPage> {
  const response = await fetch("/api/pages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(page),
  });

  if (!response.ok) {
    const payload = (await response.json().catch(() => null)) as
      | { message?: string }
      | null;





      
    throw new Error(payload?.message ?? "ذخیره صفحه با خطا مواجه شد.");
  }

  return (await response.json()) as DocPage;
}
