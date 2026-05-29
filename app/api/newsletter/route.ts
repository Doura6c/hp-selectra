import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

const Schema = z.object({
  email: z.string().email(),
  consentGiven: z.boolean(),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = Schema.parse(body)

    if (!data.consentGiven) {
      return NextResponse.json({ error: "Consentement requis" }, { status: 400 })
    }

    // TODO: stocker en DB ou envoyer vers un ESP (Mailchimp, Brevo...)
    console.log("[Newsletter]", data.email)

    return NextResponse.json({ success: true })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 422 })
    }
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
