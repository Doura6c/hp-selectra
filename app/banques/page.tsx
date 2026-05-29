import type { Metadata } from "next"
import Link from "next/link"
import { PROVIDERS, OFFERS } from "@/lib/data/seed-data"
import OfferCard from "@/components/compare/OfferCard"
import ProviderCard from "@/components/compare/ProviderCard"
import { ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Banques en Guinée — Comparez comptes, cartes et frais",
  description:
    "Comparez les banques guinéennes : Ecobank, BICIGUI, Orabank, UBA, Vista Bank, Banque Islamique. Comptes courants, cartes, épargne et HP Score indépendant.",
}

export default function BanquesPage() {
  const providers = PROVIDERS.filter((p) => p.verticalSlug === "banques")
  const featuredOffers = OFFERS.filter((o) => o.verticalSlug === "banques" && o.isFeatured)
  const allOffers = OFFERS.filter((o) => o.verticalSlug === "banques")

  return (
    <>
      {/* Hero verticale */}
      <section
        className="py-12 sm:py-16"
        style={{ background: `linear-gradient(135deg, var(--color-primary-dark) 0%, var(--color-primary) 100%)` }}
      >
        <div className="container">
          <nav className="text-sm mb-4" style={{ color: "rgba(255,255,255,0.6)" }}>
            <Link href="/" className="hover:text-white">Accueil</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Banques</span>
          </nav>
          <div className="flex items-start gap-4">
            <div className="text-5xl">🏦</div>
            <div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white mb-2">
                Banques en Guinée
              </h1>
              <p className="text-base max-w-xl" style={{ color: "rgba(255,255,255,0.8)" }}>
                Comparez comptes courants, cartes bancaires, épargne et banque mobile des
                principales banques guinéennes, grâce au HP Score indépendant.
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/banques/comparateur/"
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: "var(--color-secondary)" }}
            >
              ⚖️ Comparateur de comptes
            </Link>
            <Link
              href="/banques/fournisseurs/"
              className="px-5 py-2.5 rounded-xl text-sm font-semibold border border-white/30 text-white hover:bg-white/10 transition-colors"
            >
              📋 Toutes les banques
            </Link>
          </div>
        </div>
      </section>

      {/* Offres recommandées */}
      <section className="py-12 sm:py-16">
        <div className="container">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold" style={{ color: "var(--color-text)" }}>
              Offres bancaires à la une
            </h2>
            <Link
              href="/banques/comparateur/"
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
                <OfferCard key={offer.slug} offer={offer} provider={provider} verticalSlug="banques" />
              )
            })}
          </div>
        </div>
      </section>

      {/* Banques */}
      <section className="py-12 sm:py-16" style={{ backgroundColor: "var(--color-primary-light)" }}>
        <div className="container">
          <h2 className="text-xl font-bold mb-6" style={{ color: "var(--color-text)" }}>
            Les banques en Guinée
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {providers.map((provider) => {
              const count = OFFERS.filter(
                (o) => o.providerSlug === provider.slug && o.verticalSlug === "banques"
              ).length
              return (
                <ProviderCard
                  key={provider.slug}
                  provider={provider}
                  verticalSlug="banques"
                  offerCount={count}
                />
              )
            })}
          </div>
        </div>
      </section>

      {/* Guide rapide */}
      <section className="py-12 sm:py-16">
        <div className="container max-w-2xl">
          <h2 className="text-xl font-bold mb-6" style={{ color: "var(--color-text)" }}>
            Guide : comment choisir sa banque en Guinée ?
          </h2>
          <div className="space-y-4 text-sm" style={{ color: "var(--color-muted)" }}>
            <p>
              <strong style={{ color: "var(--color-text)" }}>Ecobank Guinée</strong> se distingue par
              son application mobile complète et son réseau panafricain, pratique si vous effectuez des
              opérations dans plusieurs pays africains.
            </p>
            <p>
              <strong style={{ color: "var(--color-text)" }}>BICIGUI</strong>, l'une des banques
              historiques, mise sur un réseau d'agences étendu — un bon choix pour les salariés et PME
              qui privilégient la proximité.
            </p>
            <p>
              <strong style={{ color: "var(--color-text)" }}>UBA</strong> et <strong style={{ color: "var(--color-text)" }}>Orabank</strong> proposent
              des services digitaux modernes et des cartes internationales.
            </p>
            <p>
              <strong style={{ color: "var(--color-text)" }}>La Banque Islamique de Guinée</strong> s'adresse
              à ceux qui recherchent des produits conformes à la finance islamique (sans intérêt).
            </p>
            <p className="text-xs italic">
              Les frais bancaires affichés sont des données d'exemple à vérifier auprès de chaque banque
              avant ouverture de compte.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
