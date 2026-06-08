import { apiOk } from "@/lib/api/response";
import { requireApiBusinessId } from "@/lib/auth/api-guard";
import { getDocuments } from "@/lib/db/queries/documents";

// Read-only. No OCR/upload pipeline.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  // Auth-3: require authenticated session before returning documents.
  const auth = await requireApiBusinessId();
  if (!auth.ok) return auth.response;

  return apiOk(await getDocuments());
}
