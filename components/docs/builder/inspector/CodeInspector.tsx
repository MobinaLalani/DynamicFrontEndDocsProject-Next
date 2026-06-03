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
    </div>
  );
}
