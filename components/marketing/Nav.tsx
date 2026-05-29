import Link from "next/link";

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-ink-950/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-content items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_12px_2px_rgba(255,106,26,0.6)]" />
          <span className="font-mono text-sm font-semibold uppercase tracking-[0.2em] text-zinc-100">
            Max Agent
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-zinc-400 md:flex">
          <a href="#bureau" className="transition-colors hover:text-zinc-100">
            Das Team
          </a>
          <a href="#ablauf" className="transition-colors hover:text-zinc-100">
            Ablauf
          </a>
          <a
            href="https://www.maxpromo.digital/de"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-zinc-100"
          >
            Maxpromo
          </a>
        </nav>

        <a
          href="#audit"
          className="rounded-md bg-accent px-4 py-2 text-sm font-semibold text-ink-950 transition-colors hover:bg-accent-hover"
        >
          Geschäfts-Check
        </a>
      </div>
    </header>
  );
}
