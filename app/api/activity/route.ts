import { apiOk } from "@/lib/api/response";
import { getActivity } from "@/lib/db/queries/activity";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return apiOk(await getActivity());
}
