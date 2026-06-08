import { apiOk } from "@/lib/api/response";
import { requireApiBusinessId } from "@/lib/auth/api-guard";
import { getActivity } from "@/lib/db/queries/activity";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  // Auth-3: require authenticated session before returning activity data.
  const auth = await requireApiBusinessId();
  if (!auth.ok) return auth.response;

  return apiOk(await getActivity());
}
