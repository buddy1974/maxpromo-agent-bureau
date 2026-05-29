import { apiOk } from "@/lib/api/response";
import { MOCK_CONTACTS } from "@/lib/mock/contacts";

// TODO(sprint-3): org-scoped DB read.
export async function GET() {
  return apiOk(MOCK_CONTACTS);
}
