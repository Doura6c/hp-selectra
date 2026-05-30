import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, MapPin, MessageCircle, Phone } from "lucide-react"
import ReviewsSection from "@/components/ui/ReviewsSection"
import { buildJsonLd, faqSchema, breadcrumbSchema } from "@/lib/schema"

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "224628935335"
const CC_PHONE  = process.env.NEXT_PUBLIC_CC_PHONE        ?? "224628935335"

// ─── Données par ville ────────────────────────────────────────────────────────
type VilleData = {
  name: string
  region: string
  description: string
  population: string
  economie: string[]
  telecom: { op: string; note: string }[]
  banques: { nom: string; note: string }[]
  mobileMoney: { op: string; note: string }[]
  assurances: { nom: string; note: string }[]
  microfinance: { nom: string; note: string }[]
  faq: { q: string; a: string }[]
}

const VILLES: Record<string, VilleData> = {
  labe: {
    name: "Labé",
    region: "Labé — Fouta Djallon",
    description: "Labé est la capitale de la région du Fouta Djallon et la deuxième ville de Guinée. Centre commercial et administratif important, elle est connue pour son élevage bovin, son artisanat et son marché hebdomadaire parmi les plus fréquentés du pays.",
    population: "~400 000 hab.",
    economie: ["Élevage bovin et caprin", "Commerce et marchés", "Agriculture (pomme de terre, maïs)", "Artisanat (tissage, maroquinerie)"],
    telecom: [
      { op: "Orange Guinée", note: "Meilleure couverture réseau à Labé, 4G disponible en centre-ville" },
      { op: "MTN Guinée (Telecel)", note: "Bonne couverture, tarifs compétitifs" },
      { op: "Cellcom", note: "Présence en ville, couverture variable en périphérie" },
    ],
    banques: [
      { nom: "BICIGUI", note: "Agence principale à Labé, frais accessibles" },
      { nom: "Ecobank Guinée", note: "Présence à Labé, services digitaux disponibles" },
      { nom: "BOA Guinée", note: "Agence en ville, orientée microfinance et zones rurales" },
    ],
    mobileMoney: [
      { op: "Orange Money", note: "Réseau d'agents le plus dense à Labé" },
      { op: "MTN MoMo", note: "Croissance rapide, bon réseau d'agents" },
      { op: "Soutra Money", note: "Dépôts/retraits gratuits, disponible à Labé" },
    ],
    assurances: [
      { nom: "NSIA Assurances", note: "Agence disponible, RC auto et santé" },
      { nom: "SUNU Assurances", note: "Présente à Labé" },
      { nom: "Lanala", note: "Couverture RC auto" },
    ],
    microfinance: [
      { nom: "CRG-SA", note: "Fort réseau de caisses dans tout le Fouta Djallon" },
      { nom: "Akiba Finance", note: "Présente à Labé, crédit solidaire" },
    ],
    faq: [
      { q: "Quel opérateur télécom choisir à Labé ?", a: "Orange Guinée offre la meilleure couverture à Labé avec la 4G disponible en centre-ville. MTN (Telecel) est une bonne alternative avec des tarifs compétitifs. Cellcom est présente mais avec une couverture plus variable en périphérie." },
      { q: "Quelle banque est disponible à Labé ?", a: "Les principales banques à Labé sont BICIGUI (frais accessibles), Ecobank Guinée (services digitaux) et BOA Guinée. Pour les micro-crédits, la CRG-SA dispose d'un fort réseau de caisses dans tout le Fouta Djallon." },
      { q: "Comment envoyer de l'argent depuis Labé ?", a: "Orange Money est le service le plus utilisé à Labé avec le plus grand réseau d'agents. Soutra Money offre des dépôts et retraits gratuits. MTN MoMo est aussi disponible avec un réseau d'agents en croissance." },
    ],
  },
  kankan: {
    name: "Kankan",
    region: "Kankan — Haute-Guinée",
    description: "Kankan est la capitale de la région de Haute-Guinée et troisième ville du pays. Carrefour commercial entre la Guinée, le Mali et la Côte d'Ivoire, elle est un hub économique majeur pour le commerce transfrontalier, l'agriculture et l'exploitation minière.",
    population: "~250 000 hab.",
    economie: ["Commerce transfrontalier (Mali, Côte d'Ivoire)", "Agriculture (coton, arachide, riz)", "Exploitation minière (or, diamant)", "Élevage"],
    telecom: [
      { op: "Orange Guinée", note: "Opérateur dominant à Kankan, 4G en centre-ville" },
      { op: "MTN Guinée (Telecel)", note: "Deuxième opérateur, bon rapport qualité/prix" },
      { op: "Cellcom", note: "Présence en ville" },
    ],
    banques: [
      { nom: "Ecobank Guinée", note: "Agence principale à Kankan, services complets" },
      { nom: "BICIGUI", note: "Présente, frais accessibles" },
      { nom: "BOA Guinée", note: "Orientée financement rural et microfinance" },
    ],
    mobileMoney: [
      { op: "Orange Money", note: "Réseau d'agents très étendu à Kankan" },
      { op: "MTN MoMo", note: "Bon réseau, utile pour les transferts transfrontaliers" },
      { op: "Soutra Money", note: "Disponible à Kankan, frais réduits" },
    ],
    assurances: [
      { nom: "NSIA Assurances", note: "RC auto et santé disponibles à Kankan" },
      { nom: "UGAR-Activa", note: "Présente, spécialiste auto tous risques" },
      { nom: "SUNU Assurances", note: "Agence à Kankan" },
    ],
    microfinance: [
      { nom: "CRG-SA", note: "Caisses présentes dans toute la Haute-Guinée" },
      { nom: "Finafrica", note: "Financement PME et commerçants transfrontaliers" },
    ],
    faq: [
      { q: "Quel opérateur choisir à Kankan ?", a: "Orange Guinée est l'opérateur dominant à Kankan avec la 4G disponible. MTN (Telecel) est une bonne alternative avec des prix compétitifs. Pour les zones périurbaines, la couverture varie selon l'opérateur." },
      { q: "Comment financer un projet commercial à Kankan ?", a: "Finafrica Microfinance propose des crédits PME jusqu'à 50M GNF, idéals pour les commerçants transfrontaliers. La CRG-SA dispose de caisses locales dans toute la région. Ecobank est la banque la plus complète à Kankan." },
      { q: "Quelle assurance RC auto prendre à Kankan ?", a: "NSIA Assurances et UGAR-Activa sont les meilleures options à Kankan pour la RC auto obligatoire. SUNU Assurances est aussi disponible. Les tarifs sont indicatifs — demandez un devis gratuit à nos conseillers." },
    ],
  },
  nzerekore: {
    name: "N'Zérékoré",
    region: "N'Zérékoré — Guinée Forestière",
    description: "N'Zérékoré est la capitale de la région de Guinée Forestière et quatrième ville du pays. Entourée de forêts tropicales et de montagnes, elle est un centre économique pour l'exploitation forestière, l'extraction minière et le commerce régional avec la Côte d'Ivoire, le Liberia et la Sierra Leone.",
    population: "~200 000 hab.",
    economie: ["Exploitation forestière", "Extraction minière (fer, diamant)", "Commerce régional (Liberia, Sierra Leone, Côte d'Ivoire)", "Agriculture tropicale (café, cacao, riz)"],
    telecom: [
      { op: "Orange Guinée", note: "Meilleure couverture à N'Zérékoré, 4G centre-ville" },
      { op: "MTN Guinée (Telecel)", note: "Deuxième opérateur, couverture correcte" },
      { op: "Cellcom", note: "Présent mais couverture limitée" },
    ],
    banques: [
      { nom: "Ecobank Guinée", note: "Agence principale, services digitaux" },
      { nom: "BICIGUI", note: "Présente, frais modérés" },
      { nom: "BOA Guinée", note: "Focus microfinance et zones rurales forestières" },
    ],
    mobileMoney: [
      { op: "Orange Money", note: "Réseau d'agents le plus dense" },
      { op: "MTN MoMo", note: "Utile pour transferts transfrontaliers" },
      { op: "Soutra Money", note: "Dépôts/retraits gratuits disponibles" },
    ],
    assurances: [
      { nom: "NSIA Assurances", note: "Présente à N'Zérékoré, RC auto et santé" },
      { nom: "SUNU Assurances", note: "Agence disponible" },
    ],
    microfinance: [
      { nom: "CRG-SA", note: "Caisses locales présentes en Guinée Forestière" },
      { nom: "CAFODEC", note: "Micro-crédit communautaire pour zones rurales forestières" },
    ],
    faq: [
      { q: "Quel opérateur télécom choisir à N'Zérékoré ?", a: "Orange Guinée offre la meilleure couverture à N'Zérékoré avec la 4G en centre-ville. La couverture en zone forestière reste limitée pour tous les opérateurs. MTN (Telecel) est une alternative avec des tarifs compétitifs." },
      { q: "Comment envoyer de l'argent depuis N'Zérékoré vers le Liberia ou la Sierra Leone ?", a: "MTN MoMo propose des transferts internationaux dans certains pays voisins. Orange Money est aussi disponible. Nos conseillers peuvent vous orienter vers la solution la plus adaptée pour les transferts transfrontaliers." },
      { q: "Quelle institution de microfinance choisir à N'Zérékoré ?", a: "La CRG-SA dispose de caisses dans toute la Guinée Forestière, idéale pour les crédits agricoles et forestiers. CAFODEC est bien implantée pour le micro-crédit communautaire en zones rurales forestières." },
    ],
  },
  mamou: {
    name: "Mamou",
    region: "Mamou — Moyenne-Guinée",
    description: "Mamou est la capitale de la région de Moyenne-Guinée et une ville carrefour stratégique entre Conakry, le Fouta Djallon et la Haute-Guinée. Surnommée le 'carrefour de la Guinée', c'est un nœud de communication important pour le transport routier et le commerce inter-régional.",
    population: "~180 000 hab.",
    economie: ["Transport et commerce de transit", "Agriculture (pomme de terre, maïs, légumes)", "Élevage", "Commerce inter-régional"],
    telecom: [
      { op: "Orange Guinée", note: "Opérateur principal à Mamou, bonne couverture" },
      { op: "MTN Guinée (Telecel)", note: "Deuxième opérateur disponible" },
      { op: "Cellcom", note: "Présence en centre-ville" },
    ],
    banques: [
      { nom: "BICIGUI", note: "Agence à Mamou, frais accessibles" },
      { nom: "Ecobank Guinée", note: "Services bancaires complets" },
      { nom: "BOA Guinée", note: "Présente, orientée financement rural" },
    ],
    mobileMoney: [
      { op: "Orange Money", note: "Service le plus utilisé à Mamou" },
      { op: "MTN MoMo", note: "Disponible, réseau en développement" },
      { op: "Soutra Money", note: "Frais réduits, agents disponibles" },
    ],
    assurances: [
      { nom: "NSIA Assurances", note: "RC auto et assurances disponibles" },
      { nom: "Lanala", note: "RC auto accessible à Mamou" },
    ],
    microfinance: [
      { nom: "CRG-SA", note: "Caisse locale à Mamou, crédit agricole" },
      { nom: "Akiba Finance", note: "Présente, crédit commerce" },
    ],
    faq: [
      { q: "Pourquoi Mamou est-elle le carrefour de la Guinée ?", a: "Mamou est située à la croisée des routes nationales reliant Conakry au nord (Labé, Pita) et à l'est (Faranah, Kankan). C'est un point de passage obligé pour les transports inter-régionaux, ce qui en fait un centre commercial animé." },
      { q: "Quel opérateur mobile choisir à Mamou ?", a: "Orange Guinée est l'opérateur principal avec la meilleure couverture à Mamou. MTN (Telecel) est une bonne alternative. Les deux opérateurs couvrent bien l'axe routier principal." },
      { q: "Comment obtenir un crédit agricole à Mamou ?", a: "La CRG-SA dispose d'une caisse locale à Mamou, spécialisée dans le financement des agriculteurs de Moyenne-Guinée (pomme de terre, légumes, élevage). Akiba Finance propose aussi des crédits commerce pour les commerçants de transit." },
    ],
  },
  boke: {
    name: "Boké",
    region: "Boké — Basse-Guinée",
    description: "Boké est la capitale de la région de Boké et une ville en pleine expansion grâce à l'exploitation de la bauxite par la CBG (Compagnie des Bauxites de Guinée) et SMB. Boké est le premier producteur mondial de bauxite, ce qui attire investisseurs, entrepreneurs et travailleurs miniers.",
    population: "~150 000 hab.",
    economie: ["Exploitation de la bauxite (CBG, SMB)", "Construction et infrastructure", "Port de Kamsar", "Agriculture (riz, fruits)", "Commerce lié au secteur minier"],
    telecom: [
      { op: "Orange Guinée", note: "Meilleure couverture à Boké et Kamsar, 4G disponible" },
      { op: "MTN Guinée (Telecel)", note: "Présent à Boké, couverture en développement" },
      { op: "Cellcom", note: "Présence limitée en dehors du centre-ville" },
    ],
    banques: [
      { nom: "Ecobank Guinée", note: "Agence principale à Boké, services aux entreprises minières" },
      { nom: "Société Générale Guinée", note: "Présente, orientée entreprises et secteur minier" },
      { nom: "BICIGUI", note: "Frais accessibles pour les particuliers" },
    ],
    mobileMoney: [
      { op: "Orange Money", note: "Réseau d'agents dense, utilisé par les travailleurs miniers" },
      { op: "MTN MoMo", note: "En développement à Boké" },
      { op: "Soutra Money", note: "Disponible, frais réduits" },
    ],
    assurances: [
      { nom: "NSIA Assurances", note: "RC auto et assurances professionnelles à Boké" },
      { nom: "UGAR-Activa", note: "Tous risques, couverture flottes minières" },
    ],
    microfinance: [
      { nom: "CRG-SA", note: "Caisse locale, crédit commerce et agriculture" },
      { nom: "Finafrica", note: "Financement PME liées au secteur minier" },
    ],
    faq: [
      { q: "Pourquoi Boké est-elle une ville stratégique en Guinée ?", a: "Boké est au cœur du bassin bauxitique guinéen, le plus riche au monde. La CBG et SMB y opèrent des mines de bauxite majeures exportées via le port de Kamsar. L'activité minière a fortement développé les infrastructures, la population et l'économie locale." },
      { q: "Quelle banque choisir à Boké pour une entreprise ?", a: "Ecobank Guinée et Société Générale Guinée sont les mieux adaptées aux entreprises à Boké, notamment pour les services aux PME liées au secteur minier. BICIGUI est l'option la plus accessible pour les particuliers." },
      { q: "Comment s'assurer à Boké pour un véhicule ou une flotte ?", a: "NSIA Assurances propose des solutions RC auto et assurances professionnelles à Boké. UGAR-Activa est spécialisée dans les assurances tous risques et peut couvrir des flottes de véhicules utilitaires pour les entreprises minières." },
    ],
  },
  faranah: {
    name: "Faranah",
    region: "Faranah — Haute-Guinée",
    description: "Faranah est la capitale de la région administrative de Faranah en Haute-Guinée. Ville traversée par le fleuve Niger (qui prend sa source à proximité), c'est un centre régional agricole important connu pour la production de riz, d'arachide et la présence de ressources minières.",
    population: "~120 000 hab.",
    economie: ["Agriculture (riz, arachide, coton)", "Source du fleuve Niger (tourisme)", "Ressources minières (or, diamant)", "Commerce régional", "Élevage"],
    telecom: [
      { op: "Orange Guinée", note: "Principal opérateur à Faranah, couverture en centre-ville" },
      { op: "MTN Guinée (Telecel)", note: "Présent à Faranah" },
      { op: "Cellcom", note: "Couverture limitée" },
    ],
    banques: [
      { nom: "BICIGUI", note: "Agence à Faranah, la plus accessible localement" },
      { nom: "BOA Guinée", note: "Orientée financement rural et agricole" },
      { nom: "Ecobank Guinée", note: "Présente dans la ville" },
    ],
    mobileMoney: [
      { op: "Orange Money", note: "Service le plus répandu à Faranah" },
      { op: "MTN MoMo", note: "En développement, agents disponibles" },
      { op: "Soutra Money", note: "Disponible, frais réduits" },
    ],
    assurances: [
      { nom: "NSIA Assurances", note: "RC auto disponible à Faranah" },
      { nom: "Lanala", note: "RC auto, tarifs accessibles" },
    ],
    microfinance: [
      { nom: "CRG-SA", note: "Très présente en Haute-Guinée, crédit agricole riz/arachide" },
      { nom: "CAFODEC", note: "Micro-crédit communautaire et groupements féminins" },
    ],
    faq: [
      { q: "Faranah est-elle connue pour la source du fleuve Niger ?", a: "Oui. Le fleuve Niger prend sa source dans les montagnes du Fouta Djallon, à proximité de Faranah. Ce site naturel est un attrait touristique pour la ville. Le Niger traverse ensuite le Mali, le Niger et le Nigeria avant de rejoindre l'Atlantique." },
      { q: "Quel opérateur mobile choisir à Faranah ?", a: "Orange Guinée est l'opérateur le plus fiable à Faranah avec la meilleure couverture en centre-ville. MTN (Telecel) est une alternative. La couverture en zones rurales reste limitée pour tous les opérateurs." },
      { q: "Comment obtenir un crédit agricole à Faranah ?", a: "La CRG-SA est l'institution de référence pour le crédit agricole à Faranah (riz, arachide, coton). Elle dispose de caisses locales dans toute la région. CAFODEC propose aussi des micro-crédits communautaires pour les ménages et groupements féminins." },
    ],
  },
}

