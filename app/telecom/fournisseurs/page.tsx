import type { Metadata } from "next"
import Link from "next/link"
import { PROVIDERS, OFFERS } from "@/lib/data/seed-data"
import ProviderCard from "@/components/compare/ProviderCard"

export const metadata: Metadata = {
  title: "Opérateurs télécom en Guinée — Orange, Telecel, Cellcom, Guinée Télécoms",
  description: "Comparez tous les opérateurs télécom guinéens : couverture, tarifs, HP Score. Fiches détaillées et avis clients.",
}

export default function TelecomFournisseursPage() {
  const providers = PROVIDERS.filter((p) => p.verticalSlug === "telecom").sort(
    (a, b) => b.hpScoreNum - a.hpScoreNum
  )

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
            <span className="text-white">Opérateurs</span>
          </nav>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
            Tous les opérateurs télécom en Guinée
          </h1>
          <p style={{ color: "rgba(255,255,255,0.8)" }} className="text-sm">
            {providers.length} opérateurs — classés par HP Score
          </p>
        </div>
      </section>

      <section className="py-10">
        <div className="container">
          <div className="flex flex-col gap-4 max-w-2xl">
            {providers.map((provider) => {
              const count = OFFERS.filter(
                (o) => o.providerSlug === provider.slug && o.verticalSlug === "telecom"
              ).length
              return (
                <ProviderCard
                  key={provider.slug}
                  provider={provider}
                  verticalSlug="telecom"
                  offerCount={count}
                />
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
