import type { AIToolRegisterItem, AIToolStatus } from "@/types/ai-governance";

const STATUS_STYLE: Record<AIToolStatus, string> = {
  approved: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
  under_review: "border-amber-500/30 bg-amber-500/10 text-amber-400",
  blocked: "border-red-500/30 bg-red-500/10 text-red-400",
};

const STATUS_LABEL: Record<AIToolStatus, string> = {
  approved: "Freigegeben",
  under_review: "In Prüfung",
  blocked: "Gesperrt",
};

export function AIToolRegister({ tools }: { tools: AIToolRegisterItem[] }) {
  return (
    <div className="overflow-hidden rounded-xl border border-line bg-ink-850">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-line text-zinc-500">
          <tr>
            <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-[0.12em]">Tool</th>
            <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-[0.12em]">Kategorie</th>
            <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-[0.12em]">Status</th>
            <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-[0.12em]">Hinweis</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {tools.map((t) => (
            <tr key={t.id} className="text-zinc-300">
              <td className="px-4 py-3 font-medium text-zinc-100">{t.name}</td>
              <td className="px-4 py-3 text-zinc-400">{t.category}</td>
              <td className="px-4 py-3">
                <span className={`rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] ${STATUS_STYLE[t.status]}`}>
                  {STATUS_LABEL[t.status]}
                </span>
              </td>
              <td className="px-4 py-3 text-xs text-zinc-500">{t.usageNote}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
