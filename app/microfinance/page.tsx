import type { Metadata } from "next"
import Link from "next/link"
import { PROVIDERS, OFFERS } from "@/lib/data/seed-data"
import OfferCard from "@/components/compare/OfferCard"
import ProviderCard from "@/components/compare/ProviderCard"
import { ArrowRight, AlertCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Microfinance en Guinée — Micro-crédits, épargne, financement PME | HP Selectra",
  description:
    "Comparez les institutions de microfinance en Guinée : CRG-SA, Finafrica, Akiba Finance, CAFODEC. Micro-crédits agricoles, commerce, épargne. HP Score indépendant.",
}

const MF_COLOR = "#6B8F3C"
const MF_DARK  = "#4E6A2C"

export default function MicrofinancePage() {
  const providers      = PROVIDERS.filter((p) => p.verticalSlug === "microfinance")
    .sort((a, b) => b.hpScoreNum - a.hpScoreNum)
  const featuredOffers = OFFERS.filter((o) => o.verticalSlug === "microfinance" && o.isFeatured)

  return (
    <>
      {/* Hero */}
      <section className="py-12 sm:py-16" style={{ background: `linear-gradient(135deg, ${MF_DARK}, ${MF_COLOR})` }}>
        <div className="container">
          <nav className="text-sm mb-4" style={{ color: "rgba(255,255,255,0.6)" }}>
            <Link href="/" className="hover:text-white">Accueil</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Microfinance</span>
          </nav>
          <div className="flex items-start gap-4">
            <div className="text-5xl">🤝</div>
            <div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white mb-2">
                Microfinance en Guinée
              </h1>
              <p className="text-base max-w-xl" style={{ color: "rgba(255,255,255,0.85)" }}>
                Comparez micro-crédits agricoles, crédits PME et produits d&apos;épargne des{" "}
                {providers.length} principales institutions guinéennes — classement HP Score indépendant.
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/microfinance/comparateur/"
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white"
              style={{ backgroundColor: "rgba(255,255,255,0.2)" }}>
              Comparer toutes les offres
            </Link>
            <Link href="/microfinance/fournisseurs/"
              className="px-5 py-2.5 rounded-xl text-sm font-semibold"
              style={{ backgroundColor: "#fff", color: MF_COLOR }}>
              Toutes les institutions →
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-4 max-w-sm">
            {[
              { val: `${providers.length}`, label: "Institutions" },
              { val: "4",                    label: "Types de crédit" },
              { val: "Gratuit",              label: "Conseil HP" },
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

        {/* Alerte inclusion financière */}
        <div className="flex items-start gap-3 p-4 rounded-2xl border mb-10"
          style={{ backgroundColor: "#F1F8E9", borderColor: MF_COLOR }}>
          <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" style={{ color: MF_COLOR }} />
          <div>
            <p className="font-semibold text-sm" style={{ color: "var(--color-text)" }}>
              La microfinance : un levier essentiel en Guinée
            </p>
            <p className="text-xs mt-1" style={{ color: "var(--color-muted)" }}>
              Seulement 23 % des Guinéens ont accès aux services bancaires formels.
              Les institutions de microfinance (IMF) jouent un rôle crucial pour financer
              les agriculteurs, commerçants, femmes entrepreneures et PME exclus du système bancaire classique.
            </p>
          </div>
        </div>

        {/* Top institutions */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold" style={{ color: "var(--color-text)" }}>
              🏆 Top institutions — HP Score Microfinance
            </h2>
            <Link href="/microfinance/fournisseurs/" className="text-sm font-semibold flex items-center gap-1"
              style={{ color: MF_COLOR }}>
              Voir toutes <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {providers.slice(0, 3).map((p) => (
              <ProviderCard key={p.slug} provider={p} verticalSlug="microfinance" />
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
              <Link href="/microfinance/comparateur/" className="text-sm font-semibold flex items-center gap-1"
                style={{ color: MF_COLOR }}>
                Tout comparer <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {featuredOffers.slice(0, 3).map((offer) => {
                const provider = providers.find((p) => p.slug === offer.providerSlug)!
                return (
                  <OfferCard key={offer.slug} offer={offer} provider={provider} verticalSlug="microfinance" />
                )
              })}
            </div>
          </section>
        )}

        {/* Catégories */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-6" style={{ color: "var(--color-text)" }}>
            🗂️ Types de financement
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { cat: "microcredit",       icon: "💰", label: "Micro-crédits",     sub: "Agricole, commerce, solidaire" },
              { cat: "credit-pme",        icon: "🏢", label: "Crédits PME",       sub: "Fonds de roulement, investissement" },
              { cat: "credit-equipement", icon: "⚙️", label: "Équipement",        sub: "Machines, véhicules, matériel" },
              { cat: "epargne",           icon: "🏦", label: "Épargne",            sub: "Comptes sécurisés avec intérêts" },
              { cat: "credit-femmes",     icon: "👩‍💼", label: "Crédit Femmes",    sub: "Groupements féminins" },
              { cat: "credit-agricole",   icon: "🌾", label: "Crédit Agricole",   sub: "Semences, intrants, élevage" },
            ].map(({ cat, icon, label, sub }) => (
              <Link
                key={cat}
                href={`/microfinance/comparateur/?categorie=${cat}`}
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
        <section className="rounded-2xl p-6 sm:p-8 mb-10 flex flex-col sm:flex-row items-start sm:items-center gap-5"
          style={{ background: `linear-gradient(135deg, ${MF_DARK}, ${MF_COLOR})` }}>
          <div className="flex-1">
            <p className="text-white font-bold text-lg mb-1">Comment obtenir un micro-crédit en Guinée ?</p>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.8)" }}>
              Notre guide complet : conditions d&apos;éligibilité, documents requis, IMF recommandées
              selon votre profil et montant souhaité.
            </p>
          </div>
          <Link href="/microfinance/guides/obtenir-microcredit/"
            className="shrink-0 px-5 py-2.5 rounded-xl font-semibold text-sm"
            style={{ backgroundColor: "#fff", color: MF_COLOR }}>
            Lire le guide →
          </Link>
        </section>

        {/* Conseil gratuit */}
        <div className="rounded-2xl border p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4"
          style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}>
          <div className="flex-1">
            <p className="font-semibold mb-1" style={{ color: "var(--color-text)" }}>
              Besoin d&apos;un financement adapté à votre situation ?
            </p>
            <p className="text-sm" style={{ color: "var(--color-muted)" }}>
              Un conseiller Help&apos;me Process identifie la meilleure IMF selon votre profil — 100 % gratuit, sans engagement.
            </p>
          </div>
          <Link href="/contact/" className="shrink-0 px-5 py-2.5 rounded-xl text-sm font-semibold text-white"
            style={{ backgroundColor: MF_COLOR }}>
            Être conseillé
          </Link>
        </div>
      </div>
    </>
  )
}
