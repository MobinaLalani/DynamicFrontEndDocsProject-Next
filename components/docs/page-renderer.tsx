import type {
  CodeComponent,
  EndpointComponent,
  FieldGroupComponent,
  HeadingComponent,
  ParagraphComponent,
  PageComponent,
  TableComponent,
  DocPage,
} from "@/lib/docs/schema";

type PageRendererProps = {
  page: DocPage;
};

function HeadingBlock({ component }: { component: HeadingComponent }) {
  const Tag =
    component.level === 2 ? "h2" : component.level === 3 ? "h3" : "h1";

  return (
    <Tag className="text-pretty font-semibold tracking-tight text-slate-950">
      {component.text}
    </Tag>
  );
}

function ParagraphBlock({ component }: { component: ParagraphComponent }) {
  return (
    <p className="max-w-3xl text-base leading-7 text-slate-600">
      {component.text}
    </p>
  );
}

function EndpointBlock({ component }: { component: EndpointComponent }) {
  const methodColors: Record<EndpointComponent["method"], string> = {
    GET: "bg-emerald-100 text-emerald-700",
    POST: "bg-sky-100 text-sky-700",
    PUT: "bg-amber-100 text-amber-700",
    PATCH: "bg-violet-100 text-violet-700",
    DELETE: "bg-rose-100 text-rose-700",
  };

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

function FieldGroupBlock({ component }: { component: FieldGroupComponent }) {
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
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
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

function TableBlock({ component }: { component: TableComponent }) {
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

function CodeBlock({ component }: { component: CodeComponent }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
        <div>
          <p className="font-medium text-slate-100">
            {component.title ?? "Code Example"}
          </p>
          <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
            {component.language}
          </p>
        </div>
      </div>
      <pre className="overflow-x-auto p-4 text-sm leading-7 text-slate-100">
        <code>{component.code}</code>
      </pre>
    </div>
  );
}

const componentRegistry: {
  [K in PageComponent["type"]]: (props: {
    component: Extract<PageComponent, { type: K }>;
  }) => React.JSX.Element;
} = {
  heading: HeadingBlock,
  paragraph: ParagraphBlock,
  endpoint: EndpointBlock,
  "field-group": FieldGroupBlock,
  table: TableBlock,
  code: CodeBlock,
};

function renderComponent(component: PageComponent) {
  const Block = componentRegistry[component.type] as (props: {
    component: PageComponent;
  }) => React.JSX.Element;

  return <Block key={component.id} component={component} />;
}

export function PageRenderer({ page }: PageRendererProps) {
  return (
    <article className="space-y-6 rounded-3xl border border-slate-200 bg-slate-50 p-6 text-right shadow-sm sm:p-8">
      <header className="space-y-3">
        <p className="text-sm font-medium tracking-[0.2em] text-slate-500">
          /pages/{page.slug}
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-950">
          {page.title}
        </h1>
        {page.description ? (
          <p className="max-w-3xl text-base leading-7 text-slate-600">
            {page.description}
          </p>
        ) : null}
      </header>

      <section className="space-y-5">
        {page.components.map(renderComponent)}
      </section>
    </article>
  );
}
