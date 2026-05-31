import type { Metadata } from "next"
import Link from "next/link"
import { PROVIDERS, OFFERS } from "@/lib/data/seed-data"
import OfferCard from "@/components/compare/OfferCard"
import ReviewsSection from "@/components/ui/ReviewsSection"
import { buildJsonLd, howToSchema, faqSchema, breadcrumbSchema } from "@/lib/schema"
import { ChevronRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Meilleur FAI en Guinée 2026 — Comparatif fournisseurs internet",
  description:
    "Quel est le meilleur fournisseur d'accès internet en Guinée en 2026 ? Comparatif Orange Box, Guinée Télécom, GUILAB, Telecel Box selon le HP Score indépendant.",
  alternates: { canonical: "https://hp-selectra-app.vercel.app/fai/meilleur-fai/" },
}

const FAI_PROVIDERS = PROVIDERS.filter((p) => p.verticalSlug === "fai")
  .sort((a, b) => b.hpScoreNum - a.hpScoreNum)

const FAI_OFFERS = OFFERS.filter(
  (o) => o.verticalSlug === "fai"
).sort((a, b) => b.hpScoreNum - a.hpScoreNum)

const USAGES = [
  { icon: "🏠", title: "Usage résidentiel", fai: "Orange Guinée", raison: "Meilleur rapport débit/prix pour une famille. Couverture 4G étendue, pas d'installation technique requise pour les offres 4G Box." },
  { icon: "🏢", title: "PME & bureau", fai: "Guinée Télécoms", raison: "IP fixe disponible, ADSL Pro stable pour les applications métier et la VoIP. Présence en zones d'affaires de Conakry." },
  { icon: "🏗️", title: "Grande entreprise / ONG", fai: "GUILAB", raison: "Fibre optique avec SLA contractuel, bande passante garantie, support technique prioritaire 24h/7j." },
  { icon: "🌍", title: "Zone rurale / isolée", fai: "Spacetel", raison: "Connexion VSAT disponible partout en Guinée, même sans couverture réseau terrestre. Idéal pour sites miniers et ONG terrain." },
]

const STEPS = [
  { n: "01", title: "Évaluer votre besoin en débit", desc: "Streaming HD : 25 Mbps minimum. Télétravail bureautique : 10 Mbps suffisent. Grande entreprise multi-utilisateurs : prévoir 100 Mbps+ avec fibre dédiée." },
  { n: "02", title: "Vérifier la couverture dans votre zone", desc: "Orange et Telecel couvrent le mieux les zones résidentielles de Conakry. GUILAB est disponible en fibre dans certains quartiers d'affaires. VSAT couvre tout le territoire." },
  { n: "03", title: "Comparer les offres HP Score", desc: "Analysez le débit réel (pas seulement théorique), le prix mensuel, les conditions de résiliation et le support technique inclus." },
  { n: "04", title: "Demander un devis professionnel", desc: "Pour les entreprises, demandez toujours un devis avec SLA (engagement de disponibilité). Les tarifs entreprise sont négociables selon le volume et la durée d'engagement." },
  { n: "05", title: "Planifier l'installation", desc: "Les offres ADSL et fibre nécessitent une visite technique (délai 3-10 jours). Les offres 4G Box sont opérationnelles immédiatement après activation." },
]

