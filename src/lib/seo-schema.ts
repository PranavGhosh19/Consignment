import { SITE_CONFIG, absoluteUrl } from "./seo-config";

/**
 * JSON-LD Schema Factory for Google Structured Data Validation
 * Follows Schema.org standards without spammy FAQ / fake review markup.
 */

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_CONFIG.name,
    legalName: SITE_CONFIG.legalName,
    url: SITE_CONFIG.url,
    logo: absoluteUrl("/shipcargo-logo.png"),
    image: absoluteUrl("/captain-cargo.png"),
    description: SITE_CONFIG.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE_CONFIG.contact.address.streetAddress,
      addressLocality: SITE_CONFIG.contact.address.addressLocality,
      addressRegion: SITE_CONFIG.contact.address.addressRegion,
      postalCode: SITE_CONFIG.contact.address.postalCode,
      addressCountry: SITE_CONFIG.contact.address.addressCountry,
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Support & Trade Compliance",
      email: SITE_CONFIG.contact.email,
      telephone: SITE_CONFIG.contact.phone,
      areaServed: ["IN", "AE", "US", "NL", "SA", "SG", "GB", "DE"],
      availableLanguage: ["en", "hi"],
    },
    sameAs: [SITE_CONFIG.socials.linkedin, SITE_CONFIG.socials.twitter],
  };
}

export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    description: SITE_CONFIG.description,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_CONFIG.url}/find-demand?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export interface BreadcrumbItem {
  name: string;
  url?: string;
  item?: string;
}

export function generateBreadcrumbsSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => {
      const target = item.url || item.item || "/";
      return {
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: absoluteUrl(target),
      };
    }),
  };
}

export interface ArticleSchemaProps {
  title?: string;
  headline?: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified: string;
  authorName?: string;
  citations?: string[];
}

export function generateArticleSchema({
  title,
  headline,
  description,
  url,
  datePublished,
  dateModified,
  authorName = SITE_CONFIG.author,
  citations = [],
}: ArticleSchemaProps) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title || headline || "",
    description: description,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl(url),
    },
    author: {
      "@type": "Organization",
      name: authorName,
      url: absoluteUrl("/editorial-policy"),
    },
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/shipcargo-logo.png"),
      },
    },
    datePublished: datePublished,
    dateModified: dateModified,
    citation: citations,
  };
}

export interface ProductCatalogSchemaProps {
  name: string;
  description: string;
  url?: string;
  hsCode?: string;
  category?: string;
  countryOfOrigin?: string;
  image?: string | string[];
  sku?: string;
}

export function generateProductCatalogSchema({
  name,
  description,
  url = "/products/spices/dried-red-chillies",
  hsCode = "09042110",
  category = "Agricultural Commodities",
  countryOfOrigin = "IN",
  image,
  sku,
}: ProductCatalogSchemaProps) {
  const images = image
    ? Array.isArray(image)
      ? image
      : [image]
    : [absoluteUrl("/captain-cargo.png")];

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: name,
    description: description,
    image: images,
    category: category,
    url: absoluteUrl(url),
    ...(sku ? { sku } : {}),
    countryOfOrigin: {
      "@type": "Country",
      name: "India",
    },
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Harmonized System Code",
        value: hsCode,
      },
    ],
  };
}
