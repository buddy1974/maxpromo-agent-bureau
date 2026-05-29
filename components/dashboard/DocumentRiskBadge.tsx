import type { DocumentRiskLevel } from "@/types/document-intake";

const STYLES: Record<DocumentRiskLevel, string> = {
  low: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
  medium: "border-amber-500/30 bg-amber-500/10 text-amber-400",
  high: "border-red-500/30 bg-red-500/10 text-red-400",
};

const LABELS: Record<DocumentRiskLevel, string> = {
  low: "Niedrig",
  medium: "Mittel",
  high: "Hoch",
};

export function DocumentRiskBadge({ level }: { level: DocumentRiskLevel }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] ${STYLES[level]}`}
    >
      Risiko {LABELS[level]}
    </span>
  );
}
