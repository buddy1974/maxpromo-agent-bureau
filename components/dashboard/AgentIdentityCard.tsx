import type { Agent } from "@/types/agent";
import { StatusBadge } from "./StatusBadge";
import { RiskBadge } from "./RiskBadge";

// Operational agent identity — NO faces/avatars. Communicates: this agent
// prepares work and proposes; it does not execute uncontrolled actions.
export function AgentIdentityCard({
  agent,
  primary = false,
}: {
  agent: Agent;
  primary?: boolean;
}) {
  const observes = agent.capabilities.map((c) => c.label);
  return (
    <div
      className={`rounded-xl border bg-ink-850/80 p-6 backdrop-blur ${
        primary ? "border-accent/40 bg-accent-soft" : "border-line"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <span className={`mt-0.5 font-mono text-lg ${primary ? "text-accent" : "text-zinc-500"}`}>
            {primary ? "◆" : "◇"}
          </span>
          <div>
            <h3 className="font-semibold text-zinc-100">{agent.name}</h3>
            <p className="text-xs text-zinc-500">{agent.role}</p>
          </div>
        </div>
        <StatusBadge status={agent.status} />
      </div>

      <p className="mt-3 text-sm leading-relaxed text-zinc-400">{agent.description}</p>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <RiskBadge level={agent.riskLevel} />
        {agent.requiresApproval && (
          <span className="rounded-full border border-line bg-ink-800 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-zinc-400">
            Approval Required
          </span>
        )}
      </div>

      <div className="mt-5 space-y-3">
        <Field label="Observiert" items={observes} />
        <Field label="Bereitet vor" items={agent.allowedActions} />
        <Field label="Freigabe nötig für" items={agent.blockedActions} accent />
      </div>

      <div className="mt-5 grid gap-3 border-t border-line pt-4 sm:grid-cols-2">
        <div>
          <Label>Verbundene Systeme</Label>
          <div className="mt-1 flex flex-wrap gap-1.5">
            {agent.connectedSystems.map((s) => (
              <span
                key={s}
                className="rounded border border-line bg-ink-900 px-2 py-0.5 font-mono text-[10px] text-zinc-400"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
        <div>
          <Label>Letzte Aktivität</Label>
          <p className="mt-1 font-mono text-[11px] text-zinc-500">
            {agent.lastActivity.slice(0, 16).replace("T", " ")} UTC
          </p>
        </div>
      </div>

      <div className="mt-4 rounded-lg border border-line bg-ink-900 p-3">
        <Label>Nächste empfohlene Aktion</Label>
        <p className="mt-1 text-sm text-zinc-300">{agent.nextRecommendedAction}</p>
      </div>
    </div>
  );
}

function Field({
  label,
  items,
  accent = false,
}: {
  label: string;
  items: string[];
  accent?: boolean;
}) {
  if (!items.length) return null;
  return (
    <div>
      <Label accent={accent}>{label}</Label>
      <ul className="mt-1 space-y-0.5">
        {items.map((it) => (
          <li key={it} className="flex gap-2 text-sm text-zinc-300">
            <span className={accent ? "text-accent" : "text-zinc-600"}>—</span>
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Label({ children, accent = false }: { children: React.ReactNode; accent?: boolean }) {
  return (
    <p
      className={`font-mono text-[10px] uppercase tracking-[0.14em] ${
        accent ? "text-accent" : "text-zinc-600"
      }`}
    >
      {children}
    </p>
  );
}
