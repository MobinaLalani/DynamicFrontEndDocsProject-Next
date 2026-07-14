"use client";

import type { ControllerGroup } from "../model";

import { uid } from "../utils/uid";

type Props = {
  newGroupName: string;

  newGroupTags: Set<string>;

  setGroups: React.Dispatch<React.SetStateAction<ControllerGroup[]>>;

  setExpandedGroups: React.Dispatch<React.SetStateAction<Set<string>>>;

  setCreatingGroup: React.Dispatch<React.SetStateAction<boolean>>;

  setNewGroupName: React.Dispatch<React.SetStateAction<string>>;

  setNewGroupTags: React.Dispatch<React.SetStateAction<Set<string>>>;
};

export function useGroupActions({
  newGroupName,
  newGroupTags,
  setGroups,
  setExpandedGroups,
  setCreatingGroup,
  setNewGroupName,
  setNewGroupTags,
}: Props) {
  function toggleTag(tag: string) {
    setNewGroupTags((prev) => {
      const next = new Set(prev);

      next.has(tag) ? next.delete(tag) : next.add(tag);

      return next;
    });
  }

  function createGroup() {
    if (!newGroupName.trim()) return;

    if (newGroupTags.size < 2) return;

    setGroups((prev) => [
      ...prev,
      {
        id: uid(),

        name: newGroupName,

        tags: [...newGroupTags],
      },
    ]);

    setCreatingGroup(false);

    setNewGroupName("");

    setNewGroupTags(new Set());
  }

  function deleteGroup(id: string) {
    setGroups((prev) => prev.filter((g) => g.id !== id));
  }

  function renameGroup(id: string, value: string) {
    setGroups((prev) =>
      prev.map((group) =>
        group.id === id
          ? {
              ...group,
              name: value,
            }
          : group,
      ),
    );
  }

  function removeController(groupId: string, tag: string) {
    setGroups((prev) =>
      prev
        .map((group) =>
          group.id === groupId
            ? {
                ...group,
                tags: group.tags.filter((t) => t !== tag),
              }
            : group,
        )
        .filter((group) => group.tags.length > 0),
    );
  }

  function toggleExpand(id: string) {
    setExpandedGroups((prev) => {
      const next = new Set(prev);

      next.has(id) ? next.delete(id) : next.add(id);

      return next;
    });
  }

  return {
    toggleTag,

    createGroup,

    deleteGroup,

    renameGroup,

    removeController,

    toggleExpand,
  };
}
