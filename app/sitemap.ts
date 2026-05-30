import type { MetadataRoute } from "next"
import { OFFERS, PROVIDERS, ARTICLES, VERTICALS } from "@/lib/data/seed-data"

const BASE = "https://hp-selectra-app.vercel.app"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${BASE}/recherche`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${BASE}/actualites`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/a-propos`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE}/methodologie`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
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

  // Articles
  const articleRoutes: MetadataRoute.Sitemap = ARTICLES.filter((a) => a.isPublished).map((a) => ({
    url: `${BASE}/actualites/${a.slug}`,
    lastModified: a.publishedAt,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

  return [...staticRoutes, ...verticalRoutes, ...providerRoutes, ...offerRoutes, ...articleRoutes]
}
