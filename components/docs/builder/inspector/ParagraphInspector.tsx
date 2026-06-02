import { Field, inputClass } from "@/components/docs/builder/shared";
import type { ParagraphInspectorProps } from "@/components/docs/builder/inspector/types";

export default function ParagraphInspector({
  component,
  onChange,
}: ParagraphInspectorProps) {
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
