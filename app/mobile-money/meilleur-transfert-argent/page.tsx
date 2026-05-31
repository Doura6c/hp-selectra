import type { Metadata } from "next"
import Link from "next/link"
import { OFFERS, PROVIDERS } from "@/lib/data/seed-data"
import OfferCard from "@/components/compare/OfferCard"
import ReviewsSection from "@/components/ui/ReviewsSection"
import { buildJsonLd, howToSchema, faqSchema, breadcrumbSchema } from "@/lib/schema"
import { ChevronRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Meilleur transfert d'argent en Guinée 2026 — Comparatif Mobile Money",
  description:
    "Quel service mobile money propose les frais les plus bas en Guinée en 2026 ? Soutra Money, Orange Money, MTN MoMo — comparatif HP Score indépendant.",
  alternates: { canonical: "https://hpshop-afrique.vercel.app/mobile-money/meilleur-transfert-argent/" },
}

const MM_PROVIDERS = PROVIDERS.filter((p) => p.verticalSlug === "mobile-money")
  .sort((a, b) => b.hpScoreNum - a.hpScoreNum)

const MM_OFFERS = OFFERS.filter(
  (o) => o.verticalSlug === "mobile-money"
).sort((a, b) => b.hpScoreNum - a.hpScoreNum)

const PROFILS = [
  { icon: "💸", title: "Transferts fréquents", service: "Soutra Money", raison: "Transferts plafonnés à 1% maximum — les frais les plus bas du marché guinéen. 100% guinéen." },
  { icon: "🏪", title: "Paiements marchands", service: "Orange Money", raison: "Le réseau d'acceptation le plus large en Guinée. Paiements en magasin, EDG, et services publics." },
  { icon: "🌍", title: "Envois vers la diaspora", service: "Orange Money", raison: "Meilleure interopérabilité internationale grâce au réseau Orange Afrique. Western Union intégré." },
  { icon: "💳", title: "Carte bancaire virtuelle", service: "Soutra Money", raison: "Seul service guinéen proposant une carte Visa prépayée pour les achats en ligne internationaux." },
]

const STEPS = [
  { n: "01", title: "Définir votre besoin principal", desc: "Transferts fréquents, paiements marchands, envois diaspora ou carte Visa ? Chaque service excelle dans un usage différent." },
  { n: "02", title: "Comparer les frais réels", desc: "Attention aux frais affichés vs réels. Vérifiez les frais de dépôt, retrait, transfert et les plafonds par transaction." },
  { n: "03", title: "Vérifier la disponibilité des agents", desc: "La densité d'agents (dépôt/retrait en cash) est cruciale. Orange Money dispose du réseau le plus large en Guinée." },
  { n: "04", title: "Ouvrir votre compte", desc: "Avec votre carte SIM et CNI, l'ouverture prend 5 minutes. La plupart des services sont disponibles sans smartphone." },
  { n: "05", title: "Activer les limites souhaitées", desc: "Les plafonds augmentent avec la vérification KYC (pièce d'identité). Complétez votre profil pour accéder aux transactions plus importantes." },
]

