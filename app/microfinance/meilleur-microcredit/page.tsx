import type { Metadata } from "next"
import Link from "next/link"
import { OFFERS, PROVIDERS } from "@/lib/data/seed-data"
import OfferCard from "@/components/compare/OfferCard"
import ReviewsSection from "@/components/ui/ReviewsSection"
import { buildJsonLd, howToSchema, faqSchema, breadcrumbSchema } from "@/lib/schema"
import { ChevronRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Meilleur micro-crédit en Guinée 2026 — Comparatif IMF",
  description:
    "Quel est le meilleur micro-crédit en Guinée en 2026 ? Comparatif CRG-SA, Finafrica, Akiba Finance selon le HP Score indépendant. Agricole, PME, épargne.",
  alternates: { canonical: "https://hpshop-afrique.vercel.app/microfinance/meilleur-microcredit/" },
}

const IMF_PROVIDERS = PROVIDERS.filter((p) => p.verticalSlug === "microfinance")
  .sort((a, b) => b.hpScoreNum - a.hpScoreNum)

const MICROCREDIT_OFFERS = OFFERS.filter(
  (o) => o.verticalSlug === "microfinance" && o.category === "microcredit"
).sort((a, b) => b.hpScoreNum - a.hpScoreNum)

const PROFILS = [
  { icon: "🌾", title: "Agriculteur & éleveur", imf: "CRG-SA", raison: "Leader en financement agricole — 100+ caisses rurales, remboursement adapté aux cycles de récolte." },
  { icon: "🏪", title: "Commerçant & PME", imf: "Finafrica", raison: "Crédit PME jusqu'à 50M GNF, accompagnement entrepreneurial, délais rapides." },
  { icon: "👩", title: "Femme entrepreneuse", imf: "CAFODEC", raison: "Institution spécialisée dans le financement des groupements féminins et petits commerces." },
  { icon: "💼", title: "Salarié / équipement", imf: "Akiba Finance", raison: "Crédit équipement et consommation pour salariés, procédure simplifiée en agence." },
]

const STEPS = [
  { n: "01", title: "Définir votre besoin", desc: "Montant, durée de remboursement, objet du crédit (agricole, commerce, équipement). Soyez précis pour obtenir le bon produit." },
  { n: "02", title: "Choisir votre IMF", desc: "CRG-SA pour le rural, Finafrica pour les PME, Akiba pour les salariés. Comparez les taux et conditions selon votre profil." },
  { n: "03", title: "Ouvrir un compte épargne", desc: "La plupart des IMF exigent une épargne préalable de 10-20% du montant souhaité avant d'accorder un crédit." },
  { n: "04", title: "Constituer votre dossier", desc: "CNI, justificatif d'activité, garanties (caution solidaire ou nantissement). Chaque IMF a ses propres critères." },
  { n: "05", title: "Passer devant le comité", desc: "Votre dossier est examiné par le comité de crédit local. Délai moyen : 1 à 3 semaines selon l'institution et le montant." },
]

