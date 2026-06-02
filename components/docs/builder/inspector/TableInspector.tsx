import { useTableEditor } from "@/components/docs/builder/hooks/useTableEditor";
import { Field, inputClass } from "@/components/docs/builder/shared";
import type { TableInspectorProps } from "@/components/docs/builder/inspector/types";

export default function TableInspector({
  component,
  onChange,
}: TableInspectorProps) {
  const {
    setTitle,
    setEmptyMessage,
    addColumn,
    updateColumnTitle,
    updateColumnField,
    deleteColumn,
    addRow,
    updateCell,
    deleteRow,
  } = useTableEditor({ onChange });

  return (
    <div className="space-y-4">
      <Field label="عنوان">
        <input
          className={inputClass}
          value={component.title ?? ""}
          onChange={(event) => setTitle(event.target.value)}
        />
      </Field>

      <Field label="متن حالت خالی">
        <input
          className={inputClass}
          value={component.emptyMessage ?? ""}
          onChange={(event) => setEmptyMessage(event.target.value)}
        />
      </Field>

      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-700">ستون ها</p>
        <button
          type="button"
          onClick={addColumn}
          className="rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white"
        >
          افزودن ستون
        </button>
      </div>

      <div className="space-y-3">
        {component.columns.map((column) => (
          <div
            key={column.field}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
          >
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="عنوان ستون">
                <input
                  className={`${inputClass} bg-white`}
                  value={column.title}
                  onChange={(event) =>
                    updateColumnTitle(column.field, event.target.value)
                  }
                />
              </Field>

              <Field label="کلید فیلد">
                <input
                  className={`${inputClass} bg-white`}
                  value={column.field}
                  onChange={(event) =>
                    updateColumnField(column.field, event.target.value)
                  }
                />
              </Field>
            </div>

            <div className="mt-3 flex justify-end">
              <button
                type="button"
                onClick={() => deleteColumn(column.field)}
                className="rounded-full bg-rose-50 px-4 py-2 text-sm font-medium text-rose-700"
              >
                حذف ستون
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-700">ردیف ها</p>
        <button
          type="button"
          onClick={addRow}
          className="rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white"
        >
          افزودن ردیف
        </button>
      </div>

      <div className="space-y-3">
        {(component.rows ?? []).map((row, rowIndex) => (
          <div
            key={`row-${rowIndex}`}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
          >
            <div className="grid gap-3">
              {component.columns.map((column) => (
                <Field key={column.field} label={column.title}>
                  <input
                    className={`${inputClass} bg-white`}
                    value={String(row[column.field] ?? "")}
                    onChange={(event) =>
                      updateCell(rowIndex, column.field, event.target.value)
                    }
                  />
                </Field>
              ))}
            </div>

            <div className="mt-3 flex justify-end">
              <button
                type="button"
                onClick={() => deleteRow(rowIndex)}
                className="rounded-full bg-rose-50 px-4 py-2 text-sm font-medium text-rose-700"
              >
                حذف ردیف
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
