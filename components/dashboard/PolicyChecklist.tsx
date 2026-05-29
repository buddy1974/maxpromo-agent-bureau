import type { PolicyChecklistItem } from "@/types/ai-governance";

export function PolicyChecklist({ items }: { items: PolicyChecklistItem[] }) {
  const done = items.filter((i) => i.done).length;
  return (
    <div className="rounded-xl border border-line bg-ink-850 p-5">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-zinc-100">Policy-Checkliste</h3>
        <span className="font-mono text-[11px] text-zinc-500">
          {done}/{items.length}
        </span>
      </div>
      <ul className="mt-4 space-y-2">
        {items.map((i) => (
          <li key={i.id} className="flex items-center gap-3 text-sm">
            <span
              className={`flex h-4 w-4 items-center justify-center rounded border text-[10px] ${
                i.done
                  ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400"
                  : "border-line text-zinc-700"
              }`}
            >
              {i.done ? "✓" : ""}
            </span>
            <span className={i.done ? "text-zinc-400 line-through" : "text-zinc-200"}>
              {i.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
