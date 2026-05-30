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
  title: "Comment choisir la meilleure box internet en Guinée 2026 — Guide | HP Selectra",
  description:
    "Guide complet pour choisir votre box internet en Guinée : Orange Box, Telecel Box, GUILAB, Guinée Télécom. Comparez les débits, les prix et la couverture.",
}

const TOC_ITEMS = [
  { id: "intro", label: "Quel type de connexion ?" },
  { id: "etape-1", label: "1. Évaluer vos besoins" },
  { id: "etape-2", label: "2. Vérifier la couverture" },
  { id: "etape-3", label: "3. Comparer les FAI" },
  { id: "etape-4", label: "4. Choisir votre offre" },
  { id: "etape-5", label: "5. Installer et configurer" },
  { id: "comparatif", label: "Tableau comparatif FAI" },
  { id: "faq", label: "Questions fréquentes" },
]

export default function GuideMeilleureBoxInternetPage() {
  const jsonLdHowTo = buildJsonLd(howToSchema({
    name: "Comment choisir la meilleure box internet en Guinée",
    description: "Guide pratique pour comparer et choisir votre box internet en Guinée selon vos besoins, votre budget et votre localisation.",
    url: `${BASE_URL}/fai/guides/meilleure-box-internet`,
    totalTime: "PT12M",
    steps: [
      { name: "Évaluer vos besoins en débit", text: "Identifiez l'utilisation principale : navigation, streaming, télétravail. Une famille avec 3-4 appareils a besoin d'au moins 10 Mbps de débit stable.", url: `${BASE_URL}/fai/guides/meilleure-box-internet#etape-1` },
      { name: "Vérifier la couverture dans votre zone", text: "Contactez les opérateurs ou consultez nos fiches pour savoir quels FAI couvrent votre adresse. Orange Box couvre la majorité des zones urbaines.", url: `${BASE_URL}/fai/guides/meilleure-box-internet#etape-2` },
      { name: "Comparer les fournisseurs FAI guinéens", text: "Utilisez le HP Score pour comparer Orange Box, Telecel Box, Guinée Télécom et GUILAB selon le débit, le prix et la qualité de service.", url: `${BASE_URL}/fai/comparateur` },
      { name: "Choisir votre offre et votre box", text: "Sélectionnez l'offre adaptée à votre volume mensuel : 5 Go (usage léger), 20 Go (usage modéré), 50 Go+ (usage intensif).", url: `${BASE_URL}/fai/guides/meilleure-box-internet#etape-4` },
      { name: "Installer et configurer votre box", text: "Insérez la carte SIM dans la box (4G) ou appelez le technicien (fibre/ADSL). Configurez le Wi-Fi avec un mot de passe sécurisé.", url: `${BASE_URL}/fai/guides/meilleure-box-internet#etape-5` },
    ],
  }))

  const jsonLdFaq = buildJsonLd(faqSchema([
    { question: "Quelle est la meilleure box internet en Guinée ?", answer: "Orange Box Guinée (HP Score A, 85/100) offre la meilleure couverture 4G nationale avec des débits entre 5 et 50 Mbps. Pour les entreprises, GUILAB propose des liaisons fibre dédiées avec garantie de débit. Telecel Box est compétitive en zone urbaine." },
    { question: "Combien coûte une box internet en Guinée ?", answer: "Les boxes internet en Guinée vont de 80 000 GNF/mois (Telecel Box 10 Go) à plus de 300 000 GNF/mois pour les offres entreprises fibre. La gamme Orange Box se situe entre 150 000 et 400 000 GNF selon le volume. Tarifs indicatifs à vérifier." },
    { question: "Y a-t-il internet illimité en Guinée ?", answer: "Les offres illimitées sans plafond sont rares et coûteuses. La plupart des opérateurs proposent des offres avec limite de volume (5 Go, 20 Go, 50 Go) avec réduction de débit après épuisement. Contactez nos conseillers pour les dernières offres disponibles." },
  ]))

  const jsonLdBreadcrumb = buildJsonLd(breadcrumbSchema([
    { name: "Accueil", href: "/" },
    { name: "Internet Fixe", href: "/fai/" },
    { name: "Guides", href: "/fai/guides/" },
    { name: "Meilleure box internet" },
  ]))

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdHowTo }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdFaq }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdBreadcrumb }} />

      {/* Hero */}
      <section className="py-12 sm:py-16" style={{ background: "linear-gradient(135deg, #003087 0%, #0070C0 100%)" }}>
        <div className="container max-w-3xl">
          <nav className="flex items-center gap-1.5 text-xs mb-5" style={{ color: "rgba(255,255,255,0.5)" }}>
            <Link href="/" className="hover:text-white">Accueil</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/fai/" className="hover:text-white">Internet Fixe</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">Guide : Meilleure box internet</span>
          </nav>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold mb-4" style={{ backgroundColor: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.9)" }}>
            📡 Guide complet · Lecture : 10 min
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3 leading-tight">
            Comment choisir la meilleure box internet en Guinée
          </h1>
          <p className="text-base mb-6" style={{ color: "rgba(255,255,255,0.75)" }}>
            Orange Box, Telecel Box, Guinée Télécom, GUILAB : comparatif complet pour trouver la connexion internet adaptée à votre foyer ou entreprise.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/fai/comparateur" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white" style={{ backgroundColor: "#0070C0" }}>
              Comparer les FAI →
            </Link>
            <a href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Bonjour, je cherche la meilleure box internet en Guinée.")}`}
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
              <h2 className="text-xl font-extrabold mb-3" style={{ color: "var(--color-text)" }}>Quel type de connexion internet en Guinée ?</h2>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--color-text)" }}>
                Avant de comparer les offres, identifiez le type de connexion disponible dans votre zone :
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { type: "📶 Box 4G", desc: "Connectée au réseau mobile. Flexible, sans installation filaire. Orange Box et Telecel Box.", speed: "5–50 Mbps", avail: "Zones couvertes 4G" },
                  { type: "🔌 ADSL", desc: "Via la ligne téléphonique fixe. Plus stable mais limité aux zones câblées. Guinée Télécom.", speed: "2–8 Mbps", avail: "Conakry + grandes villes" },
                  { type: "⚡ Fibre optique", desc: "Très haut débit pour entreprises. GUILAB et Guinée Télécom zones spécifiques.", speed: "10–100 Mbps", avail: "Conakry entreprises" },
                  { type: "🛰️ Satellite VSAT", desc: "Solution pour zones isolées. Spacetel, iConnect. Idéal pour ONG et zones rurales.", speed: "2–20 Mbps", avail: "Tout le territoire" },
                ].map((t) => (
                  <div key={t.type} className="p-4 rounded-xl border text-sm" style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}>
                    <p className="font-bold mb-1" style={{ color: "var(--color-text)" }}>{t.type}</p>
                    <p className="text-xs mb-2" style={{ color: "var(--color-muted)" }}>{t.desc}</p>
                    <div className="flex gap-2 text-[10px] font-semibold">
                      <span className="px-2 py-0.5 rounded-full" style={{ backgroundColor: "var(--color-primary-light)", color: "var(--color-primary)" }}>{t.speed}</span>
                      <span className="px-2 py-0.5 rounded-full" style={{ backgroundColor: "var(--color-surface)", color: "var(--color-muted)" }}>{t.avail}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section id="etape-1" className="mb-10 scroll-mt-24">
              <div className="flex items-center gap-3 mb-4 px-4 py-3 rounded-xl" style={{ backgroundColor: "var(--color-surface)" }}>
                <span className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-extrabold shrink-0" style={{ backgroundColor: "var(--color-primary)" }}>1</span>
                <h2 className="text-lg font-extrabold" style={{ color: "var(--color-text)" }}>Évaluer vos besoins en débit</h2>
              </div>
              <div className="rounded-2xl border overflow-hidden" style={{ borderColor: "var(--color-border)" }}>
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ backgroundColor: "var(--color-surface)" }}>
                      {["Usage", "Appareils", "Débit min.", "Volume mensuel"].map(h => (
                        <th key={h} className="text-left px-4 py-2 text-xs font-semibold" style={{ color: "var(--color-muted)" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Navigation + WhatsApp", "1–2", "2 Mbps", "5–10 Go"],
                      ["Réseaux sociaux + YouTube", "2–3", "5 Mbps", "10–20 Go"],
                      ["Streaming HD + visio", "3–4", "10 Mbps", "20–50 Go"],
                      ["Télétravail intensif", "4+", "20 Mbps+", "50 Go+"],
                    ].map(([usage, appareils, debit, volume], i) => (
                      <tr key={usage as string} style={{ backgroundColor: i % 2 === 0 ? "var(--color-card)" : "var(--color-surface)", borderTop: "1px solid var(--color-border)" }}>
                        <td className="px-4 py-2.5 text-xs" style={{ color: "var(--color-text)" }}>{usage}</td>
                        <td className="px-4 py-2.5 text-xs" style={{ color: "var(--color-muted)" }}>{appareils}</td>
                        <td className="px-4 py-2.5 text-xs font-bold" style={{ color: "var(--color-primary)" }}>{debit}</td>
                        <td className="px-4 py-2.5 text-xs" style={{ color: "var(--color-muted)" }}>{volume}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section id="comparatif" className="mb-12 scroll-mt-24">
              <h2 className="text-xl font-extrabold mb-4" style={{ color: "var(--color-text)" }}>📊 Tableau comparatif des FAI guinéens</h2>
              <div className="p-4 rounded-xl border mb-4 text-sm" style={{ backgroundColor: "#e8f4fd", borderColor: "#0070C0" }}>
                <p className="font-bold mb-1" style={{ color: "#003087" }}>🏆 Notre choix HP Selectra</p>
                <p style={{ color: "var(--color-text)" }}><strong>Orange Box</strong> (HP Score A, 85/100) : meilleure box 4G pour usage résidentiel. <strong>GUILAB</strong> pour les entreprises.</p>
              </div>
              <Link href="/fai/comparateur" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-white" style={{ backgroundColor: "var(--color-primary)" }}>
                Voir le comparateur complet →
              </Link>
            </section>

            <section id="faq" className="mb-12 scroll-mt-24">
              <h2 className="text-xl font-extrabold mb-5" style={{ color: "var(--color-text)" }}>❓ Questions fréquentes</h2>
              <div className="space-y-3">
                {[
                  { q: "Quelle est la meilleure box internet en Guinée ?", a: "Orange Box Guinée (HP Score A, 85/100) offre la meilleure couverture 4G nationale avec des débits entre 5 et 50 Mbps. Pour les entreprises, GUILAB propose des liaisons fibre dédiées avec garantie de débit." },
                  { q: "Combien coûte une box internet en Guinée ?", a: "Les boxes vont de 80 000 GNF/mois (Telecel Box 10 Go) à 400 000+ GNF/mois pour les offres entreprises fibre. La gamme Orange Box se situe entre 150 000 et 400 000 GNF selon le volume. Tarifs indicatifs à vérifier." },
                  { q: "Y a-t-il internet illimité en Guinée ?", a: "Les offres illimitées sans plafond sont rares et coûteuses. La plupart proposent des offres avec limite de volume (5 Go, 20 Go, 50 Go) avec réduction de débit après épuisement." },
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

            <div className="rounded-2xl p-8 text-center" style={{ background: "linear-gradient(135deg, #003087 0%, #0070C0 100%)" }}>
              <p className="text-xl font-extrabold text-white mb-2">Trouvez votre box internet</p>
              <p className="text-sm mb-5" style={{ color: "rgba(255,255,255,0.75)" }}>Un conseiller Help&apos;me Process vérifie la couverture dans votre zone et vous recommande le meilleur FAI.</p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link href="/fai/comparateur" className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white" style={{ backgroundColor: "#0070C0" }}>
                  Comparateur FAI →
                </Link>
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
                <p className="font-bold mb-2" style={{ color: "var(--color-text)" }}>📡 Vérifier la couverture</p>
                <p className="text-xs mb-3" style={{ color: "var(--color-muted)" }}>Un conseiller vérifie votre zone et recommande le meilleur FAI.</p>
                <a href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Bonjour, je cherche la meilleure box internet dans ma zone en Guinée.")}`} target="_blank" rel="noopener noreferrer"
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
