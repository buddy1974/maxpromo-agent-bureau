import { apiOk } from "@/lib/api/response";
import {
  OPERATING_STAGES,
  SAFE_ACTION_LIFECYCLE,
  AGENT_RECOMMENDATIONS,
} from "@/lib/core/operating-model";
import { AGENT_HIERARCHY } from "@/lib/core/agent-hierarchy";
import { MOCK_MANUAL_DELIVERY_NOTES } from "@/lib/mock/operating-model";

// The backbone, as data. Static/config — safe to expose read-only.
export async function GET() {
  return apiOk({
    stages: OPERATING_STAGES,
    lifecycle: SAFE_ACTION_LIFECYCLE,
    recommendations: AGENT_RECOMMENDATIONS,
    hierarchy: AGENT_HIERARCHY,
    manualDeliveryNotes: MOCK_MANUAL_DELIVERY_NOTES,
  });
}
