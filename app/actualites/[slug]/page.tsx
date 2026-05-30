import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ARTICLES, OFFERS, PROVIDERS, VERTICALS } from "@/lib/data/seed-data"
import OfferCard from "@/components/compare/OfferCard"
import SocialShare from "@/components/ui/SocialShare"
import { formatDate } from "@/lib/utils"
import { ArrowLeft, Clock, User } from "lucide-react"

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return ARTICLES.filter((a) => a.isPublished).map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = ARTICLES.find((a) => a.slug === slug)
  if (!article) return {}
  return {
    title: `${article.title} | HP Selectra Guinée`,
    description: article.excerpt,
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const article = ARTICLES.find((a) => a.slug === slug && a.isPublished)
  if (!article) notFound()

  const vertical = VERTICALS.find((v) => v.slug === article.verticalSlug)
  const relatedOffers = OFFERS.filter(
    (o) => o.verticalSlug === article.verticalSlug && o.isFeatured
  ).slice(0, 3)
  const offerProviders = PROVIDERS

  return (
    <>
      {/* En-tête article */}
      <section
        className="py-10 sm:py-14"
        style={{ background: `linear-gradient(135deg, var(--color-primary-dark), var(--color-primary))` }}
      >
        <div className="container max-w-3xl">
          <nav className="text-sm mb-5 flex flex-wrap items-center gap-1" style={{ color: "rgba(255,255,255,0.6)" }}>
            <Link href="/" className="hover:text-white">Accueil</Link>
            <span>/</span>
            <Link href="/actualites/" className="hover:text-white">Actualités</Link>
            {vertical && (
              <>
                <span>/</span>
                <Link href={`/${vertical.slug}/`} className="hover:text-white">{vertical.name}</Link>
              </>
            )}
          </nav>

          {vertical && (
            <span
              className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4"
              style={{ backgroundColor: "rgba(255,255,255,0.15)", color: "#fff" }}
            >
              {vertical.icon} {vertical.name}
            </span>
          )}

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white mb-4 leading-tight">
            {article.title}
          </h1>

          <p className="text-base max-w-2xl mb-6" style={{ color: "rgba(255,255,255,0.85)" }}>
            {article.excerpt}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4" /> {article.authorName}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" /> {formatDate(article.publishedAt)}
            </span>
          </div>
        </div>
      </section>

      {/* Corps de l'article */}
      <div className="container max-w-3xl py-10">
        <div
          className="prose-sm sm:prose max-w-none rounded-2xl border p-6 sm:p-8 mb-10"
          style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}
        >
          <p className="text-base leading-relaxed font-medium mb-6" style={{ color: "var(--color-text)" }}>
            {article.excerpt}
          </p>

          <div
            className="p-4 rounded-xl text-sm mb-6"
            style={{ backgroundColor: "var(--color-primary-light)", color: "var(--color-primary)" }}
          >
            <strong>📌 Note HP Selectra :</strong> Cet article est un guide informatif basé sur des données
            d'exemple. Vérifiez toujours les conditions actuelles auprès des opérateurs et institutions
            avant toute décision. Un conseiller Help&apos;me Process peut vous accompagner gratuitement.
          </div>

          <div className="space-y-4 text-sm leading-relaxed" style={{ color: "var(--color-muted)" }}>
            <p>
              En Guinée, le marché des services numériques et financiers évolue rapidement.
              Notre équipe de conseillers indépendants analyse régulièrement les offres disponibles
              pour vous aider à faire le meilleur choix selon votre profil et votre budget.
            </p>
            <p>
              Le <strong style={{ color: "var(--color-text)" }}>HP Score</strong> que nous attribuons
              à chaque offre et fournisseur est calculé sur la base de critères objectifs : tarifs,
              qualité de service, couverture réseau, support client et conformité réglementaire (ARPT / BCRG).
            </p>
            <p>
              Vous souhaitez être accompagné personnellement ? Nos conseillers Help&apos;me Process
              sont disponibles gratuitement par WhatsApp ou par téléphone pour vous orienter vers
              l'offre la plus adaptée.
            </p>
          </div>
        </div>

        {/* CTA conseiller */}
        <div
          className="rounded-2xl p-6 sm:p-8 mb-10 flex flex-col sm:flex-row items-start sm:items-center gap-4"
          style={{ backgroundColor: "var(--color-primary-light)" }}
        >
          <div className="flex-1">
            <p className="font-semibold mb-1" style={{ color: "var(--color-text)" }}>
              Besoin d&apos;un conseil personnalisé ?
            </p>
            <p className="text-sm" style={{ color: "var(--color-muted)" }}>
              Un conseiller Help&apos;me Process vous aide à choisir — 100 % gratuit.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <Link
              href="/contact/"
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white"
              style={{ backgroundColor: "var(--color-primary)" }}
            >
              Être conseillé
            </Link>
          </div>
        </div>

        {/* Offres liées */}
        {relatedOffers.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-5" style={{ color: "var(--color-text)" }}>
              Offres recommandées — {vertical?.name}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {relatedOffers.map((offer) => {
                const provider = offerProviders.find((p) => p.slug === offer.providerSlug)!
                return (
                  <OfferCard
                    key={offer.slug}
                    offer={offer}
                    provider={provider}
                    verticalSlug={article.verticalSlug}
                  />
                )
              })}
            </div>
            <Link
              href={`/${article.verticalSlug}/comparateur/`}
              className="inline-flex items-center gap-2 text-sm font-semibold"
              style={{ color: "var(--color-primary)" }}
            >
              Voir toutes les offres →
            </Link>
          </div>
        )}

        {/* Partage social */}
        <SocialShare
          title={article.title}
          className="mt-8"
        />

        {/* Retour */}
        <div className="mt-6 pt-6 border-t" style={{ borderColor: "var(--color-border)" }}>
          <Link
            href="/actualites/"
            className="inline-flex items-center gap-2 text-sm font-semibold"
            style={{ color: "var(--color-primary)" }}
          >
            <ArrowLeft className="w-4 h-4" /> Retour aux actualités
          </Link>
        </div>
      </div>
    </>
  )
}
