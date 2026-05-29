import type { AIGovernanceRisk, GovernanceRiskLevel } from "@/types/ai-governance";

const LEVEL_STYLE: Record<GovernanceRiskLevel, string> = {
  low: "text-emerald-400",
  medium: "text-amber-400",
  high: "text-orange-400",
  critical: "text-red-400",
};

export function GovernanceRiskCard({ risk }: { risk: AIGovernanceRisk }) {
  return (
    <div className="rounded-xl border border-line bg-ink-850 p-5">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-semibold text-zinc-100">{risk.area}</h3>
        <span className={`font-mono text-[11px] uppercase tracking-[0.12em] ${LEVEL_STYLE[risk.level]}`}>
          {risk.level}
        </span>
      </div>
      <p className="mt-2 text-sm text-zinc-400">{risk.description}</p>
      <div className="mt-3 border-t border-line pt-2">
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-600">
          Empfohlene Maßnahme
        </p>
        <p className="mt-1 text-sm text-zinc-300">{risk.recommendedAction}</p>
      </div>
    </div>
  );
}
