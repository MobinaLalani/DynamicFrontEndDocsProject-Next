"use client";

import { ChevronDown, Layers, Trash2 } from "lucide-react";

import type { ControllerGroup, ParsedController } from "../model/index";

type Props = {
  group: ControllerGroup;

  controllers: ParsedController[];

  expanded: boolean;

  onToggle: () => void;

  onDelete: () => void;

  onRename: (value: string) => void;

  onRemoveController: (tag: string) => void;
};

export function GroupItem({
  group,
  controllers,
  expanded,
  onToggle,
  onDelete,
  onRename,
  onRemoveController,
}: Props) {
  return (
    <div className="border-b">
      <div className="flex items-center gap-3 p-4">
        <Layers className="h-5 w-5 text-sky-700" />

        <input
          value={group.name}
          onChange={(e) => onRename(e.target.value)}
          className="flex-1 bg-transparent font-semibold outline-none"
        />

        <button onClick={onDelete}>
          <Trash2 className="h-4 w-4 text-red-500" />
        </button>

        <button onClick={onToggle}>
          <ChevronDown
            className={`transition ${expanded ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      {expanded && (
        <div className="bg-slate-50">
          {controllers.map((controller) => (
            <div
              key={controller.tag}
              className="flex items-center justify-between px-10 py-3"
            >
              <span>{controller.customName}</span>

              <button
                onClick={() => onRemoveController(controller.tag)}
                className="text-xs text-red-500"
              >
                حذف
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
