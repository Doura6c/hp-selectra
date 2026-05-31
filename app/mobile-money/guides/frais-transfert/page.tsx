import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, MessageCircle, Phone } from "lucide-react"
import ReviewsSection from "@/components/ui/ReviewsSection"
import TableOfContents from "@/components/ui/TableOfContents"
import { buildJsonLd, howToSchema, faqSchema, breadcrumbSchema } from "@/lib/schema"

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "224628935335"
const CC_PHONE  = process.env.NEXT_PUBLIC_CC_PHONE        ?? "224628935335"
const BASE_URL  = "https://hpshop-afrique.vercel.app"

export const metadata: Metadata = {
  title: "Comment comparer les frais de transfert Mobile Money en Guinée 2026 — Guide",
  description:
    "Comparez les frais de transfert Orange Money, Soutra Money, MTN, Cellcom Money. Économisez sur vos envois d'argent en Guinée grâce à notre guide expert.",
}

const TOC_ITEMS = [
  { id: "intro", label: "Pourquoi les frais varient ?" },
  { id: "etape-1", label: "1. Identifier le type de transaction" },
  { id: "etape-2", label: "2. Comparer les barèmes" },
  { id: "etape-3", label: "3. Utiliser le calculateur HP" },
  { id: "etape-4", label: "4. Choisir le service le moins cher" },
  { id: "etape-5", label: "5. Effectuer l'opération" },
  { id: "tableau", label: "Tableau comparatif des frais" },
  { id: "faq", label: "Questions fréquentes" },
]

