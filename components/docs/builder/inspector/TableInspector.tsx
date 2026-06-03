import { useTableEditor } from "@/components/docs/builder/hooks/useTableEditor";
import { Field, inputClass } from "@/components/docs/builder/shared";
import type { TableInspectorProps } from "@/components/docs/builder/inspector/types";

export default function TableInspector({
  component,
  onChange,
  activeTab,
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

  if (activeTab === "properties") {
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

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="رنگ عنوان جدول">
            <input
              type="color"
              className={`${inputClass} h-12 p-2`}
              value={component.style?.titleColor ?? "#020617"}
              onChange={(event) =>
                onChange((current) => ({
                  ...current,
                  style: { ...current.style, titleColor: event.target.value },
                }))
              }
            />
          </Field>

          <Field label="رنگ حاشیه جدول">
            <input
              type="color"
              className={`${inputClass} h-12 p-2`}
              value={component.style?.borderColor ?? "#e2e8f0"}
              onChange={(event) =>
                onChange((current) => ({
                  ...current,
                  style: { ...current.style, borderColor: event.target.value },
                }))
              }
            />
          </Field>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="رنگ پس زمینه هدر">
            <input
              type="color"
              className={`${inputClass} h-12 p-2`}
              value={component.style?.headerBackgroundColor ?? "#f8fafc"}
              onChange={(event) =>
                onChange((current) => ({
                  ...current,
                  style: {
                    ...current.style,
                    headerBackgroundColor: event.target.value,
                  },
                }))
              }
            />
          </Field>

          <Field label="رنگ متن هدر">
            <input
              type="color"
              className={`${inputClass} h-12 p-2`}
              value={component.style?.headerTextColor ?? "#334155"}
              onChange={(event) =>
                onChange((current) => ({
                  ...current,
                  style: { ...current.style, headerTextColor: event.target.value },
                }))
              }
            />
          </Field>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="رنگ متن بدنه">
            <input
              type="color"
              className={`${inputClass} h-12 p-2`}
              value={component.style?.bodyTextColor ?? "#475569"}
              onChange={(event) =>
                onChange((current) => ({
                  ...current,
                  style: { ...current.style, bodyTextColor: event.target.value },
                }))
              }
            />
          </Field>

          <Field label="رنگ ردیف های زوج">
            <input
              type="color"
              className={`${inputClass} h-12 p-2`}
              value={component.style?.rowStripeColor ?? "#f8fafc"}
              onChange={(event) =>
                onChange((current) => ({
                  ...current,
                  style: { ...current.style, rowStripeColor: event.target.value },
                }))
              }
            />
          </Field>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="سایز متن جدول">
            <select
              className={inputClass}
              value={component.style?.textSize ?? "sm"}
              onChange={(event) =>
                onChange((current) => ({
                  ...current,
                  style: {
                    ...current.style,
                    textSize: event.target.value as NonNullable<
                      typeof current.style
                    >["textSize"],
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

          <Field label="ضخامت متن هدر">
            <select
              className={inputClass}
              value={component.style?.headerFontWeight ?? "medium"}
              onChange={(event) =>
                onChange((current) => ({
                  ...current,
                  style: {
                    ...current.style,
                    headerFontWeight: event.target.value as NonNullable<
                      typeof current.style
                    >["headerFontWeight"],
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
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-medium text-slate-700">
          داده های جدول را مستقیم داخل خود جدول ویرایش کن.
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={addColumn}
            className="rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white"
          >
            افزودن ستون
          </button>
          <button
            type="button"
            onClick={addRow}
            disabled={component.columns.length === 0}
            className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500"
          >
            افزودن سطر
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-right text-sm">
            <thead className="bg-slate-50">
              <tr>
                {component.columns.map((column) => (
                  <th
                    key={column.field}
                    className="min-w-52 border-b border-l border-slate-200 px-3 py-3 align-top last:border-l-0"
                  >
                    <div className="space-y-2">
                      <input
                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-900 outline-none transition focus:border-slate-400"
                        value={column.title}
                        onChange={(event) =>
                          updateColumnTitle(column.field, event.target.value)
                        }
                        placeholder="عنوان ستون"
                      />
                      <input
                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-600 outline-none transition focus:border-slate-400"
                        value={column.field}
                        onChange={(event) =>
                          updateColumnField(column.field, event.target.value)
                        }
                        placeholder="field_key"
                      />
                      <button
                        type="button"
                        onClick={() => deleteColumn(column.field)}
                        className="rounded-full bg-rose-50 px-3 py-1.5 text-xs font-medium text-rose-700"
                      >
                        حذف ستون
                      </button>
                    </div>
                  </th>
                ))}
                {component.columns.length > 0 ? (
                  <th className="w-28 border-b border-slate-200 px-3 py-3 text-center text-xs font-medium text-slate-500">
                    عملیات
                  </th>
                ) : null}
              </tr>
            </thead>

            <tbody>
              {component.columns.length === 0 ? (
                <tr>
                  <td className="px-4 py-8 text-center text-slate-500">
                    اول یک ستون اضافه کن تا بتوانی داده های جدول را وارد کنی.
                  </td>
                </tr>
              ) : (component.rows ?? []).length === 0 ? (
                <tr>
                  <td
                    colSpan={component.columns.length + 1}
                    className="px-4 py-8 text-center text-slate-500"
                  >
                    {component.emptyMessage ?? "هنوز سطری برای این جدول ثبت نشده است."}
                  </td>
                </tr>
              ) : (
                (component.rows ?? []).map((row, rowIndex) => (
                  <tr key={`row-${rowIndex}`} className="odd:bg-white even:bg-slate-50/40">
                    {component.columns.map((column) => (
                      <td
                        key={`${rowIndex}-${column.field}`}
                        className="border-b border-l border-slate-100 px-2 py-2 align-top last:border-l-0"
                      >
                        <input
                          className="w-full rounded-xl border border-transparent bg-transparent px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-slate-300 focus:bg-white"
                          value={String(row[column.field] ?? "")}
                          onChange={(event) =>
                            updateCell(rowIndex, column.field, event.target.value)
                          }
                          placeholder="-"
                        />
                      </td>
                    ))}
                    <td className="border-b border-slate-100 px-3 py-2 text-center align-top">
                      <button
                        type="button"
                        onClick={() => deleteRow(rowIndex)}
                        className="rounded-full bg-rose-50 px-3 py-1.5 text-xs font-medium text-rose-700"
                      >
                        حذف سطر
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
