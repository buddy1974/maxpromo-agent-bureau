import type { DocumentIntakeItem } from "@/types/document-intake";
import { DocumentRiskBadge } from "./DocumentRiskBadge";
import { RequiredActionPanel } from "./RequiredActionPanel";
import { ResponseSuggestionPanel } from "./ResponseSuggestionPanel";

const TYPE_LABEL: Record<DocumentIntakeItem["type"], string> = {
  invoice: "Rechnung",
  contract: "Vertrag",
  tax_letter: "Finanzamt",
  insurance: "Versicherung",
  supplier: "Lieferant",
  hr: "Personal",
  customer: "Kunde",
  other: "Sonstiges",
};

export function DocumentIntakeCard({ item }: { item: DocumentIntakeItem }) {
  return (
    <div className="rounded-xl border border-line bg-ink-850 p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-500">
            {TYPE_LABEL[item.type]} · {item.source}
          </p>
          <h3 className="mt-1 font-semibold text-zinc-100">{item.title}</h3>
        </div>
        <DocumentRiskBadge level={item.riskLevel} />
      </div>
      <p className="mt-2 text-sm text-zinc-400">{item.summary}</p>

      <div className="mt-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-600">
          Erforderliche Aktion
        </p>
        <div className="mt-1">
          <RequiredActionPanel actions={item.requiredActions} />
        </div>
      </div>

      {item.suggestedResponse && (
        <div className="mt-3">
          <ResponseSuggestionPanel text={item.suggestedResponse} />
        </div>
      )}

      <div className="mt-3 flex items-center justify-between text-xs text-zinc-500">
        <span>{item.assignedAgent}</span>
        <span className="font-mono uppercase tracking-[0.12em] text-accent">
          {item.approvalStatus === "pending" ? "Approval Required" : item.approvalStatus}
        </span>
      </div>
    </div>
  );
}
