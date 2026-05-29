import { eq } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { auditSessions, auditFindings } from "@/lib/db/schema";
import { getDemoBusinessId, safeRead } from "./_shared";

// Read-only. Latest demo audit session + its findings.
export async function getAuditOverview() {
  return safeRead(
    async () => {
      const businessId = await getDemoBusinessId();
      if (!businessId) return { session: null, findings: [] };
      const db = getDb();
      const [session] = await db
        .select()
        .from(auditSessions)
        .where(eq(auditSessions.businessId, businessId))
        .limit(1);
      if (!session) return { session: null, findings: [] };
      const findings = await db
        .select()
        .from(auditFindings)
        .where(eq(auditFindings.sessionId, session.id));
      return { session, findings };
    },
    {
      session: null as typeof auditSessions.$inferSelect | null,
      findings: [] as (typeof auditFindings.$inferSelect)[],
    },
  );
}
