"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  Globe,
  Loader2,
  XCircle,
  Zap,
} from "lucide-react";

import {
  fetchOpenApiAction,
  importDocsAction,
} from "@/app/actions/swagger-import";
import { generateDocsFromSpec } from "@/features/swagger-import/generateDocs";
import { parseControllers } from "@/features/swagger-import/parseOpenApi";
import type {
  ImportState,
  OpenApiSpec,
  ParsedController,
} from "@/features/swagger-import/model";

const STEPS = [
  { key: "url", label: "آدرس" },
  { key: "select", label: "انتخاب" },
  { key: "result", label: "نتیجه" },
] as const;

type Step = (typeof STEPS)[number]["key"];

const METHOD_COLORS: Record<string, string> = {
  get: "bg-emerald-50 text-emerald-700 border-emerald-200",
  post: "bg-sky-50 text-sky-700 border-sky-200",
  put: "bg-amber-50 text-amber-700 border-amber-200",
  patch: "bg-violet-50 text-violet-700 border-violet-200",
  delete: "bg-rose-50 text-rose-700 border-rose-200",
};

function StepIndicator({ current }: { current: Step }) {
  const currentIndex = STEPS.findIndex((s) => s.key === current);
  return (
    <div className="flex items-center gap-3">
      {STEPS.map((step, i) => {
        const done = i < currentIndex;
        const active = i === currentIndex;
        return (
          <div key={step.key} className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold transition ${
                  done
                    ? "bg-(--lightBlue) text-white"
                    : active
                      ? "bg-(--darkBlue) text-white"
                      : "bg-slate-100 text-slate-400"
                }`}
              >
                {done ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
              </div>
              <span
                className={`text-sm font-medium ${active ? "text-slate-950" : "text-slate-400"}`}
              >
                {step.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className="h-px w-8 bg-slate-200" />
            )}
          </div>
        );
      })}
    </div>
  );
}

export function SwaggerImportWizard() {
  const [step, setStep] = useState<Step>("url");
  const [url, setUrl] = useState("");
  const [state, setState] = useState<ImportState>("idle");
  const [error, setError] = useState<string | null>(null);
  const [spec, setSpec] = useState<OpenApiSpec | null>(null);
  const [controllers, setControllers] = useState<ParsedController[]>([]);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [importedCount, setImportedCount] = useState(0);

  async function handleFetch() {
    if (!url.trim()) return;
    setState("loading");
    setError(null);

    const result = await fetchOpenApiAction(url);
    if (result.error || !result.spec) {
      setError(result.error ?? "خطای ناشناخته");
      setState("error");
      return;
    }

    const parsed = parseControllers(result.spec);
    if (parsed.length === 0) {
      setError("هیچ controller ای در spec یافت نشد.");
      setState("error");
      return;
    }

    setSpec(result.spec);
    setControllers(parsed);
    setState("parsed");
    setStep("select");
  }

  function toggleController(tag: string) {
    setControllers((prev) =>
      prev.map((c) => {
        if (c.tag !== tag) return c;
        const newSelected = !c.selected;
        return {
          ...c,
          selected: newSelected,
          endpoints: c.endpoints.map((e) => ({ ...e, selected: newSelected })),
        };
      }),
    );
  }

  function toggleEndpoint(tag: string, index: number) {
    setControllers((prev) =>
      prev.map((c) => {
        if (c.tag !== tag) return c;
        const endpoints = c.endpoints.map((e, i) =>
          i === index ? { ...e, selected: !e.selected } : e,
        );
        return { ...c, endpoints, selected: endpoints.some((e) => e.selected) };
      }),
    );
  }

  function toggleAll() {
    const allSelected = controllers.every((c) => c.selected);
    setControllers((prev) =>
      prev.map((c) => ({
        ...c,
        selected: !allSelected,
        endpoints: c.endpoints.map((e) => ({ ...e, selected: !allSelected })),
      })),
    );
  }

  function updateName(tag: string, name: string) {
    setControllers((prev) =>
      prev.map((c) => (c.tag === tag ? { ...c, customName: name } : c)),
    );
  }

  function toggleExpand(tag: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(tag) ? next.delete(tag) : next.add(tag);
      return next;
    });
  }

  async function handleImport() {
    if (!spec) return;
    const selected = controllers.filter(
      (c) => c.selected && c.endpoints.some((e) => e.selected),
    );
    if (selected.length === 0) return;

    setState("importing");
    setError(null);

    const { menuGroups, pages } = generateDocsFromSpec(spec, selected);
    const result = await importDocsAction(menuGroups, pages);

    if (!result.success) {
      setError(result.error ?? "خطا در ذخیره داکیومنت");
      setState("error");
      return;
    }

    setImportedCount(result.count);
    setState("done");
    setStep("result");
  }

  const selectedCount = controllers.filter((c) => c.selected).length;
  const totalEndpointCount = controllers.reduce(
    (sum, c) => sum + c.endpoints.filter((e) => e.selected).length,
    0,
  );

  return (
    <div className="space-y-6">
      {/* Header card */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-(--darkGray)">
              Swagger / OpenAPI
            </p>
            <h1 className="mt-2 text-2xl font-semibold text-slate-950">
              ایجاد داکیومنت از API
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              لینک Swagger یا OpenAPI رو بده تا صفحات داکیومنت بصورت خودکار ساخته بشن
            </p>
          </div>
          <StepIndicator current={step} />
        </div>
      </div>

      {/* Step 1 — URL Input */}
      {step === "url" && (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="mx-auto max-w-xl space-y-5">
            <div className="space-y-2">
              <label
                htmlFor="swagger-url"
                className="block text-sm font-medium text-slate-700"
              >
                آدرس Swagger JSON
              </label>
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <Globe className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    id="swagger-url"
                    type="url"
                    dir="ltr"
                    value={url}
                    onChange={(e) => {
                      setUrl(e.target.value);
                      if (error) setError(null);
                      if (state === "error") setState("idle");
                    }}
                    onKeyDown={(e) => e.key === "Enter" && handleFetch()}
                    placeholder="https://api.example.com/swagger-json"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pr-10 pl-4 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-(--lightBlue) focus:bg-white focus:ring-2 focus:ring-(--lightBlue)/20"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleFetch}
                  disabled={state === "loading" || !url.trim()}
                  className="flex items-center gap-2 rounded-2xl bg-(--darkBlue) px-5 py-3 text-sm font-semibold text-white transition hover:bg-(--lightBlue) disabled:opacity-50"
                >
                  {state === "loading" ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Zap className="h-4 w-4" />
                  )}
                  {state === "loading" ? "در حال بارگذاری..." : "بارگذاری"}
                </button>
              </div>
              <p className="text-xs text-slate-400">
                مثال: https://petstore.swagger.io/v2/swagger.json
              </p>
            </div>

            {error && (
              <div className="flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-4">
                <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-500" />
                <p className="text-sm text-rose-700">{error}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Step 2 — Controller Checklist */}
      {step === "select" && (
        <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
          {/* Checklist header */}
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
            <div>
              <p className="font-semibold text-slate-950">
                {controllers.length} Controller یافت شد
              </p>
              <p className="text-sm text-slate-500">
                {selectedCount} controller — {totalEndpointCount} API انتخاب شده
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={toggleAll}
                className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
              >
                {controllers.every((c) => c.selected)
                  ? "لغو انتخاب همه"
                  : "انتخاب همه"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setStep("url");
                  setState("idle");
                }}
                className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Controller list */}
          <div className="divide-y divide-slate-100">
            {controllers.map((controller) => {
              const isExpanded = expanded.has(controller.tag);
              const selectedEpCount = controller.endpoints.filter(
                (e) => e.selected,
              ).length;

              return (
                <div key={controller.tag}>
                  {/* Controller row */}
                  <div className="flex items-center gap-3 px-6 py-4 transition hover:bg-slate-50">
                    <input
                      type="checkbox"
                      checked={controller.selected}
                      onChange={() => toggleController(controller.tag)}
                      className="h-4 w-4 shrink-0 rounded accent-(--lightBlue)"
                    />
                    <input
                      type="text"
                      value={controller.customName}
                      onChange={(e) =>
                        updateName(controller.tag, e.target.value)
                      }
                      className="min-w-0 flex-1 bg-transparent text-sm font-medium text-slate-950 outline-none transition border-b border-transparent focus:border-slate-300"
                      dir="ltr"
                    />
                    <span className="shrink-0 rounded-full bg-(--darkBlue)/10 px-3 py-1 text-xs font-semibold text-(--darkBlue)">
                      {selectedEpCount}/{controller.endpointCount} API
                    </span>
                    <button
                      type="button"
                      onClick={() => toggleExpand(controller.tag)}
                      className="shrink-0 rounded-lg p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                    >
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                      />
                    </button>
                  </div>

                  {/* Endpoint list (accordion) */}
                  {isExpanded && (
                    <div className="border-t border-slate-50 bg-slate-50/60">
                      {controller.endpoints.map((ep, i) => (
                        <label
                          key={`${ep.method}-${ep.path}-${i}`}
                          className="flex cursor-pointer items-center gap-3 px-8 py-2.5 transition hover:bg-slate-100"
                        >
                          <input
                            type="checkbox"
                            checked={ep.selected}
                            onChange={() => toggleEndpoint(controller.tag, i)}
                            className="h-3.5 w-3.5 shrink-0 rounded accent-(--lightBlue)"
                          />
                          <span
                            className={`shrink-0 rounded border px-1.5 py-0.5 text-[10px] font-bold uppercase ${(METHOD_COLORS[ep.method] ?? "bg-slate-100 text-slate-600 border-slate-200")}`}
                          >
                            {ep.method}
                          </span>
                          <span
                            className="flex-1 truncate font-mono text-xs text-slate-600"
                            dir="ltr"
                          >
                            {ep.path}
                          </span>
                          {ep.summary && (
                            <span className="hidden max-w-50 shrink-0 truncate text-xs text-slate-400 sm:block">
                              {ep.summary}
                            </span>
                          )}
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4">
            {error && (
              <div className="flex items-center gap-2 text-sm text-rose-600">
                <XCircle className="h-4 w-4" />
                {error}
              </div>
            )}
            <div className="mr-auto flex items-center gap-3">
              <p className="text-sm text-slate-500">
                {selectedCount} controller ({totalEndpointCount} API) →{" "}
                <span className="font-semibold text-slate-950">
                  {selectedCount} صفحه
                </span>
              </p>
              <button
                type="button"
                onClick={handleImport}
                disabled={state === "importing" || selectedCount === 0}
                className="flex items-center gap-2 rounded-2xl bg-(--darkBlue) px-6 py-3 text-sm font-semibold text-white transition hover:bg-(--lightBlue) disabled:opacity-50"
              >
                {state === "importing" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Zap className="h-4 w-4" />
                )}
                {state === "importing" ? "در حال ساخت..." : "تولید داکیومنت"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step 3 — Result */}
      {step === "result" && (
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="mx-auto max-w-md space-y-6 text-center">
            <div className="flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
                <CheckCircle2 className="h-8 w-8 text-emerald-500" />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-slate-950">
                داکیومنت با موفقیت ساخته شد
              </h2>
              <p className="mt-2 text-slate-500">
                {importedCount} صفحه داکیومنت از Swagger spec ایجاد شد
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/admin"
                className="rounded-2xl bg-(--darkBlue) px-6 py-3 text-sm font-semibold text-white transition hover:bg-(--lightBlue)"
              >
                مشاهده در داکیومنت ساز
              </Link>
              <Link
                href="/pages"
                className="rounded-2xl border border-slate-200 px-6 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                پیش‌نمایش داکیومنت
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
