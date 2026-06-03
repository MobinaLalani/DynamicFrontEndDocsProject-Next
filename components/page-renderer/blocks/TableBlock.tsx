import type { TableComponent } from "@/lib/docs/schema";
import type { PageBlockProps } from "@/components/page-renderer/types";
import {
  getFontSizeValue,
  getFontWeightValue,
} from "@/components/page-renderer/style-utils";

export function TableBlock({ component }: PageBlockProps<TableComponent>) {
  const tableStyle = component.style;

  return (
    <div
      className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
      style={{ borderColor: tableStyle?.borderColor }}
    >
      {component.title ? (
        <div
          className="border-b border-slate-200 px-4 py-4"
          style={{ borderColor: tableStyle?.borderColor }}
        >
          <h3
            className="text-lg font-semibold tracking-tight text-slate-950"
            style={{ color: tableStyle?.titleColor }}
          >
            {component.title}
          </h3>
        </div>
      ) : null}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-left text-sm">
          <thead
            className="bg-slate-50"
            style={{ backgroundColor: tableStyle?.headerBackgroundColor }}
          >
            <tr>
              {component.columns.map((column) => (
                <th
                  key={column.field}
                  className="border-b border-slate-200 px-4 py-3 font-medium text-slate-700"
                  style={{
                    borderColor: tableStyle?.borderColor,
                    color: tableStyle?.headerTextColor,
                    fontSize: getFontSizeValue(tableStyle?.textSize),
                    fontWeight: getFontWeightValue(
                      tableStyle?.headerFontWeight,
                    ),
                  }}
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
                  style={
                    index % 2 === 1 && tableStyle?.rowStripeColor
                      ? { backgroundColor: tableStyle.rowStripeColor }
                      : undefined
                  }
                >
                  {component.columns.map((column) => (
                    <td
                      key={`${component.id}-${index}-${column.field}`}
                      className="border-b border-slate-100 px-4 py-3 text-slate-600"
                      style={{
                        borderColor: tableStyle?.borderColor,
                        color: tableStyle?.bodyTextColor,
                        fontSize: getFontSizeValue(tableStyle?.textSize),
                      }}
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
                  style={{
                    color: tableStyle?.bodyTextColor,
                    fontSize: getFontSizeValue(tableStyle?.textSize),
                  }}
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
