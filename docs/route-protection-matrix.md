# Route Protection Matrix — Maxpromo Agent Bureau

Last updated: 2026-06-05

---

## Page Routes

| Route | Current Status | Target Status | Protection Needed | Notes |
|-------|---------------|---------------|-------------------|-------|
| `/` | Public | Public | None | Landing page, lead capture CTA |
| `/impressum` | Public | Public | None | Legal requirement |
| `/datenschutz` | Public | Public | None | Legal requirement |
| `/dashboard` | Public (no auth) | Protected | Auth session required | Redirect to `/login` if no session |
| `/dashboard/briefing` | Public (no auth) | Protected | Auth session required | |
| `/dashboard/agents` | Public (no auth) | Protected | Auth session required | |
| `/dashboard/ai-lab` | Public (no auth) | Protected | Auth session required | Correct route; `/ai-lab` is not a route |
| `/dashboard/approvals` | Public (no auth) | Protected | Auth session required | |
| `/dashboard/audit` | Public (no auth) | Protected | Auth session required | |
| `/dashboard/client-implementation` | Public (no auth) | Protected | Auth session required | |
| `/dashboard/ai-governance` | Public (no auth) | Protected | Auth session required | |
| `/dashboard/contacts` | Public (no auth) | Protected | Auth session required | |
| `/dashboard/documents` | Public (no auth) | Protected | Auth session required | |
| `/dashboard/memory` | Public (no auth) | Protected | Auth session required | |
| `/dashboard/operating-model` | Public (no auth) | Protected | Auth session required | |
| `/dashboard/playbooks` | Public (no auth) | Protected | Auth session required | |
| `/dashboard/projects` | Public (no auth) | Protected | Auth session required | |
| `/dashboard/research` | Public (no auth) | Protected | Auth session required | |
| `/dashboard/settings` | Public (no auth) | Protected | Auth session required | |
| `/dashboard/tasks` | Public (no auth) | Protected | Auth session required | |
| `/dashboard/waiting-room` | Public (no auth) | Protected | Auth session required | |
| `/login` | Does not exist | Must create | None (public) | Created in Auth-2 |

---

## API Routes

| Route | Method | Current Status | Target Status | Protection Needed | Notes |
|-------|--------|---------------|---------------|-------------------|-------|
| `/api/leads` | POST | Public | Public + rate-limited | Rate limit only | Lead capture must stay public |
| `/api/dashboard/summary` | GET | Public (no auth) | Protected | Auth session + businessId scope | |
| `/api/agents` | GET | Public (no auth) | Protected | Auth session + businessId scope | |
| `/api/agents/[id]` | GET | Public (no auth) | Protected | Auth session + businessId scope | |
| `/api/activity` | GET | Public (no auth) | Protected | Auth session + businessId scope | |
| `/api/ai-governance` | GET | Public (no auth) | Protected | Auth session + businessId scope | |
| `/api/approvals` | GET | Public (no auth) | Protected | Auth session + businessId scope | |
| `/api/approvals/[id]` | PATCH | Public (no auth) | Protected + ownership + rate-limited | Auth session + ownership check + rate limit | **Critical: currently writable without auth** |
| `/api/audit` | GET | Public (no auth) | Protected | Auth session + businessId scope | |
| `/api/client-implementation` | GET | Public (no auth) | Protected | Auth session + businessId scope | |
| `/api/contacts` | GET | Public (no auth) | Protected | Auth session + businessId scope | |
| `/api/documents` | GET | Public (no auth) | Protected | Auth session + businessId scope | |
| `/api/memory` | GET | Public (no auth) | Protected | Auth session + businessId scope | |
| `/api/operating-model` | GET | Public (no auth) | Protected | Auth session + businessId scope | |
| `/api/playbooks` | GET | Public (no auth) | Protected | Auth session + businessId scope | |
| `/api/projects` | GET | Public (no auth) | Protected | Auth session + businessId scope | |
| `/api/tasks` | GET | Public (no auth) | Protected | Auth session + businessId scope | |
| `/api/waiting-room` | GET | Public (no auth) | Protected | Auth session + businessId scope | |
| `/api/ai/status` | GET | Public (no auth) | Protected | Auth session required | |
| `/api/ai/generate` | POST | Public (no auth) | Protected + rate-limited | Auth session + rate limit | **Critical: currently an open cost surface** |
| `/api/demo/status` | GET | Public (no auth) | Protected (admin/operator only) | Auth session + role check (admin/operator) | Must not be accessible to standard tenant users |

---

## Notes

- All protected dashboard pages will be covered by a single `middleware.ts` matcher in Auth-2.
- Individual API route protection (`requireUser`, `requireBusinessAccess`) applied in Auth-3.
- Rate limiting applied via Upstash Redis middleware in Auth-4.
- `getDemoBusinessId()` in all query files is replaced with session `businessId` in Auth-5.
- Vercel preview URLs (maxpromo-agent-bureau.vercel.app) must not be treated as public-facing. They expose the same unprotected routes. Resolved implicitly by Auth-2 + Auth-3.
