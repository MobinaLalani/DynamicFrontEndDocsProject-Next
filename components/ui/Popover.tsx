"use client";

import {
  type MouseEvent as ReactMouseEvent,
  ReactNode,
  type ReactElement,
  useCallback,
  useEffect,
  useLayoutEffect,
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
      if (isControlled) {
        onOpenChange?.(value);
      } else {
        setInternalOpen(value);
      }
    },
    [isControlled, onOpenChange],
  );

  const triggerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useClickOutside([triggerRef, contentRef], () => setOpen(false));

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [setOpen]);

  useLayoutEffect(() => {
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
      const viewportPadding = 16;

      let top = position.startsWith("top")
        ? triggerRect.top - contentRect.height - gap
        : triggerRect.bottom + gap;

      let left = position.endsWith("right")
        ? triggerRect.right - contentRect.width
        : triggerRect.left;

      const maxLeft = window.innerWidth - contentRect.width - viewportPadding;

      const maxTop = window.innerHeight - contentRect.height - viewportPadding;

      left = Math.max(viewportPadding, Math.min(left, maxLeft));

      top = Math.max(viewportPadding, Math.min(top, maxTop));

      contentElement.style.position = "fixed";
      contentElement.style.top = `${top}px`;
      contentElement.style.left = `${left}px`;
      contentElement.style.visibility = "visible";
    };

    updatePosition();
    const animationFrameId = window.requestAnimationFrame(updatePosition);

    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined" && contentRef.current) {
      resizeObserver = new ResizeObserver(() => updatePosition());
      resizeObserver.observe(contentRef.current);
    }

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
      resizeObserver?.disconnect();
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
    <div ref={triggerRef} className="relative inline-block">
      {triggerEl}

      {open &&
        createPortal(
          <div
            ref={contentRef}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              
              visibility: "hidden",
            }}
            className="z-50 min-w-[260px] "
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
