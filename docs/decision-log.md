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
