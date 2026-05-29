export type VerticalData = {
  slug: string
  name: string
  icon: string
  description: string
  isLive: boolean
  order: number
  color: string
}

export type ProviderData = {
  slug: string
  name: string
  verticalSlug: string
  description: string
  hpScore: string
  hpScoreNum: number
  verified: boolean
  sponsoredTier: string
  phone?: string
  website?: string
}

export type OfferData = {
  slug: string
  providerSlug: string
  verticalSlug: string
  name: string
  category: string
  description: string
  priceNote: string
  priceIsExample: boolean
  hpScore: string
  hpScoreNum: number
  isFeatured: boolean
  details: { key: string; value: string; unit?: string; isHighlight?: boolean }[]
}

export const VERTICALS: VerticalData[] = [
  {
    slug: "telecom",
    name: "Internet & Mobile",
    icon: "📱",
    description: "Comparez les forfaits mobiles, bundles data et offres internet fixe des opérateurs guinéens.",
    isLive: true,
    order: 1,
    color: "#1D3461",
  },
  {
    slug: "mobile-money",
    name: "Mobile Money & Transfert",
    icon: "💸",
    description: "Frais de dépôt, retrait et transfert d'argent : trouvez le service le moins cher.",
    isLive: true,
    order: 2,
    color: "#6B8F3C",
  },
  {
    slug: "banques",
    name: "Banques",
    icon: "🏦",
    description: "Comptes courants, cartes bancaires et services de banque mobile en Guinée.",
    isLive: false,
    order: 3,
    color: "#1D3461",
  },
  {
    slug: "microfinance",
    name: "Microfinance",
    icon: "🤝",
    description: "Micro-crédits, épargne et financement pour particuliers et PME.",
    isLive: false,
    order: 4,
    color: "#6B8F3C",
  },
  {
    slug: "assurances",
    name: "Assurances",
    icon: "🛡️",
    description: "Auto, santé, habitation : comparez les offres d'assurance disponibles en Guinée.",
    isLive: false,
    order: 5,
    color: "#1D3461",
  },
  {
    slug: "energie",
    name: "Énergie & Solaire",
    icon: "☀️",
    description: "Kits solaires, groupes électrogènes et gaz : l'énergie au meilleur prix.",
    isLive: false,
    order: 6,
    color: "#F0A500",
  },
]

export const PROVIDERS: ProviderData[] = [
  // Télécom
  {
    slug: "orange-guinee",
    name: "Orange Guinée",
    verticalSlug: "telecom",
    description: "Leader du marché guinéen avec environ 75 % de parts de marché. Réseau 4G étendu, lié au service Orange Money.",
    hpScore: "A",
    hpScoreNum: 88,
    verified: true,
    sponsoredTier: "free",
    website: "https://orange.gn",
  },
  {
    slug: "telecel-guinee",
    name: "Telecel Guinée",
    verticalSlug: "telecom",
    description: "Repreneur des activités MTN Guinée. Réseau 3G/4G en expansion sur l'ensemble du territoire.",
    hpScore: "B",
    hpScoreNum: 72,
    verified: true,
    sponsoredTier: "free",
  },
  {
    slug: "cellcom-guinee",
    name: "Cellcom Guinée",
    verticalSlug: "telecom",
    description: "Opérateur challenger proposant des offres compétitives sur les zones urbaines.",
    hpScore: "C",
    hpScoreNum: 58,
    verified: true,
    sponsoredTier: "free",
  },
  {
    slug: "guinee-telecoms",
    name: "Guinée Télécoms",
    verticalSlug: "telecom",
    description: "Opérateur public (ex-SOTELGUI), spécialiste du fixe et de l'internet ADSL/fibre sur Conakry.",
    hpScore: "C",
    hpScoreNum: 55,
    verified: true,
    sponsoredTier: "free",
  },
  // Mobile Money
  {
    slug: "orange-money",
    name: "Orange Money",
    verticalSlug: "mobile-money",
    description: "Service de mobile money leader en Guinée. Réseau d'agents le plus étendu, transferts, paiements factures, recharges.",
    hpScore: "B",
    hpScoreNum: 75,
    verified: true,
    sponsoredTier: "free",
  },
  {
    slug: "mtn-momo",
    name: "MTN MoMo (Telecel)",
    verticalSlug: "mobile-money",
    description: "Portefeuille mobile désormais opéré par Telecel Guinée. Disponible sur l'ensemble du réseau Telecel.",
    hpScore: "C",
    hpScoreNum: 62,
    verified: true,
    sponsoredTier: "free",
  },
  {
    slug: "soutra-money",
    name: "Soutra Money",
    verticalSlug: "mobile-money",
    description: "Fintech 100 % guinéenne (Digital Pay – Groupe LANALA). Dépôts et retraits GRATUITS. Transfert plafonné à 1 % — le tarif le plus bas du marché. Paiement facture EDG, cartes Visa prépayées.",
    hpScore: "A",
    hpScoreNum: 91,
    verified: true,
    sponsoredTier: "gold",
  },
]

