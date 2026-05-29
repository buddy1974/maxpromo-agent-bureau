import { StatusTicker } from "./StatusTicker";

const BADGES = ["DSGVO-konform", "EU-gehostet", "Made in Essen"];

export function Hero() {
  return (
    <section className="bg-grid border-b border-line">
      <div className="mx-auto max-w-content px-6 py-20 md:py-28">
        <p className="eyebrow">// Essen · Überwachtes KI-Betriebsteam</p>

        <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.08] tracking-tight text-zinc-50 md:text-6xl">
          Ein KI-Team, das Ihren Betrieb führt.{" "}
          <span className="text-accent">Sie behalten die Kontrolle.</span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
          Kein Chatbot. Kein Spielzeug. Ein überwachtes Team aus KI-Agenten, das
          Anfragen erfasst, Leads qualifiziert, Follow-ups vorbereitet und Ihren
          Tag strukturiert — jede Aktion nach außen geht erst raus, wenn{" "}
          <span className="text-zinc-200">Sie sie freigeben.</span>
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href="#audit"
            className="inline-flex items-center justify-center rounded-md bg-accent px-6 py-3 text-base font-semibold text-ink-950 transition-colors hover:bg-accent-hover"
          >
            Kostenlosen Geschäfts-Check anfragen
          </a>
          <a
            href="#bureau"
            className="inline-flex items-center justify-center rounded-md border border-line px-6 py-3 text-base font-medium text-zinc-200 transition-colors hover:border-zinc-500 hover:text-white"
          >
            Das Team ansehen →
          </a>
        </div>

        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-[0.14em] text-zinc-500">
          {BADGES.map((b) => (
            <span key={b} className="flex items-center gap-2">
              <span className="text-accent">✓</span>
              {b}
            </span>
          ))}
        </div>

        <div className="mt-12">
          <StatusTicker />
        </div>
      </div>
    </section>
  );
}
