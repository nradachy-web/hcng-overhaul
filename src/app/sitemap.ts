import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

export const dynamic = "force-static";

const LAST_MODIFIED = "2026-07-20"; // bump on content changes

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: { path: string; priority: number }[] = [
    { path: "/", priority: 1.0 },
    { path: "/spinal-decompression", priority: 0.9 },
    { path: "/chiropractic", priority: 0.9 },
    { path: "/massage-therapy", priority: 0.9 },
    { path: "/kids", priority: 0.9 },
    { path: "/why-us", priority: 0.7 },
    { path: "/meet-the-team", priority: 0.7 },
    { path: "/our-office", priority: 0.7 },
    { path: "/testimonials", priority: 0.7 },
    { path: "/new-patients", priority: 0.8 },
    { path: "/contact", priority: 0.8 },
    { path: "/privacy-policy", priority: 0.3 },
    { path: "/terms", priority: 0.3 },
    { path: "/hipaa", priority: 0.3 },
  ];
  // trailingSlash: true, so sitemap URLs match the canonical form.
  return routes.map(({ path, priority }) => ({
    url: `${SITE_URL}${path === "/" ? "/" : `${path}/`}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: "monthly",
    priority,
  }));
}
