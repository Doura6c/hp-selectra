import type { Metadata } from "next"
import Link from "next/link"
import { PROVIDERS } from "@/lib/data/seed-data"
import ProviderCard from "@/components/compare/ProviderCard"

export const metadata: Metadata = {
  title: "Services Mobile Money en Guinée — Orange Money, MTN MoMo, Soutra Money",
  description: "Tous les services de mobile money et transfert d'argent disponibles en Guinée, classés par HP Score.",
}

export default function MobileMoneyFournisseursPage() {
  const providers = PROVIDERS.filter((p) => p.verticalSlug === "mobile-money").sort(
    (a, b) => b.hpScoreNum - a.hpScoreNum
  )

  return (
    <>
      <section
        className="py-10"
        style={{ background: `linear-gradient(135deg, var(--color-secondary-dark), var(--color-secondary))` }}
      >
        <div className="container">
          <nav className="text-sm mb-3" style={{ color: "rgba(255,255,255,0.6)" }}>
            <Link href="/" className="hover:text-white">Accueil</Link>
            <span className="mx-2">/</span>
            <Link href="/mobile-money/" className="hover:text-white">Mobile Money</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Services</span>
          </nav>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-1">
            Tous les services Mobile Money en Guinée
          </h1>
          <p style={{ color: "rgba(255,255,255,0.8)" }} className="text-sm">
            {providers.length} services — classés par HP Score
          </p>
        </div>
      </section>

      <section className="py-10">
        <div className="container max-w-2xl flex flex-col gap-4">
          {providers.map((p) => (
            <ProviderCard key={p.slug} provider={p} verticalSlug="mobile-money" />
          ))}
        </div>
      </section>
    </>
  )
}
