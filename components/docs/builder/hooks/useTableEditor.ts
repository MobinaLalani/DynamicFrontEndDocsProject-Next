"use client";

import { useCallback } from "react";

import type { TableComponent } from "@/lib/docs/schema";
import {
  addTableColumn,
  addTableRow,
  removeTableColumn,
  removeTableRow,
  updateTableCell,
  updateTableColumnField,
  updateTableColumnTitle,
} from "@/components/docs/builder/utils/tableUtils";

type UseTableEditorOptions = {
  onChange: (updater: (component: TableComponent) => TableComponent) => void;
};

export function useTableEditor({ onChange }: UseTableEditorOptions) {
  const setTitle = useCallback(
    (title: string) => {
      onChange((component) => ({ ...component, title }));
    },
    [onChange],
  );

  const setEmptyMessage = useCallback(
    (emptyMessage: string) => {
      onChange((component) => ({ ...component, emptyMessage }));
    },
    [onChange],
  );

  const addColumn = useCallback(() => {
    onChange((component) => addTableColumn(component));
  }, [onChange]);

  const updateColumnTitle = useCallback(
    (field: string, title: string) => {
      onChange((component) => updateTableColumnTitle(component, field, title));
    },
    [onChange],
  );

  const updateColumnField = useCallback(
    (previousField: string, nextField: string) => {
      onChange((component) =>
        updateTableColumnField(component, previousField, nextField),
      );
    },
    [onChange],
  );

  const deleteColumn = useCallback(
    (field: string) => {
      onChange((component) => removeTableColumn(component, field));
    },
    [onChange],
  );

  const addRow = useCallback(() => {
    onChange((component) => addTableRow(component));
  }, [onChange]);

  const updateCell = useCallback(
    (rowIndex: number, field: string, value: string) => {
      onChange((component) => updateTableCell(component, rowIndex, field, value));
    },
    [onChange],
  );

  const deleteRow = useCallback(
    (rowIndex: number) => {
      onChange((component) => removeTableRow(component, rowIndex));
    },
    [onChange],
  );

  return {
    setTitle,
    setEmptyMessage,
    addColumn,
    updateColumnTitle,
    updateColumnField,
    deleteColumn,
    addRow,
    updateCell,
    deleteRow,
  };
}
