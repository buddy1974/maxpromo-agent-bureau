import { apiOk } from "@/lib/api/response";
import { MOCK_MEMORY } from "@/lib/mock/memory";

// TODO(sprint-3): org-scoped DB read + pgvector semantic search.
export async function GET() {
  return apiOk(MOCK_MEMORY);
}
