"use client";

import type { ControllerGroup, ParsedController } from "../../model";

import { GroupItem } from "./GroupItem";

type GroupSectionProps = {
  groups: ControllerGroup[];

  controllers: ParsedController[];

  expandedGroups: Set<string>;

  onToggleGroupExpand: (id: string) => void;

  onDeleteGroup: (id: string) => void;

  onUpdateGroupName: (id: string, name: string) => void;

  onRemoveFromGroup: (groupId: string, tag: string) => void;
};

export function GroupSection({
  groups,
  controllers,
  expandedGroups,
  onToggleGroupExpand,
  onDeleteGroup,
  onUpdateGroupName,
  onRemoveFromGroup,
}: GroupSectionProps) {
  if (groups.length === 0) {
    return null;
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
      {groups.map((group) => {
        const groupControllers = controllers.filter((controller) =>
          group.tags.includes(controller.tag),
        );

        return (
          <GroupItem
            key={group.id}
            group={group}
            controllers={groupControllers}
            expanded={expandedGroups.has(group.id)}
            onToggle={() => onToggleGroupExpand(group.id)}
            onDelete={() => onDeleteGroup(group.id)}
            onRename={(name) => onUpdateGroupName(group.id, name)}
            onRemoveController={(tag) => onRemoveFromGroup(group.id, tag)}
          />
        );
      })}
    </div>
  );
}
