// The "you are the bottleneck" narrative, in the Maxpromo voice.
const BEFORE = [
  "Anfragen kommen nach Feierabend — und gehen unter.",
  "Follow-ups rutschen durch. Kunden buchen woanders.",
  "Fünf Werkzeuge, keines spricht mit dem anderen.",
  "Jede Entscheidung wartet auf Sie.",
];

const AFTER = [
  "Jede Anfrage wird erfasst und vorbereitet.",
  "Follow-ups stehen bereit — Sie geben frei.",
  "Ihre Werkzeuge laufen über ein System zusammen.",
  "Sie steuern. Das Team führt aus.",
];

export function BeforeAfter() {
  return (
    <section className="border-b border-line">
      <div className="mx-auto max-w-content px-6 py-20 md:py-24">
        <p className="eyebrow">// Klingt bekannt?</p>
        <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-zinc-50 md:text-4xl">
          Sie sind der Engpass. Das muss nicht so bleiben.
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-line bg-ink-900 p-7">
            <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-zinc-500">
              Heute — manuell
            </h3>
            <ul className="mt-5 space-y-4">
              {BEFORE.map((b) => (
                <li key={b} className="flex gap-3 text-zinc-400">
                  <span className="mt-1 text-zinc-600">—</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-accent/30 bg-accent-soft p-7">
            <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
              Mit Max Agent — überwacht
            </h3>
            <ul className="mt-5 space-y-4">
              {AFTER.map((a) => (
                <li key={a} className="flex gap-3 text-zinc-200">
                  <span className="mt-0.5 text-accent">✓</span>
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
