import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

// ── In-memory user store (demo) ──────────────────────────────────────────────
// In production this should be a real DB. For demo we use module-level state.

export type UserAccount = {
  id: string
  email: string
  passwordHash: string // SHA-256 hex; in prod use bcrypt
  prenom: string
  nom: string
  phone?: string
  createdAt: string
  savedComparisons: SavedComparison[]
  alerts: PriceAlert[]
  callbackHistory: CallbackEntry[]
  newsletterSectors: string[]
}

export type SavedComparison = {
  id: string
  verticalSlug: string
  providerSlug: string
  offerSlug?: string
  savedAt: string
  note?: string
}

export type PriceAlert = {
  id: string
  verticalSlug: string
  providerSlug: string
  threshold?: number
  active: boolean
  createdAt: string
}

export type CallbackEntry = {
  id: string
  requestedAt: string
  status: "pending" | "done" | "missed"
  topic: string
  advisorNote?: string
}

// Demo seed accounts
const ACCOUNTS: UserAccount[] = [
  {
    id: "usr_001",
    email: "demo@hp-selectra.gn",
    // SHA-256("demo1234") — never store plain passwords
    passwordHash: "36bce9cdf7fc13a9d92e31b87f20f91d2e3e5e5a1e8e3f9b1d8c6f2a5b4e7d9c",
    prenom: "Amadou",
    nom: "Demo",
    phone: "+224 621 000 001",
    createdAt: new Date(Date.now() - 30 * 86400000).toISOString(),
    savedComparisons: [
      { id: "sc_1", verticalSlug: "telecom", providerSlug: "orange-guinee", savedAt: new Date(Date.now() - 5 * 86400000).toISOString(), note: "Meilleure couverture Conakry" },
      { id: "sc_2", verticalSlug: "mobile-money", providerSlug: "soutra-money", savedAt: new Date(Date.now() - 2 * 86400000).toISOString() },
      { id: "sc_3", verticalSlug: "banques", providerSlug: "ecobank-guinee", savedAt: new Date(Date.now() - 1 * 86400000).toISOString() },
    ],
    alerts: [
      { id: "al_1", verticalSlug: "telecom", providerSlug: "telecel-guinee", active: true, createdAt: new Date(Date.now() - 7 * 86400000).toISOString() },
    ],
    callbackHistory: [
      { id: "cb_1", requestedAt: new Date(Date.now() - 10 * 86400000).toISOString(), status: "done", topic: "Comparaison forfaits mobiles", advisorNote: "Client conseillé vers Orange Guinée offre DATA 20 Go." },
      { id: "cb_2", requestedAt: new Date(Date.now() - 3 * 86400000).toISOString(), status: "pending", topic: "Compte bancaire entreprise" },
    ],
    newsletterSectors: ["telecom", "mobile-money"],
  },
]

// ── Helpers ──────────────────────────────────────────────────────────────────

async function sha256(str: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(str)
  const hashBuffer = await crypto.subtle.digest("SHA-256", data)
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
}

function generateSessionToken(): string {
  return Array.from(crypto.getRandomValues(new Uint8Array(32)))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
}

// Active sessions map: token → userId
const SESSIONS = new Map<string, string>()

// ── POST /api/auth — login, register, logout ─────────────────────────────────

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}))
  const { action } = body as { action: string }

  // ── LOGIN ──
  if (action === "login") {
    const { email, password } = body as { email: string; password: string }
    if (!email || !password) {
      return NextResponse.json({ error: "Champs requis manquants." }, { status: 400 })
    }
    const user = ACCOUNTS.find((u) => u.email.toLowerCase() === email.toLowerCase())
    if (!user) {
      return NextResponse.json({ error: "Email ou mot de passe incorrect." }, { status: 401 })
    }
    const hash = await sha256(password)
    // Demo: accept any password for demo account to simplify testing
    const isDemo = user.id === "usr_001"
    if (!isDemo && hash !== user.passwordHash) {
      return NextResponse.json({ error: "Email ou mot de passe incorrect." }, { status: 401 })
    }
    const token = generateSessionToken()
    SESSIONS.set(token, user.id)
    const cookieStore = await cookies()
    cookieStore.set("hp_user_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 3600, // 7 jours
      path: "/",
    })
    return NextResponse.json({
      ok: true,
      user: { id: user.id, prenom: user.prenom, nom: user.nom, email: user.email },
    })
  }

  // ── REGISTER ──
  if (action === "register") {
    const { email, password, prenom, nom, phone } = body as {
      email: string; password: string; prenom: string; nom: string; phone?: string
    }
    if (!email || !password || !prenom || !nom) {
      return NextResponse.json({ error: "Tous les champs obligatoires sont requis." }, { status: 400 })
    }
    if (ACCOUNTS.find((u) => u.email.toLowerCase() === email.toLowerCase())) {
      return NextResponse.json({ error: "Un compte existe déjà avec cet email." }, { status: 409 })
    }
    const hash = await sha256(password)
    const newUser: UserAccount = {
      id: `usr_${Date.now()}`,
      email,
      passwordHash: hash,
      prenom,
      nom,
      phone,
      createdAt: new Date().toISOString(),
      savedComparisons: [],
      alerts: [],
      callbackHistory: [],
      newsletterSectors: [],
    }
    ACCOUNTS.push(newUser)
    const token = generateSessionToken()
    SESSIONS.set(token, newUser.id)
    const cookieStore = await cookies()
    cookieStore.set("hp_user_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 3600,
      path: "/",
    })
    return NextResponse.json({
      ok: true,
      user: { id: newUser.id, prenom: newUser.prenom, nom: newUser.nom, email: newUser.email },
    })
  }

  // ── LOGOUT ──
  if (action === "logout") {
    const cookieStore = await cookies()
    const token = cookieStore.get("hp_user_session")?.value
    if (token) SESSIONS.delete(token)
    cookieStore.delete("hp_user_session")
    return NextResponse.json({ ok: true })
  }

  return NextResponse.json({ error: "Action inconnue." }, { status: 400 })
}

// ── GET /api/auth — verify session & return user data ────────────────────────

export async function GET(req: NextRequest) {
  const cookieStore = await cookies()
  const token = cookieStore.get("hp_user_session")?.value
  if (!token || !SESSIONS.has(token)) {
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }
  const userId = SESSIONS.get(token)!
  const user = ACCOUNTS.find((u) => u.id === userId)
  if (!user) {
    SESSIONS.delete(token)
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }
  return NextResponse.json({
    authenticated: true,
    user: {
      id: user.id,
      prenom: user.prenom,
      nom: user.nom,
      email: user.email,
      phone: user.phone,
      createdAt: user.createdAt,
      savedComparisons: user.savedComparisons,
      alerts: user.alerts,
      callbackHistory: user.callbackHistory,
      newsletterSectors: user.newsletterSectors,
    },
  })
}

// Export helper for other routes
export { SESSIONS, ACCOUNTS }
