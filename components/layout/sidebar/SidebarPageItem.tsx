import Link from "next/link";

type SidebarPageItemProps = {
  title: string;
  subtitle?: string;
  initial: string;
  isActive: boolean;
  isExpanded: boolean;
  href?: string;
  onClick?: () => void;
};

export function SidebarPageItem({
  title,
  subtitle,
  initial,
  isActive,
  isExpanded,
  href,
  onClick,
}: SidebarPageItemProps) {
  const className = isExpanded
    ? `w-full min-w-0 overflow-hidden rounded-2xl px-4 py-3 text-right text-sm transition ${
        isActive
          ? "bg-white text-slate-950 shadow-sm"
          : "bg-white/5 text-white hover:bg-white/10"
      }`
    : `flex h-11 w-11 mx-auto items-center justify-center overflow-hidden rounded-2xl text-sm transition ${
        isActive
          ? "bg-white text-slate-950 shadow-sm"
          : "bg-white/5 text-white hover:bg-white/10"
      }`;

  const content = isExpanded ? (
    <div className="min-w-0 overflow-hidden">
      <span
        className={`block truncate font-medium ${
          isActive ? "text-slate-950" : "text-white"
        }`}
      >
        {title}
      </span>
      {subtitle && (
        <span
          className={`mt-1 block truncate text-xs ${
            isActive ? "text-slate-600" : "text-slate-300"
          }`}
        >
          {subtitle}
        </span>
      )}
    </div>
  ) : (
    <span className="font-medium">{initial}</span>
  );

  if (href) {
    return (
      <Link href={href} className={className}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={className}>
      {content}
    </button>
  );
}
