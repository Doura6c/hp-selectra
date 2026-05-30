import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json()

    const adminPassword = process.env.ADMIN_PASSWORD
    const sessionToken = process.env.ADMIN_SESSION_TOKEN

    if (!adminPassword || !sessionToken) {
      return NextResponse.json({ error: "Admin non configuré" }, { status: 500 })
    }

    if (password !== adminPassword) {
      return NextResponse.json({ error: "Mot de passe incorrect" }, { status: 401 })
    }

    const response = NextResponse.json({ success: true })
    response.cookies.set("hp_admin_session", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 8, // 8 heures
      path: "/",
    })
    return response
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
