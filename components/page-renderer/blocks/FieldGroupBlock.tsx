import type { FieldGroupComponent } from "@/lib/docs/schema";
import type { PageBlockProps } from "@/components/page-renderer/types";

export function FieldGroupBlock({
  component,
}: PageBlockProps<FieldGroupComponent>) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-slate-950">
            {component.title}
          </h3>
          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
            {component.kind}
          </p>
        </div>
        <span className="rounded-full px-3 py-1 text-xs font-medium text-slate-600">
          {component.fields.length} fields
        </span>
      </div>

      <div className="space-y-3">
        {component.fields.map((field) => (
          <div
            key={field.id}
            className="grid gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4 sm:grid-cols-[1.2fr_0.9fr_0.8fr_2fr]"
          >
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-slate-500">
                Name
              </p>
              <p className="mt-1 font-medium text-slate-900">{field.name}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-slate-500">
                Type
              </p>
              <p className="mt-1 text-slate-700">{field.type}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-slate-500">
                Required
              </p>
              <p className="mt-1 text-slate-700">
                {field.required ? "Yes" : "No"}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-slate-500">
                Description
              </p>
              <p className="mt-1 text-slate-700">{field.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
