import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { addLead, getLeads, updateLeadStatus, getLeadStats, type LeadStatus } from "@/lib/leads-store"

const LeadSchema = z.object({
  channel: z.enum(["whatsapp", "callback", "form", "newsletter"]),
  name: z.string().max(100).optional(),
  phone: z.string().max(30).optional(),
  email: z.string().email().optional(),
  message: z.string().max(1000).optional(),
  verticalSlug: z.string().optional(),
  consentGiven: z.boolean(),
})

export async function GET(req: NextRequest) {
  // Accès admin — accepte cookie session OU secret query param (pour les KPIs)
  const session = req.cookies.get("hp_admin_session")
  const expected = process.env.ADMIN_SESSION_TOKEN
  const secretParam = req.nextUrl.searchParams.get("secret")
  const isAuthorized = (expected && session?.value === expected) || secretParam === "hp-admin-2026"
  if (!isAuthorized) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }
  return NextResponse.json({ leads: getLeads(), stats: getLeadStats() })
}

export async function PATCH(req: NextRequest) {
  // Mise à jour statut lead (CRM)
  const session = req.cookies.get("hp_admin_session")
  const expected = process.env.ADMIN_SESSION_TOKEN
  const secretParam = req.nextUrl.searchParams.get("secret")
  const isAuthorized = (expected && session?.value === expected) || secretParam === "hp-admin-2026"
  if (!isAuthorized) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { id, status, notes } = body as { id: string; status: LeadStatus; notes?: string }
    if (!id || !status) {
      return NextResponse.json({ error: "id et status requis" }, { status: 400 })
    }
    const ok = updateLeadStatus(id, status, notes)
    return ok
      ? NextResponse.json({ ok: true })
      : NextResponse.json({ error: "Lead non trouvé" }, { status: 404 })
  } catch {
    return NextResponse.json({ error: "Erreur" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = LeadSchema.parse(body)

    if (!data.consentGiven) {
      return NextResponse.json({ error: "Consentement requis" }, { status: 400 })
    }

    addLead(data)

    // Stockage DB désactivé tant que DATABASE_URL n'est pas configuré
    // Pour activer : décommenter le bloc ci-dessous et configurer DATABASE_URL
    //
    // const { prisma } = await import("@/lib/prisma")
    // await prisma.lead.create({
    //   data: {
    //     channel: data.channel,
    //     name: data.name,
    //     phone: data.phone,
    //     email: data.email,
    //     message: data.message,
    //     consentGiven: data.consentGiven,
    //     utmSource: req.nextUrl.searchParams.get("utm_source") ?? undefined,
    //   },
    // })

    console.log("[Lead]", data)
    return NextResponse.json({ success: true })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 422 })
    }
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
