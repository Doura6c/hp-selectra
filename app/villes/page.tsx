import type { Metadata } from "next"
import Link from "next/link"
import { MapPin } from "lucide-react"

export const metadata: Metadata = {
  title: "Services par ville en Guinée — Télécom, banques, mobile money | HP Selectra",
  description:
    "Comparez les services disponibles dans votre ville en Guinée : télécom, banques, mobile money, assurances, microfinance. Conakry, Labé, Kankan, N'Zérékoré, Mamou, Boké, Faranah.",
}

const VILLES = [
  { slug: "conakry",  name: "Conakry",    region: "Capitale",          pop: "~2 500 000 hab.", icon: "🏙️" },
  { slug: "labe",     name: "Labé",        region: "Fouta Djallon",     pop: "~400 000 hab.",   icon: "🏔️" },
  { slug: "kankan",   name: "Kankan",      region: "Haute-Guinée",      pop: "~250 000 hab.",   icon: "🌾" },
  { slug: "nzerekore", name: "N'Zérékoré", region: "Guinée Forestière", pop: "~200 000 hab.",   icon: "🌿" },
  { slug: "mamou",    name: "Mamou",       region: "Moyenne-Guinée",    pop: "~180 000 hab.",   icon: "🛣️" },
  { slug: "boke",     name: "Boké",        region: "Basse-Guinée",      pop: "~150 000 hab.",   icon: "⛏️" },
  { slug: "faranah",  name: "Faranah",     region: "Haute-Guinée",      pop: "~120 000 hab.",   icon: "🌊" },
]

const VERTICALS = [
  { icon: "📱", label: "Télécom",      color: "#E04E1A" },
  { icon: "💸", label: "Mobile Money", color: "#F0A500" },
  { icon: "🏦", label: "Banques",      color: "#2E86C1" },
  { icon: "🛡️", label: "Assurances",   color: "#B02840" },
  { icon: "🤝", label: "Microfinance", color: "#6B8F3C" },
]

export default function VillesPage() {
  return (
    <>
      <section className="py-12 sm:py-16" style={{ background: "linear-gradient(135deg, #1A2E4A 0%, #2C4A6E 100%)" }}>
        <div className="container">
          <nav className="text-sm mb-4" style={{ color: "rgba(255,255,255,0.6)" }}>
            <Link href="/" className="hover:text-white">Accueil</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Villes de Guinée</span>
          </nav>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
            🗺️ Services par ville en Guinée
          </h1>
          <p className="text-base max-w-xl mb-8" style={{ color: "rgba(255,255,255,0.8)" }}>
            Comparez télécom, banques, mobile money, assurances et microfinance dans {VILLES.length} villes guinéennes.
            Choisissez votre ville pour voir les opérateurs et services disponibles.
          </p>
          <div className="flex flex-wrap gap-2">
            {VERTICALS.map((v) => (
              <span key={v.label} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white border border-white/20">
                {v.icon} {v.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className="container py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {VILLES.map((v) => {
            const isConakry = v.slug === "conakry"
            const href = isConakry ? "/telecom/conakry/" : `/villes/${v.slug}/`
            return (
              <Link key={v.slug} href={href}
                className="flex items-start gap-4 p-5 rounded-2xl border hover:shadow-md transition-shadow group"
                style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}>
                <span className="text-3xl shrink-0">{v.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-lg font-extrabold" style={{ color: "var(--color-text)" }}>{v.name}</h2>
                    {isConakry && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                        style={{ backgroundColor: "var(--color-primary-light)", color: "var(--color-primary)" }}>
                        Capitale
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 mb-2">
                    <MapPin className="w-3.5 h-3.5" style={{ color: "var(--color-muted)" }} />
                    <span className="text-xs" style={{ color: "var(--color-muted)" }}>{v.region}</span>
                    <span className="text-xs" style={{ color: "var(--color-muted)" }}>· {v.pop}</span>
                  </div>
                  <div className="flex gap-1 flex-wrap">
                    {VERTICALS.slice(0, 4).map((vert) => (
                      <span key={vert.label} className="text-[10px] px-1.5 py-0.5 rounded-full font-medium"
                        style={{ backgroundColor: `${vert.color}18`, color: vert.color }}>
                        {vert.icon}
                      </span>
                    ))}
                  </div>
                </div>
                <span className="text-sm font-bold shrink-0 group-hover:translate-x-1 transition-transform"
                  style={{ color: "var(--color-primary)" }}>→</span>
              </Link>
            )
          })}
        </div>

        <div className="p-5 rounded-2xl border text-sm" style={{ backgroundColor: "var(--color-surface)", borderColor: "var(--color-border)" }}>
          <p className="font-semibold mb-2" style={{ color: "var(--color-text)" }}>
            🗺️ Couverture nationale HP Selectra
          </p>
          <p style={{ color: "var(--color-muted)" }}>
            HP Selectra couvre les 7 principales villes de Guinée. Pour les villes non listées, nos conseillers
            Help&apos;me Process peuvent vous orienter vers les services disponibles dans votre localité.
          </p>
        </div>
      </div>
    </>
  )
}
