import { useState, type DragEvent } from "react";

import { DocsSitePreview } from "@/components/docs/docs-site-preview";
import {
  componentTransferKey,
  getBlockLabel,
  getBlockMeta,
  paletteTransferKey,
  translateBlockDescription,
  translateBlockLabel,
} from "@/components/docs/builder/constants";
import { InspectorPanel } from "@/components/docs/builder/inspector-panel";
import { Field, inputClass } from "@/components/docs/builder/shared";
import type { BuilderView } from "@/components/docs/builder/use-docs-builder";
import type { DocPage, PageComponent } from "@/lib/docs/schema";
import type { PageComponentType } from "@/lib/docs/schema";
import { paletteBlocks } from "@/lib/docs/builder";
import type { MenuGroup } from "@/lib/docs/workspace";

type PageSettingsSectionProps = {
  activePage: DocPage;
  menuGroups: MenuGroup[];
  allPages: DocPage[];
  onUpdatePage: (updater: (page: DocPage) => DocPage) => void;
  onUpdatePageSlug: (value: string) => void;
};

export function PageSettingsSection({
  activePage,
  menuGroups,
  onUpdatePage,
  onUpdatePageSlug,
}: PageSettingsSectionProps) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">تعریف صفحه</p>
          <h3 className="text-2xl font-semibold tracking-tight text-slate-950">
            تنظیمات صفحه فعال
          </h3>
        </div>
        <p className="text-sm text-slate-600">در این بخش عنوان، مسیر و منوی صفحه را مشخص کن.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="عنوان صفحه">
          <input
            className={inputClass}
            value={activePage.title}
            onChange={(event) =>
              onUpdatePage((page) => ({ ...page, title: event.target.value }))
            }
          />
        </Field>

        <Field label="Slug">
          <input
            className={inputClass}
            value={activePage.slug}
            onChange={(event) => onUpdatePageSlug(event.target.value)}
          />
        </Field>

        <Field label="گروه منو">
          <select
            className={inputClass}
            value={activePage.menuGroupId}
            onChange={(event) =>
              onUpdatePage((page) => ({ ...page, menuGroupId: event.target.value }))
            }
          >
            {menuGroups.map((group) => (
              <option key={group.id} value={group.id}>
                {group.title}
              </option>
            ))}
          </select>
        </Field>

        <Field label="عنوان در منو">
          <input
            className={inputClass}
            value={activePage.menuTitle}
            onChange={(event) =>
              onUpdatePage((page) => ({ ...page, menuTitle: event.target.value }))
            }
          />
        </Field>
      </div>

      <Field label="توضیحات صفحه" className="mt-4">
        <textarea
          className={`${inputClass} min-h-28`}
          value={activePage.description ?? ""}
          onChange={(event) =>
            onUpdatePage((page) => ({ ...page, description: event.target.value }))
          }
        />
      </Field>
    </section>
  );
}

type CanvasSectionProps = {
  activePage: DocPage;
  selectedComponentId: string | null;
  onSelectComponent: (componentId: string) => void;
  onDropAt: (event: DragEvent<HTMLDivElement>, targetIndex: number) => void;
  onDuplicateComponent: (component: PageComponent) => void;
  onRemoveComponent: (componentId: string) => void;
  onEditComponent?: (componentId: string) => void;
  title?: string;
  description?: string;
  showDropHint?: boolean;
};

