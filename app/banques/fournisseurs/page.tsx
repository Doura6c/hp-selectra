import type { Metadata } from "next"
import Link from "next/link"
import { PROVIDERS, OFFERS } from "@/lib/data/seed-data"
import ProviderCard from "@/components/compare/ProviderCard"

export const metadata: Metadata = {
  title: "Banques en Guinée — Ecobank, BICIGUI, Orabank, UBA, Vista Bank, Banque Islamique",
  description: "Comparez toutes les banques guinéennes : réseau d'agences, services digitaux, frais et HP Score. Fiches détaillées de chaque banque.",
}

export default function BanquesFournisseursPage() {
  const providers = PROVIDERS.filter((p) => p.verticalSlug === "banques").sort(
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
            <Link href="/banques/" className="hover:text-white">Banques</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Banques</span>
          </nav>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
            Toutes les banques en Guinée
          </h1>
          <p style={{ color: "rgba(255,255,255,0.8)" }} className="text-sm">
            {providers.length} banques — classées par HP Score
          </p>
        </div>
      </section>

      <section className="py-10">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {providers.map((provider) => {
              const count = OFFERS.filter(
                (o) => o.providerSlug === provider.slug && o.verticalSlug === "banques"
              ).length
              return (
                <ProviderCard
                  key={provider.slug}
                  provider={provider}
                  verticalSlug="banques"
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
