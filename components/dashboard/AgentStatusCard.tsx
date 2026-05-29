import type { Agent } from "@/types/agent";
import { StatusBadge } from "./StatusBadge";
import { RiskBadge } from "./RiskBadge";

export function AgentStatusCard({ agent }: { agent: Agent }) {
  return (
    <div className="rounded-xl border border-line bg-ink-850 p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-semibold text-zinc-100">{agent.name}</h3>
          <p className="text-xs text-zinc-500">{agent.role}</p>
        </div>
        <StatusBadge status={agent.status} />
      </div>

      <p className="mt-3 line-clamp-2 text-sm text-zinc-400">
        {agent.description}
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <RiskBadge level={agent.riskLevel} />
        {agent.requiresApproval && (
          <span className="rounded-full border border-line bg-ink-800 px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-[0.12em] text-zinc-400">
            Approval Required
          </span>
        )}
      </div>

      <div className="mt-4 border-t border-line pt-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-600">
          Nächste empfohlene Aktion
        </p>
        <p className="mt-1 text-sm text-zinc-300">{agent.nextRecommendedAction}</p>
      </div>
    </div>
  );
}
