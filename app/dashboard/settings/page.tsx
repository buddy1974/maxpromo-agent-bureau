import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { MOCK_INTEGRATIONS } from "@/lib/mock/integrations";
import type { IntegrationStatus } from "@/types/integration";

const STATUS_STYLE: Record<IntegrationStatus, string> = {
  connected: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
  available: "border-line bg-ink-800 text-zinc-400",
  error: "border-red-500/30 bg-red-500/10 text-red-400",
  coming_soon: "border-line bg-ink-800 text-zinc-600",
};

const STATUS_LABEL: Record<IntegrationStatus, string> = {
  connected: "Verbunden",
  available: "Verfügbar",
  error: "Fehler",
  coming_soon: "Bald",
};

export default function SettingsPage() {
  return (
    <DashboardShell title="Einstellungen">
      <div className="space-y-6">
        <section>
          <h2 className="mb-3 text-base font-semibold text-zinc-100">
            Integrationen
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {MOCK_INTEGRATIONS.map((i) => (
              <div
                key={i.id}
                className="flex items-start justify-between gap-3 rounded-xl border border-line bg-ink-850 p-4"
              >
                <div>
                  <p className="text-sm font-medium text-zinc-100">{i.name}</p>
                  <p className="mt-0.5 text-xs text-zinc-500">{i.description}</p>
                </div>
                <span
                  className={`shrink-0 rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] ${STATUS_STYLE[i.status]}`}
                >
                  {STATUS_LABEL[i.status]}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-line bg-ink-850 p-5">
          <h2 className="text-base font-semibold text-zinc-100">Sicherheit & Kontrolle</h2>
          <p className="mt-2 text-sm text-zinc-400">
            Supervised Mode ist aktiv. Agenten führen keine Aktionen nach außen
            ohne Freigabe aus. Konfiguration von Rollen, Berechtigungen und
            Audit-Aufbewahrung folgt in einem späteren Sprint.
          </p>
        </section>
      </div>
    </DashboardShell>
  );
}
