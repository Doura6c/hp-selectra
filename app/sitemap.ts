import type { MetadataRoute } from "next"
import { OFFERS, PROVIDERS, ARTICLES, VERTICALS } from "@/lib/data/seed-data"

const BASE = "https://hpshop-afrique.vercel.app"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${BASE}/equipe`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/mon-espace`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/outils/calculateur-mobile-money`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/outils/comparer`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/outils/simulateur-credit`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/recherche`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${BASE}/actualites`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: `${BASE}/annuaire`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/a-propos`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE}/methodologie`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/mentions-legales`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE}/confidentialite`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ]

  // Verticales
  const verticalRoutes: MetadataRoute.Sitemap = VERTICALS.flatMap((v) => {
    const base = `${BASE}/${v.slug}`
    const routes: MetadataRoute.Sitemap = [
      { url: base, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    ]
    if (v.isLive) {
      routes.push(
        { url: `${base}/comparateur`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
        { url: `${base}/fournisseurs`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
      )
    }
    return routes
  })

  // Fiches fournisseurs
  const providerRoutes: MetadataRoute.Sitemap = PROVIDERS.filter((p) => {
    return VERTICALS.find((v) => v.slug === p.verticalSlug)?.isLive
  }).map((p) => ({
    url: `${BASE}/${p.verticalSlug}/fournisseurs/${p.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }))

  // Fiches offres
  const offerRoutes: MetadataRoute.Sitemap = OFFERS.filter((o) => {
    return VERTICALS.find((v) => v.slug === o.verticalSlug)?.isLive
  }).map((o) => ({
    url: `${BASE}/${o.verticalSlug}/offres/${o.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }))

  // Pages villes SEO local
  const cityRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE}/telecom/conakry`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/telecom/kindia`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${BASE}/banques/conakry`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/mobile-money/conakry`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/assurances/conakry`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/microfinance/conakry`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    // Hub villes
    { url: `${BASE}/villes`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/villes/labe`, lastModified: now, changeFrequency: "monthly", priority: 0.78 },
    { url: `${BASE}/villes/kankan`, lastModified: now, changeFrequency: "monthly", priority: 0.78 },
    { url: `${BASE}/villes/nzerekore`, lastModified: now, changeFrequency: "monthly", priority: 0.78 },
    { url: `${BASE}/villes/mamou`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${BASE}/villes/boke`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${BASE}/villes/faranah`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
  ]

  // Guides SEO
  const guideRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE}/telecom/guides/meilleur-forfait-mobile`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE}/mobile-money/guides/frais-transfert`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE}/mobile-money/guides/comment-envoyer-argent`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE}/banques/guides/ouvrir-compte`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE}/banques/meilleur-compte`, lastModified: now, changeFrequency: "monthly", priority: 0.88 },
    { url: `${BASE}/fai/guides/meilleure-box-internet`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE}/assurances/guides/choisir-assurance`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE}/assurances/meilleur-assurance`, lastModified: now, changeFrequency: "monthly", priority: 0.88 },
    { url: `${BASE}/microfinance/guides/obtenir-microcredit`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE}/microfinance/meilleur-microcredit`, lastModified: now, changeFrequency: "monthly", priority: 0.88 },
  ]

  // Articles
  const articleRoutes: MetadataRoute.Sitemap = ARTICLES.filter((a) => a.isPublished).map((a) => ({
    url: `${BASE}/actualites/${a.slug}`,
    lastModified: a.publishedAt,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

  return [...staticRoutes, ...verticalRoutes, ...providerRoutes, ...offerRoutes, ...cityRoutes, ...guideRoutes, ...articleRoutes]
}
