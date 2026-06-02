import { Field, inputClass } from "@/components/docs/builder/shared";

type NewMenuSectionProps = {
  createMenuTitle: string;
  createMenuDescription: string;
  onSetNewMenuTitle: (value: string) => void;
  onSetNewMenuDescription: (value: string) => void;
  onCreateMenu: () => void;
};

export function NewMenuSection({
  createMenuTitle,
  createMenuDescription,
  onSetNewMenuTitle,
  onSetNewMenuDescription,
  onCreateMenu,
}: NewMenuSectionProps) {
  return (
    <div className="w-full overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 p-5">
      <div className="space-y-6">

        <div className="space-y-4">
          <Field label="عنوان منو">
            <input
              className={`${inputClass} w-full min-w-0`}
              value={createMenuTitle}
              onChange={(event) => onSetNewMenuTitle(event.target.value)}
              placeholder="مثلا احراز هویت"
            />
          </Field>

          <Field label="توضیح منو">
            <textarea
              className={`${inputClass} w-full min-w-0 min-h-24 resize-y`}
              value={createMenuDescription}
              onChange={(event) => onSetNewMenuDescription(event.target.value)}
              placeholder="توضیح کوتاه درباره این گروه منو"
            />
          </Field>
        </div>

        <button
          type="button"
          onClick={onCreateMenu}
          className="w-full rounded-2xl bg-slate-950  lg:mt-15 px-4 py-3 font-medium text-white transition-colors hover:bg-slate-800"
        >
          افزودن منوی جدید
        </button>
      </div>
    </div>
  );
}
