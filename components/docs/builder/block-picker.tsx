import { createElement } from "react";

import { paletteBlocks } from "@/lib/docs/builder";
import type { PageComponentType } from "@/lib/docs/schema";

import {
  getBlockTypeIcon,
  getBlockTypeLabel,
  paletteTransferKey,
} from "@/components/docs/builder/constants";

type BlockPickerProps = {
  onAddBlock: (type: PageComponentType) => void;
  columnsClassName?: string;
};

export function BlockPicker({
  onAddBlock,
  columnsClassName = "grid-cols-3",
}: BlockPickerProps) {
  return (
    <div className={`grid gap-3 ${columnsClassName}`}>
      {paletteBlocks.map((block) => (
        <BlockIconButton
          key={block.type}
          type={block.type}
          onAddBlock={onAddBlock}
        />
      ))}
    </div>
  );
}

function BlockIconButton({
  type,
  onAddBlock,
}: {
  type: PageComponentType;
  onAddBlock: (type: PageComponentType) => void;
}) {
  const label = getBlockTypeLabel(type);

  return (
    <button
      type="button"
      draggable
      aria-label={label}
      onDragStart={(event) =>
        event.dataTransfer.setData(paletteTransferKey, type)
      }
      onClick={() => onAddBlock(type)}
      className="group relative flex h-14 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-700 transition hover:border-slate-300 hover:bg-white hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
    >
      {createElement(getBlockTypeIcon(type), {
        className: "h-5 w-5",
        strokeWidth: 2,
      })}
      <span className="pointer-events-none absolute -top-11 left-1/2 -translate-x-1/2 rounded-xl bg-slate-950 px-3 py-1.5 text-xs font-medium whitespace-nowrap text-white opacity-0 shadow-lg transition group-hover:opacity-100 group-focus-visible:opacity-100">
        {label}
      </span>
    </button>
  );
}
