import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Comparer les assurances en Guinée — Bientôt sur HP Selectra",
  description: "Auto, santé, habitation : comparez NSIA Assurances, UGAR-Activa, SUNU, Lanala et toutes les compagnies actives en Guinée.",
}

const INSURERS = [
  { name: "NSIA Assurances", note: "Leader du marché (~26 %), IARD + Vie", market: "26 %" },
  { name: "UGAR-Activa", note: "2ᵉ acteur (~22 %), réseau étendu", market: "22 %" },
  { name: "SUNU Assurances", note: "IARD + Vie, groupe panafricain" },
  { name: "SAHAM / Sanlam Guinée", note: "Groupe Sanlam, offres entreprises" },
  { name: "Vista Assurances", note: "Filiale groupe Vista" },
  { name: "Lanala Assurances", note: "IARD + Vie, groupe guinéen LANALA" },
  { name: "SOGAM", note: "Société guinéenne d'assurances mutuelles" },
  { name: "SONAG", note: "Société nationale d'assurances guinéenne" },
  { name: "SAAR Guinée", note: "Compagnie régionale" },
]

export default function AssurancesPage() {
  return (
    <>
      <section className="py-12 sm:py-16" style={{ background: "linear-gradient(135deg, #7B1A2E, #B02840)" }}>
        <div className="container">
          <nav className="text-sm mb-4" style={{ color: "rgba(255,255,255,0.6)" }}>
            <Link href="/" className="hover:text-white">Accueil</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Assurances</span>
          </nav>
          <div className="flex items-start gap-4">
            <div className="text-5xl">🛡️</div>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-3 text-white" style={{ backgroundColor: "var(--color-accent)" }}>
                🔒 Bientôt disponible
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white mb-2">Assurances en Guinée</h1>
              <p className="text-base max-w-xl" style={{ color: "rgba(255,255,255,0.85)" }}>
                RC auto obligatoire, tous risques, assurance santé, habitation —
                comparez les 9 compagnies actives en Guinée. En cours de préparation.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="container py-12">
        <h2 className="text-lg font-bold mb-6" style={{ color: "var(--color-text)" }}>
          Les {INSURERS.length} compagnies qui seront comparées
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-10">
          {INSURERS.map((ins) => (
            <div key={ins.name} className="p-4 rounded-xl border flex items-start gap-3" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-card)" }}>
              <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold text-white shrink-0" style={{ backgroundColor: "#B02840" }}>
                {ins.name.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: "var(--color-text)" }}>
                  {ins.name}
                  {ins.market && <span className="ml-2 text-xs font-normal px-1.5 py-0.5 rounded-full text-white" style={{ backgroundColor: "var(--color-accent)" }}>{ins.market}</span>}
                </p>
                <p className="text-xs mt-0.5" style={{ color: "var(--color-muted)" }}>{ins.note}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="p-6 rounded-2xl text-center" style={{ backgroundColor: "#FFF0F3" }}>
          <p className="font-semibold mb-2" style={{ color: "var(--color-text)" }}>Comparateur en cours de préparation</p>
          <p className="text-sm mb-4" style={{ color: "var(--color-muted)" }}>Soyez alerté dès l'ouverture du comparateur assurances.</p>
          <Link href="/#newsletter" className="inline-block px-6 py-3 rounded-xl text-sm font-semibold text-white" style={{ backgroundColor: "#B02840" }}>
            Me notifier
          </Link>
        </div>
      </div>
    </>
  )
}
