import { apiOk } from "@/lib/api/response";
import { getAuditOverview } from "@/lib/db/queries/audit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return apiOk(await getAuditOverview());
}
