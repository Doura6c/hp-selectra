import type { Metadata } from "next"
import Link from "next/link"
import { PROVIDERS, OFFERS } from "@/lib/data/seed-data"
import OfferCard from "@/components/compare/OfferCard"
import ProviderCard from "@/components/compare/ProviderCard"
import { ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Mobile Money & Transfert en Guinée — Comparez les frais",
  description:
    "Comparez Orange Money, MTN MoMo et Soutra Money : frais de dépôt, retrait et transfert. Soutra Money : dépôts et retraits gratuits, transfert ≤ 1 %.",
}

export default function MobileMoneyPage() {
  const providers = PROVIDERS.filter((p) => p.verticalSlug === "mobile-money").sort(
    (a, b) => b.hpScoreNum - a.hpScoreNum
  )
  const featuredOffers = OFFERS.filter((o) => o.verticalSlug === "mobile-money" && o.isFeatured)
  const allOffers = OFFERS.filter((o) => o.verticalSlug === "mobile-money")

  return (
    <>
      {/* Hero */}
      <section
        className="py-12 sm:py-16"
        style={{
          background: `linear-gradient(135deg, var(--color-secondary-dark) 0%, var(--color-secondary) 100%)`,
        }}
      >
        <div className="container">
          <nav className="text-sm mb-4" style={{ color: "rgba(255,255,255,0.6)" }}>
            <Link href="/" className="hover:text-white">Accueil</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Mobile Money & Transfert</span>
          </nav>
          <div className="flex items-start gap-4">
            <div className="text-5xl">💸</div>
            <div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white mb-2">
                Mobile Money & Transfert en Guinée
              </h1>
              <p className="text-base max-w-xl" style={{ color: "rgba(255,255,255,0.85)" }}>
                Comparez les frais de dépôt, retrait et transfert d'argent de tous les services
                disponibles en Guinée. Découvrez{" "}
                <strong className="text-white">Soutra Money</strong> : dépôts et retraits
                gratuits, transfert ≤ 1 % — le plus bas du marché.
              </p>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/mobile-money/comparateur/"
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: "var(--color-primary)" }}
            >
              ⚖️ Comparateur de frais
            </Link>
            <Link
              href="/mobile-money/meilleur-transfert-argent/"
              className="px-5 py-2.5 rounded-xl text-sm font-semibold border border-white/30 text-white hover:bg-white/10 transition-colors"
            >
              🏆 Meilleur transfert 2026
            </Link>
          </div>
        </div>
      </section>

      {/* Highlight Soutra Money */}
      <section className="py-8">
        <div className="container">
          <div
            className="rounded-2xl p-6 sm:p-8 border-2"
            style={{ backgroundColor: "var(--color-secondary-light)", borderColor: "var(--color-secondary)" }}
          >
            <div className="flex items-start gap-4">
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl font-bold text-white shrink-0"
                style={{ backgroundColor: "var(--color-secondary)" }}
              >
                SM
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="font-bold text-lg" style={{ color: "var(--color-text)" }}>
                    Soutra Money — Le meilleur tarif du marché
                  </h2>
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded-full text-white"
                    style={{ backgroundColor: "var(--color-score-a)" }}
                  >
                    HP Score A
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-3 mt-3">
                  {[
                    { label: "Dépôt", value: "Gratuit ✓" },
                    { label: "Retrait", value: "Gratuit ✓" },
                    { label: "Transfert", value: "≤ 1 % ✓" },
                  ].map((item) => (
                    <div key={item.label} className="text-center p-3 rounded-xl bg-white shadow-sm">
                      <p className="text-xs font-medium mb-1" style={{ color: "var(--color-muted)" }}>{item.label}</p>
                      <p className="font-bold text-sm" style={{ color: "var(--color-secondary)" }}>{item.value}</p>
                    </div>
                  ))}
                </div>
                <p className="text-xs mt-3" style={{ color: "var(--color-muted)" }}>
                  Données réelles vérifiées · Fintech 100 % guinéenne (Digital Pay — Groupe LANALA) · Paiement EDG · Carte Visa prépayée
                </p>
              </div>
              <Link
                href="/mobile-money/fournisseurs/soutra-money/"
                className="shrink-0 px-4 py-2 rounded-xl text-sm font-semibold text-white"
                style={{ backgroundColor: "var(--color-secondary)" }}
              >
                Voir →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Offres */}
      <section className="py-10">
        <div className="container">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold" style={{ color: "var(--color-text)" }}>
              Comparer les services
            </h2>
            <Link href="/mobile-money/comparateur/" className="flex items-center gap-1 text-sm font-semibold" style={{ color: "var(--color-primary)" }}>
              Voir tout <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {(featuredOffers.length ? featuredOffers : allOffers).map((offer) => {
              const provider = PROVIDERS.find((p) => p.slug === offer.providerSlug)!
              return (
                <OfferCard key={offer.slug} offer={offer} provider={provider} verticalSlug="mobile-money" />
              )
            })}
          </div>
        </div>
      </section>

      {/* Fournisseurs */}
      <section className="py-10" style={{ backgroundColor: "var(--color-secondary-light)" }}>
        <div className="container">
          <h2 className="text-xl font-bold mb-6" style={{ color: "var(--color-text)" }}>Les services disponibles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {providers.map((p) => (
              <ProviderCard key={p.slug} provider={p} verticalSlug="mobile-money" />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
