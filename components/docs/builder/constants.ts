import type { PageComponent, PageComponentType } from "@/lib/docs/schema";

export const paletteTransferKey = "application/x-docs-palette";
export const componentTransferKey = "application/x-docs-component-id";

export function getBlockLabel(component: PageComponent) {
  if (component.type === "heading") {
    return component.text;
  }

  if (component.type === "paragraph") {
    return component.text.slice(0, 40) || "پاراگراف";
  }

  if (component.type === "endpoint") {
    return `${component.method} ${component.path}`;
  }

  if (component.type === "field-group") {
    return component.title;
  }

  if (component.type === "table") {
    return component.title ?? "جدول";
  }

  return component.title ?? "کد نمونه";
}

export function getBlockMeta(component: PageComponent) {
  if (component.type === "heading") {
    return `هدینگ سطح ${component.level ?? 1}`;
  }

  if (component.type === "paragraph") {
    return "متن توضیحی";
  }

  if (component.type === "endpoint") {
    return component.title;
  }

  if (component.type === "field-group") {
    return `${component.fields.length} فیلد`;
  }

  if (component.type === "table") {
    return `${component.columns.length} ستون`;
  }

  return component.language;
}

export function translateBlockLabel(label: string) {
  const labels: Record<string, string> = {
    Heading: "هدینگ",
    Paragraph: "پاراگراف",
    Endpoint: "اندپوینت",
    "Field Group": "گروه فیلد",
    Table: "جدول",
    "Code Example": "کد نمونه",
  };

  return labels[label] ?? label;
}

export function translateBlockDescription(type: PageComponentType) {
  const descriptions: Record<PageComponentType, string> = {
    heading: "برای عنوان بخش ها و تیترهای اصلی",
    paragraph: "برای متن توضیحی، راهنما و نکات",
    endpoint: "برای نمایش method، path و اطلاعات endpoint",
    "field-group": "برای query، headers، body و response fields",
    table: "برای status code ها و جدول داده ها",
    code: "برای نمونه request و response",
  };

  return descriptions[type];
}
