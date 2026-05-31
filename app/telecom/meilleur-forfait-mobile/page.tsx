import type { Metadata } from "next"
import Link from "next/link"
import { OFFERS, PROVIDERS } from "@/lib/data/seed-data"
import OfferCard from "@/components/compare/OfferCard"
import ReviewsSection from "@/components/ui/ReviewsSection"
import { buildJsonLd, howToSchema, faqSchema, breadcrumbSchema } from "@/lib/schema"
import { ChevronRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Meilleur forfait mobile en Guinée 2026 — Comparatif opérateurs",
  description:
    "Quel est le meilleur forfait mobile en Guinée en 2026 ? Comparatif Orange Guinée, Telecel, Cellcom selon le HP Score indépendant. Data, appels, couverture 4G.",
  alternates: { canonical: "https://hp-selectra-app.vercel.app/telecom/meilleur-forfait-mobile/" },
}

const OPERATEURS = PROVIDERS.filter((p) => p.verticalSlug === "telecom")
  .sort((a, b) => b.hpScoreNum - a.hpScoreNum)

const FORFAIT_OFFERS = OFFERS.filter(
  (o) => o.verticalSlug === "telecom" && o.category === "forfait-mobile"
).sort((a, b) => b.hpScoreNum - a.hpScoreNum)

const PROFILS = [
  { icon: "📱", title: "Grand consommateur de data", op: "Orange Guinée", raison: "Réseau 4G le plus étendu avec les plus gros bundles data. Idéal pour le streaming et les réseaux sociaux." },
  { icon: "💬", title: "Appels & SMS fréquents", op: "Telecel Guinée", raison: "Forfaits avec plus d'appels locaux inclus et offres nuit avantageuses pour les communications longues." },
  { icon: "💰", title: "Petit budget", op: "Cellcom Guinée", raison: "Les forfaits les plus accessibles en entrée de gamme pour les zones urbaines (Conakry)." },
  { icon: "🌍", title: "Appels internationaux", op: "Orange Guinée", raison: "Meilleures offres d'appels vers la diaspora guinéenne. Réseau international roaming le plus large." },
]

const STEPS = [
  { n: "01", title: "Évaluer votre consommation", desc: "Estimez votre usage mensuel en data (Go), appels (minutes) et SMS. Comparez avec vos 3 dernières factures si possible." },
  { n: "02", title: "Vérifier la couverture dans votre zone", desc: "Orange Guinée couvre le mieux les zones rurales. Telecel et Cellcom sont surtout optimisés pour Conakry et les grandes villes." },
  { n: "03", title: "Comparer les offres HP Score", desc: "Utilisez notre comparateur pour analyser le rapport data/prix, les appels inclus et les conditions de renouvellement." },
  { n: "04", title: "Attention aux frais cachés", desc: "Vérifiez les frais de recharge, les taxes sur les SMS et les conditions d'expiration des crédits non consommés." },
  { n: "05", title: "Souscrire en agence ou en ligne", desc: "Apportez votre CNI pour la SIM. Certains forfaits s'activent instantanément par USSD depuis votre téléphone." },
]

