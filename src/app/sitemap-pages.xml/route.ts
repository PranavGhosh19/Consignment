import { NextResponse } from "next/server";
import { SITE_CONFIG, absoluteUrl } from "@/lib/seo-config";

/**
 * Core Pages XML Sitemap (/sitemap-pages.xml)
 * Static 200-status pages with verified change frequencies.
 */
export async function GET() {
  const pages = [
    { url: "/", lastmod: "2026-11-21", changefreq: "daily", priority: "1.0" },
    { url: "/how-it-works", lastmod: "2026-11-21", changefreq: "weekly", priority: "0.9" },
    { url: "/document-room", lastmod: "2026-11-21", changefreq: "weekly", priority: "0.8" },
    { url: "/for-exporters", lastmod: "2026-11-21", changefreq: "daily", priority: "0.9" },
    { url: "/for-importers", lastmod: "2026-11-21", changefreq: "daily", priority: "0.9" },
    { url: "/for-carriers", lastmod: "2026-11-21", changefreq: "daily", priority: "0.9" },
    { url: "/pricing", lastmod: "2026-11-21", changefreq: "weekly", priority: "0.8" },
    { url: "/find-demand", lastmod: "2026-11-21", changefreq: "hourly", priority: "0.9" },
    { url: "/about", lastmod: "2026-11-20", changefreq: "monthly", priority: "0.6" },
    { url: "/editorial-policy", lastmod: "2026-11-20", changefreq: "monthly", priority: "0.5" },
    { url: "/tools/freight-rate-calculator", lastmod: "2026-11-21", changefreq: "weekly", priority: "0.8" },
    { url: "/tools/incoterms-selector", lastmod: "2026-11-21", changefreq: "monthly", priority: "0.8" },
    { url: "/glossary", lastmod: "2026-11-21", changefreq: "monthly", priority: "0.7" },
    { url: "/support", lastmod: "2026-11-21", changefreq: "monthly", priority: "0.6" },
    { url: "/terms", lastmod: "2026-11-20", changefreq: "monthly", priority: "0.4" },
    { url: "/privacy", lastmod: "2026-11-20", changefreq: "monthly", priority: "0.4" },
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (p) => `  <url>
    <loc>${absoluteUrl(p.url)}</loc>
    <lastmod>${p.lastmod}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
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
