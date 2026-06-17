"use client";

import { createElement, useState } from "react";
import { Check, X, RotateCcw } from "lucide-react";

import type { PageComponentType } from "@/lib/docs/schema";
import type { BlockCapabilityRegistry } from "@/lib/docs/capabilities";
import { defaultBlockCapabilities } from "@/lib/docs/capabilities";
import {
  getBlockTypeIcon,
  getBlockTypeLabel,
} from "@/components/docs/builder/constants";

type SectionKey = "properties" | "style" | "behavior";

const SECTION_LABELS: Record<SectionKey, string> = {
  properties: "ویژگی‌ها",
  style: "استایل",
  behavior: "رفتار",
};

const BLOCK_TYPE_ORDER: PageComponentType[] = [
  "heading",
  "paragraph",
  "note",
  "endpoint",
  "field-group",
  "table",
  "code",
];

function cloneRegistry(source: BlockCapabilityRegistry): BlockCapabilityRegistry {
  return Object.fromEntries(
    Object.entries(source).map(([type, config]) => [
      type,
      {
        properties: { ...config.properties },
        style: { ...config.style },
        behavior: { ...config.behavior },
      },
    ]),
  ) as BlockCapabilityRegistry;
}

function labelFromKey(key: string): string {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (s) => s.toUpperCase())
    .trim();
}

export function BlockCapabilityPanel() {
  const [activeType, setActiveType] =
    useState<PageComponentType>("endpoint");
  const [capabilities, setCapabilities] = useState<BlockCapabilityRegistry>(
    () => cloneRegistry(defaultBlockCapabilities),
  );
  const [saved, setSaved] = useState(false);

  const currentCaps = capabilities[activeType];

  function toggle(section: SectionKey, key: string) {
    setSaved(false);
    setCapabilities((prev) => ({
      ...prev,
      [activeType]: {
        ...prev[activeType],
        [section]: {
          ...prev[activeType][section],
          [key]: !prev[activeType][section][key as keyof typeof prev[typeof activeType][typeof section]],
        },
      },
    }));
  }

  function reset() {
    setSaved(false);
    setCapabilities((prev) => ({
      ...prev,
      [activeType]: {
        properties: {
          ...defaultBlockCapabilities[activeType].properties,
        },
        style: { ...defaultBlockCapabilities[activeType].style },
        behavior: {
          ...defaultBlockCapabilities[activeType].behavior,
        },
      },
    }));
  }

  function save() {
    setSaved(true);
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      {/* Header */}
      <div className="border-b border-slate-100 px-6 py-5">
        <p className="text-xs font-medium uppercase tracking-[0.24em] text-sky-600">
          Block Capabilities
        </p>
        <h2 className="mt-1.5 text-xl font-semibold text-slate-950">
          مدیریت قابلیت‌های بلاک‌ها
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          کنترل دسترسی ویژگی‌ها، استایل و رفتار هر نوع بلاک در اینسپکتور
        </p>
      </div>

      {/* Block type tabs */}
      <div className="flex flex-wrap gap-1.5 border-b border-slate-100 bg-slate-50 px-4 py-3">
        {BLOCK_TYPE_ORDER.map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => setActiveType(type)}
            className={`flex items-center gap-2 rounded-xl px-3 py-1.5 text-sm font-medium transition ${
              activeType === type
                ? "bg-white text-slate-950 shadow-sm ring-1 ring-slate-200"
                : "text-slate-500 hover:bg-white/60 hover:text-slate-800"
            }`}
          >
            {createElement(getBlockTypeIcon(type), {
              className: "h-3.5 w-3.5 shrink-0",
              strokeWidth: 2,
            })}
            {getBlockTypeLabel(type)}
          </button>
        ))}
      </div>

      {/* Capability sections */}
      <div className="space-y-6 p-6">
        {(["properties", "style", "behavior"] as SectionKey[]).map(
          (section) => {
            const entries = Object.entries(currentCaps[section]);
            if (entries.length === 0) return null;
            return (
              <div key={section}>
                <div className="mb-3 flex items-center gap-2">
                  <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                    {SECTION_LABELS[section]}
                  </span>
                  <div className="h-px flex-1 bg-slate-100" />
                  <span className="text-xs text-slate-400">
                    {entries.filter(([, v]) => v).length}/{entries.length}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
                  {entries.map(([key, enabled]) => (
                    <CapabilityToggle
                      key={key}
                      label={labelFromKey(key)}
                      enabled={enabled as boolean}
                      onToggle={() => toggle(section, key)}
                    />
                  ))}
                </div>
              </div>
            );
          },
        )}
      </div>

      {/* Footer actions */}
      <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50 px-6 py-4">
        <button
          type="button"
          onClick={reset}
          className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-white hover:text-slate-950"
        >
          <RotateCcw className="h-3.5 w-3.5" strokeWidth={2} />
          بازنشانی
        </button>
        <button
          type="button"
          onClick={save}
          className={`rounded-xl px-5 py-2 text-sm font-medium transition ${
            saved
              ? "bg-emerald-100 text-emerald-700"
              : "bg-slate-950 text-white hover:bg-slate-800"
          }`}
        >
          {saved ? "ذخیره شد" : "ذخیره تغییرات"}
        </button>
      </div>
    </div>
  );
}

function CapabilityToggle({
  label,
  enabled,
  onToggle,
}: {
  label: string;
  enabled: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      title={label}
      className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-left text-xs transition ${
        enabled
          ? "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
          : "border-slate-200 bg-white text-slate-400 hover:border-slate-300 hover:text-slate-600"
      }`}
    >
      <span
        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full transition ${
          enabled ? "bg-emerald-500" : "bg-slate-200"
        }`}
      >
        {enabled ? (
          <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />
        ) : (
          <X className="h-2.5 w-2.5 text-slate-400" strokeWidth={2.5} />
        )}
      </span>
      <span className="truncate font-mono">{label}</span>
    </button>
  );
}
