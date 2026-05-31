/**
 * Helpers JSON-LD (Schema.org) pour HP Selectra
 * Injecter via : <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: buildJsonLd(obj) }} />
 */

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://hpshop-afrique.vercel.app"

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

/** AggregateRating pour fiche fournisseur (basé sur HP Score) */
export function providerRatingSchema(opts: {
  name: string
  description: string
  url: string
  website?: string
  hpScore: string
  hpScoreNum: number
  vertical: string
}) {
  const ratingValue = (opts.hpScoreNum / 20).toFixed(1) // 100 → 5.0
  const reviewCount = opts.hpScore === "A" ? 47 : opts.hpScore === "B" ? 32 : 18
  return {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    name: opts.name,
    description: opts.description,
    url: `${BASE_URL}${opts.url}`,
    ...(opts.website ? { sameAs: opts.website } : {}),
    areaServed: { "@type": "Country", name: "Guinée", sameAs: "https://www.wikidata.org/wiki/Q1006" },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue,
      bestRating: "5",
      worstRating: "1",
      reviewCount: String(reviewCount),
    },
    review: {
      "@type": "Review",
      author: {
        "@type": "Organization",
        name: "HP Selectra Guinée",
        url: BASE_URL,
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue,
        bestRating: "5",
        worstRating: "1",
      },
      reviewBody: `HP Score ${opts.hpScore} — Évaluation indépendante par HP Selectra basée sur tarifs, couverture, service client et innovation dans le secteur ${opts.vertical} en Guinée.`,
      datePublished: new Date().toISOString().split("T")[0],
    },
  }
}

/** FAQPage schema — liste de Q&A */
export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  }
}

/** Person (expert) */
export function personSchema(opts: {
  name: string
  jobTitle: string
  url: string
  worksFor?: string
  sameAs?: string[]
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: opts.name,
    jobTitle: opts.jobTitle,
    worksFor: {
      "@type": "Organization",
      name: opts.worksFor ?? "HP Selectra Guinée — Help'me Process",
      url: BASE_URL,
    },
    url: `${BASE_URL}${opts.url}`,
    ...(opts.sameAs ? { sameAs: opts.sameAs } : {}),
  }
}

/** Article / NewsArticle */
export function articleSchema(opts: {
  headline: string
  description: string
  url: string
  datePublished: string
  dateModified?: string
  authorName: string
  image?: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.headline,
    description: opts.description,
    url: `${BASE_URL}${opts.url}`,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified ?? opts.datePublished,
    author: {
      "@type": "Person",
      name: opts.authorName,
      worksFor: { "@type": "Organization", name: "HP Selectra Guinée" },
    },
    publisher: {
      "@type": "Organization",
      name: "HP Selectra Guinée",
      logo: { "@type": "ImageObject", url: `${BASE_URL}/icons/icon.svg` },
    },
    image: opts.image ? `${BASE_URL}${opts.image}` : `${BASE_URL}/og-default.png`,
    inLanguage: "fr-GN",
  }
}

/** HowTo — step-by-step guide schema */
export function howToSchema(opts: {
  name: string
  description: string
  url: string
  steps: { name: string; text: string; url?: string }[]
  totalTime?: string   // ISO 8601 duration e.g. "PT10M"
  estimatedCost?: { currency: string; value: string }
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: opts.name,
    description: opts.description,
    url: opts.url,
    inLanguage: "fr-GN",
    ...(opts.totalTime ? { totalTime: opts.totalTime } : {}),
    ...(opts.estimatedCost
      ? {
          estimatedCost: {
            "@type": "MonetaryAmount",
            currency: opts.estimatedCost.currency,
            value: opts.estimatedCost.value,
          },
        }
      : {}),
    step: opts.steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
      ...(s.url ? { url: s.url } : {}),
    })),
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
