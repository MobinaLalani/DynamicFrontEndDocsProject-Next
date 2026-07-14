"use client";

import { ChevronDown } from "lucide-react";

import type { ParsedController } from "../../model";

import { IndeterminateCheckbox } from "../shared/IndeterminateCheckbox";
import { EndpointList } from "./EndpointList";

type Props = {
  controller: ParsedController;

  expanded: boolean;

  onToggleExpand: () => void;

  onToggleController: () => void;

  onToggleEndpoint: (tag: string, index: number) => void;

  onSelectAllEndpoints: (tag: string, checked: boolean) => void;

  onUpdateName: (tag: string, value: string) => void;
};

export function ControllerItem({
  controller,
  expanded,
  onToggleExpand,
  onToggleController,
  onToggleEndpoint,
  onSelectAllEndpoints,
  onUpdateName,
}: Props) {
  const selectedEndpoints = controller.endpoints.filter(
    (item) => item.selected,
  ).length;

  const indeterminate = !controller.selected && selectedEndpoints > 0;

  return (
    <div>
      <div className="flex items-center gap-3 px-5 py-3">
        <IndeterminateCheckbox
          checked={controller.selected}
          indeterminate={indeterminate}
          onChange={onToggleController}
        />

        <input
          value={controller.customName}
          onChange={(e) => onUpdateName(controller.tag, e.target.value)}
          className="flex-1 bg-transparent outline-none"
        />

        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs">
          {selectedEndpoints}/{controller.endpointCount}
        </span>

        <button onClick={onToggleExpand}>
          <ChevronDown
            className={`transition ${expanded ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      {expanded && (
        <EndpointList
          controller={controller}
          onToggleEndpoint={onToggleEndpoint}
          onSelectAllEndpoints={onSelectAllEndpoints}
        />
      )}
    </div>
  );
}
