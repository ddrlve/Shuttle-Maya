"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeftRight, Armchair, Bus, Calendar, Check, Clock } from "lucide-react";
import { CampusMap } from "@/components/campus-map";
import { useBooking, campusName } from "@/lib/booking-context";
import { CAMPUSES, SCHEDULES, SEAT_ROWS } from "@/lib/data";
import { cn } from "@/lib/utils";

const DATE_OPTIONS = [
  { value: "2026-06-16", label: "Tue, 16 Jun" },
  { value: "2026-06-17", label: "Wed, 17 Jun" },
  { value: "2026-06-18", label: "Thu, 18 Jun" },
];

function formatDateLabel(value: string) {
  const dateValue = new Date(`${value}T00:00:00`);
  return dateValue.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

function dateInputValue(label: string) {
  return DATE_OPTIONS.find((item) => item.label === label)?.value ?? "2026-06-16";
}

export default function BookingPage() {
  const router = useRouter();
  const {
    origin,
    destination,
    date,
    schedule,
    seat,
    setOrigin,
    setDestination,
    setDate,
    setSchedule,
    setSeat,
    swap,
  } = useBooking();
  const [step, setStep] = useState(1);

  const selectedRouteReady = origin !== destination;
  const canConfirm = selectedRouteReady && schedule && seat;
  const activeStep = useMemo(() => {
    if (!selectedRouteReady) return 1;
    if (!schedule) return Math.max(step, 2);
    if (!seat) return Math.max(step, 3);
    return Math.max(step, 4);
  }, [schedule, seat, selectedRouteReady, step]);

  function confirmBooking() {
    if (!canConfirm) return;
    router.push("/success");
  }

  return (
    <main className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-5 pb-24 sm:px-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:px-8 lg:py-8">
      <section className="min-w-0 space-y-5">
        <div>
          <p className="text-sm font-semibold text-primary">Booking flow</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
            Book a BINUS shuttle
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Choose your campus direction, departure, seat, then confirm. Fully booked
            schedules and occupied seats are disabled.
          </p>
        </div>

        <CampusMap origin={origin} destination={destination} className="min-h-64" />

        <StepCard number={1} title="Select route" active={activeStep === 1} complete={selectedRouteReady}>
          <div className="grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-end">
            <CampusSelect label="From campus" value={origin} onChange={setOrigin} />
            <button
              type="button"
              onClick={swap}
              className="mx-auto flex size-11 items-center justify-center rounded-lg bg-secondary text-primary active:scale-95"
              aria-label="Swap route"
            >
              <ArrowLeftRight className="size-5" />
            </button>
            <CampusSelect label="To campus" value={destination} onChange={setDestination} />
          </div>
          {!selectedRouteReady && (
            <p className="mt-3 rounded-lg bg-[#fff3cc] px-3 py-2 text-sm font-medium text-[#8a5d00]">
              Origin and destination must be different.
            </p>
          )}
        </StepCard>

        <StepCard number={2} title="Select schedule" active={activeStep === 2} complete={Boolean(schedule)}>
          <div className="mb-3 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
            <label className="block">
              <span className="text-xs font-semibold uppercase text-muted-foreground">Departure date</span>
              <input
                type="date"
                value={dateInputValue(date)}
                min="2026-06-16"
                onChange={(event) => setDate(formatDateLabel(event.target.value))}
                className="mt-1 h-12 w-full rounded-lg border border-border bg-white px-3 text-sm font-bold outline-none focus:ring-2 focus:ring-primary/20"
              />
            </label>
            <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {DATE_OPTIONS.map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() => setDate(item.label)}
                className={cn(
                  "min-h-10 shrink-0 rounded-lg px-3 text-sm font-semibold",
                  date === item.label ? "bg-primary text-primary-foreground" : "bg-muted text-foreground",
                )}
              >
                {item.label}
              </button>
            ))}
            </div>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {SCHEDULES.map((slot) => {
              const full = slot.seatsLeft === 0;
              const selected = schedule?.id === slot.id;
              return (
                <button
                  key={slot.id}
                  type="button"
                  disabled={full || !selectedRouteReady}
                  onClick={() => {
                    setSchedule(slot);
                    setStep(3);
                  }}
                  className={cn(
                    "flex min-h-24 items-center justify-between gap-3 rounded-xl border bg-white p-4 text-left transition disabled:cursor-not-allowed disabled:opacity-45",
                    selected ? "border-primary ring-2 ring-primary/15" : "border-border hover:border-primary/40",
                  )}
                >
                  <span className="flex items-center gap-3">
                    <span className="flex size-11 items-center justify-center rounded-lg bg-secondary text-primary">
                      <Clock className="size-5" />
                    </span>
                    <span>
                      <span className="block text-xl font-bold">{slot.time}</span>
                      <span className="text-xs text-muted-foreground">
                        {slot.busCode} · ~{slot.durationMin} min
                      </span>
                    </span>
                  </span>
                  <span className={cn("rounded px-2 py-1 text-xs font-bold", full ? "bg-[#ffe4e1] text-destructive" : "bg-secondary text-primary")}>
                    {full ? "Full" : `${slot.seatsLeft} left`}
                  </span>
                </button>
              );
            })}
          </div>
        </StepCard>

        <StepCard number={3} title="Select seat" active={activeStep === 3} complete={Boolean(seat)}>
          <SeatPicker selectedSeat={seat} onPick={setSeat} disabled={!schedule} />
        </StepCard>

        <StepCard number={4} title="Confirm booking" active={activeStep === 4} complete={false}>
          <button
            type="button"
            disabled={!canConfirm}
            onClick={confirmBooking}
            className="flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary text-base font-bold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-45"
          >
            <Check className="size-5" />
            Confirm Booking
          </button>
        </StepCard>
      </section>

      <aside className="lg:sticky lg:top-8 lg:h-fit">
        <div className="rounded-xl border border-border bg-white p-4 shadow-sm">
          <p className="text-sm font-semibold text-muted-foreground">Booking summary</p>
          <div className="mt-4 rounded-xl bg-muted p-3">
            <div className="flex items-center justify-between gap-3">
              <SummaryPlace label="From" value={campusName(origin)} />
              <ArrowLeftRight className="size-4 shrink-0 text-muted-foreground" />
              <SummaryPlace label="To" value={campusName(destination)} alignRight />
            </div>
          </div>
          <dl className="mt-4 grid gap-3 text-sm">
            <SummaryRow icon={Calendar} label="Date" value={date} />
            <SummaryRow icon={Clock} label="Time" value={schedule?.time ?? "Choose a schedule"} />
            <SummaryRow icon={Armchair} label="Seat" value={seat ? `Seat ${seat}` : "Choose a seat"} />
            <SummaryRow icon={Bus} label="Bus" value={schedule?.busCode ?? "Pending"} />
          </dl>
          <div className="mt-4 rounded-lg bg-secondary px-3 py-2 text-sm font-bold text-primary">
            Fare: Free for BINUS students
          </div>
        </div>
      </aside>
    </main>
  );
}

