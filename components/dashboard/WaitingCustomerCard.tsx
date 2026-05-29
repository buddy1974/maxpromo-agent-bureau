import type { WaitingRoomItem } from "@/types/waiting-room";

const URGENCY_STYLE = {
  low: "text-zinc-500",
  medium: "text-amber-400",
  high: "text-orange-400",
  urgent: "text-red-400",
} as const;

const CHANNEL_LABEL = {
  whatsapp: "WhatsApp",
  email: "E-Mail",
  phone: "Telefon",
  website_form: "Webformular",
  social: "Social",
} as const;

export function WaitingCustomerCard({ item }: { item: WaitingRoomItem }) {
  return (
    <div className="rounded-xl border border-line bg-ink-850 p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold text-zinc-100">{item.customerName}</h3>
          <p className="text-xs text-zinc-500">
            {item.company ?? "—"} · {CHANNEL_LABEL[item.channel]}
          </p>
        </div>
        <span className={`font-mono text-[11px] uppercase tracking-[0.12em] ${URGENCY_STYLE[item.urgency]}`}>
          wartet {item.waitingFor}
        </span>
      </div>
      <p className="mt-2 text-sm text-zinc-400">{item.reason}</p>
      <div className="mt-3 rounded-lg border border-line bg-ink-900 p-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-600">
          Vorbereitete nächste Aktion (nicht gesendet)
        </p>
        <p className="mt-1 text-sm text-zinc-300">{item.suggestedAction}</p>
      </div>
      <div className="mt-3 flex items-center justify-between text-xs text-zinc-500">
        <span>{item.assignedAgent}</span>
        <span className="font-mono uppercase tracking-[0.12em] text-accent">
          {item.approvalStatus === "pending" ? "Approval Required" : item.approvalStatus}
        </span>
      </div>
    </div>
  );
}
