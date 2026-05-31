import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { PROVIDERS, OFFERS } from "@/lib/data/seed-data"
import HPScoreBadge from "@/components/ui/HPScoreBadge"
import ProviderLogoAvatar from "@/components/ui/ProviderLogoAvatar"
import OfferCard from "@/components/compare/OfferCard"
import ProviderMeta from "@/components/ui/ProviderMeta"
import Breadcrumb from "@/components/ui/Breadcrumb"
import { CheckCircle } from "lucide-react"
import { buildJsonLd, breadcrumbSchema, providerRatingSchema } from "@/lib/schema"

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return PROVIDERS.filter((p) => p.verticalSlug === "mobile-money").map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const provider = PROVIDERS.find((p) => p.slug === slug && p.verticalSlug === "mobile-money")
  if (!provider) return {}
  return {
    title: `${provider.name} — Frais et avis | HP Selectra Guinée`,
    description: provider.description,
  }
}

export default async function MobileMoneyProviderPage({ params }: Props) {
  const { slug } = await params
  const provider = PROVIDERS.find((p) => p.slug === slug && p.verticalSlug === "mobile-money")
  if (!provider) notFound()

  const offers = OFFERS.filter((o) => o.providerSlug === provider.slug)
  const isSoutra = provider.slug === "soutra-money"

  const jsonLdRating = providerRatingSchema({
    name: provider.name,
    description: provider.description,
    url: `/mobile-money/fournisseurs/${provider.slug}/`,
    website: provider.website,
    hpScore: provider.hpScore,
    hpScoreNum: provider.hpScoreNum,
    vertical: "Mobile Money",
  })
  const jsonLdBreadcrumb = breadcrumbSchema([
    { name: "Accueil", href: "/" },
    { name: "Mobile Money", href: "/mobile-money/" },
    { name: "Services", href: "/mobile-money/fournisseurs/" },
    { name: provider.name },
  ])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: buildJsonLd(jsonLdRating) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: buildJsonLd(jsonLdBreadcrumb) }} />
      <section
        className="py-10"
        style={{
          background: `linear-gradient(135deg, var(--color-secondary-dark), var(--color-secondary))`,
        }}
      >
        <div className="container">
          <Breadcrumb
            className="mb-4"
            items={[
              { label: "Mobile Money", href: "/mobile-money/" },
              { label: "Services", href: "/mobile-money/fournisseurs/" },
              { label: provider.name },
            ]}
          />

          <div className="flex items-start gap-6">
            <ProviderLogoAvatar provider={provider} size={80} />
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{provider.name}</h1>
                {provider.verified && <CheckCircle className="w-5 h-5 text-green-300" />}
                {isSoutra && (
                  <span
                    className="text-xs font-bold px-2 py-1 rounded-full"
                    style={{ backgroundColor: "var(--color-accent)", color: "#fff" }}
                  >
                    ⭐ Données réelles vérifiées
                  </span>
                )}
              </div>
              <p className="text-sm max-w-xl" style={{ color: "rgba(255,255,255,0.85)" }}>
                {provider.description}
              </p>

              {isSoutra && (
                <div className="flex flex-wrap gap-3 mt-4">
                  {[
                    { label: "Dépôt", value: "Gratuit" },
                    { label: "Retrait", value: "Gratuit" },
                    { label: "Transfert", value: "≤ 1 %" },
                    { label: "Carte Visa", value: "Disponible" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="px-3 py-2 rounded-xl text-center"
                      style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
                    >
                      <p className="text-[10px] font-medium text-white/70">{item.label}</p>
                      <p className="text-sm font-bold text-white">{item.value}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <HPScoreBadge score={provider.hpScore!} showLabel size="lg" />
          </div>
        </div>
      </section>

      {/* Meta : auteur + date MAJ */}
      <div className="container py-4">
        <ProviderMeta verticalSlug="mobile-money" updatedAt={new Date()} verified={provider.verified} />
      </div>

      <section className="py-10">
        <div className="container">
          <h2 className="text-xl font-bold mb-6" style={{ color: "var(--color-text)" }}>
            Offres {provider.name}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {offers.map((offer) => (
              <OfferCard key={offer.slug} offer={offer} provider={provider} verticalSlug="mobile-money" />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
