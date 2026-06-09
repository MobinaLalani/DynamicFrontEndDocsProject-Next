import Link from "next/link";

import Footer from "@/components/layout/Footer";
import type { FooterLinkItem } from "@/features/docs-preview/model/getFooterSections";

type DocsSitePreviewFooterProps = {
  serviceLinks: FooterLinkItem[];
  webServiceLinks: FooterLinkItem[];
};

type FooterColumnProps = {
  title: string;
  description: string;
  links: FooterLinkItem[];
};

function FooterColumn({ title, description, links }: FooterColumnProps) {
  return (
    <section className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="text-sm leading-6 text-slate-400">{description}</p>
      </div>

      {links.length > 0 ? (
        <div className="space-y-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block rounded-2xl border border-white/10 bg-white/5 px-4 py-3 transition hover:border-white/20 hover:bg-white/10"
            >
              <p className="text-sm font-medium text-white">{link.label}</p>
              {link.description ? (
                <p className="mt-1 text-xs leading-5 text-slate-400">
                  {link.description}
                </p>
              ) : null}
            </Link>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-white/10 bg-white/5 px-4 py-5 text-sm text-slate-400">
          هنوز موردی برای این بخش تعریف نشده است.
        </div>
      )}
    </section>
  );
}

export function DocsSitePreviewFooter({
  serviceLinks,
  webServiceLinks,
}: DocsSitePreviewFooterProps) {
  return (
    <Footer className="rounded-[2rem] bg-slate-950 shadow-2xl">
      <div className="grid gap-8 px-6 py-8 text-right sm:px-8 xl:grid-cols-[1.2fr_1fr_1fr]">
        <section className="space-y-4">
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-sky-400">
            Quick Access
          </p>
          <h2 className="text-2xl font-semibold text-white">
            دسترسی سریع به سرویس‌ها و وب‌سرویس‌ها
          </h2>
          <p className="max-w-2xl text-sm leading-7 text-slate-400">
            از این بخش می‌توانی سریع‌تر بین سرویس‌ها، زیرمنوها و وب‌سرویس‌های
            مستندسازی‌شده جابه‌جا شوی و بدون برگشت به سایدبار به بخش موردنظرت
            برسی.
          </p>
        </section>

        <FooterColumn
          title="سرویس‌ها"
          description="دسترسی مستقیم به گروه‌های اصلی مستندات"
          links={serviceLinks}
        />
        <FooterColumn
          title="وب سرویس‌ها"
          description="لینک‌های سریع به صفحات API و مستندات endpointها"
          links={webServiceLinks}
        />
      </div>
    </Footer>
  );
}
