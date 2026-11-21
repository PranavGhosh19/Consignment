import { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/seo-config";

/**
 * Dynamic Next.js robots.txt generator
 * Blocks crawl waste (private dashboards, API, search, auth forms)
 * Explicitly allows public indexable guides, catalogue, corridors, and tools.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/how-it-works",
          "/document-room",
          "/for-exporters",
          "/for-importers",
          "/for-carriers",
          "/pricing",
          "/about",
          "/contact",
          "/editorial-policy",
          "/terms",
          "/privacy",
          "/find-demand",
          "/export-guide/",
          "/products/",
          "/freight/",
          "/tools/",
          "/glossary/",
          "/requirements/",
        ],
        disallow: [
          "/dashboard/",
          "/api/",
          "/login",
          "/signup",
          "/settings/",
          "/gst-verification",
          "/verify-email",
          "/select-type",
          "/request-samples/",
          "/request-quote/",
          "/*?*", // Block query-parameter faceted duplicates
        ],
      },
    ],
    sitemap: `${SITE_CONFIG.url}/sitemap.xml`,
    host: SITE_CONFIG.url,
  };
}
