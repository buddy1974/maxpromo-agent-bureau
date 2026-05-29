// "Connects to what you already use." Text-based marquee (no logo assets needed
// for Sprint 1). Real integrations land behind the gateway adapter post-MVP.
const TOOLS = [
  "Gmail",
  "Google Kalender",
  "Outlook",
  "WhatsApp",
  "Telegram",
  "Slack",
  "n8n",
  "HubSpot",
  "Stripe",
  "Notion",
  "Google Sheets",
  "Webformulare",
];

export function Integrations() {
  const loop = [...TOOLS, ...TOOLS];
  return (
    <section className="border-b border-line">
      <div className="mx-auto max-w-content px-6 py-16">
        <p className="eyebrow">// Verbindet, was Sie schon nutzen</p>
        <h2 className="mt-4 max-w-2xl text-2xl font-semibold tracking-tight text-zinc-100 md:text-3xl">
          Kein Herausreißen. Wir verbinden Ihre vorhandenen Werkzeuge.
        </h2>
      </div>
      <div className="relative overflow-hidden border-y border-line bg-ink-900 py-5">
        <div className="animate-ticker flex w-max gap-3 px-3">
          {loop.map((t, i) => (
            <span
              key={i}
              className="shrink-0 rounded-md border border-line bg-ink-850 px-4 py-2 font-mono text-sm text-zinc-400"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
