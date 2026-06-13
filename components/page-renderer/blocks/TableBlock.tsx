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
      className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-[0_10px_40px_rgba(15,23,42,0.08)]"
      style={{ borderColor: tableStyle?.borderColor }}
    >
      {component.title ? (
        <div
          className="border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white px-6 py-5"
          style={{ borderColor: tableStyle?.borderColor }}
        >
          <h3
            className="text-lg font-semibold tracking-tight text-slate-900"
            style={{ color: tableStyle?.titleColor }}
          >
            {component.title}
          </h3>
        </div>
      ) : null}

      <div className="overflow-x-auto">
        <table dir="rtl" className="min-w-full text-right text-sm">
          <thead
            className="sticky top-0 z-10 backdrop-blur-sm"
            style={{
              backgroundColor:
                tableStyle?.headerBackgroundColor ?? "rgba(248,250,252,0.95)",
            }}
          >
            <tr>
              {component.columns.map((column) => (
                <th
                  key={column.field}
                  className="border-b border-slate-200 px-6 py-4 font-semibold tracking-wide text-slate-700"
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
                  className="transition-all duration-200 hover:bg-slate-100"
                  style={
                    index % 2 === 1 && tableStyle?.rowStripeColor
                      ? { backgroundColor: tableStyle.rowStripeColor }
                      : undefined
                  }
                >
                  {component.columns.map((column) => (
                    <td
                      key={`${component.id}-${index}-${column.field}`}
                      className="border-b border-slate-100 px-6 py-4 text-slate-700"
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
                  className="px-6 py-12 text-center text-slate-500"
                  style={{
                    color: tableStyle?.bodyTextColor,
                    fontSize: getFontSizeValue(tableStyle?.textSize),
                  }}
                >
                  {component.emptyMessage ?? "داده‌ای برای نمایش وجود ندارد."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
