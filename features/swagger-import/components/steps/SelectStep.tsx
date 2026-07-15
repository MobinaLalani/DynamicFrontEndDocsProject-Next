"use client";

import type { ControllerGroup, ParsedController } from "../model/index";

import { ControllerList } from "../controllers/ControllerList";
import { CreateGroupPanel } from "../groups/CreateGroupPanel";
import { GroupSection } from "../groups/GroupSection";
import { StatChip } from "../shared/StatChip";

type SelectStepProps = {
  controllers: ParsedController[];
  groups: ControllerGroup[];

  expandedControllers: Set<string>;
  expandedGroups: Set<string>;

  creatingGroup: boolean;

  newGroupName: string;
  newGroupTags: Set<string>;

  search: string;

  onSearchChange: (value: string) => void;

  // Controller
  onToggleController: (tag: string) => void;
  onToggleEndpoint: (tag: string, index: number) => void;
  onToggleExpand: (tag: string) => void;
  onUpdateControllerName: (tag: string, name: string) => void;

  // Create Group
  onStartCreateGroup: () => void;
  onCancelCreateGroup: () => void;
  onNewGroupNameChange: (value: string) => void;
  onToggleNewGroupTag: (tag: string) => void;
  onConfirmCreateGroup: () => void;

  // Groups
  onDeleteGroup: (id: string) => void;
  onRemoveFromGroup: (groupId: string, tag: string) => void;
  onUpdateGroupName: (id: string, name: string) => void;
  onToggleGroupExpand: (id: string) => void;

  onImport: () => void;
};
export function SelectStep({
  expandedGroups,
  expandedControllers,
  controllers,
  groups,
  creatingGroup,
  newGroupName,
  newGroupTags,
  search,
  onSearchChange,
  onToggleController,
  onToggleEndpoint,
  onToggleExpand,
  onUpdateControllerName,
  onNewGroupNameChange,
  onToggleNewGroupTag,
  onConfirmCreateGroup,
  onCancelCreateGroup,
  onDeleteGroup,
  onRemoveFromGroup,
  onUpdateGroupName,
  onToggleGroupExpand,
  onImport,
}: SelectStepProps) {
  return (
    <div className="space-y-5">
      <div className="flex gap-3">
        <StatChip label="Controller" value={controllers.length} />

        <StatChip label="Group" value={groups.length} />
      </div>

      {creatingGroup && (
        <CreateGroupPanel
          controllers={controllers}
          newGroupName={newGroupName}
          newGroupTags={newGroupTags}
          onNewGroupNameChange={onNewGroupNameChange}
          onToggleNewGroupTag={onToggleNewGroupTag}
          onConfirmCreateGroup={onConfirmCreateGroup}
          onCancelCreateGroup={onCancelCreateGroup}
        />
      )}

      <GroupSection
        groups={groups}
        controllers={controllers}
        expandedGroups={expandedGroups}
        onDeleteGroup={onDeleteGroup}
        onRemoveFromGroup={onRemoveFromGroup}
        onUpdateGroupName={onUpdateGroupName}
        onToggleGroupExpand={onToggleGroupExpand}
      />

      <ControllerList
        controllers={controllers}
        expandedControllers={expandedControllers}
        onToggleController={onToggleController}
        onToggleEndpoint={onToggleEndpoint}
        onToggleExpand={onToggleExpand}
        onSelectAllEndpoints={(tag, checked) => {
          // بعداً در hook اضافه می‌کنیم
          console.log(tag, checked);
        }}
        onUpdateControllerName={onUpdateControllerName}
      />
    </div>
  );
}
