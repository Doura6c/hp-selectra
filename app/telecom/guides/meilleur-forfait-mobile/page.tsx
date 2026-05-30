import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Phone, MessageCircle } from "lucide-react"
import { PROVIDERS, OFFERS } from "@/lib/data/seed-data"
import OfferCard from "@/components/compare/OfferCard"
import ReviewsSection from "@/components/ui/ReviewsSection"
import SocialShare from "@/components/ui/SocialShare"
import TableOfContents from "@/components/ui/TableOfContents"
import { buildJsonLd, howToSchema, faqSchema, breadcrumbSchema } from "@/lib/schema"

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "224628935335"
const CC_PHONE  = process.env.NEXT_PUBLIC_CC_PHONE        ?? "224628935335"
const BASE_URL  = "https://hp-selectra-app.vercel.app"

export const metadata: Metadata = {
  title: "Comment choisir le meilleur forfait mobile en Guinée 2026 — Guide complet",
  description:
    "Guide étape par étape pour choisir votre forfait mobile en Guinée : Orange, Telecel, Cellcom. Comparez les pass data, la couverture et les prix selon votre budget.",
}

const TOP_OFFERS = OFFERS.filter((o) => o.verticalSlug === "telecom" && o.category === "forfait-mobile")
  .sort((a, b) => b.hpScoreNum - a.hpScoreNum)
  .slice(0, 3)

const TOC_ITEMS = [
  { id: "pourquoi-comparer", label: "Pourquoi comparer les forfaits ?" },
  { id: "etape-1", label: "1. Définir votre budget" },
  { id: "etape-2", label: "2. Évaluer votre usage data" },
  { id: "etape-3", label: "3. Vérifier la couverture réseau" },
  { id: "etape-4", label: "4. Comparer les opérateurs" },
  { id: "etape-5", label: "5. Choisir et activer votre forfait" },
  { id: "offres-phares", label: "Offres phares du moment" },
  { id: "faq", label: "Questions fréquentes" },
]

