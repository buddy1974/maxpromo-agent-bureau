import { apiOk } from "@/lib/api/response";
import { getDashboardData } from "@/lib/db/queries/dashboard";

// Reads the demo workspace from Neon (resilient: empty data if no DB / unseeded).
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return apiOk(await getDashboardData());
}
