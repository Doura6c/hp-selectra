import type { Metadata } from "next"
import Link from "next/link"
import { OFFERS, PROVIDERS } from "@/lib/data/seed-data"
import OfferCard from "@/components/compare/OfferCard"

export const metadata: Metadata = {
  title: "Meilleur forfait mobile en Guinée 2026 — Comparatif",
  description:
    "Quel est le meilleur forfait mobile en Guinée en 2026 ? Comparatif Orange Guinée, Telecel, Cellcom. HP Score indépendant.",
}

export default function MeilleurForfaitPage() {
  const offers = OFFERS.filter((o) => o.verticalSlug === "telecom" && o.category === "forfait-mobile")
    .sort((a, b) => b.hpScoreNum - a.hpScoreNum)

  return (
    <>
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
            <span className="text-white">Meilleur forfait mobile</span>
          </nav>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
            🏆 Meilleur forfait mobile en Guinée 2026
          </h1>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.8)" }}>
            Classement HP Selectra — mis à jour régulièrement · {offers.length} forfaits analysés
          </p>
        </div>
      </section>

      <div className="container py-10">
        <div
          className="p-4 rounded-xl mb-8 text-sm"
          style={{ backgroundColor: "var(--color-primary-light)", color: "var(--color-text)" }}
        >
          <strong>Méthodologie :</strong> Le classement est calculé par le HP Score — note de A à E basée sur
          la data incluse, les appels, le prix et la couverture réseau. Les tarifs marqués « à vérifier »
          sont indicatifs. <Link href="/methodologie/" className="underline" style={{ color: "var(--color-primary)" }}>En savoir plus →</Link>
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
                <OfferCard offer={offer} provider={provider} verticalSlug="telecom" />
              </div>
            )
          })}
        </div>

        <div className="mt-12 max-w-2xl">
          <h2 className="text-xl font-bold mb-4" style={{ color: "var(--color-text)" }}>
            Comment choisir son forfait mobile en Guinée ?
          </h2>
          <div className="space-y-3 text-sm" style={{ color: "var(--color-muted)" }}>
            <p><strong style={{ color: "var(--color-text)" }}>Vous cherchez la meilleure couverture 4G :</strong> Orange Guinée reste le leader incontesté avec le réseau le plus étendu sur tout le territoire.</p>
            <p><strong style={{ color: "var(--color-text)" }}>Vous voulez plus de data pour moins cher :</strong> Comparez les bundles de Telecel qui proposent souvent des bonus de nuit intéressants.</p>
            <p><strong style={{ color: "var(--color-text)" }}>Vous êtes principalement en zone urbaine :</strong> Cellcom peut être une alternative compétitive sur Conakry et les grandes villes.</p>
            <p><strong style={{ color: "var(--color-text)" }}>Vous avez besoin d'internet fixe :</strong> Guinée Télécoms est la référence pour l'ADSL résidentiel et les connexions PME.</p>
          </div>
        </div>
      </div>
    </>
  )
}
