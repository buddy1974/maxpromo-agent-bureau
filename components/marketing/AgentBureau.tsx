// "One Brain, many Skills" expressed for the public: a Chief of Staff that
// supervises a bureau of specialised agents. A team — not a chatbot.
const CHIEF = {
  glyph: "◆",
  name: "Chief of Staff",
  role: "Die zentrale Intelligenz",
  desc: "Priorisiert, koordiniert, eskaliert und liefert Ihr tägliches Briefing. Entscheidet, welcher Agent was übernimmt — und legt Ihnen Aktionen zur Freigabe vor.",
};

const AGENTS = [
  {
    glyph: "⊟",
    name: "Lead-Agent",
    desc: "Recherchiert Firmen, findet Kontakte, reichert Datensätze an und qualifiziert Chancen.",
  },
  {
    glyph: "▤",
    name: "Research-Agent",
    desc: "Marktbeobachtung, Wettbewerb, Branchen-Signale und neue Gelegenheiten.",
  },
  {
    glyph: "→",
    name: "CRM-Agent",
    desc: "Follow-up-Erinnerungen, Deal-Bewegung, Kontaktpflege — nichts geht unter.",
  },
  {
    glyph: "▦",
    name: "Kalender-Agent",
    desc: "Terminvorschläge, Meeting-Erinnerungen, ein aufgeräumter Kalender.",
  },
  {
    glyph: "✎",
    name: "Content-Agent",
    desc: "Content-Planung, Entwürfe, Wiederverwertung und Kampagnen-Support.",
  },
  {
    glyph: "◰",
    name: "Operations-Agent",
    desc: "Projekt- und Aufgaben-Tracking, Deadlines und Team-Erinnerungen.",
  },
];

export function AgentBureau() {
  return (
    <section id="bureau" className="border-b border-line">
      <div className="mx-auto max-w-content px-6 py-20 md:py-24">
        <p className="eyebrow">// Das Team, kein Chatbot</p>
        <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-zinc-50 md:text-4xl">
          Ein Chief of Staff. Ein überwachtes Team von Agenten.
        </h2>

        {/* Chief of Staff — elevated */}
        <div className="mt-10 rounded-xl border border-accent/30 bg-accent-soft p-6 md:p-8">
          <div className="flex items-start gap-4">
            <span className="font-mono text-2xl text-accent">{CHIEF.glyph}</span>
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-xl font-semibold text-zinc-50">
                  {CHIEF.name}
                </h3>
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                  {CHIEF.role}
                </span>
              </div>
              <p className="mt-2 max-w-2xl text-zinc-400">{CHIEF.desc}</p>
            </div>
          </div>
        </div>

        {/* The bureau */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {AGENTS.map((a) => (
            <div
              key={a.name}
              className="rounded-xl border border-line bg-ink-900 p-6 transition-colors hover:border-zinc-600"
            >
              <span className="font-mono text-xl text-accent">{a.glyph}</span>
              <h3 className="mt-3 text-lg font-semibold text-zinc-100">
                {a.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                {a.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
