import { apiOk } from "@/lib/api/response";
import { MOCK_WAITING_ROOM } from "@/lib/mock/waiting-room";

// TODO(sprint-4): real waiting-room items. No outbound send from here.
export async function GET() {
  return apiOk(MOCK_WAITING_ROOM);
}
