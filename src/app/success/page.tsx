"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check, Home, Ticket as TicketIcon } from "lucide-react";
import { DummyQr } from "@/components/dummy-qr";
import { useBooking, campusName } from "@/lib/booking-context";
import { formatDisplayDate } from "@/lib/date";
import { saveTicket } from "@/lib/storage";
import type { Ticket } from "@/lib/data";

export default function SuccessPage() {
  const router = useRouter();
  const { origin, destination, date, schedule, seat, reset } = useBooking();
  const savedRef = useRef(false);
  const [ticketId] = useState(() => `SM-${Date.now()}-${Math.floor(Math.random() * 1000)}`);

  const ticket = useMemo<Ticket | null>(() => {
    if (!schedule || !seat) return null;
    return {
      id: `${ticketId}-${seat}`,
      origin: campusName(origin),
      destination: campusName(destination),
      date: formatDisplayDate(date),
      time: schedule.time,
      seat,
      busCode: schedule.busCode,
      status: "active",
    };
  }, [date, destination, origin, schedule, seat, ticketId]);

  useEffect(() => {
    if (!ticket) {
      router.replace("/booking");
      return;
    }
    if (!savedRef.current) {
      saveTicket(ticket);
      savedRef.current = true;
    }
  }, [router, ticket]);

  if (!ticket) return null;

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-3xl flex-col items-center justify-center px-4 py-8">
      <section className="w-full rounded-xl border border-border bg-white p-5 text-center shadow-sm sm:p-8">
        <span className="mx-auto flex size-20 items-center justify-center rounded-full bg-success/15">
          <span className="flex size-14 items-center justify-center rounded-full bg-success">
            <Check className="size-8 text-white" strokeWidth={3} />
          </span>
        </span>
        <h1 className="mt-5 text-2xl font-bold">Booking successful</h1>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
          Your seat is reserved. Show this QR code to the driver before boarding.
        </p>

        <div className="mx-auto mt-6 max-w-lg rounded-xl border border-border p-4">
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 text-left">
            <Place label="From" value={ticket.origin} />
            <span className="text-muted-foreground">-&gt;</span>
            <Place label="To" value={ticket.destination} alignRight />
          </div>
          <DummyQr seed={ticket.id} className="mx-auto mt-5 size-44" />
          <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-border pt-4 text-sm sm:grid-cols-4">
            <Meta label="Date" value={ticket.date} />
            <Meta label="Time" value={ticket.time} />
            <Meta label="Seat" value={ticket.seat} />
            <Meta label="Bus" value={ticket.busCode} />
          </dl>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <Link
            href="/tickets"
            onClick={reset}
            className="flex min-h-12 items-center justify-center gap-2 rounded-lg bg-primary text-base font-bold text-primary-foreground"
          >
            <TicketIcon className="size-5" />
            View Ticket
          </Link>
          <Link
            href="/"
            onClick={reset}
            className="flex min-h-12 items-center justify-center gap-2 rounded-lg border border-border text-base font-bold"
          >
            <Home className="size-5" />
            Home
          </Link>
        </div>
      </section>
    </main>
  );
}

function Place({ label, value, alignRight = false }: { label: string; value: string; alignRight?: boolean }) {
  return (
    <div className={alignRight ? "text-right" : ""}>
      <p className="text-xs font-semibold uppercase text-muted-foreground">{label}</p>
      <p className="truncate text-xl font-bold">{value}</p>
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="font-bold">{value}</dd>
    </div>
  );
}
