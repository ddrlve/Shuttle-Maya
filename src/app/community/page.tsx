"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2, Clock, MessageSquareText, Send } from "lucide-react";
import { type CommunityRequest } from "@/lib/data";
import { saveCommunityRequest, useCommunityRequests } from "@/lib/storage";

export default function CommunityPage() {
  const requests = useCommunityRequests();
  const [message, setMessage] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const request: CommunityRequest = {
      id: `CR-${Date.now()}`,
      destination: String(form.get("destination") ?? ""),
      passengers: String(form.get("passengers") ?? ""),
      preferredTime: String(form.get("preferredTime") ?? ""),
      reason: String(form.get("reason") ?? ""),
      status: "pending",
      createdAt: new Date().toLocaleString("en-US", {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    saveCommunityRequest(request);
    setMessage("Request submitted. Campus operation team will review it first.");
    event.currentTarget.reset();
  }

  return (
    <main className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-5 pb-24 sm:px-6 lg:grid-cols-[minmax(0,1fr)_380px] lg:px-8 lg:py-8">
      <section className="rounded-xl border border-border bg-white p-5">
        <p className="text-sm font-semibold text-primary">Community shuttle</p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight">Request a group route</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Use this for campus events, group study, or repeated student demand. Requests
          stay pending until approved by the shuttle team.
        </p>

        <form onSubmit={submit} className="mt-6 grid gap-4">
          <Field label="Destination or pickup point" name="destination" placeholder="e.g. BINUS Dago lobby" required />
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Estimated passengers" name="passengers" placeholder="e.g. 12 students" required />
            <Field label="Preferred time" name="preferredTime" placeholder="e.g. 16:30" required />
          </div>
          <label className="block">
            <span className="text-sm font-bold">Reason</span>
            <textarea
              name="reason"
              required
              rows={4}
              placeholder="Tell us why this community shuttle is needed."
              className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20"
            />
          </label>
          {message && (
            <p className="rounded-lg bg-secondary px-3 py-2 text-sm font-semibold text-primary">
              {message}
            </p>
          )}
          <button
            type="submit"
            className="flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary text-base font-bold text-primary-foreground"
          >
            <Send className="size-4" />
            Submit Request
          </button>
        </form>
      </section>

      <aside className="rounded-xl border border-border bg-white p-5 lg:sticky lg:top-8 lg:h-fit">
        <div className="flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-lg bg-secondary text-primary">
            <MessageSquareText className="size-5" />
          </span>
          <div>
            <h2 className="font-bold">Request status</h2>
            <p className="text-sm text-muted-foreground">Saved on this browser</p>
          </div>
        </div>

        <div className="mt-5 space-y-3">
          {requests.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border p-5 text-center text-sm text-muted-foreground">
              No community requests yet.
            </div>
          ) : (
            requests.map((request) => (
              <article key={request.id} className="rounded-xl border border-border p-3">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-bold">{request.destination}</h3>
                  <span className="inline-flex items-center gap-1 rounded bg-[#fff3cc] px-2 py-1 text-xs font-bold text-[#8a5d00]">
                    <Clock className="size-3" />
                    Pending
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {request.passengers} · {request.preferredTime}
                </p>
                <p className="mt-2 text-xs text-muted-foreground">{request.createdAt}</p>
              </article>
            ))
          )}
        </div>

        <div className="mt-5 rounded-xl bg-muted p-3 text-sm text-muted-foreground">
          <CheckCircle2 className="mb-2 size-5 text-success" />
          Approved requests can become an added shuttle slot in a future backend version.
        </div>
      </aside>
    </main>
  );
}

function Field({
  label,
  name,
  placeholder,
  required = false,
}: {
  label: string;
  name: string;
  placeholder: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-sm font-bold">{label}</span>
      <input
        name={name}
        required={required}
        placeholder={placeholder}
        className="mt-1 h-12 w-full rounded-lg border border-border px-3 text-sm outline-none focus:ring-2 focus:ring-primary/20"
      />
    </label>
  );
}
