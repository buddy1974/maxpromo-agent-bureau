import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { BriefingPanel } from "@/components/dashboard/BriefingPanel";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { MOCK_DASHBOARD_SUMMARY } from "@/lib/mock/dashboard";

export default function BriefingPage() {
  const s = MOCK_DASHBOARD_SUMMARY;
  return (
    <DashboardShell title="Briefing">
      <div className="space-y-8">
        <BriefingPanel briefing={s.briefing} />
        <section>
          <h2 className="mb-3 text-base font-semibold text-zinc-100">
            Wie das Briefing entstanden ist
          </h2>
          <div className="rounded-xl border border-line bg-ink-850 px-4">
            <ActivityFeed items={s.recentActivity} />
          </div>
        </section>
      </div>
    </DashboardShell>
  );
}
