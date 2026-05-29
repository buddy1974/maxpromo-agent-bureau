import { apiOk } from "@/lib/api/response";
import { PLAYBOOKS } from "@/lib/core/playbooks";

// Playbook library — config data, read-only.
export async function GET() {
  return apiOk(PLAYBOOKS);
}
