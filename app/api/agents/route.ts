import { apiOk } from "@/lib/api/response";
import { AGENTS } from "@/lib/registry/agents";

// TODO(sprint-3): merge registry definitions with per-org enable/config from DB.
export async function GET() {
  return apiOk(AGENTS);
}
