import { methodOptions } from "@/lib/docs/builder";

import { Field, inputClass } from "@/components/docs/builder/shared";
import type { EndpointInspectorProps } from "@/components/docs/builder/inspector/types";

export default function EndpointInspector({
  component,
  onChange,
}: EndpointInspectorProps) {
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

      <div className="grid gap-4 sm:grid-cols-[120px_minmax(0,1fr)]">
        <Field label="Method">
          <select
            className={inputClass}
            value={component.method}
            onChange={(event) =>
              onChange((current) => ({
                ...current,
                method: event.target.value as typeof current.method,
              }))
            }
          >
            {methodOptions.map((method) => (
              <option key={method} value={method}>
                {method}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Path">
          <input
            className={inputClass}
            value={component.path}
            onChange={(event) =>
              onChange((current) => ({
                ...current,
                path: event.target.value,
              }))
            }
          />
        </Field>
      </div>

      <Field label="خلاصه">
        <textarea
          className={`${inputClass} min-h-24`}
          value={component.summary}
          onChange={(event) =>
            onChange((current) => ({
              ...current,
              summary: event.target.value,
            }))
          }
        />
      </Field>

      <Field label="احراز هویت">
        <input
          className={inputClass}
          value={component.auth ?? ""}
          onChange={(event) =>
            onChange((current) => ({
              ...current,
              auth: event.target.value,
            }))
          }
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Request Content-Type">
          <input
            className={inputClass}
            value={component.requestContentType ?? ""}
            onChange={(event) =>
              onChange((current) => ({
                ...current,
                requestContentType: event.target.value,
              }))
            }
          />
        </Field>

        <Field label="Response Content-Type">
          <input
            className={inputClass}
            value={component.responseContentType ?? ""}
            onChange={(event) =>
              onChange((current) => ({
                ...current,
                responseContentType: event.target.value,
              }))
            }
          />
        </Field>
      </div>
    </div>
  );
}
