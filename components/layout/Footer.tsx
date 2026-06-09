import type { ReactNode } from "react";

type FooterProps = {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
};

export default function Footer({
  children,
  className,
  contentClassName,
}: FooterProps) {
  return (
    <footer className={className ?? ""}>
      <div className={contentClassName ?? ""}>{children}</div>
    </footer>
  );
}
