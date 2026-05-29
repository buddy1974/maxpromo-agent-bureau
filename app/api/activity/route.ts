import { apiOk } from "@/lib/api/response";
import { MOCK_ACTIVITY } from "@/lib/mock/activity";

// TODO(sprint-3): org-scoped DB read from activity_logs.
export async function GET() {
  return apiOk(MOCK_ACTIVITY);
}
