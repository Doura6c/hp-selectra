import type { Metadata } from "next"
import Link from "next/link"
import { PROVIDERS, OFFERS } from "@/lib/data/seed-data"
import RankedProviderCard from "@/components/compare/RankedProviderCard"
import { breadcrumbSchema, buildJsonLd } from "@/lib/schema"
import { Phone, MessageCircle, ChevronRight } from "lucide-react"

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "224628935335"
const CC_PHONE  = process.env.NEXT_PUBLIC_CC_PHONE        ?? "224628935335"

export const metadata: Metadata = {
  title: "Meilleur forfait mobile en Guinée 2026 — Comparatif opérateurs | HP Selectra",
  description:
    "Comparez Orange Guinée, Telecel et Cellcom. Classement HP Score indépendant, pass data, couverture réseau et conseils gratuits.",
}

const TELECOMS = PROVIDERS.filter(
  (p) => p.verticalSlug === "telecom" && p.slug !== "guinee-telecoms" && p.slug !== "vdc-skyvision"
).sort((a, b) => b.hpScoreNum - a.hpScoreNum)

const PROFILES = [
  { icon: "📸", label: "Gros consommateur data",  ops: ["Orange Guinée"],                    reason: "Meilleure couverture 4G nationale" },
  { icon: "💰", label: "Petit budget",             ops: ["Cellcom Guinée"],                   reason: "Forfaits les plus accessibles" },
  { icon: "🌙", label: "Usage nocturne/weekend",   ops: ["Telecel Guinée"],                   reason: "Meilleurs pass nuit et weekend" },
  { icon: "📞", label: "Appels + data illimités",  ops: ["Orange Guinée", "Telecel Guinée"],  reason: "Offres tout-en-un compètes" },
]

