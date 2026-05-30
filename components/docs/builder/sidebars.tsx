import { paletteBlocks } from "@/lib/docs/builder";
import type { PageComponent, PageComponentType } from "@/lib/docs/schema";
import type { MenuGroup, DocsWorkspace } from "@/lib/docs/workspace";

import {
  translateBlockDescription,
  translateBlockLabel,
  paletteTransferKey,
} from "@/components/docs/builder/constants";
import { InspectorPanel } from "@/components/docs/builder/inspector-panel";

type ToolsSidebarProps = {
  selectedComponent: PageComponent | null;
  onAddBlock: (type: PageComponentType) => void;
  onUpdateSelectedComponent: (updater: (component: PageComponent) => PageComponent) => void;
  onAddFieldToSelectedGroup: () => void;
  onAddColumnToSelectedTable: () => void;
  onAddRowToSelectedTable: () => void;
};

export function ToolsSidebar({
  selectedComponent,
  onAddBlock,
  onUpdateSelectedComponent,
  onAddFieldToSelectedGroup,
  onAddColumnToSelectedTable,
  onAddRowToSelectedTable,
}: ToolsSidebarProps) {
  return (
    <aside dir="rtl" className="space-y-6">
      <ToolsPanelContent
        selectedComponent={selectedComponent}
        onAddBlock={onAddBlock}
        onUpdateSelectedComponent={onUpdateSelectedComponent}
        onAddFieldToSelectedGroup={onAddFieldToSelectedGroup}
        onAddColumnToSelectedTable={onAddColumnToSelectedTable}
        onAddRowToSelectedTable={onAddRowToSelectedTable}
      />
    </aside>
  );
}

export function ToolsPanelContent({
  selectedComponent,
  onAddBlock,
  onUpdateSelectedComponent,
  onAddFieldToSelectedGroup,
  onAddColumnToSelectedTable,
  onAddRowToSelectedTable,
}: ToolsSidebarProps) {
  return (
    <>
      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="space-y-2">
          <p className="text-sm font-medium text-slate-500">ابزارهای صفحه</p>
          <h3 className="text-xl font-semibold text-slate-950">بلوک ها و ویرایشگر</h3>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="space-y-2">
          <p className="text-sm font-medium text-slate-500">بلوک ها</p>
          <h3 className="text-lg font-semibold text-slate-950">افزودن کامپوننت</h3>
        </div>

        <div className="mt-4 space-y-3">
          {paletteBlocks.map((block) => (
            <button
              key={block.type}
              type="button"
              draggable
              onDragStart={(event) =>
                event.dataTransfer.setData(paletteTransferKey, block.type)
              }
              onClick={() => onAddBlock(block.type)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 text-right transition hover:border-slate-300 hover:bg-white"
            >
              <p className="font-semibold text-slate-900">
                {translateBlockLabel(block.label)}
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {translateBlockDescription(block.type)}
              </p>
            </button>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="space-y-2">
          <p className="text-sm font-medium text-slate-500">بازرس</p>
          <h3 className="text-lg font-semibold text-slate-950">
            تنظیمات بلوک انتخاب شده
          </h3>
        </div>

        <InspectorPanel
          selectedComponent={selectedComponent}
          onUpdateSelectedComponent={onUpdateSelectedComponent}
          onAddFieldToSelectedGroup={onAddFieldToSelectedGroup}
          onAddColumnToSelectedTable={onAddColumnToSelectedTable}
          onAddRowToSelectedTable={onAddRowToSelectedTable}
        />
      </section>
    </>
  );
}

type MenuSidebarProps = {
  workspace: DocsWorkspace;
  activeView: "editor" | "create-page";
  selectedPageSlug: string;
  onSelectPage: (slug: string) => void;
  onOpenCreatePage: () => void;
};

export function MenuSidebar({
  workspace,
  activeView,
  selectedPageSlug,
  onSelectPage,
  onOpenCreatePage,
}: MenuSidebarProps) {
  return (
    <aside dir="rtl" className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="space-y-2">
          <p className="text-sm font-medium text-slate-500">سایدبار درختی</p>
          <h3 className="text-xl font-semibold text-slate-950">منوی صفحات</h3>
        </div>

        <div className="mt-4 space-y-3">
          <button
            type="button"
            onClick={onOpenCreatePage}
            className={`w-full rounded-2xl border border-dashed px-4 py-3 text-right text-sm font-medium transition ${
              activeView === "create-page"
                ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                : "border-slate-300 bg-slate-50 text-slate-700 hover:border-slate-400"
            }`}
          >
            ایجاد صفحه جدید
          </button>
        </div>

        <div className="mt-5 space-y-5">
          {workspace.menuGroups.map((group) => (
            <MenuGroupCard
              key={group.id}
              group={group}
              pages={workspace.pages.filter((page) => page.menuGroupId === group.id)}
              activeView={activeView}
              selectedPageSlug={selectedPageSlug}
              onSelectPage={onSelectPage}
            />
          ))}
        </div>
      </section>
    </aside>
  );
}

function MenuGroupCard({
  group,
  pages,
  activeView,
  selectedPageSlug,
  onSelectPage,
}: {
  group: MenuGroup;
  pages: DocsWorkspace["pages"];
  activeView: "editor" | "create-page";
  selectedPageSlug: string;
  onSelectPage: (slug: string) => void;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <div className="space-y-1">
        <p className="font-semibold text-slate-900">{group.title}</p>
        {group.description ? (
          <p className="text-sm leading-6 text-slate-600">{group.description}</p>
        ) : null}
      </div>

      <div className="mt-4 space-y-2 border-r border-slate-200 pr-4">
        {pages.map((page) => (
          <button
            key={page.slug}
            type="button"
            onClick={() => onSelectPage(page.slug)}
            className={`block w-full rounded-2xl px-4 py-3 text-right text-sm transition ${
              activeView === "editor" && selectedPageSlug === page.slug
                ? "bg-slate-950 text-white"
                : "bg-white text-slate-700 hover:border-slate-300"
            }`}
          >
            <span className="block font-medium">{page.menuTitle}</span>
            <span
              className={`mt-1 block text-xs ${
                activeView === "editor" && selectedPageSlug === page.slug
                  ? "text-slate-300"
                  : "text-slate-500"
              }`}
            >
              /pages/{page.slug}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
