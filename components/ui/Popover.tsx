"use client";

import {
  type CSSProperties,
  type MouseEvent as ReactMouseEvent,
  ReactNode,
  type ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
  cloneElement,
  isValidElement,
} from "react";
import { createPortal } from "react-dom";
import { useClickOutside } from "../hooks/useClickOutside";
type Position = "bottom-left" | "bottom-right" | "top-left" | "top-right";

type PopoverProps = {
  trigger: ReactNode;
  children: ReactNode;
  position?: Position;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

type TriggerProps = {
  onClick?: (event: ReactMouseEvent<HTMLElement>) => void;
  "aria-expanded"?: boolean;
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

  const setOpen = useCallback(
    (value: boolean) => {
      if (isControlled) onOpenChange?.(value);
      else setInternalOpen(value);
    },
    [isControlled, onOpenChange],
  );

  const triggerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentStyle, setContentStyle] = useState<CSSProperties>();

  useClickOutside([triggerRef, contentRef], () => setOpen(false));

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [setOpen]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const updatePosition = () => {
      const triggerElement = triggerRef.current;
      const contentElement = contentRef.current;

      if (!triggerElement || !contentElement) {
        return;
      }

      const triggerRect = triggerElement.getBoundingClientRect();
      const contentRect = contentElement.getBoundingClientRect();
      const gap = 8;

      let top = triggerRect.bottom + gap;
      if (position.startsWith("top")) {
        top = triggerRect.top - contentRect.height - gap;
      }

      let left = triggerRect.left;
      if (position.endsWith("right")) {
        left = triggerRect.right - contentRect.width;
      }

      const maxLeft = window.innerWidth - contentRect.width - 8;
      const maxTop = window.innerHeight - contentRect.height - 8;

      setContentStyle({
        position: "fixed",
        top: Math.max(8, Math.min(top, maxTop)),
        left: Math.max(8, Math.min(left, maxLeft)),
      });
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [open, position]);

  const triggerElement = isValidElement<TriggerProps>(trigger)
    ? (trigger as ReactElement<TriggerProps>)
    : null;

  const triggerEl = triggerElement ? (
    cloneElement(triggerElement, {
      onClick: (event: ReactMouseEvent<HTMLElement>) => {
        triggerElement.props.onClick?.(event);
        setOpen(!open);
      },
      "aria-expanded": open,
    })
  ) : (
    <button type="button" onClick={() => setOpen(!open)}>
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
            style={contentStyle}
            className="z-50 min-w-[260px]"
          >
            <div className="rounded-2xl border border-slate-200 bg-white shadow-xl">
              {children}
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
