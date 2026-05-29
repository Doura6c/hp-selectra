import type { Metadata } from "next"
import HPScoreBadge from "@/components/ui/HPScoreBadge"

export const metadata: Metadata = {
  title: "Méthodologie HP Score — Comment nous notons les offres",
  description: "HP Selectra explique en toute transparence comment le HP Score note les offres de A à E.",
}

const SCORES = ["A", "B", "C", "D", "E"] as const

export default function MetodologiePage() {
  return (
    <div className="container py-12 max-w-2xl">
      <h1 className="text-2xl font-bold mb-2" style={{ color: "var(--color-text)" }}>
        Méthodologie HP Score
      </h1>
      <p className="text-sm mb-8" style={{ color: "var(--color-muted)" }}>
        Comment HP Selectra note les offres de manière indépendante et transparente.
      </p>

      {/* Échelle */}
      <section className="mb-10">
        <h2 className="text-base font-semibold mb-4" style={{ color: "var(--color-text)" }}>
          L'échelle HP Score
        </h2>
        <div className="flex flex-col gap-2">
          {SCORES.map((s) => (
            <div key={s} className="flex items-center gap-4 p-3 rounded-xl" style={{ backgroundColor: "var(--color-card)", border: "1px solid var(--color-border)" }}>
              <HPScoreBadge score={s} size="md" showLabel />
              <div>
                <p className="text-sm" style={{ color: "var(--color-muted)" }}>
                  {s === "A" && "Offre excellente — meilleur rapport qualité/prix sur le marché."}
                  {s === "B" && "Offre bien — au-dessus de la moyenne, quelques axes d'amélioration."}
                  {s === "C" && "Offre correcte — dans la moyenne du marché."}
                  {s === "D" && "Offre passable — tarifs ou services en deçà de la concurrence."}
                  {s === "E" && "Offre déconseillée — tarifs élevés ou qualité insuffisante."}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Critères Mobile Money */}
      <section className="mb-10">
        <h2 className="text-base font-semibold mb-4" style={{ color: "var(--color-text)" }}>
          Critères — Mobile Money
        </h2>
        <div className="overflow-x-auto rounded-xl border" style={{ borderColor: "var(--color-border)" }}>
          <table className="w-full text-sm" style={{ backgroundColor: "var(--color-card)" }}>
            <thead style={{ backgroundColor: "var(--color-primary-light)" }}>
              <tr>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: "var(--color-text)" }}>Critère</th>
                <th className="text-right px-4 py-3 font-semibold" style={{ color: "var(--color-text)" }}>Poids</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Frais de transfert", "35 %"],
                ["Frais de retrait", "25 %"],
                ["Couverture agents", "20 %"],
                ["Services annexes (carte, factures)", "15 %"],
                ["Avis clients", "5 %"],
              ].map(([c, p], i) => (
                <tr key={c} style={{ borderTop: i > 0 ? "1px solid var(--color-border)" : "none" }}>
                  <td className="px-4 py-3" style={{ color: "var(--color-text)" }}>{c}</td>
                  <td className="px-4 py-3 text-right font-semibold" style={{ color: "var(--color-secondary)" }}>{p}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Indépendance */}
      <section>
        <h2 className="text-base font-semibold mb-3" style={{ color: "var(--color-text)" }}>
          Indépendance éditoriale
        </h2>
        <p className="text-sm" style={{ color: "var(--color-muted)" }}>
          Le HP Score est calculé de manière automatique et indépendante. Les fournisseurs ne peuvent pas
          acheter une meilleure note. Les offres sponsorisées sont clairement indiquées et n'influencent
          pas le score — elles peuvent seulement apparaître en tête de liste avec un badge « Sponsorisé ».
        </p>
      </section>
    </div>
  )
}
