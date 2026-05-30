"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { PROVIDERS, OFFERS } from "@/lib/data/seed-data"
import OfferCard from "@/components/compare/OfferCard"
import { ArrowRight, SlidersHorizontal } from "lucide-react"

const CATEGORIES = [
  { slug: "all", label: "Toutes", icon: "🌐" },
  { slug: "4g-fixe", label: "Box 4G", icon: "📶" },
  { slug: "adsl", label: "ADSL", icon: "🔌" },
  { slug: "fibre", label: "Fibre", icon: "⚡" },
  { slug: "satellite", label: "Satellite", icon: "🛰️" },
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
        backgroundColor: active ? "var(--color-secondary-light, var(--color-primary-light))" : "var(--color-card)",
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
      <span className="text-xs font-semibold text-center" style={{ color: "var(--color-text)" }}>
        {label}
      </span>
    </button>
  )
}

export default function FaiComparateurPage() {
  const [selCategory, setSelCategory] = useState("all")
  const [launched, setLaunched] = useState(false)
  const [sort, setSort] = useState<SortKey>("hp")
  const resultsRef = useRef<HTMLDivElement>(null)

  const faiProviders = PROVIDERS.filter((p) => p.verticalSlug === "fai")

  function launch() {
    setLaunched(true)
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    }, 100)
  }

  const rawOffers = OFFERS.filter((o) => {
    if (o.verticalSlug !== "fai") return false
    if (selCategory !== "all" && o.category !== selCategory) return false
    return true
  })

  const sortedOffers = [...rawOffers].sort((a, b) =>
    sort === "hp" ? b.hpScoreNum - a.hpScoreNum : 0
  )

  const totalFai = OFFERS.filter((o) => o.verticalSlug === "fai").length

  return (
    <>
      {/* Hero */}
      <section
        className="py-10"
        style={{ background: `linear-gradient(135deg, #003087 0%, #0070C0 100%)` }}
      >
        <div className="container">
          <nav className="text-sm mb-3" style={{ color: "rgba(255,255,255,0.6)" }}>
            <Link href="/" className="hover:text-white">Accueil</Link>
            <span className="mx-2">/</span>
            <Link href="/fai/" className="hover:text-white">Internet Fixe</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Comparateur</span>
          </nav>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-1">
            Comparateur internet Guinée
          </h1>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.75)" }}>
            {totalFai} offres comparées · {faiProviders.length} fournisseurs · HP Score indépendant
          </p>
        </div>
      </section>

      {/* Widget de sélection */}
      <section
        className="py-8"
        style={{ backgroundColor: "var(--color-primary-light)" }}
      >
        <div className="container max-w-2xl">
          <p className="text-sm font-semibold mb-4 text-center" style={{ color: "var(--color-text)" }}>
            Quel type de connexion recherchez-vous ?
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
            Voir les offres <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Mur des FAI */}
      <section className="py-6 border-b" style={{ borderColor: "var(--color-border)" }}>
        <div className="container">
          <p className="text-xs font-medium uppercase tracking-wide mb-3" style={{ color: "var(--color-muted)" }}>
            Fournisseurs comparés
          </p>
          <div className="flex flex-wrap gap-2">
            {faiProviders.map((p) => (
              <Link
                key={p.slug}
                href={`/fai/fournisseurs/${p.slug}/`}
                className="flex items-center gap-2.5 pl-2 pr-4 py-2 rounded-full border transition-all hover:shadow-md hover:-translate-y-0.5"
                style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-card)" }}
              >
                <span
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                  style={{ backgroundColor: p.brandColor ?? "var(--color-primary)" }}
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
          /* Avant lancement — bons plans */
          <div>
            <h2 className="text-lg font-bold mb-5" style={{ color: "var(--color-text)" }}>
              🏆 Les bons plans internet du moment
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {OFFERS.filter((o) => o.verticalSlug === "fai" && o.isFeatured).map((offer) => {
                const provider = PROVIDERS.find((p) => p.slug === offer.providerSlug)!
                return (
                  <OfferCard key={offer.slug} offer={offer} provider={provider} verticalSlug="fai" />
                )
              })}
            </div>
          </div>
        ) : (
          /* Après lancement */
          <div className="animate-hp-fade-up">
            <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
              <h2 className="text-lg font-bold" style={{ color: "var(--color-text)" }}>
                {sortedOffers.length} offre{sortedOffers.length > 1 ? "s" : ""} trouvée
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
                  style={{ borderColor: "var(--color-border)", color: "var(--color-text)", backgroundColor: "var(--color-card)" }}
                >
                  <option value="hp">Meilleur HP Score</option>
                  <option value="price-asc">Prix croissant</option>
                </select>
              </div>
            </div>

            {sortedOffers.length === 0 ? (
              <p style={{ color: "var(--color-muted)" }}>
                Aucune offre pour cette sélection. Essayez &quot;Toutes&quot; les catégories.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {sortedOffers.map((offer) => {
                  const provider = PROVIDERS.find((p) => p.slug === offer.providerSlug)!
                  return (
                    <OfferCard key={offer.slug} offer={offer} provider={provider} verticalSlug="fai" />
                  )
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Disclaimer */}
      <div className="container pb-10">
        <div
          className="flex items-start gap-3 p-4 rounded-xl text-sm"
          style={{ backgroundColor: "var(--color-warning)", color: "#fff" }}
        >
          <span className="text-lg shrink-0">⚠️</span>
          <p>
            Les tarifs affichés sont des <strong>données indicatives à titre d'exemple</strong>.
            Les prix et débits réels varient selon votre zone et peuvent évoluer.
            Un conseiller Help&apos;me Process peut vous accompagner gratuitement.
          </p>
        </div>
      </div>
    </>
  )
}
