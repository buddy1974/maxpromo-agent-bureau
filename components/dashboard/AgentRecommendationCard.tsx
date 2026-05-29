import type { AgentRecommendation } from "@/types/operating-model";

export function AgentRecommendationCard({
  recommendation,
}: {
  recommendation: AgentRecommendation;
}) {
  return (
    <div className="rounded-xl border border-accent/30 bg-accent-soft p-5">
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
        Empfohlenes Team
      </p>
      <h3 className="mt-1 font-semibold text-zinc-50">{recommendation.tier}</h3>
      <p className="mt-2 text-sm text-zinc-300">{recommendation.forSituation}</p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {recommendation.agents.map((a) => (
          <span
            key={a}
            className="rounded-full border border-line bg-ink-900 px-2.5 py-0.5 font-mono text-[10px] text-zinc-400"
          >
            {a}
          </span>
        ))}
      </div>
    </div>
  );
}
