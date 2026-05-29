import { apiOk } from "@/lib/api/response";
import { getGovernance } from "@/lib/db/queries/governance";

// Read-only assessment data. No real tool scanning.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return apiOk(await getGovernance());
}
