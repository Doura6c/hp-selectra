/**
 * Store de leads en mémoire — données de session uniquement.
 * En production, brancher DATABASE_URL + décommenter les appels Prisma
 * dans app/api/leads/route.ts pour la persistance.
 */

export type LeadChannel = "whatsapp" | "callback" | "form" | "newsletter"

export type Lead = {
  id: string
  channel: LeadChannel
  name?: string
  phone?: string
  email?: string
  message?: string
  verticalSlug?: string
  consentGiven: boolean
  createdAt: string // ISO 8601
}

// Données d'exemple pour le back-office (affichées quand le store est vide)
const DEMO_LEADS: Lead[] = [
  {
    id: "demo-1",
    channel: "callback",
    name: "Mamadou Diallo",
    phone: "+224 621 00 00 01",
    message: "Intéressé par les offres Orange Money — transfert international",
    verticalSlug: "mobile-money",
    consentGiven: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // -30 min
  },
  {
    id: "demo-2",
    channel: "whatsapp",
    name: "Fatoumata Camara",
    phone: "+224 664 00 00 02",
    message: "HP Assistant — Forfaits mobiles",
    verticalSlug: "telecom",
    consentGiven: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // -2h
  },
  {
    id: "demo-3",
    channel: "form",
    name: "Ibrahima Sow",
    email: "i.sow@example.com",
    phone: "+224 628 00 00 03",
    message: "Comparer les frais bancaires Ecobank vs BICIGUI",
    verticalSlug: "banques",
    consentGiven: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // -5h
  },
  {
    id: "demo-4",
    channel: "newsletter",
    email: "aissatou.bah@example.com",
    consentGiven: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // -1j
  },
  {
    id: "demo-5",
    channel: "callback",
    name: "Sékou Barry",
    phone: "+224 655 00 00 05",
    message: "Box 4G Orange — tarif professionnel",
    verticalSlug: "fai",
    consentGiven: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // -2j
  },
]

// Store in-memory : commence avec les démos, les vrais leads s'ajoutent en session
const store: Lead[] = [...DEMO_LEADS]
let isDemo = true // true tant qu'aucun vrai lead n'a été ajouté

export function addLead(lead: Omit<Lead, "id" | "createdAt">) {
  if (isDemo) {
    isDemo = false
    // On conserve les démos mais on les marque visuellement via leur id "demo-*"
  }
  store.unshift({
    ...lead,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  })
}

export function getLeads(): Lead[] {
  return [...store]
}

export function getLeadCount(): number {
  return store.filter((l) => !l.id.startsWith("demo-")).length
}
