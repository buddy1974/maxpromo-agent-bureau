import { apiOk, apiError } from "@/lib/api/response";
import { getAgentById } from "@/lib/registry/agents";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const agent = getAgentById(id);
  if (!agent) return apiError("not_found", 404);
  return apiOk(agent);
}
