import { Field, inputClass } from "@/components/docs/builder/shared";
import type { ParagraphInspectorProps } from "@/components/docs/builder/inspector/types";

export default function ParagraphInspector({
  component,
  onChange,
  activeTab,
}: ParagraphInspectorProps) {
  if (activeTab === "properties") {
    return (
      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="رنگ متن">
            <input
              type="color"
              className={`${inputClass} h-12 p-2`}
              value={component.style?.color ?? "#475569"}
              onChange={(event) =>
                onChange((current) => ({
                  ...current,
                  style: { ...current.style, color: event.target.value },
                }))
              }
            />
          </Field>

          <Field label="سایز متن">
            <select
              className={inputClass}
              value={component.style?.fontSize ?? "base"}
              onChange={(event) =>
                onChange((current) => ({
                  ...current,
                  style: {
                    ...current.style,
                    fontSize: event.target.value as NonNullable<
                      typeof current.style
                    >["fontSize"],
                  },
                }))
              }
            >
              <option value="sm">Small</option>
              <option value="base">Base</option>
              <option value="lg">Large</option>
              <option value="xl">XL</option>
            </select>
          </Field>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="ضخامت متن">
            <select
              className={inputClass}
              value={component.style?.fontWeight ?? "normal"}
              onChange={(event) =>
                onChange((current) => ({
                  ...current,
                  style: {
                    ...current.style,
                    fontWeight: event.target.value as NonNullable<
                      typeof current.style
                    >["fontWeight"],
                  },
                }))
              }
            >
              <option value="normal">Normal</option>
              <option value="medium">Medium</option>
              <option value="semibold">Semibold</option>
              <option value="bold">Bold</option>
            </select>
          </Field>

          <Field label="فاصله خطوط">
            <select
              className={inputClass}
              value={component.style?.lineHeight ?? "relaxed"}
              onChange={(event) =>
                onChange((current) => ({
                  ...current,
                  style: {
                    ...current.style,
                    lineHeight: event.target.value as NonNullable<
                      typeof current.style
                    >["lineHeight"],
                  },
                }))
              }
            >
              <option value="normal">Normal</option>
              <option value="relaxed">Relaxed</option>
              <option value="loose">Loose</option>
            </select>
          </Field>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="inline-flex items-center gap-2 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={component.style?.italic ?? false}
              onChange={(event) =>
                onChange((current) => ({
                  ...current,
                  style: { ...current.style, italic: event.target.checked },
                }))
              }
            />
            italic
          </label>

          <label className="inline-flex items-center gap-2 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={component.style?.underline ?? false}
              onChange={(event) =>
                onChange((current) => ({
                  ...current,
                  style: { ...current.style, underline: event.target.checked },
                }))
              }
            />
            underline
          </label>
        </div>
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
