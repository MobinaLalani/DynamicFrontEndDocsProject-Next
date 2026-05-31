import { paletteBlocks } from "@/lib/docs/builder";
import type { PageComponentType } from "@/lib/docs/schema";

import {
  paletteTransferKey,
  translateBlockDescription,
  translateBlockLabel,
} from "@/components/docs/builder/constants";

type BlockPickerProps = {
  onAddBlock: (type: PageComponentType) => void;
  columnsClassName?: string;
};

export function BlockPicker({
  onAddBlock,
  columnsClassName = "md:grid-cols-2 xl:grid-cols-3",
}: BlockPickerProps) {
  return (
    <div className={`grid gap-3 ${columnsClassName}`}>
      {paletteBlocks.map((block) => (
        <button
          key={block.type}
          type="button"
          draggable
          onDragStart={(event) =>
            event.dataTransfer.setData(paletteTransferKey, block.type)
          }
          onClick={() => onAddBlock(block.type)}
          className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-right transition hover:border-slate-300 hover:bg-white"
        >
          <p className="font-semibold text-slate-900">
            {translateBlockLabel(block.label)}
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            {translateBlockDescription(block.type)}
          </p>
        </button>
      ))}
    </div>
  );
}
