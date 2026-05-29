import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { BriefingPanel } from "@/components/dashboard/BriefingPanel";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { ApprovalCard } from "@/components/dashboard/ApprovalCard";
import { AgentStatusCard } from "@/components/dashboard/AgentStatusCard";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { TaskList } from "@/components/dashboard/TaskList";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { MOCK_DASHBOARD_SUMMARY } from "@/lib/mock/dashboard";
import { MOCK_AUDIT_SESSION } from "@/lib/mock/audit";
import { MOCK_MANUAL_DELIVERY_NOTES } from "@/lib/mock/operating-model";
import { MAINTENANCE_ACTIONS } from "@/lib/core/operating-model";

export default function DashboardOverviewPage() {
  const s = MOCK_DASHBOARD_SUMMARY;
  const audit = MOCK_AUDIT_SESSION;

  return (
    <DashboardShell title="Übersicht">
      <div className="space-y-8">
        <BriefingPanel briefing={s.briefing} />

        {/* Operating-model status band — frames the dashboard as a control layer. */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <BackboneCard
            label="Business-Audit"
            value={`${audit.businessName}`}
            hint={`Score ${audit.priorityScore} · ${audit.findings.length} Findings`}
          />
          <BackboneCard
            label="Aktuelle Stage"
            value="Manuelle Lieferung"
            hint="Concierge aktiv, Systematisierung als Nächstes"
          />
          <BackboneCard
            label="Empfohlenes Team"
            value="Chief of Staff + Lead + Follow-Up"
            hint="aus dem Audit abgeleitet"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {s.metrics.map((m) => (
            <MetricCard key={m.id} metric={m} />
          ))}
        </div>

        <Section title="Offene Freigaben" hint="Agenten-Vorschläge warten auf Ihre Prüfung.">
          {s.pendingApprovals.length ? (
            <div className="grid gap-4 lg:grid-cols-2">
              {s.pendingApprovals.map((p) => (
                <ApprovalCard key={p.id} proposal={p} />
              ))}
            </div>
          ) : (
            <EmptyState title="Keine offenen Freigaben" glyph="✓" />
          )}
        </Section>

        <div className="grid gap-8 lg:grid-cols-2">
          <Section title="Aktive Agenten">
            <div className="grid gap-4">
              {s.activeAgents.map((a) => (
                <AgentStatusCard key={a.id} agent={a} />
              ))}
            </div>
          </Section>

          <div className="space-y-8">
            <Section title="Überfällige Aufgaben">
              {s.overdueTasks.length ? (
                <TaskList tasks={s.overdueTasks} />
              ) : (
                <EmptyState title="Nichts überfällig" glyph="◎" />
              )}
            </Section>

            <Section title="Fällige Follow-ups">
              <ul className="divide-y divide-line rounded-xl border border-line bg-ink-850">
                {s.urgentFollowUps.map((c) => (
                  <li key={c.id} className="px-4 py-3">
                    <p className="text-sm text-zinc-200">{c.name}</p>
                    <p className="text-xs text-zinc-500">
                      {c.companyName ?? "—"} · fällig{" "}
                      {c.nextFollowUpAt?.slice(0, 10)}
                    </p>
                  </li>
                ))}
              </ul>
            </Section>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <Section title="Manuelle Lieferung" hint="Concierge-Notizen, die zu Workflows werden.">
            <ul className="divide-y divide-line rounded-xl border border-line bg-ink-850">
              {MOCK_MANUAL_DELIVERY_NOTES.map((n) => (
                <li key={n.id} className="px-4 py-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-zinc-200">{n.clientName}</p>
                    <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-accent">
                      {n.status}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500">{n.proposedWorkflow}</p>
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Wartungs-Watchlist" hint="Laufende Pflege des installierten Systems.">
            <ul className="divide-y divide-line rounded-xl border border-line bg-ink-850">
              {MAINTENANCE_ACTIONS.map((m) => (
                <li key={m.id} className="flex items-center justify-between px-4 py-3">
                  <div>
                    <p className="text-sm text-zinc-200">{m.label}</p>
                    <p className="text-xs text-zinc-500">{m.description}</p>
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-zinc-500">
                    {m.cadence}
                  </span>
                </li>
              ))}
            </ul>
          </Section>
        </div>

        <Section title="Letzte Aktivität">
          <div className="rounded-xl border border-line bg-ink-850 px-4">
            <ActivityFeed items={s.recentActivity} />
          </div>
        </Section>
      </div>
    </DashboardShell>
  );
}

function BackboneCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="rounded-xl border border-line bg-ink-850 p-5">
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
        {label}
      </p>
      <p className="mt-2 font-semibold text-zinc-100">{value}</p>
      <p className="mt-1 text-xs text-zinc-500">{hint}</p>
    </div>
  );
}

function Section({
  title,
  hint,
  children,
}: {
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="mb-3">
        <h2 className="text-base font-semibold text-zinc-100">{title}</h2>
        {hint && <p className="text-xs text-zinc-500">{hint}</p>}
      </div>
      {children}
    </section>
  );
}
