import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sorry Jas",
  description: "A bittersweet reflection and time counter since August 24, 2026 at 8:17 PM, preserving the memory of the apology page while facing reality with honesty.",
  openGraph: {
    title: "Sorry Jas",
    description: "A bittersweet reflection and time counter since August 24, 2026 at 8:17 PM, preserving the memory of the apology page while facing reality with honesty.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
