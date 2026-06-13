import type { CodeComponent } from "@/lib/docs/schema";
import type { PageBlockProps } from "@/components/page-renderer/types";
import { getFontSizeValue } from "@/components/page-renderer/style-utils";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

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

      <SyntaxHighlighter
        language={component.language || "javascript"}
        style={oneDark}
        customStyle={{
          margin: 0,
          padding: "1rem",
          background: "transparent",
          fontSize: getFontSizeValue(codeStyle?.fontSize),
        }}
      >
        {component.code}
      </SyntaxHighlighter>
    </div>
  );
}
