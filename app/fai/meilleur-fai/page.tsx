import type { Metadata } from "next"
import Link from "next/link"
import { PROVIDERS, OFFERS } from "@/lib/data/seed-data"
import HPScoreBadge from "@/components/ui/HPScoreBadge"
import OfferCard from "@/components/compare/OfferCard"
import { ArrowRight, CheckCircle, AlertTriangle } from "lucide-react"

export const metadata: Metadata = {
  title: "Meilleur fournisseur internet en Guinée 2026 — Comparatif FAI",
  description:
    "Quel est le meilleur FAI en Guinée en 2026 ? On compare Orange Box, Guinée Télécom, GUILAB, Telecel Box et Spacetel sur le débit, le prix et la couverture.",
}

export default function MeilleurFaiPage() {
  const providers = PROVIDERS.filter((p) => p.verticalSlug === "fai").sort(
    (a, b) => b.hpScoreNum - a.hpScoreNum
  )
  const topOffer = OFFERS.find((o) => o.verticalSlug === "fai" && o.isFeatured)
  const topProvider = topOffer
    ? PROVIDERS.find((p) => p.slug === topOffer.providerSlug)
    : null

  const criteria = [
    { icon: "📶", label: "Débit réel", desc: "Le débit garanti ou typique en conditions normales d'utilisation." },
    { icon: "💰", label: "Rapport qualité-prix", desc: "Le prix mensuel rapporté aux Go ou Mbps effectivement fournis." },
    { icon: "🗺️", label: "Couverture", desc: "La zone géographique desservie (Conakry, grandes villes, zones rurales)." },
    { icon: "⚙️", label: "Fiabilité", desc: "La stabilité de la connexion et le SLA proposé (surtout pour les entreprises)." },
    { icon: "🛠️", label: "Support client", desc: "La réactivité et la disponibilité du service technique." },
  ]

  const useCases = [
    {
      icon: "🏠",
      title: "Usage résidentiel",
      recommandation: "Orange Box 20 Go ou Telecel Box Vana 30 Go",
      raison: "Meilleur rapport débit/prix pour une famille. Pas d'installation technique requise.",
      slug: "orange-box-20go",
    },
    {
      icon: "🏢",
      title: "Petite entreprise / bureau",
      recommandation: "Guinée Télécom ADSL Pro ou GUILAB Fibre Résidentiel",
      raison: "IP fixe, débit garanti, connexion stable indispensable pour les métiers du bureau.",
      slug: "guinee-telecom-adsl-pro",
    },
    {
      icon: "🏗️",
      title: "Grande entreprise / ONG",
      recommandation: "GUILAB Fibre Pro ou Spacetel VSAT",
      raison: "SLA contractuel, bande passante garantie, support prioritaire. VSAT si zone isolée.",
      slug: "guilab-fibre-pro",
    },
  ]

  return (
    <>
      {/* Hero */}
      <section
        className="py-12 sm:py-16"
        style={{ background: `linear-gradient(135deg, #003087 0%, #0070C0 100%)` }}
      >
        <div className="container">
          <nav className="text-sm mb-4" style={{ color: "rgba(255,255,255,0.6)" }}>
            <Link href="/" className="hover:text-white">Accueil</Link>
            <span className="mx-2">/</span>
            <Link href="/fai/" className="hover:text-white">Internet Fixe</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Meilleur FAI 2026</span>
          </nav>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white mb-3">
            Meilleur FAI en Guinée 2026
          </h1>
          <p className="text-base max-w-xl" style={{ color: "rgba(255,255,255,0.8)" }}>
            Quel fournisseur d'accès internet choisir en Guinée ? On compare les 6 FAI
            sur le débit, le prix, la couverture et la fiabilité.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/fai/comparateur/"
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: "var(--color-secondary)" }}
            >
              ⚖️ Lancer le comparateur
            </Link>
            <Link
              href="/fai/fournisseurs/"
              className="px-5 py-2.5 rounded-xl text-sm font-semibold border border-white/30 text-white hover:bg-white/10 transition-colors"
            >
              Voir tous les FAI
            </Link>
          </div>
        </div>
      </section>

      {/* Notre verdict rapide */}
      {topOffer && topProvider && (
        <section className="py-10" style={{ backgroundColor: "var(--color-secondary-light, var(--color-primary-light))" }}>
          <div className="container max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "var(--color-secondary)" }}>
              🏆 Notre verdict — Meilleur rapport qualité-prix
            </p>
            <h2 className="text-xl font-extrabold mb-4" style={{ color: "var(--color-text)" }}>
              {topOffer.name} — {topProvider.name}
            </h2>
            <OfferCard offer={topOffer} provider={topProvider} verticalSlug="fai" />
          </div>
        </section>
      )}

      {/* Critères */}
      <section className="py-10">
        <div className="container max-w-2xl">
          <h2 className="text-xl font-bold mb-6" style={{ color: "var(--color-text)" }}>
            Nos 5 critères de sélection
          </h2>
          <div className="space-y-4">
            {criteria.map((c) => (
              <div key={c.label} className="flex items-start gap-4">
                <span className="text-2xl shrink-0">{c.icon}</span>
                <div>
                  <p className="font-semibold text-sm" style={{ color: "var(--color-text)" }}>{c.label}</p>
                  <p className="text-sm" style={{ color: "var(--color-muted)" }}>{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Classement */}
      <section className="py-10" style={{ backgroundColor: "var(--color-primary-light)" }}>
        <div className="container max-w-2xl">
          <h2 className="text-xl font-bold mb-6" style={{ color: "var(--color-text)" }}>
            Classement HP Score des FAI guinéens
          </h2>
          <div className="space-y-3">
            {providers.map((p, i) => (
              <Link
                key={p.slug}
                href={`/fai/fournisseurs/${p.slug}/`}
                className="flex items-center gap-4 p-4 rounded-2xl border transition-all hover:shadow-md"
                style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-card)" }}
              >
                <span className="text-xl font-extrabold w-8 text-center" style={{ color: "var(--color-muted)" }}>
                  {i + 1}
                </span>
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold text-white shrink-0"
                  style={{ backgroundColor: p.brandColor ?? "var(--color-primary)" }}
                >
                  {p.name.slice(0, 2).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-sm truncate" style={{ color: "var(--color-text)" }}>
                      {p.name}
                    </p>
                    {p.verified && <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />}
                  </div>
                  <p className="text-xs truncate" style={{ color: "var(--color-muted)" }}>
                    {p.description.slice(0, 80)}…
                  </p>
                </div>
                <HPScoreBadge score={p.hpScore} size="md" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Par usage */}
      <section className="py-10">
        <div className="container max-w-2xl">
          <h2 className="text-xl font-bold mb-6" style={{ color: "var(--color-text)" }}>
            Quelle solution selon votre usage ?
          </h2>
          <div className="space-y-4">
            {useCases.map((uc) => (
              <div
                key={uc.icon}
                className="rounded-2xl border p-5"
                style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-card)" }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{uc.icon}</span>
                  <h3 className="font-bold" style={{ color: "var(--color-text)" }}>{uc.title}</h3>
                </div>
                <p className="text-sm font-semibold mb-1" style={{ color: "var(--color-primary)" }}>
                  ✅ {uc.recommandation}
                </p>
                <p className="text-sm mb-3" style={{ color: "var(--color-muted)" }}>
                  {uc.raison}
                </p>
                <Link
                  href={`/fai/offres/${uc.slug}/`}
                  className="inline-flex items-center gap-1 text-sm font-semibold"
                  style={{ color: "var(--color-secondary)" }}
                >
                  Voir l'offre <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Avertissement */}
      <div className="container pb-10 max-w-2xl">
        <div
          className="flex items-start gap-3 p-4 rounded-xl text-sm"
          style={{ backgroundColor: "var(--color-warning)", color: "#fff" }}
        >
          <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
          <p>
            Les tarifs et débits indiqués sont <strong>des données indicatives</strong> sujettes
            à modification. La couverture varie selon votre quartier exact.
            Un conseiller Help&apos;me Process peut vérifier la disponibilité dans votre zone
            et vous accompagner gratuitement dans votre choix.
          </p>
        </div>
      </div>

      {/* CTA */}
      <section
        className="py-12"
        style={{ background: `linear-gradient(135deg, var(--color-primary-dark), var(--color-primary))` }}
      >
        <div className="container text-center">
          <p className="text-white font-extrabold text-xl mb-2">
            Besoin d'aide pour choisir votre connexion internet ?
          </p>
          <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.75)" }}>
            Un conseiller Help&apos;me Process vous accompagne gratuitement — analyse de votre zone,
            négociation avec les FAI, installation.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/fai/comparateur/"
              className="px-6 py-3 rounded-xl font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: "var(--color-secondary)" }}
            >
              Comparer maintenant
            </Link>
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "224628935335"}?text=${encodeURIComponent("Bonjour, je cherche le meilleur FAI internet en Guinée. Pouvez-vous m'aider ?")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl font-semibold text-white border border-white/30 hover:bg-white/10 transition-colors"
            >
              💬 Être conseillé
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
