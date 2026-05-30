import type { Metadata } from "next"
import Link from "next/link"
import { PROVIDERS, OFFERS } from "@/lib/data/seed-data"
import ProviderCard from "@/components/compare/ProviderCard"

export const metadata: Metadata = {
  title: "Fournisseurs internet en Guinée — Orange Box, Guinée Télécom, GUILAB, Spacetel",
  description:
    "Tous les fournisseurs d'accès internet en Guinée : fiches détaillées, HP Score, offres disponibles.",
}

export default function FaiFournisseursPage() {
  const providers = PROVIDERS.filter((p) => p.verticalSlug === "fai").sort(
    (a, b) => b.hpScoreNum - a.hpScoreNum
  )

  return (
    <>
      <section
        className="py-10"
        style={{ background: `linear-gradient(135deg, #003087, #0070C0)` }}
      >
        <div className="container">
          <nav className="text-sm mb-3" style={{ color: "rgba(255,255,255,0.6)" }}>
            <Link href="/" className="hover:text-white">Accueil</Link>
            <span className="mx-2">/</span>
            <Link href="/fai/" className="hover:text-white">Internet Fixe</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Fournisseurs</span>
          </nav>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
            Fournisseurs d'accès internet en Guinée
          </h1>
          <p style={{ color: "rgba(255,255,255,0.8)" }} className="text-sm">
            {providers.length} FAI — classés par HP Score
          </p>
        </div>
      </section>

      <section className="py-10">
        <div className="container">
          <div className="flex flex-col gap-4 max-w-2xl">
            {providers.map((provider) => {
              const count = OFFERS.filter(
                (o) => o.providerSlug === provider.slug && o.verticalSlug === "fai"
              ).length
              return (
                <ProviderCard
                  key={provider.slug}
                  provider={provider}
                  verticalSlug="fai"
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
