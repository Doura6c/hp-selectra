import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { PROVIDERS, OFFERS } from "@/lib/data/seed-data"
import HPScoreBadge from "@/components/ui/HPScoreBadge"
import OfferCard from "@/components/compare/OfferCard"
import { CheckCircle } from "lucide-react"

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

  return (
    <>
      <section
        className="py-10"
        style={{
          background: `linear-gradient(135deg, var(--color-secondary-dark), var(--color-secondary))`,
        }}
      >
        <div className="container">
          <nav className="text-sm mb-4" style={{ color: "rgba(255,255,255,0.6)" }}>
            <Link href="/" className="hover:text-white">Accueil</Link>
            <span className="mx-2">/</span>
            <Link href="/mobile-money/" className="hover:text-white">Mobile Money</Link>
            <span className="mx-2">/</span>
            <Link href="/mobile-money/fournisseurs/" className="hover:text-white">Services</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{provider.name}</span>
          </nav>

          <div className="flex items-start gap-6">
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-bold text-white shrink-0 shadow-lg"
              style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
            >
              {provider.name.slice(0, 2).toUpperCase()}
            </div>
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
