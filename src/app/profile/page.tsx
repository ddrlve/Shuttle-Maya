"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Bell,
  CircleHelp,
  LogOut,
  Shield,
  Ticket as TicketIcon,
  UserRound,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { CURRENT_USER } from "@/lib/data";
import { useStoredTickets } from "@/lib/storage";

const ACTIONS = [
  { icon: Bell, label: "Notification preferences", message: "Notifications are mocked for this MVP." },
  { icon: Shield, label: "Privacy & security", message: "Privacy settings will connect after backend login exists." },
  { icon: CircleHelp, label: "Help center", message: "Help request placeholder opened." },
];

export default function ProfilePage() {
  const tickets = useStoredTickets();
  const [notice, setNotice] = useState("");

  const tripsCompleted = tickets.filter((ticket) => ticket.status === "completed").length;

  function showNotice(message: string) {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2600);
  }

  return (
    <main className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-5 pb-24 sm:px-6 lg:grid-cols-[340px_minmax(0,1fr)] lg:px-8 lg:py-8">
      <aside className="rounded-xl border border-border bg-white p-5 text-center lg:sticky lg:top-8 lg:h-fit">
        <Avatar className="mx-auto size-24">
          <AvatarFallback className="bg-secondary text-3xl font-bold text-primary">
            {CURRENT_USER.name[0]}
          </AvatarFallback>
        </Avatar>
        <h1 className="mt-4 text-2xl font-bold">{CURRENT_USER.fullName}</h1>
        <p className="text-sm text-muted-foreground">{CURRENT_USER.email}</p>
        <span className="mt-4 inline-flex rounded bg-secondary px-3 py-1 text-xs font-bold text-primary">
          {CURRENT_USER.role} · {CURRENT_USER.binusianId}
        </span>
      </aside>

      <section className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-3">
          <Stat label="Trips completed" value={tripsCompleted} />
          <Stat label="Total bookings" value={tickets.length} />
          <Stat label="Active tickets" value={tickets.filter((ticket) => ticket.status === "active").length} />
        </div>

        {notice && (
          <div className="rounded-xl bg-secondary px-4 py-3 text-sm font-semibold text-primary">
            {notice}
          </div>
        )}

        <div className="rounded-xl border border-border bg-white p-5">
          <h2 className="text-lg font-bold">Settings and actions</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <Link
              href="/tickets"
              className="flex min-h-16 items-center gap-3 rounded-xl border border-border p-4 hover:bg-muted"
            >
              <span className="flex size-10 items-center justify-center rounded-lg bg-secondary text-primary">
                <TicketIcon className="size-5" />
              </span>
              <span>
                <span className="block font-bold">My Tickets</span>
                <span className="text-sm text-muted-foreground">Open active and history tickets</span>
              </span>
            </Link>
            {ACTIONS.map(({ icon: Icon, label, message }) => (
              <button
                key={label}
                type="button"
                onClick={() => showNotice(message)}
                className="flex min-h-16 items-center gap-3 rounded-xl border border-border p-4 text-left hover:bg-muted"
              >
                <span className="flex size-10 items-center justify-center rounded-lg bg-secondary text-primary">
                  <Icon className="size-5" />
                </span>
                <span>
                  <span className="block font-bold">{label}</span>
                  <span className="text-sm text-muted-foreground">MVP placeholder action</span>
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-white p-5">
          <h2 className="text-lg font-bold">Account</h2>
          <button
            type="button"
            onClick={() => showNotice("Logout is disabled because this MVP has no authentication yet.")}
            className="mt-4 flex min-h-12 w-full items-center justify-center gap-2 rounded-lg border border-border text-sm font-bold text-destructive hover:bg-muted sm:w-fit sm:px-5"
          >
            <LogOut className="size-4" />
            Log Out
          </button>
        </div>
      </section>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-border bg-white p-5">
      <UserRound className="mb-4 size-5 text-primary" />
      <p className="text-3xl font-bold">{value}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
