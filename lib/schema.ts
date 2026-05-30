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

/** Product (offre)
 *  Pas de price dans offers : les tarifs sont indicatifs.
 *  On utilise isRelatedTo + description pour transmettre priceNote
 *  sans déclencher le schéma Merchant listings (qui exige un prix réel).
 */
export function productSchema(opts: {
  name: string
  description: string
  brandName: string
  priceNote: string
  url: string
  verticalName: string
  hpScore: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: opts.name,
    description: `${opts.description} Tarif indicatif : ${opts.priceNote}.`,
    brand: {
      "@type": "Brand",
      name: opts.brandName,
    },
    category: opts.verticalName,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: scoreToRating(opts.hpScore),
      bestRating: "5",
      worstRating: "1",
      reviewCount: "1",
      ratingExplanation: `HP Score ${opts.hpScore} attribué par HP Selectra Guinée`,
    },
    url: `${BASE_URL}${opts.url}`,
    // Pas de "offers" — prix indicatifs GNF non publiables comme merchant listing
  }
}

function scoreToRating(score: string): string {
  const map: Record<string, string> = { A: "4.5", B: "3.8", C: "3.0", D: "2.0", E: "1.5" }
  return map[score] ?? "3.0"
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
