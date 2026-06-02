import type {
  CodeComponent,
  EndpointComponent,
  FieldGroupComponent,
  HeadingComponent,
  PageComponent,
  ParagraphComponent,
  TableComponent,
} from "@/lib/docs/schema";

export type InspectorProps<T extends PageComponent> = {
  component: T;
  onChange: (updater: (component: T) => T) => void;
};

export type HeadingInspectorProps = InspectorProps<HeadingComponent>;
export type ParagraphInspectorProps = InspectorProps<ParagraphComponent>;
export type EndpointInspectorProps = InspectorProps<EndpointComponent>;
export type FieldGroupInspectorProps = InspectorProps<FieldGroupComponent>;
export type TableInspectorProps = InspectorProps<TableComponent>;
export type CodeInspectorProps = InspectorProps<CodeComponent>;
