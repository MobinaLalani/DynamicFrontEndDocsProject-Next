import type { NoteComponent } from "@/lib/docs/schema";
import type { PageBlockProps } from "@/components/page-renderer/types";
import { buildTextStyle } from "@/components/page-renderer/style-utils";
import { Info } from "lucide-react";

const toneClasses: Record<
  NonNullable<NoteComponent["tone"]>,
  {
    wrapper: string;
    icon: string;
  }
> = {
  info: {
    wrapper: "border-r-4 border-r-sky-400 bg-sky-50 text-slate-700",
    icon: "text-slate-600",
  },
  success: {
    wrapper: "border-r-4 border-r-emerald-400 bg-emerald-50 text-slate-700",
    icon: "text-slate-600",
  },
  warning: {
    wrapper: "border-r-4 border-r-amber-400 bg-amber-50 text-slate-700",
    icon: "text-slate-600",
  },
  danger: {
    wrapper: "border-r-4 border-r-rose-400 bg-rose-50 text-slate-700",
    icon: "text-slate-600",
  },
};

export function NoteBlock({ component }: PageBlockProps<NoteComponent>) {
  const tone = component.tone ?? "info";
  const toneStyle = toneClasses[tone];

  return (
    <section
      dir="rtl"
      className={`rounded-xl p-5 ${toneStyle.wrapper}`}
      style={buildTextStyle(component.style)}
    >
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-slate-800">
            {component.title || "اطلاع"}
          </span>

          <Info size={18} className={toneStyle.icon} />
        </div>
      </div>

      <p className="text-sm leading-8 text-slate-700">{component.text}</p>
    </section>
  );
}
