import Link from "next/link";

import type { PageNavigationItem } from "@/features/docs-preview/model/getPageNavigation";
import { ArrowBigDown } from "lucide-react";
import { ArrowIcon } from "@/components/ui/icons/ArrowIcon";

type PageNavigationProps = {
  previousPage: PageNavigationItem | null;
  nextPage: PageNavigationItem | null;
  interactive?: boolean;
  onSelectPage?: (slug: string) => void;
};

type NavigationButtonProps = {
  label: string;
  page: PageNavigationItem | null;
  direction: "previous" | "next";
  interactive?: boolean;
  onSelectPage?: (slug: string) => void;
};

const baseButtonClass =
  "flex min-h-12  items-center justify-between rounded-2xl border px-3 py-2 text-right transition";

const enabledButtonClass =
  "border-slate-200 bg-white text-slate-950 shadow-sm hover:border-slate-300 hover:bg-slate-50";

const disabledButtonClass =
  "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400";
function NavigationButton({
  label,
  page,
  direction,
  interactive = false,
  onSelectPage,
}: NavigationButtonProps) {
  const arrowRotation = direction === "previous" ? "-rotate-90" : "rotate-90";

  const content = (
    <>
      <div className="space-y-1">
        <p className="text-[10px] font-medium text-slate-500">{label}</p>
        <p className="text-sm font-semibold leading-5">
          {page ? page.title : "غیرفعال"}
        </p>
      </div>
      <span aria-hidden="true" className={`text-base font-semibold`}>
        <ArrowIcon className={`${arrowRotation} inline-block`} />
      </span>
    </>
  );

  const buttonClasses = `${baseButtonClass} ${page ? enabledButtonClass : disabledButtonClass}`;

  if (!page) {
    return (
      <div aria-disabled="true" className={`${buttonClasses}`}>
        {content}
      </div>
    );
  }

  if (interactive) {
    return (
      <button
        type="button"
        onClick={() => onSelectPage?.(page.slug)}
        className={buttonClasses}
      >
        {content}
      </button>
    );
  }

  return (
    <Link href={`/pages/${page.slug}`} className={buttonClasses}>
      {content}
    </Link>
  );
}

export function PageNavigation({
  previousPage,
  nextPage,
  interactive = false,
  onSelectPage,
}: PageNavigationProps) {
  return (
    <nav
      aria-label="ناوبری بین صفحات زیرمنو"
      className="flex justify-between border-t border-slate-200 pt-4"
    >
      <div className="w-1/2 max-w-xs">
        <NavigationButton
          label="صفحه قبل"
          page={previousPage}
          direction="previous"
          interactive={interactive}
          onSelectPage={onSelectPage}
        />
      </div>
      <div className="w-1/2 max-w-xs text-right">
        <NavigationButton
          label="صفحه بعد"
          page={nextPage}
          direction="next"
          interactive={interactive}
          onSelectPage={onSelectPage}
        />
      </div>
    </nav>
  );
}