type Props = { params: Promise<{ ville: string }> }

export async function generateStaticParams() {
  return Object.keys(VILLES).map((ville) => ({ ville }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { ville } = await params
  const data = VILLES[ville]
  if (!data) return {}
  return {
    title: `${data.name} — Télécom, banques, mobile money, assurances 2026 | HP Selectra`,
    description: `Comparez les meilleurs services à ${data.name} : opérateurs télécom, banques, mobile money, assurances et microfinance. Guide HP Selectra pour ${data.name}, Guinée.`,
    keywords: [`telecom ${data.name}`, `banque ${data.name}`, `mobile money ${data.name}`, `assurance ${data.name}`, `microfinance ${data.name}`, `services ${data.name} Guinée`],
  }
}

export default async function VillePage({ params }: Props) {
  const { ville } = await params
  const data = VILLES[ville]
  if (!data) return null

  const jsonLdFaq = buildJsonLd(faqSchema(data.faq.map(({ q, a }) => ({ question: q, answer: a }))))
  const jsonLdBreadcrumb = buildJsonLd(breadcrumbSchema([
    { name: "Accueil", href: "/" },
    { name: "Villes", href: "/villes/" },
    { name: data.name },
  ]))

  const VERTICALS = [
    {
      id: "telecom",
      icon: "📱",
      label: "Télécom",
      color: "#E04E1A",
      href: "/telecom/comparateur/",
      items: data.telecom,
      desc: "Forfaits mobiles & internet",
    },
    {
      id: "mobile-money",
      icon: "💸",
      label: "Mobile Money",
      color: "#F0A500",
      href: "/mobile-money/comparateur/",
      items: data.mobileMoney,
      desc: "Transferts & paiements",
    },
    {
      id: "banques",
      icon: "🏦",
      label: "Banques",
      color: "#2E86C1",
      href: "/banques/comparateur/",
      items: data.banques,
      desc: "Comptes & crédits bancaires",
    },
    {
      id: "assurances",
      icon: "🛡️",
      label: "Assurances",
      color: "#B02840",
      href: "/assurances/comparateur/",
      items: data.assurances,
      desc: "RC auto, santé, habitation",
    },
    {
      id: "microfinance",
      icon: "🤝",
      label: "Microfinance",
      color: "#6B8F3C",
      href: "/microfinance/comparateur/",
      items: data.microfinance,
      desc: "Micro-crédits & épargne",
    },
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdFaq }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdBreadcrumb }} />

      {/* Hero */}
      <section className="py-12 sm:py-16" style={{ background: "linear-gradient(135deg, #1A2E4A 0%, #2C4A6E 100%)" }}>
        <div className="container max-w-4xl">
          <nav className="flex items-center gap-1.5 text-xs mb-5" style={{ color: "rgba(255,255,255,0.5)" }}>
            <Link href="/" className="hover:text-white">Accueil</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/villes/" className="hover:text-white">Villes</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">{data.name}</span>
          </nav>

          <div className="flex items-start gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0"
              style={{ backgroundColor: "rgba(255,255,255,0.12)" }}>
              🗺️
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <MapPin className="w-4 h-4 text-white/60" />
                <span className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.7)" }}>{data.region}</span>
                <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.7)" }}>{data.population}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                Services à {data.name} {new Date().getFullYear()}
              </h1>
            </div>
          </div>

          <p className="text-base mb-8 max-w-2xl" style={{ color: "rgba(255,255,255,0.8)" }}>
            {data.description}
          </p>

          {/* Économie locale */}
          <div className="flex flex-wrap gap-2 mb-8">
            {data.economie.map((e) => (
              <span key={e} className="text-xs px-3 py-1.5 rounded-full font-medium"
                style={{ backgroundColor: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.85)" }}>
                {e}
              </span>
            ))}
          </div>

          {/* Ancres verticaux */}
          <div className="flex flex-wrap gap-2">
            {VERTICALS.map((v) => (
              <a key={v.id} href={`#${v.id}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white border border-white/20 hover:border-white/50 transition-colors">
                {v.icon} {v.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      <div className="container py-10 sm:py-14 max-w-4xl">

        {/* Sections par vertical */}
        {VERTICALS.map((v) => (
          <section key={v.id} id={v.id} className="mb-14 scroll-mt-24">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
                  style={{ backgroundColor: `${v.color}18` }}>
                  {v.icon}
                </div>
                <div>
                  <h2 className="text-lg font-bold" style={{ color: "var(--color-text)" }}>{v.label} à {data.name}</h2>
                  <p className="text-xs" style={{ color: "var(--color-muted)" }}>{v.desc}</p>
                </div>
              </div>
              <Link href={v.href}
                className="hidden sm:inline-flex text-xs font-semibold px-3 py-1.5 rounded-lg"
                style={{ backgroundColor: `${v.color}18`, color: v.color }}>
                Comparer →
              </Link>
            </div>

            <div className="rounded-2xl border overflow-hidden" style={{ borderColor: "var(--color-border)" }}>
              {v.items.map((item, i) => {
                const name = "op" in item ? item.op : item.nom
                return (
                  <div key={name}
                    className="flex items-start gap-4 px-5 py-4 border-b last:border-0"
                    style={{ borderColor: "var(--color-border)", backgroundColor: i % 2 === 0 ? "var(--color-card)" : "var(--color-surface)" }}>
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold text-white shrink-0"
                      style={{ backgroundColor: v.color }}>
                      {name.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm" style={{ color: "var(--color-text)" }}>{name}</p>
                      <p className="text-xs mt-0.5" style={{ color: "var(--color-muted)" }}>{item.note}</p>
                    </div>
                    <Link href={`${v.href.replace("/comparateur/", "/fournisseurs/")}`}
                      className="shrink-0 text-xs font-medium"
                      style={{ color: v.color }}>
                      Voir fiche →
                    </Link>
                  </div>
                )
              })}
            </div>

            <div className="mt-3 flex justify-end">
              <Link href={v.href}
                className="text-xs font-semibold"
                style={{ color: v.color }}>
                Comparer toutes les offres {v.label.toLowerCase()} →
              </Link>
            </div>
          </section>
        ))}

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-5" style={{ color: "var(--color-text)" }}>
            ❓ Questions fréquentes — {data.name}
          </h2>
          <div className="space-y-3">
            {data.faq.map(({ q, a }) => (
              <details key={q} className="rounded-2xl border overflow-hidden" style={{ borderColor: "var(--color-border)" }}>
                <summary className="flex items-center justify-between px-5 py-4 cursor-pointer list-none font-semibold text-sm"
                  style={{ backgroundColor: "var(--color-card)", color: "var(--color-text)" }}>
                  {q}
                  <span className="ml-3 shrink-0 font-bold text-xl" style={{ color: "var(--color-primary)" }}>+</span>
                </summary>
                <div className="px-5 py-4 text-sm leading-relaxed"
                  style={{ backgroundColor: "var(--color-surface)", color: "var(--color-muted)" }}>{a}</div>
              </details>
            ))}
          </div>
        </section>

        {/* Autres villes */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-5" style={{ color: "var(--color-text)" }}>
            🗺️ Autres villes de Guinée
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {Object.entries(VILLES)
              .filter(([slug]) => slug !== ville)
              .map(([slug, v]) => (
                <Link key={slug} href={`/villes/${slug}/`}
                  className="flex items-center gap-3 p-4 rounded-2xl border hover:shadow-md transition-shadow"
                  style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}>
                  <MapPin className="w-4 h-4 shrink-0" style={{ color: "var(--color-muted)" }} />
                  <div>
                    <p className="text-sm font-bold" style={{ color: "var(--color-text)" }}>{v.name}</p>
                    <p className="text-xs" style={{ color: "var(--color-muted)" }}>{v.region.split(" — ")[1]}</p>
                  </div>
                </Link>
              ))}
            <Link href="/villes/conakry/"
              className="flex items-center gap-3 p-4 rounded-2xl border hover:shadow-md transition-shadow"
              style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}>
              <MapPin className="w-4 h-4 shrink-0" style={{ color: "var(--color-muted)" }} />
              <div>
                <p className="text-sm font-bold" style={{ color: "var(--color-text)" }}>Conakry</p>
                <p className="text-xs" style={{ color: "var(--color-muted)" }}>Capitale</p>
              </div>
            </Link>
          </div>
        </section>

        {/* CTA */}
        <div className="rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-5"
          style={{ background: "linear-gradient(135deg, #1A2E4A 0%, #2C4A6E 100%)" }}>
          <div className="flex-1">
            <p className="text-white font-bold text-lg mb-1">Un conseiller à votre service à {data.name}</p>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.8)" }}>
              Nos conseillers Help&apos;me Process vous aident à comparer et choisir les meilleurs services
              adaptés à {data.name} — gratuitement, sans engagement.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(`Bonjour, je suis à ${data.name} et j'aimerais être conseillé sur les services disponibles.`)}`}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-white text-sm"
              style={{ backgroundColor: "#25D366" }}>
              <MessageCircle className="w-4 h-4" /> WhatsApp
            </a>
            <a href={`tel:${CC_PHONE}`}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border border-white/40 text-white">
              <Phone className="w-4 h-4" /> Rappel gratuit
            </a>
          </div>
        </div>

      </div>

      <ReviewsSection />
    </>
  )
}
