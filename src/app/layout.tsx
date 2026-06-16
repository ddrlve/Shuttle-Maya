import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { BookingProvider } from "@/lib/booking-context";
import { AppShell } from "@/components/app-shell";

// SF Pro Display/Text (used in the Figma source) isn't licensed for web use,
// so Inter — the closest free metric-compatible alternative — is used instead.
const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shuttle Maya",
  description: "Inter-campus shuttle booking for BINUS University",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#344cb7",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="h-full overflow-x-hidden bg-[#f5f7fb]">
        <BookingProvider>
          <AppShell>{children}</AppShell>
        </BookingProvider>
      </body>
    </html>
  );
}
