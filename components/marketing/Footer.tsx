import { BUSINESS, UST_CLAUSE } from "@/config/legal";

export function Footer() {
  return (
    <footer className="bg-ink-950">
      <div className="mx-auto max-w-content px-6 py-14">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-accent" />
              <span className="font-mono text-sm font-semibold uppercase tracking-[0.2em] text-zinc-100">
                Max Agent
              </span>
            </div>
            <p className="mt-3 max-w-xs text-sm text-zinc-500">
              Ein Produkt von {BUSINESS.brand}. Überwachte KI-Betriebssysteme,
              installiert in echten Betrieben.
            </p>
          </div>

          <nav className="flex gap-12 text-sm">
            <div className="space-y-2.5">
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-zinc-600">
                Maxpromo
              </p>
              {[
                ["Website", "https://www.maxpromo.digital/de"],
                ["Systeme", "https://www.maxpromo.digital/de/systems"],
                ["Kontakt", "https://www.maxpromo.digital/de/contact"],
              ].map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-zinc-400 transition-colors hover:text-zinc-100"
                >
                  {label}
                </a>
              ))}
            </div>
            <div className="space-y-2.5">
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-zinc-600">
                Rechtliches
              </p>
              <a
                href="/impressum"
                className="block text-zinc-400 transition-colors hover:text-zinc-100"
              >
                Impressum
              </a>
              <a
                href="/datenschutz"
                className="block text-zinc-400 transition-colors hover:text-zinc-100"
              >
                Datenschutz
              </a>
            </div>
          </nav>
        </div>

        {/* Impressum + locked §19 UStG clause — legally required, do not remove. */}
        <div className="mt-12 border-t border-line pt-6 text-sm text-zinc-600">
          <p>
            © {new Date().getFullYear()} {BUSINESS.brand} · {BUSINESS.legalName}
          </p>
          <p className="mt-1">
            {BUSINESS.street} · {BUSINESS.city} · {BUSINESS.country}
          </p>
          <p className="mt-1">
            St.-Nr. {BUSINESS.steuernummer} · {BUSINESS.finanzamt}
          </p>
          <p className="mt-1 text-zinc-500">{UST_CLAUSE}</p>
        </div>
      </div>
    </footer>
  );
}
