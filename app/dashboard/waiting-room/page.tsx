import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { WaitingRoomQueue } from "@/components/dashboard/WaitingRoomQueue";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { getWaitingRoom } from "@/lib/db/queries/waiting-room";
import type { WaitingRoomItem } from "@/types/waiting-room";

// Module 2 — Customer Waiting Room. DB-backed. Prepared responses only; nothing sent.
export const dynamic = "force-dynamic";

export default async function WaitingRoomPage() {
  const rows = await getWaitingRoom();

  // Map DB rows -> WaitingRoomItem (table has no approvalStatus/businessImpact cols).
  const items: WaitingRoomItem[] = rows.map((w) => ({
    id: w.id,
    customerName: w.customerName,
    company: w.company ?? undefined,
    channel: w.channel as WaitingRoomItem["channel"],
    reason: w.reason ?? "",
    waitingFor: w.waitingFor ?? "",
    urgency: w.urgency as WaitingRoomItem["urgency"],
    status: w.status as WaitingRoomItem["status"],
    suggestedAction: w.suggestedAction ?? "",
    assignedAgent: w.assignedAgent ?? "",
    approvalStatus: "pending",
    businessImpact: "",
  }));

  return (
    <DashboardShell title="Kunden-Warteraum">
      <div className="space-y-6">
        <div className="rounded-xl border border-line bg-ink-850 p-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
            Wer wartet auf eine Antwort?
          </p>
          <p className="mt-2 text-sm text-zinc-300">
            Antworten werden vorbereitet — gesendet wird erst nach Ihrer Freigabe.
            Keine ausgehende Nachricht wurde ausgeführt.
          </p>
        </div>

        {items.length ? (
          <WaitingRoomQueue items={items} />
        ) : (
          <EmptyState
            title="Niemand im Warteraum"
            hint="Führen Sie den Demo-Seed aus: npm run db:seed:demo"
            glyph="◷"
          />
        )}
      </div>
    </DashboardShell>
  );
}
