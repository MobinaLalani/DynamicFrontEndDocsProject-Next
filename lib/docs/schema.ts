export type PageComponentType =
  | "heading"
  | "paragraph"
  | "endpoint"
  | "field-group"
  | "table"
  | "code"
  

export type HeadingLevel = 1 | 2 | 3;
export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
export type ApiFieldKind = "headers" | "query" | "path" | "body" | "response";
export type CodeLanguage = "json" | "bash" | "javascript" | "typescript";

export type BaseComponent = {
  id: string;
  type: PageComponentType;
};

export type HeadingComponent = BaseComponent & {
  type: "heading";
  text: string;
  level?: HeadingLevel;
};

export type ParagraphComponent = BaseComponent & {
  type: "paragraph";
  text: string;
};

export type EndpointComponent = BaseComponent & {
  type: "endpoint";
  title: string;
  method: HttpMethod;
  path: string;
  summary: string;
  auth?: string;
  requestContentType?: string;
  responseContentType?: string;
};

export type ApiField = {
  id: string;
  name: string;
  type: string;
  required: boolean;
  description: string;
};

export type FieldGroupComponent = BaseComponent & {
  type: "field-group";
  title: string;
  kind: ApiFieldKind;
  fields: ApiField[];
};

export type TableColumn = {
  title: string;
  field: string;
};

export type TableRow = Record<string, string | number | null>;

export type TableComponent = BaseComponent & {
  type: "table";
  title?: string;
  columns: TableColumn[];
  rows?: TableRow[];
  emptyMessage?: string;
};

export type CodeComponent = BaseComponent & {
  type: "code";
  title?: string;
  language: CodeLanguage;
  code: string;
};

export type PageComponent =
  | HeadingComponent
  | ParagraphComponent
  | EndpointComponent
  | FieldGroupComponent
  | TableComponent
  | CodeComponent;

export type DocPage = {
  id: number;
  slug: string;
  title: string;
  description?: string;
  menuGroupId: string;
  menuTitle: string;
  components: PageComponent[];
};

export const createDefaultPage = (): DocPage => ({
  id: 1,
  slug: "users",
  title: "مستندات کاربران",
  description: "این صفحه به صورت داینامیک از روی JSON ساخته می شود.",
  menuGroupId: "core-apis",
  menuTitle: "کاربران",
  components: [
    {
      id: "heading-users-list",
      type: "heading",
      text: "API کاربران",
      level: 1,
    },
    {
      id: "paragraph-users-description",
      type: "paragraph",
      text: "این صفحه نشان می دهد که چگونه یک قرارداد JSON تمیز می تواند بخش های مختلف داکیومنت API را توصیف و به صورت داینامیک رندر کند.",
    },
    {
      id: "endpoint-users-list",
      type: "endpoint",
      title: "دریافت لیست کاربران",
      method: "GET",
      path: "/api/users",
      summary: "لیست صفحه بندی شده کاربران را برمی گرداند.",
      auth: "Bearer Token",
      requestContentType: "application/json",
      responseContentType: "application/json",
    },
    {
      id: "field-group-users-query",
      type: "field-group",
      title: "پارامترهای Query",
      kind: "query",
      fields: [
        {
          id: "field-page",
          name: "page",
          type: "number",
          required: false,
          description: "شماره صفحه فعلی.",
        },
        {
          id: "field-limit",
          name: "limit",
          type: "number",
          required: false,
          description: "حداکثر تعداد آیتم در هر صفحه.",
        },
      ],
    },
    {
      id: "table-users",
      type: "table",
      title: "نمونه خروجی",
      columns: [
        { title: "Id", field: "id" },
        { title: "نام", field: "name" },
      ],
      rows: [
        { id: 1, name: "علی" },
        { id: 2, name: "مریم" },
      ],
      emptyMessage: "هنوز داده ای تنظیم نشده است.",
    },
    {
      id: "code-users-response",
      type: "code",
      title: "نمونه پاسخ",
      language: "json",
      code: '{\n  "data": [\n    {\n      "id": 1,\n      "name": "علی"\n    }\n  ]\n}',
    },
  ],
});
