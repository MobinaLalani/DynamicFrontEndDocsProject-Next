import { codeLanguageOptions, fieldGroupKinds, methodOptions } from "@/lib/docs/builder";
import type {
  CodeComponent,
  EndpointComponent,
  FieldGroupComponent,
  HeadingComponent,
  PageComponent,
  ParagraphComponent,
  TableComponent,
} from "@/lib/docs/schema";

import { Field, inputClass } from "@/components/docs/builder/shared";

type InspectorPanelProps = {
  selectedComponent: PageComponent | null;
  onUpdateSelectedComponent: (updater: (component: PageComponent) => PageComponent) => void;
  onAddFieldToSelectedGroup: () => void;
  onAddColumnToSelectedTable: () => void;
  onAddRowToSelectedTable: () => void;
};

type InspectorProps<T> = {
  component: T;
  onChange: (updater: (component: T) => T) => void;
};

export function InspectorPanel({
  selectedComponent,
  onUpdateSelectedComponent,
  onAddFieldToSelectedGroup,
  onAddColumnToSelectedTable,
  onAddRowToSelectedTable,
}: InspectorPanelProps) {
  if (!selectedComponent) {
    return (
      <div className="mt-4 rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-5 text-sm leading-6 text-slate-600">
        یک بلوک را از بوم صفحه انتخاب کن تا تنظیماتش اینجا نمایش داده شود.
      </div>
    );
  }

  return (
    <div className="mt-4 space-y-5">
      <div className="rounded-2xl bg-slate-50 p-4">
        <p className="text-xs text-slate-500">نوع بلوک</p>
        <p className="mt-2 text-lg font-semibold text-slate-950">{selectedComponent.type}</p>
      </div>

      {selectedComponent.type === "heading" ? (
        <HeadingInspector
          component={selectedComponent}
          onChange={(updater) =>
            onUpdateSelectedComponent((component) => updater(component as HeadingComponent))
          }
        />
      ) : null}

      {selectedComponent.type === "paragraph" ? (
        <ParagraphInspector
          component={selectedComponent}
          onChange={(updater) =>
            onUpdateSelectedComponent((component) => updater(component as ParagraphComponent))
          }
        />
      ) : null}

      {selectedComponent.type === "endpoint" ? (
        <EndpointInspector
          component={selectedComponent}
          onChange={(updater) =>
            onUpdateSelectedComponent((component) => updater(component as EndpointComponent))
          }
        />
      ) : null}

      {selectedComponent.type === "field-group" ? (
        <FieldGroupInspector
          component={selectedComponent}
          onChange={(updater) =>
            onUpdateSelectedComponent((component) => updater(component as FieldGroupComponent))
          }
          onAddField={onAddFieldToSelectedGroup}
        />
      ) : null}

      {selectedComponent.type === "table" ? (
        <TableInspector
          component={selectedComponent}
          onChange={(updater) =>
            onUpdateSelectedComponent((component) => updater(component as TableComponent))
          }
          onAddColumn={onAddColumnToSelectedTable}
          onAddRow={onAddRowToSelectedTable}
        />
      ) : null}

      {selectedComponent.type === "code" ? (
        <CodeInspector
          component={selectedComponent}
          onChange={(updater) =>
            onUpdateSelectedComponent((component) => updater(component as CodeComponent))
          }
        />
      ) : null}
    </div>
  );
}

