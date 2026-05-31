import type { Metadata } from "next"
import Link from "next/link"
import { OFFERS, PROVIDERS } from "@/lib/data/seed-data"
import OfferCard from "@/components/compare/OfferCard"
import ReviewsSection from "@/components/ui/ReviewsSection"
import { buildJsonLd, howToSchema, faqSchema, breadcrumbSchema } from "@/lib/schema"
import { ChevronRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Meilleure assurance en Guinée 2026 — Comparatif compagnies",
  description:
    "Quelle est la meilleure assurance auto, santé ou habitation en Guinée en 2026 ? Comparatif NSIA, UGAR-Activa, SUNU selon le HP Score indépendant.",
  alternates: { canonical: "https://hpshop-afrique.vercel.app/assurances/meilleur-assurance/" },
}

const ASSUREURS = PROVIDERS.filter((p) => p.verticalSlug === "assurances")
  .sort((a, b) => b.hpScoreNum - a.hpScoreNum)

const RC_AUTO_OFFERS = OFFERS.filter(
  (o) => o.verticalSlug === "assurances" && o.category === "rc-auto"
).sort((a, b) => b.hpScoreNum - a.hpScoreNum)

const TYPES = [
  { icon: "🚗", title: "Assurance Auto (RC)", desc: "Responsabilité civile obligatoire + tous risques optionnel. NSIA et UGAR-Activa dominent ce segment.", slug: "rc-auto" },
  { icon: "🏥", title: "Assurance Santé", desc: "Remboursement frais médicaux, hospitalisation. Recommandée pour salariés et expatriés.", slug: "sante" },
  { icon: "🏠", title: "Assurance Habitation", desc: "Couvre incendie, vol, dégâts des eaux. NSIA propose les offres les plus complètes.", slug: "habitation" },
  { icon: "🛡️", title: "Assurance Vie", desc: "Épargne et prévoyance. Sanlam et NSIA Vie sont les leaders du marché guinéen.", slug: "vie" },
]

const STEPS = [
  { n: "01", title: "Évaluer vos besoins", desc: "Auto, santé, habitation ou vie ? Définissez votre priorité selon votre situation personnelle." },
  { n: "02", title: "Comparer les offres HP Score", desc: "Utilisez notre comparateur pour évaluer NSIA, UGAR-Activa, SUNU et les autres selon 5 critères." },
  { n: "03", title: "Demander un devis", desc: "Contactez la compagnie directement ou via notre conseiller WhatsApp pour obtenir un tarif personnalisé." },
  { n: "04", title: "Vérifier le contrat", desc: "Lisez les exclusions, franchises et plafonds avant de signer. Nos conseillers peuvent vous aider." },
  { n: "05", title: "Souscrire en agence", desc: "Apportez CNI/passeport, les documents du bien à assurer et le paiement de la prime annuelle." },
]

