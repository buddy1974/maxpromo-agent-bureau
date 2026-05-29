import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { ApprovalTimeline } from "@/components/dashboard/ApprovalTimeline";
import { ApprovalRiskSummary } from "@/components/dashboard/ApprovalRiskSummary";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { MOCK_APPROVAL_DESK } from "@/lib/mock/approvals";

// Module 3 — Approval Desk. The trust & safety layer. Approve/Reject/Edit are
// deliberate NON-FUNCTIONAL placeholders; nothing executes from this screen.
export default function ApprovalsPage() {
  const items = MOCK_APPROVAL_DESK.filter((i) => i.status === "pending");

  return (
    <DashboardShell title="Approval Desk">
      <div className="space-y-6">
        <div className="rounded-xl border border-line bg-ink-850 p-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
            Supervised Mode · Vertrauen & Sicherheit
          </p>
          <p className="mt-2 text-sm text-zinc-300">
            Agenten bereiten vor und schlagen vor. Nichts wird ausgeführt, bevor Sie
            es hier freigeben. Jede Entscheidung wird protokolliert.
          </p>
        </div>

        {items.length ? (
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="rounded-xl border border-line bg-ink-850 p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-zinc-100">{item.proposalTitle}</h3>
                    <p className="mt-0.5 text-xs text-zinc-500">
                      {item.agentName} · Awaiting Review
                    </p>
                  </div>
                </div>

                <dl className="mt-4 space-y-3 text-sm">
                  <Row label="Kontext" value={item.businessContext} />
                  <Row label="Vorgeschlagene Aktion" value={item.proposedAction} />
                  <Row label="Erwartetes Ergebnis" value={item.expectedResult} />
                </dl>

                <div className="mt-4 grid gap-4 lg:grid-cols-2">
                  <div className="rounded-lg border border-line bg-ink-900 p-3">
                    <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-600">
                      Aktions-Kette
                    </p>
                    <ApprovalTimeline events={item.timeline} />
                  </div>
                  <ApprovalRiskSummary risk={item.risk} />
                </div>

                {/* Placeholder controls — no handlers (skeleton). */}
                <div className="mt-5 flex flex-wrap gap-2">
                  <PlaceholderButton primary>Freigeben</PlaceholderButton>
                  <PlaceholderButton>Ablehnen</PlaceholderButton>
                  <PlaceholderButton>Vor Freigabe bearbeiten</PlaceholderButton>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            title="Keine offenen Freigaben"
            hint="Neue Agenten-Vorschläge erscheinen hier zur Prüfung."
            glyph="✓"
          />
        )}
      </div>
    </DashboardShell>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-600">{label}</dt>
      <dd className="mt-0.5 text-zinc-300">{value}</dd>
    </div>
  );
}

function PlaceholderButton({
  children,
  primary,
}: {
  children: React.ReactNode;
  primary?: boolean;
}) {
  return (
    <button
      type="button"
      disabled
      title="Platzhalter — Freigabe-Logik folgt in einem späteren Sprint"
      className={`cursor-not-allowed rounded-md px-4 py-2 text-sm font-semibold opacity-60 ${
        primary
          ? "bg-accent text-ink-950"
          : "border border-line font-medium text-zinc-300"
      }`}
    >
      {children}
    </button>
  );
}
