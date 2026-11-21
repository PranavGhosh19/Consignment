import { NextResponse } from "next/server";
import { absoluteUrl } from "@/lib/seo-config";

/**
 * Guides XML Sitemap (/sitemap-guides.xml)
 * Educational export compliance & regulatory pillar/cluster pages.
 */
export async function GET() {
  const guides = [
    { url: "/export-guide/how-to-start-export-business-india", lastmod: "2026-11-21", priority: "0.9" },
    { url: "/export-guide/iec-registration-dgft-guide", lastmod: "2026-11-21", priority: "0.85" },
    { url: "/export-guide/gst-lut-export-refund-rules", lastmod: "2026-11-21", priority: "0.85" },
    { url: "/export-guide/export-documentation-checklist", lastmod: "2026-11-21", priority: "0.85" },
    { url: "/export-guide/incoterms-2020-exporters-guide", lastmod: "2026-11-21", priority: "0.85" },
    { url: "/export-guide/export-payment-terms-lc-advance", lastmod: "2026-11-21", priority: "0.8" },
    { url: "/export-guide/icegate-customs-clearance-process", lastmod: "2026-11-21", priority: "0.8" },
    { url: "/export-guide/rodtep-rosctl-export-incentives", lastmod: "2026-11-21", priority: "0.8" },
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${guides
  .map(
    (g) => `  <url>
    <loc>${absoluteUrl(g.url)}</loc>
    <lastmod>${g.lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${g.priority}</priority>
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
