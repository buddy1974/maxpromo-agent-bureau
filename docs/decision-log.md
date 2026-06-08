# Decision Log — Maxpromo Agent Bureau

---

## ADR-001 — Auth + Tenancy Boundary

**Date:** 2026-06-05
**Status:** Approved for implementation planning
**Owner:** Marcel Tabit Akwe (Product Owner)

### Decision

Auth.js / NextAuth v5 with Credentials provider.

### Locked choices

- Email + argon2id-hashed password
- No public signup
- Maxpromo-provisioned accounts only
- JWT session strategy
- JWT carries `userId`, `businessId`, `role`
- `app_users` is the tenant user table
- `businesses` is the tenant root
- One user belongs to one business for now
- Future multi-business access deferred
- Dashboard routes protected behind login
- AI routes protected
- Approval mutation routes protected + ownership check
- Public landing page (`/`) remains open
- `/api/leads` remains public but rate-limited
- Upstash Redis recommended for rate limiting
- Public preview route deferred

### Rejected for now

- Magic link first
- Public self-signup
- Google OAuth first
- DB sessions (server sessions)
- Public dashboard with blocked writes

### Reason

The product is installed/concierge-based, not self-serve SaaS. Account creation is controlled by Maxpromo during client onboarding. This reduces abuse, protects OpenAI cost, and keeps tenant boundaries clear and auditable.

### Security driver

The current system is demo-ready but not ready for real client data until auth, ownership checks, and rate limiting are implemented.

### Implementation order

| Phase | Name | Description |
|-------|------|-------------|
| Auth-0 | Drizzle baseline reconcile | Clean migration tracking before auth columns |
| Auth-1 | Auth foundation | Auth.js, Credentials provider, provisioned users, password_hash |
| Auth-2 | Protect dashboard | Dashboard behind login, login page, logout, session helpers |
| Auth-3 | Protect APIs | requireUser, requireBusinessAccess, ownership checks |
| Auth-4 | Rate limiting | Upstash Redis for leads, AI, approvals, login |
| Auth-5 | Session business context | Remove runtime demo-by-name lookup, session businessId into queries |
| Auth-6 | Demo/admin controls | Guarded demo reset, preview route decision |

---

## ADR-002 — Drizzle Migration Baseline Strategy (Auth-0)

**Date:** 2026-06-08
**Status:** Complete
**Owner:** Marcel Tabit Akwe (Product Owner)

### Decision

Establish a Drizzle migration baseline via file-only `db:generate` before implementing any auth schema changes.

### Outcome

- `0001_sprint3_platform.sql` (manual, untracked) moved to `lib/db/migrations/_archive/`
- Drizzle baseline generated: `0000_burly_black_bird.sql` + `meta/_journal.json` + `meta/0000_snapshot.json`
- Baseline is a **phantom** — schema already applied to Neon; this file must never be re-applied

### Locked rules

- `0000_burly_black_bird.sql` is DO-NOT-APPLY — Neon already has this schema
- `drizzle-kit migrate` must not be used until migration tracking strategy is intentionally revisited
- All future schema changes must go through `db:generate` → review → manual apply via `IF NOT EXISTS` SQL
- Auth-1A migration (`0001_auth_user_columns.sql`) generated for review; not yet applied to Neon

### Migration tracking note

`db:generate` cannot run in the sandbox environment (esbuild IPC restriction). All future migration generation must be run locally by Marcel or executed via manual snapshot construction.

---

## ADR-004 — Auth-1B: NextAuth Foundation

**Date:** 2026-06-08
**Status:** Complete
**Owner:** Marcel Tabit Akwe (Product Owner)

### Decision

NextAuth v4.24.14 (not v5 — v4 is the installed version). JWT strategy. Credentials provider only.

### Files created

| File | Purpose |
|------|---------|
| `auth.ts` | NextAuth config — Credentials provider, JWT/session callbacks |
| `app/api/auth/[...nextauth]/route.ts` | App Router handler (runtime: nodejs) |
| `lib/auth/password.ts` | `hashPassword` / `verifyPassword` (argon2id) |
| `lib/auth/session.ts` | `getCurrentUser`, `requireUser`, `AuthRequiredError` |
| `lib/auth/tenancy.ts` | `getCurrentBusinessId`, `requireCurrentBusiness`, `requireBusinessAccess`, `BusinessAccessError` |
| `types/next-auth.d.ts` | Module augmentation — adds `userId`, `businessId`, `role` to Session/JWT |
| `app/login/page.tsx` | Login page (server component, German UI, dark premium) |
| `components/auth/LoginForm.tsx` | Client island — `signIn("credentials")` call |
| `components/auth/Providers.tsx` | `SessionProvider` wrapper for root layout |
| `app/api/auth-status/route.ts` | GET — returns `{authenticated, user}` via API envelope |

