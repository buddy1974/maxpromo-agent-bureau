import { apiOk } from "@/lib/api/response";
import { requireApiBusinessId } from "@/lib/auth/api-guard";
import { getPlaybooks } from "@/lib/db/queries/playbooks";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  // Auth-3: require authenticated session before returning playbooks.
  const auth = await requireApiBusinessId();
  if (!auth.ok) return auth.response;

  return apiOk(await getPlaybooks());
}
