import Link from "next/link"
import { VERTICALS, PROVIDERS, OFFERS } from "@/lib/data/seed-data"
import { ArrowRight, Lock } from "lucide-react"

// Dégradés par verticale pour les cartes
const VERTICAL_GRADIENTS: Record<string, string> = {
  telecom:        "135deg, #1D3461 0%, #1a4d70 100%",
  "mobile-money": "135deg, #4a6c25 0%, #6B8F3C 100%",
  banques:        "135deg, #1B2E6B 0%, #2D3E8C 100%",
  fai:            "135deg, #003087 0%, #0070C0 100%",
  microfinance:   "135deg, #2D7A4F 0%, #3d9e68 100%",
  assurances:     "135deg, #1D3461 0%, #344a8a 100%",
  energie:        "135deg, #a06000 0%, #F0A500 100%",
}

export default function VerticalCards() {
  // Calculer les providers et offres actives par verticale
  const stats = VERTICALS.reduce<Record<string, { providers: number; offers: number; topProviders: typeof PROVIDERS }>>(
    (acc, v) => {
      const vProviders = PROVIDERS.filter((p) => p.verticalSlug === v.slug)
      const vOffers = OFFERS.filter((o) => o.verticalSlug === v.slug)
      acc[v.slug] = {
        providers: vProviders.length,
        offers: vOffers.length,
        topProviders: vProviders.sort((a, b) => b.hpScoreNum - a.hpScoreNum).slice(0, 3),
      }
      return acc
    },
    {}
  )

  return (
    <section className="py-16 sm:py-24">
      <div className="container">
        {/* En-tête */}
        <div className="text-center mb-12">
          <p
            className="inline-block text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3"
            style={{ backgroundColor: "var(--color-primary-light)", color: "var(--color-primary)" }}
          >
            Nos secteurs
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4" style={{ color: "var(--color-text)" }}>
            Que souhaitez-vous comparer ?
          </h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: "var(--color-muted)" }}>
            7 secteurs couverts. 21 opérateurs analysés. Un seul objectif : vous faire économiser.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {VERTICALS.map((v) => {
            const s = stats[v.slug]
            const gradient = VERTICAL_GRADIENTS[v.slug] ?? "135deg, #1D3461 0%, #1a4d70 100%"

            const inner = (
              <div
                className="group relative flex flex-col rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                style={{ height: "100%" }}
              >
                {/* Corps coloré */}
                <div
                  className="flex-1 p-6 flex flex-col"
                  style={{ background: `linear-gradient(${gradient})` }}
                >
                  {/* Badge bientôt */}
                  {!v.isLive && (
                    <div
                      className="absolute top-4 right-4 flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full"
                      style={{ backgroundColor: "rgba(240,165,0,0.9)", color: "#fff" }}
                    >
                      <Lock className="w-3 h-3" /> Bientôt
                    </div>
                  )}

                  {/* Icône + compteur */}
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-4xl filter drop-shadow-lg">{v.icon}</span>
                    {v.isLive && s.offers > 0 && (
                      <span
                        className="text-xs font-bold px-2.5 py-1 rounded-full"
                        style={{ backgroundColor: "rgba(255,255,255,0.18)", color: "rgba(255,255,255,0.9)" }}
                      >
                        {s.offers} offres
                      </span>
                    )}
                  </div>

                  {/* Titre */}
                  <h3 className="text-lg font-extrabold text-white mb-2 leading-tight">
                    {v.name}
                  </h3>
                  <p className="text-xs leading-relaxed flex-1" style={{ color: "rgba(255,255,255,0.65)" }}>
                    {v.description}
                  </p>

                  {/* Avatars top providers */}
                  {v.isLive && s.topProviders.length > 0 && (
                    <div className="flex items-center gap-2 mt-5">
                      <div className="flex -space-x-2">
                        {s.topProviders.map((p) => (
                          <div
                            key={p.slug}
                            className="w-7 h-7 rounded-full border-2 flex items-center justify-center text-[9px] font-bold text-white shrink-0"
                            style={{
                              backgroundColor: p.brandColor ?? "rgba(255,255,255,0.3)",
                              borderColor: "rgba(255,255,255,0.3)",
                            }}
                            title={p.name}
                          >
                            {p.name.slice(0, 2).toUpperCase()}
                          </div>
                        ))}
                      </div>
                      <span className="text-xs" style={{ color: "rgba(255,255,255,0.55)" }}>
                        {s.providers} opérateur{s.providers > 1 ? "s" : ""}
                      </span>
                    </div>
                  )}
                </div>

                {/* Footer card */}
                {v.isLive ? (
                  <div
                    className="flex items-center justify-between px-6 py-3.5 text-sm font-semibold transition-colors group-hover:opacity-90"
                    style={{ backgroundColor: "rgba(0,0,0,0.35)", color: "#fff" }}
                  >
                    <span>Comparer maintenant</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                ) : (
                  <div
                    className="flex items-center justify-between px-6 py-3.5 text-xs font-medium"
                    style={{ backgroundColor: "rgba(0,0,0,0.25)", color: "rgba(255,255,255,0.4)" }}
                  >
                    <span>Disponible prochainement</span>
                    <Lock className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            )

            return v.isLive ? (
              <Link key={v.slug} href={`/${v.slug}/`} className="block" style={{ textDecoration: "none" }}>
                {inner}
              </Link>
            ) : (
              <div key={v.slug} className="cursor-not-allowed opacity-70">
                {inner}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
