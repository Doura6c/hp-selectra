import type { Metadata } from "next"
import Link from "next/link"
import { PROVIDERS, OFFERS } from "@/lib/data/seed-data"
import ProviderFilters from "@/components/compare/ProviderFilters"
import { breadcrumbSchema, faqSchema, buildJsonLd } from "@/lib/schema"
import { Phone, MessageCircle, ChevronRight } from "lucide-react"

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "224628935335"
const CC_PHONE  = process.env.NEXT_PUBLIC_CC_PHONE        ?? "224628935335"

export const metadata: Metadata = {
  title: "Meilleur mobile money en Guinée 2026 — Comparatif frais | HP Selectra",
  description:
    "Comparez Soutra Money, Orange Money et MTN MoMo. Frais de transfert, dépôts, retraits — classement HP Score et conseils gratuits.",
}

const PROVIDERS_MM = PROVIDERS.filter((p) => p.verticalSlug === "mobile-money")
  .sort((a, b) => b.hpScoreNum - a.hpScoreNum)

const USAGES = [
  { icon: "💸", label: "Transférer de l'argent",   apps: ["Soutra Money"],         reason: "Frais les plus bas (1 %)" },
  { icon: "🏦", label: "Dépôts et retraits",        apps: ["Soutra Money"],         reason: "Dépôts et retraits GRATUITS" },
  { icon: "✈️", label: "Transfert France → Guinée", apps: ["Orange Money"],         reason: "Service international disponible" },
  { icon: "🏪", label: "Paiements marchands",       apps: ["Orange Money", "Soutra Money"], reason: "Réseau de marchands partenaires" },
]

