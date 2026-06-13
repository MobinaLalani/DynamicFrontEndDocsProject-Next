import { CodeBlock } from "@/components/page-renderer/blocks/CodeBlock";
import { EndpointBlock } from "@/components/page-renderer/blocks/EndpointBlock";
import { FieldGroupBlock } from "@/components/page-renderer/blocks/FieldGroupBlock";
import { HeadingBlock } from "@/components/page-renderer/blocks/HeadingBlock";
import { NoteBlock } from "@/components/page-renderer/blocks/NoteBlock";
import { ParagraphBlock } from "@/components/page-renderer/blocks/ParagraphBlock";
import { TableBlock } from "@/components/page-renderer/blocks/TableBlock";
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
