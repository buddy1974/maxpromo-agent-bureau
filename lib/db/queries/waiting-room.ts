import { eq } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { waitingRoomItems } from "@/lib/db/schema";
import { getDemoBusinessId, safeRead } from "./_shared";

// Read-only. Waiting-room items for the demo workspace.
export async function getWaitingRoom() {
  return safeRead(async () => {
    const businessId = await getDemoBusinessId();
    if (!businessId) return [];
    const db = getDb();
    return db
      .select()
      .from(waitingRoomItems)
      .where(eq(waitingRoomItems.businessId, businessId));
  }, [] as (typeof waitingRoomItems.$inferSelect)[]);
}
