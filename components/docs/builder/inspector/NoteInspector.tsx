import { Field, inputClass } from "@/components/docs/builder/shared";
import type { NoteInspectorProps } from "@/components/docs/builder/inspector/types";

export default function NoteInspector({
  component,
  onChange,
  activeTab,
}: NoteInspectorProps) {
  if (activeTab === "properties") {
    return (
      <div className="space-y-4">
        <Field label="نوع نوت">
          <select
            className={inputClass}
            value={component.tone ?? "info"}
            onChange={(event) =>
              onChange((current) => ({
                ...current,
                tone: event.target.value as NonNullable<typeof current.tone>,
              }))
            }
          >
            <option value="info">اطلاعاتی</option>
            <option value="success">موفقیت</option>
            <option value="warning">هشدار</option>
            <option value="danger">خطر</option>
          </select>
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="رنگ متن">
            <input
              type="color"
              className={`${inputClass} h-12 p-2`}
              value={component.style?.color ?? "#0f172a"}
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
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Field label="عنوان نوت">
        <input
          className={inputClass}
          value={component.title}
          onChange={(event) =>
            onChange((current) => ({
              ...current,
              title: event.target.value,
            }))
          }
          placeholder="مثلا نکته مهم"
        />
      </Field>

      <Field label="متن نوت">
        <textarea
          className={`${inputClass} min-h-32`}
          value={component.text}
          onChange={(event) =>
            onChange((current) => ({
              ...current,
              text: event.target.value,
            }))
          }
          placeholder="توضیح مهم، هشدار یا راهنمای کوتاه را اینجا وارد کن"
        />
      </Field>
    </div>
  );
}
