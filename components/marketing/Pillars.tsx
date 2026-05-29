// Outcomes, not features — per the core philosophy ("people buy outcomes").
const PILLARS = [
  {
    glyph: "◇",
    title: "Organisation",
    desc: "Anfragen, Aufgaben, Kontakte und Projekte an einem Ort. Nichts liegt mehr in fünf Tools verstreut.",
  },
  {
    glyph: "→",
    title: "Follow-through",
    desc: "Jede Chance bekommt ein nächstes To-do. Follow-ups werden vorbereitet, nicht vergessen.",
  },
  {
    glyph: "◎",
    title: "Klarheit",
    desc: "Ein tägliches Briefing beantwortet: Was braucht Aufmerksamkeit? Was kommt als Nächstes?",
  },
];

export function Pillars() {
  return (
    <section className="border-b border-line">
      <div className="mx-auto max-w-content px-6 py-20 md:py-24">
        <p className="eyebrow">// Was Sie davon haben</p>
        <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-zinc-50 md:text-4xl">
          Wir verkaufen keine KI. Wir verkaufen Ergebnisse.
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {PILLARS.map((p) => (
            <div
              key={p.title}
              className="rounded-xl border border-line bg-ink-900 p-7"
            >
              <span className="font-mono text-2xl text-accent">{p.glyph}</span>
              <h3 className="mt-4 text-xl font-semibold text-zinc-100">
                {p.title}
              </h3>
              <p className="mt-2 leading-relaxed text-zinc-400">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
