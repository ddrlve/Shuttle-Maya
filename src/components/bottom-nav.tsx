"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, MessageSquareText, QrCode, Route, Ticket, User } from "lucide-react";
import { cn } from "@/lib/utils";

const TABS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/booking", label: "Book", icon: Route },
  { href: "/tickets", label: "Tickets", icon: Ticket },
  { href: "/community", label: "Community", icon: MessageSquareText },
  { href: "/scan", label: "Scan", icon: QrCode },
  { href: "/profile", label: "Profile", icon: User },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="sticky bottom-0 left-0 z-40 w-full shrink-0 border-t border-border bg-card pb-[max(env(safe-area-inset-bottom),0px)] lg:hidden">
      <div className="flex items-stretch justify-between px-1.5">
        {TABS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className="flex min-h-16 flex-1 flex-col items-center justify-center gap-1 py-2 active:opacity-60"
            >
              <Icon
                className={cn("size-5", active ? "stroke-primary" : "stroke-muted-foreground")}
                strokeWidth={2}
              />
              <span
                className={cn(
                  "text-[10px] font-medium leading-3",
                  active ? "text-primary" : "text-muted-foreground",
                )}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
