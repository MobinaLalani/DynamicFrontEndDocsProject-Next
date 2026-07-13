"use client";

import { useState } from "react";

import type {
  SwaggerStep,
  ImportState,
  ParsedController,
  ControllerGroup,
  OpenApiSpec,
} from "../model";

import { fetchSwaggerSpec } from "../services/swaggerImport.service";

import { parseControllers } from "../lib/parseOpenApi";

import { uid } from "../utils/uid";

export function useSwaggerImport() {
  const [step, setStep] = useState<SwaggerStep>("url");

  const [state, setState] = useState<ImportState>("idle");

  const [url, setUrl] = useState("");

  const [error, setError] = useState<string | null>(null);

  const [spec, setSpec] = useState<OpenApiSpec | null>(null);

  const [controllers, setControllers] = useState<ParsedController[]>([]);

  const [groups, setGroups] = useState<ControllerGroup[]>([]);

async function fetchSwagger() {
  setState("loading");
  setError(null);

  const result = await fetchSwaggerSpec(url);

  if (!result.spec) {
    setError(result.error ?? "Swagger spec دریافت نشد");

    setState("error");

    return;
  }

  const parsed = parseControllers(result.spec!);

  setSpec(result.spec!);

  setControllers(parsed);

  setStep("select");

  setState("parsed");
}
  function toggleController(tag: string) {
    setControllers((prev) =>
      prev.map((c) => {
        if (c.tag !== tag) return c;

        const selected = !c.selected;

        return {
          ...c,

          selected,

          endpoints: c.endpoints.map((e) => ({
            ...e,
            selected,
          })),
        };
      }),
    );
  }

  function createGroup(name: string, tags: string[]) {
    setGroups((prev) => [
      ...prev,
      {
        id: uid(),
        name,
        tags,
      },
    ]);
  }

  return {
    step,
    setStep,

    state,

    url,
    setUrl,

    error,

    spec,

    controllers,

    groups,

    fetchSwagger,

    toggleController,

    createGroup,
  };
}
