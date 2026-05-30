import type { Metadata } from "next"
import Link from "next/link"
import { PROVIDERS, OFFERS } from "@/lib/data/seed-data"
import OfferCard from "@/components/compare/OfferCard"
import ProviderCard from "@/components/compare/ProviderCard"
import { ArrowRight, Shield } from "lucide-react"

export const metadata: Metadata = {
  title: "Assurances en Guinée — Comparez auto, santé, habitation | HP Selectra",
  description:
    "Comparez les meilleures assurances en Guinée : NSIA, UGAR-Activa, SUNU, Lanala. RC auto, tous risques, santé, habitation. Classement HP Score indépendant.",
}

const ASSURANCE_COLOR = "#B02840"
const ASSURANCE_DARK  = "#7B1A2E"

export default function AssurancesPage() {
  const providers      = PROVIDERS.filter((p) => p.verticalSlug === "assurances")
    .sort((a, b) => b.hpScoreNum - a.hpScoreNum)
  const featuredOffers = OFFERS.filter((o) => o.verticalSlug === "assurances" && o.isFeatured)

  return (
    <>
      {/* Hero */}
      <section className="py-12 sm:py-16" style={{ background: `linear-gradient(135deg, ${ASSURANCE_DARK}, ${ASSURANCE_COLOR})` }}>
        <div className="container">
          <nav className="text-sm mb-4" style={{ color: "rgba(255,255,255,0.6)" }}>
            <Link href="/" className="hover:text-white">Accueil</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Assurances</span>
          </nav>
          <div className="flex items-start gap-4">
            <div className="text-5xl">🛡️</div>
            <div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white mb-2">
                Assurances en Guinée
              </h1>
              <p className="text-base max-w-xl" style={{ color: "rgba(255,255,255,0.85)" }}>
                Comparez RC auto, tous risques, assurance santé et habitation des{" "}
                {providers.length} principales compagnies guinéennes — classement HP Score indépendant.
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/assurances/comparateur/"
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white"
              style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
            >
              Comparer toutes les offres
            </Link>
            <Link
              href="/assurances/fournisseurs/"
              className="px-5 py-2.5 rounded-xl text-sm font-semibold"
              style={{ backgroundColor: "#fff", color: ASSURANCE_COLOR }}
            >
              Toutes les compagnies →
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-4 max-w-sm">
            {[
              { val: `${providers.length}`, label: "Compagnies" },
              { val: "5", label: "Types de couverture" },
              { val: "Gratuit", label: "Conseil HP" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-xl font-extrabold text-white">{s.val}</p>
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.65)" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container py-10 sm:py-14">

        {/* RC Auto obligatoire */}
        <div className="flex items-start gap-3 p-4 rounded-2xl border mb-10"
          style={{ backgroundColor: "#FFF8E1", borderColor: "#F0A500" }}>
          <Shield className="w-5 h-5 mt-0.5 shrink-0" style={{ color: "#F0A500" }} />
          <div>
            <p className="font-semibold text-sm" style={{ color: "var(--color-text)" }}>
              RC Auto obligatoire en Guinée
            </p>
            <p className="text-xs mt-1" style={{ color: "var(--color-muted)" }}>
              La loi guinéenne impose à tout véhicule en circulation une assurance RC auto minimum.
              Circuler sans assurance est passible d&apos;amende et de mise en fourrière.
              Comparez les tarifs RC des compagnies agréées ci-dessous.
            </p>
          </div>
        </div>

        {/* Top compagnies */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold" style={{ color: "var(--color-text)" }}>
              🏆 Top compagnies — HP Score Assurances
            </h2>
            <Link href="/assurances/fournisseurs/" className="text-sm font-semibold flex items-center gap-1"
              style={{ color: ASSURANCE_COLOR }}>
              Voir toutes <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {providers.slice(0, 3).map((p) => (
              <ProviderCard key={p.slug} provider={p} verticalSlug="assurances" />
            ))}
          </div>
        </section>

        {/* Offres phares */}
        {featuredOffers.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold" style={{ color: "var(--color-text)" }}>
                📋 Offres phares du moment
              </h2>
              <Link href="/assurances/comparateur/" className="text-sm font-semibold flex items-center gap-1"
                style={{ color: ASSURANCE_COLOR }}>
                Tout comparer <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {featuredOffers.slice(0, 3).map((offer) => {
                const provider = providers.find((p) => p.slug === offer.providerSlug)!
                return (
                  <OfferCard key={offer.slug} offer={offer} provider={provider} verticalSlug="assurances" />
                )
              })}
            </div>
          </section>
        )}

        {/* Catégories */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-6" style={{ color: "var(--color-text)" }}>
            🗂️ Tous les types d&apos;assurance
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { cat: "rc-auto",       icon: "🚗", label: "RC Auto",       sub: "Obligatoire par la loi" },
              { cat: "tous-risques",  icon: "🛡️", label: "Tous Risques",  sub: "Couverture complète véhicule" },
              { cat: "sante",         icon: "🏥", label: "Santé",          sub: "Individuel & famille" },
              { cat: "habitation",    icon: "🏠", label: "Habitation",     sub: "Locataire & propriétaire" },
              { cat: "vie",           icon: "💚", label: "Vie & Épargne",  sub: "Prévoyance & retraite" },
              { cat: "professionnel", icon: "💼", label: "Professionnel",  sub: "RC + locaux professionnels" },
            ].map(({ cat, icon, label, sub }) => (
              <Link
                key={cat}
                href={`/assurances/comparateur/?categorie=${cat}`}
                className="flex items-center gap-3 p-4 rounded-2xl border hover:shadow-md transition-shadow"
                style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}
              >
                <span className="text-2xl">{icon}</span>
                <div>
                  <p className="text-sm font-bold" style={{ color: "var(--color-text)" }}>{label}</p>
                  <p className="text-xs" style={{ color: "var(--color-muted)" }}>{sub}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA guide */}
        <section
          className="rounded-2xl p-6 sm:p-8 mb-10 flex flex-col sm:flex-row items-start sm:items-center gap-5"
          style={{ background: `linear-gradient(135deg, ${ASSURANCE_DARK}, ${ASSURANCE_COLOR})` }}
        >
          <div className="flex-1">
            <p className="text-white font-bold text-lg mb-1">Comment choisir son assurance en Guinée ?</p>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.8)" }}>
              Notre guide complet : RC auto, santé, habitation — ce qui est obligatoire,
              ce qui est recommandé et comment comparer les tarifs efficacement.
            </p>
          </div>
          <Link
            href="/assurances/guides/choisir-assurance/"
            className="shrink-0 px-5 py-2.5 rounded-xl font-semibold text-sm"
            style={{ backgroundColor: "#fff", color: ASSURANCE_COLOR }}
          >
            Lire le guide →
          </Link>
        </section>

        {/* Conseil gratuit */}
        <div className="rounded-2xl border p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4"
          style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}>
          <div className="flex-1">
            <p className="font-semibold mb-1" style={{ color: "var(--color-text)" }}>
              Besoin d&apos;un conseil pour choisir votre assurance ?
            </p>
            <p className="text-sm" style={{ color: "var(--color-muted)" }}>
              Un conseiller Help&apos;me Process vous guide — 100 % gratuit, sans engagement.
            </p>
          </div>
          <Link href="/contact/" className="shrink-0 px-5 py-2.5 rounded-xl text-sm font-semibold text-white"
            style={{ backgroundColor: ASSURANCE_COLOR }}>
            Être conseillé
          </Link>
        </div>
      </div>
    </>
  )
}
