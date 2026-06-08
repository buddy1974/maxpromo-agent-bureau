import { apiOk, apiError } from "@/lib/api/response";
import { requireApiUser } from "@/lib/auth/api-guard";
import { approvalActionSchema } from "@/lib/validation/approval";
import {
  getProposalById,
  updateProposalStatus,
  createApprovalEvent,
} from "@/lib/db/queries/approvals";
import { createActivityLog } from "@/lib/db/queries/activity";
import type { ApprovalStatus } from "@/types/agent";
import type { ApprovalAction, ApprovalTransitionResult } from "@/types/approval";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ACTIVITY_ACTION: Record<ApprovalAction, string> = {
  approve: "approval_approved",
  reject: "approval_rejected",
  mark_reviewed: "approval_reviewed",
};

const DECISION_NOTE: Record<ApprovalAction, string> = {
  approve: "Freigegeben für den Demo-Workflow. Keine ausgehende Aktion ausgeführt.",
  reject: "Vorschlag abgelehnt. Keine Aktion ausgeführt.",
  mark_reviewed: "Geprüft. Status bleibt offen, keine Aktion ausgeführt.",
};

/**
 * Supervised approval transition. PATCH only. SAFETY: this records a human
 * decision + audit trail; it NEVER executes the proposed real-world action,
 * sends messages, or calls external services.
 *
 * Auth-3: session required + ownership check.
 *   - 401 if no valid session
 *   - 403 if proposal.businessId does not match session.user.businessId (IDOR guard)
 *   - 404 if proposal not found (same shape whether businessId mismatch or missing)
 *
 * Transitions (only from `pending`):
 *   approve       -> approved
 *   reject        -> rejected
 *   mark_reviewed -> (status unchanged; records a review event)
 */
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  // Auth-3: require authenticated session before any mutation.
  const auth = await requireApiUser();
  if (!auth.ok) return auth.response;

  const { id } = await params;

  // Basic id sanity (uuid-ish). Avoids hitting the DB with junk.
  if (!/^[0-9a-fA-F-]{16,}$/.test(id)) {
    return apiError("invalid_id", 400);
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return apiError("invalid_json", 400);
  }

  const parsed = approvalActionSchema.safeParse(body);
  if (!parsed.success) {
    return apiError("invalid_action", 422, parsed.error.flatten().fieldErrors);
  }
  const action = parsed.data.action as ApprovalAction;
  const note = parsed.data.note?.trim() || DECISION_NOTE[action];

  try {
    const proposal = await getProposalById(id);

    // Auth-3 ownership check: if the proposal exists but belongs to a different
    // business, return 404 (not 403) — avoids leaking existence of other tenants'
    // proposals. Only the owning business should know the proposal exists.
    if (!proposal || proposal.businessId !== auth.user.businessId) {
      return apiError("not_found", 404);
    }

    // Only pending proposals can be acted on (prevents double-decision).
    if (proposal.status !== "pending") {
      return apiError(`already_${proposal.status}`, 409);
    }

    // Determine resulting status. mark_reviewed leaves status pending.
    const newStatus: ApprovalStatus =
      action === "approve"
        ? "approved"
        : action === "reject"
          ? "rejected"
          : "pending";

    if (newStatus !== proposal.status) {
      await updateProposalStatus(id, newStatus);
    }

    // Audit trail: one approval_event (lifecycle step "reviewed" = human decided).
    await createApprovalEvent({
      businessId: proposal.businessId,
      proposalId: proposal.id,
      step: "reviewed",
      actor: "user",
      note,
    });

    // Activity log — actor name sourced from session (not hardcoded).
    // WHY: Auth-3 requirement; ensures the audit trail reflects the real operator.
    const actorName = auth.user.name ?? auth.user.email ?? "Operator";
    await createActivityLog({
      businessId: proposal.businessId,
      actor: "user",
      actorName,
      action: ACTIVITY_ACTION[action],
      target: proposal.title,
      detail: "Keine ausgehende Aktion ausgeführt. Wartet auf überwachte Ausführungs-Schicht.",
    });

    const result: ApprovalTransitionResult = {
      proposalId: proposal.id,
      status: newStatus,
      action,
      decidedAt: new Date().toISOString(),
    };
    return apiOk(result);
  } catch (err) {
    console.error("[approvals PATCH] failed:", err);
    return apiError("server", 500);
  }
}
