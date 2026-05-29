import Link from "next/link"
import { VERTICALS } from "@/lib/data/seed-data"
import { ArrowRight, Lock } from "lucide-react"

export default function VerticalCards() {
  return (
    <section className="py-14 sm:py-20">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3" style={{ color: "var(--color-text)" }}>
            Que souhaitez-vous comparer ?
          </h2>
          <p className="text-base max-w-lg mx-auto" style={{ color: "var(--color-muted)" }}>
            6 secteurs couverts. Sélectionnez votre domaine pour accéder au comparateur.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {VERTICALS.map((v) => {
            const card = (
              <div
                className="group relative flex flex-col p-6 rounded-2xl border transition-all duration-200"
                style={{
                  backgroundColor: "var(--color-card)",
                  borderColor: v.isLive ? "var(--color-border)" : "var(--color-border)",
                  opacity: v.isLive ? 1 : 0.75,
                }}
              >
                {/* Badge bientôt */}
                {!v.isLive && (
                  <div
                    className="absolute top-4 right-4 flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full"
                    style={{ backgroundColor: "var(--color-accent)", color: "#fff" }}
                  >
                    <Lock className="w-3 h-3" />
                    Bientôt
                  </div>
                )}

                {/* Icône */}
                <div className="text-4xl mb-4">{v.icon}</div>

                {/* Contenu */}
                <h3 className="font-bold text-lg mb-2" style={{ color: "var(--color-text)" }}>
                  {v.name}
                </h3>
                <p className="text-sm flex-1 mb-4" style={{ color: "var(--color-muted)" }}>
                  {v.description}
                </p>

                {v.isLive && (
                  <div
                    className="flex items-center gap-1 text-sm font-semibold transition-gap group-hover:gap-2"
                    style={{ color: "var(--color-primary)" }}
                  >
                    Comparer maintenant
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                )}
              </div>
            )

            return v.isLive ? (
              <Link
                key={v.slug}
                href={`/${v.slug}/`}
                className="hover:shadow-md hover:border-primary/30 transition-shadow rounded-2xl border"
                style={{ borderColor: "var(--color-border)" }}
              >
                {card}
              </Link>
            ) : (
              <div key={v.slug} className="cursor-not-allowed">
                {card}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
