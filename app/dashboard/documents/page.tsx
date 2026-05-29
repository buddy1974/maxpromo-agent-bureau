import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { DocumentIntakeCard } from "@/components/dashboard/DocumentIntakeCard";
import { MOCK_DOCUMENTS } from "@/lib/mock/documents";

// Module 4 — Document Intake Desk. Turns document chaos into structured action.
// Skeleton only: no OCR, no upload pipeline. Summaries/actions are mock-prepared.
export default function DocumentsPage() {
  const actionable = MOCK_DOCUMENTS.filter((d) => d.status === "action_required" || d.status === "new");
  const rest = MOCK_DOCUMENTS.filter((d) => !(d.status === "action_required" || d.status === "new"));

  return (
    <DashboardShell title="Document Intake Desk">
      <div className="space-y-8">
        <div className="rounded-xl border border-line bg-ink-850 p-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
            Aus Dokument-Chaos wird strukturierte Aktion
          </p>
          <p className="mt-2 text-sm text-zinc-300">
            Rechnungen, Verträge, Finanzamt- und Versicherungsschreiben — zusammengefasst,
            mit Frist und nächster Aktion. Vorbereitet, nicht ausgeführt.
          </p>
        </div>

        <section>
          <h3 className="mb-3 text-base font-semibold text-zinc-100">
            Aktion erforderlich
          </h3>
          <div className="grid gap-4 lg:grid-cols-2">
            {actionable.map((d) => (
              <DocumentIntakeCard key={d.id} item={d} />
            ))}
          </div>
        </section>

        {rest.length > 0 && (
          <section>
            <h3 className="mb-3 text-base font-semibold text-zinc-100">Erledigt / geprüft</h3>
            <div className="grid gap-4 lg:grid-cols-2">
              {rest.map((d) => (
                <DocumentIntakeCard key={d.id} item={d} />
              ))}
            </div>
          </section>
        )}
      </div>
    </DashboardShell>
  );
}
