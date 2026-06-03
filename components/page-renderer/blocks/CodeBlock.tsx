import type { CodeComponent } from "@/lib/docs/schema";
import type { PageBlockProps } from "@/components/page-renderer/types";
import { getFontSizeValue } from "@/components/page-renderer/style-utils";

export function CodeBlock({ component }: PageBlockProps<CodeComponent>) {
  const codeStyle = component.style;

  return (
    <div
      className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 shadow-sm"
      style={{
        backgroundColor: codeStyle?.backgroundColor,
        borderColor: codeStyle?.borderColor,
      }}
    >
      <div
        className="flex items-center justify-between border-b border-slate-800 px-4 py-3"
        style={{ borderColor: codeStyle?.borderColor }}
      >
        <div>
          <p
            className="font-medium text-slate-100"
            style={{ color: codeStyle?.titleColor }}
          >
            {component.title ?? "Code Example"}
          </p>
          <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
            {component.language}
          </p>
        </div>
      </div>
      <pre
        className="overflow-x-auto p-4 text-sm leading-7 text-slate-100"
        style={{
          color: codeStyle?.textColor,
          fontSize: getFontSizeValue(codeStyle?.fontSize),
        }}
      >
        <code>{component.code}</code>
      </pre>
    </div>
  );
}
