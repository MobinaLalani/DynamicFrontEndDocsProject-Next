import type { ParagraphComponent } from "@/lib/docs/schema";
import type { PageBlockProps } from "@/components/page-renderer/types";

export function ParagraphBlock({
  component,
}: PageBlockProps<ParagraphComponent>) {
  return (
    <p className="max-w-3xl text-base leading-7 text-slate-600">
      {component.text}
    </p>
  );
}
