"use client";

import type { ParsedEndpoint } from "../model/index";

import { IndeterminateCheckbox } from "../shared/IndeterminateCheckbox";
import { MethodBadge } from "../shared/MethodBadge";

type Props = {
  endpoint: ParsedEndpoint;

  onToggle: () => void;
};

export function EndpointItem({ endpoint, onToggle }: Props) {
  return (
    <label className="flex items-center gap-3 px-8 py-2 hover:bg-slate-100">
      <IndeterminateCheckbox
        checked={endpoint.selected}
        indeterminate={false}
        onChange={onToggle}
        size="sm"
      />ّ

      <MethodBadge method={endpoint.method} />

      <span className="flex-1 font-mono text-xs">{endpoint.path}</span>

      {endpoint.summary && (
        <span className="text-xs text-slate-400">{endpoint.summary}</span>
      )}
    </label>
  );
}
