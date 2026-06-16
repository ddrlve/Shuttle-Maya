import { cn } from "@/lib/utils";
import type { TicketStatus } from "@/lib/data";

const STYLES: Record<TicketStatus, string> = {
  active: "bg-secondary text-primary",
  completed: "bg-muted text-muted-foreground",
  cancelled: "bg-[#ffe5d5] text-destructive",
};

const LABELS: Record<TicketStatus, string> = {
  active: "Active",
  completed: "Completed",
  cancelled: "Cancelled",
};

export function StatusBadge({ status }: { status: TicketStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded px-2 py-1 text-xs font-semibold leading-none",
        STYLES[status],
      )}
    >
      {LABELS[status]}
    </span>
  );
}
