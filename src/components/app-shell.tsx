"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Home,
  MessageSquareText,
  QrCode,
  Route,
  Ticket,
  User,
} from "lucide-react";
import { BottomNav } from "@/components/bottom-nav";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/", label: "Dashboard", icon: Home },
  { href: "/booking", label: "Booking", icon: Route },
  { href: "/tickets", label: "Tickets", icon: Ticket },
  { href: "/community", label: "Community", icon: MessageSquareText },
  { href: "/scan", label: "QR Scan", icon: QrCode },
  { href: "/profile", label: "Profile", icon: User },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const authRoute = ["/landing", "/login", "/register", "/onboarding"].includes(pathname);
  const showNav = pathname !== "/success" && !authRoute;

  if (authRoute) {
    return <div className="min-h-dvh bg-[#f5f7fb] text-foreground">{children}</div>;
  }

  return (
    <div className="min-h-dvh bg-[#f5f7fb] text-foreground">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-[#e4e8f2] bg-white px-4 py-5 lg:flex lg:flex-col">
        <Link href="/" className="mb-8 flex items-center gap-3 px-2">
          <span className="flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#358fd0] to-[#7d3f99] p-1.5 shadow-sm">
            <Image src="/logo.png" alt="Shuttle Maya logo" width={34} height={34} className="size-full object-contain" />
          </span>
          <span>
            <span className="block text-base font-bold leading-5">Shuttle Maya</span>
            <span className="text-xs text-muted-foreground">BINUS Bandung</span>
          </span>
        </Link>
        <nav className="flex flex-1 flex-col gap-1">
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
            const active = href === "/" ? pathname === href : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex min-h-11 items-center gap-3 rounded-lg px-3 text-sm font-semibold transition hover:bg-secondary",
                  active ? "bg-primary text-primary-foreground" : "text-muted-foreground",
                )}
              >
                <Icon className="size-4" />
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="rounded-xl bg-secondary p-3 text-xs text-primary">
          Dummy MVP mode. Booking tersimpan di browser ini memakai localStorage.
        </div>
      </aside>
      <div className="flex min-h-dvh flex-col lg:pl-64">
        <div className="flex-1">{children}</div>
        {showNav && <BottomNav />}
      </div>
    </div>
  );
}
