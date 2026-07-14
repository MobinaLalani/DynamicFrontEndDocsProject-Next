"use client";

import type { ParsedController } from "../../model";

import { ControllerItem } from "./ControllerItem";

type ControllerListProps = {
  controllers: ParsedController[];

  expanded: Set<string>;

  search: string;

  onToggleExpand: (tag: string) => void;

  onToggleController: (tag: string) => void;

  onToggleEndpoint: (tag: string, index: number) => void;

  onSelectAllEndpoints: (tag: string, checked: boolean) => void;

  onUpdateName: (tag: string, value: string) => void;
};

export function ControllerList({
  controllers,
  expanded,
  search,
  onToggleExpand,
  onToggleController,
  onToggleEndpoint,
  onSelectAllEndpoints,
  onUpdateName,
}: ControllerListProps) {
  if (controllers.length === 0) {
    return (
      <div className="py-10 text-center text-slate-400">نتیجه‌ای یافت نشد.</div>
    );
  }

  return (
    <div className="divide-y divide-slate-100">
      {controllers.map((controller) => (
        <ControllerItem
          key={controller.tag}
          controller={controller}
          expanded={expanded.has(controller.tag)}
          onToggleExpand={() => onToggleExpand(controller.tag)}
          onToggleController={() => onToggleController(controller.tag)}
          onToggleEndpoint={onToggleEndpoint}
          onSelectAllEndpoints={onSelectAllEndpoints}
          onUpdateName={onUpdateName}
        />
      ))}
    </div>
  );
}
