import type { HeadingComponent } from "@/lib/docs/schema";
import type { PageBlockProps } from "@/components/page-renderer/types";
import { buildTextStyle } from "@/components/page-renderer/style-utils";

export function HeadingBlock({ component }: PageBlockProps<HeadingComponent>) {
  const Tag =
    component.level === 2 ? "h2" : component.level === 3 ? "h3" : "h1";

  return (
    <Tag
      className="text-pretty font-semibold tracking-tight text-slate-950"
      style={buildTextStyle(component.style)}
    >
      {component.text}
    </Tag>
  );
}