export const OFFERS: OfferData[] = [
  // Orange Guinée — forfaits
  {
    slug: "orange-forfait-smart-1go",
    providerSlug: "orange-guinee",
    verticalSlug: "telecom",
    name: "Smart 1 Go",
    category: "forfait-mobile",
    description: "Forfait mensuel avec 1 Go de data, appels illimités vers Orange Guinée.",
    priceNote: "à partir de 50 000 GNF/mois",
    priceIsExample: true,
    hpScore: "B",
    hpScoreNum: 70,
    isFeatured: false,
    details: [
      { key: "Data", value: "1 Go", isHighlight: true },
      { key: "Appels", value: "Illimités Orange", isHighlight: false },
      { key: "SMS", value: "100 SMS", isHighlight: false },
      { key: "Validité", value: "30 jours", isHighlight: false },
      { key: "Prix", value: "≈ 50 000 GNF", unit: "/mois", isHighlight: false },
    ],
  },
  {
    slug: "orange-forfait-smart-5go",
    providerSlug: "orange-guinee",
    verticalSlug: "telecom",
    name: "Smart 5 Go",
    category: "forfait-mobile",
    description: "Forfait data mensuel avec 5 Go, appels illimités tous opérateurs.",
    priceNote: "à partir de 150 000 GNF/mois",
    priceIsExample: true,
    hpScore: "A",
    hpScoreNum: 85,
    isFeatured: true,
    details: [
      { key: "Data", value: "5 Go", isHighlight: true },
      { key: "Appels", value: "Illimités tous opérateurs", isHighlight: true },
      { key: "SMS", value: "500 SMS", isHighlight: false },
      { key: "Validité", value: "30 jours", isHighlight: false },
      { key: "Prix", value: "≈ 150 000 GNF", unit: "/mois", isHighlight: false },
    ],
  },
  {
    slug: "telecel-data-3go",
    providerSlug: "telecel-guinee",
    verticalSlug: "telecom",
    name: "Pack Data 3 Go",
    category: "forfait-mobile",
    description: "Bundle data mensuel 3 Go avec bonus de nuit.",
    priceNote: "à partir de 80 000 GNF/mois",
    priceIsExample: true,
    hpScore: "B",
    hpScoreNum: 72,
    isFeatured: false,
    details: [
      { key: "Data", value: "3 Go", isHighlight: true },
      { key: "Bonus nuit", value: "+ 2 Go (00h-06h)", isHighlight: true },
      { key: "Appels", value: "Illimités Telecel", isHighlight: false },
      { key: "Validité", value: "30 jours", isHighlight: false },
      { key: "Prix", value: "≈ 80 000 GNF", unit: "/mois", isHighlight: false },
    ],
  },
  {
    slug: "guinee-telecoms-adsl-box",
    providerSlug: "guinee-telecoms",
    verticalSlug: "telecom",
    name: "Box ADSL Résidentielle",
    category: "internet-fixe",
    description: "Connexion ADSL pour domicile ou PME, débit jusqu'à 4 Mbps.",
    priceNote: "à partir de 200 000 GNF/mois",
    priceIsExample: true,
    hpScore: "C",
    hpScoreNum: 55,
    isFeatured: false,
    details: [
      { key: "Type", value: "ADSL", isHighlight: false },
      { key: "Débit", value: "Jusqu'à 4 Mbps", isHighlight: true },
      { key: "Installation", value: "Incluse", isHighlight: false },
      { key: "Engagement", value: "12 mois", isHighlight: false },
      { key: "Prix", value: "≈ 200 000 GNF", unit: "/mois", isHighlight: false },
    ],
  },
  // Mobile Money
  {
    slug: "soutra-money-transfert",
    providerSlug: "soutra-money",
    verticalSlug: "mobile-money",
    name: "Transfert Soutra Money",
    category: "transfert",
    description: "Envoyez de l'argent en Guinée au tarif le plus bas du marché. Dépôt et retrait totalement gratuits.",
    priceNote: "0 GNF de frais de dépôt/retrait · 1 % max sur transfert",
    priceIsExample: false,
    hpScore: "A",
    hpScoreNum: 95,
    isFeatured: true,
    details: [
      { key: "Dépôt", value: "Gratuit", isHighlight: true },
      { key: "Retrait", value: "Gratuit", isHighlight: true },
      { key: "Transfert", value: "≤ 1 %", unit: "du montant", isHighlight: true },
      { key: "Paiement EDG", value: "Oui", isHighlight: false },
      { key: "Carte Visa", value: "Prépayée disponible", isHighlight: true },
    ],
  },
  {
    slug: "orange-money-transfert",
    providerSlug: "orange-money",
    verticalSlug: "mobile-money",
    name: "Transfert Orange Money",
    category: "transfert",
    description: "Le réseau d'agents le plus étendu de Guinée pour vos transferts et paiements.",
    priceNote: "Frais variables selon montant — à vérifier",
    priceIsExample: true,
    hpScore: "B",
    hpScoreNum: 72,
    isFeatured: false,
    details: [
      { key: "Dépôt", value: "À vérifier", isHighlight: false },
      { key: "Retrait", value: "À vérifier", isHighlight: false },
      { key: "Transfert", value: "Variable", isHighlight: false },
      { key: "Paiement factures", value: "Oui", isHighlight: false },
      { key: "Réseau agents", value: "Très étendu +++", isHighlight: true },
    ],
  },
  {
    slug: "mtn-momo-transfert",
    providerSlug: "mtn-momo",
    verticalSlug: "mobile-money",
    name: "Transfert MTN MoMo",
    category: "transfert",
    description: "Portefeuille mobile Telecel/MoMo pour vos transactions du quotidien.",
    priceNote: "Frais variables — à vérifier",
    priceIsExample: true,
    hpScore: "C",
    hpScoreNum: 60,
    isFeatured: false,
    details: [
      { key: "Dépôt", value: "À vérifier", isHighlight: false },
      { key: "Retrait", value: "À vérifier", isHighlight: false },
      { key: "Transfert", value: "Variable", isHighlight: false },
      { key: "Paiement factures", value: "Oui", isHighlight: false },
      { key: "Réseau agents", value: "Étendu ++", isHighlight: false },
    ],
  },
]

