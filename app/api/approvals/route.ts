import { apiOk } from "@/lib/api/response";
import { getProposals } from "@/lib/db/queries/approvals";

// Read-only. POST approve/reject is intentionally NOT implemented — no execution
// path until auth + audit + ownership land (Sprint 5).
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return apiOk(await getProposals());
}
