import type { Metadata } from "next"
import Link from "next/link"
import { PROVIDERS, OFFERS } from "@/lib/data/seed-data"
import OfferCard from "@/components/compare/OfferCard"
import ProviderCard from "@/components/compare/ProviderCard"
import { ArrowRight, Wifi } from "lucide-react"

export const metadata: Metadata = {
  title: "Internet Fixe en Guinée — Comparez les FAI",
  description:
    "Comparez les fournisseurs d'accès internet en Guinée : Box 4G Orange, ADSL Guinée Télécom, fibre GUILAB, satellite Spacetel. HP Score indépendant.",
}

export default function FaiPage() {
  const providers = PROVIDERS.filter((p) => p.verticalSlug === "fai")
  const featuredOffers = OFFERS.filter((o) => o.verticalSlug === "fai" && o.isFeatured)
  const allOffers = OFFERS.filter((o) => o.verticalSlug === "fai")

  const techIcons: Record<string, string> = {
    "4g-fixe": "📶",
    adsl: "🔌",
    fibre: "⚡",
    satellite: "🛰️",
  }

  const techLabels: Record<string, string> = {
    "4g-fixe": "Box 4G",
    adsl: "ADSL",
    fibre: "Fibre optique",
    satellite: "Satellite",
  }

  const categories = ["4g-fixe", "adsl", "fibre", "satellite"]

  return (
    <>
      {/* Hero */}
      <section
        className="py-12 sm:py-16"
        style={{ background: `linear-gradient(135deg, #003087 0%, #0070C0 100%)` }}
      >
        <div className="container">
          <nav className="text-sm mb-4" style={{ color: "rgba(255,255,255,0.6)" }}>
            <Link href="/" className="hover:text-white">Accueil</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Internet Fixe</span>
          </nav>
          <div className="flex items-start gap-4">
            <div className="text-5xl">🌐</div>
            <div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white mb-2">
                Internet Fixe en Guinée
              </h1>
              <p className="text-base max-w-xl" style={{ color: "rgba(255,255,255,0.8)" }}>
                Box 4G, ADSL, fibre et satellite : comparez les {providers.length} fournisseurs
                d'accès internet pour trouver la meilleure connexion à domicile ou en entreprise.
              </p>
            </div>
          </div>

          {/* Actions rapides */}
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/fai/comparateur/"
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: "var(--color-secondary)" }}
            >
              ⚖️ Comparateur internet
            </Link>
            <Link
              href="/fai/meilleur-fai/"
              className="px-5 py-2.5 rounded-xl text-sm font-semibold border border-white/30 text-white hover:bg-white/10 transition-colors"
            >
              🏆 Meilleur FAI 2026
            </Link>
            <Link
              href="/fai/fournisseurs/"
              className="px-5 py-2.5 rounded-xl text-sm font-semibold border border-white/30 text-white hover:bg-white/10 transition-colors"
            >
              📋 Tous les FAI
            </Link>
          </div>

          {/* Technologies */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`/fai/comparateur/?type=${cat}`}
                className="rounded-xl p-3 text-center transition-colors hover:bg-white/20"
                style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
              >
                <div className="text-2xl mb-1">{techIcons[cat]}</div>
                <p className="text-xs font-semibold text-white">{techLabels[cat]}</p>
                <p className="text-[10px] mt-0.5" style={{ color: "rgba(255,255,255,0.6)" }}>
                  {allOffers.filter((o) => o.category === cat).length} offre
                  {allOffers.filter((o) => o.category === cat).length > 1 ? "s" : ""}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Offres recommandées */}
      <section className="py-12 sm:py-16">
        <div className="container">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold" style={{ color: "var(--color-text)" }}>
              Meilleures offres internet du moment
            </h2>
            <Link
              href="/fai/comparateur/"
              className="flex items-center gap-1 text-sm font-semibold"
              style={{ color: "var(--color-primary)" }}
            >
              Voir tout <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {(featuredOffers.length ? featuredOffers : allOffers.slice(0, 3)).map((offer) => {
              const provider = PROVIDERS.find((p) => p.slug === offer.providerSlug)!
              return (
                <OfferCard key={offer.slug} offer={offer} provider={provider} verticalSlug="fai" />
              )
            })}
          </div>
        </div>
      </section>

      {/* Fournisseurs */}
      <section className="py-12 sm:py-16" style={{ backgroundColor: "var(--color-primary-light)" }}>
        <div className="container">
          <h2 className="text-xl font-bold mb-6" style={{ color: "var(--color-text)" }}>
            Les fournisseurs d'accès internet en Guinée
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {providers.map((provider) => {
              const count = OFFERS.filter(
                (o) => o.providerSlug === provider.slug && o.verticalSlug === "fai"
              ).length
              return (
                <ProviderCard
                  key={provider.slug}
                  provider={provider}
                  verticalSlug="fai"
                  offerCount={count}
                />
              )
            })}
          </div>
        </div>
      </section>

      {/* Guide */}
      <section className="py-12 sm:py-16">
        <div className="container max-w-2xl">
          <h2 className="text-xl font-bold mb-6" style={{ color: "var(--color-text)" }}>
            Quelle connexion internet choisir en Guinée ?
          </h2>
          <div className="space-y-4 text-sm" style={{ color: "var(--color-muted)" }}>
            <p>
              <strong style={{ color: "var(--color-text)" }}>Box 4G (Orange, Telecel)</strong> — la
              solution la plus rapide à déployer et la plus populaire. Idéale si vous avez une bonne
              couverture 4G dans votre quartier. Pas de câblage, installation en quelques minutes.
            </p>
            <p>
              <strong style={{ color: "var(--color-text)" }}>ADSL (Guinée Télécom)</strong> — connexion
              filaire stable, disponible dans les zones câblées de Conakry et grandes villes.
              Débit garanti, recommandée pour les entreprises qui ont besoin de stabilité.
            </p>
            <p>
              <strong style={{ color: "var(--color-text)" }}>Fibre optique (GUILAB)</strong> — le haut
              débit garanti pour les entreprises et institutions. Débit symétrique, SLA, IP fixe.
              Disponible dans certains quartiers de Conakry uniquement.
            </p>
            <p>
              <strong style={{ color: "var(--color-text)" }}>Satellite (Spacetel)</strong> — couvre
              tout le territoire guinéen sans exception. Solution de dernier recours pour les sites
              isolés, mines, ONG en zones rurales. Latence élevée mais disponibilité universelle.
            </p>
          </div>
          <div className="flex items-center gap-3 mt-6">
            <Wifi className="w-5 h-5 shrink-0" style={{ color: "var(--color-primary)" }} />
            <Link
              href="/fai/meilleur-fai/"
              className="text-sm font-semibold"
              style={{ color: "var(--color-primary)" }}
            >
              Lire notre guide complet : Meilleur FAI Guinée 2026 <ArrowRight className="w-4 h-4 inline" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
