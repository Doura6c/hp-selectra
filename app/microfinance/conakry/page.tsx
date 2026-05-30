import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, MapPin, MessageCircle, Phone } from "lucide-react"
import { PROVIDERS } from "@/lib/data/seed-data"
import ReviewsSection from "@/components/ui/ReviewsSection"
import ProviderCard from "@/components/compare/ProviderCard"
import { buildJsonLd, faqSchema, breadcrumbSchema } from "@/lib/schema"

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "224628935335"
const CC_PHONE  = process.env.NEXT_PUBLIC_CC_PHONE        ?? "224628935335"

const MF_COLOR = "#6B8F3C"
const MF_DARK  = "#4E6A2C"

export const metadata: Metadata = {
  title: "Microfinance à Conakry 2026 — Micro-crédits, épargne, IMF | HP Selectra",
  description:
    "Comparez les institutions de microfinance à Conakry : CRG-SA, Finafrica, Akiba Finance, CAFODEC. Micro-crédit agricole, commerce, PME. Demande gratuite.",
  keywords: ["microfinance Conakry", "micro-crédit Conakry", "CRG-SA Conakry", "Finafrica Conakry", "IMF Guinée"],
}

const MF_PROVIDERS = PROVIDERS.filter((p) => p.verticalSlug === "microfinance")
  .sort((a, b) => b.hpScoreNum - a.hpScoreNum)

const AGENCES_CONAKRY = [
  { imf: "CRG-SA",    nb: "8+",  zones: "Kaloum, Ratoma, Matam, Dixinn, Matoto, Coyah", specialite: "Micro-crédit agricole + commerce" },
  { imf: "Finafrica", nb: "3+",  zones: "Kaloum, Ratoma, Kipé",                          specialite: "Crédit PME + équipement" },
  { imf: "Akiba",     nb: "3+",  zones: "Kaloum, Ratoma, Cosa",                          specialite: "Épargne + crédit solidaire" },
  { imf: "CAFODEC",   nb: "2+",  zones: "Ratoma, Matoto",                                specialite: "Crédit communautaire + femmes" },
]

