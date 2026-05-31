import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, MapPin, MessageCircle } from "lucide-react"
import { PROVIDERS } from "@/lib/data/seed-data"
import ReviewsSection from "@/components/ui/ReviewsSection"
import { buildJsonLd, faqSchema, breadcrumbSchema } from "@/lib/schema"

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "224628935335"

export const metadata: Metadata = {
  title: "Meilleur Mobile Money à Conakry 2026 — Comparatif frais | HP Selectra",
  description:
    "Comparez Orange Money, Soutra Money, MTN MoMo à Conakry. Frais de transfert, agents disponibles, conseils pour économiser sur vos opérations Mobile Money.",
  keywords: ["mobile money Conakry", "Orange Money Conakry", "Soutra Money Conakry", "transfert argent Conakry"],
}

const MM_PROVIDERS = PROVIDERS.filter((p) => p.verticalSlug === "mobile-money")
  .sort((a, b) => b.hpScoreNum - a.hpScoreNum)

const AGENTS_ZONES = [
  { commune: "Kaloum (Centre)", orange: "🟠 Très dense", soutra: "💙 Dense", mtn: "🔴 Présent" },
  { commune: "Ratoma", orange: "🟠 Très dense", soutra: "💙 Dense", mtn: "🔴 Présent" },
  { commune: "Matam", orange: "🟠 Dense", soutra: "💙 Présent", mtn: "🔴 Limité" },
  { commune: "Dixinn", orange: "🟠 Dense", soutra: "💙 Dense", mtn: "🔴 Présent" },
  { commune: "Matoto", orange: "🟠 Dense", soutra: "💙 Présent", mtn: "🔴 Limité" },
]

