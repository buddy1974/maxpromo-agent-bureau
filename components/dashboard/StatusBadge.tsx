import type { AgentStatus } from "@/types/agent";

const STYLES: Record<AgentStatus, string> = {
  active: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
  proposing: "border-accent/40 bg-accent-soft text-accent",
  idle: "border-line bg-ink-850 text-zinc-400",
  paused: "border-amber-500/30 bg-amber-500/10 text-amber-400",
  error: "border-red-500/30 bg-red-500/10 text-red-400",
  offline: "border-line bg-ink-850 text-zinc-600",
};

const LABELS: Record<AgentStatus, string> = {
  active: "Aktiv",
  proposing: "Proposal Ready",
  idle: "Bereit",
  paused: "Pausiert",
  error: "Fehler",
  offline: "Offline",
};

export function StatusBadge({ status }: { status: AgentStatus }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-[0.12em] ${STYLES[status]}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {LABELS[status]}
    </span>
  );
}
