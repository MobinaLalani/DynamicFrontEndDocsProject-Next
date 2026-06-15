import type { ReactNode } from "react";
import { useSidebar } from '../../context/SidebarContext';


type SidebarProps = {
  children: ReactNode;
  className?: string;
  expandedWidthClassName?: string;
  collapsedWidthClassName?: string;
};

export function Sidebar({
  children,
  className,
  expandedWidthClassName = "w-full sm:w-[320px]",
  collapsedWidthClassName = "w-[72px]",
}: SidebarProps) {
  const { isOpen, toggle } = useSidebar();

  return (
    <aside
      dir="rtl"
      className={`fixed inset-y-0 right-0 z-40 flex flex-col transition-all rounded-l-4xl duration-300 ${
        isOpen ? expandedWidthClassName : collapsedWidthClassName
      } ${className ?? ""}`}
    >
      {/* toggle button inside sidebar */}
      <button
        onClick={toggle}
        className="absolute left-2 top-2 rounded bg-white/10 px-2 py-1 text-xs text-white"
      >
        toggle
      </button>

      {children}
    </aside>
  );
}
