"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

import type { PageComponentType } from "@/lib/docs/schema";
import { paletteBlocks } from "@/lib/docs/builder";

const STORAGE_KEY = "docs-block-registry";

const allTypes = paletteBlocks.map((b) => b.type) as PageComponentType[];

type BlockRegistryContextValue = {
  activeTypes: Set<PageComponentType>;
  isActive: (type: PageComponentType) => boolean;
  toggleType: (type: PageComponentType) => void;
  enableAll: () => void;
};

const BlockRegistryContext = createContext<BlockRegistryContextValue | null>(
  null,
);

export function BlockRegistryProvider({ children }: { children: ReactNode }) {
  const [activeTypes, setActiveTypes] = useState<Set<PageComponentType>>(
    () => new Set(allTypes),
  );

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as PageComponentType[];
        const valid = parsed.filter((t) =>
          (allTypes as string[]).includes(t),
        ) as PageComponentType[];
        setActiveTypes(new Set(valid));
      }
    } catch {
      // localStorage unavailable or corrupted — keep defaults
    }
  }, []);

  function persist(next: Set<PageComponentType>) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
    } catch {
      // ignore
    }
  }

  function toggleType(type: PageComponentType) {
    setActiveTypes((prev) => {
      const next = new Set(prev);
      if (next.has(type)) {
        if (next.size > 1) next.delete(type);
      } else {
        next.add(type);
      }
      persist(next);
      return next;
    });
  }

  function enableAll() {
    const next = new Set<PageComponentType>(allTypes);
    setActiveTypes(next);
    persist(next);
  }

  return (
    <BlockRegistryContext.Provider
      value={{ activeTypes, isActive: (t) => activeTypes.has(t), toggleType, enableAll }}
    >
      {children}
    </BlockRegistryContext.Provider>
  );
}

export function useBlockRegistry() {
  const ctx = useContext(BlockRegistryContext);
  if (!ctx) throw new Error("useBlockRegistry: missing BlockRegistryProvider");
  return ctx;
}
