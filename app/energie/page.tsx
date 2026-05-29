import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Énergie & Solaire en Guinée — Bientôt sur HP Selectra",
  description: "Kits solaires, groupes électrogènes, bouteilles de gaz — comparatif des solutions énergétiques en Guinée. Bientôt disponible.",
}

const CATEGORIES = [
  { icon: "☀️", name: "Kits solaires", desc: "Panneaux, batteries, onduleurs pour particuliers et PME" },
  { icon: "⚡", name: "Réseau EDG", desc: "Électricité de Guinée — abonnements, tarifs, délestage" },
  { icon: "🔋", name: "Groupes électrogènes", desc: "Location et achat de générateurs pour pallier les coupures" },
  { icon: "🔥", name: "Gaz butane", desc: "Bouteilles de gaz, prix du kg, distributeurs agréés" },
]

export default function EnergiePage() {
  return (
    <>
      <section className="py-12 sm:py-16" style={{ background: "linear-gradient(135deg, #7A5500, #C48A00)" }}>
        <div className="container">
          <nav className="text-sm mb-4" style={{ color: "rgba(255,255,255,0.6)" }}>
            <Link href="/" className="hover:text-white">Accueil</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Énergie & Solaire</span>
          </nav>
          <div className="flex items-start gap-4">
            <div className="text-5xl">⚡</div>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-3 text-white" style={{ backgroundColor: "var(--color-accent)" }}>
                🔒 Bientôt disponible
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white mb-2">Énergie & Solaire en Guinée</h1>
              <p className="text-base max-w-xl" style={{ color: "rgba(255,255,255,0.85)" }}>
                Face aux délestages, comparez les kits solaires, groupes électrogènes et prix
                du gaz. Trouvez la solution la plus adaptée à votre budget.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="container py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {CATEGORIES.map((cat) => (
            <div key={cat.name} className="p-6 rounded-xl border flex items-start gap-4" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-card)" }}>
              <div className="text-3xl">{cat.icon}</div>
              <div>
                <p className="font-semibold mb-1" style={{ color: "var(--color-text)" }}>{cat.name}</p>
                <p className="text-sm" style={{ color: "var(--color-muted)" }}>{cat.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="p-6 rounded-2xl text-center" style={{ backgroundColor: "#FFFBEB" }}>
          <p className="font-semibold mb-2" style={{ color: "var(--color-text)" }}>Comparateur énergie en cours de préparation</p>
          <p className="text-sm mb-4" style={{ color: "var(--color-muted)" }}>Vous êtes installateur solaire ou distributeur de gaz ? Contactez-nous pour figurer dans notre comparateur.</p>
          <div className="flex justify-center gap-3 flex-wrap">
            <Link href="/#newsletter" className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white" style={{ backgroundColor: "#C48A00" }}>
              Me notifier
            </Link>
            <Link href="/contact/" className="px-5 py-2.5 rounded-xl text-sm font-semibold border" style={{ borderColor: "#C48A00", color: "#C48A00" }}>
              Devenir partenaire
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
