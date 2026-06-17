"use client";

import { createElement } from "react";

import { paletteBlocks } from "@/lib/docs/builder";
import { getBlockTypeIcon } from "@/components/docs/builder/constants";
import { useBlockRegistry } from "@/context/BlockRegistryContext";

export function BlockRegistryPanel() {
  const { activeTypes, isActive, toggleType, enableAll } = useBlockRegistry();

  return (
    <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-6 py-5">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-sky-600">
            Block Registry
          </p>
          <h2 className="mt-1.5 text-xl font-semibold text-slate-950">
            مدیریت کامپوننت‌ها
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            کامپوننت‌های فعال در لیست ساخت صفحه جدید نمایش داده می‌شوند
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <span className="text-sm text-slate-400">
            {activeTypes.size}/{paletteBlocks.length} فعال
          </span>
          <button
            type="button"
            onClick={enableAll}
            className="rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-950"
          >
            فعال کردن همه
          </button>
        </div>
      </div>

      {/* Block list */}
      <div className="divide-y divide-slate-100">
        {paletteBlocks.map((block) => {
          const active = isActive(block.type);
          return (
            <div
              key={block.type}
              className={`flex items-center gap-4 px-6 py-4 transition-colors ${
                active ? "bg-white" : "bg-slate-50/60"
              }`}
            >
              {/* Icon */}
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl transition-colors ${
                  active
                    ? "bg-sky-50 text-sky-600"
                    : "bg-slate-100 text-slate-400"
                }`}
              >
                {createElement(getBlockTypeIcon(block.type), {
                  className: "h-5 w-5",
                  strokeWidth: 2,
                })}
              </div>

              {/* Info */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-sm font-semibold transition-colors ${
                      active ? "text-slate-950" : "text-slate-400"
                    }`}
                  >
                    {block.label}
                  </span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      active
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    {active ? "فعال" : "غیر فعال"}
                  </span>
                </div>
                <p
                  className={`mt-0.5 truncate text-xs transition-colors ${
                    active ? "text-slate-500" : "text-slate-400"
                  }`}
                >
                  {block.description}
                </p>
              </div>

              {/* Toggle switch */}
              <button
                type="button"
                onClick={() => toggleType(block.type)}
                aria-label={active ? "غیرفعال کردن" : "فعال کردن"}
                className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
                  active ? "bg-emerald-500" : "bg-slate-200"
                }`}
              >
                <span
                  className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
                    active ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
