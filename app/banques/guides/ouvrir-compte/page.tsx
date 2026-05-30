import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, MessageCircle, Phone } from "lucide-react"
import ReviewsSection from "@/components/ui/ReviewsSection"
import TableOfContents from "@/components/ui/TableOfContents"
import { buildJsonLd, howToSchema, faqSchema, breadcrumbSchema } from "@/lib/schema"

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "224628935335"
const CC_PHONE  = process.env.NEXT_PUBLIC_CC_PHONE        ?? "224628935335"
const BASE_URL  = "https://hp-selectra-app.vercel.app"

export const metadata: Metadata = {
  title: "Comment ouvrir un compte bancaire en Guinée 2026 — Guide complet | HP Selectra",
  description:
    "Guide étape par étape pour ouvrir un compte bancaire en Guinée : documents requis, meilleures banques, comparatif des frais. Conseil gratuit disponible.",
}

const TOC_ITEMS = [
  { id: "intro", label: "Pourquoi ouvrir un compte ?" },
  { id: "etape-1", label: "1. Choisir le type de compte" },
  { id: "etape-2", label: "2. Comparer les banques" },
  { id: "etape-3", label: "3. Préparer les documents" },
  { id: "etape-4", label: "4. Se rendre en agence" },
  { id: "etape-5", label: "5. Activer votre compte" },
  { id: "documents", label: "Documents requis" },
  { id: "faq", label: "Questions fréquentes" },
]

