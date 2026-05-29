import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { WaitingRoomQueue } from "@/components/dashboard/WaitingRoomQueue";
import { MOCK_WAITING_ROOM } from "@/lib/mock/waiting-room";

// Module 2 — Customer Waiting Room. Who is waiting and what needs a response.
// Prepared/suggested responses only — NEVER sends real messages.
export default function WaitingRoomPage() {
  return (
    <DashboardShell title="Kunden-Warteraum">
      <div className="space-y-6">
        <div className="rounded-xl border border-line bg-ink-850 p-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
            Wer wartet auf eine Antwort?
          </p>
          <p className="mt-2 text-sm text-zinc-300">
            Verpasste Anfragen, vergessene Leads und wartende Kunden an einem Ort.
            Antworten werden vorbereitet — gesendet wird erst nach Ihrer Freigabe.
          </p>
        </div>

        <WaitingRoomQueue items={MOCK_WAITING_ROOM} />
      </div>
    </DashboardShell>
  );
}
