import type { ReactNode } from "react";

type SidebarProps = {
  children: ReactNode;
  isOpen: boolean;
  className?: string;
  expandedWidthClassName?: string;
  collapsedWidthClassName?: string;
};

export function Sidebar({
  children,
  isOpen,
  className,
  expandedWidthClassName = "w-full sm:w-[320px]",
  collapsedWidthClassName = "w-[72px]",
}: SidebarProps) {
  return (
    <aside
      dir="rtl"
      className={`fixed inset-y-0 right-0 z-40 flex flex-col transition-all rounded-l-4xl duration-300 ${
        isOpen ? expandedWidthClassName : collapsedWidthClassName
      } ${className ?? ""}`}
    >
      {children}
    </aside>
  );
}
