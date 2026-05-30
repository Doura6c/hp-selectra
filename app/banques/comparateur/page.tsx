import type { Metadata } from "next"
import Link from "next/link"
import { PROVIDERS, OFFERS } from "@/lib/data/seed-data"
import ProviderFilters from "@/components/compare/ProviderFilters"
import { breadcrumbSchema, faqSchema, buildJsonLd } from "@/lib/schema"
import { Phone, MessageCircle, ChevronRight } from "lucide-react"
import ReviewsSection from "@/components/ui/ReviewsSection"

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "224628935335"
const CC_PHONE  = process.env.NEXT_PUBLIC_CC_PHONE        ?? "224628935335"

export const metadata: Metadata = {
  title: "Meilleures banques en Guinée 2026 — Comparatif & avis | HP Selectra",
  description:
    "Comparez les 6 meilleures banques guinéennes : Ecobank, BICIGUI, Orabank, UBA… Classement HP Score indépendant, pros/cons et conseils gratuits.",
}

const BANKS = PROVIDERS.filter((p) => p.verticalSlug === "banques")
  .sort((a, b) => b.hpScoreNum - a.hpScoreNum)

const PROFILES = [
  { icon: "👨‍💼", label: "Salarié & fonctionnaire",  banks: ["Ecobank Guinée", "BICIGUI"],         reason: "Domiciliation salaire facilitée" },
  { icon: "🏢", label: "Entrepreneur & PME",          banks: ["Orabank Guinée", "Ecobank Guinée"],  reason: "Produits entreprises complets" },
  { icon: "🎓", label: "Étudiant & jeune actif",      banks: ["UBA Guinée", "Vista Bank Guinée"],   reason: "Ouverture facile, frais réduits" },
  { icon: "🕌", label: "Finance islamique",            banks: ["Banque Islamique de Guinée"],        reason: "Produits halal (sans intérêt)" },
]

