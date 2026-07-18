import { CodeBlock } from "@/components/ui/pageBuilderComponents/CodeBlock";
import { EndpointBlock } from "@/components/ui/pageBuilderComponents/EndpointBlock";
import { FieldGroupBlock } from "@/components/ui/pageBuilderComponents/FieldGroupBlock";
import { HeadingBlock } from "@/components/ui/pageBuilderComponents/HeadingBlock";
import { NoteBlock } from "@/components/ui/pageBuilderComponents/NoteBlock";
import { ParagraphBlock } from "@/components/ui/pageBuilderComponents/ParagraphBlock";
import { TableBlock } from "@/components/ui/pageBuilderComponents/TableBlock";
import type { PageBlockRegistry } from "@/components/page-renderer/types";

export const pageBlockRegistry: PageBlockRegistry = {
  heading: HeadingBlock,
  note: NoteBlock,
  paragraph: ParagraphBlock,
  endpoint: EndpointBlock,
  "field-group": FieldGroupBlock,
  table: TableBlock,
  code: CodeBlock,
};
