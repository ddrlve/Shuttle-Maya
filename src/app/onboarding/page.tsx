"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, ArrowLeftRight, ChevronDown } from "lucide-react";
import { CampusMap } from "@/components/campus-map";
import { cn } from "@/lib/utils";

const SLIDES = [
  {
    title: "Maps",
    body: <MapsSlide />,
  },
  {
    title: "Location",
    body: <LocationSlide mode="community" />,
  },
  {
    title: "Location",
    body: <LocationSlide mode="individual" />,
  },
  {
    title: "Ready",
    body: <ReadySlide />,
  },
];

export default function OnboardingPage() {
  const [index, setIndex] = useState(0);
  const slide = SLIDES[index];
  const done = index === SLIDES.length - 1;

  return (
    <main className="min-h-dvh bg-[#f5f7fb] lg:flex lg:items-center lg:justify-center lg:p-8">
      <section className="mx-auto flex min-h-dvh w-full max-w-[430px] flex-col bg-white shadow-sm lg:min-h-[860px] lg:rounded-[2rem]">
        <PhoneStatus />
        <header className="relative flex min-h-20 items-center justify-center border-b border-border px-6">
          {index > 0 && (
            <button
              type="button"
              onClick={() => setIndex((value) => Math.max(0, value - 1))}
              aria-label="Back"
              className="absolute left-6 flex size-12 items-center justify-center rounded-xl border border-border text-muted-foreground"
            >
              <ArrowLeft className="size-6" />
            </button>
          )}
          <h1 className="text-xl font-black">{slide.title}</h1>
        </header>

        <div className="flex flex-1 flex-col px-6 py-8">{slide.body}</div>

        <footer className="px-6 pb-8">
          <div className="mb-4 flex justify-center gap-2">
            {SLIDES.map((_, dotIndex) => (
              <span
                key={dotIndex}
                className={cn(
                  "size-2.5 rounded-full",
                  dotIndex === index ? "bg-[#a9a9a9]" : "bg-[#eeeeee]",
                )}
              />
            ))}
          </div>
          {done ? (
            <Link
              href="/"
              className="flex min-h-14 w-full items-center justify-center rounded-lg bg-primary text-xl font-bold text-primary-foreground"
            >
              Start
            </Link>
          ) : (
            <button
              type="button"
              onClick={() => setIndex((value) => Math.min(SLIDES.length - 1, value + 1))}
              className="flex min-h-14 w-full items-center justify-center rounded-lg bg-primary text-xl font-bold text-primary-foreground"
            >
              Next
            </button>
          )}
        </footer>
      </section>
    </main>
  );
}

function MapsSlide() {
  return (
    <div className="flex flex-1 flex-col justify-center text-center">
      <CampusMap className="min-h-56 rounded-xl" />
      <h2 className="mt-8 text-3xl font-black leading-tight">Real-Time Location Monitoring</h2>
      <p className="mt-4 text-xl leading-snug">
        <span className="rounded-md bg-warning px-3 py-1 text-white shadow-sm">Binus Shuttle</span>
        <span> and </span>
        <span className="rounded-md bg-[#6393f2] px-3 py-1 text-white shadow-sm">Current Location</span>
        <br />
        Can be monitored real-time so that you&apos;ll never be late
      </p>
    </div>
  );
}

function LocationSlide({ mode }: { mode: "community" | "individual" }) {
  const community = mode === "community";
  return (
    <div className="flex flex-1 flex-col justify-center">
      <div className="rounded-xl bg-muted p-3">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
          <CampusBox label="From Campus" value="Paskal" />
          <span className="flex size-10 items-center justify-center rounded-lg bg-secondary text-primary">
            <ArrowLeftRight className="size-5" />
          </span>
          <CampusBox label="To Campus" value="Dago" />
        </div>
        <div className="mt-3 grid grid-cols-2 rounded-lg bg-[#e9e9e9] p-1 text-center text-lg font-bold">
          <span className={cn("rounded-md py-2", !community ? "bg-white text-foreground" : "text-[#cfcfcf]")}>
            Individual
          </span>
          <span className={cn("rounded-md py-2", community ? "bg-white text-foreground" : "text-[#cfcfcf]")}>
            Community
          </span>
        </div>
        <button className="mt-3 flex w-full items-center justify-between rounded-lg bg-white px-4 py-3 text-left">
          <span>
            <span className="block text-sm text-muted-foreground">Departure</span>
            <span className="text-lg font-bold text-[#6f6f6f]">Sat, May 13th</span>
          </span>
          <ChevronDown className="size-5 text-muted-foreground" />
        </button>
        <button className="mt-4 flex min-h-12 w-full items-center justify-center rounded-lg bg-primary/55 text-lg font-bold text-white">
          Search Shuttle
        </button>
      </div>
      <div className="mt-8 text-center">
        <h2 className="text-3xl font-black leading-tight">Campus Pick-Up and Drop-Off</h2>
        <p className="mx-auto mt-4 max-w-sm text-xl leading-snug">
          Choose your desired campus location for the pick-up and drop-off point by clicking the campus name
        </p>
      </div>
    </div>
  );
}

function ReadySlide() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center text-center">
      <div className="text-8xl font-black text-[#dfe6fb]">A</div>
      <h2 className="mt-4 text-2xl font-black">Go to your class easier</h2>
      <p className="mt-2 text-muted-foreground">Start reserving the shuttle</p>
    </div>
  );
}

function CampusBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-white p-3 text-center">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-1 text-2xl font-black">{value}</p>
    </div>
  );
}

function PhoneStatus() {
  return (
    <div className="flex h-8 items-center justify-between px-10 pt-6 text-lg font-black">
      <span>9:41</span>
      <div className="h-8 w-36 rounded-b-[1.8rem] bg-black" />
      <span className="h-3 w-4 rounded-sm border-2 border-black" />
    </div>
  );
}
