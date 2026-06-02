import type { ApiField, FieldGroupComponent } from "@/lib/docs/schema";

export function createApiField(): ApiField {
  return {
    id: `field-${Math.random().toString(36).slice(2, 10)}`,
    name: "newField",
    type: "string",
    required: false,
    description: "توضیح این فیلد را وارد کنید.",
  };
}

export function addFieldToGroup(
  component: FieldGroupComponent,
): FieldGroupComponent {
  return {
    ...component,
    fields: [...component.fields, createApiField()],
  };
}

export function updateFieldInGroup(
  component: FieldGroupComponent,
  fieldId: string,
  updater: (field: ApiField) => ApiField,
): FieldGroupComponent {
  return {
    ...component,
    fields: component.fields.map((field) =>
      field.id === fieldId ? updater(field) : field,
    ),
  };
}

export function removeFieldFromGroup(
  component: FieldGroupComponent,
  fieldId: string,
): FieldGroupComponent {
  return {
    ...component,
    fields: component.fields.filter((field) => field.id !== fieldId),
  };
}
