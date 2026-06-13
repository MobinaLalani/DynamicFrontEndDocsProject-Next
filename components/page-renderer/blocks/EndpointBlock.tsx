import type { EndpointComponent } from "@/lib/docs/schema";
import type { PageBlockProps } from "@/components/page-renderer/types";

const methodColors: Record<EndpointComponent["method"], string> = {
  GET: "bg-emerald-500/10 text-emerald-600 border-emerald-200",
  POST: "bg-sky-500/10 text-sky-600 border-sky-200",
  PUT: "bg-amber-500/10 text-amber-600 border-amber-200",
  PATCH: "bg-violet-500/10 text-violet-600 border-violet-200",
  DELETE: "bg-rose-500/10 text-rose-600 border-rose-200",
};

export function EndpointBlock({
  component,
}: PageBlockProps<EndpointComponent>) {
  const endpointStyle = component.style;

  return (
    <div
      dir="ltr"
      className="overflow-hidden rounded-3xl border border-slate-200 bg-white text-left shadow-[0_10px_40px_rgba(15,23,42,0.08)]"
    >
      {/* HEADER */}
      <div className="border-b border-slate-100 bg-slate-50 px-6 py-5">
        <div className="flex items-center gap-3">
          <span
            className={`rounded-full border px-3 py-1 text-xs font-semibold ${methodColors[component.method]}`}
          >
            {component.method}
          </span>

          <code
            className="rounded-xl bg-slate-900 px-3 py-2 font-mono text-sm text-slate-100"
            style={{
              backgroundColor: endpointStyle?.pathBackgroundColor,
              color: endpointStyle?.pathTextColor,
            }}
          >
            {component.path}
          </code>

          <span className="ml-auto text-xs text-slate-500">API Endpoint</span>
        </div>

        <h3
          className="mt-4 text-lg font-semibold text-slate-900"
          style={{ color: endpointStyle?.titleColor }}
        >
          {component.title}
        </h3>

        <p
          className="mt-1 text-sm text-slate-600"
          style={{ color: endpointStyle?.summaryColor }}
        >
          {component.summary}
        </p>
      </div>

      {/* META */}
      <div className="grid grid-cols-1 sm:grid-cols-3">
        <div className="border-b border-slate-100 p-5 sm:border-b-0 sm:border-r">
          <div className="text-xs font-medium uppercase tracking-widest text-slate-500">
            Auth
          </div>
          <div className="mt-2 text-sm font-medium text-slate-800">
            {component.auth ?? "None"}
          </div>
        </div>

        <div className="border-b border-slate-100 p-5 sm:border-b-0 sm:border-r">
          <div className="text-xs font-medium uppercase tracking-widest text-slate-500">
            Request
          </div>
          <div className="mt-2 text-sm font-medium text-slate-800">
            {component.requestContentType ?? "application/json"}
          </div>
        </div>

        <div className="p-5">
          <div className="text-xs font-medium uppercase tracking-widest text-slate-500">
            Response
          </div>
          <div className="mt-2 text-sm font-medium text-slate-800">
            {component.responseContentType ?? "application/json"}
          </div>
        </div>
      </div>
    </div>
  );
}