export default function GuideForaitMobilePage() {
  const jsonLdHowTo = buildJsonLd(howToSchema({
    name: "Comment choisir le meilleur forfait mobile en Guinée",
    description: "Guide complet pour comparer et choisir votre forfait mobile en Guinée selon votre budget et votre usage.",
    url: `${BASE_URL}/telecom/guides/meilleur-forfait-mobile`,
    totalTime: "PT10M",
    steps: [
      { name: "Définir votre budget mensuel", text: "Évaluez combien vous pouvez dépenser chaque mois pour votre forfait mobile. En Guinée, les forfaits vont de 15 000 GNF à plus de 100 000 GNF par mois.", url: `${BASE_URL}/telecom/guides/meilleur-forfait-mobile#etape-1` },
      { name: "Évaluer votre usage data", text: "Identifiez votre consommation mensuelle de data : réseaux sociaux, streaming, navigation. Un usage moyen nécessite au moins 3-5 Go par mois.", url: `${BASE_URL}/telecom/guides/meilleur-forfait-mobile#etape-2` },
      { name: "Vérifier la couverture réseau", text: "Consultez les cartes de couverture des opérateurs. Orange Guinée offre la meilleure couverture 4G nationale. Telecel est fort en zone urbaine.", url: `${BASE_URL}/telecom/guides/meilleur-forfait-mobile#etape-3` },
      { name: "Comparer les opérateurs guinéens", text: "Utilisez le HP Score pour comparer Orange Guinée, Telecel et Cellcom selon 10 critères : tarifs, couverture, qualité, service client.", url: `${BASE_URL}/telecom/comparateur` },
      { name: "Activer votre forfait", text: "Rendez-vous dans une agence ou composez le code USSD de votre opérateur pour activer votre forfait. Nos conseillers peuvent vous accompagner gratuitement.", url: `${BASE_URL}/contact` },
    ],
  }))

  const jsonLdFaq = buildJsonLd(faqSchema([
    { question: "Quel opérateur mobile est le meilleur en Guinée ?", answer: "Orange Guinée (HP Score A, 88/100) est le leader avec la meilleure couverture 4G nationale. Telecel Guinée est très compétitif sur les pass nuit et weekend. Cellcom offre les prix les plus bas à Conakry." },
    { question: "Combien coûte un forfait mobile en Guinée ?", answer: "Les forfaits mobiles en Guinée vont de 15 000 GNF (Cellcom, 500 Mo) à 150 000 GNF (Orange, 15 Go + illimités). La moyenne pour 3-5 Go est entre 25 000 et 60 000 GNF selon l'opérateur." },
    { question: "Comment activer un pass data en Guinée ?", answer: "Composez le code USSD de votre opérateur : *200# pour Orange Guinée, *440# pour Telecel, ou utilisez l'application officielle. Vous pouvez aussi acheter en agence ou chez un revendeur agréé." },
  ]))

  const jsonLdBreadcrumb = buildJsonLd(breadcrumbSchema([
    { name: "Accueil", href: "/" },
    { name: "Télécom", href: "/telecom/" },
    { name: "Guides", href: "/telecom/guides/" },
    { name: "Meilleur forfait mobile" },
  ]))

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdHowTo }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdFaq }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdBreadcrumb }} />

      {/* Hero */}
      <section
        className="py-12 sm:py-16"
        style={{ background: "linear-gradient(135deg, #1D3461 0%, #c04000 100%)" }}
      >
        <div className="container max-w-3xl">
          <nav className="flex items-center gap-1.5 text-xs mb-5" style={{ color: "rgba(255,255,255,0.5)" }}>
            <Link href="/" className="hover:text-white">Accueil</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/telecom/" className="hover:text-white">Télécom</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">Guide : Meilleur forfait mobile</span>
          </nav>
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold mb-4"
            style={{ backgroundColor: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.9)" }}
          >
            📘 Guide complet · Lecture : 8 min
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3 leading-tight">
            Comment choisir le meilleur forfait mobile en Guinée
          </h1>
          <p className="text-base mb-6" style={{ color: "rgba(255,255,255,0.75)" }}>
            Guide étape par étape pour comparer Orange Guinée, Telecel et Cellcom. Trouvez le forfait idéal selon votre budget, votre usage data et votre zone.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/telecom/comparateur"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white"
              style={{ backgroundColor: "var(--color-accent, #FF6600)" }}
            >
              Comparer maintenant →
            </Link>
            <a
              href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Bonjour, je cherche le meilleur forfait mobile en Guinée.")}`}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white border border-white/30"
            >
              <MessageCircle className="w-4 h-4" /> Conseil gratuit
            </a>
          </div>
        </div>
      </section>

      {/* Contenu + sidebar */}
      <div className="container py-12">
        <div className="grid lg:grid-cols-[1fr_280px] gap-10 items-start max-w-5xl mx-auto">

          {/* Contenu principal */}
          <article className="prose-guide">

            <section id="pourquoi-comparer" className="mb-10 scroll-mt-24">
              <h2 className="text-xl font-extrabold mb-3" style={{ color: "var(--color-text)" }}>
                Pourquoi comparer les forfaits mobiles en Guinée ?
              </h2>
              <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--color-text)" }}>
                Le marché mobile guinéen compte 3 opérateurs majeurs — Orange Guinée, Telecel (Vana) et Cellcom —
                avec des offres qui évoluent régulièrement. Les différences de prix peuvent atteindre <strong>40 %</strong>
                {" "}pour un volume data équivalent. Sans comparaison, vous risquez de payer trop cher ou de choisir
                un opérateur mal couvert dans votre zone.
              </p>
              <div
                className="p-4 rounded-xl text-sm"
                style={{ backgroundColor: "var(--color-primary-light)", borderLeft: "3px solid var(--color-primary)" }}
              >
                <strong>💡 Bon à savoir :</strong> Le HP Score compare les opérateurs sur 10 critères objectifs :
                tarifs, couverture, qualité réseau, offres data, service client, mobile money intégré et transparence.
              </div>
            </section>

            <section id="etape-1" className="mb-10 scroll-mt-24">
              <div
                className="flex items-center gap-3 mb-4 px-4 py-3 rounded-xl"
                style={{ backgroundColor: "var(--color-surface)" }}
              >
                <span
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-extrabold shrink-0"
                  style={{ backgroundColor: "var(--color-primary)" }}
                >1</span>
                <h2 className="text-lg font-extrabold" style={{ color: "var(--color-text)" }}>
                  Définir votre budget mensuel
                </h2>
              </div>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--color-text)" }}>
                Avant de comparer, fixez votre budget mensuel. En Guinée, les forfaits se répartissent en 3 gammes :
              </p>
              <div className="grid sm:grid-cols-3 gap-3 mb-4">
                {[
                  { range: "15 000 – 30 000 GNF", label: "Petit budget", desc: "500 Mo à 1 Go, appels limités. Idéal pour usage ponctuel." },
                  { range: "30 000 – 70 000 GNF", label: "Budget moyen", desc: "1 Go à 5 Go, appels illimités Orange. Le plus courant." },
                  { range: "70 000 – 150 000 GNF", label: "Usage intensif", desc: "5 Go à 15 Go, tout illimité. Télétravailleurs, streamers." },
                ].map((b) => (
                  <div
                    key={b.label}
                    className="p-4 rounded-xl border text-sm"
                    style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}
                  >
                    <p className="font-bold mb-1" style={{ color: "var(--color-primary)" }}>{b.label}</p>
                    <p className="font-semibold text-xs mb-1" style={{ color: "var(--color-muted)" }}>{b.range}</p>
                    <p style={{ color: "var(--color-text)" }}>{b.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="etape-2" className="mb-10 scroll-mt-24">
              <div
                className="flex items-center gap-3 mb-4 px-4 py-3 rounded-xl"
                style={{ backgroundColor: "var(--color-surface)" }}
              >
                <span
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-extrabold shrink-0"
                  style={{ backgroundColor: "var(--color-primary)" }}
                >2</span>
                <h2 className="text-lg font-extrabold" style={{ color: "var(--color-text)" }}>
                  Évaluer votre usage data mensuel
                </h2>
              </div>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--color-text)" }}>
                Estimez votre consommation mensuelle selon vos activités :
              </p>
              <div className="rounded-2xl border overflow-hidden mb-4" style={{ borderColor: "var(--color-border)" }}>
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ backgroundColor: "var(--color-surface)" }}>
                      <th className="text-left px-4 py-2 text-xs font-semibold" style={{ color: "var(--color-muted)" }}>Usage</th>
                      <th className="text-left px-4 py-2 text-xs font-semibold" style={{ color: "var(--color-muted)" }}>Conso / mois</th>
                      <th className="text-left px-4 py-2 text-xs font-semibold" style={{ color: "var(--color-muted)" }}>Forfait conseillé</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["WhatsApp + appels", "≈ 500 Mo", "500 Mo – 1 Go"],
                      ["Réseaux sociaux (Facebook, TikTok)", "≈ 2 Go", "3 – 5 Go"],
                      ["YouTube SD (30 min/jour)", "≈ 5 Go", "5 – 8 Go"],
                      ["Télétravail + visioconf", "≈ 10 Go", "10 – 15 Go"],
                    ].map(([u, c, f], i) => (
                      <tr key={u} style={{ backgroundColor: i % 2 === 0 ? "var(--color-card)" : "var(--color-surface)", borderTop: "1px solid var(--color-border)" }}>
                        <td className="px-4 py-2.5">{u}</td>
                        <td className="px-4 py-2.5 font-semibold" style={{ color: "var(--color-primary)" }}>{c}</td>
                        <td className="px-4 py-2.5 text-xs" style={{ color: "var(--color-muted)" }}>{f}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section id="etape-3" className="mb-10 scroll-mt-24">
              <div
                className="flex items-center gap-3 mb-4 px-4 py-3 rounded-xl"
                style={{ backgroundColor: "var(--color-surface)" }}
              >
                <span
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-extrabold shrink-0"
                  style={{ backgroundColor: "var(--color-primary)" }}
                >3</span>
                <h2 className="text-lg font-extrabold" style={{ color: "var(--color-text)" }}>
                  Vérifier la couverture réseau dans votre zone
                </h2>
              </div>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--color-text)" }}>
                La couverture est un critère décisif en Guinée. Même le meilleur forfait ne sert à rien si vous n&apos;avez pas de signal dans votre quartier ou votre ville.
              </p>
              <div className="grid sm:grid-cols-3 gap-3">
                {[
                  { op: "Orange Guinée", coverage: "🇬🇳 Nationale 4G", detail: "Conakry, Kindia, Labé, Kankan, N'Zérékoré et zones rurales", color: "#FF6600" },
                  { op: "Telecel (Vana)", coverage: "🏙️ Urbaine 4G", detail: "Principale couverture en zones urbaines, expansion en cours", color: "#E30613" },
                  { op: "Cellcom", coverage: "🏙️ Conakry", detail: "Couverture concentrée sur Conakry et ses environs proches", color: "#00A651" },
                ].map((op) => (
                  <div
                    key={op.op}
                    className="p-4 rounded-xl border text-sm"
                    style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold mb-2"
                      style={{ backgroundColor: op.color }}
                    >
                      {op.op.slice(0, 2).toUpperCase()}
                    </div>
                    <p className="font-bold mb-1" style={{ color: "var(--color-text)" }}>{op.op}</p>
                    <p className="font-semibold text-xs mb-1">{op.coverage}</p>
                    <p className="text-xs" style={{ color: "var(--color-muted)" }}>{op.detail}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="etape-4" className="mb-10 scroll-mt-24">
              <div
                className="flex items-center gap-3 mb-4 px-4 py-3 rounded-xl"
                style={{ backgroundColor: "var(--color-surface)" }}
              >
                <span
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-extrabold shrink-0"
                  style={{ backgroundColor: "var(--color-primary)" }}
                >4</span>
                <h2 className="text-lg font-extrabold" style={{ color: "var(--color-text)" }}>
                  Comparer les opérateurs avec le HP Score
                </h2>
              </div>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--color-text)" }}>
                Le HP Score est notre notation indépendante sur 100 points. Il évalue chaque opérateur sur ses tarifs, sa couverture, la qualité du réseau, ses offres data, son service client et sa transparence.
              </p>
              <div
                className="p-4 rounded-xl border mb-4 text-sm"
                style={{ backgroundColor: "#fff3e0", borderColor: "#FF6600" }}
              >
                <strong style={{ color: "#c04000" }}>🏆 Notre classement 2026 :</strong>
                <ol className="mt-2 space-y-1" style={{ color: "var(--color-text)" }}>
                  <li>1. <strong>Orange Guinée</strong> — HP Score A (88/100) — Meilleure couverture + mobile money</li>
                  <li>2. <strong>Telecel Guinée</strong> — HP Score B (76/100) — Meilleur pass nuit/weekend</li>
                  <li>3. <strong>Cellcom Guinée</strong> — HP Score C (60/100) — Prix les plus bas, zone Conakry</li>
                </ol>
              </div>
              <Link
                href="/telecom/comparateur"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-white"
                style={{ backgroundColor: "var(--color-primary)" }}
              >
                Voir le comparateur complet →
              </Link>
            </section>

            <section id="etape-5" className="mb-12 scroll-mt-24">
              <div
                className="flex items-center gap-3 mb-4 px-4 py-3 rounded-xl"
                style={{ backgroundColor: "var(--color-surface)" }}
              >
                <span
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-extrabold shrink-0"
                  style={{ backgroundColor: "#6B8F3C" }}
                >5</span>
                <h2 className="text-lg font-extrabold" style={{ color: "var(--color-text)" }}>
                  Activer votre forfait
                </h2>
              </div>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--color-text)" }}>
                Une fois votre choix fait, activez votre forfait via l&apos;une de ces méthodes :
              </p>
              <div className="space-y-3 mb-4">
                {[
                  { icon: "📱", method: "Code USSD", detail: "Composez le code de votre opérateur : *200# Orange, *440# Telecel, *343# Cellcom" },
                  { icon: "📲", method: "Application officielle", detail: "Téléchargez l'appli Orange Money, Telecel ou Cellcom sur votre smartphone" },
                  { icon: "🏪", method: "Point de vente agréé", detail: "Rendez-vous dans une agence ou chez un revendeur agréé muni d'une pièce d'identité" },
                ].map((m) => (
                  <div
                    key={m.method}
                    className="flex items-start gap-3 p-4 rounded-xl border text-sm"
                    style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}
                  >
                    <span className="text-xl shrink-0">{m.icon}</span>
                    <div>
                      <p className="font-bold mb-0.5" style={{ color: "var(--color-text)" }}>{m.method}</p>
                      <p style={{ color: "var(--color-muted)" }}>{m.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div
                className="flex items-center gap-3 p-4 rounded-xl"
                style={{ backgroundColor: "#e8f5e9", borderLeft: "3px solid #6B8F3C" }}
              >
                <span className="text-xl">💚</span>
                <p className="text-sm" style={{ color: "var(--color-text)" }}>
                  <strong>Besoin d&apos;aide ?</strong> Nos conseillers Help&apos;me Process vous accompagnent gratuitement pour activer votre forfait — appelez le{" "}
                  <a href={`tel:+${CC_PHONE}`} className="font-bold underline">+{CC_PHONE}</a> ou écrivez sur WhatsApp.
                </p>
              </div>
            </section>

            {/* Offres phares */}
            <section id="offres-phares" className="mb-12 scroll-mt-24">
              <h2 className="text-xl font-extrabold mb-2" style={{ color: "var(--color-text)" }}>
                📱 Offres phares du moment
              </h2>
              <p className="text-sm mb-5" style={{ color: "var(--color-muted)" }}>
                Sélectionnées par notre équipe selon le HP Score et le rapport qualité/prix.
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {TOP_OFFERS.map((offer) => {
                  const provider = PROVIDERS.find((p) => p.slug === offer.providerSlug)!
                  return <OfferCard key={offer.slug} offer={offer} provider={provider} verticalSlug="telecom" />
                })}
              </div>
              <p className="text-xs mt-3" style={{ color: "var(--color-muted)" }}>
                ⚠️ Tarifs indicatifs à titre d&apos;exemple — vérifiez auprès de l&apos;opérateur.
              </p>
            </section>

            {/* FAQ */}
            <section id="faq" className="mb-12 scroll-mt-24">
              <h2 className="text-xl font-extrabold mb-5" style={{ color: "var(--color-text)" }}>
                ❓ Questions fréquentes
              </h2>
              <div className="space-y-3">
                {[
                  { q: "Quel opérateur mobile est le meilleur en Guinée ?", a: "Orange Guinée (HP Score A, 88/100) est le leader avec la meilleure couverture 4G nationale. Telecel Guinée est très compétitif sur les pass nuit et weekend. Cellcom offre les prix les plus bas à Conakry." },
                  { q: "Combien coûte un forfait mobile en Guinée ?", a: "Les forfaits vont de 15 000 GNF (500 Mo Cellcom) à 150 000 GNF (15 Go Orange + illimités). La moyenne pour 3-5 Go est entre 25 000 et 60 000 GNF selon l'opérateur." },
                  { q: "Comment activer un pass data en Guinée ?", a: "Composez *200# pour Orange Guinée, *440# pour Telecel, ou utilisez l'application officielle. Vous pouvez aussi acheter en agence ou chez un revendeur agréé." },
                ].map(({ q, a }) => (
                  <details
                    key={q}
                    className="rounded-2xl border overflow-hidden"
                    style={{ borderColor: "var(--color-border)" }}
                  >
                    <summary
                      className="flex items-center justify-between px-5 py-4 cursor-pointer list-none font-semibold text-sm"
                      style={{ backgroundColor: "var(--color-card)", color: "var(--color-text)" }}
                    >
                      {q}
                      <span className="ml-3 shrink-0 font-bold text-xl" style={{ color: "var(--color-primary)" }}>+</span>
                    </summary>
                    <div className="px-5 py-4 text-sm leading-relaxed" style={{ backgroundColor: "var(--color-surface)", color: "var(--color-muted)" }}>
                      {a}
                    </div>
                  </details>
                ))}
              </div>
            </section>

            {/* CTA final */}
            <div
              className="rounded-2xl p-8 text-center"
              style={{ background: "linear-gradient(135deg, #1D3461 0%, #c04000 100%)" }}
            >
              <p className="text-xl font-extrabold text-white mb-2">Prêt à choisir votre forfait ?</p>
              <p className="text-sm mb-5" style={{ color: "rgba(255,255,255,0.75)" }}>
                Utilisez notre comparateur ou appelez un conseiller — c&apos;est gratuit.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link href="/telecom/comparateur"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white"
                  style={{ backgroundColor: "#FF6600" }}>
                  Comparateur télécom →
                </Link>
                <a href={`https://wa.me/${WA_NUMBER}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white"
                  style={{ backgroundColor: "#25D366" }}>
                  <MessageCircle className="w-4 h-4" /> WhatsApp gratuit
                </a>
                <a href={`tel:+${CC_PHONE}`}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white border border-white/30">
                  <Phone className="w-4 h-4" /> Appeler
                </a>
              </div>
            </div>

          </article>

          {/* Sidebar ToC sticky */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <TableOfContents items={TOC_ITEMS} />
              <div
                className="mt-4 p-4 rounded-2xl border text-sm"
                style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}
              >
                <p className="font-bold mb-2" style={{ color: "var(--color-text)" }}>💬 Conseil gratuit</p>
                <p className="text-xs mb-3" style={{ color: "var(--color-muted)" }}>
                  Un expert vous aide à choisir votre forfait selon votre usage et votre zone.
                </p>
                <a
                  href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Bonjour, je cherche le meilleur forfait mobile en Guinée.")}`}
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-3 py-2.5 rounded-xl font-bold text-white text-xs"
                  style={{ backgroundColor: "#25D366" }}
                >
                  <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <div className="container max-w-4xl">
        <SocialShare title="Quel est le meilleur forfait mobile en Guinée ?" className="mb-8" />
      </div>
      <ReviewsSection />
    </>
  )
}