export default function MeilleurForfaitMobilePage() {
  const jsonLdBreadcrumb = buildJsonLd(breadcrumbSchema([
    { name: "Accueil", href: "/" },
    { name: "Internet & Mobile", href: "/telecom/" },
    { name: "Meilleur forfait mobile", href: "/telecom/meilleur-forfait-mobile/" },
  ]))

  const jsonLdHowTo = buildJsonLd(howToSchema({
    name: "Comment choisir le meilleur forfait mobile en Guinée",
    description: "Guide pour sélectionner le meilleur opérateur et forfait mobile en Guinée selon votre profil.",
    url: "https://hp-selectra-app.vercel.app/telecom/meilleur-forfait-mobile/",
    steps: STEPS.map((s) => ({ name: s.title, text: s.desc })),
  }))

  const jsonLdFaq = buildJsonLd(faqSchema([
    { question: "Quel est le meilleur opérateur mobile en Guinée ?", answer: "Orange Guinée (HP Score A) est le leader incontesté avec la meilleure couverture 4G nationale et les plus gros forfaits data. Telecel est la meilleure alternative urbaine." },
    { question: "Quel réseau 4G est le plus rapide en Guinée ?", answer: "Orange Guinée dispose du réseau 4G le plus étendu et le plus rapide en Guinée, couvrant Conakry, les capitales régionales et de nombreuses zones rurales." },
    { question: "Combien coûte un forfait mobile en Guinée ?", answer: "Les forfaits mobiles en Guinée coûtent entre 30 000 GNF (1 Go/7 jours) et 300 000+ GNF par mois pour les gros bundles. Les offres prepayées sont les plus courantes." },
    { question: "Quelle est la différence entre forfait prépayé et postpayé en Guinée ?", answer: "En Guinée, les forfaits prépayés (recharge) dominent largement le marché. Les forfaits postpayés (abonnement mensuel) sont réservés aux entreprises et aux salariés. La plupart des particuliers utilisent des formules prépayées." },
    { question: "Comment transférer son numéro vers un autre opérateur en Guinée ?", answer: "La portabilité des numéros n'est pas encore pleinement déployée en Guinée. Il est généralement nécessaire de garder son numéro ou d'en acquérir un nouveau lors d'un changement d'opérateur." },
  ]))

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdBreadcrumb }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdHowTo }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdFaq }} />

      {/* Hero */}
      <section className="relative overflow-hidden py-14 sm:py-20"
        style={{ background: "linear-gradient(135deg, #CC4400 0%, #FF6600 100%)" }}>
        <div className="absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage: "repeating-linear-gradient(45deg,#fff 0,#fff 1px,transparent 0,transparent 50%)", backgroundSize: "24px 24px" }} />
        <div className="container relative">
          <nav className="flex items-center gap-1.5 text-xs mb-6" style={{ color: "rgba(255,255,255,0.5)" }}>
            <Link href="/" className="hover:text-white">Accueil</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/telecom/" className="hover:text-white">Internet & Mobile</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">Meilleur forfait mobile</span>
          </nav>
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold mb-5"
                style={{ backgroundColor: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.9)" }}>
                📱 Mis à jour {new Date().toLocaleDateString("fr-GN", { month: "long", year: "numeric" })}
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-4 leading-tight">
                Meilleur forfait mobile<br />en Guinée {new Date().getFullYear()}
              </h1>
              <p className="text-base mb-6" style={{ color: "rgba(255,255,255,0.75)" }}>
                Comparatif indépendant de {OPERATEURS.length} opérateurs guinéens selon le HP Score.
                Data, appels, couverture 4G — tout comparé objectivement.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/telecom/comparateur/"
                  className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-90"
                  style={{ backgroundColor: "#CC4400" }}>
                  📊 Comparateur forfaits
                </Link>
                <Link href="/telecom/guides/meilleur-forfait-mobile/"
                  className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white border border-white/30 hover:bg-white/10">
                  📖 Guide complet
                </Link>
              </div>
            </div>
            {/* Classement */}
            <div className="rounded-2xl overflow-hidden shadow-2xl hidden lg:block"
              style={{ backgroundColor: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)" }}>
              <div className="px-5 py-3.5 border-b" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
                <p className="text-xs font-bold text-white">🏆 Classement HP Score · Télécom Guinée</p>
              </div>
              {OPERATEURS.map((p, i) => (
                <div key={p.slug} className="flex items-center gap-4 px-5 py-3.5 border-b last:border-b-0"
                  style={{ borderColor: "rgba(255,255,255,0.07)", backgroundColor: i === 0 ? "rgba(255,102,0,0.25)" : "transparent" }}>
                  <span className="text-xs font-extrabold w-5 text-center"
                    style={{ color: i === 0 ? "#F0A500" : "rgba(255,255,255,0.4)" }}>#{i + 1}</span>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-bold text-white shrink-0"
                    style={{ backgroundColor: p.brandColor ?? "#FF6600" }}>
                    {p.name.slice(0, 2).toUpperCase()}
                  </div>
                  <p className="flex-1 text-sm font-semibold text-white truncate">{p.name}</p>
                  <span className="text-xs font-extrabold px-2 py-1 rounded-full text-white"
                    style={{ backgroundColor: p.hpScore === "A" ? "#6B8F3C" : p.hpScore === "B" ? "#8FB84E" : "#F0A500" }}>
                    {p.hpScore}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Ancres */}
      <div className="sticky top-0 z-30 border-b overflow-x-auto"
        style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}>
        <div className="container">
          <div className="flex items-center min-w-max">
            {[
              { label: "🏆 Notre sélection", href: "#selection" },
              { label: "📱 Forfaits mobiles", href: "#offres" },
              { label: "👤 Par profil", href: "#profils" },
              { label: "📋 Comment choisir", href: "#comment" },
              { label: "❓ FAQ", href: "#faq" },
            ].map((a) => (
              <a key={a.href} href={a.href}
                className="text-xs font-semibold px-4 py-4 border-b-2 border-transparent hover:border-[#FF6600] transition-colors whitespace-nowrap"
                style={{ color: "var(--color-text)" }}>
                {a.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="container py-12" style={{ maxWidth: "1000px", marginInline: "auto" }}>

        {/* Verdict */}
        <section id="selection" className="mb-12">
          <div className="flex items-start gap-4 p-6 rounded-2xl border"
            style={{ backgroundColor: "#fff7f0", borderColor: "#FF6600" }}>
            <span className="text-3xl shrink-0">📱</span>
            <div>
              <p className="font-extrabold text-base mb-1" style={{ color: "#CC4400" }}>
                Notre sélection HP Selectra — Meilleur forfait mobile Guinée {new Date().getFullYear()}
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "var(--color-text)" }}>
                <strong>Orange Guinée</strong> (HP Score A) reste l&apos;opérateur de référence avec le réseau 4G
                le plus étendu du pays, les plus gros bundles data et la meilleure couverture rurale.
                <strong> Telecel Guinée</strong> (B) est la meilleure alternative avec des offres nuit
                avantageuses et des bonus fréquents. <strong>Cellcom</strong> est le choix économique pour
                les petits budgets en zone urbaine.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {[
                  { name: "Orange Guinée", score: "A", color: "#FF6600" },
                  { name: "Telecel Guinée", score: "B", color: "#E30613" },
                  { name: "Cellcom Guinée", score: "C", color: "#0070C0" },
                ].map((b) => (
                  <span key={b.name} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white"
                    style={{ backgroundColor: b.color }}>
                    {b.name} · {b.score}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Offres forfaits */}
        <section id="offres" className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-2" style={{ color: "var(--color-text)" }}>
            📱 Meilleurs forfaits mobiles en Guinée
          </h2>
          <p className="text-sm mb-6" style={{ color: "var(--color-muted)" }}>
            Classés par HP Score — {FORFAIT_OFFERS.length} forfaits analysés.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {FORFAIT_OFFERS.map((offer) => {
              const provider = OPERATEURS.find((p) => p.slug === offer.providerSlug)
              if (!provider) return null
              return <OfferCard key={offer.slug} offer={offer} provider={provider} verticalSlug="telecom" />
            })}
          </div>
          <div className="mt-4 text-center">
            <Link href="/telecom/comparateur/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white"
              style={{ backgroundColor: "#FF6600" }}>
              Voir tous les forfaits mobiles →
            </Link>
          </div>
        </section>

        {/* Par profil */}
        <section id="profils" className="mb-16">
          <h2 className="text-2xl font-extrabold mb-3" style={{ color: "var(--color-text)" }}>
            👤 Quel opérateur selon votre profil ?
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {PROFILS.map((p) => {
              const provider = OPERATEURS.find((pv) => pv.name.includes(p.op.split(" ")[0]))
              return (
                <div key={p.title} className="p-5 rounded-2xl border"
                  style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}>
                  <span className="text-2xl mb-2 block">{p.icon}</span>
                  <p className="font-bold text-sm mb-1" style={{ color: "var(--color-text)" }}>{p.title}</p>
                  <p className="text-xs mb-3 leading-relaxed" style={{ color: "var(--color-muted)" }}>{p.raison}</p>
                  {provider && (
                    <Link href={`/telecom/fournisseurs/${provider.slug}/`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg text-white"
                      style={{ backgroundColor: provider.brandColor ?? "#FF6600" }}>
                      {provider.name} →
                    </Link>
                  )}
                </div>
              )
            })}
          </div>
        </section>

        {/* Comment choisir */}
        <section id="comment" className="mb-16">
          <h2 className="text-2xl font-extrabold mb-3" style={{ color: "var(--color-text)" }}>
            📋 Comment choisir son forfait mobile en Guinée ?
          </h2>
          <div className="space-y-4">
            {STEPS.map((step) => (
              <div key={step.n} className="flex items-start gap-5 p-5 rounded-2xl border"
                style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-extrabold text-white shrink-0"
                  style={{ backgroundColor: "#FF6600" }}>
                  {step.n}
                </div>
                <div>
                  <p className="font-bold text-sm mb-1" style={{ color: "var(--color-text)" }}>{step.title}</p>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--color-muted)" }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <Link href="/telecom/guides/meilleur-forfait-mobile/"
              className="inline-flex items-center gap-2 text-sm font-semibold"
              style={{ color: "#FF6600" }}>
              📖 Guide complet : choisir son forfait mobile en Guinée →
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mb-16">
          <h2 className="text-2xl font-extrabold mb-6" style={{ color: "var(--color-text)" }}>
            ❓ Questions fréquentes sur les forfaits mobiles en Guinée
          </h2>
          <div className="space-y-3">
            {[
              { q: "Quel est le meilleur opérateur mobile en Guinée ?", a: "Orange Guinée (HP Score A) est le leader avec la meilleure couverture 4G nationale. Telecel est la meilleure alternative urbaine avec des bonus fréquents." },
              { q: "Quel réseau 4G est le plus rapide en Guinée ?", a: "Orange Guinée dispose du réseau 4G le plus étendu et le plus rapide, couvrant Conakry, les capitales régionales et de nombreuses zones rurales." },
              { q: "Combien coûte un forfait mobile en Guinée ?", a: "Les forfaits vont de 30 000 GNF (1 Go/7 jours) à 300 000+ GNF/mois pour les gros bundles data. Les offres prépayées dominent largement le marché." },
              { q: "Quelle est la différence entre prépayé et postpayé en Guinée ?", a: "Les forfaits prépayés (recharge) dominent le marché guinéen. Les abonnements postpayés sont réservés aux entreprises et aux salariés avec justificatifs." },
              { q: "Comment avoir plus de données sur son forfait ?", a: "Tous les opérateurs proposent des extensions data à la demande via USSD ou application mobile. Orange et Telecel offrent aussi des bonus de nuit pour multiplier votre data." },
            ].map(({ q, a }) => (
              <details key={q} className="group rounded-2xl border overflow-hidden"
                style={{ borderColor: "var(--color-border)" }}>
                <summary className="flex items-center justify-between px-6 py-4 cursor-pointer list-none font-semibold text-sm"
                  style={{ backgroundColor: "var(--color-card)", color: "var(--color-text)" }}>
                  {q}
                  <span className="ml-3 shrink-0 font-bold text-xl" style={{ color: "#FF6600" }}>+</span>
                </summary>
                <div className="px-6 py-4 text-sm leading-relaxed"
                  style={{ backgroundColor: "var(--color-surface)", color: "var(--color-muted)" }}>
                  {a}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="rounded-2xl p-8 text-center"
          style={{ background: "linear-gradient(135deg, #CC4400 0%, #FF6600 100%)" }}>
          <p className="text-2xl font-extrabold text-white mb-2">Besoin d&apos;aide pour choisir ?</p>
          <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.75)" }}>
            Un conseiller Help&apos;me Process compare les forfaits selon votre profil — gratuitement.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "224628935335"}?text=${encodeURIComponent("Bonjour, je cherche le meilleur forfait mobile en Guinée.")}`}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white"
              style={{ backgroundColor: "#25D366" }}>
              💬 WhatsApp gratuit
            </a>
            <Link href="/telecom/comparateur/"
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white border border-white/30 hover:bg-white/10">
              📊 Comparateur forfaits
            </Link>
          </div>
        </div>

      </div>

      <ReviewsSection />
    </>
  )
}
