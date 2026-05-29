import type { AgentRiskLevel, ApprovalStatus } from "./agent";

// Approval Desk types — the trust & safety layer. Extends the proposal concept
// from types/agent.ts with a reviewable timeline + risk summary.

export interface ApprovalTimelineEvent {
  id: string;
  /** ISO timestamp. */
  at: string;
  step: "observed" | "prepared" | "proposed" | "reviewed" | "executed" | "logged";
  label: string;
}

export interface ApprovalRisk {
  level: AgentRiskLevel;
  /** What could go wrong if approved blindly. */
  concern: string;
  mitigation: string;
}

export interface ApprovalDeskItem {
  id: string;
  proposalTitle: string;
  agentName: string;
  businessContext: string;
  proposedAction: string;
  expectedResult: string;
  status: ApprovalStatus;
  risk: ApprovalRisk;
  timeline: ApprovalTimelineEvent[];
  createdAt: string;
}
