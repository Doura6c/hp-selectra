import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { PROVIDERS, OFFERS } from "@/lib/data/seed-data"
import HPScoreBadge from "@/components/ui/HPScoreBadge"
import OfferCard from "@/components/compare/OfferCard"
import PriceTag from "@/components/ui/PriceTag"
import { Phone, Globe, CheckCircle } from "lucide-react"

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return PROVIDERS.filter((p) => p.verticalSlug === "telecom").map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const provider = PROVIDERS.find((p) => p.slug === slug && p.verticalSlug === "telecom")
  if (!provider) return {}
  return {
    title: `${provider.name} — Offres et avis | HP Selectra Guinée`,
    description: provider.description,
  }
}

export default async function TelecomProviderPage({ params }: Props) {
  const { slug } = await params
  const provider = PROVIDERS.find((p) => p.slug === slug && p.verticalSlug === "telecom")
  if (!provider) notFound()

  const offers = OFFERS.filter((o) => o.providerSlug === provider.slug && o.verticalSlug === "telecom")

  return (
    <>
      {/* Header fournisseur */}
      <section
        className="py-10"
        style={{ background: `linear-gradient(135deg, var(--color-primary-dark), var(--color-primary))` }}
      >
        <div className="container">
          <nav className="text-sm mb-4" style={{ color: "rgba(255,255,255,0.6)" }}>
            <Link href="/" className="hover:text-white">Accueil</Link>
            <span className="mx-2">/</span>
            <Link href="/telecom/" className="hover:text-white">Télécom</Link>
            <span className="mx-2">/</span>
            <Link href="/telecom/fournisseurs/" className="hover:text-white">Opérateurs</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{provider.name}</span>
          </nav>

          <div className="flex items-start gap-6">
            {/* Logo placeholder */}
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-bold text-white shrink-0 shadow-lg"
              style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
            >
              {provider.name.slice(0, 2).toUpperCase()}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{provider.name}</h1>
                {provider.verified && (
                  <CheckCircle className="w-5 h-5 text-green-400" />
                )}
              </div>
              <p className="text-sm max-w-xl" style={{ color: "rgba(255,255,255,0.8)" }}>
                {provider.description}
              </p>
              <div className="flex flex-wrap gap-3 mt-4">
                {provider.phone && (
                  <a href={`tel:${provider.phone}`} className="flex items-center gap-2 text-sm text-white/80 hover:text-white">
                    <Phone className="w-4 h-4" /> {provider.phone}
                  </a>
                )}
                {provider.website && (
                  <a href={provider.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-white/80 hover:text-white">
                    <Globe className="w-4 h-4" /> Site officiel
                  </a>
                )}
              </div>
            </div>
            <HPScoreBadge score={provider.hpScore!} showLabel size="lg" />
          </div>
        </div>
      </section>

      {/* Offres */}
      <section className="py-10">
        <div className="container">
          <h2 className="text-xl font-bold mb-6" style={{ color: "var(--color-text)" }}>
            Offres {provider.name} ({offers.length})
          </h2>

          {offers.length === 0 ? (
            <p style={{ color: "var(--color-muted)" }}>Aucune offre disponible pour le moment.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {offers.map((offer) => (
                <OfferCard key={offer.slug} offer={offer} provider={provider} verticalSlug="telecom" />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Tableau détail */}
      {offers.length > 0 && (
        <section className="py-10" style={{ backgroundColor: "var(--color-primary-light)" }}>
          <div className="container">
            <h2 className="text-xl font-bold mb-6" style={{ color: "var(--color-text)" }}>
              Détail des offres
            </h2>
            <div className="overflow-x-auto rounded-2xl border" style={{ borderColor: "var(--color-border)" }}>
              <table className="w-full text-sm" style={{ backgroundColor: "var(--color-card)" }}>
                <thead>
                  <tr style={{ backgroundColor: "var(--color-primary)", color: "#fff" }}>
                    <th className="text-left px-4 py-3 font-semibold">Offre</th>
                    <th className="text-left px-4 py-3 font-semibold">Prix indicatif</th>
                    <th className="text-left px-4 py-3 font-semibold">HP Score</th>
                  </tr>
                </thead>
                <tbody>
                  {offers.map((offer, i) => (
                    <tr
                      key={offer.slug}
                      style={{
                        borderTop: i > 0 ? `1px solid var(--color-border)` : "none",
                      }}
                    >
                      <td className="px-4 py-3 font-medium" style={{ color: "var(--color-text)" }}>
                        {offer.name}
                      </td>
                      <td className="px-4 py-3">
                        <PriceTag note={offer.priceNote} isExample={offer.priceIsExample} />
                      </td>
                      <td className="px-4 py-3">
                        <HPScoreBadge score={offer.hpScore} size="sm" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}
    </>
  )
}
