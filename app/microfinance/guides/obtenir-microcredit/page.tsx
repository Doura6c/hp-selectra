import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, MessageCircle, Phone } from "lucide-react"
import ReviewsSection from "@/components/ui/ReviewsSection"
import TableOfContents from "@/components/ui/TableOfContents"
import { buildJsonLd, howToSchema, faqSchema, breadcrumbSchema } from "@/lib/schema"

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "224628935335"
const CC_PHONE  = process.env.NEXT_PUBLIC_CC_PHONE        ?? "224628935335"
const BASE_URL  = "https://hpshop-afrique.vercel.app"

const MF_COLOR = "#6B8F3C"
const MF_DARK  = "#4E6A2C"

export const metadata: Metadata = {
  title: "Comment obtenir un micro-crédit en Guinée 2026 — Guide complet | HP Selectra",
  description:
    "Guide étape par étape pour obtenir un micro-crédit en Guinée : conditions d'éligibilité, documents requis, meilleures IMF. CRG-SA, Finafrica, Akiba, CAFODEC.",
}

const TOC_ITEMS = [
  { id: "intro",    label: "Pourquoi la microfinance en Guinée ?" },
  { id: "etape-1",  label: "1. Identifier le bon produit" },
  { id: "etape-2",  label: "2. Choisir l'institution" },
  { id: "etape-3",  label: "3. Préparer le dossier" },
  { id: "etape-4",  label: "4. Déposer la demande" },
  { id: "etape-5",  label: "5. Déblocage et remboursement" },
  { id: "profils",  label: "Crédits selon votre profil" },
  { id: "faq",      label: "Questions fréquentes" },
]

