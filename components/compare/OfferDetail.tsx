import Link from "next/link"
import { PROVIDERS, OFFERS, VERTICALS } from "@/lib/data/seed-data"
import type { OfferData, ProviderData } from "@/lib/data/seed-data"
import HPScoreBadge from "@/components/ui/HPScoreBadge"
import OfferCard from "@/components/compare/OfferCard"
import { Phone, Globe, CheckCircle, ArrowLeft } from "lucide-react"

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "224000000000"

type Props = {
  offer: OfferData
  provider: ProviderData
  verticalSlug: string
}

export default function OfferDetail({ offer, provider, verticalSlug }: Props) {
  const vertical = VERTICALS.find((v) => v.slug === verticalSlug)
  const relatedOffers = OFFERS.filter(
    (o) => o.verticalSlug === verticalSlug && o.providerSlug === provider.slug && o.slug !== offer.slug
  ).slice(0, 3)

  return (
    <>
      {/* En-tête offre */}
      <section
        className="relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, var(--color-primary-dark) 0%, var(--color-primary) 70%)` }}
      >
        <div className="container relative py-10 sm:py-12">
          <nav className="text-sm mb-5" style={{ color: "rgba(255,255,255,0.6)" }}>
            <Link href="/" className="hover:text-white">Accueil</Link>
            <span className="mx-2">/</span>
            <Link href={`/${verticalSlug}/`} className="hover:text-white">{vertical?.name ?? verticalSlug}</Link>
            <span className="mx-2">/</span>
            <Link href={`/${verticalSlug}/comparateur/`} className="hover:text-white">Comparateur</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{offer.name}</span>
          </nav>

          <div className="grid lg:grid-cols-3 gap-8 items-start">
            {/* Infos principales */}
            <div className="lg:col-span-2">
              {offer.isFeatured && (
                <span
                  className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-3 text-white"
                  style={{ backgroundColor: "var(--color-secondary)" }}
                >
                  ⭐ Offre recommandée
                </span>
              )}
              <p className="text-sm font-medium uppercase tracking-wide mb-1" style={{ color: "rgba(255,255,255,0.6)" }}>
                {provider.name}
              </p>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3 flex items-center gap-3">
                {offer.name}
                {provider.verified && <CheckCircle className="w-6 h-6 text-green-400 shrink-0" />}
              </h1>
              <p className="text-base max-w-xl" style={{ color: "rgba(255,255,255,0.85)" }}>
                {offer.description}
              </p>
              <div className="flex items-center gap-4 mt-5">
                <HPScoreBadge score={offer.hpScore} showLabel size="lg" />
                <div className="text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
                  Note attribuée par notre<br />HP Score indépendant
                </div>
              </div>
            </div>

            {/* Carte prix + CTA */}
            <div className="rounded-2xl p-6 shadow-2xl" style={{ backgroundColor: "var(--color-card)" }}>
              <p className="text-xs font-medium uppercase tracking-wide mb-1" style={{ color: "var(--color-muted)" }}>
                Tarif indicatif
              </p>
              <p className="text-2xl font-extrabold mb-1" style={{ color: "var(--color-primary)" }}>
                {offer.priceNote}
              </p>
              {offer.priceIsExample && (
                <span
                  className="inline-block text-[11px] font-medium px-2 py-0.5 rounded mb-4"
                  style={{ backgroundColor: "var(--color-warning)", color: "#fff" }}
                >
                  ⚠ Tarif d'exemple à vérifier
                </span>
              )}

              <div className="flex flex-col gap-2 mt-4">
                {provider.website ? (
                  <a
                    href={provider.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
                    style={{ backgroundColor: "var(--color-primary)" }}
                  >
                    <Globe className="w-4 h-4" /> Voir chez l'opérateur
                  </a>
                ) : (
                  <Link
                    href={`/${verticalSlug}/fournisseurs/${provider.slug}/`}
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
                    style={{ backgroundColor: "var(--color-primary)" }}
                  >
                    Voir la fiche {provider.name}
                  </Link>
                )}
                <a
                  href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(`Bonjour, je suis intéressé par l'offre ${offer.name} de ${provider.name}. Pouvez-vous me conseiller ?`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
                  style={{ backgroundColor: "var(--color-whatsapp)" }}
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Être conseillé (gratuit)
                </a>
                <Link
                  href="/contact/"
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold border transition-colors hover:bg-surface"
                  style={{ borderColor: "var(--color-border)", color: "var(--color-text)" }}
                >
                  <Phone className="w-4 h-4" /> Demander un rappel
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Caractéristiques */}
      <section className="py-10">
        <div className="container">
          <h2 className="text-xl font-bold mb-6" style={{ color: "var(--color-text)" }}>
            Caractéristiques de l'offre
          </h2>

          {offer.details.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {offer.details.map((d) => (
                <div
                  key={d.key}
                  className="rounded-2xl border p-5 text-center"
                  style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-card)" }}
                >
                  <p className="text-xs font-medium uppercase tracking-wide mb-2" style={{ color: "var(--color-muted)" }}>
                    {d.key}
                  </p>
                  <p className="text-lg font-extrabold" style={{ color: "var(--color-primary)" }}>
                    {d.value}
                    {d.unit && <span className="font-normal text-sm ml-1">{d.unit}</span>}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: "var(--color-muted)" }}>Détails à venir.</p>
          )}

          {/* Disclaimer */}
          <div
            className="flex items-start gap-3 p-4 rounded-xl mt-8 text-sm"
            style={{ backgroundColor: "var(--color-warning)", color: "#fff" }}
          >
            <span className="text-lg shrink-0">⚠️</span>
            <p>
              Les informations et tarifs affichés sont des <strong>données d'exemple à titre indicatif</strong>.
              Confirmez toujours les conditions actuelles auprès de {provider.name} avant toute souscription.
              Un conseiller Help&apos;me Process peut vous accompagner gratuitement.
            </p>
          </div>
        </div>
      </section>

      {/* Offres liées */}
      {relatedOffers.length > 0 && (
        <section className="py-10" style={{ backgroundColor: "var(--color-primary-light)" }}>
          <div className="container">
            <h2 className="text-xl font-bold mb-6" style={{ color: "var(--color-text)" }}>
              Autres offres de {provider.name}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedOffers.map((o) => (
                <OfferCard key={o.slug} offer={o} provider={provider} verticalSlug={verticalSlug} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Retour */}
      <div className="container py-8">
        <Link
          href={`/${verticalSlug}/comparateur/`}
          className="inline-flex items-center gap-2 text-sm font-semibold"
          style={{ color: "var(--color-primary)" }}
        >
          <ArrowLeft className="w-4 h-4" /> Retour au comparateur
        </Link>
      </div>
    </>
  )
}