export default function MobileMoneyConakryPage() {
  const jsonLdFaq = buildJsonLd(faqSchema([
    { question: "Quel service Mobile Money est le plus répandu à Conakry ?", answer: "Orange Money est le plus utilisé à Conakry grâce au vaste réseau d'agents dans toutes les communes. Soutra Money gagne du terrain avec des frais compétitifs, surtout à Kaloum et Ratoma. MTN MoMo est présent dans les zones commerciales." },
    { question: "Où trouver un agent Mobile Money à Conakry ?", answer: "Les agents Mobile Money sont présents dans tous les quartiers de Conakry — dans les boutiques, marchés et au bord des routes principales. Orange Money a le réseau d'agents le plus dense. Pour Soutra Money, cherchez les points avec le logo bleu." },
    { question: "Quels sont les frais de transfert Mobile Money à Conakry ?", answer: "Les frais varient selon le service et le montant. Pour 100 000 GNF : Orange Money ≈ 1 500 GNF, Soutra Money ≈ 900 GNF (tarifs réels), MTN ≈ 1 200 GNF. Utilisez notre calculateur gratuit pour comparer selon votre montant exact." },
  ]))
  const jsonLdBreadcrumb = buildJsonLd(breadcrumbSchema([
    { name: "Accueil", href: "/" },
    { name: "Mobile Money", href: "/mobile-money/" },
    { name: "Conakry" },
  ]))

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdFaq }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdBreadcrumb }} />

      {/* Hero */}
      <section className="py-12 sm:py-16" style={{ background: "linear-gradient(135deg, #1A5276 0%, #E67E22 100%)" }}>
        <div className="container max-w-3xl">
          <nav className="flex items-center gap-1.5 text-xs mb-5" style={{ color: "rgba(255,255,255,0.5)" }}>
            <Link href="/" className="hover:text-white">Accueil</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/mobile-money/" className="hover:text-white">Mobile Money</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">Conakry</span>
          </nav>
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-5 h-5 text-white/70" />
            <span className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.7)" }}>Conakry — Guinée</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3 leading-tight">
            Meilleur Mobile Money à Conakry {new Date().getFullYear()}
          </h1>
          <p className="text-base mb-6" style={{ color: "rgba(255,255,255,0.75)" }}>
            Comparez Orange Money, Soutra Money et MTN MoMo à Conakry : frais, agents disponibles par commune, conseils pour économiser sur vos transferts.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/outils/calculateur-mobile-money" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white" style={{ backgroundColor: "#E67E22" }}>
              Calculer les frais →
            </Link>
            <a href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Bonjour, je cherche le meilleur service Mobile Money à Conakry.")}`}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white border border-white/30">
              <MessageCircle className="w-4 h-4" /> Conseil gratuit
            </a>
          </div>
        </div>
      </section>

      <div className="container py-12 max-w-4xl mx-auto">

        {/* Verdict */}
        <div className="flex items-start gap-4 p-5 rounded-2xl border mb-10" style={{ backgroundColor: "#fff8e1", borderColor: "#E67E22" }}>
          <span className="text-2xl shrink-0">💸</span>
          <div>
            <p className="font-extrabold text-sm mb-1" style={{ color: "#c04000" }}>Conakry : marché Mobile Money le plus dynamique de Guinée</p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--color-text)" }}>
              Conakry concentre le plus grand nombre d&apos;agents Mobile Money du pays.
              <strong> Soutra Money</strong> propose les frais les plus bas sur les petits montants (tarifs réels vérifiés).
              <strong> Orange Money</strong> a le réseau le plus dense. Utilisez notre calculateur pour comparer selon votre montant.
            </p>
          </div>
        </div>

        {/* Classement */}
        <section className="mb-12">
          <h2 className="text-xl font-extrabold mb-4" style={{ color: "var(--color-text)" }}>🏆 Classement HP Score — Mobile Money à Conakry</h2>
          <div className="space-y-3">
            {MM_PROVIDERS.map((p, i) => (
              <Link key={p.slug} href={`/mobile-money/fournisseurs/${p.slug}/`}
                className="flex items-center gap-4 p-4 rounded-2xl border transition-all hover:shadow-md"
                style={{ backgroundColor: "var(--color-card)", borderColor: i === 0 ? "#E67E22" : "var(--color-border)" }}>
                <span className="text-lg font-extrabold w-6 text-center" style={{ color: i === 0 ? "#F0A500" : "var(--color-muted)" }}>#{i + 1}</span>
                {p.logo ? (
                  <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0"><img src={p.logo} alt={p.name} className="w-full h-full object-cover" /></div>
                ) : (
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-xs font-extrabold shrink-0" style={{ backgroundColor: p.brandColor ?? "var(--color-primary)" }}>
                    {p.name.split(/[\s-]+/).slice(0, 2).map((w: string) => w[0]?.toUpperCase() ?? "").join("")}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm" style={{ color: "var(--color-text)" }}>{p.name}</p>
                  <p className="text-xs truncate" style={{ color: "var(--color-muted)" }}>{p.description?.slice(0, 70)}…</p>
                </div>
                <span className="w-8 h-8 flex items-center justify-center rounded-full text-white font-extrabold text-sm shrink-0"
                  style={{ backgroundColor: p.hpScore === "A" ? "#6B8F3C" : p.hpScore === "B" ? "#8FB84E" : "#F0A500" }}>
                  {p.hpScore}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Agents par commune */}
        <section className="mb-12">
          <h2 className="text-xl font-extrabold mb-4" style={{ color: "var(--color-text)" }}>📍 Présence agents Mobile Money par commune</h2>
          <div className="rounded-2xl border overflow-hidden" style={{ borderColor: "var(--color-border)" }}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[460px]">
                <thead>
                  <tr style={{ backgroundColor: "var(--color-surface)" }}>
                    {["Commune de Conakry", "Orange Money", "Soutra Money", "MTN MoMo"].map(h => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--color-muted)" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {AGENTS_ZONES.map((z, i) => (
                    <tr key={z.commune} style={{ backgroundColor: i % 2 === 0 ? "var(--color-card)" : "var(--color-surface)", borderTop: "1px solid var(--color-border)" }}>
                      <td className="px-4 py-3 font-semibold text-sm" style={{ color: "var(--color-text)" }}>{z.commune}</td>
                      <td className="px-4 py-3 text-xs">{z.orange}</td>
                      <td className="px-4 py-3 text-xs">{z.soutra}</td>
                      <td className="px-4 py-3 text-xs">{z.mtn}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Comparaison frais rapide */}
        <section className="mb-12">
          <h2 className="text-xl font-extrabold mb-4" style={{ color: "var(--color-text)" }}>💰 Comparaison frais rapide — Conakry</h2>
          <div className="p-5 rounded-2xl border text-sm" style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}>
            <p className="font-bold mb-4" style={{ color: "var(--color-text)" }}>Exemple : retrait de 100 000 GNF</p>
            <div className="space-y-3">
              {[
                { name: "Soutra Money", logo: "/logos/soutra-money.png", frais: "900 GNF", note: "Tarifs réels vérifiés ✅", color: "#1A5276", best: true },
                { name: "MTN MoMo", logo: "/logos/mtn-momo.svg", frais: "≈ 1 200 GNF", note: "Indicatif à vérifier", color: "#E30613", best: false },
                { name: "Orange Money", logo: "/logos/orange-money.svg", frais: "≈ 1 500 GNF", note: "Indicatif à vérifier", color: "#FF6600", best: false },
              ].map((s) => (
                <div key={s.name} className="flex items-center gap-4 p-3 rounded-xl" style={{ backgroundColor: s.best ? "rgba(107,143,60,0.08)" : "var(--color-surface)", border: s.best ? "1px solid #6B8F3C" : "1px solid var(--color-border)" }}>
                  <div className="w-8 h-8 rounded-lg overflow-hidden shrink-0"><img src={s.logo} alt={s.name} className="w-full h-full object-cover" /></div>
                  <div className="flex-1">
                    <p className="font-bold" style={{ color: "var(--color-text)" }}>{s.name}</p>
                    <p className="text-xs" style={{ color: "var(--color-muted)" }}>{s.note}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-extrabold" style={{ color: s.best ? "#6B8F3C" : "var(--color-text)" }}>{s.frais}</p>
                    {s.best && <span className="text-[10px] font-semibold" style={{ color: "#6B8F3C" }}>LE MOINS CHER</span>}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs mt-3" style={{ color: "var(--color-muted)" }}>⚠️ Seuls les tarifs Soutra Money sont réels. Orange et MTN : données indicatives à vérifier.</p>
          </div>
          <Link href="/outils/calculateur-mobile-money"
            className="inline-flex items-center gap-2 mt-4 px-5 py-3 rounded-xl text-sm font-bold text-white"
            style={{ backgroundColor: "var(--color-primary)" }}>
            Calculateur pour votre montant →
          </Link>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="text-xl font-extrabold mb-5" style={{ color: "var(--color-text)" }}>❓ FAQ — Mobile Money à Conakry</h2>
          <div className="space-y-3">
            {[
              { q: "Quel service Mobile Money est le plus répandu à Conakry ?", a: "Orange Money est le plus utilisé grâce au vaste réseau d'agents dans toutes les communes. Soutra Money gagne du terrain avec des frais compétitifs. MTN MoMo est présent dans les zones commerciales." },
              { q: "Où trouver un agent Mobile Money à Conakry ?", a: "Les agents sont dans tous les quartiers — boutiques, marchés, bords de route. Orange Money a le réseau le plus dense. Pour Soutra Money, cherchez les points avec le logo bleu." },
              { q: "Quels sont les frais de transfert Mobile Money à Conakry ?", a: "Pour 100 000 GNF : Orange Money ≈ 1 500 GNF, Soutra Money ≈ 900 GNF (tarifs réels), MTN ≈ 1 200 GNF. Utilisez notre calculateur pour votre montant exact." },
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
      </div>

      <ReviewsSection />
    </>
  )
}
