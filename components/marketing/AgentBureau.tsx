import { AgentSystemMap } from "./AgentSystemMap";

// Public agent team section. Operational identities only — no faces/avatars.
// Chief hub + system map leads. Specialist bureau rendered as a compact
// system manifest (not a marketing card grid).

const CHIEF = {
  glyph: "◆",
  name:  "Chief of Staff",
  role:  "Die zentrale Koordinationsebene",
  desc:  "Priorisiert, koordiniert, eskaliert und erstellt das tägliche Briefing. Entscheidet nicht allein, sondern legt Aktionen zur Freigabe vor.",
};

const AGENTS = [
  {
    glyph:    "⊟",
    name:     "Lead-Agent",
    fn:       "Anfragen & Qualifizierung",
    approval: "Direktkontakt",
  },
  {
    glyph:    "▤",
    name:     "Research-Agent",
    fn:       "Markt & Wettbewerb",
    approval: "Externe Inhalte",
  },
  {
    glyph:    "→",
    name:     "CRM-Agent",
    fn:       "Deals & Follow-ups",
    approval: "Kundennachrichten",
  },
  {
    glyph:    "▦",
    name:     "Kalender-Agent",
    fn:       "Termine & Erinnerungen",
    approval: "Einladungsversand",
  },
  {
    glyph:    "✎",
    name:     "Content-Agent",
    fn:       "Entwürfe & Kampagnen",
    approval: "Veröffentlichung",
  },
  {
    glyph:    "◰",
    name:     "Operations-Agent",
    fn:       "Projekte & Deadlines",
    approval: "Aufgaben-Umverteilung",
  },
  {
    glyph:    "▢",
    name:     "Document-Agent",
    fn:       "Dokumente & Fristen",
    approval: "Externer Versand",
  },
  {
    glyph:    "◷",
    name:     "Follow-Up-Agent",
    fn:       "Wartende Kunden",
    approval: "Jede externe Nachricht",
  },
  {
    glyph:    "⚐",
    name:     "Governance-Agent",
    fn:       "KI-Risiken & Policy",
    approval: "Policy-Änderungen",
  },
];

export function AgentBureau() {
  const half = Math.ceil(AGENTS.length / 2);
  const left  = AGENTS.slice(0, half);
  const right = AGENTS.slice(half);

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

        {/* Hub-and-spoke system map */}
        <AgentSystemMap />

        {/* Chief of Staff — elevated */}
        <div className="mt-6 rounded-xl border border-accent/30 bg-accent-soft p-6 md:p-8">
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

        {/* Specialist bureau — compact system manifest */}
        <div className="mt-6 overflow-hidden rounded-xl border border-line bg-ink-900">
          {/* column headers */}
          <div className="grid border-b border-line md:grid-cols-2">
            <div className="hidden border-r border-line md:grid md:grid-cols-[28px_1fr_120px_120px] md:gap-x-4 md:px-4 md:py-2">
              <span />
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-600">Agent</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-600">Funktion</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent/50">Freigabe nötig</span>
            </div>
            <div className="hidden md:grid md:grid-cols-[28px_1fr_120px_120px] md:gap-x-4 md:px-4 md:py-2">
              <span />
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-600">Agent</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-600">Funktion</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent/50">Freigabe nötig</span>
            </div>
          </div>

          {/* two-column manifest on desktop, single column on mobile */}
          <div className="divide-y divide-line md:grid md:grid-cols-2 md:divide-x md:divide-y-0">
            {/* left column */}
            <div className="divide-y divide-line">
              {left.map((a) => <AgentRow key={a.name} agent={a} />)}
            </div>
            {/* right column */}
            <div className="divide-y divide-line">
              {right.map((a) => <AgentRow key={a.name} agent={a} />)}
            </div>
          </div>
        </div>

        {/* legend */}
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1">
          <LegendItem color="text-zinc-500" label="Observiert kontinuierlich" />
          <LegendItem color="text-zinc-400" label="Bereitet Entwurf vor" />
          <LegendItem color="text-accent"   label="Freigabe vor Ausführung" />
        </div>
      </div>
    </section>
  );
}

function AgentRow({ agent: a }: { agent: typeof AGENTS[number] }) {
  return (
    <div className="grid grid-cols-[28px_1fr] items-center gap-x-3 px-4 py-3.5 transition-colors hover:bg-ink-850/60 md:grid-cols-[28px_1fr_120px_120px] md:gap-x-4">
      <span className="font-mono text-base text-accent">{a.glyph}</span>
      <span className="font-semibold text-zinc-100 text-sm">{a.name}</span>
      <span className="col-span-2 mt-0.5 text-xs text-zinc-500 md:col-span-1 md:mt-0 md:truncate">{a.fn}</span>
      <span className="hidden font-mono text-[11px] text-accent/70 md:block md:truncate">{a.approval}</span>
    </div>
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <span className={`flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.12em] ${color}`}>
      <span className="inline-block h-1.5 w-1.5 rounded-full bg-current opacity-70" />
      {label}
    </span>
  );
}
