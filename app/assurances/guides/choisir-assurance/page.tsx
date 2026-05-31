import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, MessageCircle, Phone, Shield } from "lucide-react"
import ReviewsSection from "@/components/ui/ReviewsSection"
import TableOfContents from "@/components/ui/TableOfContents"
import { buildJsonLd, howToSchema, faqSchema, breadcrumbSchema } from "@/lib/schema"

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "224628935335"
const CC_PHONE  = process.env.NEXT_PUBLIC_CC_PHONE        ?? "224628935335"
const BASE_URL  = "https://hpshop-afrique.vercel.app"

const ASSURANCE_COLOR = "#B02840"
const ASSURANCE_DARK  = "#7B1A2E"

export const metadata: Metadata = {
  title: "Comment choisir son assurance en Guinée 2026 — Guide complet | HP Selectra",
  description:
    "Guide complet pour choisir la meilleure assurance en Guinée : RC auto obligatoire, assurance santé, habitation, vie. Comparatif NSIA, UGAR-Activa, SUNU, Lanala.",
}

const TOC_ITEMS = [
  { id: "intro",        label: "Pourquoi s'assurer en Guinée ?" },
  { id: "etape-1",      label: "1. Identifier ses besoins" },
  { id: "etape-2",      label: "2. Connaître l'obligatoire" },
  { id: "etape-3",      label: "3. Comparer les compagnies" },
  { id: "etape-4",      label: "4. Lire les garanties" },
  { id: "etape-5",      label: "5. Souscrire et conserver" },
  { id: "types",        label: "Les types d'assurance" },
  { id: "faq",          label: "Questions fréquentes" },
]

