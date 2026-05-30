import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, MapPin, MessageCircle, Phone } from "lucide-react"
import { PROVIDERS } from "@/lib/data/seed-data"
import ReviewsSection from "@/components/ui/ReviewsSection"
import ProviderCard from "@/components/compare/ProviderCard"
import { buildJsonLd, faqSchema, breadcrumbSchema } from "@/lib/schema"

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "224628935335"
const CC_PHONE  = process.env.NEXT_PUBLIC_CC_PHONE        ?? "224628935335"

const ASSURANCE_COLOR = "#B02840"
const ASSURANCE_DARK  = "#7B1A2E"

export const metadata: Metadata = {
  title: "Meilleures assurances à Conakry 2026 — Comparatif RC auto, santé | HP Selectra",
  description:
    "Comparez les compagnies d'assurance à Conakry : NSIA, UGAR-Activa, SUNU, Lanala. RC auto obligatoire, assurance santé, habitation. Devis gratuit.",
  keywords: ["assurance Conakry", "RC auto Conakry", "assurance voiture Conakry", "NSIA Conakry", "UGAR Conakry", "assurance Guinée"],
}

const ASSURANCE_PROVIDERS = PROVIDERS.filter((p) => p.verticalSlug === "assurances")
  .sort((a, b) => b.hpScoreNum - a.hpScoreNum)

const AGENCES_CONAKRY = [
  {
    compagnie: "NSIA Assurances",
    nb: "5+",
    zones: "Kaloum, Ratoma, Matam, Dixinn",
    specialite: "RC auto + Santé + Vie",
  },
  {
    compagnie: "UGAR-Activa",
    nb: "4+",
    zones: "Kaloum, Ratoma, Almamya",
    specialite: "Auto tous risques + Habitation",
  },
  {
    compagnie: "SUNU Assurances",
    nb: "3+",
    zones: "Kaloum, Matam, Kipé",
    specialite: "RC auto + Santé famille",
  },
  {
    compagnie: "Lanala",
    nb: "3+",
    zones: "Kaloum, Ratoma, Cosa",
    specialite: "RC auto + Vie & épargne",
  },
]

