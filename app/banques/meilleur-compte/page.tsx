import type { Metadata } from "next"
import Link from "next/link"
import { OFFERS, PROVIDERS } from "@/lib/data/seed-data"
import OfferCard from "@/components/compare/OfferCard"
import ReviewsSection from "@/components/ui/ReviewsSection"
import { buildJsonLd, howToSchema, faqSchema, breadcrumbSchema } from "@/lib/schema"
import { ChevronRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Meilleure banque en Guinée 2026 — Quel compte bancaire choisir ?",
  description:
    "Quelle est la meilleure banque pour ouvrir un compte en Guinée en 2026 ? Comparatif Ecobank, Orabank, UBA, Vista Bank selon le HP Score indépendant.",
  alternates: { canonical: "https://hpshop-afrique.vercel.app/banques/meilleur-compte/" },
}

const BANQUES_PROVIDERS = PROVIDERS.filter((p) => p.verticalSlug === "banques")
  .sort((a, b) => b.hpScoreNum - a.hpScoreNum)

const COMPTE_OFFERS = OFFERS.filter(
  (o) => o.verticalSlug === "banques" && o.category === "compte-courant"
).sort((a, b) => b.hpScoreNum - a.hpScoreNum)

const CRITERES = [
  { icon: "📱", title: "Application mobile", desc: "Qualité et disponibilité de l'app bancaire pour gérer votre compte au quotidien." },
  { icon: "🏢", title: "Réseau d'agences", desc: "Nombre d'agences et de GAB disponibles à Conakry et en régions." },
  { icon: "💳", title: "Carte bancaire", desc: "Disponibilité de cartes Visa/Mastercard utilisables localement et à l'international." },
  { icon: "💰", title: "Frais de tenue", desc: "Coût mensuel ou annuel du compte, frais de virement et de retrait." },
  { icon: "🌍", title: "Transferts internationaux", desc: "Facilité d'envoi et réception d'argent depuis/vers l'étranger." },
  { icon: "🔒", title: "Solidité & sécurité", desc: "Appartenance à un groupe bancaire reconnu, supervision BCRG." },
]

const STEPS = [
  { n: "01", title: "Comparer les offres HP Score", desc: "Utilisez notre comparateur indépendant pour évaluer chaque banque selon 6 critères objectifs." },
  { n: "02", title: "Choisir selon votre profil", desc: "Salarié, entrepreneur, expatrié ? Chaque profil a sa banque idéale. Nos conseillers vous orientent." },
  { n: "03", title: "Préparer vos documents", desc: "CNI ou passeport, justificatif de domicile, photo d'identité. Certaines banques acceptent la procédure en ligne." },
  { n: "04", title: "Se rendre en agence", desc: "Ouvrez votre compte dans n'importe quelle agence — comptez 30 à 60 min. Dépôt minimum requis." },
  { n: "05", title: "Activer votre carte et l'application", desc: "Récupérez votre carte Visa/Mastercard et activez l'application mobile pour gérer votre compte partout." },
]

