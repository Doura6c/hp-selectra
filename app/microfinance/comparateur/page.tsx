import type { Metadata } from "next"
import Link from "next/link"
import { PROVIDERS, OFFERS } from "@/lib/data/seed-data"
import ProviderFilters from "@/components/compare/ProviderFilters"
import { breadcrumbSchema, faqSchema, buildJsonLd } from "@/lib/schema"
import { Phone, MessageCircle, ChevronRight } from "lucide-react"
import ReviewsSection from "@/components/ui/ReviewsSection"

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "224628935335"
const CC_PHONE  = process.env.NEXT_PUBLIC_CC_PHONE        ?? "224628935335"

const MF_COLOR = "#6B8F3C"
const MF_DARK  = "#4E6A2C"

export const metadata: Metadata = {
  title: "Comparateur microfinance Guinée 2026 — Micro-crédits, PME, épargne | HP Selectra",
  description:
    "Comparez les offres de microfinance en Guinée : micro-crédit agricole, crédit PME, équipement, épargne. CRG-SA, Finafrica, Akiba Finance, CAFODEC. HP Score indépendant.",
}

const IMFS = PROVIDERS.filter((p) => p.verticalSlug === "microfinance")
  .sort((a, b) => b.hpScoreNum - a.hpScoreNum)

const MF_OFFERS = OFFERS.filter((o) => o.verticalSlug === "microfinance")

const PROFILES = [
  { icon: "🌾", label: "Agriculteur",        imfs: ["Crédit Rural de Guinée (CRG-SA)"],                    reason: "Micro-crédit agricole adapté aux récoltes" },
  { icon: "🛍️", label: "Petit commerçant",   imfs: ["Crédit Rural de Guinée (CRG-SA)", "Akiba Finance"],   reason: "Crédit commerce rapide, faible montant" },
  { icon: "🏢", label: "Chef d'entreprise",  imfs: ["Finafrica Microfinance"],                              reason: "Crédit PME jusqu'à 50M GNF + accompagnement" },
  { icon: "👩‍💼", label: "Femme entrepreneur", imfs: ["CAFODEC", "Akiba Finance"],                          reason: "Crédit solidaire, groupement féminin" },
]

const SCORE_COLOR: Record<string, string> = {
  A: "#6B8F3C", B: "#2E86C1", C: "#E67E22", D: "#e74c3c", E: "#95a5a6",
}

