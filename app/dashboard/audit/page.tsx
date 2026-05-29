import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { AuditFindingCard } from "@/components/dashboard/AuditFindingCard";
import { AuditPriorityMatrix } from "@/components/dashboard/AuditPriorityMatrix";
import { AgentRecommendationCard } from "@/components/dashboard/AgentRecommendationCard";
import { MOCK_AUDIT_SESSION } from "@/lib/mock/audit";
import { AGENT_RECOMMENDATIONS } from "@/lib/core/operating-model";

// Module 1 — AI Audit Console. Entry point for diagnosing a business.
export default function AuditConsolePage() {
  const s = MOCK_AUDIT_SESSION;
  // Pick a recommendation tier roughly matching the finding count.
  const recommendation =
    AGENT_RECOMMENDATIONS.find((r) => r.agents.length >= 3) ?? AGENT_RECOMMENDATIONS[0];

  return (
    <DashboardShell title="Audit Console">
      <div className="space-y-8">
        <section className="rounded-xl border border-accent/30 bg-accent-soft p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                Geschäfts-Check · {s.industry}
              </p>
              <h2 className="mt-1 text-xl font-semibold text-zinc-50">{s.businessName}</h2>
            </div>
            <div className="text-right">
              <p className="text-3xl font-semibold text-accent">{s.priorityScore}</p>
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-500">
                Prioritäts-Score
              </p>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <div>
            <h3 className="mb-3 text-base font-semibold text-zinc-100">Prioritäts-Matrix</h3>
            <AuditPriorityMatrix findings={s.findings} />
          </div>
          <div>
            <h3 className="mb-3 text-base font-semibold text-zinc-100">Empfohlenes Team</h3>
            <AgentRecommendationCard recommendation={recommendation} />
          </div>
        </section>

        <section>
          <h3 className="mb-3 text-base font-semibold text-zinc-100">
            Findings ({s.findings.length})
          </h3>
          <div className="grid gap-4 lg:grid-cols-2">
            {s.findings.map((f) => (
              <AuditFindingCard key={f.id} finding={f} />
            ))}
          </div>
        </section>
      </div>
    </DashboardShell>
  );
}
