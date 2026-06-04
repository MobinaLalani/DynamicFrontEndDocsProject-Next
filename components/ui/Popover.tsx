"use client";

import {
  ReactNode,
  useEffect,
  useRef,
  useState,
  cloneElement,
  isValidElement,
} from "react";
import { createPortal } from "react-dom";
import { useClickOutside } from "../hooks/useClickOutside";
type Position =
  | "bottom-left"
  | "bottom-right"
  | "top-left"
  | "top-right";

type PopoverProps = {
  trigger: ReactNode;
  children: ReactNode;
  position?: Position;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export function Popover({
  trigger,
  children,
  position = "bottom-right",
  open: controlledOpen,
  onOpenChange,
}: PopoverProps) {
  const [internalOpen, setInternalOpen] = useState(false);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;

  const setOpen = (value: boolean) => {
    if (isControlled) onOpenChange?.(value);
    else setInternalOpen(value);
  };

  const triggerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useClickOutside(contentRef, () => setOpen(false));

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  const positions: Record<Position, string> = {
    "bottom-left": "top-full left-0 mt-2",
    "bottom-right": "top-full right-0 mt-2",
    "top-left": "bottom-full left-0 mb-2",
    "top-right": "bottom-full right-0 mb-2",
  };

  const triggerEl = isValidElement(trigger)
    ? cloneElement(trigger as any, {
        onClick: () => setOpen(!open),
      })
    : (
        <button onClick={() => setOpen(!open)}>
          {trigger}
        </button>
      );

  return (
    <div className="relative inline-block" ref={triggerRef}>
      {triggerEl}

      {open &&
        createPortal(
          <div
            ref={contentRef}
            className={`absolute z-50 min-w-[260px] ${positions[position]}`}
          >
            <div className="rounded-2xl border border-slate-200 bg-white shadow-xl">
              {children}
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}