// Value chain: from a recognised problem to an organised business — with the
// owner approving in the middle. Reusable, clean.
const FLOW = [
  { label: "Problem erkannt", detail: "Wartender Kunde, Frist, verpasstes Follow-up, Shadow-AI-Risiko, unklare Priorität." },
  { label: "Agent bereitet Vorschlag vor", detail: "Kontext gesammelt, Entwurf erstellt — nichts gesendet." },
  { label: "Owner prüft und genehmigt", detail: "Sie entscheiden. Anpassen, freigeben oder ablehnen.", accent: true },
  { label: "Aktion wird protokolliert", detail: "Jede Entscheidung landet im Audit-Trail." },
  { label: "Geschäft läuft organisierter", detail: "Weniger Chaos, verlässliches Follow-through." },
];

export function BusinessFlowInfographic() {
  return (
    <section className="border-b border-line">
      <div className="mx-auto max-w-content px-6 py-16">
        <p className="eyebrow">// Vom Problem zum System</p>
        <h2 className="mt-4 max-w-2xl text-2xl font-semibold tracking-tight text-zinc-100 md:text-3xl">
          Vorschläge statt Blind-Automation. Der Owner bleibt in Kontrolle.
        </h2>

        <ol className="mt-8 space-y-3">
          {FLOW.map((step, i) => (
            <li
              key={step.label}
              className={`flex gap-4 rounded-xl border p-4 ${
                step.accent ? "border-accent/40 bg-accent-soft" : "border-line bg-ink-850"
              }`}
            >
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border font-mono text-xs ${
                  step.accent ? "border-accent/50 text-accent" : "border-line text-zinc-500"
                }`}
              >
                {i + 1}
              </span>
              <div>
                <p className={`text-sm font-medium ${step.accent ? "text-accent" : "text-zinc-100"}`}>
                  {step.label}
                </p>
                <p className="mt-0.5 text-sm text-zinc-400">{step.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
