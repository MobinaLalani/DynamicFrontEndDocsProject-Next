import type { TableComponent } from "@/lib/docs/schema";
import type { PageBlockProps } from "@/components/page-renderer/types";

export function TableBlock({ component }: PageBlockProps<TableComponent>) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {component.title ? (
        <div className="border-b border-slate-200 px-4 py-4">
          <h3 className="text-lg font-semibold tracking-tight text-slate-950">
            {component.title}
          </h3>
        </div>
      ) : null}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-left text-sm">
          <thead className="bg-slate-50">
            <tr>
              {component.columns.map((column) => (
                <th
                  key={column.field}
                  className="border-b border-slate-200 px-4 py-3 font-medium text-slate-700"
                >
                  {column.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {component.rows?.length ? (
              component.rows.map((row, index) => (
                <tr
                  key={`${component.id}-${index}`}
                  className="odd:bg-white even:bg-slate-50/50"
                >
                  {component.columns.map((column) => (
                    <td
                      key={`${component.id}-${index}-${column.field}`}
                      className="border-b border-slate-100 px-4 py-3 text-slate-600"
                    >
                      {String(row[column.field] ?? "-")}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={Math.max(component.columns.length, 1)}
                  className="px-4 py-6 text-center text-slate-500"
                >
                  {component.emptyMessage ?? "No data available."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