export default function BanquesComparateurPage() {
  const jsonLdBreadcrumb = buildJsonLd(breadcrumbSchema([
    { name: "Accueil", href: "/" },
    { name: "Banques", href: "/banques/" },
    { name: "Comparateur" },
  ]))
  const jsonLdFaq = buildJsonLd(faqSchema([
    { question: "Quelle est la meilleure banque en Guinée en 2026 ?", answer: "Selon notre HP Score, Ecobank Guinée (A / 84/100) domine grâce à son app mobile, ses 20 agences à Conakry et sa carte Visa internationale. Pour les PME, Orabank est souvent plus adaptée." },
    { question: "Comment ouvrir un compte bancaire en Guinée ?", answer: "Rendez-vous en agence avec : CNI ou passeport, justificatif de domicile, 2 photos d'identité et le dépôt minimum requis. Nos conseillers Help'me Process vous accompagnent gratuitement." },
    { question: "Y a-t-il des banques sans frais en Guinée ?", answer: "La plupart des banques guinéennes appliquent des frais de tenue de compte. Pour minimiser les frais, Soutra Money propose un portefeuille mobile avec dépôts et retraits 100 % gratuits." },
    { question: "Comment est calculé le HP Score pour les banques ?", answer: "Le HP Score (A à E, /100) prend en compte : tarifs et frais, services digitaux, réseau d'agences et d'ATM, qualité du service client, gamme de produits et conformité BCRG en Guinée." },
  ]))

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdBreadcrumb }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdFaq }} />

      {/* Hero */}
      <section className="relative overflow-hidden py-14 sm:py-20"
        style={{ background: "linear-gradient(135deg, #1B2E6B 0%, #2D3E8C 100%)" }}>
        <div className="absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage: "repeating-linear-gradient(45deg,#fff 0,#fff 1px,transparent 0,transparent 50%)", backgroundSize: "24px 24px" }} />
        <div className="container relative">
          <nav className="flex items-center gap-1.5 text-xs mb-6" style={{ color: "rgba(255,255,255,0.5)" }}>
            <Link href="/" className="hover:text-white">Accueil</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/banques/" className="hover:text-white">Banques</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">Comparateur</span>
          </nav>
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold mb-5"
                style={{ backgroundColor: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.9)" }}>
                🏦 Mis à jour {new Date().toLocaleDateString("fr-GN", { month: "long", year: "numeric" })}
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-4 leading-tight">
                Meilleures banques<br />en Guinée {new Date().getFullYear()}
              </h1>
              <p className="text-base mb-8" style={{ color: "rgba(255,255,255,0.75)" }}>
                Comparatif indépendant de {BANKS.length} banques guinéennes classées par HP Score.
                Compte courant, carte Visa, épargne — trouvez la banque idéale pour votre profil.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Bonjour, je cherche la meilleure banque en Guinée. Pouvez-vous m'aider ?")}`}
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
            {/* Mini classement */}
            <div className="rounded-2xl overflow-hidden shadow-2xl hidden lg:block"
              style={{ backgroundColor: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)" }}>
              <div className="px-5 py-3.5 border-b" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
                <p className="text-xs font-bold text-white">🏆 Top banques · HP Score</p>
              </div>
              {BANKS.slice(0, 4).map((b, i) => (
                <div key={b.slug} className="flex items-center gap-4 px-5 py-3.5 border-b last:border-b-0"
                  style={{ borderColor: "rgba(255,255,255,0.07)", backgroundColor: i === 0 ? "rgba(107,143,60,0.15)" : "transparent" }}>
                  <span className="text-xs font-extrabold w-5 text-center"
                    style={{ color: i === 0 ? "#F0A500" : "rgba(255,255,255,0.4)" }}>#{i + 1}</span>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-bold text-white shrink-0"
                    style={{ backgroundColor: b.brandColor ?? "#1D3461" }}>
                    {b.name.slice(0, 2).toUpperCase()}
                  </div>
                  <p className="flex-1 text-sm font-semibold text-white truncate">{b.name}</p>
                  <span className="text-xs font-extrabold px-2 py-1 rounded-full text-white"
                    style={{ backgroundColor: b.hpScore === "A" ? "#6B8F3C" : b.hpScore === "B" ? "#8FB84E" : "#F0A500" }}>
                    {b.hpScore}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Navigation ancres sticky */}
      <div className="sticky top-0 z-30 border-b overflow-x-auto"
        style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}>
        <div className="container">
          <div className="flex items-center min-w-max">
            {[
              { label: "🏆 Classement", href: "#classement" },
              { label: "📊 Tableau", href: "#tableau" },
              { label: "👤 Par profil", href: "#profils" },
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
              Notre sélection HP Selectra — Banques Guinée {new Date().getFullYear()}
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--color-text)" }}>
              <strong>Ecobank Guinée</strong> obtient le meilleur HP Score A (84/100) : application mobile primée, 20 agences Conakry, carte Visa internationale.
              Pour les PME, <strong>Orabank Guinée</strong> est le choix le plus complet.
              La <strong>Banque Islamique de Guinée</strong> reste l'unique option conforme à la finance halal.
            </p>
          </div>
        </div>

        {/* Classement avec filtres dynamiques */}
        <section id="classement" className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-2" style={{ color: "var(--color-text)" }}>
            🏆 Classement des meilleures banques guinéennes
          </h2>
          <p className="text-sm mb-6" style={{ color: "var(--color-muted)" }}>
            {BANKS.length} banques notées · HP Score indépendant · Tarifs, digital, réseau, services.
          </p>
          <ProviderFilters
            providers={BANKS}
            offersByProvider={Object.fromEntries(
              BANKS.map((bank) => [
                bank.slug,
                OFFERS.filter((o) => o.providerSlug === bank.slug && o.verticalSlug === "banques")
                  .sort((a, b) => b.hpScoreNum - a.hpScoreNum),
              ])
            )}
            verticalSlug="banques"
          />
        </section>

        {/* Tableau comparatif */}
        <section id="tableau" className="mb-16">
          <h2 className="text-2xl font-extrabold mb-6" style={{ color: "var(--color-text)" }}>
            📊 Tableau comparatif rapide
          </h2>
          <div className="rounded-2xl border overflow-hidden" style={{ borderColor: "var(--color-border)" }}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ backgroundColor: "var(--color-surface)" }}>
                    {["Banque", "Score", "App mobile", "Carte Visa", "Agences", "Site"].map((h) => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wide"
                        style={{ color: "var(--color-muted)" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {BANKS.map((bank, i) => (
                    <tr key={bank.slug}
                      style={{ backgroundColor: i % 2 === 0 ? "var(--color-card)" : "var(--color-surface)", borderTop: "1px solid var(--color-border)" }}>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold text-white shrink-0"
                            style={{ backgroundColor: bank.brandColor ?? "var(--color-primary)" }}>
                            {bank.name.slice(0, 2).toUpperCase()}
                          </div>
                          <Link href={`/banques/fournisseurs/${bank.slug}/`}
                            className="font-semibold hover:underline" style={{ color: "var(--color-text)" }}>
                            {bank.name}
                          </Link>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex w-7 h-7 items-center justify-center rounded-full font-extrabold text-sm text-white"
                          style={{ backgroundColor: bank.hpScore === "A" ? "#6B8F3C" : bank.hpScore === "B" ? "#8FB84E" : "#F0A500" }}>
                          {bank.hpScore}
                        </span>
                      </td>
                      <td className="px-4 py-3">{bank.hpScore === "A" ? "✅ Top" : bank.hpScore === "B" ? "✅ Bonne" : "⚠️ Basique"}</td>
                      <td className="px-4 py-3">{bank.slug === "banque-islamique-guinee" ? "⚠️ Limitée" : "✅ Oui"}</td>
                      <td className="px-4 py-3" style={{ color: "var(--color-muted)" }}>
                        {bank.slug === "ecobank-guinee" ? "20" : bank.slug === "bicigui" ? "35+" : bank.slug === "orabank-guinee" ? "8" : bank.slug === "uba-guinee" ? "6" : "4–5"}
                      </td>
                      <td className="px-4 py-3">
                        {bank.website
                          ? <a href={bank.website} target="_blank" rel="noopener noreferrer"
                              className="text-xs font-semibold px-2.5 py-1 rounded-lg"
                              style={{ backgroundColor: "var(--color-primary-light)", color: "var(--color-primary)" }}>
                              Visiter
                            </a>
                          : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="text-xs mt-3" style={{ color: "var(--color-muted)" }}>
            ⚠️ Données indicatives — confirmez les conditions auprès de chaque banque avant souscription.
          </p>
        </section>

        {/* Par profil */}
        <section id="profils" className="mb-16">
          <h2 className="text-2xl font-extrabold mb-3" style={{ color: "var(--color-text)" }}>
            🎯 Quelle banque selon votre profil ?
          </h2>
          <p className="text-sm mb-6" style={{ color: "var(--color-muted)" }}>Notre sélection personnalisée pour chaque situation.</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {PROFILES.map((profile) => (
              <div key={profile.label} className="p-5 rounded-2xl border"
                style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{profile.icon}</span>
                  <div>
                    <p className="font-bold text-sm" style={{ color: "var(--color-text)" }}>{profile.label}</p>
                    <p className="text-xs" style={{ color: "var(--color-muted)" }}>{profile.reason}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {profile.banks.map((bName) => {
                    const b = BANKS.find((x) => x.name === bName)
                    return b ? (
                      <Link key={bName} href={`/banques/fournisseurs/${b.slug}/`}
                        className="text-xs font-bold px-3 py-2 rounded-xl text-white"
                        style={{ backgroundColor: b.brandColor ?? "var(--color-primary)" }}>
                        {bName}
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
              { q: "Quelle est la meilleure banque en Guinée en 2026 ?",
                a: "Selon notre HP Score, Ecobank Guinée (A / 84/100) domine grâce à son app mobile, ses 20 agences Conakry et sa carte Visa internationale. Pour les PME, Orabank est souvent plus adaptée." },
              { q: "Comment ouvrir un compte bancaire en Guinée ?",
                a: "Rendez-vous en agence avec : CNI ou passeport, justificatif de domicile, 2 photos d'identité et le dépôt minimum requis. Nos conseillers Help'me Process vous accompagnent gratuitement." },
              { q: "Y a-t-il des banques sans frais en Guinée ?",
                a: "La plupart appliquent des frais de tenue de compte. Pour éviter les frais, Soutra Money propose un portefeuille mobile avec dépôts et retraits 100 % gratuits." },
              { q: "Comment est calculé le HP Score ?",
                a: "Le HP Score (A à E, /100) prend en compte : tarifs, services digitaux, réseau d'agences, qualité du service client et gamme de produits disponibles en Guinée. La note est attribuée de manière indépendante par HP Selectra." },
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

        {/* CTA final */}
        <div className="rounded-2xl p-8 text-center"
          style={{ background: "linear-gradient(135deg, #1B2E6B 0%, #2D3E8C 100%)" }}>
          <p className="text-2xl font-extrabold text-white mb-2">Pas encore décidé ?</p>
          <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.75)" }}>
            Un conseiller Help'me Process analyse votre profil et vous recommande la banque idéale — gratuitement.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Bonjour, je cherche la meilleure banque en Guinée pour mon profil.")}`}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white" style={{ backgroundColor: "#25D366" }}>
              <MessageCircle className="w-4 h-4" /> WhatsApp gratuit
            </a>
            <a href={`tel:+${CC_PHONE}`}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white border border-white/30">
              <Phone className="w-4 h-4" /> Appeler le conseiller
            </a>
          </div>
        </div>

      </div>

      <ReviewsSection />
    </>
  )
}
