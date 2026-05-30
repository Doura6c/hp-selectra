import type { Metadata } from "next"
import Link from "next/link"
import { PROVIDERS, OFFERS } from "@/lib/data/seed-data"
import ProviderFilters from "@/components/compare/ProviderFilters"
import { breadcrumbSchema, faqSchema, buildJsonLd } from "@/lib/schema"
import { Phone, MessageCircle, ChevronRight, Shield } from "lucide-react"
import ReviewsSection from "@/components/ui/ReviewsSection"

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "224628935335"
const CC_PHONE  = process.env.NEXT_PUBLIC_CC_PHONE        ?? "224628935335"

export const metadata: Metadata = {
  title: "Comparateur assurances Guinée 2026 — RC auto, santé, habitation | HP Selectra",
  description:
    "Comparez toutes les offres d'assurance en Guinée : RC auto obligatoire, tous risques, santé individuelle et famille, habitation, vie. HP Score indépendant.",
}

const ASSUREURS = PROVIDERS.filter((p) => p.verticalSlug === "assurances")
  .sort((a, b) => b.hpScoreNum - a.hpScoreNum)

const ASSURANCE_OFFERS = OFFERS.filter((o) => o.verticalSlug === "assurances")

const PROFILES = [
  { icon: "🚗", label: "Conducteur solo",   assureurs: ["UGAR-Activa", "Lanala Assurances"],  reason: "RC auto aux meilleurs tarifs" },
  { icon: "👨‍👩‍👧", label: "Famille 4 personnes", assureurs: ["NSIA Assurances", "SUNU Assurances"], reason: "Santé famille + auto tous risques" },
  { icon: "🏢", label: "Chef d'entreprise", assureurs: ["NSIA Assurances", "UGAR-Activa"],     reason: "RC pro + flotte auto" },
  { icon: "👴", label: "Prévoyance retraite", assureurs: ["SAHAM / Sanlam Guinée"],              reason: "Assurance vie + épargne" },
]

const SCORE_COLOR: Record<string, string> = {
  A: "#6B8F3C", B: "#2E86C1", C: "#E67E22", D: "#e74c3c", E: "#95a5a6",
}

