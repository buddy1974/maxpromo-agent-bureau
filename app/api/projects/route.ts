import { apiOk } from "@/lib/api/response";
import { MOCK_PROJECTS } from "@/lib/mock/projects";

// TODO(sprint-3): org-scoped DB read.
export async function GET() {
  return apiOk(MOCK_PROJECTS);
}
