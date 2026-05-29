import type { Task, TaskStatus, TaskPriority } from "@/types/task";

const STATUS_LABEL: Record<TaskStatus, string> = {
  todo: "Offen",
  in_progress: "In Arbeit",
  blocked: "Blockiert",
  done: "Erledigt",
  cancelled: "Abgebrochen",
};

const PRIORITY_COLOR: Record<TaskPriority, string> = {
  urgent: "text-red-400",
  high: "text-orange-400",
  medium: "text-amber-400",
  low: "text-zinc-500",
};

export function TaskList({ tasks }: { tasks: Task[] }) {
  return (
    <ul className="divide-y divide-line rounded-xl border border-line bg-ink-850">
      {tasks.map((t) => (
        <li key={t.id} className="flex items-center gap-3 px-4 py-3">
          <span
            className={`font-mono text-xs uppercase tracking-[0.12em] ${PRIORITY_COLOR[t.priority]}`}
            title={`Priorität: ${t.priority}`}
          >
            ●
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm text-zinc-200">{t.title}</p>
            <p className="text-xs text-zinc-500">
              {STATUS_LABEL[t.status]}
              {t.dueDate ? ` · fällig ${t.dueDate}` : ""}
              {t.source === "agent" ? " · vom Agenten vorbereitet" : ""}
            </p>
          </div>
          {t.isOverdue && (
            <span className="shrink-0 rounded-full border border-red-500/30 bg-red-500/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-red-400">
              Überfällig
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
