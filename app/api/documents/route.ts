import { apiOk } from "@/lib/api/response";
import { getDocuments } from "@/lib/db/queries/documents";

// Read-only. No OCR/upload pipeline.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return apiOk(await getDocuments());
}
