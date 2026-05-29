import { apiOk } from "@/lib/api/response";
import { getWaitingRoom } from "@/lib/db/queries/waiting-room";

// Read-only. No outbound send from here.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return apiOk(await getWaitingRoom());
}