export default function GuideObtenirMicroCreditPage() {
  const jsonLdHowTo = buildJsonLd(howToSchema({
    name: "Comment obtenir un micro-crédit en Guinée",
    description: "Guide pratique pour accéder à un micro-crédit auprès des institutions de microfinance guinéennes : CRG-SA, Finafrica, Akiba Finance, CAFODEC.",
    url: `${BASE_URL}/microfinance/guides/obtenir-microcredit`,
    totalTime: "PT10M",
    estimatedCost: { currency: "GNF", value: "0" },
    steps: [
      {
        name: "Identifier le type de crédit adapté",
        text: "Choisissez entre micro-crédit agricole (CRG-SA), crédit commerce, crédit solidaire (groupe), crédit PME (Finafrica) ou crédit équipement selon votre activité.",
        url: `${BASE_URL}/microfinance/guides/obtenir-microcredit#etape-1`,
      },
      {
        name: "Choisir la meilleure institution",
        text: "Utilisez le HP Score pour comparer CRG-SA (A/82), Finafrica (B/74), Akiba (B/70) et CAFODEC (C/62) selon le montant souhaité, la durée et votre localisation.",
        url: `${BASE_URL}/microfinance/comparateur`,
      },
      {
        name: "Préparer son dossier de demande",
        text: "Rassemblez pièce d'identité, justificatif d'activité (patente, attestation d'activité), photos d'identité et si requis : un plan d'activité simple pour les crédits PME.",
        url: `${BASE_URL}/microfinance/guides/obtenir-microcredit#etape-3`,
      },
      {
        name: "Déposer la demande à l'agence ou caisse",
        text: "Rendez-vous à la caisse locale ou agence de l'IMF choisie. Remplissez le formulaire de demande et remettez les documents. Un agent de crédit évaluera votre dossier.",
        url: `${BASE_URL}/microfinance/guides/obtenir-microcredit#etape-4`,
      },
      {
        name: "Déblocage et premier remboursement",
        text: "Après approbation (5 à 15 jours), les fonds sont débloqués en caisse ou sur votre compte mobile money. Respectez scrupuleusement le calendrier de remboursement pour accéder à un crédit plus élevé ensuite.",
        url: `${BASE_URL}/microfinance/guides/obtenir-microcredit#etape-5`,
      },
    ],
  }))

  const jsonLdFaq = buildJsonLd(faqSchema([
    {
      question: "Quelle est la meilleure institution de microfinance en Guinée ?",
      answer: "La Crédit Rural de Guinée (CRG-SA) obtient le meilleur HP Score (A/82) avec son réseau de plus de 100 caisses dans tout le pays. Finafrica est la meilleure option pour les PME. Akiba Finance et CAFODEC sont recommandés pour les groupements féminins et ménages à faibles revenus.",
    },
    {
      question: "Quel montant peut-on emprunter en microfinance en Guinée ?",
      answer: "Les montants varient de 100 000 GNF (premier crédit CAFODEC) à 100 000 000 GNF (crédit équipement Finafrica). Pour un premier micro-crédit commerce ou agricole, comptez entre 200 000 et 3 000 000 GNF. Les montants augmentent avec l'historique de remboursement.",
    },
    {
      question: "Quels documents faut-il pour obtenir un micro-crédit en Guinée ?",
      answer: "En général : pièce d'identité nationale (CNI ou passeport), justificatif d'activité économique (patente ou attestation), photos d'identité récentes. Pour les crédits PME et équipement : plan d'activité simple, devis du fournisseur. Pour les crédits solidaires : liste des membres du groupe.",
    },
    {
      question: "La microfinance est-elle sécurisée en Guinée ?",
      answer: "Les institutions de microfinance agréées en Guinée sont supervisées par la BCRG (Banque Centrale de la République de Guinée) et opèrent dans le cadre légal des Systèmes Financiers Décentralisés (SFD). Optez toujours pour une IMF agréée.",
    },
  ]))

  const jsonLdBreadcrumb = buildJsonLd(breadcrumbSchema([
    { name: "Accueil", href: "/" },
    { name: "Microfinance", href: "/microfinance/" },
    { name: "Guides", href: "/microfinance/guides/" },
    { name: "Obtenir un micro-crédit" },
  ]))

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdHowTo }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdFaq }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdBreadcrumb }} />

      {/* Hero */}
      <section className="py-12 sm:py-16" style={{ background: `linear-gradient(135deg, ${MF_DARK} 0%, ${MF_COLOR} 100%)` }}>
        <div className="container max-w-3xl">
          <nav className="flex items-center gap-1.5 text-xs mb-5" style={{ color: "rgba(255,255,255,0.5)" }}>
            <Link href="/" className="hover:text-white">Accueil</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/microfinance/" className="hover:text-white">Microfinance</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">Guide : Obtenir un micro-crédit</span>
          </nav>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold mb-4"
            style={{ backgroundColor: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.9)" }}>
            🤝 Guide complet · Lecture : 10 min
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3 leading-tight">
            Comment obtenir un micro-crédit en Guinée
          </h1>
          <p className="text-base mb-6" style={{ color: "rgba(255,255,255,0.75)" }}>
            CRG-SA, Finafrica, Akiba Finance, CAFODEC : guide complet pour choisir la bonne IMF
            et accéder au financement adapté à votre projet en 5 étapes.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/microfinance/comparateur/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white"
              style={{ backgroundColor: MF_COLOR }}>
              Comparer les IMF →
            </Link>
            <a href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Bonjour, je souhaite obtenir un micro-crédit en Guinée. Pouvez-vous m'aider ?")}`}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white border border-white/30">
              <MessageCircle className="w-4 h-4" /> Conseil gratuit
            </a>
          </div>
        </div>
      </section>

      <div className="container py-12">
        <div className="grid lg:grid-cols-[1fr_280px] gap-10 items-start max-w-5xl mx-auto">

          <article>

            {/* Intro */}
            <section id="intro" className="mb-10 scroll-mt-24">
              <h2 className="text-xl font-extrabold mb-3" style={{ color: "var(--color-text)" }}>
                Pourquoi la microfinance en Guinée ?
              </h2>
              <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--color-text)" }}>
                Avec seulement <strong>23 % de taux de bancarisation</strong>, la Guinée compte sur ses
                institutions de microfinance (IMF) pour financer les agriculteurs, commerçants, femmes entrepreneures
                et PME qui n&apos;ont pas accès au crédit bancaire classique.
                La <strong>BCRG</strong> supervise ces institutions dans le cadre des Systèmes Financiers Décentralisés (SFD).
              </p>
              <div className="p-4 rounded-xl text-sm"
                style={{ backgroundColor: "#F1F8E9", borderLeft: `3px solid ${MF_COLOR}` }}>
                <strong>🤝 À savoir :</strong>
                <span style={{ color: "var(--color-muted)" }}> Un bon historique de remboursement dans une IMF permet
                d&apos;accéder à des montants de crédit progressivement plus élevés — parfois jusqu&apos;à 10× le premier crédit obtenu.</span>
              </div>
            </section>

            {/* Étape 1 */}
            <section id="etape-1" className="mb-10 scroll-mt-24">
              <div className="flex items-center gap-3 mb-4 px-4 py-3 rounded-xl" style={{ backgroundColor: "var(--color-surface)" }}>
                <span className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-extrabold shrink-0"
                  style={{ backgroundColor: MF_COLOR }}>1</span>
                <h2 className="text-lg font-extrabold" style={{ color: "var(--color-text)" }}>
                  Identifier le type de crédit adapté
                </h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { icon: "🌾", type: "Micro-crédit Agricole", desc: "Financement des semences, intrants, engrais et équipements agricoles. Remboursement adapté aux récoltes (6–18 mois).", tag: "Agriculteurs" },
                  { icon: "🛍️", type: "Crédit Commerce",       desc: "Fonds de roulement pour petits commerçants. Montants modestes, remboursement rapide (3–12 mois).", tag: "Commerçants" },
                  { icon: "👥", type: "Crédit Solidaire",      desc: "Crédit collectif pour un groupe de 5 à 10 personnes. Caution mutuelle. Idéal pour les groupements féminins.", tag: "Groupements" },
                  { icon: "🏢", type: "Crédit PME",            desc: "Financement PME de 2M à 50M GNF. Fonds de roulement, investissement. Accompagnement inclus.", tag: "Entrepreneurs" },
                  { icon: "⚙️", type: "Crédit Équipement",    desc: "Achat de machines, véhicules utilitaires, matériel professionnel. Jusqu'à 100M GNF avec apport de 20%.", tag: "PME" },
                  { icon: "🏦", type: "Épargne",               desc: "Pas un crédit, mais un prérequis : l'épargne dans une IMF facilite l'accès au crédit et génère des intérêts.", tag: "Tous" },
                ].map((t) => (
                  <div key={t.type} className="p-4 rounded-xl border text-sm"
                    style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-lg">{t.icon}</span>
                      <p className="font-bold" style={{ color: "var(--color-text)" }}>{t.type}</p>
                      <span className="ml-auto text-[10px] font-semibold px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: "#F1F8E9", color: MF_COLOR }}>{t.tag}</span>
                    </div>
                    <p className="text-xs" style={{ color: "var(--color-muted)" }}>{t.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Étape 2 */}
            <section id="etape-2" className="mb-10 scroll-mt-24">
              <div className="flex items-center gap-3 mb-4 px-4 py-3 rounded-xl" style={{ backgroundColor: "var(--color-surface)" }}>
                <span className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-extrabold shrink-0"
                  style={{ backgroundColor: MF_COLOR }}>2</span>
                <h2 className="text-lg font-extrabold" style={{ color: "var(--color-text)" }}>
                  Choisir la meilleure institution
                </h2>
              </div>
              <div className="rounded-2xl border overflow-hidden mb-4" style={{ borderColor: "var(--color-border)" }}>
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ backgroundColor: "var(--color-surface)" }}>
                      {["IMF", "HP Score", "Meilleur pour", "Montant max"].map((h) => (
                        <th key={h} className="text-left px-4 py-2 text-xs font-semibold" style={{ color: "var(--color-muted)" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["CRG-SA",    "A (82)", "Crédit agricole + rural",    "5 000 000 GNF"],
                      ["Finafrica", "B (74)", "Crédit PME + équipement",   "100 000 000 GNF"],
                      ["Akiba",     "B (70)", "Crédit solidaire + épargne", "2 000 000 GNF"],
                      ["CAFODEC",   "C (62)", "Ménages à faibles revenus",  "1 000 000 GNF"],
                    ].map(([name, score, pour, max], i) => (
                      <tr key={name as string}
                        style={{ backgroundColor: i % 2 === 0 ? "var(--color-card)" : "var(--color-surface)", borderTop: "1px solid var(--color-border)" }}>
                        <td className="px-4 py-2.5 font-semibold text-xs" style={{ color: "var(--color-text)" }}>{name}</td>
                        <td className="px-4 py-2.5 text-xs font-bold" style={{ color: "#6B8F3C" }}>{score}</td>
                        <td className="px-4 py-2.5 text-xs" style={{ color: "var(--color-muted)" }}>{pour}</td>
                        <td className="px-4 py-2.5 text-xs font-semibold" style={{ color: MF_COLOR }}>{max}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Link href="/microfinance/comparateur/"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-white"
                style={{ backgroundColor: MF_COLOR }}>
                Voir le comparateur complet →
              </Link>
            </section>

            {/* Étape 3 */}
            <section id="etape-3" className="mb-10 scroll-mt-24">
              <div className="flex items-center gap-3 mb-4 px-4 py-3 rounded-xl" style={{ backgroundColor: "var(--color-surface)" }}>
                <span className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-extrabold shrink-0"
                  style={{ backgroundColor: MF_COLOR }}>3</span>
                <h2 className="text-lg font-extrabold" style={{ color: "var(--color-text)" }}>
                  Préparer son dossier
                </h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { doc: "🪪 Pièce d'identité",        detail: "CNI ou passeport. Original + 1 photocopie.", required: true },
                  { doc: "📸 Photos d'identité",        detail: "2 photos récentes fond blanc.", required: true },
                  { doc: "📋 Justificatif d'activité",  detail: "Patente, attestation d'activité ou acte de commerce.", required: true },
                  { doc: "📝 Plan d'activité simple",   detail: "Pour les crédits PME : description du projet, chiffre d'affaires estimé.", required: false },
                  { doc: "💰 Apport personnel",         detail: "Souvent 20 % du montant demandé pour les crédits équipement.", required: false },
                  { doc: "👥 Liste du groupe",          detail: "Pour les crédits solidaires : noms, contacts et signatures des membres.", required: false },
                ].map((d) => (
                  <div key={d.doc} className="flex items-start gap-3 p-4 rounded-xl border text-sm"
                    style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}>
                    <span className="text-xl shrink-0">{d.doc.split(" ")[0]}</span>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-bold" style={{ color: "var(--color-text)" }}>{d.doc.substring(d.doc.indexOf(" ") + 1)}</p>
                        <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full"
                          style={{ backgroundColor: d.required ? "#ffebee" : "#e8f5e9", color: d.required ? "#c62828" : "#388e3c" }}>
                          {d.required ? "Obligatoire" : "Selon crédit"}
                        </span>
                      </div>
                      <p className="text-xs" style={{ color: "var(--color-muted)" }}>{d.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Étape 4 */}
            <section id="etape-4" className="mb-10 scroll-mt-24">
              <div className="flex items-center gap-3 mb-4 px-4 py-3 rounded-xl" style={{ backgroundColor: "var(--color-surface)" }}>
                <span className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-extrabold shrink-0"
                  style={{ backgroundColor: MF_COLOR }}>4</span>
                <h2 className="text-lg font-extrabold" style={{ color: "var(--color-text)" }}>
                  Déposer la demande
                </h2>
              </div>
              <ul className="space-y-2 text-sm" style={{ color: "var(--color-text)" }}>
                {[
                  "Rendez-vous à la caisse locale ou agence la plus proche",
                  "Rencontrez l'agent de crédit pour présenter votre projet",
                  "Remettez votre dossier complet (originaux + photocopies)",
                  "L'agent effectuera une visite de terrain pour évaluer l'activité",
                  "Le comité de crédit se réunit et délibère (3 à 10 jours ouvrables)",
                ].map((tip, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5"
                      style={{ backgroundColor: MF_COLOR }}>✓</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </section>

            {/* Étape 5 */}
            <section id="etape-5" className="mb-10 scroll-mt-24">
              <div className="flex items-center gap-3 mb-4 px-4 py-3 rounded-xl" style={{ backgroundColor: "var(--color-surface)" }}>
                <span className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-extrabold shrink-0"
                  style={{ backgroundColor: "#2E7D32" }}>5</span>
                <h2 className="text-lg font-extrabold" style={{ color: "var(--color-text)" }}>
                  Déblocage et remboursement
                </h2>
              </div>
              <div className="space-y-3">
                {[
                  { step: "Signer le contrat de prêt",        detail: "Lisez attentivement le taux, la durée, le calendrier et les pénalités de retard." },
                  { step: "Recevoir les fonds",                detail: "Généralement en caisse ou sur mobile money (Orange Money, MTN MoMo)." },
                  { step: "Respecter le calendrier",           detail: "Chaque remboursement à l'échéance renforce votre crédibilité pour le prochain crédit." },
                  { step: "Demander un crédit progressif",     detail: "Après remboursement complet, vous pouvez demander un montant 1,5× à 3× plus élevé." },
                ].map((s, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-xl border text-sm"
                    style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}>
                    <span className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5"
                      style={{ backgroundColor: "#2E7D32" }}>{i + 1}</span>
                    <div>
                      <p className="font-bold" style={{ color: "var(--color-text)" }}>{s.step}</p>
                      <p className="text-xs mt-0.5" style={{ color: "var(--color-muted)" }}>{s.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Profils */}
            <section id="profils" className="mb-12 scroll-mt-24">
              <h2 className="text-xl font-extrabold mb-5" style={{ color: "var(--color-text)" }}>
                👤 Quelle IMF selon votre profil ?
              </h2>
              <div className="space-y-3">
                {[
                  { icon: "🌾", profil: "Agriculteur ou éleveur",        imf: "CRG-SA",    raison: "Réseau rural de 100+ caisses, crédit agricole adapté aux récoltes, petits montants accessibles." },
                  { icon: "🛍️", profil: "Petit commerçant ou marchande",  imf: "CRG-SA ou Akiba",   raison: "Micro-crédit commerce rapide (300K–3M GNF), remboursement mensuel ou hebdomadaire." },
                  { icon: "🏢", profil: "Entrepreneur ou chef de PME",    imf: "Finafrica", raison: "Crédit PME jusqu'à 50M GNF avec accompagnement, crédit équipement jusqu'à 100M GNF." },
                  { icon: "👩‍💼", profil: "Femme entrepreneur ou groupement", imf: "CAFODEC ou Akiba", raison: "Crédit solidaire, méthode de groupe, formation financière incluse, montants démarrant à 150K GNF." },
                ].map((p) => (
                  <div key={p.profil} className="p-4 rounded-xl border text-sm"
                    style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-lg">{p.icon}</span>
                      <p className="font-bold" style={{ color: "var(--color-text)" }}>{p.profil}</p>
                      <span className="ml-auto text-[11px] font-bold px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: "#F1F8E9", color: MF_COLOR }}>→ {p.imf}</span>
                    </div>
                    <p className="text-xs" style={{ color: "var(--color-muted)" }}>{p.raison}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQ */}
            <section id="faq" className="mb-12 scroll-mt-24">
              <h2 className="text-xl font-extrabold mb-5" style={{ color: "var(--color-text)" }}>❓ Questions fréquentes</h2>
              <div className="space-y-3">
                {[
                  {
                    q: "Quelle est la meilleure institution de microfinance en Guinée ?",
                    a: "La CRG-SA (HP Score A/82) est la référence nationale avec 100+ caisses. Finafrica est idéale pour les PME. Akiba Finance et CAFODEC sont recommandés pour les groupements féminins et ménages à faibles revenus.",
                  },
                  {
                    q: "Quel montant peut-on emprunter en microfinance en Guinée ?",
                    a: "De 100 000 GNF (premier crédit CAFODEC) à 100 000 000 GNF (crédit équipement Finafrica). Un premier crédit commerce ou agricole se situe entre 200 000 et 3 000 000 GNF selon l'institution.",
                  },
                  {
                    q: "Quels documents faut-il pour obtenir un micro-crédit en Guinée ?",
                    a: "CNI ou passeport, justificatif d'activité (patente/attestation), photos d'identité. Pour les crédits PME : plan d'activité simple. Pour les crédits solidaires : liste des membres du groupe.",
                  },
                  {
                    q: "La microfinance est-elle sécurisée en Guinée ?",
                    a: "Les IMF agréées en Guinée sont supervisées par la BCRG dans le cadre des SFD. Vérifiez toujours que l'institution est agréée avant de déposer une demande. Les IMF du comparateur HP Selectra sont toutes des institutions reconnues.",
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

            {/* CTA final */}
            <div className="rounded-2xl p-8 text-center"
              style={{ background: `linear-gradient(135deg, ${MF_DARK} 0%, ${MF_COLOR} 100%)` }}>
              <p className="text-xl font-extrabold text-white mb-2">Besoin d&apos;aide pour trouver votre micro-crédit ?</p>
              <p className="text-sm mb-5" style={{ color: "rgba(255,255,255,0.75)" }}>
                Un conseiller Help&apos;me Process analyse votre situation et vous oriente vers la meilleure IMF — gratuitement.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link href="/microfinance/comparateur/"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white"
                  style={{ backgroundColor: MF_COLOR }}>
                  Comparateur IMF →
                </Link>
                <a href={`https://wa.me/${WA_NUMBER}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white"
                  style={{ backgroundColor: "#25D366" }}>
                  <MessageCircle className="w-4 h-4" /> WhatsApp
                </a>
                <a href={`tel:+${CC_PHONE}`}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white border border-white/30">
                  <Phone className="w-4 h-4" /> Appeler
                </a>
              </div>
            </div>

          </article>

          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <TableOfContents items={TOC_ITEMS} title="Dans ce guide" />
              <div className="mt-4 p-4 rounded-2xl border text-sm"
                style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}>
                <p className="font-bold mb-2" style={{ color: "var(--color-text)" }}>🤝 Conseil micro-crédit</p>
                <p className="text-xs mb-3" style={{ color: "var(--color-muted)" }}>
                  Un expert vous aide à trouver la meilleure IMF selon votre profil — gratuitement.
                </p>
                <a href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Bonjour, je souhaite obtenir un micro-crédit en Guinée.")}`}
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-3 py-2.5 rounded-xl font-bold text-white text-xs"
                  style={{ backgroundColor: "#25D366" }}>
                  <MessageCircle className="w-3.5 h-3.5" /> WhatsApp gratuit
                </a>
              </div>
            </div>
          </aside>

        </div>
      </div>

      <ReviewsSection />
    </>
  )
}
