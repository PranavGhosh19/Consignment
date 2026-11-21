import { NextResponse } from "next/server";
import { absoluteUrl } from "@/lib/seo-config";

/**
 * Freight Corridors XML Sitemap (/sitemap-lanes.xml)
 * Dedicated port-to-port trade lane shipping guides.
 */
export async function GET() {
  const lanes = [
    { url: "/freight/india-to-dubai", lastmod: "2026-11-21", priority: "0.8" },
    { url: "/freight/india-to-rotterdam", lastmod: "2026-11-21", priority: "0.8" },
    { url: "/freight/india-to-usa", lastmod: "2026-11-21", priority: "0.8" },
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${lanes
  .map(
    (l) => `  <url>
    <loc>${absoluteUrl(l.url)}</loc>
    <lastmod>${l.lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${l.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=43200",
    },
  });
}
