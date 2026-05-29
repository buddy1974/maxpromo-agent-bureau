import type { AgentRiskLevel } from "@/types/agent";

const STYLES: Record<AgentRiskLevel, string> = {
  low: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
  medium: "border-amber-500/30 bg-amber-500/10 text-amber-400",
  high: "border-orange-500/30 bg-orange-500/10 text-orange-400",
  critical: "border-red-500/30 bg-red-500/10 text-red-400",
};

const LABELS: Record<AgentRiskLevel, string> = {
  low: "Risiko niedrig",
  medium: "Risiko mittel",
  high: "Risiko hoch",
  critical: "Kritisch",
};

export function RiskBadge({ level }: { level: AgentRiskLevel }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-[0.12em] ${STYLES[level]}`}
    >
      {LABELS[level]}
    </span>
  );
}
