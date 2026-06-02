import type { TableComponent, TableRow } from "@/lib/docs/schema";

function normalizeFieldKey(input: string, fallback: string) {
  const normalized = input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s_-]/g, "")
    .replace(/\s+/g, "_");

  return normalized || fallback;
}

function ensureUniqueFieldKey(
  component: TableComponent,
  requestedField: string,
  currentField?: string,
) {
  const takenFields = component.columns
    .filter((column) => column.field !== currentField)
    .map((column) => column.field);

  if (!takenFields.includes(requestedField)) {
    return requestedField;
  }

  let index = 2;
  let nextField = `${requestedField}_${index}`;

  while (takenFields.includes(nextField)) {
    index += 1;
    nextField = `${requestedField}_${index}`;
  }

  return nextField;
}

export function createEmptyTableRow(component: TableComponent): TableRow {
  return component.columns.reduce<TableRow>((result, column) => {
    result[column.field] = "";
    return result;
  }, {});
}

export function addTableColumn(component: TableComponent): TableComponent {
  const nextColumnIndex = component.columns.length + 1;
  const field = ensureUniqueFieldKey(component, `field${nextColumnIndex}`);

  return {
    ...component,
    columns: [
      ...component.columns,
      {
        title: `ستون ${nextColumnIndex}`,
        field,
      },
    ],
    rows: (component.rows ?? []).map((row) => ({ ...row, [field]: "" })),
  };
}

export function updateTableColumnTitle(
  component: TableComponent,
  field: string,
  title: string,
): TableComponent {
  return {
    ...component,
    columns: component.columns.map((column) =>
      column.field === field ? { ...column, title } : column,
    ),
  };
}

export function updateTableColumnField(
  component: TableComponent,
  previousField: string,
  nextFieldRaw: string,
): TableComponent {
  const nextField = ensureUniqueFieldKey(
    component,
    normalizeFieldKey(nextFieldRaw, previousField),
    previousField,
  );

  if (nextField === previousField) {
    return component;
  }

  return {
    ...component,
    columns: component.columns.map((column) =>
      column.field === previousField ? { ...column, field: nextField } : column,
    ),
    rows: (component.rows ?? []).map((row) => {
      const { [previousField]: previousValue, ...rest } = row;
      return {
        ...rest,
        [nextField]: previousValue ?? "",
      };
    }),
  };
}

export function removeTableColumn(
  component: TableComponent,
  field: string,
): TableComponent {
  return {
    ...component,
    columns: component.columns.filter((column) => column.field !== field),
    rows: (component.rows ?? []).map((row) => {
      const nextRow = { ...row };
      delete nextRow[field];
      return nextRow;
    }),
  };
}

export function addTableRow(component: TableComponent): TableComponent {
  return {
    ...component,
    rows: [...(component.rows ?? []), createEmptyTableRow(component)],
  };
}

export function updateTableCell(
  component: TableComponent,
  rowIndex: number,
  field: string,
  value: string,
): TableComponent {
  return {
    ...component,
    rows: (component.rows ?? []).map((row, index) =>
      index === rowIndex ? { ...row, [field]: value } : row,
    ),
  };
}

export function removeTableRow(
  component: TableComponent,
  rowIndex: number,
): TableComponent {
  return {
    ...component,
    rows: (component.rows ?? []).filter((_, index) => index !== rowIndex),
  };
}