export function CanvasSection({
  activePage,
  selectedComponentId,
  onSelectComponent,
  onDropAt,
  onDuplicateComponent,
  onRemoveComponent,
  onEditComponent,
  title = "چیدمان کامپوننت ها",
  description = "از سایدبار بلوک ها را بکش یا بلوک های فعلی را جابه جا کن.",
  showDropHint = true,
}: CanvasSectionProps) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">بوم صفحه</p>
          <h3 className="text-2xl font-semibold tracking-tight text-slate-950">
            {title}
          </h3>
        </div>
        <p className="text-sm text-slate-600">{description}</p>
      </div>

      <div className="space-y-3">
        {activePage.components.map((component, index) => (
          <div key={component.id} className="space-y-3">
            <div
              className="h-3 rounded-full border border-dashed border-slate-200 bg-slate-50"
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => onDropAt(event, index)}
            />

            <div
              role="button"
              tabIndex={0}
              draggable
              onDragStart={(event) =>
                event.dataTransfer.setData(componentTransferKey, component.id)
              }
              onClick={() => onSelectComponent(component.id)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  onSelectComponent(component.id);
                }
              }}
              className={`rounded-3xl border p-5 text-right shadow-sm transition ${
                selectedComponentId === component.id
                  ? "border-slate-950 bg-slate-950 text-white"
                  : "border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-white"
              }`}
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        selectedComponentId === component.id
                          ? "bg-white/10 text-slate-200"
                          : "bg-slate-200 text-slate-700"
                      }`}
                    >
                      {component.type}
                    </span>
                    <span
                      className={`text-xs ${
                        selectedComponentId === component.id
                          ? "text-slate-300"
                          : "text-slate-500"
                      }`}
                    >
                      {getBlockMeta(component)}
                    </span>
                  </div>
                  <p className="text-lg font-semibold tracking-tight">{getBlockLabel(component)}</p>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      (onEditComponent ?? onSelectComponent)(component.id);
                    }}
                    className={`rounded-full px-4 py-2 text-sm font-medium ${
                      selectedComponentId === component.id
                        ? "bg-emerald-500/20 text-emerald-100"
                        : "bg-emerald-50 text-emerald-700"
                    }`}
                  >
                    ویرایش
                  </button>
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      onDuplicateComponent(component);
                    }}
                    className={`rounded-full px-4 py-2 text-sm font-medium ${
                      selectedComponentId === component.id
                        ? "bg-white/10 text-white"
                        : "bg-white text-slate-700"
                    }`}
                  >
                    کپی
                  </button>
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      onRemoveComponent(component.id);
                    }}
                    className={`rounded-full px-4 py-2 text-sm font-medium ${
                      selectedComponentId === component.id
                        ? "bg-rose-500/20 text-rose-100"
                        : "bg-rose-50 text-rose-700"
                    }`}
                  >
                    حذف
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {showDropHint ? (
          <div
            className="flex min-h-20 items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-slate-50 text-sm text-slate-500"
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => onDropAt(event, activePage.components.length)}
          >
            بلوک جدید را اینجا رها کن
          </div>
        ) : null}
      </div>
    </section>
  );
}

type CreatePageViewProps = {
  menuGroups: MenuGroup[];
  draftPage: DocPage;
  selectedComponentId: string | null;
  selectedComponent: PageComponent | null;
  newMenuTitle: string;
  newMenuDescription: string;
  newPageTitle: string;
  newPageSlug: string;
  newPageMenuTitle: string;
  newPageMenuGroupId: string;
  onSetNewMenuTitle: (value: string) => void;
  onSetNewMenuDescription: (value: string) => void;
  onSetNewPageTitle: (value: string) => void;
  onSetNewPageSlug: (value: string) => void;
  onSetNewPageMenuTitle: (value: string) => void;
  onSetNewPageMenuGroupId: (value: string) => void;
  onSetNewPageDescription: (value: string) => void;
  onCreateMenu: () => void;
  onCreatePage: () => void;
  onBackToEditor: () => void;
  onAddBlock: (type: PageComponentType) => void;
  onDropAt: (event: DragEvent<HTMLDivElement>, targetIndex: number) => void;
  onSelectComponent: (componentId: string) => void;
  onDuplicateComponent: (component: PageComponent) => void;
  onRemoveComponent: (componentId: string) => void;
  onUpdateSelectedComponent: (updater: (component: PageComponent) => PageComponent) => void;
  onAddFieldToSelectedGroup: () => void;
  onAddColumnToSelectedTable: () => void;
  onAddRowToSelectedTable: () => void;
};

export function CreatePageView({
  menuGroups,
  draftPage,
  selectedComponentId,
  selectedComponent,
  newMenuTitle,
  newMenuDescription,
  newPageTitle,
  newPageSlug,
  newPageMenuTitle,
  newPageMenuGroupId,
  onSetNewMenuTitle,
  onSetNewMenuDescription,
  onSetNewPageTitle,
  onSetNewPageSlug,
  onSetNewPageMenuTitle,
  onSetNewPageMenuGroupId,
  onSetNewPageDescription,
  onCreateMenu,
  onCreatePage,
  onBackToEditor,
  onAddBlock,
  onDropAt,
  onSelectComponent,
  onDuplicateComponent,
  onRemoveComponent,
  onUpdateSelectedComponent,
  onAddFieldToSelectedGroup,
  onAddColumnToSelectedTable,
  onAddRowToSelectedTable,
}: CreatePageViewProps) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-medium text-emerald-600">صفحه جدید</p>
          <h3 className="text-3xl font-semibold tracking-tight text-slate-950">
            ایجاد صفحه جدید
          </h3>
          <p className="mt-2 text-sm leading-7 text-slate-600">
            از این بخش یک صفحه جدید بساز، جای آن را در منو مشخص کن و در صورت نیاز همانجا یک منوی جدید هم تعریف کن.
          </p>
        </div>
        <button
          type="button"
          onClick={onBackToEditor}
          className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-400"
        >
          بازگشت به ویرایش صفحه
        </button>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.15fr]">
        <div className="space-y-6">
          <div className="space-y-6 rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <div className="space-y-2">
              <p className="text-sm font-medium text-slate-500">تعریف صفحه</p>
              <h4 className="text-xl font-semibold text-slate-950">مشخصات صفحه جدید</h4>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Field label="عنوان صفحه">
                <input
                  className={inputClass}
                  value={newPageTitle}
                  onChange={(event) => onSetNewPageTitle(event.target.value)}
                  placeholder="مثلا مدیریت کاربران"
                />
              </Field>

              <Field label="Slug">
                <input
                  className={inputClass}
                  value={newPageSlug}
                  onChange={(event) => onSetNewPageSlug(event.target.value)}
                  placeholder="users-management"
                />
              </Field>

              <Field label="گروه منو">
                <select
                  className={inputClass}
                  value={newPageMenuGroupId}
                  onChange={(event) => onSetNewPageMenuGroupId(event.target.value)}
                >
                  {menuGroups.map((group) => (
                    <option key={group.id} value={group.id}>
                      {group.title}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="عنوان در منو">
                <input
                  className={inputClass}
                  value={newPageMenuTitle}
                  onChange={(event) => onSetNewPageMenuTitle(event.target.value)}
                  placeholder="نامی که در سایدبار نمایش داده می شود"
                />
              </Field>
            </div>

            <Field label="توضیحات صفحه">
              <textarea
                className={`${inputClass} min-h-24`}
                value={draftPage.description ?? ""}
                onChange={(event) => onSetNewPageDescription(event.target.value)}
                placeholder="توضیح کوتاه درباره این صفحه"
              />
            </Field>

            <button
              type="button"
              onClick={onCreatePage}
              className="w-full rounded-2xl bg-emerald-600 px-4 py-3 font-medium text-white"
            >
              ساخت صفحه جدید
            </button>
          </div>

          <div className="space-y-6 rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <div className="space-y-2">
              <p className="text-sm font-medium text-slate-500">در صورت نیاز</p>
              <h4 className="text-xl font-semibold text-slate-950">تعریف منوی جدید</h4>
            </div>

            <Field label="عنوان منو">
              <input
                className={inputClass}
                value={newMenuTitle}
                onChange={(event) => onSetNewMenuTitle(event.target.value)}
                placeholder="مثلا احراز هویت"
              />
            </Field>

            <Field label="توضیح منو">
              <textarea
                className={`${inputClass} min-h-24`}
                value={newMenuDescription}
                onChange={(event) => onSetNewMenuDescription(event.target.value)}
                placeholder="توضیح کوتاه درباره این گروه منو"
              />
            </Field>

            <button
              type="button"
              onClick={onCreateMenu}
              className="w-full rounded-2xl bg-slate-950 px-4 py-3 font-medium text-white"
            >
              افزودن منوی جدید
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="space-y-2">
              <p className="text-sm font-medium text-slate-500">کامپوننت ها</p>
              <h4 className="text-xl font-semibold text-slate-950">
                بلوک های قابل استفاده در صفحه
              </h4>
              <p className="text-sm leading-6 text-slate-600">
                بلوک ها را بکش و داخل بوم صفحه رها کن یا با کلیک مستقیم اضافه کن.
              </p>
            </div>

            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {paletteBlocks.map((block) => (
                <button
                  key={block.type}
                  type="button"
                  draggable
                  onDragStart={(event) =>
                    event.dataTransfer.setData(paletteTransferKey, block.type)
                  }
                  onClick={() => onAddBlock(block.type)}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-right transition hover:border-slate-300 hover:bg-white"
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
          </div>

          <CanvasSection
            activePage={draftPage}
            selectedComponentId={selectedComponentId}
            onSelectComponent={onSelectComponent}
            onDropAt={onDropAt}
            onDuplicateComponent={onDuplicateComponent}
            onRemoveComponent={onRemoveComponent}
          />

          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="space-y-2">
              <p className="text-sm font-medium text-slate-500">بازرس</p>
              <h4 className="text-xl font-semibold text-slate-950">
                ویرایش کامپوننت انتخاب شده
              </h4>
              <p className="text-sm leading-6 text-slate-600">
                روی هر بلوک داخل بوم کلیک کن تا تنظیماتش همینجا باز شود.
              </p>
            </div>

            <InspectorPanel
              selectedComponent={selectedComponent}
              onUpdateSelectedComponent={onUpdateSelectedComponent}
              onAddFieldToSelectedGroup={onAddFieldToSelectedGroup}
              onAddColumnToSelectedTable={onAddColumnToSelectedTable}
              onAddRowToSelectedTable={onAddRowToSelectedTable}
            />
          </section>
        </div>
      </div>
    </section>
  );
}

type PreviewSectionProps = {
  menuGroups: MenuGroup[];
  pages: DocPage[];
  activePageSlug: string;
  onSelectPage: (slug: string) => void;
  onCreatePage: () => void;
  onEditPage: () => void;
  onAddBlock: (type: PageComponentType) => void;
};

export function PreviewSection({
  menuGroups,
  pages,
  activePageSlug,
  onSelectPage,
  onCreatePage,
  onEditPage,
  onAddBlock,
}: PreviewSectionProps) {
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  return (
    <section className="space-y-4">
      <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">پیش نمایش واقعی</p>
            <p className="mt-1 text-sm text-slate-600">
              ابتدا نمای واقعی صفحه را می‌بینی و از همین بالا می‌توانی وارد ویرایش شوی.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setIsPickerOpen((current) => !current)}
              className="rounded-2xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-400"
            >
              افزودن کامپوننت
            </button>
            <button
              type="button"
              onClick={onEditPage}
              className="rounded-2xl bg-slate-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              ویرایش صفحه
            </button>
          </div>
        </div>

        {isPickerOpen ? (
          <div className="mt-4 grid gap-3 border-t border-slate-200 pt-4 md:grid-cols-2 xl:grid-cols-3">
            {paletteBlocks.map((block) => (
              <button
                key={block.type}
                type="button"
                onClick={() => {
                  onAddBlock(block.type);
                  setIsPickerOpen(false);
                  onEditPage();
                }}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-right transition hover:border-slate-300 hover:bg-white"
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
        ) : null}
      </div>
      <DocsSitePreview
        menuGroups={menuGroups}
        pages={pages}
        activePageSlug={activePageSlug}
        interactive
        onSelectPage={onSelectPage}
        onCreatePage={onCreatePage}
      />
    </section>
  );
}

type JsonSectionProps = {
  copied: boolean;
  jsonOutput: string;
  onCopy: () => void;
};

export function JsonSection({ copied, jsonOutput, onCopy }: JsonSectionProps) {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
        <div>
          <p className="text-sm font-medium text-slate-500">JSON کل ساختار</p>
          <p className="text-sm text-slate-600">شامل منوها و همه صفحه ها</p>
        </div>
        <button
          type="button"
          onClick={onCopy}
          className="rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          {copied ? "کپی شد" : "کپی JSON"}
        </button>
      </div>
      <pre className="max-h-[680px] overflow-auto rounded-3xl bg-slate-950 p-5 text-xs leading-6 text-slate-100 shadow-sm">
        <code>{jsonOutput}</code>
      </pre>
    </section>
  );
}

type BuilderCenterPanelProps = {
  activeView: BuilderView;
  activePage: DocPage;
  menuGroups: MenuGroup[];
  pages: DocPage[];
  selectedComponentId: string | null;
  copied: boolean;
  jsonOutput: string;
  onUpdatePage: (updater: (page: DocPage) => DocPage) => void;
  onUpdatePageSlug: (value: string) => void;
  onSelectComponent: (componentId: string) => void;
  onDropAt: (event: DragEvent<HTMLDivElement>, targetIndex: number) => void;
  onDuplicateComponent: (component: PageComponent) => void;
  onRemoveComponent: (componentId: string) => void;
  onSetNewMenuTitle: (value: string) => void;
  onSetNewMenuDescription: (value: string) => void;
  onSetNewPageTitle: (value: string) => void;
  onSetNewPageSlug: (value: string) => void;
  onSetNewPageMenuTitle: (value: string) => void;
  onSetNewPageMenuGroupId: (value: string) => void;
  onCreateMenu: () => void;
  onCreatePage: () => void;
  onBackToEditor: () => void;
  onSelectPage: (slug: string) => void;
  onOpenCreatePage: () => void;
  onCopyJson: () => void;
  onOpenEditPage: () => void;
  onAddBlockToActivePage: (type: PageComponentType) => void;
  newMenuTitle: string;
  newMenuDescription: string;
  newPageTitle: string;
  newPageSlug: string;
  newPageMenuTitle: string;
  newPageMenuGroupId: string;
  newPageDraft: DocPage;
  selectedCreateComponentId: string | null;
  selectedCreateComponent: PageComponent | null;
  onSetNewPageDescription: (value: string) => void;
  onCreatePageDropAt: (
    event: DragEvent<HTMLDivElement>,
    targetIndex: number,
  ) => void;
  onAddBlockToNewPage: (type: PageComponentType) => void;
  onSelectCreateComponent: (componentId: string) => void;
  onDuplicateCreateComponent: (component: PageComponent) => void;
  onRemoveCreateComponent: (componentId: string) => void;
  onUpdateSelectedCreateComponent: (
    updater: (component: PageComponent) => PageComponent,
  ) => void;
  onAddFieldToCreateGroup: () => void;
  onAddColumnToCreateTable: () => void;
  onAddRowToCreateTable: () => void;
};

export function BuilderCenterPanel(props: BuilderCenterPanelProps) {
  return (
    <div dir="rtl" className="space-y-6">
      {props.activeView === "create-page" ? (
        <CreatePageView
          menuGroups={props.menuGroups}
          draftPage={props.newPageDraft}
          selectedComponentId={props.selectedCreateComponentId}
          selectedComponent={props.selectedCreateComponent}
          newMenuTitle={props.newMenuTitle}
          newMenuDescription={props.newMenuDescription}
          newPageTitle={props.newPageTitle}
          newPageSlug={props.newPageSlug}
          newPageMenuTitle={props.newPageMenuTitle}
          newPageMenuGroupId={props.newPageMenuGroupId}
          onSetNewMenuTitle={props.onSetNewMenuTitle}
          onSetNewMenuDescription={props.onSetNewMenuDescription}
          onSetNewPageTitle={props.onSetNewPageTitle}
          onSetNewPageSlug={props.onSetNewPageSlug}
          onSetNewPageMenuTitle={props.onSetNewPageMenuTitle}
          onSetNewPageMenuGroupId={props.onSetNewPageMenuGroupId}
          onSetNewPageDescription={props.onSetNewPageDescription}
          onCreateMenu={props.onCreateMenu}
          onCreatePage={props.onCreatePage}
          onBackToEditor={props.onBackToEditor}
          onAddBlock={props.onAddBlockToNewPage}
          onDropAt={props.onCreatePageDropAt}
          onSelectComponent={props.onSelectCreateComponent}
          onDuplicateComponent={props.onDuplicateCreateComponent}
          onRemoveComponent={props.onRemoveCreateComponent}
          onUpdateSelectedComponent={props.onUpdateSelectedCreateComponent}
          onAddFieldToSelectedGroup={props.onAddFieldToCreateGroup}
          onAddColumnToSelectedTable={props.onAddColumnToCreateTable}
          onAddRowToSelectedTable={props.onAddRowToCreateTable}
        />
      ) : null}

      {props.activeView === "editor" ? (
        <>
          <PageSettingsSection
            activePage={props.activePage}
            menuGroups={props.menuGroups}
            allPages={props.pages}
            onUpdatePage={props.onUpdatePage}
            onUpdatePageSlug={props.onUpdatePageSlug}
          />
          <CanvasSection
            activePage={props.activePage}
            selectedComponentId={props.selectedComponentId}
            onSelectComponent={props.onSelectComponent}
            onDropAt={props.onDropAt}
            onDuplicateComponent={props.onDuplicateComponent}
            onRemoveComponent={props.onRemoveComponent}
            onEditComponent={(componentId) => {
              props.onSelectComponent(componentId);
            }}
          />
        </>
      ) : null}

      {props.activeView === "preview" ? (
        <PreviewSection
          menuGroups={props.menuGroups}
          pages={props.pages}
          activePageSlug={props.activePage.slug}
          onSelectPage={props.onSelectPage}
          onCreatePage={props.onOpenCreatePage}
          onEditPage={props.onOpenEditPage}
          onAddBlock={props.onAddBlockToActivePage}
        />
      ) : null}

      {props.activeView === "json" ? (
        <JsonSection
          copied={props.copied}
          jsonOutput={props.jsonOutput}
          onCopy={props.onCopyJson}
        />
      ) : null}
    </div>
  );
}
