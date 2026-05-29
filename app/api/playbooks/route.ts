import { apiOk } from "@/lib/api/response";
import { getPlaybooks } from "@/lib/db/queries/playbooks";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return apiOk(await getPlaybooks());
}
