import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

const LeadSchema = z.object({
  channel: z.enum(["whatsapp", "callback", "form", "newsletter"]),
  name: z.string().max(100).optional(),
  phone: z.string().max(30).optional(),
  email: z.string().email().optional(),
  message: z.string().max(1000).optional(),
  verticalSlug: z.string().optional(),
  consentGiven: z.boolean(),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = LeadSchema.parse(body)

    if (!data.consentGiven) {
      return NextResponse.json({ error: "Consentement requis" }, { status: 400 })
    }

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
