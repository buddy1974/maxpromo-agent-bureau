import { desc, eq } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { activityLogs } from "@/lib/db/schema";
import { getDemoBusinessId, safeRead } from "./_shared";

// Read-only. Most recent activity for the demo workspace.
export async function getActivity(limit = 20) {
  return safeRead(async () => {
    const businessId = await getDemoBusinessId();
    if (!businessId) return [];
    const db = getDb();
    return db
      .select()
      .from(activityLogs)
      .where(eq(activityLogs.businessId, businessId))
      .orderBy(desc(activityLogs.createdAt))
      .limit(limit);
  }, [] as (typeof activityLogs.$inferSelect)[]);
}
