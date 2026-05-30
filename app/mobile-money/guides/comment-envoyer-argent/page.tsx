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
  title: "Comment envoyer de l'argent en Guinée 2026 — Guide Mobile Money | HP Selectra",
  description:
    "Guide complet pour envoyer de l'argent en Guinée via Mobile Money : Orange Money, Soutra Money, MTN. Étapes, frais et conseils pour économiser.",
}

const TOC_ITEMS = [
  { id: "intro", label: "Quel service choisir ?" },
  { id: "etape-1", label: "1. Créer ou vérifier votre compte" },
  { id: "etape-2", label: "2. Recharger votre compte" },
  { id: "etape-3", label: "3. Envoyer via USSD" },
  { id: "etape-4", label: "4. Envoyer via l'application" },
  { id: "etape-5", label: "5. Confirmer et garder le reçu" },
  { id: "codes-ussd", label: "Codes USSD de référence" },
  { id: "faq", label: "Questions fréquentes" },
]

export default function GuideCommentEnvoyerArgentPage() {
  const jsonLdHowTo = buildJsonLd(howToSchema({
    name: "Comment envoyer de l'argent en Guinée via Mobile Money",
    description: "Guide pratique étape par étape pour envoyer de l'argent en Guinée via Orange Money, Soutra Money ou MTN MoMo.",
    url: `${BASE_URL}/mobile-money/guides/comment-envoyer-argent`,
    totalTime: "PT5M",
    estimatedCost: { currency: "GNF", value: "500" },
    steps: [
      { name: "Vérifier votre solde et votre compte", text: "Assurez-vous que votre compte Mobile Money est actif et que vous avez suffisamment de solde pour le transfert et les frais.", url: `${BASE_URL}/mobile-money/guides/comment-envoyer-argent#etape-1` },
      { name: "Recharger votre compte si nécessaire", text: "Rechargez via un agent Mobile Money agréé ou dans une agence opérateur. Présentez votre carte d'identité et remettez le cash à l'agent.", url: `${BASE_URL}/mobile-money/guides/comment-envoyer-argent#etape-2` },
      { name: "Initier le transfert via USSD", text: "Composez le code USSD de votre opérateur (*144# Orange, *303# Soutra, *880# MTN), choisissez 'Transfert' puis entrez le numéro du bénéficiaire et le montant.", url: `${BASE_URL}/mobile-money/guides/comment-envoyer-argent#etape-3` },
      { name: "Confirmer avec votre code PIN", text: "Entrez votre code PIN secret à 4 chiffres pour valider la transaction. Ne partagez jamais votre PIN avec personne.", url: `${BASE_URL}/mobile-money/guides/comment-envoyer-argent#etape-3` },
      { name: "Conserver votre reçu de transaction", text: "Notez ou faites une capture d'écran du numéro de transaction (ID de référence). Il est indispensable en cas de réclamation.", url: `${BASE_URL}/mobile-money/guides/comment-envoyer-argent#etape-5` },
    ],
  }))

  const jsonLdFaq = buildJsonLd(faqSchema([
    { question: "Comment envoyer de l'argent avec Orange Money en Guinée ?", answer: "Composez *144# sur votre téléphone Orange Guinée. Sélectionnez '1 - Transfert d'argent', entrez le numéro du bénéficiaire, saisissez le montant, confirmez avec votre PIN. Vous recevrez un SMS de confirmation." },
    { question: "Quel est le plafond d'envoi par Mobile Money en Guinée ?", answer: "Les plafonds sont fixés par la BCRG. En général : 5 000 000 GNF par transaction et 10 000 000 GNF par jour pour les comptes vérifiés. Pour les comptes non vérifiés, les limites sont plus basses." },
    { question: "Que faire si le transfert Mobile Money ne s'est pas effectué ?", answer: "Notez d'abord le numéro de référence de la transaction. Appelez le service client de votre opérateur : Orange Money (+224 628 00 00 00), Soutra Money ou MTN MoMo. En cas de prélèvement sans confirmation, le remboursement est généralement effectué sous 24-48h." },
  ]))

  const jsonLdBreadcrumb = buildJsonLd(breadcrumbSchema([
    { name: "Accueil", href: "/" },
    { name: "Mobile Money", href: "/mobile-money/" },
    { name: "Guides", href: "/mobile-money/guides/" },
    { name: "Comment envoyer de l'argent" },
  ]))

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdHowTo }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdFaq }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdBreadcrumb }} />

      {/* Hero */}
      <section className="py-12 sm:py-16" style={{ background: "linear-gradient(135deg, #1A5276 0%, #27AE60 100%)" }}>
        <div className="container max-w-3xl">
          <nav className="flex items-center gap-1.5 text-xs mb-5" style={{ color: "rgba(255,255,255,0.5)" }}>
            <Link href="/" className="hover:text-white">Accueil</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/mobile-money/" className="hover:text-white">Mobile Money</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">Guide : Envoyer de l&apos;argent</span>
          </nav>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold mb-4" style={{ backgroundColor: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.9)" }}>
            💸 Guide pratique · Lecture : 5 min
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3 leading-tight">
            Comment envoyer de l&apos;argent en Guinée via Mobile Money
          </h1>
          <p className="text-base mb-6" style={{ color: "rgba(255,255,255,0.75)" }}>
            Orange Money, Soutra Money, MTN MoMo : guide complet en 5 étapes pour envoyer de l&apos;argent facilement et en toute sécurité.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/outils/calculateur-mobile-money" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white" style={{ backgroundColor: "#27AE60" }}>
              Calculer les frais →
            </Link>
            <Link href="/mobile-money/comparateur" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white border border-white/30">
              Comparateur Mobile Money
            </Link>
          </div>
        </div>
      </section>

      <div className="container py-12">
        <div className="grid lg:grid-cols-[1fr_280px] gap-10 items-start max-w-5xl mx-auto">

          <article>

            <section id="intro" className="mb-10 scroll-mt-24">
              <h2 className="text-xl font-extrabold mb-3" style={{ color: "var(--color-text)" }}>Quel service Mobile Money choisir ?</h2>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--color-text)" }}>
                En Guinée, vous avez le choix entre plusieurs services Mobile Money. Le choix dépend de votre opérateur et de celui du bénéficiaire. Les transferts inter-opérateurs sont possibles mais entraînent parfois des frais supplémentaires.
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { service: "🟠 Orange Money", code: "*144#", users: "Le plus utilisé", note: "Idéal si bénéficiaire est sur Orange" },
                  { service: "💙 Soutra Money", code: "*303#", users: "Frais les plus bas", note: "Recommandé pour petits montants" },
                  { service: "🔴 MTN MoMo", code: "*880#", users: "Réseau MTN", note: "Transferts inter-opérateurs disponibles" },
                  { service: "🟢 Cellcom Money", code: "*343#", users: "Zone Conakry", note: "Présent dans les quartiers populaires" },
                ].map((s) => (
                  <div key={s.service} className="p-4 rounded-xl border text-sm" style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}>
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-bold" style={{ color: "var(--color-text)" }}>{s.service}</p>
                      <code className="px-2 py-0.5 rounded font-mono text-xs font-bold" style={{ backgroundColor: "var(--color-primary-light)", color: "var(--color-primary)" }}>{s.code}</code>
                    </div>
                    <p className="text-xs font-semibold mb-0.5" style={{ color: "#6B8F3C" }}>{s.users}</p>
                    <p className="text-xs" style={{ color: "var(--color-muted)" }}>{s.note}</p>
                  </div>
                ))}
              </div>
            </section>

            {[
              {
                id: "etape-1",
                num: 1,
                title: "Vérifier votre compte et votre solde",
                content: (
                  <div>
                    <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--color-text)" }}>
                      Avant tout transfert, vérifiez que votre compte est actif et que votre solde est suffisant (montant + frais). Pour consulter votre solde :
                    </p>
                    <div className="space-y-2">
                      {[
                        { op: "Orange Money", code: "*144*5#" },
                        { op: "Soutra Money", code: "*303*4#" },
                        { op: "MTN MoMo", code: "*880*5#" },
                      ].map((s) => (
                        <div key={s.op} className="flex items-center gap-3 p-3 rounded-xl border text-sm" style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}>
                          <code className="px-2.5 py-1 rounded font-mono font-bold text-xs" style={{ backgroundColor: "var(--color-primary-light)", color: "var(--color-primary)" }}>{s.code}</code>
                          <span style={{ color: "var(--color-text)" }}>Solde {s.op}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ),
              },
              {
                id: "etape-2",
                num: 2,
                title: "Recharger votre compte si nécessaire",
                content: (
                  <p className="text-sm leading-relaxed" style={{ color: "var(--color-text)" }}>
                    Si votre solde est insuffisant, rechargez votre compte Mobile Money chez un agent agréé dans votre quartier. Apportez votre pièce d&apos;identité et le cash à déposer. L&apos;agent composera son code de dépôt — vous recevrez immédiatement un SMS de confirmation.
                  </p>
                ),
              },
            ].map(({ id, num, title, content }) => (
              <section key={id} id={id} className="mb-10 scroll-mt-24">
                <div className="flex items-center gap-3 mb-4 px-4 py-3 rounded-xl" style={{ backgroundColor: "var(--color-surface)" }}>
                  <span className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-extrabold shrink-0" style={{ backgroundColor: "var(--color-primary)" }}>{num}</span>
                  <h2 className="text-lg font-extrabold" style={{ color: "var(--color-text)" }}>{title}</h2>
                </div>
                {content}
              </section>
            ))}

            <section id="etape-3" className="mb-10 scroll-mt-24">
              <div className="flex items-center gap-3 mb-4 px-4 py-3 rounded-xl" style={{ backgroundColor: "var(--color-surface)" }}>
                <span className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-extrabold shrink-0" style={{ backgroundColor: "var(--color-primary)" }}>3</span>
                <h2 className="text-lg font-extrabold" style={{ color: "var(--color-text)" }}>Envoyer via USSD (sans internet)</h2>
              </div>
              <p className="text-sm mb-3" style={{ color: "var(--color-text)" }}>Exemple avec Orange Money — mêmes étapes pour les autres services :</p>
              <div className="space-y-2">
                {[
                  { step: "Composez *144#", detail: "Ouvre le menu Orange Money" },
                  { step: "Choisissez 1 — Transfert d'argent", detail: "Option de transfert vers un numéro" },
                  { step: "Entrez le numéro du bénéficiaire", detail: "Numéro de téléphone complet avec indicatif si nécessaire" },
                  { step: "Saisissez le montant à envoyer", detail: "En francs guinéens (GNF) sans séparateurs" },
                  { step: "Vérifiez et confirmez avec votre PIN", detail: "Entrez votre code PIN secret à 4 chiffres" },
                  { step: "Attendez le SMS de confirmation", detail: "Arrivée en quelques secondes avec l'ID de transaction" },
                ].map((s, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl border text-sm" style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}>
                    <span className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5" style={{ backgroundColor: "var(--color-primary)" }}>{i + 1}</span>
                    <div>
                      <p className="font-bold" style={{ color: "var(--color-text)" }}>{s.step}</p>
                      <p className="text-xs" style={{ color: "var(--color-muted)" }}>{s.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section id="etape-4" className="mb-10 scroll-mt-24">
              <div className="flex items-center gap-3 mb-4 px-4 py-3 rounded-xl" style={{ backgroundColor: "var(--color-surface)" }}>
                <span className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-extrabold shrink-0" style={{ backgroundColor: "var(--color-primary)" }}>4</span>
                <h2 className="text-lg font-extrabold" style={{ color: "var(--color-text)" }}>Envoyer via l&apos;application mobile</h2>
              </div>
              <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--color-text)" }}>
                Si vous avez internet, l&apos;application officielle offre une expérience plus conviviale avec l&apos;historique des transactions et la gestion des contacts fréquents.
              </p>
              <div className="grid sm:grid-cols-3 gap-3">
                {[
                  { app: "Orange Money App", steps: "Connexion → Envoyer → Numéro → Montant → PIN → Confirmer" },
                  { app: "Soutra Money App", steps: "Connexion → Transfert → Numéro → Montant → Valider → PIN" },
                  { app: "MTN MoMo App", steps: "Connexion → Payer → Envoyer → Numéro → Montant → PIN" },
                ].map((a) => (
                  <div key={a.app} className="p-4 rounded-xl border text-sm" style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}>
                    <p className="font-bold mb-2" style={{ color: "var(--color-text)" }}>{a.app}</p>
                    <p className="text-xs" style={{ color: "var(--color-muted)" }}>{a.steps}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="etape-5" className="mb-12 scroll-mt-24">
              <div className="flex items-center gap-3 mb-4 px-4 py-3 rounded-xl" style={{ backgroundColor: "var(--color-surface)" }}>
                <span className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-extrabold shrink-0" style={{ backgroundColor: "#6B8F3C" }}>5</span>
                <h2 className="text-lg font-extrabold" style={{ color: "var(--color-text)" }}>Confirmer et garder le reçu</h2>
              </div>
              <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--color-text)" }}>
                Une fois le transfert effectué, vous recevez un SMS de confirmation contenant :
              </p>
              <ul className="space-y-2 text-sm mb-4" style={{ color: "var(--color-text)" }}>
                {[
                  "L'identifiant unique de transaction (ID de référence)",
                  "Le montant transféré et les frais prélevés",
                  "Le numéro du bénéficiaire",
                  "La date et l'heure de la transaction",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full flex items-center justify-center text-white text-[10px] font-bold shrink-0 mt-0.5" style={{ backgroundColor: "#6B8F3C" }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="p-4 rounded-xl text-sm" style={{ backgroundColor: "#fff3e0", borderLeft: "3px solid #E67E22" }}>
                <strong>⚠️ Conservez ce SMS !</strong> Il est votre preuve de transaction. En cas de problème (montant non reçu, erreur de numéro), cet ID permet au service client de tracer et récupérer votre argent.
              </div>
            </section>

            <section id="codes-ussd" className="mb-12 scroll-mt-24">
              <h2 className="text-xl font-extrabold mb-4" style={{ color: "var(--color-text)" }}>📱 Codes USSD de référence — Mobile Money Guinée</h2>
              <div className="rounded-2xl border overflow-hidden" style={{ borderColor: "var(--color-border)" }}>
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ backgroundColor: "var(--color-surface)" }}>
                      {["Service", "Menu principal", "Transfert", "Solde", "Service client"].map(h => (
                        <th key={h} className="text-left px-4 py-2 text-xs font-semibold" style={{ color: "var(--color-muted)" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Orange Money", "*144#", "*144*1#", "*144*5#", "702"],
                      ["Soutra Money", "*303#", "*303*1#", "*303*4#", "303"],
                      ["MTN MoMo", "*880#", "*880*1#", "*880*5#", "100"],
                      ["Cellcom Money", "*343#", "*343*1#", "*343*4#", "343"],
                    ].map(([service, menu, transfert, solde, sc], i) => (
                      <tr key={service as string} style={{ backgroundColor: i % 2 === 0 ? "var(--color-card)" : "var(--color-surface)", borderTop: "1px solid var(--color-border)" }}>
                        <td className="px-4 py-2.5 font-bold text-xs" style={{ color: "var(--color-text)" }}>{service}</td>
                        {[menu, transfert, solde].map((code, j) => (
                          <td key={j} className="px-4 py-2.5">
                            <code className="px-2 py-0.5 rounded font-mono text-xs font-bold" style={{ backgroundColor: "var(--color-primary-light)", color: "var(--color-primary)" }}>{code}</code>
                          </td>
                        ))}
                        <td className="px-4 py-2.5">
                          <a href={`tel:${sc}`} className="text-xs font-semibold" style={{ color: "var(--color-primary)" }}>{sc}</a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs mt-2" style={{ color: "var(--color-muted)" }}>⚠️ Codes indicatifs à vérifier auprès de votre opérateur.</p>
            </section>

            <section id="faq" className="mb-12 scroll-mt-24">
              <h2 className="text-xl font-extrabold mb-5" style={{ color: "var(--color-text)" }}>❓ Questions fréquentes</h2>
              <div className="space-y-3">
                {[
                  { q: "Comment envoyer de l'argent avec Orange Money en Guinée ?", a: "Composez *144# sur votre téléphone Orange Guinée. Sélectionnez '1 - Transfert d'argent', entrez le numéro du bénéficiaire, saisissez le montant, confirmez avec votre PIN. Vous recevrez un SMS de confirmation." },
                  { q: "Quel est le plafond d'envoi par Mobile Money en Guinée ?", a: "En général : 5 000 000 GNF par transaction et 10 000 000 GNF par jour pour les comptes vérifiés. Pour les comptes non vérifiés, les limites sont plus basses. La BCRG fixe les plafonds maximaux." },
                  { q: "Que faire si le transfert Mobile Money ne s'est pas effectué ?", a: "Notez le numéro de référence de la transaction (dans le SMS de confirmation ou l'historique de votre compte). Appelez immédiatement le service client de votre opérateur. En cas de prélèvement sans confirmation, le remboursement est généralement effectué sous 24-48h." },
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

            <div className="rounded-2xl p-8 text-center" style={{ background: "linear-gradient(135deg, #1A5276 0%, #27AE60 100%)" }}>
              <p className="text-xl font-extrabold text-white mb-2">Calculez les frais avant d&apos;envoyer</p>
              <p className="text-sm mb-5" style={{ color: "rgba(255,255,255,0.75)" }}>Comparez Orange Money, Soutra Money et MTN pour votre montant exact.</p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link href="/outils/calculateur-mobile-money" className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white" style={{ backgroundColor: "#27AE60" }}>
                  Calculateur gratuit →
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
                <p className="font-bold mb-2" style={{ color: "var(--color-text)" }}>🧮 Comparer les frais</p>
                <p className="text-xs mb-3" style={{ color: "var(--color-muted)" }}>Trouvez le service le moins cher pour votre montant.</p>
                <Link href="/outils/calculateur-mobile-money"
                  className="flex items-center justify-center gap-2 w-full px-3 py-2.5 rounded-xl font-bold text-white text-xs"
                  style={{ backgroundColor: "var(--color-primary)" }}>
                  Calculateur de frais
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
