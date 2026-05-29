import { apiOk } from "@/lib/api/response";
import { MOCK_TASKS } from "@/lib/mock/tasks";

// TODO(sprint-3): org-scoped DB read. POST guarded + Zod-validated when wired.
export async function GET() {
  return apiOk(MOCK_TASKS);
}