export default function GuideFraisTransfertPage() {
  const jsonLdHowTo = buildJsonLd(howToSchema({
    name: "Comment comparer les frais de transfert Mobile Money en Guinée",
    description: "Guide pratique pour comparer Orange Money, Soutra Money, MTN et Cellcom Money et économiser sur vos transferts.",
    url: `${BASE_URL}/mobile-money/guides/frais-transfert`,
    totalTime: "PT5M",
    estimatedCost: { currency: "GNF", value: "0" },
    steps: [
      { name: "Identifier le type de transaction", text: "Déterminez si vous faites un dépôt, un retrait ou un transfert. Les frais varient selon le type d'opération et le montant.", url: `${BASE_URL}/mobile-money/guides/frais-transfert#etape-1` },
      { name: "Comparer les barèmes de frais", text: "Chaque opérateur a son propre barème par tranche de montant. Soutra Money est souvent le moins cher sur les petits montants.", url: `${BASE_URL}/mobile-money/guides/frais-transfert#etape-2` },
      { name: "Utiliser le calculateur de frais HP Selectra", text: "Entrez votre montant dans notre calculateur gratuit pour voir instantanément quelle plateforme est la moins chère pour votre opération.", url: `${BASE_URL}/outils/calculateur-mobile-money` },
      { name: "Choisir le service le moins cher", text: "Sélectionnez le service qui affiche les frais les plus bas pour votre montant et votre type de transaction.", url: `${BASE_URL}/mobile-money/comparateur` },
      { name: "Effectuer l'opération", text: "Composez le menu USSD de votre opérateur ou utilisez son application mobile pour réaliser le transfert.", url: `${BASE_URL}/mobile-money/guides/comment-envoyer-argent` },
    ],
  }))

  const jsonLdFaq = buildJsonLd(faqSchema([
    { question: "Quel service Mobile Money a les frais les plus bas en Guinée ?", answer: "Soutra Money affiche généralement les frais les plus compétitifs, notamment sur les petits montants (moins de 500 000 GNF). Orange Money est très présent mais ses frais sont plus élevés. Utilisez notre calculateur pour comparer selon votre montant exact." },
    { question: "Comment sont calculés les frais de transfert Mobile Money ?", answer: "Les frais sont calculés par tranche de montant. Par exemple, pour un transfert de 100 000 GNF, les frais peuvent varier de 1 000 à 3 000 GNF selon l'opérateur. Le barème est fixé par l'opérateur sous supervision de la BCRG." },
    { question: "Est-ce que les transferts Mobile Money sont gratuits entre amis ?", answer: "Certains services proposent des promotions avec frais réduits ou nuls pour les transferts entre abonnés du même réseau. Renseignez-vous auprès de votre opérateur car les offres changent régulièrement." },
  ]))

  const jsonLdBreadcrumb = buildJsonLd(breadcrumbSchema([
    { name: "Accueil", href: "/" },
    { name: "Mobile Money", href: "/mobile-money/" },
    { name: "Guides", href: "/mobile-money/guides/" },
    { name: "Comparer les frais de transfert" },
  ]))

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdHowTo }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdFaq }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdBreadcrumb }} />

      {/* Hero */}
      <section
        className="py-12 sm:py-16"
        style={{ background: "linear-gradient(135deg, #1A5276 0%, #E67E22 100%)" }}
      >
        <div className="container max-w-3xl">
          <nav className="flex items-center gap-1.5 text-xs mb-5" style={{ color: "rgba(255,255,255,0.5)" }}>
            <Link href="/" className="hover:text-white">Accueil</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/mobile-money/" className="hover:text-white">Mobile Money</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">Guide : Frais de transfert</span>
          </nav>
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold mb-4"
            style={{ backgroundColor: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.9)" }}
          >
            💸 Guide complet · Lecture : 6 min
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3 leading-tight">
            Comment comparer les frais Mobile Money en Guinée
          </h1>
          <p className="text-base mb-6" style={{ color: "rgba(255,255,255,0.75)" }}>
            Orange Money, Soutra Money, MTN, Cellcom Money : les frais peuvent varier du simple au triple pour le même montant. Voici comment trouver le moins cher.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/outils/calculateur-mobile-money"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white"
              style={{ backgroundColor: "#E67E22" }}
            >
              Calculateur gratuit →
            </Link>
            <Link
              href="/mobile-money/comparateur"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white border border-white/30"
            >
              Comparateur Mobile Money
            </Link>
          </div>
        </div>
      </section>

      {/* Contenu + sidebar */}
      <div className="container py-12">
        <div className="grid lg:grid-cols-[1fr_280px] gap-10 items-start max-w-5xl mx-auto">

          <article>

            <section id="intro" className="mb-10 scroll-mt-24">
              <h2 className="text-xl font-extrabold mb-3" style={{ color: "var(--color-text)" }}>
                Pourquoi les frais Mobile Money varient-ils autant ?
              </h2>
              <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--color-text)" }}>
                En Guinée, chaque opérateur Mobile Money fixe librement ses barèmes de frais, dans le cadre réglementaire de la <strong>BCRG</strong> (Banque Centrale de la République de Guinée).
                Pour un même transfert de <strong>200 000 GNF</strong>, les frais peuvent varier de <strong>1 000 à 4 000 GNF</strong> selon l&apos;opérateur — soit une différence de 300 % !
              </p>
              <div
                className="p-4 rounded-xl text-sm"
                style={{ backgroundColor: "var(--color-primary-light)", borderLeft: "3px solid var(--color-primary)" }}
              >
                <strong>💡 Astuce HP Selectra :</strong> Notre calculateur de frais compare instantanément Orange Money, Soutra Money, MTN Mobile Money et Cellcom Money pour votre montant exact.
                {" "}<Link href="/outils/calculateur-mobile-money" className="underline font-semibold">Essayez maintenant →</Link>
              </div>
            </section>

            <section id="etape-1" className="mb-10 scroll-mt-24">
              <div className="flex items-center gap-3 mb-4 px-4 py-3 rounded-xl" style={{ backgroundColor: "var(--color-surface)" }}>
                <span className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-extrabold shrink-0" style={{ backgroundColor: "var(--color-primary)" }}>1</span>
                <h2 className="text-lg font-extrabold" style={{ color: "var(--color-text)" }}>Identifier le type de transaction</h2>
              </div>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--color-text)" }}>
                Les frais diffèrent selon l&apos;opération. Identifiez d&apos;abord votre besoin :
              </p>
              <div className="grid sm:grid-cols-3 gap-3">
                {[
                  { type: "💵 Dépôt", desc: "Ajouter de l'argent sur votre compte Mobile Money depuis du cash", note: "Souvent gratuit ou à faibles frais" },
                  { type: "🏧 Retrait", desc: "Retirer du cash depuis votre compte Mobile Money", note: "Les frais les plus élevés en général" },
                  { type: "↗️ Transfert", desc: "Envoyer de l'argent vers un autre numéro ou compte bancaire", note: "Frais variables selon le montant" },
                ].map((t) => (
                  <div key={t.type} className="p-4 rounded-xl border text-sm" style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}>
                    <p className="font-bold mb-1" style={{ color: "var(--color-text)" }}>{t.type}</p>
                    <p className="text-xs mb-2" style={{ color: "var(--color-muted)" }}>{t.desc}</p>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: "var(--color-primary-light)", color: "var(--color-primary)" }}>{t.note}</span>
                  </div>
                ))}
              </div>
            </section>

            <section id="etape-2" className="mb-10 scroll-mt-24">
              <div className="flex items-center gap-3 mb-4 px-4 py-3 rounded-xl" style={{ backgroundColor: "var(--color-surface)" }}>
                <span className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-extrabold shrink-0" style={{ backgroundColor: "var(--color-primary)" }}>2</span>
                <h2 className="text-lg font-extrabold" style={{ color: "var(--color-text)" }}>Comparer les barèmes de frais</h2>
              </div>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--color-text)" }}>
                Chaque opérateur a un barème progressif. Plus le montant est élevé, plus les frais absolus sont importants — mais le pourcentage tend à baisser.
                Voici un aperçu comparatif pour les retraits :
              </p>
              <div className="rounded-2xl border overflow-x-auto" style={{ borderColor: "var(--color-border)" }}>
                <table className="w-full text-sm min-w-[480px]">
                  <thead>
                    <tr style={{ backgroundColor: "var(--color-surface)" }}>
                      {["Tranche (GNF)", "Orange Money", "Soutra Money", "MTN MoMo"].map(h => (
                        <th key={h} className="text-left px-4 py-2 text-xs font-semibold" style={{ color: "var(--color-muted)" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["5 000 – 50 000", "500 GNF", "300 GNF ✅", "400 GNF"],
                      ["50 001 – 150 000", "1 500 GNF", "900 GNF ✅", "1 200 GNF"],
                      ["150 001 – 500 000", "3 000 GNF", "2 000 GNF ✅", "2 500 GNF"],
                      ["500 001 – 1 000 000", "5 000 GNF", "3 500 GNF ✅", "4 500 GNF"],
                    ].map(([range, ...fees], i) => (
                      <tr key={range} style={{ backgroundColor: i % 2 === 0 ? "var(--color-card)" : "var(--color-surface)", borderTop: "1px solid var(--color-border)" }}>
                        <td className="px-4 py-2.5 font-semibold text-xs" style={{ color: "var(--color-text)" }}>{range}</td>
                        {fees.map((fee, j) => (
                          <td key={j} className="px-4 py-2.5 text-xs" style={{ color: fee.includes("✅") ? "#6B8F3C" : "var(--color-muted)", fontWeight: fee.includes("✅") ? 700 : 400 }}>{fee}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs mt-2" style={{ color: "var(--color-muted)" }}>⚠️ Tarifs Soutra Money réels au 2026. Orange Money et MTN : données indicatives à vérifier.</p>
            </section>

            <section id="etape-3" className="mb-10 scroll-mt-24">
              <div className="flex items-center gap-3 mb-4 px-4 py-3 rounded-xl" style={{ backgroundColor: "var(--color-surface)" }}>
                <span className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-extrabold shrink-0" style={{ backgroundColor: "var(--color-primary)" }}>3</span>
                <h2 className="text-lg font-extrabold" style={{ color: "var(--color-text)" }}>Utiliser le calculateur HP Selectra</h2>
              </div>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--color-text)" }}>
                Notre calculateur gratuit compare instantanément tous les services pour votre montant et votre type d&apos;opération :
              </p>
              <div
                className="p-6 rounded-2xl border text-center"
                style={{ backgroundColor: "var(--color-primary-light)", borderColor: "var(--color-primary)" }}
              >
                <p className="text-3xl mb-2">🧮</p>
                <p className="font-bold mb-1" style={{ color: "var(--color-text)" }}>Calculateur de frais Mobile Money</p>
                <p className="text-sm mb-4" style={{ color: "var(--color-muted)" }}>Entrez votre montant → comparez toutes les plateformes en temps réel</p>
                <Link
                  href="/outils/calculateur-mobile-money"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white"
                  style={{ backgroundColor: "var(--color-primary)" }}
                >
                  Accéder au calculateur →
                </Link>
              </div>
            </section>

            <section id="etape-4" className="mb-10 scroll-mt-24">
              <div className="flex items-center gap-3 mb-4 px-4 py-3 rounded-xl" style={{ backgroundColor: "var(--color-surface)" }}>
                <span className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-extrabold shrink-0" style={{ backgroundColor: "var(--color-primary)" }}>4</span>
                <h2 className="text-lg font-extrabold" style={{ color: "var(--color-text)" }}>Choisir le service le moins cher</h2>
              </div>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--color-text)" }}>
                Une fois les frais comparés, choisissez le service le plus avantageux. Tenez compte aussi de la <strong>facilité d&apos;accès aux agents</strong> dans votre quartier.
              </p>
              <div
                className="p-4 rounded-xl border text-sm"
                style={{ backgroundColor: "#fff3e0", borderColor: "#E67E22" }}
              >
                <p className="font-bold mb-2" style={{ color: "#c04000" }}>💡 Conseil HP Selectra</p>
                <ul className="space-y-1" style={{ color: "var(--color-text)" }}>
                  <li>→ <strong>Petit montant (&lt; 100 000 GNF)</strong> : Soutra Money est généralement le moins cher</li>
                  <li>→ <strong>Gros montant (&gt; 500 000 GNF)</strong> : comparez systématiquement avec le calculateur</li>
                  <li>→ <strong>Transfert international</strong> : MTN MoMo ou Wave selon la destination</li>
                </ul>
              </div>
            </section>

            <section id="etape-5" className="mb-12 scroll-mt-24">
              <div className="flex items-center gap-3 mb-4 px-4 py-3 rounded-xl" style={{ backgroundColor: "var(--color-surface)" }}>
                <span className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-extrabold shrink-0" style={{ backgroundColor: "#6B8F3C" }}>5</span>
                <h2 className="text-lg font-extrabold" style={{ color: "var(--color-text)" }}>Effectuer l&apos;opération</h2>
              </div>
              <div className="space-y-3">
                {[
                  { code: "*144#", service: "Orange Money", desc: "Menu USSD Orange Money" },
                  { code: "*303#", service: "Soutra Money", desc: "Menu USSD Soutra Money (real tariffs)" },
                  { code: "*880#", service: "MTN MoMo", desc: "Menu USSD MTN Mobile Money" },
                ].map((s) => (
                  <div key={s.service} className="flex items-center gap-4 p-4 rounded-xl border text-sm" style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}>
                    <code className="px-3 py-1.5 rounded-lg font-mono font-bold text-xs" style={{ backgroundColor: "var(--color-primary-light)", color: "var(--color-primary)" }}>{s.code}</code>
                    <div>
                      <p className="font-bold" style={{ color: "var(--color-text)" }}>{s.service}</p>
                      <p className="text-xs" style={{ color: "var(--color-muted)" }}>{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Tableau comparatif */}
            <section id="tableau" className="mb-12 scroll-mt-24">
              <h2 className="text-xl font-extrabold mb-4" style={{ color: "var(--color-text)" }}>📊 Tableau comparatif complet</h2>
              <Link
                href="/mobile-money/comparateur"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-white mb-6"
                style={{ backgroundColor: "var(--color-primary)" }}
              >
                Voir le comparateur Mobile Money →
              </Link>
              <Link
                href="/outils/calculateur-mobile-money"
                className="ml-3 inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold border"
                style={{ borderColor: "var(--color-border)", color: "var(--color-text)" }}
              >
                Calculateur de frais →
              </Link>
            </section>

            {/* FAQ */}
            <section id="faq" className="mb-12 scroll-mt-24">
              <h2 className="text-xl font-extrabold mb-5" style={{ color: "var(--color-text)" }}>❓ Questions fréquentes</h2>
              <div className="space-y-3">
                {[
                  { q: "Quel service Mobile Money a les frais les plus bas en Guinée ?", a: "Soutra Money affiche généralement les frais les plus compétitifs, notamment sur les petits montants (moins de 500 000 GNF). Orange Money est très présent mais ses frais sont plus élevés. Utilisez notre calculateur pour comparer selon votre montant exact." },
                  { q: "Comment sont calculés les frais de transfert Mobile Money ?", a: "Les frais sont calculés par tranche de montant. Pour un transfert de 100 000 GNF, les frais varient de 1 000 à 3 000 GNF selon l'opérateur. Le barème est fixé par l'opérateur sous supervision de la BCRG." },
                  { q: "Est-ce que les transferts Mobile Money sont gratuits entre amis ?", a: "Certains services proposent des promotions avec frais réduits ou nuls pour les transferts entre abonnés du même réseau. Renseignez-vous auprès de votre opérateur car les offres changent régulièrement." },
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

            <div className="rounded-2xl p-8 text-center" style={{ background: "linear-gradient(135deg, #1A5276 0%, #E67E22 100%)" }}>
              <p className="text-xl font-extrabold text-white mb-2">Calculez vos frais maintenant</p>
              <p className="text-sm mb-5" style={{ color: "rgba(255,255,255,0.75)" }}>Outil gratuit — résultat instantané — aucune inscription requise.</p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link href="/outils/calculateur-mobile-money" className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white" style={{ backgroundColor: "#E67E22" }}>
                  Calculateur de frais →
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
                <p className="font-bold mb-2" style={{ color: "var(--color-text)" }}>🧮 Outil gratuit</p>
                <p className="text-xs mb-3" style={{ color: "var(--color-muted)" }}>Comparez les frais pour votre montant exact.</p>
                <Link href="/outils/calculateur-mobile-money" className="flex items-center justify-center gap-2 w-full px-3 py-2.5 rounded-xl font-bold text-white text-xs" style={{ backgroundColor: "var(--color-primary)" }}>
                  Calculateur Mobile Money
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <ReviewsSection />
    </>
  )
}
