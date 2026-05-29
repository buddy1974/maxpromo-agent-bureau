import type { AuditFinding } from "@/types/audit";
import { RiskBadge } from "./RiskBadge";

const IMPACT_LABEL = {
  time: "Zeit",
  revenue: "Umsatz",
  visibility: "Übersicht",
  risk: "Risiko",
} as const;

const PRIORITY_STYLE = {
  low: "text-zinc-500",
  medium: "text-amber-400",
  high: "text-orange-400",
  critical: "text-red-400",
} as const;

export function AuditFindingCard({ finding }: { finding: AuditFinding }) {
  return (
    <div className="rounded-xl border border-line bg-ink-850 p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-500">
            {finding.category}
          </p>
          <h3 className="mt-1 font-semibold text-zinc-100">{finding.title}</h3>
        </div>
        <span className={`font-mono text-[11px] uppercase tracking-[0.12em] ${PRIORITY_STYLE[finding.priority]}`}>
          {finding.priority}
        </span>
      </div>
      <p className="mt-2 text-sm text-zinc-400">{finding.pain}</p>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="rounded-full border border-line bg-ink-800 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-zinc-400">
          Wirkung: {IMPACT_LABEL[finding.impactArea]}
        </span>
        <RiskBadge level={finding.riskLevel} />
        <span className="rounded-full border border-line bg-ink-800 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-zinc-400">
          Stage: {finding.recommendedStage}
        </span>
      </div>
    </div>
  );
}
