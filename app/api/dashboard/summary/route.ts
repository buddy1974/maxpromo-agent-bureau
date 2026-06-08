import { apiOk } from "@/lib/api/response";
import { requireApiBusinessId } from "@/lib/auth/api-guard";
import { getDashboardData } from "@/lib/db/queries/dashboard";

// Reads the demo workspace from Neon (resilient: empty data if no DB / unseeded).
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  // Auth-3: require authenticated session before returning dashboard summary.
  const auth = await requireApiBusinessId();
  if (!auth.ok) return auth.response;

  return apiOk(await getDashboardData());
}
