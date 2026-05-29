import { getAgents } from "./agents";
import { getProposals } from "./approvals";
import { getActivity } from "./activity";
import { getWaitingRoom } from "./waiting-room";
import { getAuditOverview } from "./audit";

export interface DashboardData {
  agents: Awaited<ReturnType<typeof getAgents>>;
  proposals: Awaited<ReturnType<typeof getProposals>>;
  activity: Awaited<ReturnType<typeof getActivity>>;
  waiting: Awaited<ReturnType<typeof getWaitingRoom>>;
  audit: Awaited<ReturnType<typeof getAuditOverview>>;
  /** True when the demo workspace has no data yet (prompt to run the seed). */
  empty: boolean;
}

// Read-only composite for the overview page. Each underlying query is already
// resilient (returns empty on no-DB / no-seed), so this never throws.
export async function getDashboardData(): Promise<DashboardData> {
  const [agents, proposals, activity, waiting, audit] = await Promise.all([
    getAgents(),
    getProposals(),
    getActivity(8),
    getWaitingRoom(),
    getAuditOverview(),
  ]);
  const empty =
    agents.length === 0 &&
    proposals.length === 0 &&
    activity.length === 0 &&
    waiting.length === 0 &&
    !audit.session;
  return { agents, proposals, activity, waiting, audit, empty };
}
