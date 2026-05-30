import { sql, eq } from "drizzle-orm";
import { apiOk } from "@/lib/api/response";
import { getDb } from "@/lib/db";
import {
  agents,
  agentProposals,
  waitingRoomItems,
  documentIntakeItems,
  playbooks,
  activityLogs,
} from "@/lib/db/schema";
import { getDemoBusinessId, safeRead } from "@/lib/db/queries/_shared";

// Read-only demo workspace status. GET only — no writes, no reset, no delete.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const data = await safeRead(
    async () => {
      const businessId = await getDemoBusinessId();
      if (!businessId) {
        return {
          businessExists: false,
          agents: 0,
          proposals: 0,
          waitingRoom: 0,
          documents: 0,
          playbooks: 0,
          activityLogs: 0,
        };
      }
      const db = getDb();
      const n = sql<number>`count(*)::int`;
      const [a, p, w, d, pb, act] = await Promise.all([
        db.select({ n }).from(agents).where(eq(agents.businessId, businessId)),
        db.select({ n }).from(agentProposals).where(eq(agentProposals.businessId, businessId)),
        db.select({ n }).from(waitingRoomItems).where(eq(waitingRoomItems.businessId, businessId)),
        db.select({ n }).from(documentIntakeItems).where(eq(documentIntakeItems.businessId, businessId)),
        db.select({ n }).from(playbooks).where(eq(playbooks.businessId, businessId)),
        db.select({ n }).from(activityLogs).where(eq(activityLogs.businessId, businessId)),
      ]);
      return {
        businessExists: true,
        agents: a[0]?.n ?? 0,
        proposals: p[0]?.n ?? 0,
        waitingRoom: w[0]?.n ?? 0,
        documents: d[0]?.n ?? 0,
        playbooks: pb[0]?.n ?? 0,
        activityLogs: act[0]?.n ?? 0,
      };
    },
    {
      businessExists: false,
      agents: 0,
      proposals: 0,
      waitingRoom: 0,
      documents: 0,
      playbooks: 0,
      activityLogs: 0,
    },
  );
  return apiOk(data);
}