export default function AssurancesConakryPage() {
  const jsonLdFaq = buildJsonLd(faqSchema([
    {
      question: "Quelle est la meilleure compagnie d'assurance à Conakry ?",
      answer: "NSIA Assurances (HP Score A, 86/100) est la compagnie la mieux notée à Conakry, avec plusieurs agences dans les principales communes. UGAR-Activa (A, 80/100) est recommandée pour l'assurance auto tous risques. Comparez sur notre comparateur pour trouver la mieux adaptée à vos besoins.",
    },
    {
      question: "Comment obtenir une assurance RC auto à Conakry ?",
      answer: "Rendez-vous dans l'une des agences NSIA, UGAR-Activa, SUNU ou Lanala à Conakry avec votre carte grise et pièce d'identité. Vous pouvez aussi demander un devis gratuit via WhatsApp ou appeler nos conseillers. L'attestation est généralement délivrée le jour même.",
    },
    {
      question: "Quel est le tarif d'une RC auto à Conakry ?",
      answer: "Le tarif RC auto à Conakry dépend du type de véhicule et de la compagnie. À titre indicatif, les tarifs démarrent autour de 150 000 à 300 000 GNF par an pour un véhicule particulier. Ces prix sont des exemples — demandez un devis personnalisé pour avoir le tarif exact.",
    },
    {
      question: "Où trouver les agences d'assurance à Conakry ?",
      answer: "Les principales agences d'assurance à Conakry se trouvent dans les communes de Kaloum (centre-ville), Ratoma, Matam et Dixinn. NSIA, UGAR-Activa, SUNU et Lanala ont toutes des agences dans plusieurs quartiers. Nos conseillers peuvent vous indiquer l'agence la plus proche.",
    },
  ]))

  const jsonLdBreadcrumb = buildJsonLd(breadcrumbSchema([
    { name: "Accueil", href: "/" },
    { name: "Assurances", href: "/assurances/" },
    { name: "Conakry" },
  ]))

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdFaq }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdBreadcrumb }} />

      {/* Hero */}
      <section className="py-12 sm:py-16"
        style={{ background: `linear-gradient(135deg, ${ASSURANCE_DARK} 0%, ${ASSURANCE_COLOR} 100%)` }}>
        <div className="container max-w-3xl">
          <nav className="flex items-center gap-1.5 text-xs mb-5" style={{ color: "rgba(255,255,255,0.5)" }}>
            <Link href="/" className="hover:text-white">Accueil</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/assurances/" className="hover:text-white">Assurances</Link>
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
            Meilleures assurances à Conakry {new Date().getFullYear()}
          </h1>
          <p className="text-base mb-6" style={{ color: "rgba(255,255,255,0.8)" }}>
            Comparez les compagnies d&apos;assurance à Conakry : NSIA, UGAR-Activa, SUNU, Lanala.
            RC auto obligatoire, assurance santé, habitation et vie — devis gratuit en 2 minutes.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/assurances/comparateur/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold"
              style={{ backgroundColor: "#fff", color: ASSURANCE_COLOR }}>
              Comparer toutes les offres →
            </Link>
            <a href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Bonjour, je cherche une assurance à Conakry. Pouvez-vous m'aider ?")}`}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white border border-white/30">
              <MessageCircle className="w-4 h-4" /> Devis gratuit
            </a>
          </div>
          <div className="mt-8 grid grid-cols-3 gap-4 max-w-sm">
            {[
              { val: `${ASSURANCE_PROVIDERS.length}`, label: "Compagnies" },
              { val: "15+",    label: "Agences à Conakry" },
              { val: "Gratuit", label: "Devis HP" },
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

        {/* RC Auto obligatoire */}
        <div className="flex items-start gap-3 p-4 rounded-2xl border mb-10"
          style={{ backgroundColor: "#FFF8E1", borderColor: "#F0A500" }}>
          <span className="text-xl shrink-0">⚠️</span>
          <div>
            <p className="font-semibold text-sm" style={{ color: "var(--color-text)" }}>
              RC Auto obligatoire à Conakry
            </p>
            <p className="text-xs mt-1" style={{ color: "var(--color-muted)" }}>
              Tout véhicule circulant à Conakry doit obligatoirement disposer d&apos;une assurance RC auto.
              Des contrôles fréquents sont effectués. L&apos;attestation doit être présente dans le véhicule à tout moment.
            </p>
          </div>
        </div>

        {/* Compagnies présentes à Conakry */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-2" style={{ color: "var(--color-text)" }}>
            🏆 Compagnies d&apos;assurance à Conakry
          </h2>
          <p className="text-sm mb-6" style={{ color: "var(--color-muted)" }}>
            Classées par HP Score — note indépendante basée sur solidité financière, réseau, et qualité sinistre.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {ASSURANCE_PROVIDERS.map((p) => (
              <ProviderCard key={p.slug} provider={p} verticalSlug="assurances" />
            ))}
          </div>
        </section>

        {/* Agences Conakry */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-5" style={{ color: "var(--color-text)" }}>
            📍 Agences d&apos;assurance à Conakry par commune
          </h2>
          <div className="rounded-2xl border overflow-hidden" style={{ borderColor: "var(--color-border)" }}>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ backgroundColor: "var(--color-surface)" }}>
                  {["Compagnie", "Nb d'agences", "Communes couvertes", "Spécialité"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold" style={{ color: "var(--color-muted)" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {AGENCES_CONAKRY.map((row, i) => (
                  <tr key={row.compagnie}
                    style={{ backgroundColor: i % 2 === 0 ? "var(--color-card)" : "var(--color-surface)", borderTop: "1px solid var(--color-border)" }}>
                    <td className="px-4 py-3 font-semibold text-xs" style={{ color: "var(--color-text)" }}>{row.compagnie}</td>
                    <td className="px-4 py-3 text-xs font-bold" style={{ color: ASSURANCE_COLOR }}>{row.nb}</td>
                    <td className="px-4 py-3 text-xs" style={{ color: "var(--color-muted)" }}>{row.zones}</td>
                    <td className="px-4 py-3 text-xs" style={{ color: "var(--color-muted)" }}>{row.specialite}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs mt-2" style={{ color: "var(--color-muted)" }}>
            * Données indicatives. Le nombre d&apos;agences peut varier. Vérifiez directement auprès de chaque compagnie.
          </p>
        </section>

        {/* Types d'assurance à Conakry */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-5" style={{ color: "var(--color-text)" }}>
            🛡️ Trouver votre assurance à Conakry
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { cat: "rc-auto",       icon: "🚗", label: "RC Auto",       sub: "Obligatoire à Conakry" },
              { cat: "tous-risques",  icon: "🛡️", label: "Tous risques",  sub: "Protection complète véhicule" },
              { cat: "sante",         icon: "🏥", label: "Santé",          sub: "Individuel & famille" },
              { cat: "habitation",    icon: "🏠", label: "Habitation",     sub: "Locataire & propriétaire" },
              { cat: "vie",           icon: "💚", label: "Vie & Épargne",  sub: "Prévoyance retraite" },
              { cat: "professionnel", icon: "💼", label: "Professionnel",  sub: "Entreprises & PME" },
            ].map(({ cat, icon, label, sub }) => (
              <Link
                key={cat}
                href={`/assurances/comparateur/?categorie=${cat}`}
                className="flex items-center gap-3 p-4 rounded-2xl border hover:shadow-md transition-shadow"
                style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}
              >
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
            ❓ Questions fréquentes — Assurance à Conakry
          </h2>
          <div className="space-y-3">
            {[
              {
                q: "Quelle est la meilleure compagnie d'assurance à Conakry ?",
                a: "NSIA Assurances (HP Score A, 86/100) est la compagnie la mieux notée à Conakry, avec plusieurs agences dans les principales communes. UGAR-Activa (A, 80/100) est recommandée pour l'assurance auto tous risques. Comparez sur notre comparateur pour trouver celle qui correspond à vos besoins.",
              },
              {
                q: "Comment obtenir une assurance RC auto à Conakry ?",
                a: "Rendez-vous dans l'une des agences NSIA, UGAR-Activa, SUNU ou Lanala à Conakry avec votre carte grise et pièce d'identité. Vous pouvez aussi demander un devis gratuit via WhatsApp. L'attestation est généralement délivrée le jour même.",
              },
              {
                q: "Quel est le tarif d'une RC auto à Conakry ?",
                a: "À titre indicatif, les tarifs RC auto démarrent autour de 150 000 à 300 000 GNF par an pour un véhicule particulier. Ces tarifs sont des exemples à vérifier — ils dépendent du type et de la puissance du véhicule. Demandez un devis personnalisé gratuit.",
              },
              {
                q: "Où trouver les agences d'assurance à Conakry ?",
                a: "Les principales agences se trouvent dans les communes de Kaloum (centre-ville, près du port), Ratoma, Matam et Dixinn. NSIA, UGAR-Activa, SUNU et Lanala ont des agences dans plusieurs quartiers. Nos conseillers peuvent vous indiquer l'agence la plus proche de chez vous.",
              },
            ].map(({ q, a }) => (
              <details key={q} className="rounded-2xl border overflow-hidden" style={{ borderColor: "var(--color-border)" }}>
                <summary className="flex items-center justify-between px-5 py-4 cursor-pointer list-none font-semibold text-sm"
                  style={{ backgroundColor: "var(--color-card)", color: "var(--color-text)" }}>
                  {q}
                  <span className="ml-3 shrink-0 font-bold text-xl" style={{ color: ASSURANCE_COLOR }}>+</span>
                </summary>
                <div className="px-5 py-4 text-sm leading-relaxed"
                  style={{ backgroundColor: "var(--color-surface)", color: "var(--color-muted)" }}>{a}</div>
              </details>
            ))}
          </div>
        </section>

        {/* CTA Devis */}
        <div className="rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-10"
          style={{ background: `linear-gradient(135deg, ${ASSURANCE_DARK}, ${ASSURANCE_COLOR})` }}>
          <div className="flex-1">
            <p className="text-white font-bold text-lg mb-1">Devis assurance gratuit à Conakry</p>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.8)" }}>
              Nos conseillers Help&apos;me Process comparent les offres pour vous et vous obtiennent
              le meilleur tarif — sans engagement, 100 % gratuit.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Bonjour, je cherche une assurance à Conakry.")}`}
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
          <Link href="/assurances/" className="text-sm font-semibold flex items-center gap-1"
            style={{ color: "var(--color-primary)" }}>
            ← Retour Assurances
          </Link>
          <Link href="/assurances/comparateur/" className="text-sm font-semibold flex items-center gap-1"
            style={{ color: ASSURANCE_COLOR }}>
            Comparer toutes les offres →
          </Link>
        </div>

      </div>

      <ReviewsSection />
    </>
  )
}