### Updated files

| File | Change |
|------|--------|
| `app/layout.tsx` | Added `Providers` wrapper for SessionProvider |
| `components/dashboard/Sidebar.tsx` | Added logout button (signOut → /login) |
| `.env.example` | Added `AUTH_SECRET`, `NEXTAUTH_URL` |
| `package.json` | Added `next-auth: ^4.24.14`, `argon2: ^0.44.0` to dependencies |

### Locked rules

- `runtime: "nodejs"` on all auth routes — argon2 native bindings are incompatible with Edge
- Session maxAge: 8 hours (JWT)
- `AUTH_SECRET` must never appear in NEXT_PUBLIC_ vars or be committed
- No public signup — accounts provisioned by Maxpromo only
- Error messages are deliberately vague to prevent user enumeration

---

## ADR-003 — Auth-1A: App User Auth Columns

**Date:** 2026-06-08
**Status:** Migration generated — pending Neon apply
**Owner:** Marcel Tabit Akwe (Product Owner)

### Decision

Add two nullable columns to `app_users` as the foundation for Auth.js / NextAuth v5 Credentials provider:

| Column | Type | Purpose |
|--------|------|---------|
| `password_hash` | `text` nullable | argon2id hash of provisioned password |
| `last_login_at` | `timestamp with time zone` nullable | Audit; detect stale accounts |

### Migration file

`lib/db/migrations/0001_auth_user_columns.sql`

### Apply procedure (when approved)

```sql
ALTER TABLE "app_users" ADD COLUMN IF NOT EXISTS "password_hash" text;
ALTER TABLE "app_users" ADD COLUMN IF NOT EXISTS "last_login_at" timestamp with time zone;
```

Use `IF NOT EXISTS` to make apply idempotent.

### Blocked until

Marcel and Opus review the migration SQL before any Neon apply.
Auth-1B (NextAuth install) must not start until columns are confirmed in Neon.

---

---

## ADR-005 — Auth-1C: Operator Provisioning Script

**Date:** 2026-06-08
**Status:** Complete
**Owner:** Marcel Tabit Akwe (Product Owner)

### Decision

Create a local one-off provisioning script (`scripts/provision-operator-user.mjs`) to hash and store credentials for the first operator user (Marcel) in the demo business.

### Rationale

Auth-1B delivers the auth foundation (NextAuth, password helpers, login page) but cannot function without at least one provisioned account. A dedicated local script keeps provisioning:
- Explicit (not automatic, not part of the seed)
- Auditable (logged to stdout with safe summary only)
- Repeatable (idempotent — safe to re-run to rotate credentials)
- Separate from the application codebase (lives in `scripts/`, not app routes)

### Locked rules

- Script MUST be run locally by Marcel only — never in CI, never on Vercel
- OPERATOR_PASSWORD is read from env; never logged or stored plain
- password_hash is never logged
- Script fails safely if demo business is not found (never creates a business)
- Role is "owner" per ADR-001 provisioned account convention; admin/operator roles deferred to Auth-6
- Script uses same argon2id settings as `lib/auth/password.ts` (memoryCost: 65536, timeCost: 3, parallelism: 1)

### Files

| File | Purpose |
|------|---------|
| `scripts/provision-operator-user.mjs` | Provisioning script |
| `package.json` | Added `auth:provision-operator` npm script |


---

## ADR-006 — Auth-2: Dashboard Middleware Protection

**Date:** 2026-06-08
**Status:** Complete
**Owner:** Marcel Tabit Akwe (Product Owner)

### Decision

Use NextAuth v4 `withAuth` middleware in `middleware.ts` to protect `/dashboard/:path*` behind a valid JWT session. Unauthenticated requests redirect to `/login?callbackUrl=<original path>`.

### Locked rules

- Matcher covers `/dashboard/:path*` only
- API routes remain unprotected until Auth-3
- `withAuth` reads `AUTH_SECRET` (via `NEXTAUTH_SECRET ?? AUTH_SECRET` fallback — confirmed in middleware source)
- `authorized` callback: `!!token` — presence of valid JWT is the only Auth-2 requirement. Role/tenant checks are Auth-3.
- `/api/auth/**` must never be in the matcher (would break NextAuth own endpoints)
- `/api/leads`, `/api/auth-status` must remain public

