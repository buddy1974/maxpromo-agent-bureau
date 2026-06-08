"use client";

/**
 * components/auth/LoginForm.tsx
 *
 * Client island: handles the login form submission.
 * Calls signIn("credentials") from next-auth/react.
 *
 * Design: dark premium, Maxpromo brand colours.
 * Language: German UI (target market is German SMEs).
 * No public signup — accounts are provisioned by Maxpromo.
 */
import { useState, useTransition } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    startTransition(async () => {
      const result = await signIn("credentials", {
        email: email.toLowerCase().trim(),
        password,
        redirect: false, // we handle redirect manually for error feedback
      });

      if (result?.error) {
        // NextAuth returns "CredentialsSignin" on wrong credentials.
        // We show a deliberate vague message to avoid user enumeration.
        setError("E-Mail-Adresse oder Passwort ungültig.");
        return;
      }

      // Successful login — redirect to dashboard
      router.push("/dashboard");
      router.refresh();
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* E-Mail */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="email"
          className="font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-500"
        >
          E-Mail-Adresse
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="
            rounded-md border border-line bg-ink-900 px-3.5 py-2.5
            text-sm text-zinc-200 placeholder-zinc-600
            outline-none ring-0
            transition-colors
            focus:border-accent focus:bg-ink-850
            disabled:opacity-50
          "
          placeholder="name@unternehmen.de"
          disabled={isPending}
        />
      </div>

      {/* Passwort */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="password"
          className="font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-500"
        >
          Passwort
        </label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="
            rounded-md border border-line bg-ink-900 px-3.5 py-2.5
            text-sm text-zinc-200 placeholder-zinc-600
            outline-none ring-0
            transition-colors
            focus:border-accent focus:bg-ink-850
            disabled:opacity-50
          "
          placeholder="••••••••"
          disabled={isPending}
        />
      </div>

      {/* Error message */}
      {error && (
        <p className="rounded-md border border-red-900/40 bg-red-950/30 px-3.5 py-2.5 text-sm text-red-400">
          {error}
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isPending}
        className="
          mt-1 flex items-center justify-center gap-2
          rounded-md bg-accent px-4 py-2.5
          text-sm font-medium text-white
          transition-colors hover:bg-accent-hover
          disabled:cursor-not-allowed disabled:opacity-50
        "
      >
        {isPending ? (
          <>
            <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            Anmelden…
          </>
        ) : (
          "Anmelden"
        )}
      </button>

      {/* No public signup notice */}
      <p className="text-center font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-600">
        Kein Konto? Zugang wird von Maxpromo bereitgestellt.
      </p>
    </form>
  );
}
