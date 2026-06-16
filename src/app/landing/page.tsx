import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-dvh bg-[#f5f7fb] lg:flex lg:items-center lg:justify-center lg:p-8">
      <section className="mx-auto flex min-h-dvh w-full max-w-[430px] flex-col bg-white px-6 pb-8 pt-6 shadow-sm lg:min-h-[860px] lg:rounded-[2rem]">
        <PhoneStatus />
        <div className="mt-14 text-center">
          <h1 className="bg-gradient-to-r from-[#358fd0] to-[#7d3f99] bg-clip-text text-4xl font-black tracking-tight text-transparent">
            SHUTTLEMAYA
          </h1>
        </div>

        <div className="flex flex-1 items-center justify-center">
          <Image
            src="/landing-illustration.png"
            alt="Students boarding a campus shuttle"
            width={700}
            height={820}
            priority
            className="w-full max-w-[360px] object-contain"
          />
        </div>

        <div className="space-y-4">
          <Link
            href="/login"
            className="flex min-h-14 w-full items-center justify-center gap-4 rounded-lg bg-primary text-lg font-bold text-primary-foreground"
          >
            <MicrosoftMark />
            Sign-In with Microsoft
          </Link>
          <p className="text-center text-sm font-medium text-muted-foreground">
            Sign-In with your work or school account
          </p>
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
      <span className="flex items-center gap-1 text-xs">
        <span className="h-3 w-4 rounded-sm border-2 border-black" />
      </span>
    </div>
  );
}

function MicrosoftMark() {
  return (
    <span className="grid size-5 grid-cols-2 gap-0.5" aria-hidden="true">
      <span className="bg-[#f35325]" />
      <span className="bg-[#81bc06]" />
      <span className="bg-[#05a6f0]" />
      <span className="bg-[#ffba08]" />
    </span>
  );
}
