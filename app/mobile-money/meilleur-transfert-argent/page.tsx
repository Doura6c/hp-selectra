import type { Metadata } from "next"
import Link from "next/link"
import { OFFERS, PROVIDERS } from "@/lib/data/seed-data"
import OfferCard from "@/components/compare/OfferCard"

export const metadata: Metadata = {
  title: "Meilleur transfert d'argent en Guinée 2026 — Comparatif",
  description:
    "Quel service de mobile money propose les frais les plus bas en Guinée ? Soutra Money : dépôts et retraits gratuits, transfert ≤ 1 %.",
}

export default function MeilleurTransfertPage() {
  const offers = OFFERS.filter((o) => o.verticalSlug === "mobile-money")
    .sort((a, b) => b.hpScoreNum - a.hpScoreNum)

  return (
    <>
      <section
        className="py-10"
        style={{ background: `linear-gradient(135deg, var(--color-secondary-dark), var(--color-secondary))` }}
      >
        <div className="container">
          <nav className="text-sm mb-3" style={{ color: "rgba(255,255,255,0.6)" }}>
            <Link href="/" className="hover:text-white">Accueil</Link>
            <span className="mx-2">/</span>
            <Link href="/mobile-money/" className="hover:text-white">Mobile Money</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Meilleur transfert d'argent</span>
          </nav>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
            🏆 Meilleur transfert d'argent en Guinée 2026
          </h1>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.85)" }}>
            Classement HP Selectra — dépôt, retrait, transfert · {offers.length} services comparés
          </p>
        </div>
      </section>

      <div className="container py-10">
        {/* Highlight Soutra */}
        <div
          className="p-5 rounded-2xl border-2 mb-8"
          style={{ backgroundColor: "var(--color-secondary-light)", borderColor: "var(--color-secondary)" }}
        >
          <p className="font-bold mb-1" style={{ color: "var(--color-text)" }}>
            💡 Le verdict HP Selectra
          </p>
          <p className="text-sm" style={{ color: "var(--color-muted)" }}>
            <strong style={{ color: "var(--color-secondary)" }}>Soutra Money</strong> est la solution la plus avantageuse du marché guinéen en 2026 :
            dépôts et retraits <strong>100 % gratuits</strong>, transferts plafonnés à <strong>1 % maximum</strong>.
            C'est la seule fintech 100 % guinéenne avec une carte Visa prépayée. Données réelles vérifiées.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {offers.map((offer, i) => {
            const provider = PROVIDERS.find((p) => p.slug === offer.providerSlug)!
            return (
              <div key={offer.slug} className="relative">
                {i === 0 && (
                  <div
                    className="absolute -top-3 left-4 z-10 text-xs font-bold px-3 py-1 rounded-full text-white"
                    style={{ backgroundColor: "var(--color-accent)" }}
                  >
                    🥇 N°1 HP Score
                  </div>
                )}
                <OfferCard offer={offer} provider={provider} verticalSlug="mobile-money" />
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
