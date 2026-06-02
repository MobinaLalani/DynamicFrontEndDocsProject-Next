"use client";

import dynamic from "next/dynamic";

import type {
  CodeComponent,
  EndpointComponent,
  FieldGroupComponent,
  HeadingComponent,
  ParagraphComponent,
  TableComponent,
} from "@/lib/docs/schema";
import type {
  CodeInspectorProps,
  EndpointInspectorProps,
  FieldGroupInspectorProps,
  HeadingInspectorProps,
  ParagraphInspectorProps,
  TableInspectorProps,
} from "@/components/docs/builder/inspector/types";

function InspectorLoading() {
  return (
    <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-5 text-sm text-slate-500">
      در حال بارگذاری ویرایشگر بلوک...
    </div>
  );
}

export const inspectorRegistry = {
  heading: dynamic<HeadingInspectorProps>(
    () => import("@/components/docs/builder/inspector/HeadingInspector"),
    { loading: InspectorLoading },
  ),
  paragraph: dynamic<ParagraphInspectorProps>(
    () => import("@/components/docs/builder/inspector/ParagraphInspector"),
    { loading: InspectorLoading },
  ),
  endpoint: dynamic<EndpointInspectorProps>(
    () => import("@/components/docs/builder/inspector/EndpointInspector"),
    { loading: InspectorLoading },
  ),
  "field-group": dynamic<FieldGroupInspectorProps>(
    () => import("@/components/docs/builder/inspector/FieldGroupInspector"),
    { loading: InspectorLoading },
  ),
  table: dynamic<TableInspectorProps>(
    () => import("@/components/docs/builder/inspector/TableInspector"),
    { loading: InspectorLoading },
  ),
  code: dynamic<CodeInspectorProps>(
    () => import("@/components/docs/builder/inspector/CodeInspector"),
    { loading: InspectorLoading },
  ),
} as const;

export type InspectorRegistry = {
  heading: React.ComponentType<HeadingInspectorProps>;
  paragraph: React.ComponentType<ParagraphInspectorProps>;
  endpoint: React.ComponentType<EndpointInspectorProps>;
  "field-group": React.ComponentType<FieldGroupInspectorProps>;
  table: React.ComponentType<TableInspectorProps>;
  code: React.ComponentType<CodeInspectorProps>;
};

export type InspectorComponentMap = {
  heading: HeadingComponent;
  paragraph: ParagraphComponent;
  endpoint: EndpointComponent;
  "field-group": FieldGroupComponent;
  table: TableComponent;
  code: CodeComponent;
};
