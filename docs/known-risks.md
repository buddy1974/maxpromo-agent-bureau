# Known Risks — Maxpromo Agent Bureau

Last updated: 2026-06-08 (Auth-1C complete)

---

## P0 — Critical (block real client data)

| # | Risk | Detail |
|---|------|--------|
| 1 | Dashboard routes are public | All `/dashboard/**` pages are accessible without authentication. Any person with the URL can view the full dashboard. |
| 2 | `/api/ai/generate` is a public cost surface | Anyone who discovers the endpoint can trigger OpenAI calls at Maxpromo's expense. No auth, no rate limiting. |
| 3 | `/api/approvals/[id]` is mutable without auth | PATCH mutations on approval decisions require no session, no ownership check. Any caller can approve or reject. |
| 4 | No tenant isolation | All queries use `getDemoBusinessId()` — a name-based lookup returning the demo business. There is no session-derived `businessId`, no per-tenant access boundary. |
| 5 | No rate limiting | No protection on any route against abuse, scraping, or cost attacks. |

**Rule:** Do not onboard real client data until Auth-1 through Auth-4 are complete.

---

## P1 — High (must resolve before scaling)

| # | Risk | Detail |
|---|------|--------|
| 6 | ~~Drizzle migration baseline/journal reconciled~~ | **RESOLVED — Auth-0 complete.** Baseline `0000_burly_black_bird.sql` is DO-NOT-APPLY. `0001_auth_user_columns.sql` generated for review. Neon apply pending Marcel + Opus approval. |
| 7 | Real client data must not enter the system before Auth-1 to Auth-4 complete | The current demo state contains seeded test data only. Real business data requires tenant isolation and ownership checks first. |
| 8 | Datenschutz must be updated before scaling paid traffic or handling real client dashboard data | Current privacy policy may not reflect actual data flows once client tenants are active. |
| 9 | Telegram lead notifications carry lead PII | Lead name and email are sent to a Telegram bot on every form submission. This is documented and intentional but must remain auditable and disclosed in Datenschutz. |
| 10 | OpenAI usage has no cost logging | No per-request cost tracking. Usage cannot be attributed to a tenant, audited, or capped. |

---

## P2 — Medium (acceptable during concierge phase)

| # | Risk | Detail |
|---|------|--------|
| 11 | Manual password reset only | During concierge onboarding, password reset will be manual (Maxpromo-operator action). Self-serve reset deferred. Acceptable while user count is small. |
| 12 | No MFA | Single-factor auth only in Auth-1. MFA deferred. |
| 13 | Demo workspace depends on name lookup at runtime | `getDemoBusinessId()` uses `DEMO_BUSINESS_NAME` string lookup in all query files. Must be replaced with session `businessId` in Auth-5. |
| 14 | Some dashboard pages still use config/mock data | Dashboard modules sourced from static config or mock queries. Must be verified against live Neon data before client onboarding. |
| 15 | Mobile dashboard nav needs improvement | Current sidebar/nav layout has known mobile UX gaps. Not a security risk, but noted for pre-launch readiness. |

---

## Resolution path

Risks 1–5 are resolved by Auth-1 through Auth-4.
Risk 6 is resolved by Auth-0.
Risks 7–10 require process and documentation steps alongside Auth implementation.
Risks 11–15 are acceptable during concierge phase and tracked for later sprints.
