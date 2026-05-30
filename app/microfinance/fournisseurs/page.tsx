import type { Metadata } from "next"
import Link from "next/link"
import { PROVIDERS } from "@/lib/data/seed-data"
import ProviderCard from "@/components/compare/ProviderCard"

export const metadata: Metadata = {
  title: "Institutions de microfinance en Guinée — CRG-SA, Finafrica, Akiba, CAFODEC | HP Selectra",
  description:
    "Fiches détaillées des institutions de microfinance en Guinée : produits, réseau, HP Score. Comparez CRG-SA, Finafrica, Akiba Finance et CAFODEC.",
}

const MF_COLOR = "#6B8F3C"
const MF_DARK  = "#4E6A2C"

export default function MicrofinanceFournisseursPage() {
  const providers = PROVIDERS.filter((p) => p.verticalSlug === "microfinance")
    .sort((a, b) => b.hpScoreNum - a.hpScoreNum)

  return (
    <>
      <section className="py-10 sm:py-14" style={{ background: `linear-gradient(135deg, ${MF_DARK}, ${MF_COLOR})` }}>
        <div className="container">
          <nav className="text-sm mb-4" style={{ color: "rgba(255,255,255,0.6)" }}>
            <Link href="/" className="hover:text-white">Accueil</Link>
            <span className="mx-2">/</span>
            <Link href="/microfinance/" className="hover:text-white">Microfinance</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Toutes les institutions</span>
          </nav>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
            🤝 Institutions de microfinance en Guinée
          </h1>
          <p className="text-base max-w-xl" style={{ color: "rgba(255,255,255,0.8)" }}>
            {providers.length} institutions analysées et notées HP Score. Cliquez sur une fiche pour voir
            les offres de micro-crédit, épargne et financement PME proposées.
          </p>
        </div>
      </section>

      <div className="container py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {providers.map((p) => (
            <ProviderCard key={p.slug} provider={p} verticalSlug="microfinance" />
          ))}
        </div>

        <div className="text-center">
          <Link href="/microfinance/comparateur/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white"
            style={{ backgroundColor: MF_COLOR }}>
            Comparer toutes les offres →
          </Link>
        </div>
      </div>
    </>
  )
}
