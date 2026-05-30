import { apiOk } from "@/lib/api/response";
import { getAIConfig } from "@/config/env";

// Read-only AI readiness. Never returns the API key.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const { provider, model, configured } = getAIConfig();
  return apiOk({ provider, model, configured });
}
