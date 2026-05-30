import type { Metadata } from "next"
import Link from "next/link"
import { PROVIDERS, OFFERS } from "@/lib/data/seed-data"
import ProviderCard from "@/components/compare/ProviderCard"

export const metadata: Metadata = {
  title: "Compagnies d'assurance en Guinée — NSIA, UGAR-Activa, SUNU, Lanala | HP Selectra",
  description:
    "Fiches détaillées des compagnies d'assurance actives en Guinée : produits, réseau d'agences, HP Score. Comparez NSIA, UGAR-Activa, SUNU Assurances et Lanala.",
}

export default function AssurancesFournisseursPage() {
  const providers = PROVIDERS.filter((p) => p.verticalSlug === "assurances")
    .sort((a, b) => b.hpScoreNum - a.hpScoreNum)

  return (
    <>
      <section className="py-10 sm:py-14" style={{ background: "linear-gradient(135deg, #7B1A2E, #B02840)" }}>
        <div className="container">
          <nav className="text-sm mb-4" style={{ color: "rgba(255,255,255,0.6)" }}>
            <Link href="/" className="hover:text-white">Accueil</Link>
            <span className="mx-2">/</span>
            <Link href="/assurances/" className="hover:text-white">Assurances</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Toutes les compagnies</span>
          </nav>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
            🛡️ Compagnies d&apos;assurance en Guinée
          </h1>
          <p className="text-base max-w-xl" style={{ color: "rgba(255,255,255,0.8)" }}>
            {providers.length} compagnies analysées et notées HP Score. Cliquez sur une fiche pour voir
            les offres RC auto, santé, habitation et vie proposées.
          </p>
        </div>
      </section>

      <div className="container py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {providers.map((p) => (
            <ProviderCard key={p.slug} provider={p} verticalSlug="assurances" />
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/assurances/comparateur/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white"
            style={{ backgroundColor: "#B02840" }}
          >
            Comparer toutes les offres →
          </Link>
        </div>
      </div>
    </>
  )
}
