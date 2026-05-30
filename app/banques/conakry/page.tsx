import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, MapPin, MessageCircle } from "lucide-react"
import { PROVIDERS } from "@/lib/data/seed-data"
import ReviewsSection from "@/components/ui/ReviewsSection"
import { buildJsonLd, faqSchema, breadcrumbSchema } from "@/lib/schema"

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "224628935335"

export const metadata: Metadata = {
  title: "Meilleures banques à Conakry 2026 — Comparatif | HP Selectra",
  description:
    "Comparez les banques à Conakry : Ecobank, Société Générale, BICIGUI, BOA. Frais, agences, services digitaux. Ouvrez votre compte en toute confiance.",
  keywords: ["banque Conakry", "ouvrir compte Conakry", "Ecobank Conakry", "BICIGUI Conakry", "meilleures banques Guinée"],
}

const BANQUE_PROVIDERS = PROVIDERS.filter((p) => p.verticalSlug === "banques")
  .sort((a, b) => b.hpScoreNum - a.hpScoreNum)

const AGENCES_CONAKRY = [
  { banque: "Ecobank Guinée", nb: "12+", zones: "Kaloum, Ratoma, Matam, Dixinn, Matoto", atm: "✅ DABs disponibles" },
  { banque: "Société Générale", nb: "8+", zones: "Kaloum, Ratoma, Almamya", atm: "✅ DABs disponibles" },
  { banque: "BICIGUI", nb: "10+", zones: "Kaloum, Dixinn, Matam, Ratoma", atm: "✅ DABs disponibles" },
  { banque: "BOA Guinée", nb: "6+", zones: "Kaloum, Ratoma, Kipé", atm: "⚠️ Limité" },
]

