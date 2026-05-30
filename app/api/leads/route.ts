import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { addLead, getLeads } from "@/lib/leads-store"

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
  // Accès réservé admin (vérification token session via cookie)
  const session = req.cookies.get("hp_admin_session")
  const expected = process.env.ADMIN_SESSION_TOKEN
  if (!expected || !session?.value || session.value !== expected) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }
  return NextResponse.json({ leads: getLeads() })
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