export const ARTICLES = [
  {
    slug: "soutra-money-depots-retraits-gratuits-guinee",
    title: "Soutra Money : dépôts et retraits gratuits, le game-changer du mobile money en Guinée",
    excerpt: "La fintech guinéenne Soutra Money (Groupe LANALA) révolutionne le marché avec des frais de dépôt et de retrait à zéro franc — une première en Guinée.",
    verticalSlug: "mobile-money",
    authorName: "Équipe HP Selectra",
    publishedAt: new Date("2026-05-01"),
    isPublished: true,
  },
  {
    slug: "meilleur-forfait-mobile-guinee-2026",
    title: "Meilleur forfait mobile en Guinée en 2026 : comparatif Orange, Telecel, Cellcom",
    excerpt: "Quel opérateur propose le meilleur rapport qualité-prix pour votre forfait mobile en Guinée ? Notre comparatif détaillé vous aide à choisir.",
    verticalSlug: "telecom",
    authorName: "Équipe HP Selectra",
    publishedAt: new Date("2026-04-15"),
    isPublished: true,
  },
  {
    slug: "arpt-regulation-telecoms-guinee",
    title: "ARPT Guinée : rôle du régulateur des télécommunications et vos droits en tant qu'abonné",
    excerpt: "L'Autorité de Régulation des Postes et Télécommunications (ARPT) est le gendarme des opérateurs télécom. Ce qu'elle peut faire pour vous.",
    verticalSlug: "telecom",
    authorName: "Équipe HP Selectra",
    publishedAt: new Date("2026-03-20"),
    isPublished: true,
  },
]
