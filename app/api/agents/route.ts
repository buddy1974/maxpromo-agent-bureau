import { apiOk } from "@/lib/api/response";
import { getAgents } from "@/lib/db/queries/agents";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return apiOk(await getAgents());
}