function HeadingInspector({ component, onChange }: InspectorProps<HeadingComponent>) {
  return (
    <div className="space-y-4">
      <Field label="متن">
        <input
          className={inputClass}
          value={component.text}
          onChange={(event) => onChange((current) => ({ ...current, text: event.target.value }))}
        />
      </Field>
      <Field label="سطح هدینگ">
        <select
          className={inputClass}
          value={component.level ?? 1}
          onChange={(event) =>
            onChange((current) => ({
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

function ParagraphInspector({ component, onChange }: InspectorProps<ParagraphComponent>) {
  return (
    <Field label="متن">
      <textarea
        className={`${inputClass} min-h-36`}
        value={component.text}
        onChange={(event) => onChange((current) => ({ ...current, text: event.target.value }))}
      />
    </Field>
  );
}

function EndpointInspector({ component, onChange }: InspectorProps<EndpointComponent>) {
  return (
    <div className="space-y-4">
      <Field label="عنوان">
        <input
          className={inputClass}
          value={component.title}
          onChange={(event) => onChange((current) => ({ ...current, title: event.target.value }))}
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
                method: event.target.value as EndpointComponent["method"],
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
            onChange={(event) => onChange((current) => ({ ...current, path: event.target.value }))}
          />
        </Field>
      </div>
      <Field label="خلاصه">
        <textarea
          className={`${inputClass} min-h-24`}
          value={component.summary}
          onChange={(event) =>
            onChange((current) => ({ ...current, summary: event.target.value }))
          }
        />
      </Field>
      <Field label="احراز هویت">
        <input
          className={inputClass}
          value={component.auth ?? ""}
          onChange={(event) => onChange((current) => ({ ...current, auth: event.target.value }))}
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

type FieldGroupInspectorProps = InspectorProps<FieldGroupComponent> & {
  onAddField: () => void;
};

function FieldGroupInspector({
  component,
  onChange,
  onAddField,
}: FieldGroupInspectorProps) {
  return (
    <div className="space-y-4">
      <Field label="عنوان">
        <input
          className={inputClass}
          value={component.title}
          onChange={(event) => onChange((current) => ({ ...current, title: event.target.value }))}
        />
      </Field>
      <Field label="نوع گروه">
        <select
          className={inputClass}
          value={component.kind}
          onChange={(event) =>
            onChange((current) => ({
              ...current,
              kind: event.target.value as FieldGroupComponent["kind"],
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

      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-700">فیلدها</p>
        <button
          type="button"
          onClick={onAddField}
          className="rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white"
        >
          افزودن فیلد
        </button>
      </div>

      <div className="space-y-3">
        {component.fields.map((field) => (
          <div key={field.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="نام">
                <input
                  className={`${inputClass} bg-white`}
                  value={field.name}
                  onChange={(event) =>
                    onChange((current) => ({
                      ...current,
                      fields: current.fields.map((item) =>
                        item.id === field.id ? { ...item, name: event.target.value } : item
                      ),
                    }))
                  }
                />
              </Field>
              <Field label="نوع">
                <input
                  className={`${inputClass} bg-white`}
                  value={field.type}
                  onChange={(event) =>
                    onChange((current) => ({
                      ...current,
                      fields: current.fields.map((item) =>
                        item.id === field.id ? { ...item, type: event.target.value } : item
                      ),
                    }))
                  }
                />
              </Field>
            </div>

            <Field label="توضیح" className="mt-3">
              <textarea
                className={`${inputClass} min-h-20 bg-white`}
                value={field.description}
                onChange={(event) =>
                  onChange((current) => ({
                    ...current,
                    fields: current.fields.map((item) =>
                      item.id === field.id
                        ? { ...item, description: event.target.value }
                        : item
                    ),
                  }))
                }
              />
            </Field>

            <div className="mt-3 flex items-center justify-between">
              <label className="inline-flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={field.required}
                  onChange={(event) =>
                    onChange((current) => ({
                      ...current,
                      fields: current.fields.map((item) =>
                        item.id === field.id
                          ? { ...item, required: event.target.checked }
                          : item
                      ),
                    }))
                  }
                />
                اجباری
              </label>
              <button
                type="button"
                onClick={() =>
                  onChange((current) => ({
                    ...current,
                    fields: current.fields.filter((item) => item.id !== field.id),
                  }))
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

type TableInspectorProps = InspectorProps<TableComponent> & {
  onAddColumn: () => void;
  onAddRow: () => void;
};

function TableInspector({
  component,
  onChange,
  onAddColumn,
  onAddRow,
}: TableInspectorProps) {
  return (
    <div className="space-y-4">
      <Field label="عنوان">
        <input
          className={inputClass}
          value={component.title ?? ""}
          onChange={(event) => onChange((current) => ({ ...current, title: event.target.value }))}
        />
      </Field>
      <Field label="متن حالت خالی">
        <input
          className={inputClass}
          value={component.emptyMessage ?? ""}
          onChange={(event) =>
            onChange((current) => ({ ...current, emptyMessage: event.target.value }))
          }
        />
      </Field>

      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-700">ستون ها</p>
        <button
          type="button"
          onClick={onAddColumn}
          className="rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white"
        >
          افزودن ستون
        </button>
      </div>

      <div className="space-y-3">
        {component.columns.map((column) => (
          <div key={column.field} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="عنوان ستون">
                <input
                  className={`${inputClass} bg-white`}
                  value={column.title}
                  onChange={(event) =>
                    onChange((current) => ({
                      ...current,
                      columns: current.columns.map((item) =>
                        item.field === column.field ? { ...item, title: event.target.value } : item
                      ),
                    }))
                  }
                />
              </Field>
              <Field label="کلید فیلد">
                <input
                  className={`${inputClass} bg-white`}
                  value={column.field}
                  onChange={(event) =>
                    onChange((current) => ({
                      ...current,
                      columns: current.columns.map((item) =>
                        item.field === column.field ? { ...item, field: event.target.value } : item
                      ),
                      rows: (current.rows ?? []).map((row) => {
                        const { [column.field]: previousValue, ...rest } = row;
                        return {
                          ...rest,
                          [event.target.value]: previousValue ?? "",
                        };
                      }),
                    }))
                  }
                />
              </Field>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-700">ردیف ها</p>
        <button
          type="button"
          onClick={onAddRow}
          className="rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white"
        >
          افزودن ردیف
        </button>
      </div>

      <div className="space-y-3">
        {(component.rows ?? []).map((row, rowIndex) => (
          <div key={`row-${rowIndex}`} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="grid gap-3">
              {component.columns.map((column) => (
                <Field key={column.field} label={column.title}>
                  <input
                    className={`${inputClass} bg-white`}
                    value={String(row[column.field] ?? "")}
                    onChange={(event) =>
                      onChange((current) => ({
                        ...current,
                        rows: (current.rows ?? []).map((item, index) =>
                          index === rowIndex ? { ...item, [column.field]: event.target.value } : item
                        ),
                      }))
                    }
                  />
                </Field>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CodeInspector({ component, onChange }: InspectorProps<CodeComponent>) {
  return (
    <div className="space-y-4">
      <Field label="عنوان">
        <input
          className={inputClass}
          value={component.title ?? ""}
          onChange={(event) => onChange((current) => ({ ...current, title: event.target.value }))}
        />
      </Field>
      <Field label="زبان">
        <select
          className={inputClass}
          value={component.language}
          onChange={(event) =>
            onChange((current) => ({
              ...current,
              language: event.target.value as CodeComponent["language"],
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
      <Field label="کد">
        <textarea
          className={`${inputClass} min-h-64 font-mono text-sm`}
          value={component.code}
          onChange={(event) => onChange((current) => ({ ...current, code: event.target.value }))}
        />
      </Field>
    </div>
  );
}
