"use client"

import { useState } from "react"
import Link from "next/link"
import { OFFERS, PROVIDERS } from "@/lib/data/seed-data"
import OfferCard from "@/components/compare/OfferCard"

const CATEGORIES = [
  { value: "all", label: "Toutes les offres" },
  { value: "forfait-mobile", label: "Forfaits mobiles" },
  { value: "internet-fixe", label: "Internet fixe / Box" },
]

const SORT_OPTIONS = [
  { value: "score", label: "Meilleur HP Score" },
  { value: "featured", label: "Recommandées d'abord" },
]

export default function TelecomComparateurPage() {
  const [category, setCategory] = useState("all")
  const [sort, setSort] = useState("score")

  const telecomOffers = OFFERS.filter((o) => o.verticalSlug === "telecom")

  const filtered = telecomOffers
    .filter((o) => category === "all" || o.category === category)
    .sort((a, b) => {
      if (sort === "featured") return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0)
      return b.hpScoreNum - a.hpScoreNum
    })

  return (
    <>
      {/* Header */}
      <section
        className="py-10"
        style={{ background: `linear-gradient(135deg, var(--color-primary-dark), var(--color-primary))` }}
      >
        <div className="container">
          <nav className="text-sm mb-3" style={{ color: "rgba(255,255,255,0.6)" }}>
            <Link href="/" className="hover:text-white">Accueil</Link>
            <span className="mx-2">/</span>
            <Link href="/telecom/" className="hover:text-white">Télécom</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Comparateur</span>
          </nav>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
            Comparer les forfaits mobiles et internet en Guinée
          </h1>
          <p style={{ color: "rgba(255,255,255,0.8)" }} className="text-sm">
            {filtered.length} offre{filtered.length > 1 ? "s" : ""} trouvée{filtered.length > 1 ? "s" : ""}
          </p>
        </div>
      </section>

      <div className="container py-8">
        {/* Filtres */}
        <div className="flex flex-wrap gap-3 mb-8">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c.value}
                onClick={() => setCategory(c.value)}
                className="px-4 py-2 rounded-xl text-sm font-medium border transition-colors"
                style={{
                  backgroundColor: category === c.value ? "var(--color-primary)" : "var(--color-card)",
                  color: category === c.value ? "#fff" : "var(--color-text)",
                  borderColor: category === c.value ? "var(--color-primary)" : "var(--color-border)",
                }}
              >
                {c.label}
              </button>
            ))}
          </div>
          <div className="ml-auto">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="px-3 py-2 rounded-xl text-sm border"
              style={{
                borderColor: "var(--color-border)",
                color: "var(--color-text)",
                backgroundColor: "var(--color-card)",
              }}
            >
              {SORT_OPTIONS.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Disclaimer tarifs */}
        <div
          className="flex items-start gap-3 p-4 rounded-xl mb-6 text-sm"
          style={{ backgroundColor: "var(--color-warning)", color: "#fff" }}
        >
          <span className="text-lg shrink-0">⚠️</span>
          <p>
            Les tarifs affichés sont des <strong>données d'exemple à titre indicatif</strong>.
            Vérifiez toujours les prix actuels auprès de l'opérateur avant toute souscription.
          </p>
        </div>

        {/* Résultats */}
        {filtered.length === 0 ? (
          <div className="text-center py-16" style={{ color: "var(--color-muted)" }}>
            Aucune offre trouvée pour ces filtres.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((offer) => {
              const provider = PROVIDERS.find((p) => p.slug === offer.providerSlug)!
              return (
                <OfferCard
                  key={offer.slug}
                  offer={offer}
                  provider={provider}
                  verticalSlug="telecom"
                />
              )
            })}
          </div>
        )}
      </div>
    </>
  )
}
