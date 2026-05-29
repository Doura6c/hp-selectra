"use client"

import Link from "next/link"
import { OFFERS, PROVIDERS } from "@/lib/data/seed-data"
import HPScoreBadge from "@/components/ui/HPScoreBadge"

export default function MobileMoneyComparateurPage() {
  const offers = OFFERS.filter(
    (o) => o.verticalSlug === "mobile-money" && o.category === "transfert"
  ).sort((a, b) => b.hpScoreNum - a.hpScoreNum)

  // Colonnes de la grille de comparaison
  const KEYS = ["Dépôt", "Retrait", "Transfert", "Paiement factures", "Carte Visa", "Réseau agents"]

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
            <span className="text-white">Comparateur</span>
          </nav>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-1">
            Comparer les frais Mobile Money en Guinée
          </h1>
          <p style={{ color: "rgba(255,255,255,0.8)" }} className="text-sm">
            Dépôt · Retrait · Transfert — {offers.length} services comparés
          </p>
        </div>
      </section>

      <div className="container py-8">
        {/* Disclaimer */}
        <div
          className="flex items-start gap-3 p-4 rounded-xl mb-6 text-sm"
          style={{ backgroundColor: "#FFF3CD", color: "#856404", border: "1px solid #FFECB5" }}
        >
          <span className="shrink-0">⚠️</span>
          <p>
            Les données <strong>Orange Money</strong> et <strong>MTN MoMo</strong> sont des estimations d'exemple (mention « à vérifier »).
            Les données <strong>Soutra Money</strong> sont réelles et vérifiées.
          </p>
        </div>

        {/* Tableau de comparaison */}
        <div className="overflow-x-auto rounded-2xl border shadow-sm" style={{ borderColor: "var(--color-border)" }}>
          <table className="w-full text-sm min-w-[600px]" style={{ backgroundColor: "var(--color-card)" }}>
            <thead>
              <tr style={{ backgroundColor: "var(--color-primary)" }}>
                <th className="text-left px-4 py-4 text-white font-semibold w-36">Critère</th>
                {offers.map((offer) => {
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
              {KEYS.map((key, rowIdx) => (
                <tr
                  key={key}
                  style={{
                    backgroundColor: rowIdx % 2 === 0 ? "var(--color-card)" : "var(--color-surface)",
                  }}
                >
                  <td className="px-4 py-3 font-medium text-xs" style={{ color: "var(--color-muted)" }}>
                    {key}
                  </td>
                  {offers.map((offer) => {
                    const detail = offer.details.find((d) => d.key === key)
                    const isHighlight = detail?.isHighlight
                    const isFree = detail?.value === "Gratuit"
                    return (
                      <td key={offer.slug} className="px-4 py-3 text-center">
                        <span
                          className="font-semibold text-xs"
                          style={{
                            color: isFree
                              ? "var(--color-secondary)"
                              : isHighlight
                              ? "var(--color-primary)"
                              : "var(--color-muted)",
                          }}
                        >
                          {detail?.value ?? "—"}
                          {detail?.unit && (
                            <span className="font-normal text-[10px] ml-1">{detail.unit}</span>
                          )}
                        </span>
                        {offer.priceIsExample && detail?.value === "À vérifier" && (
                          <span
                            className="block text-[9px] mt-0.5 font-medium"
                            style={{ color: "var(--color-warning)" }}
                          >
                            ⚠ exemple
                          </span>
                        )}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/mobile-money/fournisseurs/soutra-money/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white"
            style={{ backgroundColor: "var(--color-secondary)" }}
          >
            En savoir plus sur Soutra Money →
          </Link>
        </div>
      </div>
    </>
  )
}
