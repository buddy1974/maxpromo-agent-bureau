import { eq } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { agentProposals } from "@/lib/db/schema";
import { getDemoBusinessId, safeRead } from "./_shared";

// Read-only. Pending agent proposals (the approval queue) for the demo workspace.
export async function getProposals() {
  return safeRead(async () => {
    const businessId = await getDemoBusinessId();
    if (!businessId) return [];
    const db = getDb();
    return db
      .select()
      .from(agentProposals)
      .where(eq(agentProposals.businessId, businessId));
  }, [] as (typeof agentProposals.$inferSelect)[]);
}
