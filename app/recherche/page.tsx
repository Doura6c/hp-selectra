"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { OFFERS, PROVIDERS, VERTICALS } from "@/lib/data/seed-data"
import OfferCard from "@/components/compare/OfferCard"
import { Search } from "lucide-react"

const LIVE_SLUGS = VERTICALS.filter((v) => v.isLive).map((v) => v.slug)

const SUGGESTIONS = [
  "Forfait mobile",
  "Pass data",
  "Box internet",
  "Transfert d'argent",
  "Mobile money",
  "Compte courant",
  "Carte bancaire",
  "Épargne",
]

type Indexed = {
  offer: (typeof OFFERS)[number]
  provider: (typeof PROVIDERS)[number]
  haystack: string
}

const INDEX: Indexed[] = OFFERS.filter((o) => LIVE_SLUGS.includes(o.verticalSlug)).map((offer) => {
  const provider = PROVIDERS.find((p) => p.slug === offer.providerSlug)!
  const vertical = VERTICALS.find((v) => v.slug === offer.verticalSlug)
  const haystack = [
    offer.name,
    offer.description,
    offer.category,
    provider.name,
    vertical?.name ?? "",
    ...offer.details.map((d) => `${d.key} ${d.value} ${d.unit ?? ""}`),
  ]
    .join(" ")
    .toLowerCase()
  return { offer, provider, haystack }
})

export default function RecherchePage() {
  const [query, setQuery] = useState("")

  // Lit le paramètre ?q= au chargement
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("q") ?? ""
    setQuery(q)
  }, [])

  const results = useMemo(() => {
    const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean)
    if (terms.length === 0) return INDEX
    return INDEX.filter((item) => terms.every((t) => item.haystack.includes(t)))
  }, [query])

  return (
    <>
      {/* En-tête recherche */}
      <section
        className="py-10"
        style={{ background: `linear-gradient(135deg, var(--color-primary-dark), var(--color-primary))` }}
      >
        <div className="container">
          <nav className="text-sm mb-4" style={{ color: "rgba(255,255,255,0.6)" }}>
            <Link href="/" className="hover:text-white">Accueil</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Recherche</span>
          </nav>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-5">
            Que voulez-vous comparer ?
          </h1>

          <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white shadow max-w-xl">
            <Search className="w-5 h-5 shrink-0" style={{ color: "var(--color-muted)" }} />
            <input
              autoFocus
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ex : forfait 5 Go, transfert d'argent, compte courant…"
              className="flex-1 outline-none text-sm bg-transparent"
              style={{ color: "var(--color-text)" }}
            />
          </div>

          {/* Suggestions */}
          <div className="flex flex-wrap gap-2 mt-4">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => setQuery(s)}
                className="px-3 py-1.5 rounded-full text-xs font-medium transition-colors"
                style={{ backgroundColor: "rgba(255,255,255,0.15)", color: "#fff" }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Résultats */}
      <div className="container py-10">
        <p className="text-sm mb-6" style={{ color: "var(--color-muted)" }}>
          <strong style={{ color: "var(--color-text)" }}>{results.length}</strong> offre{results.length > 1 ? "s" : ""}
          {query.trim() && <> pour « {query.trim()} »</>}
        </p>

        {results.length === 0 ? (
          <div className="text-center py-16">
            <p className="mb-4" style={{ color: "var(--color-muted)" }}>
              Aucune offre ne correspond à votre recherche.
            </p>
            <Link
              href="/telecom/comparateur/"
              className="inline-block px-5 py-2.5 rounded-xl text-sm font-semibold text-white"
              style={{ backgroundColor: "var(--color-primary)" }}
            >
              Voir toutes les offres
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.map(({ offer, provider }) => (
              <OfferCard key={`${offer.verticalSlug}-${offer.slug}`} offer={offer} provider={provider} verticalSlug={offer.verticalSlug} />
            ))}
          </div>
        )}
      </div>
    </>
  )
}