export default function GuideOuvrirComptePage() {
  const jsonLdHowTo = buildJsonLd(howToSchema({
    name: "Comment ouvrir un compte bancaire en Guinée",
    description: "Guide pratique pour ouvrir un compte bancaire en Guinée : choix de la banque, documents requis, démarches administratives.",
    url: `${BASE_URL}/banques/guides/ouvrir-compte`,
    totalTime: "PT15M",
    estimatedCost: { currency: "GNF", value: "50000" },
    steps: [
      { name: "Choisir le type de compte adapté", text: "Choisissez entre compte courant (pour les transactions quotidiennes), compte épargne (pour faire fructifier votre argent) ou compte professionnel (pour les entrepreneurs).", url: `${BASE_URL}/banques/guides/ouvrir-compte#etape-1` },
      { name: "Comparer les banques guinéennes", text: "Utilisez le HP Score pour comparer Ecobank, Société Générale Guinée, BICIGUI et BOA Guinée selon les frais de tenue de compte, les services et la couverture agence.", url: `${BASE_URL}/banques/comparateur` },
      { name: "Préparer les documents requis", text: "Rassemblez : pièce d'identité nationale (CNI ou passeport), justificatif de domicile de moins de 3 mois, photos d'identité, et selon la banque : justificatif de revenus.", url: `${BASE_URL}/banques/guides/ouvrir-compte#documents` },
      { name: "Se rendre en agence", text: "Prenez rendez-vous ou rendez-vous directement dans l'agence la plus proche. Apportez les documents originaux et photocopies.", url: `${BASE_URL}/banques/guides/ouvrir-compte#etape-4` },
      { name: "Activer votre compte et carte", text: "Après validation de votre dossier (1-5 jours ouvrables), activez votre carte bancaire et configurez votre accès en ligne.", url: `${BASE_URL}/banques/guides/ouvrir-compte#etape-5` },
    ],
  }))

  const jsonLdFaq = buildJsonLd(faqSchema([
    { question: "Quelle est la meilleure banque pour ouvrir un compte en Guinée ?", answer: "Ecobank Guinée (HP Score A, 85/100) est recommandée pour sa couverture nationale, ses services digitaux et son réseau panafricain. Société Générale est idéale pour les entreprises. BICIGUI offre les frais les plus accessibles pour les particuliers." },
    { question: "Quels documents faut-il pour ouvrir un compte bancaire en Guinée ?", answer: "En général : pièce d'identité nationale (CNI ou passeport), justificatif de domicile récent (moins de 3 mois), 2 photos d'identité. Certaines banques demandent aussi un justificatif de revenus ou une lettre d'introduction d'un employeur." },
    { question: "Quel est le montant minimum pour ouvrir un compte en Guinée ?", answer: "Le dépôt minimum varie selon la banque : de 50 000 GNF (BICIGUI) à 500 000 GNF (certaines banques privées). Les comptes d'épargne demandent généralement moins. Nos conseillers peuvent vous orienter vers la banque la plus accessible pour votre situation." },
  ]))

  const jsonLdBreadcrumb = buildJsonLd(breadcrumbSchema([
    { name: "Accueil", href: "/" },
    { name: "Banques", href: "/banques/" },
    { name: "Guides", href: "/banques/guides/" },
    { name: "Ouvrir un compte bancaire" },
  ]))

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdHowTo }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdFaq }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdBreadcrumb }} />

      {/* Hero */}
      <section className="py-12 sm:py-16" style={{ background: "linear-gradient(135deg, #1A374D 0%, #2E86C1 100%)" }}>
        <div className="container max-w-3xl">
          <nav className="flex items-center gap-1.5 text-xs mb-5" style={{ color: "rgba(255,255,255,0.5)" }}>
            <Link href="/" className="hover:text-white">Accueil</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/banques/" className="hover:text-white">Banques</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">Guide : Ouvrir un compte</span>
          </nav>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold mb-4" style={{ backgroundColor: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.9)" }}>
            🏦 Guide complet · Lecture : 10 min
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3 leading-tight">
            Comment ouvrir un compte bancaire en Guinée
          </h1>
          <p className="text-base mb-6" style={{ color: "rgba(255,255,255,0.75)" }}>
            Ecobank, Société Générale, BICIGUI, BOA : guide complet pour choisir la meilleure banque et ouvrir votre compte en 5 étapes simples.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/banques/comparateur" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white" style={{ backgroundColor: "#2E86C1" }}>
              Comparer les banques →
            </Link>
            <a href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Bonjour, je souhaite ouvrir un compte bancaire en Guinée. Pouvez-vous m'aider ?")}`}
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

            <section id="intro" className="mb-10 scroll-mt-24">
              <h2 className="text-xl font-extrabold mb-3" style={{ color: "var(--color-text)" }}>Pourquoi ouvrir un compte bancaire en Guinée ?</h2>
              <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--color-text)" }}>
                Avoir un compte bancaire en Guinée est de plus en plus indispensable : pour recevoir un salaire, accéder au crédit, payer en ligne ou faire des transferts internationaux. Seulement <strong>environ 23 % des Guinéens</strong> sont bancarisés — une opportunité de rejoindre le système financier formel.
              </p>
              <div className="p-4 rounded-xl text-sm" style={{ backgroundColor: "var(--color-primary-light)", borderLeft: "3px solid var(--color-primary)" }}>
                <strong>🏛️ Régulateur :</strong> Les banques en Guinée sont régulées par la <strong>BCRG</strong> (Banque Centrale de la République de Guinée), qui garantit la sécurité de vos dépôts.
              </div>
            </section>

            <section id="etape-1" className="mb-10 scroll-mt-24">
              <div className="flex items-center gap-3 mb-4 px-4 py-3 rounded-xl" style={{ backgroundColor: "var(--color-surface)" }}>
                <span className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-extrabold shrink-0" style={{ backgroundColor: "var(--color-primary)" }}>1</span>
                <h2 className="text-lg font-extrabold" style={{ color: "var(--color-text)" }}>Choisir le type de compte adapté</h2>
              </div>
              <div className="grid sm:grid-cols-3 gap-3">
                {[
                  { type: "🔄 Compte courant", desc: "Pour les transactions du quotidien : virements, paiements, domiciliation de salaire. Accès carte bancaire et chéquier.", usage: "Salariés, actifs" },
                  { type: "💰 Compte épargne", desc: "Pour faire fructifier votre argent avec un taux d'intérêt annuel. Retraits limités selon la banque.", usage: "Épargnants" },
                  { type: "🏢 Compte professionnel", desc: "Pour les entrepreneurs, commerçants et PME. Fonctionnalités business : virements masse, relevés comptables.", usage: "Entrepreneurs" },
                ].map((t) => (
                  <div key={t.type} className="p-4 rounded-xl border text-sm" style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}>
                    <p className="font-bold mb-1" style={{ color: "var(--color-text)" }}>{t.type}</p>
                    <p className="text-xs mb-2" style={{ color: "var(--color-muted)" }}>{t.desc}</p>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: "var(--color-primary-light)", color: "var(--color-primary)" }}>Pour : {t.usage}</span>
                  </div>
                ))}
              </div>
            </section>

            <section id="etape-2" className="mb-10 scroll-mt-24">
              <div className="flex items-center gap-3 mb-4 px-4 py-3 rounded-xl" style={{ backgroundColor: "var(--color-surface)" }}>
                <span className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-extrabold shrink-0" style={{ backgroundColor: "var(--color-primary)" }}>2</span>
                <h2 className="text-lg font-extrabold" style={{ color: "var(--color-text)" }}>Comparer les banques guinéennes</h2>
              </div>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--color-text)" }}>Nos experts ont analysé les principales banques selon le HP Score :</p>
              <div className="rounded-2xl border overflow-hidden mb-4" style={{ borderColor: "var(--color-border)" }}>
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ backgroundColor: "var(--color-surface)" }}>
                      {["Banque", "HP Score", "Point fort", "Dépôt min."].map(h => (
                        <th key={h} className="text-left px-4 py-2 text-xs font-semibold" style={{ color: "var(--color-muted)" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Ecobank Guinée", "A (85)", "Réseau panafricain + digital", "100 000 GNF"],
                      ["Société Générale Guinée", "A (82)", "Crédit + services entreprises", "200 000 GNF"],
                      ["BICIGUI", "B (76)", "Frais accessibles + réseau large", "50 000 GNF"],
                      ["BOA Guinée", "B (73)", "Microfinance + zones rurales", "50 000 GNF"],
                    ].map(([bank, score, point, depot], i) => (
                      <tr key={bank as string} style={{ backgroundColor: i % 2 === 0 ? "var(--color-card)" : "var(--color-surface)", borderTop: "1px solid var(--color-border)" }}>
                        <td className="px-4 py-2.5 font-semibold text-xs" style={{ color: "var(--color-text)" }}>{bank}</td>
                        <td className="px-4 py-2.5 text-xs font-bold" style={{ color: "#6B8F3C" }}>{score}</td>
                        <td className="px-4 py-2.5 text-xs" style={{ color: "var(--color-muted)" }}>{point}</td>
                        <td className="px-4 py-2.5 text-xs font-semibold" style={{ color: "var(--color-primary)" }}>{depot}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Link href="/banques/comparateur" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-white" style={{ backgroundColor: "var(--color-primary)" }}>
                Voir le comparateur complet →
              </Link>
            </section>

            <section id="documents" className="mb-10 scroll-mt-24">
              <h2 className="text-xl font-extrabold mb-4" style={{ color: "var(--color-text)" }}>📋 Documents requis pour ouvrir un compte</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { doc: "🪪 Pièce d'identité", detail: "CNI (Carte Nationale d'Identité) ou passeport en cours de validité. Original + 1 photocopie.", required: true },
                  { doc: "🏠 Justificatif de domicile", detail: "Facture d'eau, d'électricité ou de téléphone à votre nom, de moins de 3 mois.", required: true },
                  { doc: "📸 Photos d'identité", detail: "2 photos d'identité récentes fond blanc, format passeport.", required: true },
                  { doc: "💼 Justificatif de revenus", detail: "Fiche de paie, attestation d'employeur ou relevé d'activité. Certaines banques l'exigent.", required: false },
                  { doc: "📄 Acte de naissance", detail: "Pour les mineurs ou certains types de comptes spéciaux.", required: false },
                  { doc: "💰 Dépôt initial", detail: "Entre 50 000 et 500 000 GNF selon la banque et le type de compte.", required: true },
                ].map((d) => (
                  <div key={d.doc} className="flex items-start gap-3 p-4 rounded-xl border text-sm" style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}>
                    <span className="text-xl shrink-0">{d.doc.split(" ")[0]}</span>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-bold" style={{ color: "var(--color-text)" }}>{d.doc.substring(d.doc.indexOf(" ") + 1)}</p>
                        <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full" style={{ backgroundColor: d.required ? "#ffebee" : "#e8f5e9", color: d.required ? "#c62828" : "#388e3c" }}>
                          {d.required ? "Obligatoire" : "Selon la banque"}
                        </span>
                      </div>
                      <p className="text-xs" style={{ color: "var(--color-muted)" }}>{d.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section id="etape-4" className="mb-10 scroll-mt-24">
              <div className="flex items-center gap-3 mb-4 px-4 py-3 rounded-xl" style={{ backgroundColor: "var(--color-surface)" }}>
                <span className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-extrabold shrink-0" style={{ backgroundColor: "var(--color-primary)" }}>4</span>
                <h2 className="text-lg font-extrabold" style={{ color: "var(--color-text)" }}>Se rendre en agence</h2>
              </div>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--color-text)" }}>
                Après avoir rassemblé vos documents, rendez-vous dans l&apos;agence bancaire de votre choix. Quelques conseils :
              </p>
              <ul className="space-y-2 text-sm" style={{ color: "var(--color-text)" }}>
                {[
                  "Privilégiez une agence proche de votre domicile ou lieu de travail",
                  "Apportez les originaux ET les photocopies de tous les documents",
                  "Prévoyez 1 à 2 heures pour votre première visite",
                  "Posez des questions sur les frais de tenue de compte, de retrait et de virement",
                  "Demandez si une carte Visa/Mastercard internationale est disponible",
                ].map((tip, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5" style={{ backgroundColor: "var(--color-primary)" }}>✓</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </section>

            <section id="etape-5" className="mb-12 scroll-mt-24">
              <div className="flex items-center gap-3 mb-4 px-4 py-3 rounded-xl" style={{ backgroundColor: "var(--color-surface)" }}>
                <span className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-extrabold shrink-0" style={{ backgroundColor: "#6B8F3C" }}>5</span>
                <h2 className="text-lg font-extrabold" style={{ color: "var(--color-text)" }}>Activer votre compte et votre carte</h2>
              </div>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--color-text)" }}>
                Après validation de votre dossier (généralement 1 à 5 jours ouvrables) :
              </p>
              <div className="space-y-3">
                {[
                  { step: "Retirer votre carte bancaire", detail: "En agence sur présentation de votre pièce d'identité" },
                  { step: "Activer votre carte au guichet ou DAB", detail: "Composez votre code PIN secret fourni séparément" },
                  { step: "Créer votre accès en ligne", detail: "Sur le site ou l'application de votre banque" },
                  { step: "Paramétrer les alertes SMS", detail: "Pour être notifié de chaque opération sur votre compte" },
                ].map((s, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-xl border text-sm" style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}>
                    <span className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5" style={{ backgroundColor: "#6B8F3C" }}>{i + 1}</span>
                    <div>
                      <p className="font-bold" style={{ color: "var(--color-text)" }}>{s.step}</p>
                      <p className="text-xs mt-0.5" style={{ color: "var(--color-muted)" }}>{s.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section id="faq" className="mb-12 scroll-mt-24">
              <h2 className="text-xl font-extrabold mb-5" style={{ color: "var(--color-text)" }}>❓ Questions fréquentes</h2>
              <div className="space-y-3">
                {[
                  { q: "Quelle est la meilleure banque pour ouvrir un compte en Guinée ?", a: "Ecobank Guinée (HP Score A, 85/100) est recommandée pour sa couverture nationale, ses services digitaux et son réseau panafricain. Société Générale est idéale pour les entreprises. BICIGUI offre les frais les plus accessibles pour les particuliers." },
                  { q: "Quels documents faut-il pour ouvrir un compte bancaire en Guinée ?", a: "En général : pièce d'identité nationale (CNI ou passeport), justificatif de domicile récent (moins de 3 mois), 2 photos d'identité. Certaines banques demandent aussi un justificatif de revenus ou une lettre d'introduction d'un employeur." },
                  { q: "Quel est le montant minimum pour ouvrir un compte en Guinée ?", a: "Le dépôt minimum varie de 50 000 GNF (BICIGUI) à 500 000 GNF (certaines banques privées). Les comptes d'épargne demandent généralement moins. Nos conseillers peuvent vous orienter." },
                ].map(({ q, a }) => (
                  <details key={q} className="rounded-2xl border overflow-hidden" style={{ borderColor: "var(--color-border)" }}>
                    <summary className="flex items-center justify-between px-5 py-4 cursor-pointer list-none font-semibold text-sm" style={{ backgroundColor: "var(--color-card)", color: "var(--color-text)" }}>
                      {q}
                      <span className="ml-3 shrink-0 font-bold text-xl" style={{ color: "var(--color-primary)" }}>+</span>
                    </summary>
                    <div className="px-5 py-4 text-sm leading-relaxed" style={{ backgroundColor: "var(--color-surface)", color: "var(--color-muted)" }}>{a}</div>
                  </details>
                ))}
              </div>
            </section>

            <div className="rounded-2xl p-8 text-center" style={{ background: "linear-gradient(135deg, #1A374D 0%, #2E86C1 100%)" }}>
              <p className="text-xl font-extrabold text-white mb-2">Besoin d&apos;aide pour choisir votre banque ?</p>
              <p className="text-sm mb-5" style={{ color: "rgba(255,255,255,0.75)" }}>Un conseiller Help&apos;me Process analyse votre situation et vous recommande la meilleure banque — gratuitement.</p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link href="/banques/comparateur" className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white" style={{ backgroundColor: "#2E86C1" }}>Comparateur banques →</Link>
                <a href={`https://wa.me/${WA_NUMBER}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white" style={{ backgroundColor: "#25D366" }}>
                  <MessageCircle className="w-4 h-4" /> WhatsApp
                </a>
                <a href={`tel:+${CC_PHONE}`} className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white border border-white/30">
                  <Phone className="w-4 h-4" /> Appeler
                </a>
              </div>
            </div>

          </article>

          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <TableOfContents items={TOC_ITEMS} title="Dans ce guide" />
              <div className="mt-4 p-4 rounded-2xl border text-sm" style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}>
                <p className="font-bold mb-2" style={{ color: "var(--color-text)" }}>🏦 Conseil banque</p>
                <p className="text-xs mb-3" style={{ color: "var(--color-muted)" }}>Un expert vous aide à choisir la meilleure banque selon votre profil.</p>
                <a href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Bonjour, je souhaite ouvrir un compte bancaire en Guinée.")}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-3 py-2.5 rounded-xl font-bold text-white text-xs" style={{ backgroundColor: "#25D366" }}>
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
