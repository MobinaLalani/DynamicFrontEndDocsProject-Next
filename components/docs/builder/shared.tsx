export const inputClass =
  "w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-400";

type FieldProps = {
  label: string;
  children: React.ReactNode;
  className?: string;
};

export function Field({ label, children, className }: FieldProps) {
  return (
    <label className={`block space-y-2 ${className ?? ""}`}>
      <span className="text-sm font-medium text-slate-700">{label}</span>
      {children}
    </label>
  );
}

export function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <p className="text-xs text-slate-400">{label}</p>
      <p className="mt-2 text-xl font-semibold">{value}</p>
    </div>
  );
}
