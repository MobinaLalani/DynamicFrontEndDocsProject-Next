import type { ReactNode } from "react";
import { useSidebar } from "../../context/SidebarContext";
import { ArrowIcon } from "@/components/ui/icons/ArrowIcon";

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
      {/* toggle button (moved from AdminDocsSidebar) */}
      <div
        className={`flex items-center justify-end p-4 ${
          isOpen ? "flex-row" : "flex-col gap-2"
        }`}
      >
        <button
          type="button"
          onClick={toggle}
          aria-label={isOpen ? "بستن سایدبار" : "باز کردن سایدبار"}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-900 transition hover:bg-slate-100"
        >
          <ArrowIcon
            strokeColor="#0f172a"
            className={`h-4 w-4 transition-transform duration-300 ${
              isOpen ? "rotate-270" : "rotate-90"
            }`}
          />
        </button>
      </div>

      {children}
    </aside>
  );
}
