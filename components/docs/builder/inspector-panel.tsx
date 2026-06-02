import type {
  CodeComponent,
  EndpointComponent,
  FieldGroupComponent,
  HeadingComponent,
  PageComponent,
  ParagraphComponent,
  TableComponent,
} from "@/lib/docs/schema";

import { inspectorRegistry } from "@/components/docs/builder/inspector/registry";

type InspectorPanelProps = {
  selectedComponent: PageComponent | null;
  onUpdateSelectedComponent: (
    updater: (component: PageComponent) => PageComponent,
  ) => void;
};

export function InspectorPanel({
  selectedComponent,
  onUpdateSelectedComponent,
}: InspectorPanelProps) {
  if (!selectedComponent) {
    return (
      <div className="mt-4 rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-5 text-sm leading-6 text-slate-600">
        یک بلوک را از بوم صفحه انتخاب کن تا تنظیماتش اینجا نمایش داده شود.
      </div>
    );
  }

  const BlockTypePanel = renderInspector(
    selectedComponent,
    onUpdateSelectedComponent,
  );

  return (
    <div className="mt-4 space-y-5">
      <div className="rounded-2xl bg-slate-50 p-4">
        <p className="text-xs text-slate-500">نوع بلوک</p>
        <p className="mt-2 text-lg font-semibold text-slate-950">
          {selectedComponent.type}
        </p>
      </div>
      {BlockTypePanel}
    </div>
  );
}

function renderInspector(
  selectedComponent: PageComponent,
  onUpdateSelectedComponent: (
    updater: (component: PageComponent) => PageComponent,
  ) => void,
) {
  switch (selectedComponent.type) {
    case "heading": {
      const Inspector = inspectorRegistry.heading;
      return (
        <Inspector
          component={selectedComponent}
          onChange={(updater) =>
            onUpdateSelectedComponent((component) =>
              updater(component as HeadingComponent),
            )
          }
        />
      );
    }

    case "paragraph": {
      const Inspector = inspectorRegistry.paragraph;
      return (
        <Inspector
          component={selectedComponent}
          onChange={(updater) =>
            onUpdateSelectedComponent((component) =>
              updater(component as ParagraphComponent),
            )
          }
        />
      );
    }

    case "endpoint": {
      const Inspector = inspectorRegistry.endpoint;
      return (
        <Inspector
          component={selectedComponent}
          onChange={(updater) =>
            onUpdateSelectedComponent((component) =>
              updater(component as EndpointComponent),
            )
          }
        />
      );
    }

    case "field-group": {
      const Inspector = inspectorRegistry["field-group"];
      return (
        <Inspector
          component={selectedComponent}
          onChange={(updater) =>
            onUpdateSelectedComponent((component) =>
              updater(component as FieldGroupComponent),
            )
          }
        />
      );
    }

    case "table": {
      const Inspector = inspectorRegistry.table;
      return (
        <Inspector
          component={selectedComponent}
          onChange={(updater) =>
            onUpdateSelectedComponent((component) =>
              updater(component as TableComponent),
            )
          }
        />
      );
    }

    case "code": {
      const Inspector = inspectorRegistry.code;
      return (
        <Inspector
          component={selectedComponent}
          onChange={(updater) =>
            onUpdateSelectedComponent((component) =>
              updater(component as CodeComponent),
            )
          }
        />
      );
    }

    default:
      return null;
  }
}
