import type { EndpointComponent } from "@/lib/docs/schema";
import type { PageBlockProps } from "@/features/docs-builder/types/types";

const methodConfig: Record<
  EndpointComponent["method"],
  { badge: string; bar: string; border: string }
> = {
  GET: {
    badge: "bg-emerald-500 text-white",
    bar: "bg-emerald-400",
    border: "border-emerald-300",
  },
  POST: {
    badge: "bg-sky-500 text-white",
    bar: "bg-sky-400",
    border: "border-sky-300",
  },
  PUT: {
    badge: "bg-amber-500 text-white",
    bar: "bg-amber-400",
    border: "border-amber-300",
  },
  PATCH: {
    badge: "bg-violet-500 text-white",
    bar: "bg-violet-400",
    border: "border-violet-300",
  },
  DELETE: {
    badge: "bg-rose-500 text-white",
    bar: "bg-rose-400",
    border: "border-rose-300",
  },
};

export function EndpointBlock({
  component,
}: PageBlockProps<EndpointComponent>) {
  const endpointStyle = component.style;
  const config = methodConfig[component.method];

  return (
    <div
      dir="ltr"
      className={`overflow-hidden rounded-2xl border-2 bg-white text-left shadow-md ${config.border}`}
    >
      {/* COLOR BAR */}
      <div className={`h-1 w-full ${config.bar}`} />

      {/* HEADER */}
      <div className="px-6 py-5">
        <div className="flex flex-wrap items-center gap-3">
          <span
            className={`rounded-lg px-3 py-1.5 text-xs font-bold tracking-wider ${config.badge}`}
          >
            {component.method}
          </span>

          <code
            className="min-w-0 flex-1 truncate rounded-xl bg-slate-900 px-4 py-2 font-mono text-sm text-emerald-300"
            style={{
              backgroundColor: endpointStyle?.pathBackgroundColor,
              color: endpointStyle?.pathTextColor ?? undefined,
            }}
          >
            {component.path}
          </code>

          <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-400">
            REST API
          </span>
        </div>

        <h3
          className="mt-4 text-xl font-bold tracking-tight text-slate-900"
          style={{ color: endpointStyle?.titleColor }}
        >
          {component.title}
        </h3>

        <p
          className="mt-1.5 text-sm leading-relaxed text-slate-500"
          style={{ color: endpointStyle?.summaryColor }}
        >
          {component.summary}
        </p>
      </div>

      {/* META STRIP */}
      <div className="grid grid-cols-3 border-t border-slate-100 bg-slate-50/70">
        <MetaCell label="Authentication" value={component.auth ?? "None"} />
        <MetaCell
          label="Request"
          value={component.requestContentType ?? "application/json"}
          leftBorder
        />
        <MetaCell
          label="Response"
          value={component.responseContentType ?? "application/json"}
          leftBorder
        />
      </div>
    </div>
  );
}

function MetaCell({
  label,
  value,
  leftBorder,
}: {
  label: string;
  value: string;
  leftBorder?: boolean;
}) {
  return (
    <div
      className={`px-5 py-4 ${leftBorder ? "border-l border-slate-200" : ""}`}
    >
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
        {label}
      </p>
      <p className="mt-1.5 font-mono text-xs font-medium text-slate-700">
        {value}
      </p>
    </div>
  );
}