### Open risks post Auth-2

| Route | Risk | Resolved by |
|-------|------|-------------|
| `/api/ai/generate` | Open cost surface | Auth-3 + Auth-4 |
| `/api/approvals/[id]` | Mutable without auth | Auth-3 |
| All other `/api/**` | Unprotected reads | Auth-3 |
| No tenant isolation in queries | All queries use getDemoBusinessId() | Auth-5 |



---

## ADR-007 — Auth-3: API Route Protection + Ownership Checks

**Date:** 2026-06-08
**Status:** Complete
**Owner:** Marcel Tabit Akwe (Product Owner)

### Decision

Protect all non-public API routes with session authentication and business ownership checks using a dedicated guard module (`lib/auth/api-guard.ts`).

### Files created

| File | Purpose |
|------|---------|
| `lib/auth/api-guard.ts` | `requireApiUser`, `requireApiBusinessId`, `assertBusinessAccess`, `unauthorizedResponse`, `forbiddenResponse` |

### Updated files (19 route handlers)

| Route | Change |
|-------|--------|
| `app/api/ai/generate/route.ts` | `requireApiBusinessId()` guard — closes OpenAI cost surface |
| `app/api/ai/status/route.ts` | `requireApiBusinessId()` guard |
| `app/api/demo/status/route.ts` | `requireApiUser()` + owner/operator role check |
| `app/api/approvals/[id]/route.ts` | `requireApiUser()` + businessId ownership check (404-on-mismatch IDOR guard) + actorName from session |
| `app/api/approvals/route.ts` | `requireApiBusinessId()` guard |
| `app/api/activity/route.ts` | `requireApiBusinessId()` guard |
| `app/api/agents/route.ts` | `requireApiBusinessId()` guard |
| `app/api/agents/[id]/route.ts` | `requireApiBusinessId()` guard |
| `app/api/ai-governance/route.ts` | `requireApiBusinessId()` guard |
| `app/api/audit/route.ts` | `requireApiBusinessId()` guard |
| `app/api/client-implementation/route.ts` | `requireApiBusinessId()` guard |
| `app/api/contacts/route.ts` | `requireApiBusinessId()` guard |
| `app/api/dashboard/summary/route.ts` | `requireApiBusinessId()` guard |
| `app/api/documents/route.ts` | `requireApiBusinessId()` guard |
| `app/api/memory/route.ts` | `requireApiBusinessId()` guard |
| `app/api/operating-model/route.ts` | `requireApiBusinessId()` guard |
| `app/api/playbooks/route.ts` | `requireApiBusinessId()` guard |
| `app/api/projects/route.ts` | `requireApiBusinessId()` guard |
| `app/api/tasks/route.ts` | `requireApiBusinessId()` guard |
| `app/api/waiting-room/route.ts` | `requireApiBusinessId()` guard |

### Public routes (intentionally unchanged)

| Route | Reason |
|-------|--------|
| `POST /api/leads` | Lead capture from public landing page — must remain open |
| `GET/POST /api/auth/**` | NextAuth endpoints — must never be in middleware matcher |
| `GET /api/auth-status` | Session polling / health check — safe read-only |

### Locked rules

- Guard pattern: return-instead-of-throw for route handlers (no try/catch boilerplate at 20+ call sites)
- `PATCH /api/approvals/[id]` returns 404 (not 403) on businessId mismatch — IDOR-safe (no tenant existence leak)
- `actorName` in activity logs sourced from `session.user.name ?? session.user.email` (not hardcoded)
- All newly guarded routes that lacked `runtime = "nodejs"` had it added — required by argon2 import chain via auth.ts
- `GET /api/demo/status` requires `role === "owner" || role === "operator"` (internal tooling, not for future client users)

### Route protection matrix

| Layer | Protected by |
|-------|-------------|
| `/dashboard/**` pages | Auth-2: `middleware.ts` + `withAuth` (JWT redirect) |
| All `/api/**` except public routes | Auth-3: `requireApiBusinessId()` in route handler (401 JSON) |
| `/api/approvals/[id]` PATCH | Auth-3: session auth + businessId ownership check (IDOR guard) |
| `/api/demo/status` | Auth-3: session auth + owner/operator role check |
| `/api/leads`, `/api/auth/**`, `/api/auth-status` | Public — intentionally open |

