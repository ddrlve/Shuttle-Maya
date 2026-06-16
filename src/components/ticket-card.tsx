import { Calendar, Armchair, Bus } from "lucide-react";
import { StatusBadge } from "@/components/status-badge";
import type { Ticket } from "@/lib/data";

export function TicketCard({ ticket }: { ticket: Ticket }) {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-border bg-card">
      <div className="grid grid-cols-[minmax(0,1fr)_72px_minmax(0,1fr)] items-center gap-3 p-3">
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <span className="text-xs text-muted-foreground">From Campus</span>
          <span className="truncate text-2xl font-semibold text-foreground">
            {ticket.origin}
          </span>
        </div>

        <div className="flex items-center justify-center gap-1 px-1 pt-6" aria-hidden="true">
          <span className="size-2.5 shrink-0 rounded-full border border-muted-foreground" />
          <span className="h-px min-w-8 flex-1 border-t border-dashed border-muted-foreground" />
          <span className="size-2.5 shrink-0 rounded-full bg-muted-foreground" />
        </div>

        <div className="flex min-w-0 flex-1 flex-col items-end gap-1">
          <span className="text-xs text-muted-foreground">To Campus</span>
          <span className="truncate text-2xl font-semibold text-foreground">
            {ticket.destination}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 border-t border-border p-3">
        <span className="inline-flex items-center gap-1 rounded bg-secondary px-2 py-1 text-xs font-semibold text-primary">
          <Calendar className="size-3.5" />
          {ticket.date}
        </span>
        <span className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground">
          <Armchair className="size-3.5" />
          Seat {ticket.seat}
        </span>
        <span className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground">
          <Bus className="size-3.5" />
          {ticket.busCode}
        </span>
        <StatusBadge status={ticket.status} />
      </div>
    </div>
  );
}