export default function AssurancesComparateurPage() {
  const jsonLdBreadcrumb = buildJsonLd(breadcrumbSchema([
    { name: "Accueil", href: "/" },
    { name: "Assurances", href: "/assurances/" },
    { name: "Comparateur" },
  ]))
  const jsonLdFaq = buildJsonLd(faqSchema([
    { question: "Quelle est la meilleure assurance auto en Guinée en 2026 ?", answer: "Selon notre HP Score, NSIA Assurances (A/86) est leader du marché avec la couverture la plus complète. UGAR-Activa (A/80) est très compétitif sur les tarifs RC auto. Nos conseillers Help'me Process peuvent vous orienter gratuitement." },
    { question: "L'assurance RC auto est-elle obligatoire en Guinée ?", answer: "Oui. La responsabilité civile automobile est obligatoire pour tout véhicule en circulation en Guinée, conformément au Code des assurances. Circuler sans attestation est passible d'une amende et de la mise en fourrière du véhicule." },
    { question: "Comment fonctionne le HP Score pour les assurances ?", answer: "Le HP Score (A à E, /100) évalue les compagnies sur : solidité financière, réseau d'agences, gamme de produits, tarifs pratiqués, rapidité de règlement des sinistres et conformité réglementaire en Guinée." },
    { question: "Existe-t-il une assurance santé accessible en Guinée ?", answer: "Oui. NSIA, SUNU et Lanala proposent des formules santé individuelle et famille. Les prix sont indicatifs dans notre comparateur — nos conseillers peuvent vous obtenir un devis précis selon votre profil et cliniques souhaitées." },
  ]))

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdBreadcrumb }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdFaq }} />

      {/* Hero */}
      <section className="relative overflow-hidden py-14 sm:py-20"
        style={{ background: "linear-gradient(135deg, #7B1A2E 0%, #B02840 100%)" }}>
        <div className="absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage: "repeating-linear-gradient(45deg,#fff 0,#fff 1px,transparent 0,transparent 50%)", backgroundSize: "24px 24px" }} />
        <div className="container relative">
          <nav className="flex items-center gap-1.5 text-xs mb-6" style={{ color: "rgba(255,255,255,0.5)" }}>
            <Link href="/" className="hover:text-white">Accueil</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/assurances/" className="hover:text-white">Assurances</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">Comparateur</span>
          </nav>
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold mb-5"
                style={{ backgroundColor: "rgba(255,255,255,0.15)", color: "#fff" }}>
                🛡️ {ASSUREURS.length} compagnies · {ASSURANCE_OFFERS.length} offres analysées
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 leading-tight">
                Comparez les assurances<br />en Guinée 2026
              </h1>
              <p className="text-base mb-6" style={{ color: "rgba(255,255,255,0.8)" }}>
                RC auto, tous risques, santé et habitation — classement indépendant HP Score.
                Tous les tarifs sont indicatifs ; nos conseillers obtiennent des devis précis gratuitement.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Bonjour, je cherche une assurance en Guinée. Pouvez-vous m'aider ?")}`}
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white"
                  style={{ backgroundColor: "#25D366" }}>
                  <MessageCircle className="w-4 h-4" /> Devis gratuit WhatsApp
                </a>
                <a href={`tel:${CC_PHONE}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white border border-white/30">
                  <Phone className="w-4 h-4" /> Être rappelé
                </a>
              </div>
            </div>
            {/* Mini-classement */}
            <div className="hidden lg:block">
              <div className="rounded-2xl overflow-hidden shadow-xl" style={{ backgroundColor: "rgba(255,255,255,0.08)" }}>
                <div className="px-5 py-3 border-b" style={{ borderColor: "rgba(255,255,255,0.12)" }}>
                  <p className="text-white text-xs font-bold uppercase tracking-wider">Classement HP Score 2026</p>
                </div>
                {ASSUREURS.slice(0, 4).map((a, i) => (
                  <div key={a.slug} className="flex items-center gap-4 px-5 py-3 border-b last:border-0"
                    style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                    <span className="text-xl font-extrabold" style={{ color: "rgba(255,255,255,0.3)", minWidth: 28 }}>
                      #{i + 1}
                    </span>
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold text-white shrink-0"
                      style={{ backgroundColor: a.brandColor ?? "#888" }}>
                      {a.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-semibold truncate">{a.name}</p>
                    </div>
                    <div className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-sm font-extrabold text-white"
                      style={{ backgroundColor: SCORE_COLOR[a.hpScore] ?? "#888" }}>
                      {a.hpScore}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ancres catégories */}
      <div className="sticky top-16 z-30 border-b overflow-x-auto"
        style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}>
        <div className="container flex items-center gap-1 py-2 min-w-max">
          {[
            { id: "rc-auto",       label: "🚗 RC Auto" },
            { id: "tous-risques",  label: "🛡️ Tous risques" },
            { id: "sante",         label: "🏥 Santé" },
            { id: "habitation",    label: "🏠 Habitation" },
            { id: "vie",           label: "💚 Vie & Épargne" },
            { id: "classement",    label: "🏆 Classement" },
          ].map((a) => (
            <a key={a.id} href={`#${a.id}`}
              className="px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors hover:bg-[#B02840] hover:text-white"
              style={{ color: "var(--color-muted)" }}
            >
              {a.label}
            </a>
          ))}
        </div>
      </div>

      <div className="container py-10">

        {/* RC Auto obligatoire */}
        <section id="rc-auto" className="mb-14 scroll-mt-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ backgroundColor: "#FFF8E1" }}>🚗</div>
            <div>
              <h2 className="text-xl font-bold" style={{ color: "var(--color-text)" }}>RC Auto — Assurance obligatoire</h2>
              <p className="text-xs" style={{ color: "var(--color-muted)" }}>Imposée par la loi guinéenne pour tout véhicule en circulation</p>
            </div>
            <span className="ml-auto px-2 py-1 rounded-full text-[10px] font-bold" style={{ backgroundColor: "#FFEBEE", color: "#C62828" }}>
              OBLIGATOIRE
            </span>
          </div>
          <ProviderFilters
            providers={ASSUREURS}
            offersByProvider={Object.fromEntries(
              ASSUREURS.map((a) => [
                a.slug,
                ASSURANCE_OFFERS.filter((o) => o.providerSlug === a.slug && o.category === "rc-auto"),
              ])
            )}
            verticalSlug="assurances"
          />
        </section>

        {/* Tous risques */}
        <section id="tous-risques" className="mb-14 scroll-mt-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ backgroundColor: "#FBE9E7" }}>🛡️</div>
            <div>
              <h2 className="text-xl font-bold" style={{ color: "var(--color-text)" }}>Tous Risques Auto</h2>
              <p className="text-xs" style={{ color: "var(--color-muted)" }}>Couverture complète : propre véhicule, vol, incendie, bris de glace</p>
            </div>
          </div>
          <ProviderFilters
            providers={ASSUREURS}
            offersByProvider={Object.fromEntries(
              ASSUREURS.map((a) => [
                a.slug,
                ASSURANCE_OFFERS.filter((o) => o.providerSlug === a.slug && o.category === "tous-risques"),
              ])
            )}
            verticalSlug="assurances"
          />
        </section>

        {/* Santé */}
        <section id="sante" className="mb-14 scroll-mt-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ backgroundColor: "#E8F5E9" }}>🏥</div>
            <div>
              <h2 className="text-xl font-bold" style={{ color: "var(--color-text)" }}>Assurance Santé</h2>
              <p className="text-xs" style={{ color: "var(--color-muted)" }}>Individuelle, famille — hospitalisation, consultations, pharmacie</p>
            </div>
          </div>
          <ProviderFilters
            providers={ASSUREURS}
            offersByProvider={Object.fromEntries(
              ASSUREURS.map((a) => [
                a.slug,
                ASSURANCE_OFFERS.filter((o) => o.providerSlug === a.slug && o.category === "sante"),
              ])
            )}
            verticalSlug="assurances"
          />
        </section>

        {/* Habitation */}
        <section id="habitation" className="mb-14 scroll-mt-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ backgroundColor: "#E3F2FD" }}>🏠</div>
            <div>
              <h2 className="text-xl font-bold" style={{ color: "var(--color-text)" }}>Assurance Habitation</h2>
              <p className="text-xs" style={{ color: "var(--color-muted)" }}>Incendie, vol, dégâts des eaux, RC locataire / propriétaire</p>
            </div>
          </div>
          <ProviderFilters
            providers={ASSUREURS}
            offersByProvider={Object.fromEntries(
              ASSUREURS.map((a) => [
                a.slug,
                ASSURANCE_OFFERS.filter((o) => o.providerSlug === a.slug && o.category === "habitation"),
              ])
            )}
            verticalSlug="assurances"
          />
        </section>

        {/* Vie & Épargne */}
        <section id="vie" className="mb-14 scroll-mt-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ backgroundColor: "#F3E5F5" }}>💚</div>
            <div>
              <h2 className="text-xl font-bold" style={{ color: "var(--color-text)" }}>Vie & Épargne</h2>
              <p className="text-xs" style={{ color: "var(--color-muted)" }}>Capital décès, épargne retraite, prévoyance</p>
            </div>
          </div>
          <ProviderFilters
            providers={ASSUREURS}
            offersByProvider={Object.fromEntries(
              ASSUREURS.map((a) => [
                a.slug,
                ASSURANCE_OFFERS.filter((o) => o.providerSlug === a.slug && o.category === "vie"),
              ])
            )}
            verticalSlug="assurances"
          />
        </section>

        {/* Classement compagnies */}
        <section id="classement" className="mb-14 scroll-mt-24">
          <h2 className="text-xl font-bold mb-6" style={{ color: "var(--color-text)" }}>
            🏆 Classement HP Score — Toutes compagnies
          </h2>
          <div className="rounded-2xl border overflow-hidden" style={{ borderColor: "var(--color-border)" }}>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ backgroundColor: "var(--color-surface)" }}>
                  <th className="text-left px-4 py-3 text-xs font-semibold" style={{ color: "var(--color-muted)" }}>#</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold" style={{ color: "var(--color-muted)" }}>COMPAGNIE</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold hidden sm:table-cell" style={{ color: "var(--color-muted)" }}>SPÉCIALITÉ</th>
                  <th className="px-4 py-3 text-xs font-semibold text-center" style={{ color: "var(--color-muted)" }}>HP SCORE</th>
                  <th className="px-4 py-3 text-xs font-semibold text-right" style={{ color: "var(--color-muted)" }}></th>
                </tr>
              </thead>
              <tbody>
                {ASSUREURS.map((a, i) => (
                  <tr key={a.slug} className="border-t" style={{ borderColor: "var(--color-border)", backgroundColor: i % 2 === 0 ? "var(--color-card)" : "var(--color-surface)" }}>
                    <td className="px-4 py-3 font-bold text-xs" style={{ color: "var(--color-muted)" }}>#{i + 1}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-bold text-white shrink-0"
                          style={{ backgroundColor: a.brandColor ?? "#888" }}>
                          {a.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold text-sm" style={{ color: "var(--color-text)" }}>{a.name}</p>
                          {a.tagline && <p className="text-xs truncate max-w-[180px]" style={{ color: "var(--color-muted)" }}>{a.tagline}</p>}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs hidden sm:table-cell" style={{ color: "var(--color-muted)" }}>
                      {a.verified ? "✅ Vérifié" : "⏳ En cours"}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="inline-flex w-9 h-9 rounded-full items-center justify-center font-extrabold text-sm text-white"
                        style={{ backgroundColor: SCORE_COLOR[a.hpScore] ?? "#888" }}>
                        {a.hpScore}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link href={`/assurances/fournisseurs/${a.slug}/`}
                        className="text-xs font-semibold px-3 py-1.5 rounded-lg"
                        style={{ backgroundColor: "var(--color-primary-light)", color: "var(--color-primary)" }}>
                        Voir →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Profils */}
        <section className="mb-14">
          <h2 className="text-xl font-bold mb-6" style={{ color: "var(--color-text)" }}>
            👤 Quelle assurance selon votre profil ?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PROFILES.map((p) => (
              <div key={p.label} className="p-5 rounded-2xl border"
                style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{p.icon}</span>
                  <p className="font-bold" style={{ color: "var(--color-text)" }}>{p.label}</p>
                </div>
                <p className="text-xs mb-3" style={{ color: "var(--color-muted)" }}>{p.reason}</p>
                <div className="flex flex-wrap gap-1">
                  {p.assureurs.map((name) => (
                    <span key={name} className="text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{ backgroundColor: "var(--color-primary-light)", color: "var(--color-primary)" }}>
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Disclaimer + CTA */}
        <div className="p-4 rounded-xl border mb-8 flex items-start gap-3"
          style={{ backgroundColor: "#FFFBEB", borderColor: "var(--color-accent)" }}>
          <Shield className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "var(--color-accent)" }} />
          <p className="text-xs" style={{ color: "var(--color-muted)" }}>
            ⚠️ <strong>Tarifs indicatifs</strong> — Les prix affichés sont des exemples fournis à titre informatif.
            Vérifiez toujours les conditions exactes et obtenez un devis auprès de la compagnie ou de nos conseillers.
            HP Selectra est un service de comparaison indépendant.
          </p>
        </div>

        <div className="rounded-2xl p-6 sm:p-8 text-center"
          style={{ background: "linear-gradient(135deg, #7B1A2E, #B02840)" }}>
          <p className="text-white font-bold text-lg mb-2">Obtenir un devis personnalisé gratuit</p>
          <p className="text-sm mb-5" style={{ color: "rgba(255,255,255,0.8)" }}>
            Un conseiller Help&apos;me Process compare pour vous et négocie le meilleur tarif.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Bonjour, je souhaite comparer des assurances en Guinée et obtenir un devis.")}`}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white"
              style={{ backgroundColor: "#25D366" }}>
              <MessageCircle className="w-4 h-4" /> Devis WhatsApp
            </a>
            <a href={`tel:${CC_PHONE}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white border border-white/30">
              <Phone className="w-4 h-4" /> Rappel gratuit
            </a>
          </div>
        </div>
      </div>

      <ReviewsSection />
    </>
  )
}
