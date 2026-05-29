import { apiOk } from "@/lib/api/response";
import { MOCK_DASHBOARD_SUMMARY } from "@/lib/mock/dashboard";

// TODO(sprint-3): replace mock with real org-scoped DB aggregation.
export async function GET() {
  return apiOk(MOCK_DASHBOARD_SUMMARY);
}
