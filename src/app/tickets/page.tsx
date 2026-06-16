"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Route, Ticket as TicketIcon } from "lucide-react";
import { TicketCard } from "@/components/ticket-card";
import { useStoredTickets } from "@/lib/storage";
import { cn } from "@/lib/utils";

const TABS = [
  { label: "Active", value: "active" },
  { label: "History", value: "history" },
] as const;

export default function TicketsPage() {
  const [tab, setTab] = useState<(typeof TABS)[number]["value"]>("active");
  const tickets = useStoredTickets();

  const visibleTickets = useMemo(
    () =>
      tickets.filter((ticket) =>
        tab === "active" ? ticket.status === "active" : ticket.status !== "active",
      ),
    [tab, tickets],
  );

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-5 px-4 py-5 pb-24 sm:px-6 lg:px-8 lg:py-8">
      <header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold text-primary">Tickets</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
            My shuttle tickets
          </h1>
        </div>
        <div className="flex rounded-lg bg-muted p-1">
          {TABS.map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => setTab(item.value)}
              className={cn(
                "min-h-10 rounded-md px-4 text-sm font-bold",
                tab === item.value ? "bg-white text-primary shadow-sm" : "text-muted-foreground",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      </header>

      {visibleTickets.length === 0 ? (
        <EmptyState tab={tab} />
      ) : (
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {visibleTickets.map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))}
        </section>
      )}
    </main>
  );
}

function EmptyState({ tab }: { tab: "active" | "history" }) {
  return (
    <section className="rounded-xl border border-dashed border-border bg-white p-8 text-center">
      {tab === "active" ? (
        <Route className="mx-auto size-10 text-muted-foreground" />
      ) : (
        <TicketIcon className="mx-auto size-10 text-muted-foreground" />
      )}
      <h2 className="mt-4 text-lg font-bold">
        {tab === "active" ? "No active ticket" : "No ticket history yet"}
      </h2>
      <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
        {tab === "active"
          ? "Book a shuttle first. Your confirmed QR ticket will show up here."
          : "Completed and cancelled bookings will be listed here."}
      </p>
      {tab === "active" && (
        <Link
          href="/booking"
          className="mx-auto mt-5 flex min-h-11 w-fit items-center justify-center rounded-lg bg-primary px-4 text-sm font-bold text-primary-foreground"
        >
          Book Now
        </Link>
      )}
    </section>
  );
}
