import Footer from "@/components/layout/Footer";
import type { DocPage } from "@/lib/docs/schema";
import type { DocsWorkspace } from "@/lib/docs/workspace";

type AdminDocsFooterProps = {
  workspace: DocsWorkspace;
  activePage: DocPage;
};

export function AdminDocsFooter({
  workspace,
  activePage,
}: AdminDocsFooterProps) {
  return (
    <Footer className="rounded-[2rem] border border-slate-200 bg-white shadow-sm">
      <div className="grid gap-4 px-6 py-5 text-right sm:grid-cols-3 sm:px-8">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-sky-600">
            Active Page
          </p>
          <p className="mt-2 text-lg font-semibold text-slate-950">
            {activePage.title || "بدون عنوان"}
          </p>
          <p className="mt-1 text-sm text-slate-500">
            /pages/{activePage.slug || "-"}
          </p>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-sky-600">
            Pages
          </p>
          <p className="mt-2 text-lg font-semibold text-slate-950">
            {workspace.pages.length}
          </p>
          <p className="mt-1 text-sm text-slate-500">تعداد کل صفحه‌های ثبت‌شده</p>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-sky-600">
            Menu Groups
          </p>
          <p className="mt-2 text-lg font-semibold text-slate-950">
            {workspace.menuGroups.length}
          </p>
          <p className="mt-1 text-sm text-slate-500">تعداد کل منوها و زیرمنوها</p>
        </div>
      </div>
    </Footer>
  );
}
