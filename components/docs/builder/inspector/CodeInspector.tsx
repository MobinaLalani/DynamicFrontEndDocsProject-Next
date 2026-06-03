import { codeLanguageOptions } from "@/lib/docs/builder";

import { Field, inputClass } from "@/components/docs/builder/shared";
import type { CodeInspectorProps } from "@/components/docs/builder/inspector/types";

export default function CodeInspector({
  component,
  onChange,
  activeTab,
}: CodeInspectorProps) {
  if (activeTab === "data") {
    return (
      <Field label="کد">
        <textarea
          className={`${inputClass} min-h-64 font-mono text-sm`}
          value={component.code}
          onChange={(event) =>
            onChange((current) => ({
              ...current,
              code: event.target.value,
            }))
          }
        />
      </Field>
    );
  }

  return (
    <div className="space-y-4">
      <Field label="عنوان">
        <input
          className={inputClass}
          value={component.title ?? ""}
          onChange={(event) =>
            onChange((current) => ({
              ...current,
              title: event.target.value,
            }))
          }
        />
      </Field>

      <Field label="زبان">
        <select
          className={inputClass}
          value={component.language}
          onChange={(event) =>
            onChange((current) => ({
              ...current,
              language: event.target.value as typeof current.language,
            }))
          }
        >
          {codeLanguageOptions.map((language) => (
            <option key={language} value={language}>
              {language}
            </option>
          ))}
        </select>
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="رنگ عنوان">
          <input
            type="color"
            className={`${inputClass} h-12 p-2`}
            value={component.style?.titleColor ?? "#f8fafc"}
            onChange={(event) =>
              onChange((current) => ({
                ...current,
                style: { ...current.style, titleColor: event.target.value },
              }))
            }
          />
        </Field>

        <Field label="رنگ متن کد">
          <input
            type="color"
            className={`${inputClass} h-12 p-2`}
            value={component.style?.textColor ?? "#f8fafc"}
            onChange={(event) =>
              onChange((current) => ({
                ...current,
                style: { ...current.style, textColor: event.target.value },
              }))
            }
          />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="رنگ پس زمینه">
          <input
            type="color"
            className={`${inputClass} h-12 p-2`}
            value={component.style?.backgroundColor ?? "#020617"}
            onChange={(event) =>
              onChange((current) => ({
                ...current,
                style: {
                  ...current.style,
                  backgroundColor: event.target.value,
                },
              }))
            }
          />
        </Field>

        <Field label="رنگ حاشیه">
          <input
            type="color"
            className={`${inputClass} h-12 p-2`}
            value={component.style?.borderColor ?? "#1e293b"}
            onChange={(event) =>
              onChange((current) => ({
                ...current,
                style: { ...current.style, borderColor: event.target.value },
              }))
            }
          />
        </Field>
      </div>

      <Field label="سایز متن کد">
        <select
          className={inputClass}
          value={component.style?.fontSize ?? "sm"}
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
          <option value="xs">XS</option>
          <option value="sm">SM</option>
          <option value="base">Base</option>
          <option value="lg">LG</option>
        </select>
      </Field>
    </div>
  );
}
