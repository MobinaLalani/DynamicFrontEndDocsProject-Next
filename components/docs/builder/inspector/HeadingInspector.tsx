import type { HeadingComponent } from "@/lib/docs/schema";

import { Field, inputClass } from "@/components/docs/builder/shared";
import type { HeadingInspectorProps } from "@/components/docs/builder/inspector/types";

export default function HeadingInspector({
  component,
  onChange,
}: HeadingInspectorProps) {
  return (
    <div className="space-y-4">
      <Field label="متن">
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
    </div>
  );
}
