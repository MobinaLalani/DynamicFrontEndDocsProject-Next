import {
  fetchOpenApiAction,
  importDocsAction,
} from "@/app/actions/swagger-import";

import type { OpenApiSpec, ControllerGroup, ParsedController } from "../model";

export async function fetchSwaggerSpec(url: string) {
  return await fetchOpenApiAction(url);
}

export async function saveSwaggerImport(
  spec: OpenApiSpec,
  controllers: ParsedController[],
  groups: ControllerGroup[],
) {
  return await importDocsAction(groups, controllers);
}
