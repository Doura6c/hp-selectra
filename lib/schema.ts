/**
 * Helpers JSON-LD (Schema.org) pour HP Selectra
 * Injecter via : <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: buildJsonLd(obj) }} />
 */

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://hp-selectra-app.vercel.app"

/** Sérialise en JSON en échappant < pour éviter les injections XSS */
export function buildJsonLd(obj: unknown): string {
  return JSON.stringify(obj).replace(/</g, "\\u003c")
}

/** BreadcrumbList */
export function breadcrumbSchema(
  items: { name: string; href?: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      ...(item.href ? { item: `${BASE_URL}${item.href}` } : {}),
    })),
  }
}

/** Product (offre) */
export function productSchema(opts: {
  name: string
  description: string
  brandName: string
  priceNote: string
  url: string
  verticalName: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: opts.name,
    description: opts.description,
    brand: {
      "@type": "Brand",
      name: opts.brandName,
    },
    category: opts.verticalName,
    offers: {
      "@type": "Offer",
      priceCurrency: "GNF",
      price: "0",               // indicatif — prix réel dans priceNote
      description: opts.priceNote,
      availability: "https://schema.org/InStock",
      url: `${BASE_URL}${opts.url}`,
      seller: {
        "@type": "Organization",
        name: opts.brandName,
      },
    },
    url: `${BASE_URL}${opts.url}`,
  }
}

/** Organization (fournisseur) */
export function organizationSchema(opts: {
  name: string
  description: string
  url: string
  website?: string
  areaServed?: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: opts.name,
    description: opts.description,
    url: `${BASE_URL}${opts.url}`,
    ...(opts.website ? { sameAs: opts.website } : {}),
    areaServed: opts.areaServed ?? "GN",
    knowsAbout: "Services financiers et télécoms en Guinée",
  }
}

/** WebSite (homepage) */
export function webSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "HP Selectra Guinée",
    url: BASE_URL,
    description: "Comparateur indépendant de services en Guinée : télécom, mobile money, banques, internet.",
    inLanguage: "fr-GN",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}/recherche?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  }
}
