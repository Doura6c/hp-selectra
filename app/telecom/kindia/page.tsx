import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, MapPin, MessageCircle } from "lucide-react"
import { PROVIDERS, OFFERS } from "@/lib/data/seed-data"
import OfferCard from "@/components/compare/OfferCard"
import ReviewsSection from "@/components/ui/ReviewsSection"
import { buildJsonLd, faqSchema, breadcrumbSchema } from "@/lib/schema"

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "224628935335"
const BASE_URL  = "https://hp-selectra-app.vercel.app"

export const metadata: Metadata = {
  title: "Meilleur forfait mobile à Kindia 2026 — Comparatif opérateurs | HP Selectra",
  description:
    "Comparez les forfaits mobiles disponibles à Kindia : Orange Guinée, Telecel. Couverture réseau, meilleurs pass data et conseils gratuits.",
  keywords: ["forfait mobile Kindia", "opérateur Kindia", "réseau mobile Kindia Guinée"],
}

const TELECOM_PROVIDERS = PROVIDERS.filter((p) => p.verticalSlug === "telecom")
  .filter((p) => ["orange-guinee", "telecel-guinee"].includes(p.slug))
  .sort((a, b) => b.hpScoreNum - a.hpScoreNum)

const TOP_OFFERS = OFFERS.filter((o) =>
  o.verticalSlug === "telecom" &&
  ["orange-guinee", "telecel-guinee"].includes(o.providerSlug) &&
  o.category === "forfait-mobile"
).sort((a, b) => b.hpScoreNum - a.hpScoreNum).slice(0, 4)

const ZONES_KINDIA = [
  { zone: "Centre-ville Kindia", orange: "✅ 4G", telecel: "⚠️ 3G/4G", cellcom: "❌ Non disponible" },
  { zone: "Quartier Madina", orange: "✅ 4G", telecel: "⚠️ 3G", cellcom: "❌" },
  { zone: "Route Conakry–Kindia", orange: "✅ 4G", telecel: "⚠️ 3G", cellcom: "❌" },
  { zone: "Zones rurales Kindia", orange: "⚠️ 3G/4G", telecel: "❌", cellcom: "❌" },
]

