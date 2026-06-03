import type { HeadingComponent } from "@/lib/docs/schema";

import { Field, inputClass } from "@/components/docs/builder/shared";
import type { HeadingInspectorProps } from "@/components/docs/builder/inspector/types";

export default function HeadingInspector({
  component,
  onChange,
  activeTab,
}: HeadingInspectorProps) {
  if (activeTab === "data") {
    return (
      <Field label="متن هدینگ">
        <input
          className={inputClass}
          value={component.text}
          onChange={(event) =>
            onChange((current: HeadingComponent) => ({
              ...current,
              text: event.target.value,
            }))
          }
        />
      </Field>
    );
  }

  return (
    <div className="space-y-4">
      <Field label="سطح هدینگ">
        <select
          className={inputClass}
          value={component.level ?? 1}
          onChange={(event) =>
            onChange((current: HeadingComponent) => ({
              ...current,
              level: Number(event.target.value) as HeadingComponent["level"],
            }))
          }
        >
          <option value={1}>H1</option>
          <option value={2}>H2</option>
          <option value={3}>H3</option>
        </select>
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="رنگ متن">
          <input
            type="color"
            className={`${inputClass} h-12 p-2`}
            value={component.style?.color ?? "#020617"}
            onChange={(event) =>
              onChange((current: HeadingComponent) => ({
                ...current,
                style: { ...current.style, color: event.target.value },
              }))
            }
          />
        </Field>

        <Field label="سایز متن">
          <select
            className={inputClass}
            value={component.style?.fontSize ?? "2xl"}
            onChange={(event) =>
              onChange((current: HeadingComponent) => ({
                ...current,
                style: {
                  ...current.style,
                  fontSize: event.target.value as NonNullable<
                    HeadingComponent["style"]
                  >["fontSize"],
                },
              }))
            }
          >
            <option value="lg">Large</option>
            <option value="xl">XL</option>
            <option value="2xl">2XL</option>
            <option value="3xl">3XL</option>
          </select>
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="ضخامت متن">
          <select
            className={inputClass}
            value={component.style?.fontWeight ?? "semibold"}
            onChange={(event) =>
              onChange((current: HeadingComponent) => ({
                ...current,
                style: {
                  ...current.style,
                  fontWeight: event.target.value as NonNullable<
                    HeadingComponent["style"]
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

        <Field label="تراز متن">
          <select
            className={inputClass}
            value={component.style?.align ?? "right"}
            onChange={(event) =>
              onChange((current: HeadingComponent) => ({
                ...current,
                style: {
                  ...current.style,
                  align: event.target.value as NonNullable<
                    HeadingComponent["style"]
                  >["align"],
                },
              }))
            }
          >
            <option value="right">راست</option>
            <option value="center">وسط</option>
            <option value="left">چپ</option>
          </select>
        </Field>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="inline-flex items-center gap-2 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={component.style?.italic ?? false}
            onChange={(event) =>
              onChange((current: HeadingComponent) => ({
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
              onChange((current: HeadingComponent) => ({
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
