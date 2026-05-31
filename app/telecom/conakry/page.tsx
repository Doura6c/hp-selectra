import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, MapPin, Phone, MessageCircle } from "lucide-react"
import { PROVIDERS, OFFERS } from "@/lib/data/seed-data"
import OfferCard from "@/components/compare/OfferCard"
import ReviewsSection from "@/components/ui/ReviewsSection"
import { buildJsonLd, faqSchema, breadcrumbSchema } from "@/lib/schema"

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "224628935335"
const CC_PHONE  = process.env.NEXT_PUBLIC_CC_PHONE        ?? "224628935335"
const BASE_URL  = "https://hpshop-afrique.vercel.app"

export const metadata: Metadata = {
  title: "Meilleur forfait mobile à Conakry 2026 — Comparatif opérateurs | HP Selectra",
  description:
    "Comparez les forfaits mobiles disponibles à Conakry : Orange Guinée, Telecel, Cellcom. Couverture 4G, prix, pass data. Conseiller gratuit disponible.",
  keywords: ["forfait mobile Conakry", "opérateur télécom Conakry", "meilleur réseau Conakry", "Orange Guinée Conakry"],
}

const TELECOM_PROVIDERS = PROVIDERS.filter((p) => p.verticalSlug === "telecom")
  .sort((a, b) => b.hpScoreNum - a.hpScoreNum)

const TOP_OFFERS = OFFERS.filter((o) => o.verticalSlug === "telecom" && o.category === "forfait-mobile")
  .sort((a, b) => b.hpScoreNum - a.hpScoreNum)
  .slice(0, 4)

const QUARTIERS = [
  { name: "Kaloum (Centre)", orange: "✅ 4G", telecel: "✅ 4G", cellcom: "✅ 4G" },
  { name: "Ratoma", orange: "✅ 4G", telecel: "✅ 4G", cellcom: "⚠️ 3G" },
  { name: "Matam", orange: "✅ 4G", telecel: "⚠️ 3G/4G", cellcom: "⚠️ 3G" },
  { name: "Dixinn", orange: "✅ 4G", telecel: "✅ 4G", cellcom: "⚠️ 3G" },
  { name: "Matoto", orange: "✅ 4G", telecel: "⚠️ 3G", cellcom: "❌ Limité" },
  { name: "Coyah (périphérie)", orange: "✅ 4G", telecel: "⚠️ 3G", cellcom: "❌ Non couvert" },
]