export default function TelecomKindiaPage() {
  const jsonLdFaq = buildJsonLd(faqSchema([
    { question: "Quel opérateur mobile est disponible à Kindia ?", answer: "Orange Guinée est l'opérateur principal à Kindia avec une couverture 4G dans le centre-ville. Telecel (Vana) est présent avec un réseau 3G en expansion. Cellcom n'est pas disponible dans cette région." },
    { question: "Y a-t-il internet mobile à Kindia ?", answer: "Oui, Orange Guinée propose la 4G dans le centre-ville de Kindia. Le débit varie de 5 à 20 Mbps selon votre position. Telecel offre principalement la 3G à Kindia avec des débits plus modestes." },
    { question: "Comment passer d'un opérateur à un autre à Kindia ?", answer: "Rendez-vous dans une agence Orange ou un revendeur Telecel agréé à Kindia centre. Apportez votre pièce d'identité. La portabilité est en cours de déploiement par l'ARPT." },
  ]))
  const jsonLdBreadcrumb = buildJsonLd(breadcrumbSchema([
    { name: "Accueil", href: "/" },
    { name: "Télécom", href: "/telecom/" },
    { name: "Kindia" },
  ]))

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdFaq }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdBreadcrumb }} />

      {/* Hero */}
      <section className="py-12 sm:py-16" style={{ background: "linear-gradient(135deg, #1D3461 0%, #c04000 100%)" }}>
        <div className="container max-w-3xl">
          <nav className="flex items-center gap-1.5 text-xs mb-5" style={{ color: "rgba(255,255,255,0.5)" }}>
            <Link href="/" className="hover:text-white">Accueil</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/telecom/" className="hover:text-white">Télécom</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">Kindia</span>
          </nav>
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-5 h-5 text-white/70" />
            <span className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.7)" }}>Kindia, Guinée — Région de Kindia</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3 leading-tight">
            Meilleur forfait mobile à Kindia {new Date().getFullYear()}
          </h1>
          <p className="text-base mb-6" style={{ color: "rgba(255,255,255,0.75)" }}>
            Couverture réseau, offres disponibles et conseils pour choisir votre opérateur à Kindia et dans la région.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/telecom/comparateur" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white" style={{ backgroundColor: "#FF6600" }}>
              Comparateur complet →
            </Link>
            <a href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Bonjour, je cherche le meilleur forfait mobile à Kindia.")}`}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white border border-white/30">
              <MessageCircle className="w-4 h-4" /> Conseil gratuit
            </a>
          </div>
        </div>
      </section>

      <div className="container py-12 max-w-4xl mx-auto">

        {/* Info ville */}
        <div className="flex items-start gap-4 p-5 rounded-2xl border mb-10" style={{ backgroundColor: "var(--color-primary-light)", borderColor: "var(--color-primary)" }}>
          <span className="text-2xl shrink-0">🏙️</span>
          <div>
            <p className="font-extrabold text-sm mb-1" style={{ color: "var(--color-primary)" }}>Kindia : 2e ville de Guinée, axe stratégique Conakry–Mamou</p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--color-text)" }}>
              Kindia (environ 380 000 habitants) est couvert à 4G par <strong>Orange Guinée</strong> dans le centre-ville et sur l&apos;axe routier principal.
              Telecel est en cours d&apos;expansion. Cellcom n&apos;est pas encore disponible dans la région.
            </p>
          </div>
        </div>

        {/* Couverture zones */}
        <section className="mb-12">
          <h2 className="text-xl font-extrabold mb-4" style={{ color: "var(--color-text)" }}>📶 Couverture réseau à Kindia et environs</h2>
          <div className="rounded-2xl border overflow-hidden" style={{ borderColor: "var(--color-border)" }}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[460px]">
                <thead>
                  <tr style={{ backgroundColor: "var(--color-surface)" }}>
                    {["Zone", "Orange Guinée", "Telecel (Vana)", "Cellcom"].map(h => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--color-muted)" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ZONES_KINDIA.map((z, i) => (
                    <tr key={z.zone} style={{ backgroundColor: i % 2 === 0 ? "var(--color-card)" : "var(--color-surface)", borderTop: "1px solid var(--color-border)" }}>
                      <td className="px-4 py-3 font-semibold text-sm" style={{ color: "var(--color-text)" }}>{z.zone}</td>
                      <td className="px-4 py-3 text-sm" style={{ color: z.orange.includes("✅") ? "#6B8F3C" : "var(--color-muted)" }}>{z.orange}</td>
                      <td className="px-4 py-3 text-sm" style={{ color: z.telecel.includes("✅") ? "#6B8F3C" : "var(--color-muted)" }}>{z.telecel}</td>
                      <td className="px-4 py-3 text-sm" style={{ color: "var(--color-muted)" }}>{z.cellcom}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="text-xs mt-2" style={{ color: "var(--color-muted)" }}>⚠️ Données indicatives — couverture réelle à vérifier auprès de l&apos;opérateur selon votre adresse exacte.</p>
        </section>

        {/* Opérateurs recommandés */}
        <section className="mb-12">
          <h2 className="text-xl font-extrabold mb-4" style={{ color: "var(--color-text)" }}>🏆 Opérateurs disponibles à Kindia</h2>
          <div className="space-y-3">
            {TELECOM_PROVIDERS.map((op, i) => (
              <Link key={op.slug} href={`/telecom/fournisseurs/${op.slug}/`}
                className="flex items-center gap-4 p-4 rounded-2xl border transition-all hover:shadow-md"
                style={{ backgroundColor: "var(--color-card)", borderColor: i === 0 ? "#FF6600" : "var(--color-border)" }}>
                <span className="text-lg font-extrabold w-6 text-center" style={{ color: i === 0 ? "#F0A500" : "var(--color-muted)" }}>#{i + 1}</span>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-xs font-extrabold shrink-0"
                  style={{ backgroundColor: op.brandColor ?? "var(--color-primary)" }}>
                  {op.name.slice(0, 2).toUpperCase()}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-sm" style={{ color: "var(--color-text)" }}>{op.name}</p>
                  <p className="text-xs" style={{ color: "var(--color-muted)" }}>Couverture à Kindia : {i === 0 ? "4G centre-ville + axe routier" : "3G/4G en expansion"}</p>
                </div>
                <span className="w-8 h-8 flex items-center justify-center rounded-full text-white font-extrabold text-sm shrink-0"
                  style={{ backgroundColor: op.hpScore === "A" ? "#6B8F3C" : "#8FB84E" }}>
                  {op.hpScore}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Offres */}
        <section className="mb-12">
          <h2 className="text-xl font-extrabold mb-4" style={{ color: "var(--color-text)" }}>📱 Offres recommandées pour Kindia</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {TOP_OFFERS.map((offer) => {
              const provider = PROVIDERS.find((p) => p.slug === offer.providerSlug)!
              return <OfferCard key={offer.slug} offer={offer} provider={provider} verticalSlug="telecom" />
            })}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="text-xl font-extrabold mb-5" style={{ color: "var(--color-text)" }}>❓ FAQ — Télécom à Kindia</h2>
          <div className="space-y-3">
            {[
              { q: "Quel opérateur mobile est disponible à Kindia ?", a: "Orange Guinée est l'opérateur principal à Kindia avec une couverture 4G dans le centre-ville. Telecel est présent avec un réseau 3G en expansion. Cellcom n'est pas disponible dans cette région." },
              { q: "Y a-t-il internet mobile à Kindia ?", a: "Oui, Orange Guinée propose la 4G dans le centre-ville de Kindia. Le débit varie de 5 à 20 Mbps selon votre position. Telecel offre principalement la 3G avec des débits plus modestes." },
            ].map(({ q, a }) => (
              <details key={q} className="rounded-2xl border overflow-hidden" style={{ borderColor: "var(--color-border)" }}>
                <summary className="flex items-center justify-between px-5 py-4 cursor-pointer list-none font-semibold text-sm" style={{ backgroundColor: "var(--color-card)", color: "var(--color-text)" }}>
                  {q}
                  <span className="ml-3 shrink-0 font-bold text-xl" style={{ color: "var(--color-primary)" }}>+</span>
                </summary>
                <div className="px-5 py-4 text-sm leading-relaxed" style={{ backgroundColor: "var(--color-surface)", color: "var(--color-muted)" }}>{a}</div>
              </details>
            ))}
          </div>
        </section>

        {/* Autres villes */}
        <div className="p-5 rounded-2xl border" style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}>
          <p className="text-sm font-bold mb-3" style={{ color: "var(--color-text)" }}>📍 Autres villes</p>
          <div className="flex flex-wrap gap-2">
            {[
              { city: "Conakry", href: "/telecom/conakry" },
              { city: "Toutes les offres", href: "/telecom/comparateur" },
            ].map((c) => (
              <Link key={c.city} href={c.href}
                className="text-xs font-semibold px-3 py-1.5 rounded-xl border"
                style={{ borderColor: "var(--color-border)", color: "var(--color-text)", backgroundColor: "var(--color-surface)" }}>
                {c.city} →
              </Link>
            ))}
          </div>
        </div>
      </div>

      <ReviewsSection />
    </>
  )
}
