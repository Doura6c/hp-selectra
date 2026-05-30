/**
 * Store de leads en mémoire — données de session uniquement.
 * En production, brancher DATABASE_URL + décommenter les appels Prisma
 * dans app/api/leads/route.ts pour la persistance.
 */

export type LeadChannel = "whatsapp" | "callback" | "form" | "newsletter"

export type LeadStatus = "nouveau" | "contacte" | "en-cours" | "converti" | "perdu"

export type Lead = {
  id: string
  channel: LeadChannel
  status: LeadStatus
  name?: string
  phone?: string
  email?: string
  message?: string
  verticalSlug?: string
  consentGiven: boolean
  createdAt: string // ISO 8601
  updatedAt?: string
  notes?: string
}

// Données d'exemple pour le back-office (affichées quand le store est vide)
const DEMO_LEADS: Lead[] = [
  {
    id: "demo-1",
    channel: "callback",
    status: "nouveau",
    name: "Mamadou Diallo",
    phone: "+224 621 00 00 01",
    message: "Intéressé par les offres Orange Money — transfert international",
    verticalSlug: "mobile-money",
    consentGiven: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: "demo-2",
    channel: "whatsapp",
    status: "contacte",
    name: "Fatoumata Camara",
    phone: "+224 664 00 00 02",
    message: "HP Assistant — Forfaits mobiles",
    verticalSlug: "telecom",
    consentGiven: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: "demo-3",
    channel: "form",
    status: "en-cours",
    name: "Ibrahima Sow",
    email: "i.sow@example.com",
    phone: "+224 628 00 00 03",
    message: "Comparer les frais bancaires Ecobank vs BICIGUI",
    verticalSlug: "banques",
    consentGiven: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
  },
  {
    id: "demo-4",
    channel: "newsletter",
    status: "converti",
    email: "aissatou.bah@example.com",
    consentGiven: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
  {
    id: "demo-5",
    channel: "callback",
    status: "nouveau",
    name: "Sékou Barry",
    phone: "+224 655 00 00 05",
    message: "Box 4G Orange — tarif professionnel",
    verticalSlug: "fai",
    consentGiven: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
  },
  {
    id: "demo-6",
    channel: "form",
    status: "perdu",
    name: "Mariama Kouyaté",
    phone: "+224 612 00 00 06",
    message: "Ouvrir un compte bancaire pour mon commerce",
    verticalSlug: "banques",
    consentGiven: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
    notes: "A finalement choisi une autre banque",
  },
]

// Store in-memory
const store: Lead[] = [...DEMO_LEADS]
let isDemo = true

export function addLead(lead: Omit<Lead, "id" | "createdAt" | "status">) {
  if (isDemo) {
    isDemo = false
  }
  store.unshift({
    ...lead,
    id: crypto.randomUUID(),
    status: "nouveau",
    createdAt: new Date().toISOString(),
  })
}

export function getLeads(): Lead[] {
  return [...store]
}

export function getLeadCount(): number {
  return store.filter((l) => !l.id.startsWith("demo-")).length
}

export function updateLeadStatus(id: string, status: LeadStatus, notes?: string): boolean {
  const lead = store.find((l) => l.id === id)
  if (!lead) return false
  lead.status = status
  lead.updatedAt = new Date().toISOString()
  if (notes !== undefined) lead.notes = notes
  return true
}

export function getLeadStats() {
  const byStatus = store.reduce<Record<LeadStatus, number>>((acc, l) => {
    acc[l.status] = (acc[l.status] ?? 0) + 1
    return acc
  }, { nouveau: 0, contacte: 0, "en-cours": 0, converti: 0, perdu: 0 })

  const byChannel = store.reduce<Record<LeadChannel, number>>((acc, l) => {
    acc[l.channel] = (acc[l.channel] ?? 0) + 1
    return acc
  }, { whatsapp: 0, callback: 0, form: 0, newsletter: 0 })

  const byVertical = store.reduce<Record<string, number>>((acc, l) => {
    if (l.verticalSlug) acc[l.verticalSlug] = (acc[l.verticalSlug] ?? 0) + 1
    return acc
  }, {})

  return { byStatus, byChannel, byVertical, total: store.length }
}
