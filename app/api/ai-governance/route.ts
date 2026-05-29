import { apiOk } from "@/lib/api/response";
import {
  MOCK_AI_TOOLS,
  MOCK_GOVERNANCE_RISKS,
  MOCK_POLICY_CHECKLIST,
  MOCK_DATA_SENSITIVITY,
} from "@/lib/mock/ai-governance";

// TODO(sprint-4): persist governance assessments. No real tool scanning.
export async function GET() {
  return apiOk({
    tools: MOCK_AI_TOOLS,
    risks: MOCK_GOVERNANCE_RISKS,
    policy: MOCK_POLICY_CHECKLIST,
    dataSensitivity: MOCK_DATA_SENSITIVITY,
  });
}
