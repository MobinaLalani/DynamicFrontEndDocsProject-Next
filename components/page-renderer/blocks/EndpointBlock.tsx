import type { EndpointComponent } from "@/lib/docs/schema";
import type { PageBlockProps } from "@/components/page-renderer/types";

const methodColors: Record<EndpointComponent["method"], string> = {
  GET: "bg-emerald-100 text-emerald-700",
  POST: "bg-sky-100 text-sky-700",
  PUT: "bg-amber-100 text-amber-700",
  PATCH: "bg-violet-100 text-violet-700",
  DELETE: "bg-rose-100 text-rose-700",
};

export function EndpointBlock({
  component,
}: PageBlockProps<EndpointComponent>) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-center gap-3">
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${methodColors[component.method]}`}
        >
          {component.method}
        </span>
        <code className="rounded-xl bg-slate-950 px-3 py-2 text-sm text-slate-100">
          {component.path}
        </code>
      </div>
      <div className="mt-4 space-y-2">
        <h3 className="text-xl font-semibold tracking-tight text-slate-950">
          {component.title}
        </h3>
        <p className="text-sm leading-6 text-slate-600">{component.summary}</p>
      </div>
      <dl className="mt-5 grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl bg-slate-50 p-4">
          <dt className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
            Auth
          </dt>
          <dd className="mt-2 text-sm text-slate-700">
            {component.auth ?? "Not specified"}
          </dd>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <dt className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
            Request
          </dt>
          <dd className="mt-2 text-sm text-slate-700">
            {component.requestContentType ?? "Not specified"}
          </dd>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <dt className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
            Response
          </dt>
          <dd className="mt-2 text-sm text-slate-700">
            {component.responseContentType ?? "Not specified"}
          </dd>
        </div>
      </dl>
    </div>
  );
}
