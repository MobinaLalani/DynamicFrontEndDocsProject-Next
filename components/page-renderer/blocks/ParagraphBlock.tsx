import type { ParagraphComponent } from "@/lib/docs/schema";
import type { PageBlockProps } from "@/components/page-renderer/types";
import { buildTextStyle } from "@/components/page-renderer/style-utils";

export function ParagraphBlock({
  component,
}: PageBlockProps<ParagraphComponent>) {
  return (
    <p
      className="max-w-3xl text-base leading-7 text-slate-600"
      style={buildTextStyle(component.style)}
    >
      {component.text}
    </p>
  );
}
