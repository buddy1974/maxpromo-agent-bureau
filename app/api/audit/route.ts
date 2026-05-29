import { apiOk } from "@/lib/api/response";
import { MOCK_AUDIT_SESSIONS } from "@/lib/mock/audit";

// TODO(sprint-4): org-scoped audit sessions from DB.
export async function GET() {
  return apiOk(MOCK_AUDIT_SESSIONS);
}