export default function MicrofinanceComparateurPage() {
  const jsonLdBreadcrumb = buildJsonLd(breadcrumbSchema([
    { name: "Accueil", href: "/" },
    { name: "Microfinance", href: "/microfinance/" },
    { name: "Comparateur" },
  ]))
  const jsonLdFaq = buildJsonLd(faqSchema([
    {
      question: "Quelle est la meilleure institution de microfinance en Guinée en 2026 ?",
      answer: "La Crédit Rural de Guinée (CRG-SA) obtient le meilleur HP Score (A/82) avec son réseau de 100+ caisses locales et ses produits adaptés aux ménages ruraux. Finafrica est recommandée pour les PME, Akiba et CAFODEC pour les groupements féminins.",
    },
    {
      question: "Comment obtenir un micro-crédit en Guinée ?",
      answer: "Rendez-vous dans la caisse ou agence de l'IMF choisie avec votre pièce d'identité et justificatif d'activité. Pour les crédits solidaires, constituez un groupe de 5 à 10 personnes. Le déblocage prend généralement 5 à 15 jours ouvrables selon le montant.",
    },
    {
      question: "Quel montant peut-on emprunter en microfinance en Guinée ?",
      answer: "Les montants varient de 100 000 GNF (CAFODEC, premier crédit) à 100 000 000 GNF (Finafrica, crédit équipement PME). Pour un premier micro-crédit, les montants sont généralement entre 200 000 et 2 000 000 GNF selon l'institution.",
    },
    {
      question: "La microfinance est-elle réglementée en Guinée ?",
      answer: "Oui. Les institutions de microfinance en Guinée sont supervisées par la BCRG (Banque Centrale de la République de Guinée) conformément à la réglementation UMOA/CEDEAO applicable aux SFD (Systèmes Financiers Décentralisés).",
    },
  ]))

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdBreadcrumb }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdFaq }} />

      {/* Hero */}
      <section className="relative overflow-hidden py-14 sm:py-20"
        style={{ background: `linear-gradient(135deg, ${MF_DARK} 0%, ${MF_COLOR} 100%)` }}>
        <div className="absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage: "repeating-linear-gradient(45deg,#fff 0,#fff 1px,transparent 0,transparent 50%)", backgroundSize: "24px 24px" }} />
        <div className="container relative">
          <nav className="flex items-center gap-1.5 text-xs mb-6" style={{ color: "rgba(255,255,255,0.5)" }}>
            <Link href="/" className="hover:text-white">Accueil</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/microfinance/" className="hover:text-white">Microfinance</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">Comparateur</span>
          </nav>
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold mb-5"
                style={{ backgroundColor: "rgba(255,255,255,0.15)", color: "#fff" }}>
                🤝 {IMFS.length} institutions · {MF_OFFERS.length} offres analysées
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 leading-tight">
                Comparez les offres<br />de microfinance en Guinée
              </h1>
              <p className="text-base mb-6" style={{ color: "rgba(255,255,255,0.8)" }}>
                Micro-crédit agricole, crédit PME, équipement, épargne — classement indépendant HP Score.
                Tous les tarifs sont indicatifs ; nos conseillers obtiennent des conditions précises gratuitement.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Bonjour, je cherche un micro-crédit en Guinée. Pouvez-vous m'aider ?")}`}
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white"
                  style={{ backgroundColor: "#25D366" }}>
                  <MessageCircle className="w-4 h-4" /> Conseil gratuit WhatsApp
                </a>
                <a href={`tel:${CC_PHONE}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white border border-white/30">
                  <Phone className="w-4 h-4" /> Être rappelé
                </a>
              </div>
            </div>
            {/* Mini-classement */}
            <div className="hidden lg:block">
              <div className="rounded-2xl overflow-hidden shadow-xl" style={{ backgroundColor: "rgba(255,255,255,0.08)" }}>
                <div className="px-5 py-3 border-b" style={{ borderColor: "rgba(255,255,255,0.12)" }}>
                  <p className="text-white text-xs font-bold uppercase tracking-wider">Classement HP Score 2026</p>
                </div>
                {IMFS.slice(0, 4).map((imf, i) => (
                  <div key={imf.slug} className="flex items-center gap-4 px-5 py-3 border-b last:border-0"
                    style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                    <span className="text-xl font-extrabold" style={{ color: "rgba(255,255,255,0.3)", minWidth: 28 }}>
                      #{i + 1}
                    </span>
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold text-white shrink-0"
                      style={{ backgroundColor: imf.brandColor ?? "#6B8F3C" }}>
                      {imf.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-semibold truncate">{imf.name}</p>
                    </div>
                    <div className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-sm font-extrabold text-white"
                      style={{ backgroundColor: SCORE_COLOR[imf.hpScore] ?? "#888" }}>
                      {imf.hpScore}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ancres catégories */}
      <div className="sticky top-16 z-30 border-b overflow-x-auto"
        style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}>
        <div className="container flex items-center gap-1 py-2 min-w-max">
          {[
            { id: "microcredit",       label: "💰 Micro-crédits" },
            { id: "credit-pme",        label: "🏢 Crédits PME" },
            { id: "credit-equipement", label: "⚙️ Équipement" },
            { id: "epargne",           label: "🏦 Épargne" },
            { id: "classement",        label: "🏆 Classement" },
          ].map((a) => (
            <a key={a.id} href={`#${a.id}`}
              className="px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors hover:bg-[#6B8F3C] hover:text-white"
              style={{ color: "var(--color-muted)" }}>
              {a.label}
            </a>
          ))}
        </div>
      </div>

      <div className="container py-10">

        {/* Micro-crédits */}
        <section id="microcredit" className="mb-14 scroll-mt-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ backgroundColor: "#F1F8E9" }}>💰</div>
            <div>
              <h2 className="text-xl font-bold" style={{ color: "var(--color-text)" }}>Micro-crédits</h2>
              <p className="text-xs" style={{ color: "var(--color-muted)" }}>Agricole, commercial, solidaire — pour ménages et petits commerçants</p>
            </div>
          </div>
          <ProviderFilters
            providers={IMFS}
            offersByProvider={Object.fromEntries(
              IMFS.map((imf) => [
                imf.slug,
                MF_OFFERS.filter((o) => o.providerSlug === imf.slug && o.category === "microcredit"),
              ])
            )}
            verticalSlug="microfinance"
          />
        </section>

        {/* Crédits PME */}
        <section id="credit-pme" className="mb-14 scroll-mt-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ backgroundColor: "#E3F2FD" }}>🏢</div>
            <div>
              <h2 className="text-xl font-bold" style={{ color: "var(--color-text)" }}>Crédits PME</h2>
              <p className="text-xs" style={{ color: "var(--color-muted)" }}>Fonds de roulement et investissement pour petites et moyennes entreprises</p>
            </div>
          </div>
          <ProviderFilters
            providers={IMFS}
            offersByProvider={Object.fromEntries(
              IMFS.map((imf) => [
                imf.slug,
                MF_OFFERS.filter((o) => o.providerSlug === imf.slug && o.category === "credit-pme"),
              ])
            )}
            verticalSlug="microfinance"
          />
        </section>

        {/* Crédit équipement */}
        <section id="credit-equipement" className="mb-14 scroll-mt-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ backgroundColor: "#FFF8E1" }}>⚙️</div>
            <div>
              <h2 className="text-xl font-bold" style={{ color: "var(--color-text)" }}>Crédit Équipement</h2>
              <p className="text-xs" style={{ color: "var(--color-muted)" }}>Financement de machines, véhicules utilitaires et matériel professionnel</p>
            </div>
          </div>
          <ProviderFilters
            providers={IMFS}
            offersByProvider={Object.fromEntries(
              IMFS.map((imf) => [
                imf.slug,
                MF_OFFERS.filter((o) => o.providerSlug === imf.slug && o.category === "credit-equipement"),
              ])
            )}
            verticalSlug="microfinance"
          />
        </section>

        {/* Épargne */}
        <section id="epargne" className="mb-14 scroll-mt-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ backgroundColor: "#F3E5F5" }}>🏦</div>
            <div>
              <h2 className="text-xl font-bold" style={{ color: "var(--color-text)" }}>Épargne</h2>
              <p className="text-xs" style={{ color: "var(--color-muted)" }}>Comptes d&apos;épargne sécurisés avec intérêts dans les IMF guinéennes</p>
            </div>
          </div>
          <ProviderFilters
            providers={IMFS}
            offersByProvider={Object.fromEntries(
              IMFS.map((imf) => [
                imf.slug,
                MF_OFFERS.filter((o) => o.providerSlug === imf.slug && o.category === "epargne"),
              ])
            )}
            verticalSlug="microfinance"
          />
        </section>

        {/* Classement */}
        <section id="classement" className="mb-14 scroll-mt-24">
          <h2 className="text-xl font-bold mb-6" style={{ color: "var(--color-text)" }}>
            🏆 Classement HP Score — Toutes institutions
          </h2>
          <div className="rounded-2xl border overflow-hidden" style={{ borderColor: "var(--color-border)" }}>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ backgroundColor: "var(--color-surface)" }}>
                  <th className="text-left px-4 py-3 text-xs font-semibold" style={{ color: "var(--color-muted)" }}>#</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold" style={{ color: "var(--color-muted)" }}>INSTITUTION</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold hidden sm:table-cell" style={{ color: "var(--color-muted)" }}>SPÉCIALITÉ</th>
                  <th className="px-4 py-3 text-xs font-semibold text-center" style={{ color: "var(--color-muted)" }}>HP SCORE</th>
                  <th className="px-4 py-3 text-xs font-semibold text-right" style={{ color: "var(--color-muted)" }}></th>
                </tr>
              </thead>
              <tbody>
                {IMFS.map((imf, i) => (
                  <tr key={imf.slug} className="border-t"
                    style={{ borderColor: "var(--color-border)", backgroundColor: i % 2 === 0 ? "var(--color-card)" : "var(--color-surface)" }}>
                    <td className="px-4 py-3 font-bold text-xs" style={{ color: "var(--color-muted)" }}>#{i + 1}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-bold text-white shrink-0"
                          style={{ backgroundColor: imf.brandColor ?? MF_COLOR }}>
                          {imf.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold text-sm" style={{ color: "var(--color-text)" }}>{imf.name}</p>
                          {imf.tagline && <p className="text-xs truncate max-w-[180px]" style={{ color: "var(--color-muted)" }}>{imf.tagline}</p>}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs hidden sm:table-cell" style={{ color: "var(--color-muted)" }}>
                      {imf.verified ? "✅ Vérifié" : "⏳ En cours"}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="inline-flex w-9 h-9 rounded-full items-center justify-center font-extrabold text-sm text-white"
                        style={{ backgroundColor: SCORE_COLOR[imf.hpScore] ?? "#888" }}>
                        {imf.hpScore}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link href={`/microfinance/fournisseurs/${imf.slug}/`}
                        className="text-xs font-semibold px-3 py-1.5 rounded-lg"
                        style={{ backgroundColor: "var(--color-primary-light)", color: "var(--color-primary)" }}>
                        Voir fiche →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Profils recommandés */}
        <section className="mb-14">
          <h2 className="text-xl font-bold mb-6" style={{ color: "var(--color-text)" }}>
            👤 Quelle IMF selon votre profil ?
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {PROFILES.map((p) => (
              <div key={p.label} className="p-5 rounded-2xl border"
                style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}>
                <p className="font-bold text-sm mb-2" style={{ color: "var(--color-text)" }}>
                  {p.icon} {p.label}
                </p>
                <p className="text-xs mb-2" style={{ color: "var(--color-muted)" }}>{p.reason}</p>
                <div className="flex flex-wrap gap-1">
                  {p.imfs.map((imf) => (
                    <span key={imf} className="text-[11px] px-2 py-0.5 rounded-full font-semibold"
                      style={{ backgroundColor: "#F1F8E9", color: MF_COLOR }}>
                      {imf}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Disclaimer */}
        <div className="p-4 rounded-xl border text-xs mb-10"
          style={{ borderColor: "var(--color-border)", color: "var(--color-muted)", backgroundColor: "var(--color-surface)" }}>
          <strong>⚠️ Avertissement :</strong> Les montants, durées et conditions de crédit présentés dans ce comparateur sont
          indicatifs et basés sur les informations publiques disponibles. Ils sont susceptibles d&apos;évoluer.
          Les IMF supervisées en Guinée sont régulées par la <strong>BCRG</strong>. Consultez directement l&apos;institution
          ou nos conseillers pour un devis personnalisé.
        </div>

        {/* CTA final */}
        <div className="rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-5"
          style={{ background: `linear-gradient(135deg, ${MF_DARK}, ${MF_COLOR})` }}>
          <div className="flex-1">
            <p className="text-white font-bold text-lg mb-1">Besoin d&apos;un micro-crédit en Guinée ?</p>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.8)" }}>
              Nos conseillers Help&apos;me Process identifient la meilleure IMF selon votre situation et vous accompagnent gratuitement.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Bonjour, je cherche un micro-crédit en Guinée.")}`}
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
      </div>

      <ReviewsSection />
    </>
  )
}
