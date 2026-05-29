import { apiOk } from "@/lib/api/response";
import { MOCK_CLIENT_IMPLEMENTATIONS } from "@/lib/mock/client-implementation";

// TODO(sprint-4): real client install records (org-scoped).
export async function GET() {
  return apiOk(MOCK_CLIENT_IMPLEMENTATIONS);
}
