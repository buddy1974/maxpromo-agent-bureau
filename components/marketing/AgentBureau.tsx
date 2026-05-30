// Public agent team section. Operational identities only — no faces/avatars.
// Each specialist shows what it observes, prepares, and what needs approval.
const CHIEF = {
  glyph: "◆",
  name: "Chief of Staff",
  role: "Die zentrale Koordinationsebene",
  desc: "Priorisiert, koordiniert, eskaliert und erstellt das tägliche Briefing. Entscheidet nicht allein, sondern legt Aktionen zur Freigabe vor.",
};

const AGENTS = [
  {
    glyph: "⊟",
    name: "Lead-Agent",
    observes: "neue Anfragen und Firmen",
    prepares: "Recherche, Qualifizierung, Outreach-Entwürfe",
    approval: "jede direkte Kontaktaufnahme",
  },
  {
    glyph: "▤",
    name: "Research-Agent",
    observes: "Markt, Wettbewerb, Branchensignale",
    prepares: "kurze Briefs und Gelegenheiten",
    approval: "Veröffentlichung externer Inhalte",
  },
  {
    glyph: "→",
    name: "CRM-Agent",
    observes: "Deals, Kontakte, Beziehungen",
    prepares: "Follow-up-Erinnerungen, Status-Updates",
    approval: "Nachricht an Kunden, finale Status-Änderung",
  },
  {
    glyph: "▦",
    name: "Kalender-Agent",
    observes: "anstehende Termine und Lücken",
    prepares: "Terminvorschläge und Erinnerungen",
    approval: "Versand von Einladungen",
  },
  {
    glyph: "✎",
    name: "Content-Agent",
    observes: "Content-Bedarf und Quellen",
    prepares: "Entwürfe, Wiederverwertung, Kampagnen",
    approval: "Veröffentlichung, Newsletter-Versand",
  },
  {
    glyph: "◰",
    name: "Operations-Agent",
    observes: "Projekte, Aufgaben, Deadlines",
    prepares: "Status-Berichte und Eskalationen",
    approval: "Umverteilung fremder Aufgaben",
  },
  {
    glyph: "▢",
    name: "Document-Agent",
    observes: "eingehende Dokumente und Fristen",
    prepares: "Zusammenfassungen und Angebotsentwürfe",
    approval: "externer Versand, finale Rechnung",
  },
  {
    glyph: "◷",
    name: "Follow-Up-Agent",
    observes: "wartende Kunden und alte Leads",
    prepares: "Antwortentwürfe und Eskalationen",
    approval: "jede externe Nachricht",
  },
  {
    glyph: "⚐",
    name: "Governance-Agent",
    observes: "KI-Nutzung und Datenrisiken",
    prepares: "Richtlinien und Maßnahmen-Empfehlungen",
    approval: "verbindliche Policy-Änderungen",
  },
];

export function AgentBureau() {
  return (
    <section id="bureau" className="border-b border-line">
      <div className="mx-auto max-w-content px-6 py-20 md:py-24">
        <p className="eyebrow">// Das Team, kein Chatbot</p>
        <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-zinc-50 md:text-4xl">
          Ein Chief of Staff. Ein überwachtes Agenten-Team.
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-zinc-400">
          Jeder Agent beobachtet einen Geschäftsbereich, bereitet Entscheidungen
          vor und legt Aktionen zur Freigabe vor.{" "}
          <span className="text-zinc-200">Keine unkontrollierte Ausführung.</span>
        </p>

        {/* Chief of Staff — elevated */}
        <div className="mt-10 rounded-xl border border-accent/30 bg-accent-soft p-6 md:p-8">
          <div className="flex items-start gap-4">
            <span className="font-mono text-2xl text-accent">{CHIEF.glyph}</span>
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-xl font-semibold text-zinc-50">{CHIEF.name}</h3>
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                  {CHIEF.role}
                </span>
              </div>
              <p className="mt-2 max-w-2xl text-zinc-400">{CHIEF.desc}</p>
            </div>
          </div>
        </div>

        {/* Specialist bureau */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {AGENTS.map((a) => (
            <div
              key={a.name}
              className="rounded-xl border border-line bg-ink-900 p-5 transition-colors hover:border-zinc-600"
            >
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-lg text-accent">{a.glyph}</span>
                <h3 className="font-semibold text-zinc-100">{a.name}</h3>
              </div>
              <dl className="mt-3 space-y-2 text-sm">
                <Line label="Observiert" value={a.observes} />
                <Line label="Bereitet vor" value={a.prepares} />
                <Line label="Freigabe nötig" value={a.approval} accent />
              </dl>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Line({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return (
    <div>
      <dt className={`font-mono text-[10px] uppercase tracking-[0.13em] ${accent ? "text-accent" : "text-zinc-600"}`}>
        {label}
      </dt>
      <dd className="text-zinc-300">{value}</dd>
    </div>
  );
}