export default function MeilleurComptePage() {
  const jsonLdBreadcrumb = buildJsonLd(breadcrumbSchema([
    { name: "Accueil", href: "/" },
    { name: "Banques", href: "/banques/" },
    { name: "Meilleure banque", href: "/banques/meilleur-compte/" },
  ]))

  const jsonLdHowTo = buildJsonLd(howToSchema({
    name: "Comment ouvrir le meilleur compte bancaire en Guinée",
    description: "Guide étape par étape pour choisir et ouvrir un compte bancaire en Guinée selon votre profil.",
    url: "https://hpshop-afrique.vercel.app/banques/meilleur-compte/",
    steps: STEPS.map((s) => ({ name: s.title, text: s.desc })),
  }))

  const jsonLdFaq = buildJsonLd(faqSchema([
    { question: "Quelle est la meilleure banque en Guinée ?", answer: "Ecobank Guinée (HP Score A, 84/100) se distingue par sa meilleure application mobile et son réseau panafricain. Orabank et UBA sont de bonnes alternatives pour les profils PME." },
    { question: "Quels documents pour ouvrir un compte en Guinée ?", answer: "CNI ou passeport valide, justificatif de domicile (facture EDG, quittance de loyer), 2 photos d'identité. Certaines banques demandent aussi un justificatif de revenu." },
    { question: "Peut-on ouvrir un compte bancaire en Guinée sans emploi ?", answer: "Oui, la plupart des banques guinéennes proposent des comptes d'épargne sans condition d'emploi. Pour un compte courant avec découvert, un justificatif de revenu peut être requis." },
    { question: "Quelle banque a le meilleur réseau d'agences en Guinée ?", answer: "Vista Bank Guinée (ex-BICIGUI) dispose du réseau le plus étendu avec plus de 35 agences. Ecobank a 20 agences à Conakry, Orabank une quinzaine." },
    { question: "Les banques guinéennes ont-elles des applications mobiles ?", answer: "Oui, Ecobank Mobile est la plus complète et la mieux notée. UBA, Orabank et Vista Bank proposent également des applis fonctionnelles. La qualité varie selon les banques." },
  ]))

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdBreadcrumb }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdHowTo }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdFaq }} />

      {/* Hero */}
      <section
        className="relative overflow-hidden py-14 sm:py-20"
        style={{ background: "linear-gradient(135deg, #1B2E6B 0%, #2D3E8C 100%)" }}
      >
        <div className="absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage: "repeating-linear-gradient(45deg,#fff 0,#fff 1px,transparent 0,transparent 50%)", backgroundSize: "24px 24px" }} />
        <div className="container relative">
          <nav className="flex items-center gap-1.5 text-xs mb-6" style={{ color: "rgba(255,255,255,0.5)" }}>
            <Link href="/" className="hover:text-white">Accueil</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/banques/" className="hover:text-white">Banques</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">Meilleure banque</span>
          </nav>
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold mb-5"
                style={{ backgroundColor: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.9)" }}>
                🏦 Mis à jour {new Date().toLocaleDateString("fr-GN", { month: "long", year: "numeric" })}
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-4 leading-tight">
                Meilleure banque<br />en Guinée {new Date().getFullYear()}
              </h1>
              <p className="text-base mb-6" style={{ color: "rgba(255,255,255,0.75)" }}>
                Comparatif indépendant de {BANQUES_PROVIDERS.length} banques guinéennes selon le HP Score.
                Application mobile, frais, réseau d&apos;agences, carte bancaire — tout comparé.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/banques/comparateur/"
                  className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-90"
                  style={{ backgroundColor: "#2D3E8C" }}>
                  📊 Comparateur banques
                </Link>
                <Link href="/banques/guides/ouvrir-compte/"
                  className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white border border-white/30 hover:bg-white/10">
                  📖 Guide ouvrir un compte
                </Link>
              </div>
            </div>
            {/* Classement rapide */}
            <div className="rounded-2xl overflow-hidden shadow-2xl hidden lg:block"
              style={{ backgroundColor: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)" }}>
              <div className="px-5 py-3.5 border-b" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
                <p className="text-xs font-bold text-white">🏆 Classement HP Score · Banques Guinée</p>
              </div>
              {BANQUES_PROVIDERS.slice(0, 5).map((p, i) => (
                <div key={p.slug} className="flex items-center gap-4 px-5 py-3.5 border-b last:border-b-0"
                  style={{ borderColor: "rgba(255,255,255,0.07)", backgroundColor: i === 0 ? "rgba(45,62,140,0.25)" : "transparent" }}>
                  <span className="text-xs font-extrabold w-5 text-center"
                    style={{ color: i === 0 ? "#F0A500" : "rgba(255,255,255,0.4)" }}>#{i + 1}</span>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-bold text-white shrink-0"
                    style={{ backgroundColor: p.brandColor ?? "#1B2E6B" }}>
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
              { label: "🏦 Meilleurs comptes", href: "#comptes" },
              { label: "📊 Critères", href: "#criteres" },
              { label: "📋 Comment ouvrir", href: "#comment" },
              { label: "❓ FAQ", href: "#faq" },
            ].map((a) => (
              <a key={a.href} href={a.href}
                className="text-xs font-semibold px-4 py-4 border-b-2 border-transparent hover:border-[var(--color-primary)] transition-colors whitespace-nowrap"
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
            style={{ backgroundColor: "#e8f0fd", borderColor: "#2D3E8C" }}>
            <span className="text-3xl shrink-0">🔵</span>
            <div>
              <p className="font-extrabold text-base mb-1" style={{ color: "#1B2E6B" }}>
                Notre sélection HP Selectra — Meilleure banque Guinée {new Date().getFullYear()}
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "var(--color-text)" }}>
                <strong>Ecobank Guinée</strong> (HP Score A, 84/100) remporte la 1ʳᵉ place grâce à son application mobile
                primée, ses 20 agences à Conakry et son accès au réseau panafricain Ecobank (36 pays).
                Pour les PME, <strong>Orabank</strong> propose les meilleures solutions d&apos;entreprise.
                Pour un réseau d&apos;agences maximal, <strong>Vista Bank (ex-BICIGUI)</strong> avec 35+ points reste imbattable.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {[
                  { name: "Ecobank", score: "A", color: "#2D3E8C" },
                  { name: "Orabank", score: "B", color: "#E30613" },
                  { name: "UBA Guinée", score: "B", color: "#B02840" },
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

        {/* Meilleurs comptes courants */}
        <section id="comptes" className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-2" style={{ color: "var(--color-text)" }}>
            🏦 Meilleurs comptes bancaires en Guinée
          </h2>
          <p className="text-sm mb-6" style={{ color: "var(--color-muted)" }}>
            Classés par HP Score — {COMPTE_OFFERS.length} comptes courants comparés.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {COMPTE_OFFERS.slice(0, 6).map((offer) => {
              const provider = BANQUES_PROVIDERS.find((p) => p.slug === offer.providerSlug)
              if (!provider) return null
              return <OfferCard key={offer.slug} offer={offer} provider={provider} verticalSlug="banques" />
            })}
          </div>
          <div className="mt-4 text-center">
            <Link href="/banques/comparateur/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white"
              style={{ backgroundColor: "var(--color-primary)" }}>
              Voir toutes les offres bancaires →
            </Link>
          </div>
        </section>

        {/* Critères */}
        <section id="criteres" className="mb-16">
          <h2 className="text-2xl font-extrabold mb-3" style={{ color: "var(--color-text)" }}>
            📊 Les 6 critères pour choisir sa banque en Guinée
          </h2>
          <p className="text-sm mb-6" style={{ color: "var(--color-muted)" }}>
            Notre méthodologie HP Score évalue chaque banque sur ces 6 dimensions clés.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CRITERES.map((c) => (
              <div key={c.title} className="p-5 rounded-2xl border"
                style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}>
                <span className="text-2xl mb-3 block">{c.icon}</span>
                <p className="font-bold text-sm mb-1" style={{ color: "var(--color-text)" }}>{c.title}</p>
                <p className="text-xs leading-relaxed" style={{ color: "var(--color-muted)" }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Comment ouvrir un compte */}
        <section id="comment" className="mb-16">
          <h2 className="text-2xl font-extrabold mb-3" style={{ color: "var(--color-text)" }}>
            📋 Comment ouvrir un compte bancaire en Guinée ?
          </h2>
          <p className="text-sm mb-6" style={{ color: "var(--color-muted)" }}>
            5 étapes simples pour ouvrir votre compte dans la meilleure banque guinéenne.
          </p>
          <div className="space-y-4">
            {STEPS.map((step) => (
              <div key={step.n} className="flex items-start gap-5 p-5 rounded-2xl border"
                style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-extrabold text-white shrink-0"
                  style={{ backgroundColor: "var(--color-primary)" }}>
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
            <Link href="/banques/guides/ouvrir-compte/"
              className="inline-flex items-center gap-2 text-sm font-semibold"
              style={{ color: "var(--color-primary)" }}>
              📖 Guide complet : ouvrir un compte en Guinée →
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mb-16">
          <h2 className="text-2xl font-extrabold mb-6" style={{ color: "var(--color-text)" }}>
            ❓ Questions fréquentes sur les banques en Guinée
          </h2>
          <div className="space-y-3">
            {[
              { q: "Quelle est la meilleure banque en Guinée ?", a: "Ecobank Guinée (HP Score A, 84/100) se distingue par sa meilleure application mobile et son réseau panafricain. Orabank et UBA sont de bonnes alternatives pour les profils PME." },
              { q: "Quels documents pour ouvrir un compte en Guinée ?", a: "CNI ou passeport valide, justificatif de domicile (facture EDG, quittance de loyer), 2 photos d'identité. Certaines banques demandent aussi un justificatif de revenu." },
              { q: "Peut-on ouvrir un compte sans emploi en Guinée ?", a: "Oui, la plupart des banques proposent des comptes d'épargne sans condition d'emploi. Pour un compte courant avec découvert, un justificatif de revenu peut être requis." },
              { q: "Quelle banque a le meilleur réseau d'agences ?", a: "Vista Bank Guinée (ex-BICIGUI) dispose du réseau le plus étendu avec plus de 35 agences. Ecobank a 20 agences à Conakry, Orabank une quinzaine." },
              { q: "Les banques guinéennes ont-elles des applications mobiles ?", a: "Oui, Ecobank Mobile est la plus complète. UBA, Orabank et Vista Bank proposent également des applis fonctionnelles." },
            ].map(({ q, a }) => (
              <details key={q} className="group rounded-2xl border overflow-hidden"
                style={{ borderColor: "var(--color-border)" }}>
                <summary className="flex items-center justify-between px-6 py-4 cursor-pointer list-none font-semibold text-sm"
                  style={{ backgroundColor: "var(--color-card)", color: "var(--color-text)" }}>
                  {q}
                  <span className="ml-3 shrink-0 font-bold text-xl" style={{ color: "var(--color-primary)" }}>+</span>
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
          style={{ background: "linear-gradient(135deg, #1B2E6B 0%, #2D3E8C 100%)" }}>
          <p className="text-2xl font-extrabold text-white mb-2">Besoin d&apos;aide pour choisir ?</p>
          <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.75)" }}>
            Un conseiller Help&apos;me Process compare les banques selon votre profil — gratuitement.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "224628935335"}?text=${encodeURIComponent("Bonjour, je cherche la meilleure banque en Guinée.")}`}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white"
              style={{ backgroundColor: "#25D366" }}>
              💬 WhatsApp gratuit
            </a>
            <Link href="/banques/comparateur/"
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white border border-white/30 hover:bg-white/10">
              📊 Comparateur banques
            </Link>
          </div>
        </div>

      </div>

      <ReviewsSection />
    </>
  )
}
