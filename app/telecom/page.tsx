import type { Metadata } from "next"
import Link from "next/link"
import { PROVIDERS, OFFERS } from "@/lib/data/seed-data"
import OfferCard from "@/components/compare/OfferCard"
import ProviderCard from "@/components/compare/ProviderCard"
import { ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Internet & Mobile en Guinée — Comparez les opérateurs",
  description:
    "Comparez les forfaits mobiles et offres internet des opérateurs guinéens : Orange Guinée, Telecel, Cellcom, Guinée Télécoms. HP Score indépendant.",
}

export default function TelecomPage() {
  const providers = PROVIDERS.filter((p) => p.verticalSlug === "telecom")
  const featuredOffers = OFFERS.filter((o) => o.verticalSlug === "telecom" && o.isFeatured)
  const allOffers = OFFERS.filter((o) => o.verticalSlug === "telecom")

  return (
    <>
      {/* Hero verticale */}
      <section
        className="py-12 sm:py-16"
        style={{
          background: `linear-gradient(135deg, var(--color-primary-dark) 0%, var(--color-primary) 100%)`,
        }}
      >
        <div className="container">
          <nav className="text-sm mb-4" style={{ color: "rgba(255,255,255,0.6)" }}>
            <Link href="/" className="hover:text-white">Accueil</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Internet & Mobile</span>
          </nav>
          <div className="flex items-start gap-4">
            <div className="text-5xl">📱</div>
            <div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white mb-2">
                Internet & Mobile en Guinée
              </h1>
              <p className="text-base max-w-xl" style={{ color: "rgba(255,255,255,0.8)" }}>
                Comparez les forfaits mobiles, bundles data et internet fixe des 4 opérateurs guinéens.
                Trouvez le meilleur rapport qualité-prix grâce au HP Score indépendant.
              </p>
            </div>
          </div>

          {/* Actions rapides */}
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/telecom/comparateur/"
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: "var(--color-secondary)" }}
            >
              ⚖️ Comparateur de forfaits
            </Link>
            <Link
              href="/telecom/meilleur-forfait-mobile/"
              className="px-5 py-2.5 rounded-xl text-sm font-semibold border border-white/30 text-white hover:bg-white/10 transition-colors"
            >
              🏆 Meilleur forfait 2026
            </Link>
            <Link
              href="/telecom/fournisseurs/"
              className="px-5 py-2.5 rounded-xl text-sm font-semibold border border-white/30 text-white hover:bg-white/10 transition-colors"
            >
              📋 Tous les opérateurs
            </Link>
          </div>
        </div>
      </section>

      {/* Offres recommandées */}
      <section className="py-12 sm:py-16">
        <div className="container">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold" style={{ color: "var(--color-text)" }}>
              Meilleures offres du moment
            </h2>
            <Link
              href="/telecom/comparateur/"
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
                <OfferCard
                  key={offer.slug}
                  offer={offer}
                  provider={provider}
                  verticalSlug="telecom"
                />
              )
            })}
          </div>
        </div>
      </section>

      {/* Opérateurs */}
      <section className="py-12 sm:py-16" style={{ backgroundColor: "var(--color-primary-light)" }}>
        <div className="container">
          <h2 className="text-xl font-bold mb-6" style={{ color: "var(--color-text)" }}>
            Les opérateurs en Guinée
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {providers.map((provider) => {
              const count = OFFERS.filter(
                (o) => o.providerSlug === provider.slug && o.verticalSlug === "telecom"
              ).length
              return (
                <ProviderCard
                  key={provider.slug}
                  provider={provider}
                  verticalSlug="telecom"
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
            Guide : comment choisir son opérateur en Guinée ?
          </h2>
          <div className="space-y-4 text-sm" style={{ color: "var(--color-muted)" }}>
            <p>
              <strong style={{ color: "var(--color-text)" }}>Orange Guinée</strong> domine le marché avec
              environ 75 % des abonnés et le réseau 4G le plus étendu. Idéal si vous avez besoin d'une
              bonne couverture sur tout le territoire ou si vous utilisez déjà Orange Money.
            </p>
            <p>
              <strong style={{ color: "var(--color-text)" }}>Telecel Guinée</strong> (ex-MTN) est une
              alternative sérieuse avec des offres data compétitives et un réseau en expansion.
            </p>
            <p>
              <strong style={{ color: "var(--color-text)" }}>Cellcom</strong> propose des tarifs
              compétitifs dans les zones urbaines, à considérer si vous êtes principalement à Conakry.
            </p>
            <p>
              <strong style={{ color: "var(--color-text)" }}>Guinée Télécoms</strong> est à privilégier
              pour l'internet fixe ADSL, notamment pour les PME basées à Conakry.
            </p>
          </div>
          <Link
            href="/telecom/meilleur-forfait-mobile/"
            className="inline-flex items-center gap-2 mt-6 text-sm font-semibold"
            style={{ color: "var(--color-primary)" }}
          >
            Lire le comparatif complet <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  )
}
