import { fieldGroupKinds } from "@/lib/docs/builder";

import { Field, inputClass } from "@/components/docs/builder/shared";
import type { FieldGroupInspectorProps } from "@/components/docs/builder/inspector/types";
import {
  addFieldToGroup,
  removeFieldFromGroup,
  updateFieldInGroup,
} from "@/components/docs/builder/utils/fieldGroupUtils";

export default function FieldGroupInspector({
  component,
  onChange,
  activeTab,
}: FieldGroupInspectorProps) {
  if (activeTab === "properties") {
    return (
      <div className="space-y-4">
        <Field label="عنوان">
          <input
            className={inputClass}
            value={component.title}
            onChange={(event) =>
              onChange((current) => ({
                ...current,
                title: event.target.value,
              }))
            }
          />
        </Field>

        <Field label="نوع گروه">
          <select
            className={inputClass}
            value={component.kind}
            onChange={(event) =>
              onChange((current) => ({
                ...current,
                kind: event.target.value as typeof current.kind,
              }))
            }
          >
            {fieldGroupKinds.map((kind) => (
              <option key={kind} value={kind}>
                {kind}
              </option>
            ))}
          </select>
        </Field>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-700">فیلدها</p>
        <button
          type="button"
          onClick={() => onChange((current) => addFieldToGroup(current))}
          className="rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white"
        >
          افزودن فیلد
        </button>
      </div>

      <div className="space-y-3">
        {component.fields.map((field) => (
          <div
            key={field.id}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
          >
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="نام">
                <input
                  className={`${inputClass} bg-white`}
                  value={field.name}
                  onChange={(event) =>
                    onChange((current) =>
                      updateFieldInGroup(current, field.id, (item) => ({
                        ...item,
                        name: event.target.value,
                      })),
                    )
                  }
                />
              </Field>

              <Field label="نوع">
                <input
                  className={`${inputClass} bg-white`}
                  value={field.type}
                  onChange={(event) =>
                    onChange((current) =>
                      updateFieldInGroup(current, field.id, (item) => ({
                        ...item,
                        type: event.target.value,
                      })),
                    )
                  }
                />
              </Field>
            </div>

            <Field label="توضیح" className="mt-3">
              <textarea
                className={`${inputClass} min-h-20 bg-white`}
                value={field.description}
                onChange={(event) =>
                  onChange((current) =>
                    updateFieldInGroup(current, field.id, (item) => ({
                      ...item,
                      description: event.target.value,
                    })),
                  )
                }
              />
            </Field>

            <div className="mt-3 flex items-center justify-between">
              <label className="inline-flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={field.required}
                  onChange={(event) =>
                    onChange((current) =>
                      updateFieldInGroup(current, field.id, (item) => ({
                        ...item,
                        required: event.target.checked,
                      })),
                    )
                  }
                />
                اجباری
              </label>

              <button
                type="button"
                onClick={() =>
                  onChange((current) => removeFieldFromGroup(current, field.id))
                }
                className="rounded-full bg-rose-50 px-4 py-2 text-sm font-medium text-rose-700"
              >
                حذف
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
