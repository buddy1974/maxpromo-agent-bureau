"use client";

import { useEffect, useRef, useState } from "react";
import { leadSchema } from "@/lib/validation/lead";

type Status = "idle" | "submitting" | "success" | "error";

// Read UTM + ref + referrer once on mount. Best-effort; never blocks submit.
function readAttribution() {
  if (typeof window === "undefined") return undefined;
  const p = new URLSearchParams(window.location.search);
  const val = (k: string) => p.get(k) || undefined;
  return {
    utmSource: val("utm_source"),
    utmMedium: val("utm_medium"),
    utmCampaign: val("utm_campaign"),
    utmContent: val("utm_content"),
    utmTerm: val("utm_term"),
    refCode: val("ref"),
    landingPath: window.location.pathname,
    referrer: document.referrer || undefined,
  };
}

export function LeadForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const attribution = useRef<ReturnType<typeof readAttribution>>(undefined);

  useEffect(() => {
    attribution.current = readAttribution();
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);

    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      company: String(fd.get("company") ?? ""),
      message: String(fd.get("message") ?? ""),
      website: String(fd.get("website") ?? ""), // honeypot
      ctaType: "audit" as const,
      attribution: attribution.current,
    };

    // Client-side validation with the SAME schema the server uses.
    const parsed = leadSchema.safeParse(payload);
    if (!parsed.success) {
      const first =
        Object.values(parsed.error.flatten().fieldErrors)[0]?.[0] ??
        "Bitte Eingaben prüfen.";
      setStatus("error");
      setError(first);
      return;
    }

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (res.ok) {
        setStatus("success");
        return;
      }
      const data = await res.json().catch(() => null);
      setStatus("error");
      setError(
        data?.error === "not_configured"
          ? "Das Formular ist noch nicht final verbunden. Bitte schreiben Sie an djstranger2000@gmail.com."
          : "Etwas ist schiefgelaufen. Bitte erneut versuchen.",
      );
    } catch {
      setStatus("error");
      setError("Netzwerkfehler. Bitte erneut versuchen.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl border border-accent/40 bg-accent-soft p-8 text-center">
        <div className="font-mono text-2xl text-accent">✓</div>
        <h3 className="mt-3 text-xl font-semibold text-zinc-50">
          Anfrage erhalten.
        </h3>
        <p className="mt-2 text-zinc-400">
          Wir melden uns für Ihren kostenlosen Geschäfts-Check. 30 Minuten,
          unverbindlich.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field name="name" label="Name *" autoComplete="name" required />
        <Field
          name="email"
          label="E-Mail *"
          type="email"
          autoComplete="email"
          required
        />
        <Field name="phone" label="Telefon" type="tel" autoComplete="tel" />
        <Field name="company" label="Firma" autoComplete="organization" />
      </div>

      <label className="grid gap-1.5">
        <span className="text-sm text-zinc-400">Worum geht es? (optional)</span>
        <textarea
          name="message"
          rows={3}
          className="rounded-md border border-line bg-ink-850 px-3 py-2.5 text-zinc-100 outline-none transition-colors placeholder:text-zinc-600 focus:border-accent"
          placeholder="Kurz Ihr Betrieb und Ihre größte manuelle Baustelle …"
        />
      </label>

      {/* Honeypot — visually hidden, ignored by humans, filled by bots. */}
      <div aria-hidden className="hidden">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {status === "error" && error && (
        <p className="text-sm text-red-400" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-1 inline-flex items-center justify-center rounded-md bg-accent px-6 py-3 text-base font-semibold text-ink-950 transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting"
          ? "Wird gesendet …"
          : "Kostenlosen Geschäfts-Check anfragen"}
      </button>

      <p className="text-xs text-zinc-600">
        Mit dem Absenden stimmen Sie der Kontaktaufnahme zu. Ihre Daten werden
        ausschließlich zur Bearbeitung Ihrer Anfrage verwendet. Details:{" "}
        <a href="/datenschutz" className="underline underline-offset-2 hover:text-zinc-400">
          Datenschutz
        </a>
        .
      </p>
    </form>
  );
}

function Field({
  name,
  label,
  type = "text",
  required,
  autoComplete,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <label className="grid gap-1.5">
      <span className="text-sm text-zinc-400">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="rounded-md border border-line bg-ink-850 px-3 py-2.5 text-zinc-100 outline-none transition-colors placeholder:text-zinc-600 focus:border-accent"
      />
    </label>
  );
}
