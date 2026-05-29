import { apiOk } from "@/lib/api/response";
import { MOCK_DOCUMENTS } from "@/lib/mock/documents";

// TODO(sprint-4): real intake items. No OCR/upload pipeline here.
export async function GET() {
  return apiOk(MOCK_DOCUMENTS);
}