export default function MobileMoneyComparateurPage() {
  const jsonLdBreadcrumb = buildJsonLd(breadcrumbSchema([
    { name: "Accueil", href: "/" },
    { name: "Mobile Money", href: "/mobile-money/" },
    { name: "Comparateur" },
  ]))
  const jsonLdFaq = buildJsonLd(faqSchema([
    { question: "Quel est le mobile money le moins cher en Guinée ?", answer: "Soutra Money est le moins cher : dépôts et retraits gratuits + transfert à 1 %. C'est le tarif le plus bas du marché guinéen, lancé en avril 2025 par Digital Pay / Groupe LANALA, agréé BCRG." },
    { question: "Comment envoyer de l'argent de la France vers la Guinée ?", answer: "Orange Money propose un service de transfert international depuis la France. Des plateformes comme Wave et WorldRemit sont également disponibles. Nos conseillers HP Selectra peuvent vous guider sur les meilleurs taux." },
    { question: "Soutra Money est-il fiable ?", answer: "Soutra Money est opéré par Digital Pay SA, filiale du Groupe LANALA, acteur reconnu en Guinée. Le service est agréé par la BCRG (Banque Centrale de la République de Guinée)." },
    { question: "Peut-on utiliser Orange Money sans être client Orange ?", answer: "Non, Orange Money est lié à un numéro Orange Guinée. Pour Soutra Money, l'application fonctionne indépendamment de l'opérateur mobile, ce qui est un avantage notable." },
  ]))
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdBreadcrumb }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdFaq }} />

      {/* Hero */}
      <section className="relative overflow-hidden py-14 sm:py-20"
        style={{ background: "linear-gradient(135deg, #2d5016 0%, #6B8F3C 100%)" }}>
        <div className="absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage: "repeating-linear-gradient(45deg,#fff 0,#fff 1px,transparent 0,transparent 50%)", backgroundSize: "24px 24px" }} />
        <div className="container relative">
          <nav className="flex items-center gap-1.5 text-xs mb-6" style={{ color: "rgba(255,255,255,0.5)" }}>
            <Link href="/" className="hover:text-white">Accueil</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/mobile-money/" className="hover:text-white">Mobile Money</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">Comparateur</span>
          </nav>
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold mb-5"
                style={{ backgroundColor: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.9)" }}>
                💸 Mis à jour {new Date().toLocaleDateString("fr-GN", { month: "long", year: "numeric" })}
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-4 leading-tight">
                Meilleur mobile money<br />en Guinée {new Date().getFullYear()}
              </h1>
              <p className="text-base mb-6" style={{ color: "rgba(255,255,255,0.75)" }}>
                Comparatif indépendant de {PROVIDERS_MM.length} services de mobile money.
                Transferts, dépôts, retraits — économisez sur chaque transaction.
              </p>
              {/* Highlight Soutra */}
              <div className="flex items-start gap-3 p-4 rounded-xl mb-6"
                style={{ backgroundColor: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)" }}>
                <span className="text-xl shrink-0">🏆</span>
                <p className="text-sm text-white">
                  <strong>Soutra Money</strong> — dépôts & retraits gratuits + transfert à 1 %.
                  Le tarif le plus bas du marché guinéen.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Bonjour, je veux comparer les services de mobile money en Guinée.")}`}
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-white"
                  style={{ backgroundColor: "#25D366" }}>
                  <MessageCircle className="w-4 h-4" /> Conseils gratuits
                </a>
                <a href={`tel:+${CC_PHONE}`}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white border border-white/30">
                  <Phone className="w-4 h-4" /> Appeler
                </a>
              </div>
            </div>
            {/* Mini classement */}
            <div className="rounded-2xl overflow-hidden shadow-2xl hidden lg:block"
              style={{ backgroundColor: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)" }}>
              <div className="px-5 py-3.5 border-b" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
                <p className="text-xs font-bold text-white">💸 Classement frais · HP Score</p>
              </div>
              {PROVIDERS_MM.map((p, i) => (
                <div key={p.slug} className="flex items-center gap-4 px-5 py-3.5 border-b last:border-b-0"
                  style={{ borderColor: "rgba(255,255,255,0.07)", backgroundColor: i === 0 ? "rgba(107,143,60,0.2)" : "transparent" }}>
                  <span className="text-xs font-extrabold w-5 text-center"
                    style={{ color: i === 0 ? "#F0A500" : "rgba(255,255,255,0.4)" }}>#{i + 1}</span>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-bold text-white shrink-0"
                    style={{ backgroundColor: p.brandColor ?? "#6B8F3C" }}>
                    {p.name.slice(0, 2).toUpperCase()}
                  </div>
                  <p className="flex-1 text-sm font-semibold text-white truncate">{p.name}</p>
                  <div className="text-right">
                    <span className="text-xs font-extrabold px-2 py-1 rounded-full text-white block"
                      style={{ backgroundColor: p.hpScore === "A" ? "#6B8F3C" : p.hpScore === "B" ? "#8FB84E" : "#F0A500" }}>
                      {p.hpScore}
                    </span>
                    {i === 0 && <span className="text-[10px] text-white/60 mt-0.5 block">1 % transfert</span>}
                  </div>
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
              { label: "📊 Tableau frais", href: "#tableau" },
              { label: "👤 Par usage", href: "#usages" },
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
          style={{ backgroundColor: "#f0f9e0", borderColor: "var(--color-secondary)" }}>
          <span className="text-3xl shrink-0">💚</span>
          <div>
            <p className="font-extrabold text-base mb-1" style={{ color: "#4e6a2c" }}>
              Notre sélection HP Selectra — Mobile Money Guinée {new Date().getFullYear()}
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--color-text)" }}>
              <strong>Soutra Money</strong> est notre grand gagnant (HP Score A, 91/100) : dépôts et retraits <strong>100 % gratuits</strong>,
              transfert à <strong>1 %</strong> (le plus bas du marché), paiement facture EDG.
              Pour les transferts internationaux France → Guinée, <strong>Orange Money</strong> reste la référence avec son réseau de 10 000 points.
            </p>
          </div>
        </div>

        {/* Classement avec filtres dynamiques */}
        <section id="classement" className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-2" style={{ color: "var(--color-text)" }}>
            🏆 Classement des services mobile money en Guinée
          </h2>
          <p className="text-sm mb-6" style={{ color: "var(--color-muted)" }}>
            {PROVIDERS_MM.length} services analysés · HP Score : frais, réseau d'agents, fonctionnalités.
          </p>
          <ProviderFilters
            providers={PROVIDERS_MM}
            offersByProvider={Object.fromEntries(
              PROVIDERS_MM.map((p) => [
                p.slug,
                OFFERS.filter((o) => o.providerSlug === p.slug && o.verticalSlug === "mobile-money")
                  .sort((a, b) => b.hpScoreNum - a.hpScoreNum),
              ])
            )}
            verticalSlug="mobile-money"
          />
        </section>

        {/* Tableau frais */}
        <section id="tableau" className="mb-16">
          <h2 className="text-2xl font-extrabold mb-6" style={{ color: "var(--color-text)" }}>📊 Comparatif des frais</h2>
          <div className="rounded-2xl border overflow-hidden" style={{ borderColor: "var(--color-border)" }}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ backgroundColor: "var(--color-surface)" }}>
                    {["Service", "Score", "Dépôt", "Retrait", "Transfert", "International"].map((h) => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wide"
                        style={{ color: "var(--color-muted)" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { slug: "soutra-money",  depot: "✅ Gratuit", retrait: "✅ Gratuit", transfert: "✅ 1 %",   intl: "⚠️ Non" },
                    { slug: "orange-money",  depot: "⚠️ Payant",  retrait: "⚠️ Payant",  transfert: "⚠️ 2–3 %", intl: "✅ France" },
                    { slug: "mtn-momo",      depot: "⚠️ Payant",  retrait: "⚠️ Payant",  transfert: "⚠️ 2–3 %", intl: "⚠️ Limité" },
                    { slug: "paycard-guinee",depot: "⚠️ Variable",retrait: "⚠️ Variable", transfert: "⚠️ Variable", intl: "⚠️ Non" },
                  ].map((row, i) => {
                    const p = PROVIDERS_MM.find((x) => x.slug === row.slug)
                    if (!p) return null
                    return (
                      <tr key={row.slug}
                        style={{ backgroundColor: i % 2 === 0 ? "var(--color-card)" : "var(--color-surface)", borderTop: "1px solid var(--color-border)" }}>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold text-white shrink-0"
                              style={{ backgroundColor: p.brandColor ?? "var(--color-primary)" }}>
                              {p.name.slice(0, 2).toUpperCase()}
                            </div>
                            <Link href={`/mobile-money/fournisseurs/${p.slug}/`}
                              className="font-semibold hover:underline" style={{ color: "var(--color-text)" }}>
                              {p.name}
                            </Link>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="inline-flex w-7 h-7 items-center justify-center rounded-full font-extrabold text-sm text-white"
                            style={{ backgroundColor: p.hpScore === "A" ? "#6B8F3C" : p.hpScore === "B" ? "#8FB84E" : "#F0A500" }}>
                            {p.hpScore}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-xs">{row.depot}</td>
                        <td className="px-4 py-3 text-xs">{row.retrait}</td>
                        <td className="px-4 py-3 text-xs font-semibold"
                          style={{ color: row.slug === "soutra-money" ? "var(--color-secondary)" : "inherit" }}>
                          {row.transfert}
                        </td>
                        <td className="px-4 py-3 text-xs">{row.intl}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <p className="text-xs mt-3" style={{ color: "var(--color-muted)" }}>⚠️ Tarifs indicatifs — vérifiez les grilles tarifaires actuelles auprès de chaque service.</p>
        </section>

        {/* Par usage */}
        <section id="usages" className="mb-16">
          <h2 className="text-2xl font-extrabold mb-3" style={{ color: "var(--color-text)" }}>🎯 Quel service selon votre usage ?</h2>
          <p className="text-sm mb-6" style={{ color: "var(--color-muted)" }}>Notre recommandation par type d'utilisation.</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {USAGES.map((u) => (
              <div key={u.label} className="p-5 rounded-2xl border"
                style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{u.icon}</span>
                  <div>
                    <p className="font-bold text-sm" style={{ color: "var(--color-text)" }}>{u.label}</p>
                    <p className="text-xs" style={{ color: "var(--color-muted)" }}>{u.reason}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {u.apps.map((appName) => {
                    const p = PROVIDERS_MM.find((x) => x.name === appName)
                    return p ? (
                      <Link key={appName} href={`/mobile-money/fournisseurs/${p.slug}/`}
                        className="text-xs font-bold px-3 py-2 rounded-xl text-white"
                        style={{ backgroundColor: p.brandColor ?? "var(--color-secondary)" }}>
                        {appName}
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
              { q: "Quel est le mobile money le moins cher en Guinée ?",
                a: "Soutra Money est le moins cher : dépôts et retraits gratuits + transfert à 1 %. C'est le tarif le plus bas du marché guinéen (lancé en avril 2025 par Digital Pay / Groupe LANALA)." },
              { q: "Comment envoyer de l'argent de la France vers la Guinée ?",
                a: "Orange Money propose un service de transfert international depuis la France. Des plateformes comme Wave et WorldRemit sont également disponibles. Nos conseillers peuvent vous guider sur les meilleurs taux." },
              { q: "Soutra Money est-il fiable ?",
                a: "Soutra Money est opéré par Digital Pay SA, filiale du Groupe LANALA, acteur reconnu en Guinée. Le service est agréé par la BCRG (Banque Centrale de la République de Guinée). Lancé en avril 2025, il connaît une adoption rapide." },
              { q: "Peut-on utiliser Orange Money sans être client Orange ?",
                a: "Non, Orange Money est lié à un numéro Orange Guinée. Pour Soutra Money, l'application fonctionne indépendamment de l'opérateur mobile, ce qui est un avantage notable." },
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
          style={{ background: "linear-gradient(135deg, #2d5016 0%, #6B8F3C 100%)" }}>
          <p className="text-2xl font-extrabold text-white mb-2">Quel service vous convient ?</p>
          <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.75)" }}>
            Un conseiller Help'me Process vous aide à choisir le mobile money le plus adapté — gratuitement.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Bonjour, je veux choisir le meilleur mobile money en Guinée.")}`}
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
