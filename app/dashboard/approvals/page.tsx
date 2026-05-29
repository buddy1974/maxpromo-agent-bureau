import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { ApprovalCard } from "@/components/dashboard/ApprovalCard";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { getProposals } from "@/lib/db/queries/approvals";
import type { AgentProposal } from "@/types/agent";

// Module 3 — Approval Desk. DB-backed. Approve/Reject/Edit remain non-functional
// placeholders (handled inside ApprovalCard); no execution path exists yet.
export const dynamic = "force-dynamic";

export default async function ApprovalsPage() {
  const rows = await getProposals();
  const pending = rows.filter((p) => p.status === "pending");

  const proposals: AgentProposal[] = pending.map((p) => ({
    id: p.id,
    title: p.title,
    agentId: p.agentKey,
    agentName: p.agentKey,
    businessContext: p.businessContext ?? "",
    proposedAction: p.proposedAction,
    riskLevel: p.riskLevel,
    status: p.status,
    expectedOutcome: p.expectedOutcome ?? "",
    auditTrailPreview: [
      `Agent: ${p.agentKey}`,
      "Aktion vorbereitet (nicht ausgeführt)",
      "Wartet auf menschliche Freigabe",
    ],
    createdAt: new Date(p.createdAt).toISOString(),
  }));

  return (
    <DashboardShell title="Approval Desk">
      <div className="space-y-6">
        <div className="rounded-xl border border-line bg-ink-850 p-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
            Supervised Mode · Vertrauen & Sicherheit
          </p>
          <p className="mt-2 text-sm text-zinc-300">
            Agenten bereiten vor und schlagen vor. Nichts wird ausgeführt, bevor Sie
            es hier freigeben. Buttons sind in dieser Vorschau ohne Funktion.
          </p>
        </div>

        {proposals.length ? (
          <div className="grid gap-4 lg:grid-cols-2">
            {proposals.map((p) => (
              <ApprovalCard key={p.id} proposal={p} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="Keine offenen Freigaben"
            hint="Führen Sie den Demo-Seed aus: npm run db:seed:demo"
            glyph="✓"
          />
        )}
      </div>
    </DashboardShell>
  );
}
