import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { PROVIDERS, OFFERS } from "@/lib/data/seed-data"
import HPScoreBadge from "@/components/ui/HPScoreBadge"
import OfferCard from "@/components/compare/OfferCard"
import ProviderMeta from "@/components/ui/ProviderMeta"
import Breadcrumb from "@/components/ui/Breadcrumb"
import { Globe, CheckCircle, XCircle, Phone, MessageCircle } from "lucide-react"
import { buildJsonLd, breadcrumbSchema, providerRatingSchema } from "@/lib/schema"

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "224628935335"
const CC_PHONE  = process.env.NEXT_PUBLIC_CC_PHONE        ?? "224628935335"

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return PROVIDERS.filter((p) => p.verticalSlug === "assurances").map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const provider = PROVIDERS.find((p) => p.slug === slug && p.verticalSlug === "assurances")
  if (!provider) return {}
  return {
    title: `${provider.name} — Offres, avis et HP Score | HP Selectra Guinée`,
    description: provider.description,
  }
}

export default async function AssuranceProviderPage({ params }: Props) {
  const { slug } = await params
  const provider = PROVIDERS.find((p) => p.slug === slug && p.verticalSlug === "assurances")
  if (!provider) notFound()

  const offers = OFFERS.filter((o) => o.providerSlug === slug)

  const jsonLdBreadcrumb = buildJsonLd(breadcrumbSchema([
    { name: "Accueil", href: "/" },
    { name: "Assurances", href: "/assurances/" },
    { name: "Compagnies", href: "/assurances/fournisseurs/" },
    { name: provider.name },
  ]))
  const jsonLdRating = buildJsonLd(providerRatingSchema({
    name: provider.name,
    description: provider.description,
    url: `/assurances/fournisseurs/${slug}/`,
    website: provider.website,
    hpScore: provider.hpScore,
    hpScoreNum: provider.hpScoreNum,
    vertical: "Assurances",
  }))

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdBreadcrumb }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdRating }} />

      {/* Hero */}
      <section className="py-10 sm:py-14"
        style={{ background: `linear-gradient(135deg, ${provider.brandColor ?? "#7B1A2E"}cc, ${provider.brandColor ?? "#B02840"})` }}>
        <div className="container">
          <Breadcrumb items={[
            { label: "Accueil", href: "/" },
            { label: "Assurances", href: "/assurances/" },
            { label: "Compagnies", href: "/assurances/fournisseurs/" },
            { label: provider.name },
          ]} />

          <div className="flex items-start gap-5 mt-6">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold text-white shrink-0 shadow-lg"
              style={{ backgroundColor: provider.brandColor ?? "#B02840" }}>
              {provider.name.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{provider.name}</h1>
                <HPScoreBadge score={provider.hpScore} />
                {provider.verified && (
                  <span className="text-xs px-2 py-0.5 rounded-full font-semibold text-white"
                    style={{ backgroundColor: "rgba(255,255,255,0.2)" }}>✅ Vérifié</span>
                )}
              </div>
              {provider.tagline && (
                <p className="text-sm" style={{ color: "rgba(255,255,255,0.8)" }}>{provider.tagline}</p>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="container py-10 max-w-4xl">

        {/* Fiche principale */}
        <div className="grid lg:grid-cols-3 gap-6 mb-10">
          {/* Description + pros/cons */}
          <div className="lg:col-span-2 space-y-5">
            <div className="p-5 rounded-2xl border" style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}>
              <p className="text-sm leading-relaxed" style={{ color: "var(--color-muted)" }}>{provider.description}</p>
            </div>

            {provider.pros && provider.pros.length > 0 && (
              <div className="p-5 rounded-2xl border" style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}>
                <p className="font-bold text-sm mb-3" style={{ color: "var(--color-text)" }}>✅ Points forts</p>
                <ul className="space-y-2">
                  {provider.pros.map((pro) => (
                    <li key={pro} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "#6B8F3C" }} />
                      <span style={{ color: "var(--color-text)" }}>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {provider.cons && provider.cons.length > 0 && (
              <div className="p-5 rounded-2xl border" style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}>
                <p className="font-bold text-sm mb-3" style={{ color: "var(--color-text)" }}>⚠️ Points de vigilance</p>
                <ul className="space-y-2">
                  {provider.cons.map((con) => (
                    <li key={con} className="flex items-start gap-2 text-sm">
                      <XCircle className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "#E67E22" }} />
                      <span style={{ color: "var(--color-muted)" }}>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <ProviderMeta verticalSlug="assurances" updatedAt={new Date()} verified={provider.verified} />

            {provider.website && (
              <a href={provider.website} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 w-full px-4 py-2.5 rounded-xl text-sm font-semibold text-white"
                style={{ backgroundColor: provider.brandColor ?? "#B02840" }}>
                <Globe className="w-4 h-4" /> Site officiel
              </a>
            )}

            <a href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(`Bonjour, je souhaite un devis ${provider.name} pour une assurance en Guinée.`)}`}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 w-full px-4 py-2.5 rounded-xl text-sm font-semibold text-white"
              style={{ backgroundColor: "#25D366" }}>
              <MessageCircle className="w-4 h-4" /> Devis WhatsApp gratuit
            </a>

            <a href={`tel:${CC_PHONE}`}
              className="flex items-center gap-2 w-full px-4 py-2.5 rounded-xl border text-sm font-semibold"
              style={{ borderColor: "var(--color-border)", color: "var(--color-text)" }}>
              <Phone className="w-4 h-4" /> Rappel gratuit
            </a>
          </div>
        </div>

        {/* Offres */}
        {offers.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-bold mb-5" style={{ color: "var(--color-text)" }}>
              Offres {provider.name}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {offers.map((offer) => (
                <OfferCard key={offer.slug} offer={offer} provider={provider} verticalSlug="assurances" />
              ))}
            </div>
          </section>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between pt-6 border-t" style={{ borderColor: "var(--color-border)" }}>
          <Link href="/assurances/fournisseurs/" className="text-sm font-semibold flex items-center gap-1"
            style={{ color: "var(--color-primary)" }}>
            ← Toutes les compagnies
          </Link>
          <Link href="/assurances/comparateur/" className="text-sm font-semibold flex items-center gap-1"
            style={{ color: "#B02840" }}>
            Comparer toutes les offres →
          </Link>
        </div>
      </div>
    </>
  )
}