export default function MeilleurMicrocreditPage() {
  const jsonLdBreadcrumb = buildJsonLd(breadcrumbSchema([
    { name: "Accueil", href: "/" },
    { name: "Microfinance", href: "/microfinance/" },
    { name: "Meilleur micro-crédit", href: "/microfinance/meilleur-microcredit/" },
  ]))

  const jsonLdHowTo = buildJsonLd(howToSchema({
    name: "Comment obtenir un micro-crédit en Guinée",
    description: "Guide pour choisir et obtenir un micro-crédit auprès des meilleures IMF guinéennes.",
    url: "https://hpshop-afrique.vercel.app/microfinance/meilleur-microcredit/",
    steps: STEPS.map((s) => ({ name: s.title, text: s.desc })),
  }))

  const jsonLdFaq = buildJsonLd(faqSchema([
    { question: "Quelle est la meilleure institution de microfinance en Guinée ?", answer: "Le Crédit Rural de Guinée (CRG-SA, HP Score A, 82/100) est le leader national avec 450 000 clients et plus de 100 caisses. Finafrica est la meilleure option pour les PME urbaines." },
    { question: "Quel est le taux d'intérêt des micro-crédits en Guinée ?", answer: "Les taux varient de 18 % à 36 % par an selon l'IMF et le type de crédit. Les crédits agricoles du CRG-SA sont souvent aux taux les plus bas. Vérifiez toujours le TEG (Taux Effectif Global)." },
    { question: "Combien peut-on emprunter en microfinance en Guinée ?", answer: "Les montants vont de 100 000 GNF (petit commerce) à 50 000 000 GNF (PME). CRG-SA propose généralement des micro-crédits de 500 000 à 5 000 000 GNF pour les ménages ruraux." },
    { question: "Faut-il une garantie pour un micro-crédit en Guinée ?", answer: "La plupart des IMF acceptent la caution solidaire (groupe de 3-5 personnes qui se garantissent mutuellement) ou un nantissement de biens. Les crédits agricoles CRG peuvent ne demander qu'une épargne préalable." },
    { question: "Quelle différence entre une IMF et une banque en Guinée ?", answer: "Une IMF (Institution de Microfinance) cible les populations non-bancarisées avec des montants plus faibles, des procédures simplifiées et une présence en zones rurales. Les banques exigent plus de garanties mais offrent des montants plus élevés." },
  ]))

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdBreadcrumb }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdHowTo }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdFaq }} />

      {/* Hero */}
      <section className="relative overflow-hidden py-14 sm:py-20"
        style={{ background: "linear-gradient(135deg, #1B4F2E 0%, #2D7A4F 100%)" }}>
        <div className="absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage: "repeating-linear-gradient(45deg,#fff 0,#fff 1px,transparent 0,transparent 50%)", backgroundSize: "24px 24px" }} />
        <div className="container relative">
          <nav className="flex items-center gap-1.5 text-xs mb-6" style={{ color: "rgba(255,255,255,0.5)" }}>
            <Link href="/" className="hover:text-white">Accueil</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/microfinance/" className="hover:text-white">Microfinance</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">Meilleur micro-crédit</span>
          </nav>
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold mb-5"
                style={{ backgroundColor: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.9)" }}>
                🤝 Mis à jour {new Date().toLocaleDateString("fr-GN", { month: "long", year: "numeric" })}
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-4 leading-tight">
                Meilleur micro-crédit<br />en Guinée {new Date().getFullYear()}
              </h1>
              <p className="text-base mb-6" style={{ color: "rgba(255,255,255,0.75)" }}>
                Comparatif indépendant de {IMF_PROVIDERS.length} institutions de microfinance guinéennes.
                Agricole, PME, équipement, épargne — tout comparé selon le HP Score.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/microfinance/comparateur/"
                  className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-90"
                  style={{ backgroundColor: "#2D7A4F" }}>
                  📊 Comparateur microfinance
                </Link>
                <Link href="/microfinance/guides/obtenir-microcredit/"
                  className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white border border-white/30 hover:bg-white/10">
                  📖 Guide obtenir un micro-crédit
                </Link>
              </div>
            </div>
            {/* Classement */}
            <div className="rounded-2xl overflow-hidden shadow-2xl hidden lg:block"
              style={{ backgroundColor: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)" }}>
              <div className="px-5 py-3.5 border-b" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
                <p className="text-xs font-bold text-white">🏆 Classement HP Score · Microfinance Guinée</p>
              </div>
              {IMF_PROVIDERS.map((p, i) => (
                <div key={p.slug} className="flex items-center gap-4 px-5 py-3.5 border-b last:border-b-0"
                  style={{ borderColor: "rgba(255,255,255,0.07)", backgroundColor: i === 0 ? "rgba(45,122,79,0.25)" : "transparent" }}>
                  <span className="text-xs font-extrabold w-5 text-center"
                    style={{ color: i === 0 ? "#F0A500" : "rgba(255,255,255,0.4)" }}>#{i + 1}</span>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-bold text-white shrink-0"
                    style={{ backgroundColor: p.brandColor ?? "#2D7A4F" }}>
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
              { label: "💰 Micro-crédits", href: "#offres" },
              { label: "👤 Par profil", href: "#profils" },
              { label: "📋 Comment obtenir", href: "#comment" },
              { label: "❓ FAQ", href: "#faq" },
            ].map((a) => (
              <a key={a.href} href={a.href}
                className="text-xs font-semibold px-4 py-4 border-b-2 border-transparent hover:border-[#2D7A4F] transition-colors whitespace-nowrap"
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
            style={{ backgroundColor: "#f0f9f4", borderColor: "#2D7A4F" }}>
            <span className="text-3xl shrink-0">🤝</span>
            <div>
              <p className="font-extrabold text-base mb-1" style={{ color: "#1B4F2E" }}>
                Notre sélection HP Selectra — Meilleur micro-crédit Guinée {new Date().getFullYear()}
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "var(--color-text)" }}>
                <strong>Crédit Rural de Guinée (CRG-SA)</strong> (HP Score A, 82/100) reste la référence nationale
                avec 450 000 clients, 100+ caisses locales et une expertise rurale inégalée depuis 1989.
                Pour les PME urbaines, <strong>Finafrica</strong> (B, 74/100) offre les meilleures conditions
                avec un accompagnement entrepreneurial. <strong>Akiba Finance</strong> excelle pour les
                crédits équipement des salariés.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {[
                  { name: "CRG-SA", score: "A", color: "#2E7D32" },
                  { name: "Finafrica", score: "B", color: "#1565C0" },
                  { name: "Akiba Finance", score: "B", color: "#E65100" },
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

        {/* Offres micro-crédit */}
        <section id="offres" className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-2" style={{ color: "var(--color-text)" }}>
            💰 Meilleurs micro-crédits en Guinée
          </h2>
          <p className="text-sm mb-6" style={{ color: "var(--color-muted)" }}>
            Classés par HP Score — {MICROCREDIT_OFFERS.length} offres comparées.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {MICROCREDIT_OFFERS.map((offer) => {
              const provider = IMF_PROVIDERS.find((p) => p.slug === offer.providerSlug)
              if (!provider) return null
              return <OfferCard key={offer.slug} offer={offer} provider={provider} verticalSlug="microfinance" />
            })}
          </div>
          <div className="mt-4 text-center">
            <Link href="/microfinance/comparateur/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white"
              style={{ backgroundColor: "#2D7A4F" }}>
              Voir toutes les offres microfinance →
            </Link>
          </div>
        </section>

        {/* Par profil */}
        <section id="profils" className="mb-16">
          <h2 className="text-2xl font-extrabold mb-3" style={{ color: "var(--color-text)" }}>
            👤 Quelle IMF selon votre profil ?
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {PROFILS.map((p) => {
              const provider = IMF_PROVIDERS.find((pv) => pv.name.includes(p.imf) || p.imf === "CRG-SA" && pv.slug === "crg-sa")
              return (
                <div key={p.title} className="p-5 rounded-2xl border"
                  style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}>
                  <span className="text-2xl mb-2 block">{p.icon}</span>
                  <p className="font-bold text-sm mb-1" style={{ color: "var(--color-text)" }}>{p.title}</p>
                  <p className="text-xs mb-3 leading-relaxed" style={{ color: "var(--color-muted)" }}>{p.raison}</p>
                  {provider && (
                    <Link href={`/microfinance/fournisseurs/${provider.slug}/`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg text-white"
                      style={{ backgroundColor: provider.brandColor ?? "#2D7A4F" }}>
                      {provider.name} →
                    </Link>
                  )}
                </div>
              )
            })}
          </div>
        </section>

        {/* Comment obtenir */}
        <section id="comment" className="mb-16">
          <h2 className="text-2xl font-extrabold mb-3" style={{ color: "var(--color-text)" }}>
            📋 Comment obtenir un micro-crédit en Guinée ?
          </h2>
          <div className="space-y-4">
            {STEPS.map((step) => (
              <div key={step.n} className="flex items-start gap-5 p-5 rounded-2xl border"
                style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-extrabold text-white shrink-0"
                  style={{ backgroundColor: "#2D7A4F" }}>
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
            <Link href="/microfinance/guides/obtenir-microcredit/"
              className="inline-flex items-center gap-2 text-sm font-semibold"
              style={{ color: "#2D7A4F" }}>
              📖 Guide complet : obtenir un micro-crédit →
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mb-16">
          <h2 className="text-2xl font-extrabold mb-6" style={{ color: "var(--color-text)" }}>
            ❓ Questions fréquentes sur la microfinance en Guinée
          </h2>
          <div className="space-y-3">
            {[
              { q: "Quelle est la meilleure institution de microfinance en Guinée ?", a: "Le CRG-SA (HP Score A, 82/100) est le leader national avec 450 000 clients. Finafrica est la meilleure option pour les PME urbaines." },
              { q: "Quel est le taux d'intérêt des micro-crédits en Guinée ?", a: "Les taux varient de 18 % à 36 % par an. Les crédits agricoles CRG-SA sont souvent aux taux les plus bas. Vérifiez toujours le TEG." },
              { q: "Combien peut-on emprunter en microfinance en Guinée ?", a: "Les montants vont de 100 000 GNF à 50 000 000 GNF. CRG-SA propose généralement 500 000 à 5 000 000 GNF pour les ménages ruraux." },
              { q: "Faut-il une garantie pour un micro-crédit ?", a: "La plupart des IMF acceptent la caution solidaire ou un nantissement de biens. Les crédits agricoles CRG peuvent ne demander qu'une épargne préalable." },
              { q: "Quelle différence entre une IMF et une banque en Guinée ?", a: "Une IMF cible les non-bancarisés avec des montants plus faibles et procédures simplifiées. Les banques exigent plus de garanties mais offrent des montants plus élevés." },
            ].map(({ q, a }) => (
              <details key={q} className="group rounded-2xl border overflow-hidden"
                style={{ borderColor: "var(--color-border)" }}>
                <summary className="flex items-center justify-between px-6 py-4 cursor-pointer list-none font-semibold text-sm"
                  style={{ backgroundColor: "var(--color-card)", color: "var(--color-text)" }}>
                  {q}
                  <span className="ml-3 shrink-0 font-bold text-xl" style={{ color: "#2D7A4F" }}>+</span>
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
          style={{ background: "linear-gradient(135deg, #1B4F2E 0%, #2D7A4F 100%)" }}>
          <p className="text-2xl font-extrabold text-white mb-2">Besoin d&apos;aide pour votre dossier ?</p>
          <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.75)" }}>
            Un conseiller Help&apos;me Process vous guide vers la bonne IMF — gratuitement.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "224628935335"}?text=${encodeURIComponent("Bonjour, je cherche un micro-crédit en Guinée.")}`}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white"
              style={{ backgroundColor: "#25D366" }}>
              💬 WhatsApp gratuit
            </a>
            <Link href="/microfinance/comparateur/"
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white border border-white/30 hover:bg-white/10">
              📊 Comparateur microfinance
            </Link>
          </div>
        </div>

      </div>

      <ReviewsSection />
    </>
  )
}
