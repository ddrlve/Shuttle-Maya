import Link from "next/link";
import { BriefcaseBusiness, UserRound } from "lucide-react";
import { CURRENT_USER } from "@/lib/data";

export default function LoginPage() {
  return (
    <main className="min-h-dvh bg-[#f5f7fb] lg:flex lg:items-center lg:justify-center lg:p-8">
      <section className="mx-auto flex min-h-dvh w-full max-w-[430px] flex-col bg-white px-6 pb-8 pt-6 shadow-sm lg:min-h-[860px] lg:rounded-[2rem]">
        <PhoneStatus />
        <div className="mt-12">
          <div className="flex items-center gap-3">
            <MicrosoftMark />
            <span className="text-3xl font-bold text-[#737373]">Microsoft</span>
          </div>
          <h1 className="mt-10 text-2xl font-medium leading-snug">
            It looks like this email is used with more than one account from Microsoft. Which one do you want to use?
          </h1>
        </div>

        <div className="mt-12 grid gap-7">
          <Link href="/onboarding" className="flex items-center gap-5 rounded-xl p-2 transition hover:bg-muted">
            <span className="flex size-16 items-center justify-center rounded-full bg-muted text-muted-foreground">
              <BriefcaseBusiness className="size-8" />
            </span>
            <span>
              <span className="block text-xl font-semibold">Work or school account</span>
              <span className="block text-sm text-foreground">Created by BINUS University</span>
              <span className="block text-sm text-muted-foreground">{CURRENT_USER.email}</span>
            </span>
          </Link>

          <button type="button" disabled className="flex cursor-not-allowed items-center gap-5 rounded-xl p-2 opacity-50">
            <span className="flex size-16 items-center justify-center rounded-full bg-muted text-muted-foreground">
              <UserRound className="size-8" />
            </span>
            <span className="text-left">
              <span className="block text-xl font-semibold">Personal account</span>
              <span className="block text-sm text-muted-foreground">No personal account connected</span>
            </span>
          </button>
        </div>

        <p className="mt-8 text-sm text-muted-foreground">
          Tired of seeing this? <span className="font-medium text-primary">Rename your personal Microsoft account.</span>
        </p>

        <div className="mt-auto">
          <Link href="/landing" className="ml-auto flex min-h-12 w-32 items-center justify-center rounded-lg bg-muted text-base font-semibold">
            Back
          </Link>
        </div>
      </section>
    </main>
  );
}

function PhoneStatus() {
  return (
    <div className="flex h-8 items-center justify-between px-4 text-lg font-black">
      <span>9:41</span>
      <div className="h-8 w-36 rounded-b-[1.8rem] bg-black" />
      <span className="h-3 w-4 rounded-sm border-2 border-black" />
    </div>
  );
}

function MicrosoftMark() {
  return (
    <span className="grid size-7 grid-cols-2 gap-0.5" aria-hidden="true">
      <span className="bg-[#f35325]" />
      <span className="bg-[#81bc06]" />
      <span className="bg-[#05a6f0]" />
      <span className="bg-[#ffba08]" />
    </span>
  );
}
