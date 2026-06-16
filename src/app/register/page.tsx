import Image from "next/image";
import Link from "next/link";
import { IdCard, Mail, UserRound } from "lucide-react";

export default function RegisterPage() {
  return (
    <main className="flex min-h-dvh items-center justify-center px-4 py-8">
      <section className="w-full max-w-md rounded-2xl border border-border bg-white p-6 shadow-sm">
        <Link href="/landing" className="mx-auto mb-6 flex w-fit items-center gap-2">
          <Image src="/logo.png" alt="Shuttle Maya logo" width={44} height={44} className="rounded-xl bg-gradient-to-br from-[#358fd0] to-[#7d3f99] p-1.5" />
          <span className="font-black text-primary">SHUTTLEMAYA</span>
        </Link>
        <h1 className="text-center text-2xl font-black">Create account</h1>
        <p className="mx-auto mt-2 max-w-xs text-center text-sm text-muted-foreground">
          Dummy registration for the MVP. No account is sent to a backend yet.
        </p>
        <form className="mt-6 grid gap-4">
          <Input icon={UserRound} label="Full name" value="Dian Rakhmawati Lestari" />
          <Input icon={Mail} label="BINUS email" value="dian.lestari@binus.ac.id" />
          <Input icon={IdCard} label="BINUSIAN ID" value="2602XXXXXX" />
          <Link href="/" className="flex min-h-12 w-full items-center justify-center rounded-lg bg-primary text-base font-bold text-primary-foreground">
            Create Demo Account
          </Link>
        </form>
        <p className="mt-5 text-center text-sm text-muted-foreground">
          Already registered? <Link href="/login" className="font-bold text-primary">Sign in</Link>
        </p>
      </section>
    </main>
  );
}

function Input({ icon: Icon, label, value }: { icon: typeof UserRound; label: string; value: string }) {
  return (
    <label className="block">
      <span className="text-sm font-bold">{label}</span>
      <div className="mt-1 flex h-12 items-center gap-2 rounded-lg border border-border px-3">
        <Icon className="size-4 text-muted-foreground" />
        <input defaultValue={value} className="min-w-0 flex-1 bg-transparent text-sm outline-none" />
      </div>
    </label>
  );
}