export default function TelecomConakryPage() {
  const jsonLdFaq = buildJsonLd(faqSchema([
    { question: "Quel est le meilleur opérateur mobile à Conakry ?", answer: "Orange Guinée offre la meilleure couverture 4G dans tous les quartiers de Conakry, de Kaloum à Matoto. Telecel (Vana) est très compétitif dans les communes de Ratoma et Dixinn. Cellcom est présent principalement dans le centre-ville." },
    { question: "Y a-t-il la 4G à Conakry ?", answer: "Oui, la 4G est disponible dans toute la commune de Conakry avec Orange Guinée et Telecel. La couverture 4G s'étend progressivement vers la périphérie (Coyah, Dubréka). Orange dispose du réseau 4G le plus étendu." },
    { question: "Où acheter une carte SIM à Conakry ?", answer: "Les cartes SIM sont disponibles dans les agences officielles des opérateurs (avenue de la République, Kaloum), chez les revendeurs agréés dans tous les quartiers, et dans les supermarchés. Présentez votre pièce d'identité." },
  ]))
  const jsonLdBreadcrumb = buildJsonLd(breadcrumbSchema([
    { name: "Accueil", href: "/" },
    { name: "Télécom", href: "/telecom/" },
    { name: "Conakry" },
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
            <span className="text-white">Conakry</span>
          </nav>
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-5 h-5 text-white/70" />
            <span className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.7)" }}>Conakry, Guinée</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3 leading-tight">
            Meilleur forfait mobile à Conakry {new Date().getFullYear()}
          </h1>
          <p className="text-base mb-6" style={{ color: "rgba(255,255,255,0.75)" }}>
            Comparatif des opérateurs disponibles à Conakry. Couverture 4G par quartier, meilleurs pass data et conseils personnalisés.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/telecom/comparateur" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white" style={{ backgroundColor: "#FF6600" }}>
              Comparateur télécom →
            </Link>
            <a href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Bonjour, je cherche le meilleur forfait mobile à Conakry.")}`}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white border border-white/30">
              <MessageCircle className="w-4 h-4" /> Conseil gratuit
            </a>
          </div>
        </div>
      </section>

      <div className="container py-12 max-w-4xl mx-auto">

        {/* Verdict ville */}
        <div className="flex items-start gap-4 p-5 rounded-2xl border mb-10" style={{ backgroundColor: "#fff3e0", borderColor: "#FF6600" }}>
          <span className="text-2xl shrink-0">🏙️</span>
          <div>
            <p className="font-extrabold text-sm mb-1" style={{ color: "#c04000" }}>Conakry : capitale avec la meilleure couverture 4G de Guinée</p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--color-text)" }}>
              Conakry bénéficie d&apos;une couverture 4G quasi-totale. <strong>Orange Guinée</strong> couvre l&apos;ensemble des communes — de Kaloum à Matoto.
              <strong> Telecel</strong> est très performant dans Ratoma et Dixinn. Pour les petits budgets dans le centre, <strong>Cellcom</strong> reste une option viable.
            </p>
          </div>
        </div>

        {/* Couverture par quartier */}
        <section className="mb-12">
          <h2 className="text-xl font-extrabold mb-4" style={{ color: "var(--color-text)" }}>📶 Couverture réseau par quartier de Conakry</h2>
          <div className="rounded-2xl border overflow-hidden" style={{ borderColor: "var(--color-border)" }}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[480px]">
                <thead>
                  <tr style={{ backgroundColor: "var(--color-surface)" }}>
                    {["Quartier / Commune", "Orange Guinée", "Telecel (Vana)", "Cellcom"].map(h => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--color-muted)" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {QUARTIERS.map((q, i) => (
                    <tr key={q.name} style={{ backgroundColor: i % 2 === 0 ? "var(--color-card)" : "var(--color-surface)", borderTop: "1px solid var(--color-border)" }}>
                      <td className="px-4 py-3 font-semibold text-sm" style={{ color: "var(--color-text)" }}>{q.name}</td>
                      <td className="px-4 py-3 text-sm" style={{ color: q.orange.includes("✅") ? "#6B8F3C" : "var(--color-muted)" }}>{q.orange}</td>
                      <td className="px-4 py-3 text-sm" style={{ color: q.telecel.includes("✅") ? "#6B8F3C" : "var(--color-muted)" }}>{q.telecel}</td>
                      <td className="px-4 py-3 text-sm" style={{ color: q.cellcom.includes("✅") ? "#6B8F3C" : "var(--color-muted)" }}>{q.cellcom}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="text-xs mt-2" style={{ color: "var(--color-muted)" }}>⚠️ Données indicatives. La couverture peut varier selon votre position exacte. Vérifiez auprès de l&apos;opérateur.</p>
        </section>

        {/* Classement opérateurs */}
        <section className="mb-12">
          <h2 className="text-xl font-extrabold mb-4" style={{ color: "var(--color-text)" }}>🏆 Classement HP Score — Conakry</h2>
          <div className="space-y-3">
            {TELECOM_PROVIDERS.map((op, i) => (
              <Link key={op.slug} href={`/telecom/fournisseurs/${op.slug}/`}
                className="flex items-center gap-4 p-4 rounded-2xl border transition-all hover:shadow-md hover:-translate-y-0.5"
                style={{ backgroundColor: "var(--color-card)", borderColor: i === 0 ? "#FF6600" : "var(--color-border)" }}>
                <span className="text-lg font-extrabold w-6 text-center" style={{ color: i === 0 ? "#F0A500" : "var(--color-muted)" }}>#{i + 1}</span>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-xs font-extrabold shrink-0"
                  style={{ backgroundColor: op.brandColor ?? "var(--color-primary)" }}>
                  {op.name.slice(0, 2).toUpperCase()}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-sm" style={{ color: "var(--color-text)" }}>{op.name}</p>
                  <p className="text-xs" style={{ color: "var(--color-muted)" }}>{op.description?.slice(0, 80)}…</p>
                </div>
                <span className="w-8 h-8 flex items-center justify-center rounded-full text-white font-extrabold text-sm shrink-0"
                  style={{ backgroundColor: op.hpScore === "A" ? "#6B8F3C" : op.hpScore === "B" ? "#8FB84E" : "#F0A500" }}>
                  {op.hpScore}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Meilleures offres */}
        <section className="mb-12">
          <h2 className="text-xl font-extrabold mb-2" style={{ color: "var(--color-text)" }}>📱 Meilleures offres disponibles à Conakry</h2>
          <p className="text-sm mb-5" style={{ color: "var(--color-muted)" }}>Offres recommandées par nos experts pour la zone de Conakry.</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {TOP_OFFERS.map((offer) => {
              const provider = PROVIDERS.find((p) => p.slug === offer.providerSlug)!
              return <OfferCard key={offer.slug} offer={offer} provider={provider} verticalSlug="telecom" />
            })}
          </div>
          <p className="text-xs mt-3" style={{ color: "var(--color-muted)" }}>⚠️ Tarifs indicatifs à vérifier auprès de l&apos;opérateur.</p>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="text-xl font-extrabold mb-5" style={{ color: "var(--color-text)" }}>❓ FAQ — Télécom à Conakry</h2>
          <div className="space-y-3">
            {[
              { q: "Quel est le meilleur opérateur mobile à Conakry ?", a: "Orange Guinée offre la meilleure couverture 4G dans tous les quartiers de Conakry. Telecel est très compétitif dans Ratoma et Dixinn. Cellcom est présent principalement dans le centre-ville." },
              { q: "Y a-t-il la 4G à Conakry ?", a: "Oui, la 4G est disponible dans toute la commune de Conakry avec Orange Guinée et Telecel. La couverture s'étend vers la périphérie (Coyah, Dubréka). Orange dispose du réseau le plus étendu." },
              { q: "Où acheter une carte SIM à Conakry ?", a: "Dans les agences officielles (avenue de la République, Kaloum), chez les revendeurs agréés dans tous les quartiers, et en supermarchés. Présentez votre pièce d'identité nationale." },
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
          <p className="text-sm font-bold mb-3" style={{ color: "var(--color-text)" }}>📍 Autres villes de Guinée</p>
          <div className="flex flex-wrap gap-2">
            {[
              { city: "Kindia", href: "/telecom/kindia" },
              { city: "Labé", href: "/telecom/comparateur" },
              { city: "Kankan", href: "/telecom/comparateur" },
              { city: "Toutes les villes", href: "/telecom/comparateur" },
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
