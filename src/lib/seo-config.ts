/**
 * SEO Configuration & Canonical Constants for ShipCargo
 * Domain: https://www.shipcargo.in
 */

export const SITE_CONFIG = {
  name: "ShipCargo",
  legalName: "ShipCargo Technologies Private Limited",
  url: "https://www.shipcargo.in",
  ogImage: "https://www.shipcargo.in/captain-cargo.png",
  description:
    "India's digital trade ecosystem connecting verified exporters with global importers, live carrier freight bidding, and tamper-evident Document Room management.",
  brandColor: "#13285A",
  accentColor: "#FF5A12",
  neutralColor: "#ECE6DC",
  author: "ShipCargo Trade Compliance Desk",
  contact: {
    email: "trade@shipcargo.in",
    phone: "+91-11-[PLACEHOLDER-PHONE]",
    address: {
      streetAddress: "[PLACEHOLDER-OFFICE-ADDRESS]",
      addressLocality: "New Delhi",
      addressRegion: "Delhi",
      postalCode: "110001",
      addressCountry: "IN",
    },
  },
  socials: {
    linkedin: "https://www.linkedin.com/company/shipcargo-india",
    twitter: "https://twitter.com/shipcargo_in",
  },
};

/**
 * Helper to construct an absolute canonical URL
 */
export function absoluteUrl(path?: string): string {
  if (!path) return SITE_CONFIG.url;
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  // Ensure no trailing slash on path unless root
  const normalized = cleanPath === "/" ? cleanPath : cleanPath.replace(/\/+$/, "");
  return `${SITE_CONFIG.url}${normalized}`;
}
