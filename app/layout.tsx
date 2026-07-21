import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = (requestHeaders.get("x-forwarded-host") ??
    requestHeaders.get("host") ??
    "dupont-golf-day-guide.workspace-737759.chatgpt.site")
    .split(",")[0]
    .trim();
  const protocol =
    requestHeaders.get("x-forwarded-proto") ??
    (host.startsWith("localhost") ? "http" : "https");
  const ogImage = `${protocol}://${host}/og.png`;

  return {
    title: "DuPont Golf Day | Arrival & Tee Guide",
    description:
      "Driving range, parking, starters shed directions, and tee distances for our round at DuPont Country Club.",
    openGraph: {
      title: "DuPont Golf Day",
      description: "Range, re-park, choose your tee, and arrive 10 minutes early.",
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 630, alt: "DuPont Golf Day arrival guide" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "DuPont Golf Day",
      description: "Range, re-park, choose your tee, and arrive 10 minutes early.",
      images: [ogImage],
    },
  };
}

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
