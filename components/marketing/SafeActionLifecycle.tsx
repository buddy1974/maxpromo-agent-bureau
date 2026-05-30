// The supervised action lifecycle. "Ausführen" is visually gated behind
// "Menschliche Freigabe" — never autonomous.
const STEPS = [
  { n: 1, label: "Beobachten", glyph: "●" },
  { n: 2, label: "Vorbereiten", glyph: "⊟" },
  { n: 3, label: "Vorschlagen", glyph: "→" },
  { n: 4, label: "Menschliche Freigabe", glyph: "✓", gate: true },
  { n: 5, label: "Ausführen", glyph: "◆", gated: true },
  { n: 6, label: "Protokollieren", glyph: "▦" },
];

export function SafeActionLifecycle() {
  return (
    <section className="border-b border-line">
      <div className="mx-auto max-w-content px-6 py-16">
        <p className="eyebrow">// Sichere Aktions-Kette</p>
        <h2 className="mt-4 max-w-2xl text-2xl font-semibold tracking-tight text-zinc-100 md:text-3xl">
          KI bereitet vor. Der Mensch entscheidet. Das System protokolliert.
        </h2>

        <ol className="mt-8 flex flex-col gap-3 md:flex-row md:items-stretch">
          {STEPS.map((s, i) => (
            <li key={s.n} className="flex items-center gap-3 md:flex-1 md:flex-col md:items-stretch">
              <div
                className={`flex-1 rounded-xl border p-4 ${
                  s.gate
                    ? "border-accent/50 bg-accent-soft"
                    : s.gated
                      ? "border-line bg-ink-850 opacity-90"
                      : "border-line bg-ink-850"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className={`font-mono text-sm ${s.gate ? "text-accent" : "text-zinc-500"}`}>
                    {s.glyph}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-600">
                    {String(s.n).padStart(2, "0")}
                  </span>
                </div>
                <p className={`mt-2 text-sm font-medium ${s.gate ? "text-accent" : "text-zinc-200"}`}>
                  {s.label}
                </p>
                {s.gated && (
                  <p className="mt-1 text-[11px] text-zinc-500">nur nach Freigabe</p>
                )}
              </div>
              {i < STEPS.length - 1 && (
                <span className="shrink-0 text-zinc-600 md:hidden">↓</span>
              )}
            </li>
          ))}
        </ol>

        <p className="mt-6 text-sm text-zinc-400">
          „Ausführen" hängt immer von der menschlichen Freigabe ab. Keine
          unkontrollierte Ausführung.
        </p>
      </div>
    </section>
  );
}
