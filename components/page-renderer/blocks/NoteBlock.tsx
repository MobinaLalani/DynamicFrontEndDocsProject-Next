import type { NoteComponent } from "@/lib/docs/schema";
import type { PageBlockProps } from "@/components/page-renderer/types";
import { buildTextStyle } from "@/components/page-renderer/style-utils";

const toneClasses: Record<
  NonNullable<NoteComponent["tone"]>,
  { wrapper: string; badge: string }
> = {
  info: {
    wrapper: "border-sky-200 bg-sky-50 text-sky-950",
    badge: "bg-sky-100 text-sky-700",
  },
  success: {
    wrapper: "border-emerald-200 bg-emerald-50 text-emerald-950",
    badge: "bg-emerald-100 text-emerald-700",
  },
  warning: {
    wrapper: "border-amber-200 bg-amber-50 text-amber-950",
    badge: "bg-amber-100 text-amber-700",
  },
  danger: {
    wrapper: "border-rose-200 bg-rose-50 text-rose-950",
    badge: "bg-rose-100 text-rose-700",
  },
};

export function NoteBlock({ component }: PageBlockProps<NoteComponent>) {
  const tone = component.tone ?? "info";
  const toneStyle = toneClasses[tone];

  return (
    <section
      className={`rounded-3xl border p-5 shadow-sm ${toneStyle.wrapper}`}
      style={buildTextStyle(component.style)}
    >
      <div className="space-y-3">
        <span
          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${toneStyle.badge}`}
        >
          NOTE
        </span>
        <h3 className="text-lg font-semibold">{component.title}</h3>
        <p className="text-sm leading-7 opacity-90">{component.text}</p>
      </div>
    </section>
  );
}