export default function MeilleurFaiPage() {
  const jsonLdBreadcrumb = buildJsonLd(breadcrumbSchema([
    { name: "Accueil", href: "/" },
    { name: "Internet Fixe", href: "/fai/" },
    { name: "Meilleur FAI 2026", href: "/fai/meilleur-fai/" },
  ]))

  const jsonLdHowTo = buildJsonLd(howToSchema({
    name: "Comment choisir le meilleur fournisseur internet en Guinée",
    description: "Guide pour sélectionner le bon FAI selon votre usage, zone et budget en Guinée.",
    url: "https://hp-selectra-app.vercel.app/fai/meilleur-fai/",
    steps: STEPS.map((s) => ({ name: s.title, text: s.desc })),
  }))

  const jsonLdFaq = buildJsonLd(faqSchema([
    { question: "Quel est le meilleur fournisseur internet en Guinée ?", answer: "Orange Guinée (HP Score A) est le meilleur FAI pour les particuliers avec la couverture la plus étendue et les offres 4G Box les plus populaires. GUILAB est la référence pour les entreprises avec sa fibre optique dédiée." },
    { question: "Quel est le débit internet moyen en Guinée ?", answer: "En 4G, les vitesses typiques varient de 5 à 30 Mbps selon l'opérateur et la zone. La fibre GUILAB peut atteindre 100 Mbps. L'ADSL Guinée Télécom offre généralement 2 à 8 Mbps." },
    { question: "Combien coûte un abonnement internet fixe en Guinée ?", answer: "Les abonnements 4G Box résidentiels coûtent entre 200 000 et 600 000 GNF/mois selon le volume de data. Les abonnements fibre entreprise démarrent à 1 500 000 GNF/mois. Le VSAT est plus cher (3 000 000+ GNF/mois)." },
    { question: "La fibre optique est-elle disponible en Guinée ?", answer: "Oui, GUILAB propose de la fibre optique dans certains quartiers d'affaires de Conakry (Kaloum, Ratoma, Dixinn). Le déploiement reste limité. La 4G Box est la solution la plus accessible pour les particuliers." },
    { question: "Quelle est la différence entre 4G Box et ADSL en Guinée ?", answer: "La 4G Box utilise le réseau mobile pour fournir internet à domicile — installation immédiate, portable, mais débit variable selon la couverture. L'ADSL utilise la ligne téléphonique — débit plus stable mais limité géographiquement aux zones câblées." },
  ]))

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdBreadcrumb }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdHowTo }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdFaq }} />

      {/* Hero */}
      <section className="relative overflow-hidden py-14 sm:py-20"
        style={{ background: "linear-gradient(135deg, #003087 0%, #0070C0 100%)" }}>
        <div className="absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage: "repeating-linear-gradient(45deg,#fff 0,#fff 1px,transparent 0,transparent 50%)", backgroundSize: "24px 24px" }} />
        <div className="container relative">
          <nav className="flex items-center gap-1.5 text-xs mb-6" style={{ color: "rgba(255,255,255,0.5)" }}>
            <Link href="/" className="hover:text-white">Accueil</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/fai/" className="hover:text-white">Internet Fixe</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">Meilleur FAI 2026</span>
          </nav>
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold mb-5"
                style={{ backgroundColor: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.9)" }}>
                🌐 Mis à jour {new Date().toLocaleDateString("fr-GN", { month: "long", year: "numeric" })}
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-4 leading-tight">
                Meilleur FAI<br />en Guinée {new Date().getFullYear()}
              </h1>
              <p className="text-base mb-6" style={{ color: "rgba(255,255,255,0.75)" }}>
                Comparatif indépendant de {FAI_PROVIDERS.length} fournisseurs internet guinéens selon le HP Score.
                Débit, prix, couverture, fiabilité — tout comparé objectivement.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/fai/comparateur/"
                  className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-90"
                  style={{ backgroundColor: "#003087" }}>
                  📊 Comparateur internet
                </Link>
                <Link href="/fai/guides/meilleure-box-internet/"
                  className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white border border-white/30 hover:bg-white/10">
                  📖 Guide box internet
                </Link>
              </div>
            </div>
            {/* Classement */}
            <div className="rounded-2xl overflow-hidden shadow-2xl hidden lg:block"
              style={{ backgroundColor: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)" }}>
              <div className="px-5 py-3.5 border-b" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
                <p className="text-xs font-bold text-white">🏆 Classement HP Score · FAI Guinée</p>
              </div>
              {FAI_PROVIDERS.map((p, i) => (
                <div key={p.slug} className="flex items-center gap-4 px-5 py-3.5 border-b last:border-b-0"
                  style={{ borderColor: "rgba(255,255,255,0.07)", backgroundColor: i === 0 ? "rgba(0,112,192,0.25)" : "transparent" }}>
                  <span className="text-xs font-extrabold w-5 text-center"
                    style={{ color: i === 0 ? "#F0A500" : "rgba(255,255,255,0.4)" }}>#{i + 1}</span>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-bold text-white shrink-0"
                    style={{ backgroundColor: p.brandColor ?? "#0070C0" }}>
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
              { label: "🌐 Offres internet", href: "#offres" },
              { label: "👤 Par usage", href: "#usages" },
              { label: "📋 Comment choisir", href: "#comment" },
              { label: "❓ FAQ", href: "#faq" },
            ].map((a) => (
              <a key={a.href} href={a.href}
                className="text-xs font-semibold px-4 py-4 border-b-2 border-transparent hover:border-[#0070C0] transition-colors whitespace-nowrap"
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
            style={{ backgroundColor: "#f0f4ff", borderColor: "#0070C0" }}>
            <span className="text-3xl shrink-0">🌐</span>
            <div>
              <p className="font-extrabold text-base mb-1" style={{ color: "#003087" }}>
                Notre sélection HP Selectra — Meilleur FAI Guinée {new Date().getFullYear()}
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "var(--color-text)" }}>
                <strong>Orange Guinée</strong> (HP Score A) domine le marché résidentiel avec la couverture
                4G la plus étendue et les offres Box les plus accessibles. Pour les entreprises,
                <strong> GUILAB</strong> (B) offre la meilleure fibre avec SLA contractuel et support dédié.
                <strong> Guinée Télécoms</strong> (C) reste la seule option ADSL fixe pour les zones câblées,
                et <strong>Spacetel</strong> couvre les zones sans réseau terrestre via VSAT.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {[
                  { name: "Orange Guinée", score: "A", color: "#FF6600" },
                  { name: "GUILAB", score: "B", color: "#1A5276" },
                  { name: "Guinée Télécoms", score: "C", color: "#003087" },
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
            🌐 Meilleures offres internet en Guinée
          </h2>
          <p className="text-sm mb-6" style={{ color: "var(--color-muted)" }}>
            Classées par HP Score — {FAI_OFFERS.length} offres comparées.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {FAI_OFFERS.slice(0, 8).map((offer) => {
              const provider = FAI_PROVIDERS.find((p) => p.slug === offer.providerSlug)
              if (!provider) return null
              return <OfferCard key={offer.slug} offer={offer} provider={provider} verticalSlug="fai" />
            })}
          </div>
          <div className="mt-4 text-center">
            <Link href="/fai/comparateur/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white"
              style={{ backgroundColor: "#0070C0" }}>
              Voir toutes les offres internet →
            </Link>
          </div>
        </section>

        {/* Par usage */}
        <section id="usages" className="mb-16">
          <h2 className="text-2xl font-extrabold mb-3" style={{ color: "var(--color-text)" }}>
            👤 Quel FAI selon votre usage ?
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {USAGES.map((u) => {
              const provider = FAI_PROVIDERS.find((pv) =>
                pv.name.toLowerCase().includes(u.fai.toLowerCase().split(" ")[0].toLowerCase())
              )
              return (
                <div key={u.title} className="p-5 rounded-2xl border"
                  style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}>
                  <span className="text-2xl mb-2 block">{u.icon}</span>
                  <p className="font-bold text-sm mb-1" style={{ color: "var(--color-text)" }}>{u.title}</p>
                  <p className="text-xs mb-3 leading-relaxed" style={{ color: "var(--color-muted)" }}>{u.raison}</p>
                  {provider && (
                    <Link href={`/fai/fournisseurs/${provider.slug}/`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg text-white"
                      style={{ backgroundColor: provider.brandColor ?? "#0070C0" }}>
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
            📋 Comment choisir son FAI en Guinée ?
          </h2>
          <div className="space-y-4">
            {STEPS.map((step) => (
              <div key={step.n} className="flex items-start gap-5 p-5 rounded-2xl border"
                style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-extrabold text-white shrink-0"
                  style={{ backgroundColor: "#0070C0" }}>
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
            <Link href="/fai/guides/meilleure-box-internet/"
              className="inline-flex items-center gap-2 text-sm font-semibold"
              style={{ color: "#0070C0" }}>
              📖 Guide complet : choisir sa box internet en Guinée →
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mb-16">
          <h2 className="text-2xl font-extrabold mb-6" style={{ color: "var(--color-text)" }}>
            ❓ Questions fréquentes sur les FAI en Guinée
          </h2>
          <div className="space-y-3">
            {[
              { q: "Quel est le meilleur fournisseur internet en Guinée ?", a: "Orange Guinée (HP Score A) est le meilleur pour les particuliers avec la plus grande couverture 4G. GUILAB est la référence entreprise avec sa fibre optique dédiée et son SLA." },
              { q: "Quel est le débit internet moyen en Guinée ?", a: "En 4G, les vitesses typiques sont de 5 à 30 Mbps selon l'opérateur et la zone. La fibre GUILAB atteint 100 Mbps. L'ADSL Guinée Télécom offre généralement 2 à 8 Mbps." },
              { q: "Combien coûte un abonnement internet en Guinée ?", a: "Les abonnements 4G Box résidentiels coûtent 200 000 à 600 000 GNF/mois. La fibre entreprise démarre à 1 500 000 GNF/mois. Le VSAT est plus cher (3 000 000+ GNF/mois)." },
              { q: "La fibre optique est-elle disponible en Guinée ?", a: "Oui, GUILAB propose de la fibre dans certains quartiers d'affaires de Conakry. Le déploiement reste limité. La 4G Box reste la solution la plus accessible pour les particuliers." },
              { q: "Quelle est la différence entre 4G Box et ADSL en Guinée ?", a: "La 4G Box utilise le réseau mobile pour l'internet à domicile — installation immédiate et portable, mais débit variable. L'ADSL utilise la ligne téléphonique — débit plus stable mais limité géographiquement aux zones câblées." },
            ].map(({ q, a }) => (
              <details key={q} className="group rounded-2xl border overflow-hidden"
                style={{ borderColor: "var(--color-border)" }}>
                <summary className="flex items-center justify-between px-6 py-4 cursor-pointer list-none font-semibold text-sm"
                  style={{ backgroundColor: "var(--color-card)", color: "var(--color-text)" }}>
                  {q}
                  <span className="ml-3 shrink-0 font-bold text-xl" style={{ color: "#0070C0" }}>+</span>
                </summary>
                <div className="px-6 py-4 text-sm leading-relaxed"
                  style={{ backgroundColor: "var(--color-surface)", color: "var(--color-muted)" }}>
                  {a}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Avertissement */}
        <div className="p-4 rounded-xl mb-10 text-sm flex items-start gap-3"
          style={{ backgroundColor: "#FFF8E1", borderLeft: "4px solid #F0A500" }}>
          <span className="text-lg shrink-0">⚠️</span>
          <p style={{ color: "var(--color-text)" }}>
            Les tarifs et débits indiqués sont <strong>des données indicatives</strong> sujettes à modification.
            La couverture varie selon votre quartier exact. Un conseiller peut vérifier la disponibilité dans votre zone gratuitement.
          </p>
        </div>

        {/* CTA */}
        <div className="rounded-2xl p-8 text-center"
          style={{ background: "linear-gradient(135deg, #003087 0%, #0070C0 100%)" }}>
          <p className="text-2xl font-extrabold text-white mb-2">Besoin d&apos;aide pour choisir votre connexion ?</p>
          <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.75)" }}>
            Un conseiller Help&apos;me Process analyse votre zone et vous trouve la meilleure offre — gratuitement.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "224628935335"}?text=${encodeURIComponent("Bonjour, je cherche le meilleur fournisseur internet en Guinée.")}`}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white"
              style={{ backgroundColor: "#25D366" }}>
              💬 WhatsApp gratuit
            </a>
            <Link href="/fai/comparateur/"
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white border border-white/30 hover:bg-white/10">
              📊 Comparateur internet
            </Link>
          </div>
        </div>

      </div>

      <ReviewsSection />
    </>
  )
}
