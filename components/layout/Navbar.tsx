import type { ReactNode } from "react";

type NavbarProps = {
  leftSlot?: ReactNode;
  rightSlot?: ReactNode;
  className?: string;
  innerClassName?: string;
};

export function Navbar({
  leftSlot,
  rightSlot,
  className,
  innerClassName,
}: NavbarProps) {
  return (
    <header className={className ?? ""}>
      <div
        dir="ltr"
        className={`flex items-center justify-between gap-4 ${innerClassName ?? ""}`}
      >
        <div className="flex min-w-[40px] justify-start">{leftSlot}</div>
        <div dir="rtl" className="min-w-0 flex-1 text-right">
          {rightSlot}
        </div>
      </div>
    </header>
  );
}
