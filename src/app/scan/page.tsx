"use client";

import { useState } from "react";
import { CheckCircle2, QrCode, ScanLine, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type ScanState = "idle" | "success" | "failed";

export default function ScanPage() {
  const [state, setState] = useState<ScanState>("idle");

  function simulateScan() {
    setState(Math.random() > 0.25 ? "success" : "failed");
  }

  return (
    <main className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-5 pb-24 sm:px-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:px-8 lg:py-8">
      <section className="rounded-xl border border-border bg-white p-5">
        <p className="text-sm font-semibold text-primary">QR scan</p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight">Validate shuttle ticket</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Fake scanner for MVP testing. Use it to simulate ticket validation without a camera API.
        </p>

        <div className="mt-6 flex aspect-square max-h-[520px] min-h-80 w-full items-center justify-center rounded-xl bg-[#111827] p-6">
          <div className="relative flex size-full max-h-96 max-w-96 items-center justify-center rounded-xl border border-white/20">
            <QrCode className="size-28 text-white/75" />
            <span className="absolute left-5 top-5 size-12 border-l-4 border-t-4 border-primary" />
            <span className="absolute right-5 top-5 size-12 border-r-4 border-t-4 border-primary" />
            <span className="absolute bottom-5 left-5 size-12 border-b-4 border-l-4 border-primary" />
            <span className="absolute bottom-5 right-5 size-12 border-b-4 border-r-4 border-primary" />
            <span className="absolute left-8 right-8 top-1/2 h-0.5 bg-warning shadow-[0_0_18px_rgba(247,177,52,.9)]" />
          </div>
        </div>

        <button
          type="button"
          onClick={simulateScan}
          className="mt-5 flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary text-base font-bold text-primary-foreground"
        >
          <ScanLine className="size-5" />
          Simulate Scan
        </button>
      </section>

      <aside className="rounded-xl border border-border bg-white p-5 lg:sticky lg:top-8 lg:h-fit">
        <h2 className="font-bold">Scan result</h2>
        <div
          className={cn(
            "mt-4 rounded-xl p-4",
            state === "idle" && "bg-muted text-muted-foreground",
            state === "success" && "bg-success/10 text-success",
            state === "failed" && "bg-destructive/10 text-destructive",
          )}
        >
          {state === "idle" && (
            <>
              <QrCode className="mb-3 size-7" />
              <p className="font-bold">Waiting for scan</p>
              <p className="mt-1 text-sm">Press simulate to test success or failure states.</p>
            </>
          )}
          {state === "success" && (
            <>
              <CheckCircle2 className="mb-3 size-7" />
              <p className="font-bold">Ticket valid</p>
              <p className="mt-1 text-sm">Passenger can board the shuttle.</p>
            </>
          )}
          {state === "failed" && (
            <>
              <XCircle className="mb-3 size-7" />
              <p className="font-bold">Ticket not found</p>
              <p className="mt-1 text-sm">Ask passenger to open the latest active ticket.</p>
            </>
          )}
        </div>
      </aside>
    </main>
  );
}
