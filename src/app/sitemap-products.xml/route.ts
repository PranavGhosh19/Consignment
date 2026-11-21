import { NextResponse } from "next/server";
import { absoluteUrl } from "@/lib/seo-config";

/**
 * Product Catalogue XML Sitemap (/sitemap-products.xml)
 * Sourcing catalogue for overseas buyers.
 */
export async function GET() {
  const products = [
    { url: "/products/spices/dried-red-chillies", lastmod: "2026-11-21", priority: "0.85" },
    { url: "/products/grains/1121-steam-basmati-rice", lastmod: "2026-11-21", priority: "0.85" },
    { url: "/products/pharmaceuticals/paracetamol-api", lastmod: "2026-11-21", priority: "0.8" },
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${products
  .map(
    (p) => `  <url>
    <loc>${absoluteUrl(p.url)}</loc>
    <lastmod>${p.lastmod}</lastmod>
    <changefreq>weekly</changefreq>
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
