import type { Metadata } from "next";

export function courseMetadata(name: string, slug: string): Metadata {
  const origin = "https://dupont-golf-day-guide.workspace-737759.chatgpt.site";
  const title = `DuPont ${name} | Guest Arrival Guide`;
  const description = `Our ${name} round: driving range, course-specific clubhouse parking, and the starters shed at least 10 minutes before tee time.`;
  return {
    title,
    description,
    alternates: { canonical: `${origin}/${slug}/` },
    openGraph: {
      title, description, type: "website", url: `${origin}/${slug}/`,
      images: [{ url: `${origin}/og.png`, width: 1200, height: 630, alt: "DuPont golf day guest arrival guide" }],
    },
    twitter: { card: "summary_large_image", title, description, images: [`${origin}/og.png`] },
  };
}