function StepCard({
  number,
  title,
  active,
  complete,
  children,
}: {
  number: number;
  title: string;
  active: boolean;
  complete: boolean;
  children: React.ReactNode;
}) {
  return (
    <section className={cn("rounded-xl border bg-white p-4", active ? "border-primary" : "border-border")}>
      <div className="mb-4 flex items-center gap-3">
        <span className={cn("flex size-8 items-center justify-center rounded-lg text-sm font-bold", complete ? "bg-success text-white" : active ? "bg-primary text-white" : "bg-muted text-muted-foreground")}>
          {complete ? <Check className="size-4" /> : number}
        </span>
        <h2 className="text-lg font-bold">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function CampusSelect({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase text-muted-foreground">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-1 h-12 w-full rounded-lg border border-border bg-white px-3 text-base font-bold outline-none focus:ring-2 focus:ring-primary/20"
      >
        {CAMPUSES.map((campus) => (
          <option key={campus.code} value={campus.code}>
            {campus.name}
          </option>
        ))}
      </select>
    </label>
  );
}

function SeatPicker({
  selectedSeat,
  onPick,
  disabled,
}: {
  selectedSeat: string | null;
  onPick: (seatId: string) => void;
  disabled: boolean;
}) {
  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-3 text-xs font-medium text-muted-foreground">
        <Legend color="bg-secondary" label="Available" />
        <Legend color="bg-primary" label="Selected" />
        <Legend color="bg-muted" label="Occupied" />
      </div>
      <div className="mx-auto w-fit rounded-xl bg-muted p-3">
        <div className="mb-3 rounded-lg bg-white py-2 text-center text-xs font-bold text-muted-foreground">
          Front of shuttle
        </div>
        <div className="flex flex-col gap-3">
          {SEAT_ROWS.map((row, rowIdx) => (
            <div key={rowIdx} className="grid grid-cols-[48px_48px_24px_48px_48px] gap-2 sm:grid-cols-[56px_56px_28px_56px_56px]">
              {row.map((cell, colIdx) => {
                const gridColumn = colIdx < 2 ? colIdx + 1 : colIdx + 2;
                if (!cell) return <span key={colIdx} style={{ gridColumn }} />;
                if (cell.status === "driver") {
                  return (
                    <span key={cell.id} style={{ gridColumn }} className="flex size-12 items-center justify-center rounded-lg bg-white text-muted-foreground sm:size-14">
                      <Bus className="size-5" />
                    </span>
                  );
                }
                const selected = selectedSeat === cell.id;
                const occupied = cell.status === "booked";
                return (
                  <button
                    key={cell.id}
                    type="button"
                    disabled={disabled || occupied}
                    onClick={() => onPick(cell.id)}
                    style={{ gridColumn }}
                    className={cn(
                      "flex size-12 items-center justify-center rounded-lg text-sm font-bold transition sm:size-14",
                      occupied && "bg-white text-muted-foreground/45 line-through",
                      !occupied && selected && "bg-primary text-primary-foreground",
                      !occupied && !selected && "bg-secondary text-primary hover:ring-2 hover:ring-primary/20",
                      disabled && "cursor-not-allowed opacity-50",
                    )}
                  >
                    {cell.id}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className={cn("size-3 rounded", color)} />
      {label}
    </span>
  );
}

function SummaryPlace({ label, value, alignRight = false }: { label: string; value: string; alignRight?: boolean }) {
  return (
    <div className={alignRight ? "text-right" : ""}>
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="text-lg font-bold">{value}</dd>
    </div>
  );
}

function SummaryRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Calendar;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-border p-3">
      <Icon className="size-4 text-primary" />
      <dt className="flex-1 text-muted-foreground">{label}</dt>
      <dd className="font-bold">{value}</dd>
    </div>
  );
}