export default function MicrofinanceConakryPage() {
  const jsonLdFaq = buildJsonLd(faqSchema([
    {
      question: "Quelle est la meilleure institution de microfinance à Conakry ?",
      answer: "La CRG-SA (HP Score A/82) est la plus présente à Conakry avec 8+ caisses et agences. Finafrica est recommandée pour les entrepreneurs et PME. Akiba Finance et CAFODEC conviennent aux groupements féminins et ménages à faibles revenus.",
    },
    {
      question: "Comment obtenir un micro-crédit à Conakry ?",
      answer: "Rendez-vous dans l'agence ou caisse de l'IMF choisie avec votre pièce d'identité et justificatif d'activité. Le délai de déblocage est de 5 à 15 jours ouvrables selon le montant. Vous pouvez aussi contacter nos conseillers pour être orienté gratuitement.",
    },
    {
      question: "Quel montant peut-on emprunter à Conakry en microfinance ?",
      answer: "À Conakry, les montants vont de 100 000 GNF (premier crédit CAFODEC) à 100 000 000 GNF (crédit équipement Finafrica). Pour un premier crédit commerce, comptez entre 300 000 et 3 000 000 GNF selon l'institution. Ces montants sont indicatifs.",
    },
    {
      question: "Où trouver les agences de microfinance à Conakry ?",
      answer: "La CRG-SA dispose d'agences dans toutes les communes de Conakry (Kaloum, Ratoma, Matam, Dixinn, Matoto). Finafrica et Akiba sont principalement à Kaloum et Ratoma. CAFODEC se concentre sur Ratoma et Matoto. Nos conseillers peuvent vous indiquer l'agence la plus proche.",
    },
  ]))

  const jsonLdBreadcrumb = buildJsonLd(breadcrumbSchema([
    { name: "Accueil", href: "/" },
    { name: "Microfinance", href: "/microfinance/" },
    { name: "Conakry" },
  ]))

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdFaq }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdBreadcrumb }} />

      {/* Hero */}
      <section className="py-12 sm:py-16"
        style={{ background: `linear-gradient(135deg, ${MF_DARK} 0%, ${MF_COLOR} 100%)` }}>
        <div className="container max-w-3xl">
          <nav className="flex items-center gap-1.5 text-xs mb-5" style={{ color: "rgba(255,255,255,0.5)" }}>
            <Link href="/" className="hover:text-white">Accueil</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/microfinance/" className="hover:text-white">Microfinance</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">Conakry</span>
          </nav>
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-5 h-5 text-white/70" />
            <span className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.7)" }}>
              Conakry — Capitale économique de Guinée
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3 leading-tight">
            Microfinance à Conakry {new Date().getFullYear()}
          </h1>
          <p className="text-base mb-6" style={{ color: "rgba(255,255,255,0.8)" }}>
            Comparez les IMF à Conakry : CRG-SA, Finafrica, Akiba Finance, CAFODEC.
            Micro-crédit agricole, commerce, PME, épargne — demande gratuite en 2 minutes.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/microfinance/comparateur/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold"
              style={{ backgroundColor: "#fff", color: MF_COLOR }}>
              Comparer toutes les offres →
            </Link>
            <a href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Bonjour, je cherche un micro-crédit à Conakry. Pouvez-vous m'aider ?")}`}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white border border-white/30">
              <MessageCircle className="w-4 h-4" /> Demande gratuite
            </a>
          </div>
          <div className="mt-8 grid grid-cols-3 gap-4 max-w-sm">
            {[
              { val: `${MF_PROVIDERS.length}`, label: "Institutions" },
              { val: "16+",  label: "Agences Conakry" },
              { val: "Gratuit", label: "Conseil HP" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-xl font-extrabold text-white">{s.val}</p>
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.65)" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container py-10 sm:py-14 max-w-4xl">

        {/* Institutions présentes à Conakry */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-2" style={{ color: "var(--color-text)" }}>
            🏆 Institutions de microfinance à Conakry
          </h2>
          <p className="text-sm mb-6" style={{ color: "var(--color-muted)" }}>
            Classées par HP Score — note indépendante basée sur réseau, conditions de crédit et fiabilité.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {MF_PROVIDERS.map((p) => (
              <ProviderCard key={p.slug} provider={p} verticalSlug="microfinance" />
            ))}
          </div>
        </section>

        {/* Agences par commune */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-5" style={{ color: "var(--color-text)" }}>
            📍 Agences et caisses à Conakry par commune
          </h2>
          <div className="rounded-2xl border overflow-hidden" style={{ borderColor: "var(--color-border)" }}>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ backgroundColor: "var(--color-surface)" }}>
                  {["Institution", "Nb d'agences", "Communes couvertes", "Spécialité"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold" style={{ color: "var(--color-muted)" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {AGENCES_CONAKRY.map((row, i) => (
                  <tr key={row.imf}
                    style={{ backgroundColor: i % 2 === 0 ? "var(--color-card)" : "var(--color-surface)", borderTop: "1px solid var(--color-border)" }}>
                    <td className="px-4 py-3 font-semibold text-xs" style={{ color: "var(--color-text)" }}>{row.imf}</td>
                    <td className="px-4 py-3 text-xs font-bold" style={{ color: MF_COLOR }}>{row.nb}</td>
                    <td className="px-4 py-3 text-xs" style={{ color: "var(--color-muted)" }}>{row.zones}</td>
                    <td className="px-4 py-3 text-xs" style={{ color: "var(--color-muted)" }}>{row.specialite}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs mt-2" style={{ color: "var(--color-muted)" }}>
            * Données indicatives. Vérifiez directement auprès de chaque institution pour les adresses exactes.
          </p>
        </section>

        {/* Types de financement */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-5" style={{ color: "var(--color-text)" }}>
            🤝 Trouver votre financement à Conakry
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { cat: "microcredit",       icon: "💰", label: "Micro-crédits",   sub: "Agricole, commerce, solidaire" },
              { cat: "credit-pme",        icon: "🏢", label: "Crédits PME",     sub: "Fonds de roulement, investissement" },
              { cat: "credit-equipement", icon: "⚙️", label: "Équipement",      sub: "Machines, véhicules" },
              { cat: "epargne",           icon: "🏦", label: "Épargne",          sub: "Comptes sécurisés" },
              { cat: "credit-femmes",     icon: "👩‍💼", label: "Crédit Femmes",  sub: "Groupements féminins" },
              { cat: "credit-agricole",   icon: "🌾", label: "Agricole",         sub: "Semences, intrants" },
            ].map(({ cat, icon, label, sub }) => (
              <Link key={cat} href={`/microfinance/comparateur/?categorie=${cat}`}
                className="flex items-center gap-3 p-4 rounded-2xl border hover:shadow-md transition-shadow"
                style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}>
                <span className="text-2xl">{icon}</span>
                <div>
                  <p className="text-sm font-bold" style={{ color: "var(--color-text)" }}>{label}</p>
                  <p className="text-xs" style={{ color: "var(--color-muted)" }}>{sub}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-5" style={{ color: "var(--color-text)" }}>
            ❓ Questions fréquentes — Microfinance à Conakry
          </h2>
          <div className="space-y-3">
            {[
              {
                q: "Quelle est la meilleure institution de microfinance à Conakry ?",
                a: "La CRG-SA (HP Score A/82) est la plus présente avec 8+ caisses. Finafrica est la meilleure pour les PME et entrepreneurs. Akiba Finance et CAFODEC conviennent aux groupements féminins et ménages modestes.",
              },
              {
                q: "Comment obtenir un micro-crédit à Conakry ?",
                a: "Rendez-vous dans l'agence de l'IMF choisie avec votre CNI et justificatif d'activité. Le délai est de 5 à 15 jours. Nos conseillers peuvent vous orienter gratuitement.",
              },
              {
                q: "Quel montant peut-on emprunter à Conakry en microfinance ?",
                a: "De 100 000 GNF (premier crédit CAFODEC) à 100 000 000 GNF (crédit équipement Finafrica). Un premier crédit commerce : 300 000 à 3 000 000 GNF selon l'IMF. Prix indicatifs — demandez un devis personnalisé.",
              },
              {
                q: "Où trouver les agences à Conakry ?",
                a: "CRG-SA couvre toutes les communes (Kaloum, Ratoma, Matam, Dixinn, Matoto). Finafrica et Akiba sont à Kaloum et Ratoma principalement. CAFODEC se concentre sur Ratoma et Matoto.",
              },
            ].map(({ q, a }) => (
              <details key={q} className="rounded-2xl border overflow-hidden" style={{ borderColor: "var(--color-border)" }}>
                <summary className="flex items-center justify-between px-5 py-4 cursor-pointer list-none font-semibold text-sm"
                  style={{ backgroundColor: "var(--color-card)", color: "var(--color-text)" }}>
                  {q}
                  <span className="ml-3 shrink-0 font-bold text-xl" style={{ color: MF_COLOR }}>+</span>
                </summary>
                <div className="px-5 py-4 text-sm leading-relaxed"
                  style={{ backgroundColor: "var(--color-surface)", color: "var(--color-muted)" }}>{a}</div>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-10"
          style={{ background: `linear-gradient(135deg, ${MF_DARK}, ${MF_COLOR})` }}>
          <div className="flex-1">
            <p className="text-white font-bold text-lg mb-1">Demande de micro-crédit gratuite à Conakry</p>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.8)" }}>
              Nos conseillers Help&apos;me Process comparent les IMF pour vous et vous obtiennent
              les meilleures conditions — sans engagement, 100 % gratuit.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Bonjour, je cherche un micro-crédit à Conakry.")}`}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-white text-sm"
              style={{ backgroundColor: "#25D366" }}>
              <MessageCircle className="w-4 h-4" /> WhatsApp
            </a>
            <a href={`tel:${CC_PHONE}`}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border border-white/40 text-white">
              <Phone className="w-4 h-4" /> Rappel gratuit
            </a>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-6 border-t" style={{ borderColor: "var(--color-border)" }}>
          <Link href="/microfinance/" className="text-sm font-semibold flex items-center gap-1"
            style={{ color: "var(--color-primary)" }}>
            ← Retour Microfinance
          </Link>
          <Link href="/microfinance/comparateur/" className="text-sm font-semibold flex items-center gap-1"
            style={{ color: MF_COLOR }}>
            Comparer toutes les offres →
          </Link>
        </div>

      </div>

      <ReviewsSection />
    </>
  )
}