export default function TelecomComparateurPage() {
  const jsonLd = buildJsonLd(breadcrumbSchema([
    { name: "Accueil", href: "/" },
    { name: "Télécom", href: "/telecom/" },
    { name: "Comparateur" },
  ]))
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />

      {/* Hero */}
      <section className="relative overflow-hidden py-14 sm:py-20"
        style={{ background: "linear-gradient(135deg, #1D3461 0%, #c04000 100%)" }}>
        <div className="absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage: "repeating-linear-gradient(45deg,#fff 0,#fff 1px,transparent 0,transparent 50%)", backgroundSize: "24px 24px" }} />
        <div className="container relative">
          <nav className="flex items-center gap-1.5 text-xs mb-6" style={{ color: "rgba(255,255,255,0.5)" }}>
            <Link href="/" className="hover:text-white">Accueil</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/telecom/" className="hover:text-white">Télécom</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">Comparateur</span>
          </nav>
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold mb-5"
                style={{ backgroundColor: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.9)" }}>
                📱 Mis à jour {new Date().toLocaleDateString("fr-GN", { month: "long", year: "numeric" })}
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-4 leading-tight">
                Meilleur forfait mobile<br />en Guinée {new Date().getFullYear()}
              </h1>
              <p className="text-base mb-8" style={{ color: "rgba(255,255,255,0.75)" }}>
                Comparatif indépendant — Orange, Telecel, Cellcom.
                Pass data, appels illimités, couverture 4G : le meilleur forfait pour votre usage.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Bonjour, je cherche le meilleur forfait mobile en Guinée. Pouvez-vous m'aider ?")}`}
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-white"
                  style={{ backgroundColor: "#25D366" }}>
                  <MessageCircle className="w-4 h-4" /> Conseils gratuits
                </a>
                <a href={`tel:+${CC_PHONE}`}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white border border-white/30 hover:bg-white/10">
                  <Phone className="w-4 h-4" /> Appeler
                </a>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-2xl hidden lg:block"
              style={{ backgroundColor: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)" }}>
              <div className="px-5 py-3.5 border-b" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
                <p className="text-xs font-bold text-white">📱 Classement · HP Score</p>
              </div>
              {TELECOMS.map((op, i) => (
                <div key={op.slug} className="flex items-center gap-4 px-5 py-3.5 border-b last:border-b-0"
                  style={{ borderColor: "rgba(255,255,255,0.07)", backgroundColor: i === 0 ? "rgba(255,102,0,0.15)" : "transparent" }}>
                  <span className="text-xs font-extrabold w-5 text-center"
                    style={{ color: i === 0 ? "#F0A500" : "rgba(255,255,255,0.4)" }}>#{i + 1}</span>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-bold text-white shrink-0"
                    style={{ backgroundColor: op.brandColor ?? "#1D3461" }}>
                    {op.name.slice(0, 2).toUpperCase()}
                  </div>
                  <p className="flex-1 text-sm font-semibold text-white truncate">{op.name}</p>
                  <span className="text-xs font-extrabold px-2 py-1 rounded-full text-white"
                    style={{ backgroundColor: op.hpScore === "A" ? "#6B8F3C" : op.hpScore === "B" ? "#8FB84E" : "#F0A500" }}>
                    {op.hpScore}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Ancres sticky */}
      <div className="sticky top-0 z-30 border-b overflow-x-auto"
        style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}>
        <div className="container">
          <div className="flex items-center min-w-max">
            {[
              { label: "🏆 Classement", href: "#classement" },
              { label: "📊 Offres phares", href: "#offres" },
              { label: "👤 Par usage", href: "#profils" },
              { label: "❓ FAQ", href: "#faq" },
            ].map((a) => (
              <a key={a.href} href={a.href}
                className="text-xs font-semibold px-4 py-4 border-b-2 border-transparent hover:border-[var(--color-primary)] transition-colors whitespace-nowrap"
                style={{ color: "var(--color-text)" }}>
                {a.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="container py-12" style={{ maxWidth: "1000px", marginInline: "auto" }}>

        {/* Verdict */}
        <div className="flex items-start gap-4 p-6 rounded-2xl border mb-12"
          style={{ backgroundColor: "#fff3e0", borderColor: "#FF6600" }}>
          <span className="text-3xl shrink-0">🟠</span>
          <div>
            <p className="font-extrabold text-base mb-1" style={{ color: "#c04000" }}>
              Notre sélection HP Selectra — Forfaits Guinée {new Date().getFullYear()}
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--color-text)" }}>
              <strong>Orange Guinée</strong> s&apos;impose avec le HP Score A (88/100) : couverture 4G nationale, pass data variés et Orange Money intégré.
              <strong> Telecel Guinée</strong> brille sur les pass nuit/weekend très compétitifs.
              Pour les petits budgets sur Conakry, <strong>Cellcom</strong> reste le choix le plus économique.
            </p>
          </div>
        </div>

        {/* Classement */}
        <section id="classement" className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-2" style={{ color: "var(--color-text)" }}>
            🏆 Classement des opérateurs mobiles guinéens
          </h2>
          <p className="text-sm mb-8" style={{ color: "var(--color-muted)" }}>
            {TELECOMS.length} opérateurs analysés · Couverture, tarifs, qualité réseau, offres data.
          </p>
          <div className="space-y-6">
            {TELECOMS.map((op, i) => {
              const offers = OFFERS.filter((o) => o.providerSlug === op.slug && o.verticalSlug === "telecom")
                .sort((a, b) => b.hpScoreNum - a.hpScoreNum)
              return (
                <RankedProviderCard key={op.slug} provider={op} rank={i + 1}
                  verticalSlug="telecom" topOffers={offers} isRecommended={i === 0} />
              )
            })}
          </div>
        </section>

        {/* Offres phares */}
        <section id="offres" className="mb-16">
          <h2 className="text-2xl font-extrabold mb-6" style={{ color: "var(--color-text)" }}>📊 Comparatif offres phares</h2>
          <div className="rounded-2xl border overflow-hidden" style={{ borderColor: "var(--color-border)" }}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ backgroundColor: "var(--color-surface)" }}>
                    {["Opérateur", "Score", "Pass 1 Go", "Illimité", "Couverture", "Site"].map((h) => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wide"
                        style={{ color: "var(--color-muted)" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {TELECOMS.map((op, i) => (
                    <tr key={op.slug}
                      style={{ backgroundColor: i % 2 === 0 ? "var(--color-card)" : "var(--color-surface)", borderTop: "1px solid var(--color-border)" }}>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold text-white shrink-0"
                            style={{ backgroundColor: op.brandColor ?? "var(--color-primary)" }}>
                            {op.name.slice(0, 2).toUpperCase()}
                          </div>
                          <Link href={`/telecom/fournisseurs/${op.slug}/`}
                            className="font-semibold hover:underline" style={{ color: "var(--color-text)" }}>
                            {op.name}
                          </Link>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex w-7 h-7 items-center justify-center rounded-full font-extrabold text-sm text-white"
                          style={{ backgroundColor: op.hpScore === "A" ? "#6B8F3C" : op.hpScore === "B" ? "#8FB84E" : "#F0A500" }}>
                          {op.hpScore}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs" style={{ color: "var(--color-muted)" }}>
                        {op.slug === "orange-guinee" ? "≈ 30 000 GNF" : op.slug === "telecel-guinee" ? "≈ 25 000 GNF" : "≈ 15 000 GNF"}
                      </td>
                      <td className="px-4 py-3 text-xs">
                        {op.slug === "cellcom-guinee" ? "⚠️ Limité" : "✅ Oui"}
                      </td>
                      <td className="px-4 py-3 text-xs">
                        {op.slug === "orange-guinee" ? "🇬🇳 Nationale 4G" : op.slug === "telecel-guinee" ? "🏙️ Urbaine 4G" : "🏙️ Conakry"}
                      </td>
                      <td className="px-4 py-3">
                        {op.website ? (
                          <a href={op.website} target="_blank" rel="noopener noreferrer"
                            className="text-xs font-semibold px-2.5 py-1 rounded-lg"
                            style={{ backgroundColor: "var(--color-primary-light)", color: "var(--color-primary)" }}>
                            Visiter
                          </a>
                        ) : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="text-xs mt-3" style={{ color: "var(--color-muted)" }}>⚠️ Tarifs indicatifs — vérifiez directement auprès de l'opérateur.</p>
        </section>

        {/* Par usage */}
        <section id="profils" className="mb-16">
          <h2 className="text-2xl font-extrabold mb-3" style={{ color: "var(--color-text)" }}>🎯 Quel opérateur selon votre usage ?</h2>
          <p className="text-sm mb-6" style={{ color: "var(--color-muted)" }}>Notre recommandation selon votre profil d'utilisation.</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {PROFILES.map((p) => (
              <div key={p.label} className="p-5 rounded-2xl border"
                style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{p.icon}</span>
                  <div>
                    <p className="font-bold text-sm" style={{ color: "var(--color-text)" }}>{p.label}</p>
                    <p className="text-xs" style={{ color: "var(--color-muted)" }}>{p.reason}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {p.ops.map((opName) => {
                    const op = TELECOMS.find((x) => x.name === opName)
                    return op ? (
                      <Link key={opName} href={`/telecom/fournisseurs/${op.slug}/`}
                        className="text-xs font-bold px-3 py-2 rounded-xl text-white"
                        style={{ backgroundColor: op.brandColor ?? "var(--color-primary)" }}>
                        {opName}
                      </Link>
                    ) : null
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mb-16">
          <h2 className="text-2xl font-extrabold mb-6" style={{ color: "var(--color-text)" }}>❓ Questions fréquentes</h2>
          <div className="space-y-3">
            {[
              { q: "Quel est le meilleur opérateur mobile en Guinée en 2026 ?",
                a: "Orange Guinée (HP Score A, 88/100) domine grâce à sa couverture 4G nationale, ses offres variées et l'intégration Orange Money. Telecel est compétitif sur le data, Cellcom sur les prix bas à Conakry." },
              { q: "Quel opérateur a la meilleure couverture 4G en Guinée ?",
                a: "Orange Guinée dispose du réseau 4G le plus étendu couvrant Conakry et les grandes villes de l'intérieur. Telecel est en expansion rapide. Cellcom couvre principalement les zones urbaines." },
              { q: "Comment activer un pass data en Guinée ?",
                a: "Composez le code USSD de votre opérateur (ex: *200# Orange, *440# Telecel) ou utilisez l'application officielle. Nos conseillers peuvent vous guider gratuitement." },
              { q: "La portabilité du numéro existe-t-elle en Guinée ?",
                a: "La portabilité des numéros est en cours de déploiement sous la supervision de l'ARPT. Renseignez-vous auprès de votre opérateur actuel ou contactez nos conseillers." },
            ].map(({ q, a }) => (
              <details key={q} className="group rounded-2xl border overflow-hidden" style={{ borderColor: "var(--color-border)" }}>
                <summary className="flex items-center justify-between px-6 py-4 cursor-pointer list-none font-semibold text-sm"
                  style={{ backgroundColor: "var(--color-card)", color: "var(--color-text)" }}>
                  {q}
                  <span className="ml-3 shrink-0 font-bold text-xl" style={{ color: "var(--color-primary)" }}>+</span>
                </summary>
                <div className="px-6 py-4 text-sm leading-relaxed"
                  style={{ backgroundColor: "var(--color-surface)", color: "var(--color-muted)" }}>{a}</div>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="rounded-2xl p-8 text-center"
          style={{ background: "linear-gradient(135deg, #1D3461 0%, #c04000 100%)" }}>
          <p className="text-2xl font-extrabold text-white mb-2">Besoin d&apos;aide pour choisir ?</p>
          <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.75)" }}>
            Un conseiller Help'me Process analyse votre usage et vous recommande le meilleur forfait — gratuitement.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Bonjour, je cherche le meilleur forfait mobile en Guinée.")}`}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white" style={{ backgroundColor: "#25D366" }}>
              <MessageCircle className="w-4 h-4" /> WhatsApp gratuit
            </a>
            <a href={`tel:+${CC_PHONE}`}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white border border-white/30">
              <Phone className="w-4 h-4" /> Appeler
            </a>
          </div>
        </div>

      </div>
    </>
  )
}
