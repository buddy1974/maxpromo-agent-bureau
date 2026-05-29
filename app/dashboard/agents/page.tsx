import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { AgentStatusCard } from "@/components/dashboard/AgentStatusCard";
import { AGENTS } from "@/lib/registry/agents";

export default function AgentsPage() {
  return (
    <DashboardShell title="Agenten">
      <div className="space-y-6">
        <div className="rounded-xl border border-line bg-ink-850 p-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
            Agent Bureau · {AGENTS.length} Agenten
          </p>
          <p className="mt-2 text-sm text-zinc-300">
            Ein Chief of Staff koordiniert ein überwachtes Team. Jeder Agent
            bereitet vor und schlägt vor — Aktionen nach außen erfordern Ihre
            Freigabe.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {AGENTS.map((a) => (
            <AgentStatusCard key={a.id} agent={a} />
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