### Open risks post Auth-3

| Risk | Resolved by |
|------|-------------|
| No rate limiting (leads, AI, approvals, login) | Auth-4 |
| All queries still use `getDemoBusinessId()` (demo session only) | Auth-5 |


---

## ADR-008 — Auth-4: API Rate Limiting

**Date:** 2026-06-08
**Status:** Complete
**Owner:** Marcel Tabit Akwe (Product Owner)

### Decision

Add fixed-window rate limiting to public and authenticated API routes using a custom abstraction (`lib/security/rate-limit.ts`) backed by Upstash Redis in production and an in-memory Map in local dev.

### Why no Upstash package dependency

No new npm package required. The Upstash REST API is a plain JSON HTTP endpoint. Direct `fetch` calls are sufficient and avoid adding a dependency + Edge compatibility concerns.

### Files created

| File | Purpose |
|------|---------|
| `lib/security/rate-limit.ts` | `checkRateLimit`, `getClientIp`, pre-configured limit constants |

### Updated files

| File | Change |
|------|--------|
| `app/api/leads/route.ts` | `checkRateLimit(\`leads:\${ip}\`, LEADS_LIMIT)` — 5/60s per IP |
| `app/api/ai/generate/route.ts` | `checkRateLimit(\`ai:\${userId}\`, AI_GENERATE_LIMIT)` — 10/60s per user |
| `app/api/approvals/[id]/route.ts` | `checkRateLimit(\`approvals:\${userId}\`, APPROVALS_LIMIT)` — 20/60s per user |
| `auth.ts` | `checkRateLimit(\`login:\${email}\`, LOGIN_LIMIT)` in `authorize` callback — 10/900s per email |
| `.env.example` | Added `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` |

### Rate limit configuration (single source of truth)

| Route | Key | Limit | Window | Notes |
|-------|-----|-------|--------|-------|
| `POST /api/leads` | `leads:{ip}` | 5 | 60s | IP-keyed; unauthenticated |
| `POST /api/ai/generate` | `ai:{userId}` | 10 | 60s | User-keyed; authenticated |
| `PATCH /api/approvals/[id]` | `approvals:{userId}` | 20 | 60s | User-keyed; authenticated |
| Login | `login:{email}` | 10 | 900s | Email-keyed; in authorize callback |

### Locked rules

- Rate limiter **fails open** on Redis errors — availability over strictness
- In-memory fallback is for local dev only — not suitable for multi-instance production
- All 429 responses return `{ ok: false, error: "rate_limited" }` (project envelope)
- Rate limit check is first in handler execution — rejects before JSON parse / DB access
- `UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN` must be set in Vercel env before real client data is onboarded

### Required production env vars

```
UPSTASH_REDIS_REST_URL=https://YOUR-DB.upstash.io
UPSTASH_REDIS_REST_TOKEN=YOUR-TOKEN
```
Create a free Upstash Redis database at upstash.com → copy REST URL + token.

---

## ADR-009 — Auth-5: Tenant Isolation via Session businessId

**Date:** 2026-06-08
**Status:** Accepted
**Sprint:** Auth-5

### Context

All protected API read queries called `getDemoBusinessId()` — a name-based lookup
that returns the single demo business. This is not safe for multi-tenant usage:
any authenticated user would read the same business data regardless of which
business their session belongs to.

### Decision

1. Each query function in `lib/db/queries/` now accepts `businessId: string` as
   an explicit parameter and passes it to the Drizzle `where` clause.
2. Route handlers source `businessId` from `requireApiBusinessId()` (the Auth-3
   guard), which reads `session.user.businessId`.
3. `getDemoBusinessId()` is retained in `lib/db/queries/_shared.ts` for backward
   compat with seed scripts only — it is never called from route handlers.
4. `app/api/demo/status/route.ts` updated: `auth.user.businessId` replaces the
   `getDemoBusinessId()` call.

### Query files updated

`activity`, `agents`, `approvals`, `audit`, `dashboard`, `documents`,
`governance`, `playbooks`, `waiting-room`

### Consequences

- Cross-tenant data leakage is structurally prevented in the query layer.
- TypeScript enforces `businessId` presence — callers cannot omit it.
- Seed scripts are unaffected (they call `getDemoBusinessId()` directly).
- Risk 4 in `known-risks.md` is resolved.
