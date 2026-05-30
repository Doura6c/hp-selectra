import type { Metadata } from "next"
import Link from "next/link"
import { PROVIDERS, OFFERS } from "@/lib/data/seed-data"
import ProviderFilters from "@/components/compare/ProviderFilters"
import { Phone, MessageCircle, ChevronRight } from "lucide-react"

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "224628935335"
const CC_PHONE  = process.env.NEXT_PUBLIC_CC_PHONE        ?? "224628935335"

const FAI_PROVIDERS = PROVIDERS.filter((p) => p.verticalSlug === "fai")
  .sort((a, b) => b.hpScoreNum - a.hpScoreNum)

const PROFILES = [
  { icon: "🏠", label: "Usage résidentiel",     ops: ["Orange Box Guinée"],  reason: "Meilleure box 4G avec réseau national" },
  { icon: "🏢", label: "Entreprise & PME",       ops: ["GUILAB"],             reason: "Fibre dédiée avec garantie de débit" },
  { icon: "💰", label: "Petit budget",            ops: ["Telecel Box"],        reason: "Box Vana compétitive en zone urbaine" },
  { icon: "🌍", label: "Zone éloignée / isolée",  ops: ["Spacetel Guinée"],    reason: "Satellite disponible partout en Guinée" },
]

export default function FaiComparateurPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative overflow-hidden py-14 sm:py-20"
        style={{ background: "linear-gradient(135deg, #003087 0%, #0070C0 100%)" }}
      >
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg,#fff 0,#fff 1px,transparent 0,transparent 50%)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="container relative">
          <nav className="flex items-center gap-1.5 text-xs mb-6" style={{ color: "rgba(255,255,255,0.5)" }}>
            <Link href="/" className="hover:text-white">Accueil</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/fai/" className="hover:text-white">Internet Fixe</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">Comparateur</span>
          </nav>
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold mb-5"
                style={{ backgroundColor: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.9)" }}
              >
                📡 Mis à jour {new Date().toLocaleDateString("fr-GN", { month: "long", year: "numeric" })}
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-4 leading-tight">
                Meilleure box internet<br />en Guinée {new Date().getFullYear()}
              </h1>
              <p className="text-base mb-8" style={{ color: "rgba(255,255,255,0.75)" }}>
                Comparatif indépendant — Box 4G, ADSL, Fibre, Satellite.
                {FAI_PROVIDERS.length} fournisseurs analysés par nos experts selon le HP Score.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Bonjour, je cherche la meilleure box internet en Guinée. Pouvez-vous m'aider ?")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-white"
                  style={{ backgroundColor: "#25D366" }}
                >
                  <MessageCircle className="w-4 h-4" /> Conseils gratuits
                </a>
                <a
                  href={`tel:+${CC_PHONE}`}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white border border-white/30 hover:bg-white/10"
                >
                  <Phone className="w-4 h-4" /> Appeler
                </a>
              </div>
            </div>
            {/* Mini classement */}
            <div
              className="rounded-2xl overflow-hidden shadow-2xl hidden lg:block"
              style={{ backgroundColor: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)" }}
            >
              <div className="px-5 py-3.5 border-b" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
                <p className="text-xs font-bold text-white">📡 Classement · HP Score Internet Fixe</p>
              </div>
              {FAI_PROVIDERS.slice(0, 5).map((p, i) => (
                <div
                  key={p.slug}
                  className="flex items-center gap-4 px-5 py-3.5 border-b last:border-b-0"
                  style={{
                    borderColor: "rgba(255,255,255,0.07)",
                    backgroundColor: i === 0 ? "rgba(0,112,192,0.2)" : "transparent",
                  }}
                >
                  <span
                    className="text-xs font-extrabold w-5 text-center"
                    style={{ color: i === 0 ? "#F0A500" : "rgba(255,255,255,0.4)" }}
                  >
                    #{i + 1}
                  </span>
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-bold text-white shrink-0"
                    style={{ backgroundColor: p.brandColor ?? "#003087" }}
                  >
                    {p.name.slice(0, 2).toUpperCase()}
                  </div>
                  <p className="flex-1 text-sm font-semibold text-white truncate">{p.name}</p>
                  <span
                    className="text-xs font-extrabold px-2 py-1 rounded-full text-white"
                    style={{
                      backgroundColor:
                        p.hpScore === "A" ? "#6B8F3C" : p.hpScore === "B" ? "#8FB84E" : "#F0A500",
                    }}
                  >
                    {p.hpScore}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Ancres sticky */}
      <div
        className="sticky top-0 z-30 border-b overflow-x-auto"
        style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}
      >
        <div className="container">
          <div className="flex items-center min-w-max">
            {[
              { label: "🏆 Classement", href: "#classement" },
              { label: "📊 Comparatif", href: "#offres" },
              { label: "👤 Par usage", href: "#profils" },
              { label: "❓ FAQ", href: "#faq" },
            ].map((a) => (
              <a
                key={a.href}
                href={a.href}
                className="text-xs font-semibold px-4 py-4 border-b-2 border-transparent hover:border-[var(--color-primary)] transition-colors whitespace-nowrap"
                style={{ color: "var(--color-text)" }}
              >
                {a.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="container py-12" style={{ maxWidth: "1000px", marginInline: "auto" }}>

        {/* Verdict */}
        <div
          className="flex items-start gap-4 p-6 rounded-2xl border mb-12"
          style={{ backgroundColor: "#e8f4fd", borderColor: "#0070C0" }}
        >
          <span className="text-3xl shrink-0">🔵</span>
          <div>
            <p className="font-extrabold text-base mb-1" style={{ color: "#003087" }}>
              Notre sélection HP Selectra — Internet Fixe Guinée {new Date().getFullYear()}
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--color-text)" }}>
              <strong>Orange Box Guinée</strong> s&apos;impose avec le HP Score A (85/100) : réseau 4G national, box plug-and-play et support réactif.
              Pour les entreprises, <strong>GUILAB</strong> propose des liaisons fibre dédiées avec garantie de débit.
              Les petits budgets trouveront leur compte chez <strong>Telecel Box</strong> avec la gamme Vana compétitive.
            </p>
          </div>
        </div>

        {/* Classement avec filtres dynamiques */}
        <section id="classement" className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-2" style={{ color: "var(--color-text)" }}>
            🏆 Classement des FAI guinéens
          </h2>
          <p className="text-sm mb-6" style={{ color: "var(--color-muted)" }}>
            {FAI_PROVIDERS.length} fournisseurs analysés · Box 4G, ADSL, Fibre, Satellite.
          </p>
          <ProviderFilters
            providers={FAI_PROVIDERS}
            offersByProvider={Object.fromEntries(
              FAI_PROVIDERS.map((p) => [
                p.slug,
                OFFERS.filter((o) => o.providerSlug === p.slug && o.verticalSlug === "fai")
                  .sort((a, b) => b.hpScoreNum - a.hpScoreNum),
              ])
            )}
            verticalSlug="fai"
          />
        </section>

        {/* Comparatif tableau */}
        <section id="offres" className="mb-16">
          <h2 className="text-2xl font-extrabold mb-6" style={{ color: "var(--color-text)" }}>
            📊 Comparatif internet fixe en Guinée
          </h2>
          <div className="rounded-2xl border overflow-hidden" style={{ borderColor: "var(--color-border)" }}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ backgroundColor: "var(--color-surface)" }}>
                    {["Fournisseur", "Score", "Type", "Débit estimé", "Couverture", "Site"].map((h) => (
                      <th
                        key={h}
                        className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wide"
                        style={{ color: "var(--color-muted)" }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {FAI_PROVIDERS.map((p, i) => (
                    <tr
                      key={p.slug}
                      style={{
                        backgroundColor: i % 2 === 0 ? "var(--color-card)" : "var(--color-surface)",
                        borderTop: "1px solid var(--color-border)",
                      }}
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold text-white shrink-0"
                            style={{ backgroundColor: p.brandColor ?? "var(--color-primary)" }}
                          >
                            {p.name.slice(0, 2).toUpperCase()}
                          </div>
                          <Link
                            href={`/fai/fournisseurs/${p.slug}/`}
                            className="font-semibold hover:underline"
                            style={{ color: "var(--color-text)" }}
                          >
                            {p.name}
                          </Link>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className="inline-flex w-7 h-7 items-center justify-center rounded-full font-extrabold text-sm text-white"
                          style={{
                            backgroundColor:
                              p.hpScore === "A" ? "#6B8F3C" : p.hpScore === "B" ? "#8FB84E" : "#F0A500",
                          }}
                        >
                          {p.hpScore}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs" style={{ color: "var(--color-muted)" }}>
                        {p.slug === "guinee-telecom-fai"
                          ? "ADSL / Fibre"
                          : p.slug === "orange-box-guinee"
                          ? "4G Box"
                          : p.slug === "telecel-box-fai"
                          ? "4G Box"
                          : p.slug === "guilab-guinee"
                          ? "Fibre / Sans fil"
                          : p.slug === "iconnect-guinee"
                          ? "WiMAX / VSAT"
                          : "Satellite VSAT"}
                      </td>
                      <td className="px-4 py-3 text-xs" style={{ color: "var(--color-muted)" }}>
                        {p.slug === "orange-box-guinee"
                          ? "5–50 Mbps"
                          : p.slug === "telecel-box-fai"
                          ? "4–30 Mbps"
                          : p.slug === "guinee-telecom-fai"
                          ? "2–8 Mbps"
                          : p.slug === "guilab-guinee"
                          ? "10–100 Mbps"
                          : p.slug === "spacetel-guinee"
                          ? "2–20 Mbps"
                          : "2–15 Mbps"}
                      </td>
                      <td className="px-4 py-3 text-xs">
                        {p.slug === "orange-box-guinee"
                          ? "🇬🇳 Nationale 4G"
                          : p.slug === "telecel-box-fai"
                          ? "🏙️ Urbaine 4G"
                          : p.slug === "guinee-telecom-fai"
                          ? "🏙️ Conakry + villes"
                          : p.slug === "guilab-guinee"
                          ? "🏙️ Conakry entreprises"
                          : p.slug === "spacetel-guinee"
                          ? "🛰️ Partout en Guinée"
                          : "🏙️ Zones péri-urbaines"}
                      </td>
                      <td className="px-4 py-3">
                        {p.website ? (
                          <a
                            href={p.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-semibold px-2.5 py-1 rounded-lg"
                            style={{
                              backgroundColor: "var(--color-primary-light)",
                              color: "var(--color-primary)",
                            }}
                          >
                            Visiter
                          </a>
                        ) : (
                          "—"
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="text-xs mt-3" style={{ color: "var(--color-muted)" }}>
            ⚠️ Débits indicatifs — vérifiez directement auprès du fournisseur selon votre zone.
          </p>
        </section>

        {/* Par usage */}
        <section id="profils" className="mb-16">
          <h2 className="text-2xl font-extrabold mb-3" style={{ color: "var(--color-text)" }}>
            🎯 Quel FAI selon votre usage ?
          </h2>
          <p className="text-sm mb-6" style={{ color: "var(--color-muted)" }}>
            Notre recommandation selon votre profil et votre localisation.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {PROFILES.map((prof) => {
              const provider = FAI_PROVIDERS.find((p) => p.name === prof.ops[0])
              return (
                <div
                  key={prof.label}
                  className="p-5 rounded-2xl border"
                  style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">{prof.icon}</span>
                    <div>
                      <p className="font-bold text-sm" style={{ color: "var(--color-text)" }}>
                        {prof.label}
                      </p>
                      <p className="text-xs" style={{ color: "var(--color-muted)" }}>
                        {prof.reason}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {prof.ops.map((opName) =>
                      provider ? (
                        <Link
                          key={opName}
                          href={`/fai/fournisseurs/${provider.slug}/`}
                          className="text-xs font-bold px-3 py-2 rounded-xl text-white"
                          style={{ backgroundColor: provider.brandColor ?? "var(--color-primary)" }}
                        >
                          {opName}
                        </Link>
                      ) : null
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mb-16">
          <h2 className="text-2xl font-extrabold mb-6" style={{ color: "var(--color-text)" }}>
            ❓ Questions fréquentes sur l&apos;internet fixe en Guinée
          </h2>
          <div className="space-y-3">
            {[
              {
                q: "Quel est le meilleur fournisseur internet fixe en Guinée ?",
                a: "Orange Box Guinée (HP Score A, 85/100) domine avec sa box 4G fiable et son réseau national étendu. Pour les entreprises, GUILAB et iConnect offrent des solutions dédiées avec garanties de débit.",
              },
              {
                q: "Quelle est la différence entre box 4G et ADSL en Guinée ?",
                a: "La box 4G utilise le réseau mobile pour la connexion internet — plus flexible et disponible partout. L'ADSL passe par la ligne téléphonique fixe — généralement plus stable mais limité aux zones câblées de Conakry.",
              },
              {
                q: "Y a-t-il la fibre optique en Guinée ?",
                a: "La fibre optique est disponible à Conakry principalement pour les entreprises et certaines zones résidentielles haut de gamme via GUILAB et Guinée Télécom. Le déploiement grand public est en cours.",
              },
              {
                q: "Quel débit internet peut-on espérer en Guinée ?",
                a: "En box 4G, les débits varient de 5 à 50 Mbps selon l'opérateur et la zone. Les offres ADSL offrent 2 à 8 Mbps. La fibre peut atteindre 100 Mbps dans les zones couvertes. Contactez nos conseillers pour votre localisation.",
              },
            ].map(({ q, a }) => (
              <details
                key={q}
                className="group rounded-2xl border overflow-hidden"
                style={{ borderColor: "var(--color-border)" }}
              >
                <summary
                  className="flex items-center justify-between px-6 py-4 cursor-pointer list-none font-semibold text-sm"
                  style={{ backgroundColor: "var(--color-card)", color: "var(--color-text)" }}
                >
                  {q}
                  <span
                    className="ml-3 shrink-0 font-bold text-xl"
                    style={{ color: "var(--color-primary)" }}
                  >
                    +
                  </span>
                </summary>
                <div
                  className="px-6 py-4 text-sm leading-relaxed"
                  style={{ backgroundColor: "var(--color-surface)", color: "var(--color-muted)" }}
                >
                  {a}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div
          className="rounded-2xl p-8 text-center"
          style={{ background: "linear-gradient(135deg, #003087 0%, #0070C0 100%)" }}
        >
          <p className="text-2xl font-extrabold text-white mb-2">
            Besoin d&apos;aide pour choisir votre box ?
          </p>
          <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.75)" }}>
            Un conseiller Help&apos;me Process analyse votre localisation et vous recommande le meilleur FAI — gratuitement.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Bonjour, je cherche le meilleur internet fixe en Guinée.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white"
              style={{ backgroundColor: "#25D366" }}
            >
              <MessageCircle className="w-4 h-4" /> WhatsApp gratuit
            </a>
            <a
              href={`tel:+${CC_PHONE}`}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white border border-white/30"
            >
              <Phone className="w-4 h-4" /> Appeler
            </a>
          </div>
        </div>

      </div>
    </>
  )
}
