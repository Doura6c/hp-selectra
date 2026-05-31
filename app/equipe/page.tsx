import type { Metadata } from "next"
import Link from "next/link"
import { MessageCircle, Mail, Award, Users, Star, CheckCircle2 } from "lucide-react"
import { buildJsonLd, personSchema, breadcrumbSchema } from "@/lib/schema"

export const metadata: Metadata = {
  title: "Notre Équipe d'Experts | HP Selectra Guinée",
  description:
    "Découvrez les experts HP Selectra qui analysent et comparent les offres de télécommunications, mobile money, banques et internet fixe en Guinée.",
  openGraph: {
    title: "L'équipe d'experts HP Selectra Guinée",
    description: "Des experts guinéens dédiés à vous aider à choisir les meilleures offres.",
  },
}

type Expert = {
  id: string
  prenom: string
  nom: string
  titre: string
  secteur: string
  sectorColor: string
  sectorBg: string
  sectorIcon: string
  initiales: string
  bio: string
  specialites: string[]
  linkedin?: string
  whatsapp?: string
  email?: string
  analyses: number
  fournisseurs: number
}

const EXPERTS: Expert[] = [
  {
    id: "mamadou-balde",
    prenom: "Mamadou",
    nom: "Baldé",
    titre: "Expert Télécommunications",
    secteur: "Télécom & Internet Mobile",
    sectorColor: "#1d3461",
    sectorBg: "#e8edf5",
    sectorIcon: "📱",
    initiales: "MB",
    bio: "Fort de 8 ans d'expérience dans le secteur télécom guinéen, Mamadou suit de près l'évolution des offres d'Orange Guinée, Telecel et Cellcom. Il analyse chaque nouveau forfait pour vous aider à choisir le plan le mieux adapté à votre usage.",
    specialites: ["Forfaits mobiles", "Couverture réseau", "Régulation ARPT", "Comparaison tarifaire"],
    linkedin: "#",
    whatsapp: "224628935335",
    email: "mamadou@hp-selectra.gn",
    analyses: 47,
    fournisseurs: 5,
  },
  {
    id: "fatoumata-diallo",
    prenom: "Fatoumata",
    nom: "Diallo",
    titre: "Experte Mobile Money & Fintech",
    secteur: "Mobile Money & Paiement",
    sectorColor: "#6b8f3c",
    sectorBg: "#eef4e6",
    sectorIcon: "💸",
    initiales: "FD",
    bio: "Fatoumata est spécialisée dans les services de paiement mobile en Guinée. Elle compare les frais de transfert, les offres de cashback et la sécurité des plateformes comme Orange Money, MTN MoMo et Soutra Money pour vous offrir une analyse indépendante.",
    specialites: ["Orange Money", "MTN MoMo", "Soutra Money", "Frais de transaction", "Interopérabilité"],
    linkedin: "#",
    whatsapp: "224628935335",
    email: "fatoumata@hp-selectra.gn",
    analyses: 63,
    fournisseurs: 6,
  },
  {
    id: "ibrahima-camara",
    prenom: "Ibrahima",
    nom: "Camara",
    titre: "Expert Bancaire & Crédit",
    secteur: "Banques & Services Financiers",
    sectorColor: "#b45309",
    sectorBg: "#fef3c7",
    sectorIcon: "🏦",
    initiales: "IC",
    bio: "Ibrahima travaille depuis 6 ans dans l'analyse des produits bancaires guinéens. Il passe en revue les comptes courants, épargnes, crédits et services numériques d'Ecobank, BICIGUI, Orabank et des autres établissements agréés par la BCRG.",
    specialites: ["Comptes bancaires", "Crédit immobilier", "BCRG réglementation", "Banque digitale", "Finance islamique"],
    linkedin: "#",
    whatsapp: "224628935335",
    email: "ibrahima@hp-selectra.gn",
    analyses: 38,
    fournisseurs: 8,
  },
  {
    id: "mariama-sylla",
    prenom: "Mariama",
    nom: "Sylla",
    titre: "Experte Internet Fixe & FAI",
    secteur: "Internet Fixe & Box",
    sectorColor: "#7c3aed",
    sectorBg: "#f3f0ff",
    sectorIcon: "🌐",
    initiales: "MS",
    bio: "Mariama analyse les offres d'internet fixe et de fibre optique disponibles en Guinée. De la connexion ADSL aux solutions entreprise, elle décrypte les engagements contractuels, débits réels et qualité de service de chaque FAI pour les particuliers et PME.",
    specialites: ["Fibre optique", "ADSL", "Solutions entreprise", "Débit réel vs annoncé", "Contrats FAI"],
    linkedin: "#",
    whatsapp: "224628935335",
    email: "mariama@hp-selectra.gn",
    analyses: 29,
    fournisseurs: 4,
  },
  {
    id: "alpha-barry",
    prenom: "Alpha",
    nom: "Barry",
    titre: "Expert Assurances & Microfinance",
    secteur: "Assurances & Microfinance",
    sectorColor: "#0891b2",
    sectorBg: "#e0f2fe",
    sectorIcon: "🛡️",
    initiales: "AB",
    bio: "Alpha prépare le lancement de notre vertical assurances et microfinance. Il cartographie les acteurs, analyse les garanties proposées et évalue la solidité financière des établissements de microfinance agréés afin de vous guider dans vos choix de couverture.",
    specialites: ["Assurance auto", "Assurance santé", "Microfinance", "IMF réglementation", "Garanties"],
    linkedin: "#",
    whatsapp: "224628935335",
    email: "alpha@hp-selectra.gn",
    analyses: 15,
    fournisseurs: 7,
  },
]

