"use client"

import { useMemo, useRef, useState } from "react"
import Link from "next/link"
import { OFFERS, PROVIDERS } from "@/lib/data/seed-data"
import OfferCard from "@/components/compare/OfferCard"
import { Smartphone, Wifi, ArrowRight, ShieldCheck, Sparkles } from "lucide-react"

const MOBILE_CATS = ["forfait-mobile", "pass-data"]
const INTERNET_CATS = ["internet-fixe"]

const SORT_OPTIONS = [
  { value: "score", label: "Meilleur HP Score" },
  { value: "featured", label: "Recommandées d'abord" },
]

export default function TelecomComparateurPage() {
  const [selMobile, setSelMobile] = useState(true)
  const [selInternet, setSelInternet] = useState(true)
  const [launched, setLaunched] = useState(false)
  const [sort, setSort] = useState("score")
  const resultsRef = useRef<HTMLDivElement>(null)

  const telecomOffers = useMemo(() => OFFERS.filter((o) => o.verticalSlug === "telecom"), [])
  const telecomProviders = useMemo(
    () => PROVIDERS.filter((p) => p.verticalSlug === "telecom").sort((a, b) => b.hpScoreNum - a.hpScoreNum),
    []
  )
  const featured = useMemo(() => telecomOffers.filter((o) => o.isFeatured), [telecomOffers])

  const selectedCats = useMemo(() => {
    const c: string[] = []
    if (selMobile) c.push(...MOBILE_CATS)
    if (selInternet) c.push(...INTERNET_CATS)
    return c
  }, [selMobile, selInternet])

  const results = useMemo(() => {
    return telecomOffers
      .filter((o) => selectedCats.includes(o.category))
      .sort((a, b) => {
        if (sort === "featured") return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0)
        return b.hpScoreNum - a.hpScoreNum
      })
  }, [telecomOffers, selectedCats, sort])

  function launch() {
    setLaunched(true)
    setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 60)
  }

  return (
    <>
      {/* Hero comparateur */}
      <section
        className="relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, var(--color-primary-dark) 0%, var(--color-primary) 60%, var(--color-secondary) 140%)` }}
      >
        {/* Décor bulles */}
        <div className="pointer-events-none absolute inset-0 opacity-20">
          <div className="absolute -top-10 -left-10 w-64 h-64 rounded-full" style={{ background: "radial-gradient(circle, #fff 0%, transparent 70%)" }} />
          <div className="absolute top-20 right-10 w-40 h-40 rounded-full" style={{ background: "radial-gradient(circle, var(--color-accent) 0%, transparent 70%)" }} />
        </div>

        <div className="container relative py-12 sm:py-16">
          <nav className="text-sm mb-4" style={{ color: "rgba(255,255,255,0.6)" }}>
            <Link href="/" className="hover:text-white">Accueil</Link>
            <span className="mx-2">/</span>
            <Link href="/telecom/" className="hover:text-white">Internet & Mobile</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Comparateur</span>
          </nav>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-3 max-w-2xl leading-tight">
            Comparez les offres internet et mobile en Guinée
          </h1>
          <p className="text-base sm:text-lg max-w-xl mb-8" style={{ color: "rgba(255,255,255,0.85)" }}>
            En quelques secondes, trouvez le forfait, le pass data ou la box la mieux notée par notre HP Score —
            100 % gratuit et indépendant.
          </p>

          {/* Widget de sélection */}
          <div
            className="rounded-2xl p-4 sm:p-5 shadow-2xl max-w-3xl"
            style={{ backgroundColor: "var(--color-card)" }}
          >
            <p className="text-sm font-semibold mb-3" style={{ color: "var(--color-muted)" }}>
              Que souhaitez-vous comparer ?
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <ChoiceTile
                active={selMobile}
                onToggle={() => setSelMobile((v) => !v)}
                icon={<Smartphone className="w-5 h-5" />}
                title="Mobile"
                subtitle="Forfaits & pass data"
              />
              <ChoiceTile
                active={selInternet}
                onToggle={() => setSelInternet((v) => !v)}
                icon={<Wifi className="w-5 h-5" />}
                title="Internet maison"
                subtitle="Box & fibre"
              />
              <button
                onClick={launch}
                disabled={selectedCats.length === 0}
                className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-base font-bold text-white transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed sm:ml-auto"
                style={{ backgroundColor: "var(--color-accent)" }}
              >
                Lancer la comparaison
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
            {selectedCats.length === 0 && (
              <p className="text-xs mt-3" style={{ color: "var(--color-warning)" }}>
                Sélectionnez au moins une catégorie pour lancer la comparaison.
              </p>
            )}
          </div>

          {/* Ligne de confiance */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-6 text-sm" style={{ color: "rgba(255,255,255,0.85)" }}>
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" style={{ color: "var(--color-accent)" }} />
              <strong className="text-white">{telecomOffers.length}</strong> offres comparées
            </span>
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" style={{ color: "var(--color-accent)" }} />
              <strong className="text-white">{telecomProviders.length}</strong> opérateurs référencés
            </span>
            <span>HP Score indépendant — sans publicité déguisée</span>
          </div>
        </div>
      </section>

      {/* Mur des opérateurs */}
      <section className="py-8 border-b" style={{ borderColor: "var(--color-border)" }}>
        <div className="container">
          <p className="text-center text-xs font-medium uppercase tracking-wide mb-5" style={{ color: "var(--color-muted)" }}>
            Les opérateurs que nous comparons
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {telecomProviders.map((p) => (
              <Link
                key={p.slug}
                href={`/telecom/fournisseurs/${p.slug}/`}
                className="flex items-center gap-2.5 pl-2 pr-4 py-2 rounded-full border transition-all hover:shadow-md hover:-translate-y-0.5"
                style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-card)" }}
              >
                <span
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                  style={{ backgroundColor: "var(--color-primary)" }}
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
        {launched ? (
          <div className="hp-fade-up">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-extrabold" style={{ color: "var(--color-text)" }}>
                  {results.length} offre{results.length > 1 ? "s" : ""} pour vous
                </h2>
                <p className="text-sm" style={{ color: "var(--color-muted)" }}>
                  {[selMobile && "Mobile", selInternet && "Internet maison"].filter(Boolean).join(" + ")}
                </p>
              </div>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="px-3 py-2 rounded-xl text-sm border"
                style={{ borderColor: "var(--color-border)", color: "var(--color-text)", backgroundColor: "var(--color-card)" }}
              >
                {SORT_OPTIONS.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
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

            {results.length === 0 ? (
              <div className="text-center py-16" style={{ color: "var(--color-muted)" }}>
                Aucune offre ne correspond à votre sélection.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {results.map((offer) => {
                  const provider = PROVIDERS.find((p) => p.slug === offer.providerSlug)!
                  return <OfferCard key={offer.slug} offer={offer} provider={provider} verticalSlug="telecom" />
                })}
              </div>
            )}
          </div>
        ) : (
          /* Aperçu avant lancement : les bons plans du mois */
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-5 h-5" style={{ color: "var(--color-accent)" }} />
              <h2 className="text-2xl font-extrabold" style={{ color: "var(--color-text)" }}>
                Les bons plans du mois
              </h2>
            </div>
            <p className="text-sm mb-6" style={{ color: "var(--color-muted)" }}>
              Nos offres les mieux notées en ce moment. Lancez la comparaison ci-dessus pour tout voir.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {(featured.length ? featured : telecomOffers.slice(0, 3)).map((offer) => {
                const provider = PROVIDERS.find((p) => p.slug === offer.providerSlug)!
                return <OfferCard key={offer.slug} offer={offer} provider={provider} verticalSlug="telecom" />
              })}
            </div>

            <div className="text-center mt-8">
              <button
                onClick={launch}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: "var(--color-primary)" }}
              >
                Voir toutes les offres <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

function ChoiceTile({
  active,
  onToggle,
  icon,
  title,
  subtitle,
}: {
  active: boolean
  onToggle: () => void
  icon: React.ReactNode
  title: string
  subtitle: string
}) {
  return (
    <button
      onClick={onToggle}
      aria-pressed={active}
      className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-left transition-all active:scale-[0.98]"
      style={{
        borderColor: active ? "var(--color-secondary)" : "var(--color-border)",
        backgroundColor: active ? "var(--color-secondary-light)" : "var(--color-surface)",
      }}
    >
      <span
        className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 text-white"
        style={{ backgroundColor: active ? "var(--color-secondary)" : "var(--color-muted)" }}
      >
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-bold" style={{ color: "var(--color-text)" }}>{title}</span>
        <span className="block text-xs" style={{ color: "var(--color-muted)" }}>{subtitle}</span>
      </span>
      <span
        className="ml-auto w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0"
        style={{
          borderColor: active ? "var(--color-secondary)" : "var(--color-border)",
          backgroundColor: active ? "var(--color-secondary)" : "transparent",
        }}
      >
        {active && (
          <svg className="w-3 h-3 text-white" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.7 5.3a1 1 0 010 1.4l-8 8a1 1 0 01-1.4 0l-4-4a1 1 0 011.4-1.4L8 12.6l7.3-7.3a1 1 0 011.4 0z" clipRule="evenodd" />
          </svg>
        )}
      </span>
    </button>
  )
}
