import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DuPont Golf Day | Arrival Guide",
  description:
    "Driving range, parking, and starters shed directions for our round at DuPont Country Club.",
  openGraph: {
    title: "DuPont Golf Day",
    description: "A simple three-stop plan for an easy, on-time start.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "DuPont Golf Day",
    description: "Range, re-park, and meet at the starters shed 10 minutes early.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