const STATS = [
  { value: "5", label: "Experts dédiés", icon: Users },
  { value: "192+", label: "Analyses publiées", icon: Star },
  { value: "30+", label: "Fournisseurs suivis", icon: CheckCircle2 },
  { value: "100%", label: "Indépendants", icon: Award },
]

export default function EquipePage() {
  const personSchemas = EXPERTS.map((expert) =>
    buildJsonLd(personSchema({
      name: `${expert.prenom} ${expert.nom}`,
      jobTitle: expert.titre,
      worksFor: "HP Selectra — Help'me Process",
      url: `https://hpshop-afrique.vercel.app/equipe#${expert.id}`,
    }))
  )

  const breadcrumbJsonLd = buildJsonLd(breadcrumbSchema([
    { name: "Accueil", href: "/" },
    { name: "Notre équipe" },
  ]))

  return (
    <div style={{ backgroundColor: "var(--color-surface)" }}>
      {personSchemas.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: schema }} />
      ))}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd }} />

      {/* ── HERO ── */}
      <section
        className="relative overflow-hidden py-20 md:py-28"
        style={{
          background: "linear-gradient(135deg, var(--color-primary-dark) 0%, var(--color-primary) 60%, #2d5198 100%)",
        }}
      >
        {/* Blobs décoratifs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, var(--color-accent) 0%, transparent 70%)" }}
          />
          <div
            className="absolute -bottom-12 -left-12 w-64 h-64 rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, var(--color-secondary) 0%, transparent 70%)" }}
          />
        </div>

        <div className="container relative text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-6 text-white/90"
            style={{ backgroundColor: "rgba(255,255,255,0.12)" }}
          >
            <Users className="w-3.5 h-3.5" />
            Help&apos;me Process — L&apos;équipe derrière HP Selectra
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-5">
            Nos experts au service
            <br />
            <span style={{ color: "var(--color-accent)" }}>de vos choix</span>
          </h1>

          <p className="text-lg text-white/75 max-w-2xl mx-auto mb-10">
            Une équipe de spécialistes guinéens qui analysent, comparent et actualisent
            chaque offre pour vous garantir une information fiable et indépendante.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl px-4 py-5"
                style={{ backgroundColor: "rgba(255,255,255,0.10)" }}
              >
                <p className="text-2xl font-extrabold text-white">{s.value}</p>
                <p className="text-xs text-white/60 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GRILLE EXPERTS ── */}
      <section className="container py-16 md:py-24">
        <div className="text-center mb-14">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-3" style={{ color: "var(--color-text)" }}>
            Un expert par secteur
          </h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: "var(--color-muted)" }}>
            Chaque membre de l&apos;équipe est spécialisé dans un domaine spécifique et réalise
            des analyses approfondies des offres disponibles en Guinée.
          </p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {EXPERTS.map((expert) => (
            <ExpertCard key={expert.id} expert={expert} />
          ))}
        </div>
      </section>

      {/* ── MÉTHODOLOGIE ── */}
      <section style={{ backgroundColor: "var(--color-card)" }} className="py-16">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span
                className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-4"
                style={{ backgroundColor: "var(--color-secondary-light)", color: "var(--color-secondary)" }}
              >
                Notre méthode
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold mb-5" style={{ color: "var(--color-text)" }}>
                Comment nous garantissons notre indépendance
              </h2>
              <div className="space-y-4">
                {[
                  {
                    titre: "Sources primaires vérifiées",
                    detail: "Chaque tarif est collecté directement auprès des opérateurs ou via les tarificateurs officiels.",
                  },
                  {
                    titre: "Mise à jour régulière",
                    detail: "Nos experts re-vérifient les offres chaque mois et signalent toute modification tarifaire.",
                  },
                  {
                    titre: "Notation objective HP Score",
                    detail: "Le HP Score (A→E) est calculé selon une grille pondérée : prix, couverture, service client, innovation.",
                  },
                  {
                    titre: "Transparence des partenariats",
                    detail: "Les partenaires commerciaux sont signalés sur chaque fiche. Cela n'influence pas la notation.",
                  },
                ].map((m) => (
                  <div key={m.titre} className="flex gap-3">
                    <CheckCircle2
                      className="w-5 h-5 mt-0.5 shrink-0"
                      style={{ color: "var(--color-secondary)" }}
                    />
                    <div>
                      <p className="font-semibold text-sm" style={{ color: "var(--color-text)" }}>{m.titre}</p>
                      <p className="text-sm mt-0.5" style={{ color: "var(--color-muted)" }}>{m.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Carte lien méthodologie */}
            <div
              className="rounded-3xl p-8 flex flex-col gap-6"
              style={{
                background: "linear-gradient(135deg, var(--color-primary-light) 0%, var(--color-secondary-light) 100%)",
              }}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
                style={{ backgroundColor: "var(--color-primary)", color: "#fff" }}
              >
                📊
              </div>
              <div>
                <h3 className="font-extrabold text-lg mb-2" style={{ color: "var(--color-text)" }}>
                  Notre méthodologie de notation
                </h3>
                <p className="text-sm" style={{ color: "var(--color-muted)" }}>
                  Découvrez en détail comment le HP Score est calculé et les critères
                  utilisés pour classer chaque opérateur ou banque.
                </p>
              </div>
              <Link
                href="/methodologie/"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-white self-start transition-opacity hover:opacity-90"
                style={{ backgroundColor: "var(--color-primary)" }}
              >
                Voir la méthodologie →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA REJOINDRE / CONTACT ── */}
      <section
        className="py-16"
        style={{
          background: "linear-gradient(135deg, var(--color-secondary) 0%, var(--color-secondary-dark) 100%)",
        }}
      >
        <div className="container text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4">
            Une question pour nos experts ?
          </h2>
          <p className="text-white/75 mb-8 max-w-xl mx-auto">
            Contactez directement l&apos;expert de votre secteur via WhatsApp ou laissez-nous
            un message, nous vous répondons sous 24 h.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`https://wa.me/224628935335?text=${encodeURIComponent("Bonjour, j'ai une question pour un expert HP Selectra.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: "var(--color-whatsapp)" }}
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp un expert
            </a>
            <Link
              href="/contact/"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white border-2 border-white/40 hover:bg-white/10 transition-colors"
            >
              <Mail className="w-5 h-5" />
              Nous écrire
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}

/* ─── Composant carte expert ─── */
function ExpertCard({ expert }: { expert: Expert }) {
  return (
    <article
      className="rounded-3xl overflow-hidden transition-shadow hover:shadow-xl flex flex-col"
      style={{
        border: "1px solid var(--color-border)",
        backgroundColor: "var(--color-card)",
      }}
    >
      {/* En-tête colorée secteur */}
      <div
        className="relative px-6 pt-8 pb-10 flex flex-col items-center text-center"
        style={{ background: `linear-gradient(135deg, ${expert.sectorColor}15 0%, ${expert.sectorColor}08 100%)` }}
      >
        {/* Badge secteur */}
        <span
          className="absolute top-4 right-4 text-xs font-bold px-3 py-1 rounded-full"
          style={{ backgroundColor: expert.sectorBg, color: expert.sectorColor }}
        >
          {expert.sectorIcon} {expert.secteur}
        </span>

        {/* Avatar monogramme */}
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center text-2xl font-extrabold text-white shadow-lg mb-4 ring-4 ring-white"
          style={{ backgroundColor: expert.sectorColor }}
        >
          {expert.initiales}
        </div>

        {/* Nom + titre */}
        <h3 className="text-xl font-extrabold mb-1" style={{ color: "var(--color-text)" }}>
          {expert.prenom} {expert.nom}
        </h3>
        <p className="text-sm font-semibold" style={{ color: expert.sectorColor }}>
          {expert.titre}
        </p>

        {/* Icônes social */}
        <div className="flex items-center gap-2 mt-3">
          {expert.linkedin && (
            <a
              href={expert.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`LinkedIn de ${expert.prenom}`}
              className="w-8 h-8 rounded-full flex items-center justify-center transition-opacity hover:opacity-70"
              style={{ backgroundColor: "#0077b5", color: "#fff" }}
            >
              {/* LinkedIn icon inline */}
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          )}
          {expert.whatsapp && (
            <a
              href={`https://wa.me/${expert.whatsapp}?text=${encodeURIComponent(`Bonjour ${expert.prenom}, je souhaite vous poser une question sur le secteur ${expert.secteur}.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`WhatsApp de ${expert.prenom}`}
              className="w-8 h-8 rounded-full flex items-center justify-center transition-opacity hover:opacity-70"
              style={{ backgroundColor: "var(--color-whatsapp)", color: "#fff" }}
            >
              <MessageCircle className="w-3.5 h-3.5" />
            </a>
          )}
          {expert.email && (
            <a
              href={`mailto:${expert.email}`}
              aria-label={`Email de ${expert.prenom}`}
              className="w-8 h-8 rounded-full flex items-center justify-center transition-opacity hover:opacity-70"
              style={{ backgroundColor: "var(--color-primary-light)", color: "var(--color-primary)" }}
            >
              <Mail className="w-3.5 h-3.5" />
            </a>
          )}
        </div>

        {/* Mini stats */}
        <div className="flex gap-4 mt-4">
          <div className="text-center">
            <p className="text-lg font-extrabold" style={{ color: "var(--color-text)" }}>{expert.analyses}</p>
            <p className="text-[11px]" style={{ color: "var(--color-muted)" }}>analyses</p>
          </div>
          <div className="w-px" style={{ backgroundColor: "var(--color-border)" }} />
          <div className="text-center">
            <p className="text-lg font-extrabold" style={{ color: "var(--color-text)" }}>{expert.fournisseurs}</p>
            <p className="text-[11px]" style={{ color: "var(--color-muted)" }}>fournisseurs</p>
          </div>
        </div>
      </div>

      {/* Corps : bio + spécialités */}
      <div className="p-6 flex flex-col flex-1 gap-4">
        <p className="text-sm leading-relaxed" style={{ color: "var(--color-muted)" }}>
          {expert.bio}
        </p>

        <div>
          <p className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: "var(--color-text)" }}>
            Spécialités
          </p>
          <div className="flex flex-wrap gap-1.5">
            {expert.specialites.map((s) => (
              <span
                key={s}
                className="text-xs px-2.5 py-1 rounded-full font-medium"
                style={{ backgroundColor: expert.sectorBg, color: expert.sectorColor }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        <a
          href={`https://wa.me/${expert.whatsapp ?? "224628935335"}?text=${encodeURIComponent(`Bonjour ${expert.prenom}, j'aimerais votre avis sur le secteur ${expert.secteur}.`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: expert.sectorColor }}
        >
          <MessageCircle className="w-4 h-4" />
          Consulter {expert.prenom}
        </a>
      </div>
    </article>
  )
}
