"use client";

import { createContext, useContext, useEffect, useState } from "react";

type SidebarContextType = {
  isOpen: boolean;
  toggle: () => void;
  setOpen: (value: boolean) => void;
};

const SidebarContext = createContext<SidebarContextType | null>(null);

const STORAGE_KEY = "sidebar-open";

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    setIsOpen(stored === null ? true : stored === "true");
  }, []);

  const toggle = () =>
    setIsOpen((prev) => {
      const next = !prev;
      localStorage.setItem(STORAGE_KEY, String(next));
      return next;
    });

  const setOpen = (value: boolean) => {
    localStorage.setItem(STORAGE_KEY, String(value));
    setIsOpen(value);
  };

  return (
    <SidebarContext.Provider value={{ isOpen, toggle, setOpen }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error("useSidebar must be used inside SidebarProvider");
  return ctx;
}