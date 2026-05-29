// Generic panel for a prepared (not sent) response suggestion. Reused across the
// waiting room and document desk to make the "prepared, awaiting approval" state
// visually consistent — and to keep the no-autonomous-send rule obvious.
export function ResponseSuggestionPanel({
  label = "Vorgeschlagene Antwort (Entwurf)",
  text,
}: {
  label?: string;
  text: string;
}) {
  return (
    <div className="rounded-lg border border-line bg-ink-900 p-3">
      <div className="flex items-center justify-between">
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-600">
          {label}
        </p>
        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-accent">
          nicht gesendet
        </span>
      </div>
      <p className="mt-1 text-sm text-zinc-300">{text}</p>
    </div>
  );
}