export default function GuideChoisirAssurancePage() {
  const jsonLdHowTo = buildJsonLd(howToSchema({
    name: "Comment choisir son assurance en Guinée",
    description: "Guide pratique pour sélectionner la meilleure assurance en Guinée : RC auto, santé, habitation, vie — comparatif des compagnies agréées.",
    url: `${BASE_URL}/assurances/guides/choisir-assurance`,
    totalTime: "PT20M",
    estimatedCost: { currency: "GNF", value: "150000" },
    steps: [
      {
        name: "Identifier ses besoins en assurance",
        text: "Listez ce que vous souhaitez protéger : véhicule (RC auto obligatoire), santé (individuel ou famille), logement (locataire ou propriétaire), ou prévoyance vie.",
        url: `${BASE_URL}/assurances/guides/choisir-assurance#etape-1`,
      },
      {
        name: "Comprendre ce qui est obligatoire",
        text: "La loi guinéenne impose une assurance RC auto minimale à tout véhicule en circulation. Circuler sans assurance est passible d'amende et de mise en fourrière.",
        url: `${BASE_URL}/assurances/guides/choisir-assurance#etape-2`,
      },
      {
        name: "Comparer les compagnies agréées",
        text: "Utilisez le HP Score pour comparer NSIA, UGAR-Activa, SUNU et Lanala selon les garanties, tarifs, réseau d'agences et qualité de règlement des sinistres.",
        url: `${BASE_URL}/assurances/comparateur`,
      },
      {
        name: "Lire les garanties et exclusions",
        text: "Vérifiez attentivement les plafonds de remboursement, les franchises, les délais de carence (surtout en santé) et les exclusions de garantie avant de signer.",
        url: `${BASE_URL}/assurances/guides/choisir-assurance#etape-4`,
      },
      {
        name: "Souscrire et conserver ses documents",
        text: "Conservez votre attestation d'assurance RC auto dans le véhicule à tout moment. Pour les autres assurances, gardez votre police en lieu sûr et notez le numéro d'urgence sinistre.",
        url: `${BASE_URL}/assurances/guides/choisir-assurance#etape-5`,
      },
    ],
  }))

  const jsonLdFaq = buildJsonLd(faqSchema([
    {
      question: "Quelle assurance est obligatoire en Guinée ?",
      answer: "La Responsabilité Civile (RC) auto est obligatoire pour tout véhicule à moteur en circulation en Guinée. Cette assurance couvre les dommages causés à des tiers en cas d'accident. Les compagnies agréées par l'État pour proposer ce contrat sont notamment NSIA, UGAR-Activa, SUNU et Lanala.",
    },
    {
      question: "Quelle est la meilleure compagnie d'assurance en Guinée ?",
      answer: "NSIA Assurances Guinée obtient le meilleur HP Score (A, 86/100) grâce à sa solidité financière, son réseau d'agences et sa rapidité de traitement des sinistres. UGAR-Activa (A, 80/100) est recommandée pour l'assurance auto tous risques. Comparez toutes les compagnies sur notre comparateur.",
    },
    {
      question: "Combien coûte une RC auto en Guinée ?",
      answer: "Le tarif d'une RC auto dépend du type de véhicule, de la puissance fiscale et de la compagnie choisie. À titre indicatif, les tarifs démarrent autour de 150 000 à 300 000 GNF par an pour un véhicule particulier. Ces prix sont des exemples à vérifier directement auprès des compagnies.",
    },
    {
      question: "Comment déclarer un sinistre en Guinée ?",
      answer: "En cas de sinistre, contactez immédiatement votre compagnie d'assurance par téléphone (numéro sur votre attestation). Pour un accident auto, remplissez un constat amiable avec l'autre conducteur. Rassemblez photos, témoignages et tout document utile. Votre déclaration doit généralement être faite dans les 5 jours ouvrables.",
    },
  ]))

  const jsonLdBreadcrumb = buildJsonLd(breadcrumbSchema([
    { name: "Accueil", href: "/" },
    { name: "Assurances", href: "/assurances/" },
    { name: "Guides", href: "/assurances/guides/" },
    { name: "Comment choisir son assurance" },
  ]))

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdHowTo }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdFaq }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdBreadcrumb }} />

      {/* Hero */}
      <section className="py-12 sm:py-16" style={{ background: `linear-gradient(135deg, ${ASSURANCE_DARK} 0%, ${ASSURANCE_COLOR} 100%)` }}>
        <div className="container max-w-3xl">
          <nav className="flex items-center gap-1.5 text-xs mb-5" style={{ color: "rgba(255,255,255,0.5)" }}>
            <Link href="/" className="hover:text-white">Accueil</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/assurances/" className="hover:text-white">Assurances</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">Guide : Choisir son assurance</span>
          </nav>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold mb-4"
            style={{ backgroundColor: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.9)" }}>
            🛡️ Guide complet · Lecture : 12 min
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3 leading-tight">
            Comment choisir son assurance en Guinée
          </h1>
          <p className="text-base mb-6" style={{ color: "rgba(255,255,255,0.75)" }}>
            RC auto, santé, habitation, vie : tout ce qu&apos;il faut savoir pour comparer NSIA,
            UGAR-Activa, SUNU et Lanala et souscrire au meilleur tarif.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/assurances/comparateur/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white"
              style={{ backgroundColor: ASSURANCE_COLOR }}>
              Comparer les assurances →
            </Link>
            <a href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Bonjour, je souhaite un conseil pour choisir mon assurance en Guinée.")}`}
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
                Pourquoi s&apos;assurer en Guinée ?
              </h2>
              <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--color-text)" }}>
                Le marché des assurances en Guinée est en plein essor, supervisé par la
                <strong> Direction Nationale des Assurances (DNA)</strong> sous tutelle du Ministère des Finances.
                Se couvrir contre les accidents, la maladie ou les sinistres permet de protéger son patrimoine
                et sa famille sans se ruiner en cas d&apos;imprévu.
              </p>
              <div className="p-4 rounded-xl text-sm flex items-start gap-3"
                style={{ backgroundColor: "#FFF8E1", borderLeft: "3px solid #F0A500" }}>
                <Shield className="w-5 h-5 mt-0.5 shrink-0" style={{ color: "#F0A500" }} />
                <div>
                  <strong style={{ color: "var(--color-text)" }}>RC Auto obligatoire :</strong>
                  <span style={{ color: "var(--color-muted)" }}> La loi guinéenne impose à tout véhicule en
                  circulation une assurance RC auto minimum. Circuler sans assurance est passible d&apos;amende
                  et de mise en fourrière.</span>
                </div>
              </div>
            </section>

            {/* Étape 1 */}
            <section id="etape-1" className="mb-10 scroll-mt-24">
              <div className="flex items-center gap-3 mb-4 px-4 py-3 rounded-xl" style={{ backgroundColor: "var(--color-surface)" }}>
                <span className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-extrabold shrink-0"
                  style={{ backgroundColor: ASSURANCE_COLOR }}>1</span>
                <h2 className="text-lg font-extrabold" style={{ color: "var(--color-text)" }}>
                  Identifier ses besoins en assurance
                </h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { icon: "🚗", type: "RC Auto",        desc: "Obligatoire. Couvre les dommages causés à des tiers. Minimum légal en Guinée.", tag: "Obligatoire" },
                  { icon: "🛡️", type: "Tous Risques",   desc: "Couverture complète du véhicule : vol, incendie, bris de glace, catastrophe naturelle.", tag: "Recommandé" },
                  { icon: "🏥", type: "Santé",           desc: "Prise en charge des frais médicaux, hospitalisation, médicaments pour vous et votre famille.", tag: "Recommandé" },
                  { icon: "🏠", type: "Habitation",      desc: "Protège votre logement et vos biens contre vol, incendie, dégâts des eaux.", tag: "Recommandé" },
                  { icon: "💚", type: "Vie & Épargne",   desc: "Prévoyance décès/invalidité + épargne à long terme pour la retraite.", tag: "Selon profil" },
                  { icon: "💼", type: "Professionnel",   desc: "RC professionnelle, locaux commerciaux, équipements. Pour entrepreneurs et PME.", tag: "Selon profil" },
                ].map((t) => (
                  <div key={t.type} className="p-4 rounded-xl border text-sm"
                    style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-lg">{t.icon}</span>
                      <p className="font-bold" style={{ color: "var(--color-text)" }}>{t.type}</p>
                      <span className="ml-auto text-[10px] font-semibold px-2 py-0.5 rounded-full"
                        style={{
                          backgroundColor: t.tag === "Obligatoire" ? "#ffebee" : t.tag === "Recommandé" ? "#e8f5e9" : "var(--color-surface)",
                          color: t.tag === "Obligatoire" ? "#c62828" : t.tag === "Recommandé" ? "#388e3c" : "var(--color-muted)",
                        }}>
                        {t.tag}
                      </span>
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
                  style={{ backgroundColor: ASSURANCE_COLOR }}>2</span>
                <h2 className="text-lg font-extrabold" style={{ color: "var(--color-text)" }}>
                  Comprendre ce qui est obligatoire
                </h2>
              </div>
              <div className="p-5 rounded-2xl border mb-4"
                style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}>
                <p className="font-bold text-sm mb-2" style={{ color: "var(--color-text)" }}>
                  🚗 RC Auto — Assurance obligatoire en Guinée
                </p>
                <ul className="space-y-2 text-sm" style={{ color: "var(--color-text)" }}>
                  {[
                    "Tout véhicule à moteur doit être assuré RC au minimum",
                    "L'attestation d'assurance doit être affichée dans le véhicule",
                    "La vignette doit être collée sur le pare-brise",
                    "En cas de contrôle sans assurance : amende + mise en fourrière",
                    "En cas d'accident sans assurance : responsabilité civile personnelle totale",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5"
                        style={{ backgroundColor: ASSURANCE_COLOR }}>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Étape 3 */}
            <section id="etape-3" className="mb-10 scroll-mt-24">
              <div className="flex items-center gap-3 mb-4 px-4 py-3 rounded-xl" style={{ backgroundColor: "var(--color-surface)" }}>
                <span className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-extrabold shrink-0"
                  style={{ backgroundColor: ASSURANCE_COLOR }}>3</span>
                <h2 className="text-lg font-extrabold" style={{ color: "var(--color-text)" }}>
                  Comparer les compagnies agréées
                </h2>
              </div>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--color-text)" }}>
                Notre HP Score évalue les compagnies sur la solidité financière, le réseau d&apos;agences,
                la rapidité de règlement des sinistres et la diversité des produits :
              </p>
              <div className="rounded-2xl border overflow-hidden mb-4" style={{ borderColor: "var(--color-border)" }}>
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ backgroundColor: "var(--color-surface)" }}>
                      {["Compagnie", "HP Score", "Point fort", "Produits phares"].map((h) => (
                        <th key={h} className="text-left px-4 py-2 text-xs font-semibold" style={{ color: "var(--color-muted)" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["NSIA Assurances",  "A (86)", "Solidité financière",       "RC auto, Santé, Vie"],
                      ["UGAR-Activa",      "A (80)", "Tous risques auto",          "RC auto, Tous risques, Habitation"],
                      ["SUNU Assurances",  "B (72)", "Réseau panafricain",         "RC auto, Santé famille"],
                      ["Lanala",           "B (67)", "Accessibilité tarifaire",    "RC auto, Vie & épargne"],
                    ].map(([name, score, point, produits], i) => (
                      <tr key={name as string}
                        style={{ backgroundColor: i % 2 === 0 ? "var(--color-card)" : "var(--color-surface)", borderTop: "1px solid var(--color-border)" }}>
                        <td className="px-4 py-2.5 font-semibold text-xs" style={{ color: "var(--color-text)" }}>{name}</td>
                        <td className="px-4 py-2.5 text-xs font-bold" style={{ color: "#6B8F3C" }}>{score}</td>
                        <td className="px-4 py-2.5 text-xs" style={{ color: "var(--color-muted)" }}>{point}</td>
                        <td className="px-4 py-2.5 text-xs" style={{ color: "var(--color-muted)" }}>{produits}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Link href="/assurances/comparateur/"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-white"
                style={{ backgroundColor: ASSURANCE_COLOR }}>
                Voir le comparateur complet →
              </Link>
            </section>

            {/* Étape 4 */}
            <section id="etape-4" className="mb-10 scroll-mt-24">
              <div className="flex items-center gap-3 mb-4 px-4 py-3 rounded-xl" style={{ backgroundColor: "var(--color-surface)" }}>
                <span className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-extrabold shrink-0"
                  style={{ backgroundColor: ASSURANCE_COLOR }}>4</span>
                <h2 className="text-lg font-extrabold" style={{ color: "var(--color-text)" }}>
                  Lire les garanties et les exclusions
                </h2>
              </div>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--color-text)" }}>
                Avant de signer, vérifiez attentivement ces points dans votre contrat :
              </p>
              <div className="space-y-3">
                {[
                  { label: "Plafonds de remboursement", detail: "Montant maximum pris en charge par sinistre ou par année. Plus il est élevé, mieux vous êtes couvert." },
                  { label: "Franchise",                  detail: "Somme restant à votre charge en cas de sinistre. Une franchise élevée = prime plus basse mais plus de frais en cas de problème." },
                  { label: "Délai de carence (santé)",   detail: "Période après souscription pendant laquelle certaines garanties ne jouent pas (souvent 1 à 3 mois). Crucial pour l'assurance maladie." },
                  { label: "Exclusions de garantie",     detail: "Situations non couvertes : conduite sans permis, ivresse, catastrophes naturelles non listées... Lisez cette liste attentivement." },
                  { label: "Résiliation et préavis",     detail: "Conditions pour résilier votre contrat. En général : préavis de 2 mois avant l'échéance annuelle." },
                ].map((item, i) => (
                  <div key={i} className="p-4 rounded-xl border text-sm"
                    style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}>
                    <p className="font-bold mb-1" style={{ color: "var(--color-text)" }}>⚠️ {item.label}</p>
                    <p className="text-xs" style={{ color: "var(--color-muted)" }}>{item.detail}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Étape 5 */}
            <section id="etape-5" className="mb-10 scroll-mt-24">
              <div className="flex items-center gap-3 mb-4 px-4 py-3 rounded-xl" style={{ backgroundColor: "var(--color-surface)" }}>
                <span className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-extrabold shrink-0"
                  style={{ backgroundColor: "#6B8F3C" }}>5</span>
                <h2 className="text-lg font-extrabold" style={{ color: "var(--color-text)" }}>
                  Souscrire et conserver ses documents
                </h2>
              </div>
              <div className="space-y-3">
                {[
                  { step: "Récupérer votre attestation RC auto",    detail: "Immédiatement après paiement. À conserver impérativement dans votre véhicule." },
                  { step: "Coller la vignette sur le pare-brise",   detail: "Vignette fournie par la compagnie, visible de l'extérieur." },
                  { step: "Sauvegarder votre police d'assurance",   detail: "Document contractuel listant toutes les garanties. Conservez-le en lieu sûr et en version numérique." },
                  { step: "Noter le numéro sinistre 24h/24",        detail: "En cas de problème, vous devez pouvoir joindre votre compagnie rapidement." },
                ].map((s, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-xl border text-sm"
                    style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}>
                    <span className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5"
                      style={{ backgroundColor: "#6B8F3C" }}>{i + 1}</span>
                    <div>
                      <p className="font-bold" style={{ color: "var(--color-text)" }}>{s.step}</p>
                      <p className="text-xs mt-0.5" style={{ color: "var(--color-muted)" }}>{s.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Types d'assurance */}
            <section id="types" className="mb-12 scroll-mt-24">
              <h2 className="text-xl font-extrabold mb-5" style={{ color: "var(--color-text)" }}>
                🗂️ Les types d&apos;assurance en détail
              </h2>
              <div className="space-y-4">
                {[
                  {
                    icon: "🚗", title: "Assurance auto (RC + Tous risques)",
                    content: "La RC auto couvre uniquement les dommages causés aux tiers. Le tous risques ajoute la couverture de votre propre véhicule (vol, incendie, bris de glace). Pour un véhicule neuf ou de valeur, le tous risques est fortement recommandé.",
                    link: "/assurances/comparateur/?categorie=rc-auto",
                  },
                  {
                    icon: "🏥", title: "Assurance santé",
                    content: "Prend en charge tout ou partie des frais médicaux : consultations, hospitalisation, pharmacie, maternité. En Guinée, les formules varient entre couverture individuelle (à partir de 250 000 GNF/an) et familiale. Attention au délai de carence pour les maladies préexistantes.",
                    link: "/assurances/comparateur/?categorie=sante",
                  },
                  {
                    icon: "🏠", title: "Assurance habitation",
                    content: "Protège votre logement (en tant que propriétaire ou locataire) contre l'incendie, le vol, les dégâts des eaux et la responsabilité civile vie privée. Peu répandue en Guinée mais de plus en plus accessible avec UGAR-Activa et NSIA.",
                    link: "/assurances/comparateur/?categorie=habitation",
                  },
                  {
                    icon: "💚", title: "Assurance vie & épargne",
                    content: "Combine prévoyance (versement d'un capital en cas de décès ou d'invalidité) et épargne (constitution d'un capital à terme, retraite). NSIA et Lanala proposent des formules adaptées au marché guinéen.",
                    link: "/assurances/comparateur/?categorie=vie",
                  },
                ].map((t) => (
                  <div key={t.title} className="p-5 rounded-2xl border" style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}>
                    <p className="font-bold text-sm mb-2" style={{ color: "var(--color-text)" }}>{t.icon} {t.title}</p>
                    <p className="text-xs leading-relaxed mb-3" style={{ color: "var(--color-muted)" }}>{t.content}</p>
                    <Link href={t.link} className="text-xs font-semibold" style={{ color: ASSURANCE_COLOR }}>
                      Voir les offres →
                    </Link>
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
                    q: "Quelle assurance est obligatoire en Guinée ?",
                    a: "La Responsabilité Civile (RC) auto est obligatoire pour tout véhicule à moteur en circulation. Cette assurance couvre les dommages causés à des tiers en cas d'accident. Les compagnies agréées pour ce contrat incluent NSIA, UGAR-Activa, SUNU et Lanala.",
                  },
                  {
                    q: "Quelle est la meilleure compagnie d'assurance en Guinée ?",
                    a: "NSIA Assurances Guinée obtient le meilleur HP Score (A, 86/100) pour sa solidité financière et son service sinistre. UGAR-Activa (A, 80/100) excelle en assurance auto tous risques. Comparez toutes les compagnies sur notre comparateur pour trouver la meilleure selon vos besoins.",
                  },
                  {
                    q: "Combien coûte une RC auto en Guinée ?",
                    a: "À titre indicatif, les tarifs RC auto démarrent autour de 150 000 à 300 000 GNF par an pour un véhicule particulier, selon la puissance et la compagnie. Ces prix sont des exemples — contactez directement les compagnies pour un devis personnalisé.",
                  },
                  {
                    q: "Comment déclarer un sinistre en Guinée ?",
                    a: "Contactez immédiatement votre compagnie d'assurance (numéro sur votre attestation). Pour un accident auto, remplissez un constat amiable. Rassemblez photos, témoignages et documents. La déclaration doit généralement être faite dans les 5 jours ouvrables.",
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

            {/* CTA final */}
            <div className="rounded-2xl p-8 text-center"
              style={{ background: `linear-gradient(135deg, ${ASSURANCE_DARK} 0%, ${ASSURANCE_COLOR} 100%)` }}>
              <p className="text-xl font-extrabold text-white mb-2">Besoin d&apos;un conseil pour votre assurance ?</p>
              <p className="text-sm mb-5" style={{ color: "rgba(255,255,255,0.75)" }}>
                Un conseiller Help&apos;me Process analyse votre situation et vous recommande la meilleure assurance — gratuitement.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link href="/assurances/comparateur/"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white"
                  style={{ backgroundColor: ASSURANCE_COLOR }}>
                  Comparateur assurances →
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
                <p className="font-bold mb-2" style={{ color: "var(--color-text)" }}>🛡️ Devis assurance</p>
                <p className="text-xs mb-3" style={{ color: "var(--color-muted)" }}>
                  Un expert vous aide à trouver la meilleure assurance selon votre profil — gratuitement.
                </p>
                <a href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Bonjour, je souhaite un devis assurance en Guinée.")}`}
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