export default function MeilleurAssurancePage() {
  const jsonLdBreadcrumb = buildJsonLd(breadcrumbSchema([
    { name: "Accueil", href: "/" },
    { name: "Assurances", href: "/assurances/" },
    { name: "Meilleure assurance", href: "/assurances/meilleur-assurance/" },
  ]))

  const jsonLdHowTo = buildJsonLd(howToSchema({
    name: "Comment choisir la meilleure assurance en Guinée",
    description: "Guide pour sélectionner la bonne compagnie d'assurance en Guinée selon vos besoins.",
    url: "https://hpshop-afrique.vercel.app/assurances/meilleur-assurance/",
    steps: STEPS.map((s) => ({ name: s.title, text: s.desc })),
  }))

  const jsonLdFaq = buildJsonLd(faqSchema([
    { question: "Quelle est la meilleure assurance en Guinée ?", answer: "NSIA Assurances (HP Score A, 86/100) est le leader du marché guinéen avec environ 26 % de parts. UGAR-Activa (A, 80/100) excelle en assurance auto." },
    { question: "L'assurance auto est-elle obligatoire en Guinée ?", answer: "Oui, la RC auto (Responsabilité Civile) est obligatoire pour tout véhicule circulant sur la voie publique en Guinée, conformément à la réglementation CIMA." },
    { question: "Comment déclarer un sinistre en Guinée ?", answer: "Contactez votre compagnie dans les 48h suivant le sinistre. Fournissez un constat amiable (pour l'auto), des photos et votre numéro de police. La plupart des compagnies ont un service sinistres à Conakry." },
    { question: "Quelle assurance santé choisir en Guinée ?", answer: "NSIA Santé et SUNU Assurances proposent les meilleures couvertures santé. Pour les entreprises, un contrat groupe est souvent plus avantageux qu'une assurance individuelle." },
    { question: "Les primes d'assurance sont-elles chères en Guinée ?", answer: "Les tarifs varient selon le type d'assurance. La RC auto de base part d'environ 150 000 GNF/an. La santé individuelle coûte entre 500 000 et 2 000 000 GNF/an. Demandez toujours plusieurs devis." },
  ]))

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdBreadcrumb }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdHowTo }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdFaq }} />

      {/* Hero */}
      <section className="relative overflow-hidden py-14 sm:py-20"
        style={{ background: "linear-gradient(135deg, #7B1A2E 0%, #B02840 100%)" }}>
        <div className="absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage: "repeating-linear-gradient(45deg,#fff 0,#fff 1px,transparent 0,transparent 50%)", backgroundSize: "24px 24px" }} />
        <div className="container relative">
          <nav className="flex items-center gap-1.5 text-xs mb-6" style={{ color: "rgba(255,255,255,0.5)" }}>
            <Link href="/" className="hover:text-white">Accueil</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/assurances/" className="hover:text-white">Assurances</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">Meilleure assurance</span>
          </nav>
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold mb-5"
                style={{ backgroundColor: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.9)" }}>
                🛡️ Mis à jour {new Date().toLocaleDateString("fr-GN", { month: "long", year: "numeric" })}
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-4 leading-tight">
                Meilleure assurance<br />en Guinée {new Date().getFullYear()}
              </h1>
              <p className="text-base mb-6" style={{ color: "rgba(255,255,255,0.75)" }}>
                Comparatif indépendant de {ASSUREURS.length} compagnies guinéennes selon le HP Score.
                Auto, santé, habitation, vie — tout comparé objectivement.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/assurances/comparateur/"
                  className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-90"
                  style={{ backgroundColor: "#B02840" }}>
                  📊 Comparateur assurances
                </Link>
                <Link href="/assurances/guides/choisir-assurance/"
                  className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white border border-white/30 hover:bg-white/10">
                  📖 Guide choisir son assurance
                </Link>
              </div>
            </div>
            {/* Classement */}
            <div className="rounded-2xl overflow-hidden shadow-2xl hidden lg:block"
              style={{ backgroundColor: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)" }}>
              <div className="px-5 py-3.5 border-b" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
                <p className="text-xs font-bold text-white">🏆 Classement HP Score · Assurances Guinée</p>
              </div>
              {ASSUREURS.slice(0, 5).map((p, i) => (
                <div key={p.slug} className="flex items-center gap-4 px-5 py-3.5 border-b last:border-b-0"
                  style={{ borderColor: "rgba(255,255,255,0.07)", backgroundColor: i === 0 ? "rgba(176,40,64,0.25)" : "transparent" }}>
                  <span className="text-xs font-extrabold w-5 text-center"
                    style={{ color: i === 0 ? "#F0A500" : "rgba(255,255,255,0.4)" }}>#{i + 1}</span>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-bold text-white shrink-0"
                    style={{ backgroundColor: p.brandColor ?? "#B02840" }}>
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
              { label: "🚗 RC Auto", href: "#rc-auto" },
              { label: "🛡️ Types d'assurance", href: "#types" },
              { label: "📋 Comment choisir", href: "#comment" },
              { label: "❓ FAQ", href: "#faq" },
            ].map((a) => (
              <a key={a.href} href={a.href}
                className="text-xs font-semibold px-4 py-4 border-b-2 border-transparent hover:border-[#B02840] transition-colors whitespace-nowrap"
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
            style={{ backgroundColor: "#fdf0f3", borderColor: "#B02840" }}>
            <span className="text-3xl shrink-0">🛡️</span>
            <div>
              <p className="font-extrabold text-base mb-1" style={{ color: "#7B1A2E" }}>
                Notre sélection HP Selectra — Meilleure assurance Guinée {new Date().getFullYear()}
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "var(--color-text)" }}>
                <strong>NSIA Assurances</strong> (HP Score A, 86/100) s&apos;impose comme leader avec ~26 % de parts de marché,
                une gamme complète IARD + Vie et un règlement des sinistres reconnu.
                Pour l&apos;assurance auto spécifiquement, <strong>UGAR-Activa</strong> (A, 80/100) offre les meilleures
                conditions et un réseau d&apos;agents étendu. <strong>SUNU Assurances</strong> est la référence pour
                l&apos;assurance vie et prévoyance.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {[
                  { name: "NSIA Assurances", score: "A", color: "#B02840" },
                  { name: "UGAR-Activa", score: "A", color: "#1B4F7A" },
                  { name: "SUNU Assurances", score: "B", color: "#00529B" },
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

        {/* RC Auto */}
        <section id="rc-auto" className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-2" style={{ color: "var(--color-text)" }}>
            🚗 Meilleures assurances RC Auto en Guinée
          </h2>
          <p className="text-sm mb-6" style={{ color: "var(--color-muted)" }}>
            La RC auto est obligatoire en Guinée. Classées par HP Score — {RC_AUTO_OFFERS.length} offres comparées.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {RC_AUTO_OFFERS.slice(0, 6).map((offer) => {
              const provider = ASSUREURS.find((p) => p.slug === offer.providerSlug)
              if (!provider) return null
              return <OfferCard key={offer.slug} offer={offer} provider={provider} verticalSlug="assurances" />
            })}
          </div>
          <div className="mt-4 text-center">
            <Link href="/assurances/comparateur/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white"
              style={{ backgroundColor: "#B02840" }}>
              Voir toutes les offres assurance →
            </Link>
          </div>
        </section>

        {/* Types d'assurance */}
        <section id="types" className="mb-16">
          <h2 className="text-2xl font-extrabold mb-3" style={{ color: "var(--color-text)" }}>
            🛡️ Les 4 types d&apos;assurance en Guinée
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {TYPES.map((t) => (
              <div key={t.icon} className="p-5 rounded-2xl border"
                style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}>
                <span className="text-2xl mb-3 block">{t.icon}</span>
                <p className="font-bold text-sm mb-1" style={{ color: "var(--color-text)" }}>{t.title}</p>
                <p className="text-xs leading-relaxed" style={{ color: "var(--color-muted)" }}>{t.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Comment choisir */}
        <section id="comment" className="mb-16">
          <h2 className="text-2xl font-extrabold mb-3" style={{ color: "var(--color-text)" }}>
            📋 Comment choisir son assurance en Guinée ?
          </h2>
          <div className="space-y-4">
            {STEPS.map((step) => (
              <div key={step.n} className="flex items-start gap-5 p-5 rounded-2xl border"
                style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-extrabold text-white shrink-0"
                  style={{ backgroundColor: "#B02840" }}>
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
            <Link href="/assurances/guides/choisir-assurance/"
              className="inline-flex items-center gap-2 text-sm font-semibold"
              style={{ color: "#B02840" }}>
              📖 Guide complet : choisir son assurance en Guinée →
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mb-16">
          <h2 className="text-2xl font-extrabold mb-6" style={{ color: "var(--color-text)" }}>
            ❓ Questions fréquentes sur les assurances en Guinée
          </h2>
          <div className="space-y-3">
            {[
              { q: "Quelle est la meilleure assurance en Guinée ?", a: "NSIA Assurances (HP Score A, 86/100) est le leader du marché guinéen. UGAR-Activa excelle en auto. SUNU est la référence pour l'assurance vie." },
              { q: "L'assurance auto est-elle obligatoire en Guinée ?", a: "Oui, la RC auto est obligatoire pour tout véhicule en circulation, conformément à la réglementation CIMA." },
              { q: "Comment déclarer un sinistre en Guinée ?", a: "Contactez votre compagnie dans les 48h. Fournissez le constat amiable, photos et numéro de police. La plupart ont un service sinistres à Conakry." },
              { q: "Quelle assurance santé choisir en Guinée ?", a: "NSIA Santé et SUNU proposent les meilleures couvertures. Pour les entreprises, un contrat groupe est souvent plus avantageux." },
              { q: "Les primes d'assurance sont-elles chères en Guinée ?", a: "La RC auto de base part d'environ 150 000 GNF/an. La santé individuelle coûte 500 000 à 2 000 000 GNF/an selon la couverture. Demandez toujours plusieurs devis." },
            ].map(({ q, a }) => (
              <details key={q} className="group rounded-2xl border overflow-hidden"
                style={{ borderColor: "var(--color-border)" }}>
                <summary className="flex items-center justify-between px-6 py-4 cursor-pointer list-none font-semibold text-sm"
                  style={{ backgroundColor: "var(--color-card)", color: "var(--color-text)" }}>
                  {q}
                  <span className="ml-3 shrink-0 font-bold text-xl" style={{ color: "#B02840" }}>+</span>
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
          style={{ background: "linear-gradient(135deg, #7B1A2E 0%, #B02840 100%)" }}>
          <p className="text-2xl font-extrabold text-white mb-2">Besoin d&apos;un devis gratuit ?</p>
          <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.75)" }}>
            Un conseiller Help&apos;me Process compare les assurances selon votre profil — gratuitement.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "224628935335"}?text=${encodeURIComponent("Bonjour, je cherche la meilleure assurance en Guinée.")}`}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white"
              style={{ backgroundColor: "#25D366" }}>
              💬 WhatsApp gratuit
            </a>
            <Link href="/assurances/comparateur/"
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white border border-white/30 hover:bg-white/10">
              📊 Comparateur assurances
            </Link>
          </div>
        </div>

      </div>

      <ReviewsSection />
    </>
  )
}