export default function BanquesConakryPage() {
  const jsonLdFaq = buildJsonLd(faqSchema([
    { question: "Quelle est la meilleure banque à Conakry ?", answer: "Ecobank Guinée (HP Score A, 85/100) est la banque la plus présente à Conakry avec plus de 12 agences et DABs dans toutes les communes. Société Générale est idéale pour les professionnels et les entreprises. BICIGUI offre les frais les plus accessibles." },
    { question: "Combien y a-t-il de banques à Conakry ?", answer: "Conakry compte plus de 15 banques commerciales agréées par la BCRG, dont Ecobank, Société Générale, BICIGUI, BOA, UBA, Orabank et plusieurs autres. La plupart ont leur siège social ou agence principale à Kaloum." },
    { question: "Comment ouvrir un compte bancaire à Conakry ?", answer: "Rendez-vous dans l'agence de votre choix avec votre CNI ou passeport, un justificatif de domicile récent, 2 photos d'identité et le dépôt minimum (50 000 à 200 000 GNF selon la banque). Le compte est généralement ouvert en 1 à 5 jours ouvrables." },
  ]))
  const jsonLdBreadcrumb = buildJsonLd(breadcrumbSchema([
    { name: "Accueil", href: "/" },
    { name: "Banques", href: "/banques/" },
    { name: "Conakry" },
  ]))

  return (
    <>
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
            <span className="text-white">Conakry</span>
          </nav>
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-5 h-5 text-white/70" />
            <span className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.7)" }}>Conakry — Capitale financière de Guinée</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3 leading-tight">
            Meilleures banques à Conakry {new Date().getFullYear()}
          </h1>
          <p className="text-base mb-6" style={{ color: "rgba(255,255,255,0.75)" }}>
            Comparatif complet des banques disponibles à Conakry : agences, services, frais, HP Score. Ouvrez votre compte avec l&apos;aide de nos experts.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/banques/comparateur" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white" style={{ backgroundColor: "#2E86C1" }}>
              Comparateur banques →
            </Link>
            <a href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Bonjour, je souhaite ouvrir un compte bancaire à Conakry.")}`}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white border border-white/30">
              <MessageCircle className="w-4 h-4" /> Conseil gratuit
            </a>
          </div>
        </div>
      </section>

      <div className="container py-12 max-w-4xl mx-auto">

        {/* Verdict */}
        <div className="flex items-start gap-4 p-5 rounded-2xl border mb-10" style={{ backgroundColor: "#e8f4fd", borderColor: "#2E86C1" }}>
          <span className="text-2xl shrink-0">🏦</span>
          <div>
            <p className="font-extrabold text-sm mb-1" style={{ color: "#003087" }}>Conakry : cœur financier de la Guinée avec 15+ banques agréées</p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--color-text)" }}>
              Toutes les grandes banques guinéennes ont leur siège ou agence principale à Conakry (Kaloum).
              <strong> Ecobank</strong> et <strong>BICIGUI</strong> ont le plus grand réseau d&apos;agences dans toutes les communes.
              La BCRG supervise l&apos;ensemble du secteur bancaire guinéen depuis Conakry.
            </p>
          </div>
        </div>

        {/* Classement */}
        <section className="mb-12">
          <h2 className="text-xl font-extrabold mb-4" style={{ color: "var(--color-text)" }}>🏆 Classement HP Score — Banques à Conakry</h2>
          <div className="space-y-3">
            {BANQUE_PROVIDERS.map((bank, i) => (
              <Link key={bank.slug} href={`/banques/fournisseurs/${bank.slug}/`}
                className="flex items-center gap-4 p-4 rounded-2xl border transition-all hover:shadow-md"
                style={{ backgroundColor: "var(--color-card)", borderColor: i === 0 ? "#2E86C1" : "var(--color-border)" }}>
                <span className="text-lg font-extrabold w-6 text-center" style={{ color: i === 0 ? "#F0A500" : "var(--color-muted)" }}>#{i + 1}</span>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-xs font-extrabold shrink-0"
                  style={{ backgroundColor: bank.brandColor ?? "var(--color-primary)" }}>
                  {bank.name.slice(0, 2).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm" style={{ color: "var(--color-text)" }}>{bank.name}</p>
                  <p className="text-xs truncate" style={{ color: "var(--color-muted)" }}>{bank.description?.slice(0, 70)}…</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="w-8 h-8 flex items-center justify-center rounded-full text-white font-extrabold text-sm"
                    style={{ backgroundColor: bank.hpScore === "A" ? "#6B8F3C" : bank.hpScore === "B" ? "#8FB84E" : "#F0A500" }}>
                    {bank.hpScore}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Agences Conakry */}
        <section className="mb-12">
          <h2 className="text-xl font-extrabold mb-4" style={{ color: "var(--color-text)" }}>📍 Agences et DABs à Conakry</h2>
          <div className="rounded-2xl border overflow-hidden" style={{ borderColor: "var(--color-border)" }}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[520px]">
                <thead>
                  <tr style={{ backgroundColor: "var(--color-surface)" }}>
                    {["Banque", "Nb agences", "Communes couvertes", "Retrait DAB"].map(h => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--color-muted)" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {AGENCES_CONAKRY.map((a, i) => (
                    <tr key={a.banque} style={{ backgroundColor: i % 2 === 0 ? "var(--color-card)" : "var(--color-surface)", borderTop: "1px solid var(--color-border)" }}>
                      <td className="px-4 py-3 font-bold text-sm" style={{ color: "var(--color-text)" }}>{a.banque}</td>
                      <td className="px-4 py-3 text-sm font-semibold" style={{ color: "var(--color-primary)" }}>{a.nb}</td>
                      <td className="px-4 py-3 text-xs" style={{ color: "var(--color-muted)" }}>{a.zones}</td>
                      <td className="px-4 py-3 text-sm" style={{ color: a.atm.includes("✅") ? "#6B8F3C" : "var(--color-muted)" }}>{a.atm}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="text-xs mt-2" style={{ color: "var(--color-muted)" }}>⚠️ Données indicatives — le nombre d&apos;agences peut varier. Consultez le site de la banque pour l&apos;adresse exacte.</p>
        </section>

        {/* Guide ouverture */}
        <section className="mb-12">
          <h2 className="text-xl font-extrabold mb-4" style={{ color: "var(--color-text)" }}>📋 Ouvrir un compte à Conakry</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: "🪪", title: "Documents requis", detail: "CNI ou passeport + justificatif domicile + 2 photos" },
              { icon: "💰", title: "Dépôt minimum", detail: "De 50 000 GNF (BICIGUI) à 200 000 GNF (Ecobank)" },
              { icon: "⏱️", title: "Délai d'ouverture", detail: "1 à 5 jours ouvrables après dépôt du dossier complet" },
              { icon: "📲", title: "Banque en ligne", detail: "Ecobank et SGBG offrent les meilleures apps mobiles" },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3 p-4 rounded-xl border text-sm" style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}>
                <span className="text-xl shrink-0">{item.icon}</span>
                <div>
                  <p className="font-bold mb-0.5" style={{ color: "var(--color-text)" }}>{item.title}</p>
                  <p style={{ color: "var(--color-muted)" }}>{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Link href="/banques/guides/ouvrir-compte"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-white"
              style={{ backgroundColor: "var(--color-primary)" }}>
              Guide complet : ouvrir un compte →
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="text-xl font-extrabold mb-5" style={{ color: "var(--color-text)" }}>❓ FAQ — Banques à Conakry</h2>
          <div className="space-y-3">
            {[
              { q: "Quelle est la meilleure banque à Conakry ?", a: "Ecobank Guinée (HP Score A, 85/100) est la plus présente avec plus de 12 agences et DABs dans toutes les communes. Société Générale est idéale pour les professionnels. BICIGUI offre les frais les plus accessibles." },
              { q: "Combien y a-t-il de banques à Conakry ?", a: "Conakry compte plus de 15 banques commerciales agréées par la BCRG, dont Ecobank, Société Générale, BICIGUI, BOA, UBA, Orabank. La plupart ont leur siège à Kaloum." },
              { q: "Comment ouvrir un compte bancaire à Conakry ?", a: "Rendez-vous en agence avec votre CNI, un justificatif de domicile, 2 photos et le dépôt minimum. Le compte est généralement ouvert en 1 à 5 jours ouvrables." },
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
