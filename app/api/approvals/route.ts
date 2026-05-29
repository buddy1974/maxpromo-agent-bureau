import { apiOk } from "@/lib/api/response";
import { MOCK_APPROVALS } from "@/lib/mock/approvals";

// TODO(sprint-3): list real agent_proposals (org-scoped). POST approve/reject
// will be added with the guardrails sprint — deliberately NOT implemented here
// so no agent action can be executed without the full audit + auth path.
export async function GET() {
  return apiOk(MOCK_APPROVALS);
}