export default function MeilleurTransfertArgentPage() {
  const jsonLdBreadcrumb = buildJsonLd(breadcrumbSchema([
    { name: "Accueil", href: "/" },
    { name: "Mobile Money", href: "/mobile-money/" },
    { name: "Meilleur transfert d'argent", href: "/mobile-money/meilleur-transfert-argent/" },
  ]))

  const jsonLdHowTo = buildJsonLd(howToSchema({
    name: "Comment envoyer de l'argent avec le mobile money en Guinée",
    description: "Guide pour choisir le meilleur service de transfert d'argent mobile en Guinée.",
    url: "https://hpshop-afrique.vercel.app/mobile-money/meilleur-transfert-argent/",
    steps: STEPS.map((s) => ({ name: s.title, text: s.desc })),
  }))

  const jsonLdFaq = buildJsonLd(faqSchema([
    { question: "Quel est le meilleur service de mobile money en Guinée ?", answer: "Soutra Money (HP Score A) est la solution avec les frais les plus bas : dépôts et retraits gratuits, transferts ≤ 1%. C'est aussi la seule fintech 100% guinéenne avec une carte Visa prépayée." },
    { question: "Quels sont les frais de transfert mobile money en Guinée ?", answer: "Les frais varient selon les services. Soutra Money plafonne à 1% par transfert. Orange Money pratique des frais de 1,5% à 3% selon le montant. MTN MoMo (Telecel) est dans la même fourchette qu'Orange." },
    { question: "Comment envoyer de l'argent depuis la Guinée vers l'étranger ?", answer: "Orange Money offre les meilleures options internationales grâce au réseau Orange Afrique et l'intégration Western Union. Pour les paiements en ligne, la carte Visa de Soutra Money est idéale." },
    { question: "Quel plafond de transaction avec le mobile money en Guinée ?", answer: "Les plafonds varient selon le service et le niveau de vérification KYC. En général, les comptes vérifiés (avec CNI) permettent des transactions jusqu'à 5 000 000 GNF par jour. Soutra Money propose des plafonds plus élevés." },
    { question: "Le mobile money est-il sécurisé en Guinée ?", answer: "Oui, les services mobiles money guinéens sont régulés par la BCRG (Banque Centrale de la République de Guinée). Vos fonds sont sécurisés et les transactions sont protégées par code PIN. Ne partagez jamais votre code PIN." },
  ]))

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdBreadcrumb }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdHowTo }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdFaq }} />

      {/* Hero */}
      <section className="relative overflow-hidden py-14 sm:py-20"
        style={{ background: "linear-gradient(135deg, #4A6B2A 0%, #6B8F3C 100%)" }}>
        <div className="absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage: "repeating-linear-gradient(45deg,#fff 0,#fff 1px,transparent 0,transparent 50%)", backgroundSize: "24px 24px" }} />
        <div className="container relative">
          <nav className="flex items-center gap-1.5 text-xs mb-6" style={{ color: "rgba(255,255,255,0.5)" }}>
            <Link href="/" className="hover:text-white">Accueil</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/mobile-money/" className="hover:text-white">Mobile Money</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">Meilleur transfert d&apos;argent</span>
          </nav>
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold mb-5"
                style={{ backgroundColor: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.9)" }}>
                💸 Mis à jour {new Date().toLocaleDateString("fr-GN", { month: "long", year: "numeric" })}
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-4 leading-tight">
                Meilleur transfert d&apos;argent<br />en Guinée {new Date().getFullYear()}
              </h1>
              <p className="text-base mb-6" style={{ color: "rgba(255,255,255,0.75)" }}>
                Comparatif indépendant de {MM_PROVIDERS.length} services mobile money guinéens selon le HP Score.
                Frais, couverture, sécurité — tout comparé objectivement.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/mobile-money/comparateur/"
                  className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-90"
                  style={{ backgroundColor: "#4A6B2A" }}>
                  📊 Comparateur Mobile Money
                </Link>
                <Link href="/mobile-money/guides/comment-envoyer-argent/"
                  className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white border border-white/30 hover:bg-white/10">
                  📖 Guide : envoyer de l&apos;argent
                </Link>
              </div>
            </div>
            {/* Classement */}
            <div className="rounded-2xl overflow-hidden shadow-2xl hidden lg:block"
              style={{ backgroundColor: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)" }}>
              <div className="px-5 py-3.5 border-b" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
                <p className="text-xs font-bold text-white">🏆 Classement HP Score · Mobile Money Guinée</p>
              </div>
              {MM_PROVIDERS.map((p, i) => (
                <div key={p.slug} className="flex items-center gap-4 px-5 py-3.5 border-b last:border-b-0"
                  style={{ borderColor: "rgba(255,255,255,0.07)", backgroundColor: i === 0 ? "rgba(107,143,60,0.25)" : "transparent" }}>
                  <span className="text-xs font-extrabold w-5 text-center"
                    style={{ color: i === 0 ? "#F0A500" : "rgba(255,255,255,0.4)" }}>#{i + 1}</span>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-bold text-white shrink-0"
                    style={{ backgroundColor: p.brandColor ?? "#6B8F3C" }}>
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
              { label: "💸 Offres & frais", href: "#offres" },
              { label: "👤 Par profil", href: "#profils" },
              { label: "📋 Comment envoyer", href: "#comment" },
              { label: "❓ FAQ", href: "#faq" },
            ].map((a) => (
              <a key={a.href} href={a.href}
                className="text-xs font-semibold px-4 py-4 border-b-2 border-transparent hover:border-[#6B8F3C] transition-colors whitespace-nowrap"
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
            style={{ backgroundColor: "#f0f9e8", borderColor: "#6B8F3C" }}>
            <span className="text-3xl shrink-0">💸</span>
            <div>
              <p className="font-extrabold text-base mb-1" style={{ color: "#4A6B2A" }}>
                Notre sélection HP Selectra — Meilleur transfert d&apos;argent Guinée {new Date().getFullYear()}
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "var(--color-text)" }}>
                <strong>Soutra Money</strong> (HP Score A) est la solution la plus avantageuse du marché guinéen :
                dépôts et retraits <strong>100 % gratuits</strong>, transferts plafonnés à <strong>1 % maximum</strong>.
                C&apos;est la seule fintech 100 % guinéenne avec une carte Visa prépayée pour les achats en ligne.
                <strong> Ecobank Mobile</strong> (A) excelle pour les professionnels et les grandes transactions.
                <strong> Orange Money</strong> (B) offre le réseau d&apos;agents le plus dense du pays.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {[
                  { name: "Soutra Money", score: "A", color: "#6B8F3C" },
                  { name: "Ecobank Mobile", score: "A", color: "#2D3E8C" },
                  { name: "Orange Money", score: "B", color: "#FF6600" },
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

        {/* Offres */}
        <section id="offres" className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-2" style={{ color: "var(--color-text)" }}>
            💸 Meilleures offres Mobile Money en Guinée
          </h2>
          <p className="text-sm mb-6" style={{ color: "var(--color-muted)" }}>
            Classées par HP Score — {MM_OFFERS.length} offres comparées.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {MM_OFFERS.slice(0, 8).map((offer) => {
              const provider = MM_PROVIDERS.find((p) => p.slug === offer.providerSlug)
              if (!provider) return null
              return <OfferCard key={offer.slug} offer={offer} provider={provider} verticalSlug="mobile-money" />
            })}
          </div>
          <div className="mt-4 text-center">
            <Link href="/mobile-money/comparateur/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white"
              style={{ backgroundColor: "#6B8F3C" }}>
              Voir toutes les offres Mobile Money →
            </Link>
          </div>
        </section>

        {/* Par profil */}
        <section id="profils" className="mb-16">
          <h2 className="text-2xl font-extrabold mb-3" style={{ color: "var(--color-text)" }}>
            👤 Quel service selon votre usage ?
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {PROFILS.map((p) => {
              const provider = MM_PROVIDERS.find((pv) => pv.name.toLowerCase().includes(p.service.toLowerCase().split(" ")[0]))
              return (
                <div key={p.title} className="p-5 rounded-2xl border"
                  style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}>
                  <span className="text-2xl mb-2 block">{p.icon}</span>
                  <p className="font-bold text-sm mb-1" style={{ color: "var(--color-text)" }}>{p.title}</p>
                  <p className="text-xs mb-3 leading-relaxed" style={{ color: "var(--color-muted)" }}>{p.raison}</p>
                  {provider && (
                    <Link href={`/mobile-money/fournisseurs/${provider.slug}/`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg text-white"
                      style={{ backgroundColor: provider.brandColor ?? "#6B8F3C" }}>
                      {provider.name} →
                    </Link>
                  )}
                </div>
              )
            })}
          </div>
        </section>

        {/* Comment envoyer */}
        <section id="comment" className="mb-16">
          <h2 className="text-2xl font-extrabold mb-3" style={{ color: "var(--color-text)" }}>
            📋 Comment envoyer de l&apos;argent avec le mobile money ?
          </h2>
          <div className="space-y-4">
            {STEPS.map((step) => (
              <div key={step.n} className="flex items-start gap-5 p-5 rounded-2xl border"
                style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-extrabold text-white shrink-0"
                  style={{ backgroundColor: "#6B8F3C" }}>
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
            <Link href="/mobile-money/guides/comment-envoyer-argent/"
              className="inline-flex items-center gap-2 text-sm font-semibold"
              style={{ color: "#6B8F3C" }}>
              📖 Guide complet : envoyer de l&apos;argent en Guinée →
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mb-16">
          <h2 className="text-2xl font-extrabold mb-6" style={{ color: "var(--color-text)" }}>
            ❓ Questions fréquentes sur le mobile money en Guinée
          </h2>
          <div className="space-y-3">
            {[
              { q: "Quel est le meilleur service de mobile money en Guinée ?", a: "Soutra Money (HP Score A) est la solution avec les frais les plus bas : dépôts et retraits gratuits, transferts ≤ 1%. Orange Money offre le réseau d'agents le plus dense." },
              { q: "Quels sont les frais de transfert mobile money en Guinée ?", a: "Soutra Money plafonne à 1% par transfert. Orange Money pratique 1,5% à 3% selon le montant. MTN MoMo est dans la même fourchette. Vérifiez toujours les frais avant d'envoyer." },
              { q: "Comment envoyer de l'argent depuis la Guinée vers l'étranger ?", a: "Orange Money offre les meilleures options internationales via le réseau Orange Afrique et Western Union intégré. La carte Visa Soutra Money est idéale pour les paiements en ligne." },
              { q: "Quel plafond de transaction avec le mobile money en Guinée ?", a: "Les comptes vérifiés (avec CNI) permettent des transactions jusqu'à 5 000 000 GNF par jour généralement. Soutra Money propose des plafonds plus élevés pour les professionnels." },
              { q: "Le mobile money est-il sécurisé en Guinée ?", a: "Oui, tous les services sont régulés par la BCRG. Vos fonds sont sécurisés et les transactions protégées par code PIN. Ne partagez jamais votre code PIN avec qui que ce soit." },
            ].map(({ q, a }) => (
              <details key={q} className="group rounded-2xl border overflow-hidden"
                style={{ borderColor: "var(--color-border)" }}>
                <summary className="flex items-center justify-between px-6 py-4 cursor-pointer list-none font-semibold text-sm"
                  style={{ backgroundColor: "var(--color-card)", color: "var(--color-text)" }}>
                  {q}
                  <span className="ml-3 shrink-0 font-bold text-xl" style={{ color: "#6B8F3C" }}>+</span>
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
          style={{ background: "linear-gradient(135deg, #4A6B2A 0%, #6B8F3C 100%)" }}>
          <p className="text-2xl font-extrabold text-white mb-2">Besoin de comparer les frais ?</p>
          <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.75)" }}>
            Un conseiller Help&apos;me Process vous guide vers le service le moins cher selon vos besoins.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "224628935335"}?text=${encodeURIComponent("Bonjour, je cherche le meilleur service de mobile money en Guinée.")}`}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white"
              style={{ backgroundColor: "#25D366" }}>
              💬 WhatsApp gratuit
            </a>
            <Link href="/mobile-money/comparateur/"
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white border border-white/30 hover:bg-white/10">
              📊 Comparateur Mobile Money
            </Link>
          </div>
        </div>

      </div>

      <ReviewsSection />
    </>
  )
}
