import type { OpenApiSpec, ParsedController, ParsedEndpoint } from "./model";

const HTTP_METHODS = ["get", "post", "put", "patch", "delete"] as const;

export function parseControllers(spec: OpenApiSpec): ParsedController[] {
  const tagMap = new Map<
    string,
    { description?: string; endpoints: ParsedEndpoint[] }
  >();

  spec.tags?.forEach((tag) => {
    tagMap.set(tag.name, { description: tag.description, endpoints: [] });
  });

  Object.entries(spec.paths ?? {}).forEach(([path, pathItem]) => {
    HTTP_METHODS.forEach((method) => {
      const op = pathItem[method];
      if (!op) return;
      (op.tags?.length ? op.tags : ["default"]).forEach((tag: string) => {
        if (!tagMap.has(tag)) {
          tagMap.set(tag, { endpoints: [] });
        }
        tagMap.get(tag)!.endpoints.push({
          method,
          path,
          summary: op.summary,
          selected: true,
        });
      });
    });
  });

  return Array.from(tagMap.entries())
    .filter(([, data]) => data.endpoints.length > 0)
    .map(([tag, data]) => ({
      tag,
      customName: tag,
      description: data.description,
      endpointCount: data.endpoints.length,
      selected: true,
      endpoints: data.endpoints,
    }));
}
