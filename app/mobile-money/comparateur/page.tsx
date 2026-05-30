"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { OFFERS, PROVIDERS } from "@/lib/data/seed-data"
import OfferCard from "@/components/compare/OfferCard"
import HPScoreBadge from "@/components/ui/HPScoreBadge"
import { ArrowRight, SlidersHorizontal } from "lucide-react"

const CATEGORIES = [
  { slug: "all", label: "Tous les services", icon: "💸" },
  { slug: "transfert", label: "Transfert", icon: "↔️" },
  { slug: "depot-retrait", label: "Dépôt / Retrait", icon: "🏧" },
  { slug: "paiement", label: "Paiement", icon: "📲" },
  { slug: "carte-prepayee", label: "Carte prépayée", icon: "💳" },
]

type SortKey = "hp" | "price-asc"

function ChoiceTile({
  icon,
  label,
  active,
  onClick,
}: {
  icon: string
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="relative flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border-2 transition-all hover:shadow-md"
      style={{
        borderColor: active ? "var(--color-secondary)" : "var(--color-border)",
        backgroundColor: active ? "var(--color-primary-light)" : "var(--color-card)",
      }}
    >
      {active && (
        <span
          className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-bold"
          style={{ backgroundColor: "var(--color-secondary)" }}
        >
          ✓
        </span>
      )}
      <span className="text-2xl">{icon}</span>
      <span className="text-xs font-semibold text-center leading-tight" style={{ color: "var(--color-text)" }}>
        {label}
      </span>
    </button>
  )
}

const COMPARE_KEYS = ["Dépôt", "Retrait", "Transfert", "Paiement factures", "Carte Visa", "Réseau agents"]

