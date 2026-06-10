import Link from "next/link";

import type { PageNavigationItem } from "@/features/docs-preview/model/getPageNavigation";
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
  "group flex min-h-[64px] w-full items-center justify-between rounded-2xl border px-4 py-3 text-right transition-all duration-200";

const enabledButtonClass =
  "border-slate-200 bg-white shadow-sm hover:border-slate-300 hover:bg-slate-50 hover:shadow-md";

const disabledButtonClass =
  "cursor-not-allowed border-slate-200 bg-slate-50 text-slate-400";

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
      <div className="min-w-0">
        <p className="mb-1 text-[11px] font-medium text-slate-500">{label}</p>

        <p
          className={`truncate text-sm font-medium ${
            page ? "text-slate-900" : "text-slate-400"
          }`}
        >
          {page?.title ?? "غیرفعال"}
        </p>
      </div>

      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all ${
          page ? "bg-slate-100 group-hover:bg-slate-200" : "bg-slate-100"
        }`}
      >
        <ArrowIcon className={`${arrowRotation} h-4 w-4`} />
      </div>
    </>
  );

  const buttonClasses = `${baseButtonClass} ${
    page ? enabledButtonClass : disabledButtonClass
  }`;

  if (!page) {
    return (
      <div aria-disabled="true" className={buttonClasses}>
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
      aria-label="ناوبری بین صفحات"
      className="mt-6 border-t border-slate-200 pt-4"
    >
      <div className="flex gap-3 sm:gap-4">
        <div className="flex-1">
          <NavigationButton
            label="صفحه قبل"
            page={previousPage}
            direction="previous"
            interactive={interactive}
            onSelectPage={onSelectPage}
          />
        </div>

        <div className="flex-1">
          <NavigationButton
            label="صفحه بعد"
            page={nextPage}
            direction="next"
            interactive={interactive}
            onSelectPage={onSelectPage}
          />
        </div>
      </div>
    </nav>
  );
}
