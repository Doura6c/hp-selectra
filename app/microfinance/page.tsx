import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Comparer les institutions de microfinance en Guinée — Bientôt",
  description: "Micro-crédits, épargne, financement PME en Guinée. CRG-SA, Finafrica, Akiba Finance, CAFODEC. Bientôt disponible.",
}

const MFI = [
  { name: "Crédit Rural de Guinée (CRG-SA)", note: "Leader national, fort ancrage rural, réseau étendu de caisses" },
  { name: "Finafrica Microfinance", note: "Financement PME et micro-entrepreneurs" },
  { name: "Groupe Akiba Finance", note: "Épargne et crédit, particuliers et groupements" },
  { name: "CAFODEC", note: "Caisse de financement, zones périurbaines" },
]

export default function MicrofinancePage() {
  return (
    <>
      <section className="py-12 sm:py-16" style={{ background: "linear-gradient(135deg, #4E6A2C, #6B8F3C)" }}>
        <div className="container">
          <nav className="text-sm mb-4" style={{ color: "rgba(255,255,255,0.6)" }}>
            <Link href="/" className="hover:text-white">Accueil</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Microfinance</span>
          </nav>
          <div className="flex items-start gap-4">
            <div className="text-5xl">🤝</div>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-3 text-white" style={{ backgroundColor: "var(--color-accent)" }}>
                🔒 Bientôt disponible
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white mb-2">Microfinance en Guinée</h1>
              <p className="text-base max-w-xl" style={{ color: "rgba(255,255,255,0.85)" }}>
                Comparez les micro-crédits, produits d'épargne et solutions de financement
                PME des institutions de microfinance guinéennes.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="container py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {MFI.map((m) => (
            <div key={m.name} className="p-5 rounded-xl border" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-card)" }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold text-white mb-3" style={{ backgroundColor: "var(--color-secondary)" }}>
                {m.name.slice(0, 2).toUpperCase()}
              </div>
              <p className="font-semibold text-sm mb-1" style={{ color: "var(--color-text)" }}>{m.name}</p>
              <p className="text-xs" style={{ color: "var(--color-muted)" }}>{m.note}</p>
            </div>
          ))}
        </div>
        <div className="p-6 rounded-2xl text-center" style={{ backgroundColor: "var(--color-secondary-light)" }}>
          <p className="font-semibold mb-2" style={{ color: "var(--color-text)" }}>Comparateur en cours de préparation</p>
          <p className="text-sm mb-4" style={{ color: "var(--color-muted)" }}>Notifiez-moi à l'ouverture du comparateur microfinance.</p>
          <Link href="/#newsletter" className="inline-block px-6 py-3 rounded-xl text-sm font-semibold text-white" style={{ backgroundColor: "var(--color-secondary)" }}>
            Me notifier
          </Link>
        </div>
      </div>
    </>
  )
}
