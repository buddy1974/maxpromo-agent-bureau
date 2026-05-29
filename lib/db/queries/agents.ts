import { eq } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { agents } from "@/lib/db/schema";
import { getDemoBusinessId, safeRead } from "./_shared";

// Read-only. Agents for the demo workspace, ordered by name.
export async function getAgents() {
  return safeRead(async () => {
    const businessId = await getDemoBusinessId();
    if (!businessId) return [];
    const db = getDb();
    return db.select().from(agents).where(eq(agents.businessId, businessId));
  }, [] as (typeof agents.$inferSelect)[]);
}
