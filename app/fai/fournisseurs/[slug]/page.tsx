import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { PROVIDERS, OFFERS } from "@/lib/data/seed-data"
import HPScoreBadge from "@/components/ui/HPScoreBadge"
import OfferCard from "@/components/compare/OfferCard"
import { Globe, CheckCircle, Phone } from "lucide-react"

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return PROVIDERS.filter((p) => p.verticalSlug === "fai").map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const provider = PROVIDERS.find((p) => p.slug === slug && p.verticalSlug === "fai")
  if (!provider) return {}
  return {
    title: `${provider.name} — Offres internet & avis | HP Selectra Guinée`,
    description: provider.description,
  }
}

export default async function FaiFournisseurPage({ params }: Props) {
  const { slug } = await params
  const provider = PROVIDERS.find((p) => p.slug === slug && p.verticalSlug === "fai")
  if (!provider) notFound()

  const offers = OFFERS.filter(
    (o) => o.providerSlug === provider.slug && o.verticalSlug === "fai"
  )

  const techLabel: Record<string, string> = {
    "4g-fixe": "Box 4G",
    adsl: "ADSL",
    fibre: "Fibre optique",
    satellite: "Satellite VSAT",
  }

  const categories = [...new Set(offers.map((o) => o.category))]

  return (
    <>
      {/* Hero */}
      <section
        className="relative overflow-hidden py-12"
        style={{ background: `linear-gradient(135deg, #003087 0%, #0070C0 100%)` }}
      >
        <div className="container">
          <nav className="text-sm mb-5" style={{ color: "rgba(255,255,255,0.6)" }}>
            <Link href="/" className="hover:text-white">Accueil</Link>
            <span className="mx-2">/</span>
            <Link href="/fai/" className="hover:text-white">Internet Fixe</Link>
            <span className="mx-2">/</span>
            <Link href="/fai/fournisseurs/" className="hover:text-white">Fournisseurs</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{provider.name}</span>
          </nav>

          <div className="flex items-start gap-6">
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-bold text-white shrink-0 shadow-lg"
              style={{ backgroundColor: provider.brandColor ?? "rgba(255,255,255,0.15)" }}
            >
              {provider.name.slice(0, 2).toUpperCase()}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{provider.name}</h1>
                {provider.verified && <CheckCircle className="w-5 h-5 text-green-400" />}
              </div>
              <p className="text-sm max-w-xl mb-4" style={{ color: "rgba(255,255,255,0.8)" }}>
                {provider.description}
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <HPScoreBadge score={provider.hpScore} showLabel size="lg" />
                {categories.map((cat) => (
                  <span
                    key={cat}
                    className="text-xs font-medium px-2 py-1 rounded-full text-white"
                    style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
                  >
                    {techLabel[cat] ?? cat}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="mt-6 flex flex-wrap gap-3">
            {provider.website && (
              <a
                href={provider.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white border border-white/30 hover:bg-white/10 transition-colors"
              >
                <Globe className="w-4 h-4" /> Site officiel
              </a>
            )}
            {provider.phone && (
              <a
                href={`tel:${provider.phone}`}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white border border-white/30 hover:bg-white/10 transition-colors"
              >
                <Phone className="w-4 h-4" /> {provider.phone}
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Offres */}
      <section className="py-10">
        <div className="container">
          <h2 className="text-xl font-bold mb-6" style={{ color: "var(--color-text)" }}>
            Offres internet de {provider.name}
          </h2>
          {offers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {offers.map((offer) => (
                <OfferCard key={offer.slug} offer={offer} provider={provider} verticalSlug="fai" />
              ))}
            </div>
          ) : (
            <p style={{ color: "var(--color-muted)" }}>Offres à venir.</p>
          )}
        </div>
      </section>

      {/* Résumé tech */}
      <section className="py-10" style={{ backgroundColor: "var(--color-primary-light)" }}>
        <div className="container max-w-2xl">
          <h2 className="text-xl font-bold mb-4" style={{ color: "var(--color-text)" }}>
            Technologies proposées
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {categories.map((cat) => {
              const techIcons: Record<string, string> = {
                "4g-fixe": "📶", adsl: "🔌", fibre: "⚡", satellite: "🛰️",
              }
              const count = offers.filter((o) => o.category === cat).length
              return (
                <div
                  key={cat}
                  className="rounded-xl p-4 border text-center"
                  style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-card)" }}
                >
                  <div className="text-2xl mb-1">{techIcons[cat] ?? "🌐"}</div>
                  <p className="text-sm font-semibold" style={{ color: "var(--color-text)" }}>
                    {techLabel[cat] ?? cat}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--color-muted)" }}>
                    {count} offre{count > 1 ? "s" : ""}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Retour */}
      <div className="container py-8">
        <Link
          href="/fai/fournisseurs/"
          className="inline-flex items-center gap-2 text-sm font-semibold"
          style={{ color: "var(--color-primary)" }}
        >
          ← Retour aux fournisseurs internet
        </Link>
      </div>
    </>
  )
}
