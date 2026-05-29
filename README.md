# Max Agent — Public Offer Page (Sprint 1)

Public, ad-ready landing page for **Max Agent** (Maxpromo Digital ecosystem).
Next.js App Router · TypeScript · Tailwind · Neon Postgres · Drizzle. No waitlist —
the conversion action is a **free Geschäfts-Check (audit) booking**; leads persist
to Neon and (optionally) ping Telegram.

> Architecture, roadmap and decisions live in [`PLAN.md`](./PLAN.md).

## Stack
- **Next.js 15** (App Router, RSC)
- **Tailwind 3** — Hybrid design system (dark premium, orange accent) in `tailwind.config.ts`
- **Neon Postgres + Drizzle** — schema in `lib/db/schema`
- **Zod** — one schema (`lib/validation/lead.ts`) shared by form + API

## Local setup
```bash
npm install
cp .env.example .env.local      # fill in values (see below)
npm run db:generate             # generate SQL migration from schema
npm run db:push                 # apply schema to Neon
npm run dev                     # http://localhost:3000
```

## Environment variables
| Var | Required | Purpose |
|---|---|---|
| `DATABASE_URL` | yes (for lead capture) | Neon pooled connection string, **EU region** (DSGVO) |
| `TELEGRAM_BOT_TOKEN` | no | BotFather token — enables lead notifications |
| `TELEGRAM_CHAT_ID` | no | Chat that receives notifications |
| `NEXT_PUBLIC_SITE_URL` | no | Canonical/OG base URL |

The Telegram notifier is **feature-flagged**: with no token, leads still save and the
page works — the notification is simply skipped.

If `DATABASE_URL` is unset, `POST /api/leads` returns `503 not_configured` and the
form shows an honest fallback (email Marcel) — no fake success.

## Deploy (Vercel)
1. Push this repo to GitHub.
2. Import into Vercel. Framework auto-detected (Next.js).
3. Add the env vars above in **Project → Settings → Environment Variables**.
4. Provision **Neon** (EU/Frankfurt), copy the pooled `DATABASE_URL`, then run
   `npm run db:push` locally (or via a one-off) to create tables.
5. Deploy. Point `agent.maxpromo.digital` (or chosen domain) at it.

## Lead funnel
`LeadForm` (client) → captures UTM/`?ref=`/referrer → `POST /api/leads` →
Zod validate → insert `lead_submissions` (+ `attribution`) → Telegram notify →
typed result. Honeypot field blocks basic bots.

## Project layout
```
app/(marketing)/        landing + impressum + datenschutz
app/api/leads/          lead capture route
lib/db/                 drizzle schema + Neon client
lib/validation/         zod (shared)
lib/integrations/       telegram notifier
components/marketing/   page sections
config/legal.ts         LOCKED Impressum + §19 UStG
```

## Legal
`config/legal.ts` holds the locked business identity and the mandatory
`Gemäß §19 UStG wird keine Umsatzsteuer berechnet.` clause. Do not remove.
The Datenschutz page is a baseline — have it reviewed before scaling paid traffic.