export default function MobileMoneyComparateurPage() {
  const [selCategory, setSelCategory] = useState("all")
  const [launched, setLaunched] = useState(false)
  const [sort, setSort] = useState<SortKey>("hp")
  const resultsRef = useRef<HTMLDivElement>(null)

  const mmProviders = PROVIDERS.filter((p) => p.verticalSlug === "mobile-money")

  function launch() {
    setLaunched(true)
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    }, 100)
  }

  const totalMM = OFFERS.filter((o) => o.verticalSlug === "mobile-money").length

  const rawOffers = OFFERS.filter((o) => {
    if (o.verticalSlug !== "mobile-money") return false
    if (selCategory !== "all" && o.category !== selCategory) return false
    return true
  })

  const sortedOffers = [...rawOffers].sort((a, b) =>
    sort === "hp" ? b.hpScoreNum - a.hpScoreNum : 0
  )

  // Offres transfert pour le tableau comparatif
  const transfertOffers = OFFERS.filter(
    (o) => o.verticalSlug === "mobile-money" && o.category === "transfert"
  ).sort((a, b) => b.hpScoreNum - a.hpScoreNum)

  return (
    <>
      {/* Hero */}
      <section
        className="py-10"
        style={{ background: `linear-gradient(135deg, var(--color-secondary-dark, #4a6428), var(--color-secondary))` }}
      >
        <div className="container">
          <nav className="text-sm mb-3" style={{ color: "rgba(255,255,255,0.6)" }}>
            <Link href="/" className="hover:text-white">Accueil</Link>
            <span className="mx-2">/</span>
            <Link href="/mobile-money/" className="hover:text-white">Mobile Money</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Comparateur</span>
          </nav>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-1">
            Comparateur Mobile Money — Guinée
          </h1>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.75)" }}>
            {totalMM} services comparés · {mmProviders.length} opérateurs · HP Score indépendant
          </p>
        </div>
      </section>

      {/* Widget sélection */}
      <section className="py-8" style={{ backgroundColor: "var(--color-primary-light)" }}>
        <div className="container max-w-2xl">
          <p className="text-sm font-semibold mb-4 text-center" style={{ color: "var(--color-text)" }}>
            Quel service voulez-vous comparer ?
          </p>
          <div className="grid grid-cols-5 gap-3 mb-6">
            {CATEGORIES.map((cat) => (
              <ChoiceTile
                key={cat.slug}
                icon={cat.icon}
                label={cat.label}
                active={selCategory === cat.slug}
                onClick={() => setSelCategory(cat.slug)}
              />
            ))}
          </div>
          <button
            onClick={launch}
            className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-bold text-white text-base transition-opacity hover:opacity-90"
            style={{ backgroundColor: "var(--color-secondary)" }}
          >
            Lancer la comparaison <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Mur des opérateurs */}
      <section className="py-6 border-b" style={{ borderColor: "var(--color-border)" }}>
        <div className="container">
          <p className="text-xs font-medium uppercase tracking-wide mb-3" style={{ color: "var(--color-muted)" }}>
            Services comparés
          </p>
          <div className="flex flex-wrap gap-2">
            {mmProviders.map((p) => (
              <Link
                key={p.slug}
                href={`/mobile-money/fournisseurs/${p.slug}/`}
                className="flex items-center gap-2.5 pl-2 pr-4 py-2 rounded-full border transition-all hover:shadow-md hover:-translate-y-0.5"
                style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-card)" }}
              >
                <span
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                  style={{ backgroundColor: p.brandColor ?? "var(--color-secondary)" }}
                >
                  {p.name.slice(0, 2).toUpperCase()}
                </span>
                <span className="text-sm font-semibold" style={{ color: "var(--color-text)" }}>
                  {p.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Résultats */}
      <div ref={resultsRef} className="container py-10 scroll-mt-20">
        {!launched ? (
          /* Avant lancement */
          <div>
            {/* Tableau comparatif transfert — toujours visible */}
            <h2 className="text-lg font-bold mb-4" style={{ color: "var(--color-text)" }}>
              📊 Comparatif frais de transfert
            </h2>
            <div className="overflow-x-auto rounded-2xl border shadow-sm mb-8" style={{ borderColor: "var(--color-border)" }}>
              <table className="w-full text-sm min-w-[520px]" style={{ backgroundColor: "var(--color-card)" }}>
                <thead>
                  <tr style={{ backgroundColor: "var(--color-secondary)" }}>
                    <th className="text-left px-4 py-4 text-white font-semibold w-36 text-sm">Critère</th>
                    {transfertOffers.map((offer) => {
                      const provider = PROVIDERS.find((p) => p.slug === offer.providerSlug)!
                      return (
                        <th key={offer.slug} className="px-4 py-4 text-center">
                          <div className="flex flex-col items-center gap-1">
                            <span className="text-white font-semibold text-xs">{provider.name}</span>
                            <HPScoreBadge score={offer.hpScore} size="sm" />
                          </div>
                        </th>
                      )
                    })}
                  </tr>
                </thead>
                <tbody>
                  {COMPARE_KEYS.map((key, rowIdx) => (
                    <tr
                      key={key}
                      style={{ backgroundColor: rowIdx % 2 === 0 ? "var(--color-card)" : "var(--color-surface)" }}
                    >
                      <td className="px-4 py-3 font-medium text-xs" style={{ color: "var(--color-muted)" }}>
                        {key}
                      </td>
                      {transfertOffers.map((offer) => {
                        const detail = offer.details.find((d) => d.key === key)
                        const isFree = detail?.value === "Gratuit"
                        return (
                          <td key={offer.slug} className="px-4 py-3 text-center">
                            <span
                              className="font-semibold text-xs"
                              style={{
                                color: isFree
                                  ? "var(--color-secondary)"
                                  : detail?.isHighlight
                                  ? "var(--color-primary)"
                                  : "var(--color-muted)",
                              }}
                            >
                              {detail?.value ?? "—"}
                              {detail?.unit && (
                                <span className="font-normal text-[10px] ml-1">{detail.unit}</span>
                              )}
                            </span>
                          </td>
                        )
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Disclaimer */}
            <div
              className="flex items-start gap-3 p-4 rounded-xl mb-8 text-sm"
              style={{ backgroundColor: "#FFF3CD", color: "#856404", border: "1px solid #FFECB5" }}
            >
              <span className="shrink-0">⚠️</span>
              <p>
                <strong>Orange Money</strong> et <strong>MTN MoMo</strong> : données d'exemple (à vérifier).
                <strong> Soutra Money</strong> : données réelles et vérifiées.
              </p>
            </div>

            {/* Offres recommandées */}
            <h2 className="text-lg font-bold mb-5" style={{ color: "var(--color-text)" }}>
              ⭐ Les bons plans du moment
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {OFFERS.filter((o) => o.verticalSlug === "mobile-money" && o.isFeatured).map((offer) => {
                const provider = PROVIDERS.find((p) => p.slug === offer.providerSlug)!
                return (
                  <OfferCard key={offer.slug} offer={offer} provider={provider} verticalSlug="mobile-money" />
                )
              })}
            </div>
          </div>
        ) : (
          /* Après lancement */
          <div className="animate-hp-fade-up">
            <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
              <h2 className="text-lg font-bold" style={{ color: "var(--color-text)" }}>
                {sortedOffers.length} service{sortedOffers.length > 1 ? "s" : ""} trouvé
                {sortedOffers.length > 1 ? "s" : ""}
                {selCategory !== "all" && (
                  <span className="ml-2 text-sm font-normal" style={{ color: "var(--color-muted)" }}>
                    — {CATEGORIES.find((c) => c.slug === selCategory)?.label}
                  </span>
                )}
              </h2>
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4" style={{ color: "var(--color-muted)" }} />
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortKey)}
                  className="text-sm rounded-lg px-3 py-1.5 border outline-none"
                  style={{
                    borderColor: "var(--color-border)",
                    color: "var(--color-text)",
                    backgroundColor: "var(--color-card)",
                  }}
                >
                  <option value="hp">Meilleur HP Score</option>
                  <option value="price-asc">Prix croissant</option>
                </select>
              </div>
            </div>

            {sortedOffers.length === 0 ? (
              <p style={{ color: "var(--color-muted)" }}>
                Aucun service pour cette sélection. Essayez &quot;Tous les services&quot;.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {sortedOffers.map((offer) => {
                  const provider = PROVIDERS.find((p) => p.slug === offer.providerSlug)!
                  return (
                    <OfferCard key={offer.slug} offer={offer} provider={provider} verticalSlug="mobile-money" />
                  )
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  )
}
