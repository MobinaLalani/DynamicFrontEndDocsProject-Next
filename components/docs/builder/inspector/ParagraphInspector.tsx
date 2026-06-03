import { Field, inputClass } from "@/components/docs/builder/shared";
import type { ParagraphInspectorProps } from "@/components/docs/builder/inspector/types";

export default function ParagraphInspector({
  component,
  onChange,
  activeTab,
}: ParagraphInspectorProps) {
  if (activeTab === "properties") {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-5 text-sm leading-6 text-slate-600">
        این بلوک تنظیمات نمایشی جداگانه ندارد. متن و محتوای آن را از تب Data
        مدیریت کن.
      </div>
    );
  }

  return (
    <Field label="متن">
      <textarea
        className={`${inputClass} min-h-36`}
        value={component.text}
        onChange={(event) =>
          onChange((current) => ({
            ...current,
            text: event.target.value,
          }))
        }
      />
    </Field>
  );
}
