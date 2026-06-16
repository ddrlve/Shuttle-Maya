"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { CAMPUSES, type ScheduleSlot } from "@/lib/data";

type BookingState = {
  origin: string;
  destination: string;
  date: string;
  schedule: ScheduleSlot | null;
  seat: string | null;
};

type BookingContextValue = BookingState & {
  setOrigin: (code: string) => void;
  setDestination: (code: string) => void;
  swap: () => void;
  setDate: (date: string) => void;
  setSchedule: (slot: ScheduleSlot) => void;
  setSeat: (seatId: string) => void;
  reset: () => void;
};

const DEFAULT_STATE: BookingState = {
  origin: CAMPUSES[0].code,
  destination: CAMPUSES[1].code,
  date: "2026-06-16",
  schedule: null,
  seat: null,
};

const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<BookingState>(DEFAULT_STATE);

  const value = useMemo<BookingContextValue>(
    () => ({
      ...state,
      setOrigin: (code) => setState((s) => ({ ...s, origin: code })),
      setDestination: (code) => setState((s) => ({ ...s, destination: code })),
      swap: () =>
        setState((s) => ({ ...s, origin: s.destination, destination: s.origin })),
      setDate: (date) => setState((s) => ({ ...s, date })),
      setSchedule: (slot) => setState((s) => ({ ...s, schedule: slot, seat: null })),
      setSeat: (seatId) => setState((s) => ({ ...s, seat: seatId })),
      reset: () => setState((s) => ({ ...DEFAULT_STATE, origin: s.origin, destination: s.destination })),
    }),
    [state],
  );

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used within BookingProvider");
  return ctx;
}

export function campusName(code: string) {
  return CAMPUSES.find((c) => c.code === code)?.name ?? code;
}
