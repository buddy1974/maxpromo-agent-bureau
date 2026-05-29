import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { PLAYBOOKS } from "@/lib/core/playbooks";

// Reusable agent playbooks — the repeatable delivery system (systemize stage).
export default function PlaybooksPage() {
  return (
    <DashboardShell title="Playbooks">
      <div className="space-y-4">
        <div className="rounded-xl border border-line bg-ink-850 p-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
            Wiederverwendbare Playbooks
          </p>
          <p className="mt-2 text-sm text-zinc-300">
            Wiederholte manuelle Arbeit wird zu installierbaren Workflows. Jedes
            Playbook endet vor der Ausführung mit einer menschlichen Freigabe.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {PLAYBOOKS.map((p) => (
            <div key={p.id} className="rounded-xl border border-line bg-ink-850 p-5">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-semibold text-zinc-100">{p.title}</h3>
                {p.approvalRequired && (
                  <span className="shrink-0 rounded-full border border-line bg-ink-800 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-zinc-400">
                    Approval Required
                  </span>
                )}
              </div>
              <p className="mt-1 text-xs text-zinc-500">Schmerz: {p.businessPain}</p>
              <p className="mt-2 text-sm text-zinc-400">
                <span className="text-zinc-500">Auslöser:</span> {p.trigger}
              </p>

              <ol className="mt-3 space-y-1">
                {p.steps.map((s) => (
                  <li key={s.id} className="flex gap-2 text-sm text-zinc-300">
                    <span className="font-mono text-[11px] text-accent">{s.order}.</span>
                    {s.label}
                  </li>
                ))}
              </ol>

              <div className="mt-3 flex flex-wrap gap-2 border-t border-line pt-3 text-[11px]">
                <span className="font-mono uppercase tracking-[0.12em] text-zinc-500">
                  Stage: {p.operatingStage}
                </span>
                <span className="font-mono uppercase tracking-[0.12em] text-zinc-500">
                  · Agenten: {p.responsibleAgents.join(", ")}
                </span>
                {p.reusableTemplate && (
                  <span className="font-mono uppercase tracking-[0.12em] text-accent">
                    · Vorlage
                  </span>
                )}
              </div>
              <p className="mt-2 text-xs text-zinc-500">Ergebnis: {p.expectedOutcome}</p>
            </div>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
