"use client";

import { useMemo } from "react";
import Link from "next/link";
import { ArrowLeftRight, Calendar, Clock, QrCode, Route, Search } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { CampusMap } from "@/components/campus-map";
import { TicketCard } from "@/components/ticket-card";
import { useBooking, campusName } from "@/lib/booking-context";
import { CURRENT_USER, SCHEDULES } from "@/lib/data";
import { useStoredTickets } from "@/lib/storage";

function formatDateLabel(value: string) {
  const dateValue = new Date(`${value}T00:00:00`);
  return dateValue.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

function dateInputValue(label: string) {
  if (label.includes("17 Jun")) return "2026-06-17";
  if (label.includes("18 Jun")) return "2026-06-18";
  return "2026-06-16";
}

export default function HomePage() {
  const { origin, destination, date, setDate, swap } = useBooking();
  const tickets = useStoredTickets();

  const closestTicket = useMemo(
    () => tickets.find((ticket) => ticket.status === "active"),
    [tickets],
  );
  const nextSlot = SCHEDULES.find((slot) => slot.seatsLeft > 0);

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-5 pb-24 sm:px-6 lg:px-8 lg:py-8">
      <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">
            Hi, {CURRENT_USER.name}. Ready for your campus shuttle?
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
            Shuttle Maya Dashboard
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/scan"
            className="flex min-h-11 items-center gap-2 rounded-lg border border-border bg-white px-3 text-sm font-semibold hover:bg-muted"
          >
            <QrCode className="size-4" />
            Scan QR
          </Link>
          <Link href="/profile" aria-label="Open profile">
            <Avatar className="size-11">
              <AvatarFallback className="bg-secondary font-semibold text-primary">
                {CURRENT_USER.name[0]}
              </AvatarFallback>
            </Avatar>
          </Link>
        </div>
      </header>

      <section className="grid gap-5 lg:grid-cols-[1.35fr_.65fr]">
        <div className="overflow-hidden rounded-xl border border-border bg-white">
          <CampusMap origin={origin} destination={destination} className="min-h-72 rounded-none border-0" />
          <div className="grid gap-3 border-t border-border p-4 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
            <RoutePoint label="From campus" value={campusName(origin)} />
            <button
              type="button"
              onClick={swap}
              className="mx-auto flex size-11 items-center justify-center rounded-lg bg-secondary text-primary active:scale-95"
              aria-label="Swap route direction"
            >
              <ArrowLeftRight className="size-5" />
            </button>
            <RoutePoint label="To campus" value={campusName(destination)} alignRight />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          <div className="rounded-xl border border-border bg-white p-4">
            <p className="text-sm font-semibold text-muted-foreground">Next available shuttle</p>
            <div className="mt-4 flex items-center justify-between gap-3">
              <span className="flex size-12 items-center justify-center rounded-lg bg-secondary text-primary">
                <Clock className="size-5" />
              </span>
              <div className="flex-1">
                <p className="text-2xl font-bold">{nextSlot?.time ?? "-"}</p>
                <p className="text-sm text-muted-foreground">
                  {nextSlot?.busCode} · {nextSlot?.seatsLeft} seats left
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-primary p-4 text-primary-foreground">
            <p className="text-sm font-semibold opacity-80">Plan a ride</p>
            <label className="mt-3 block">
              <span className="text-xs font-semibold opacity-80">Departure date</span>
              <input
                type="date"
                value={dateInputValue(date)}
                min="2026-06-16"
                onChange={(event) => setDate(formatDateLabel(event.target.value))}
                className="mt-1 h-11 w-full rounded-lg border border-white/20 bg-white px-3 text-sm font-bold text-foreground outline-none focus:ring-2 focus:ring-white/40"
              />
            </label>
            <Link
              href="/booking"
              className="mt-5 flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-white text-sm font-bold text-primary active:opacity-90"
            >
              <Search className="size-4" />
              Search Shuttle
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[.8fr_1.2fr]">
        <div className="rounded-xl border border-border bg-white p-4">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold">Upcoming trip</h2>
            <Link href="/tickets" className="text-sm font-semibold text-primary">
              See all
            </Link>
          </div>
          {closestTicket ? (
            <TicketCard ticket={closestTicket} />
          ) : (
            <EmptyTrip />
          )}
        </div>

        <div className="rounded-xl border border-border bg-white p-4">
          <h2 className="text-lg font-bold">Route preview</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {SCHEDULES.slice(0, 3).map((slot) => (
              <div key={slot.id} className="rounded-lg bg-muted p-3">
                <p className="text-xl font-bold">{slot.time}</p>
                <p className="mt-1 text-sm text-muted-foreground">{slot.busCode}</p>
                <p className="mt-3 inline-flex items-center gap-1 rounded bg-white px-2 py-1 text-xs font-semibold text-primary">
                  <Calendar className="size-3.5" />
                  {slot.seatsLeft === 0 ? "Full" : `${slot.seatsLeft} seats`}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function RoutePoint({
  label,
  value,
  alignRight = false,
}: {
  label: string;
  value: string;
  alignRight?: boolean;
}) {
  return (
    <div className={alignRight ? "text-left sm:text-right" : ""}>
      <p className="text-xs font-semibold uppercase text-muted-foreground">{label}</p>
      <p className="mt-1 text-2xl font-bold">{value}</p>
    </div>
  );
}

function EmptyTrip() {
  return (
    <div className="rounded-xl border border-dashed border-border p-6 text-center">
      <Route className="mx-auto size-8 text-muted-foreground" />
      <p className="mt-3 text-sm font-semibold">No active booking yet</p>
      <p className="mt-1 text-sm text-muted-foreground">
        Book a shuttle and your active ticket will appear here.
      </p>
    </div>
  );
}
