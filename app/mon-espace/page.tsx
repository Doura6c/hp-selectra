"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Eye, EyeOff, MessageCircle, CheckCircle2, Star, BookmarkCheck,
  Bell, Phone, ChevronRight, LogIn, UserPlus, ArrowRight,
} from "lucide-react"

const FEATURES = [
  { icon: BookmarkCheck, title: "Comparaisons sauvegardées", desc: "Retrouvez les offres que vous avez mises de côté pour les comparer plus tard." },
  { icon: Bell, title: "Alertes prix", desc: "Soyez notifié dès qu'une offre évolue dans votre secteur préféré." },
  { icon: Phone, title: "Historique de rappels", desc: "Suivez vos demandes de rappel et les conseils reçus de nos experts." },
  { icon: Star, title: "Recommandations personnalisées", desc: "Obtenez des suggestions basées sur votre profil et vos préférences." },
]

const TESTIMONIALS = [
  { prenom: "Kadiatou", ville: "Conakry", text: "Grâce à mon espace, j'ai suivi l'évolution des frais Soutra Money et changé au bon moment." },
  { prenom: "Ibrahima", ville: "Kindia", text: "Les alertes prix m'ont permis d'économiser sur mon forfait mobile. Super outil !" },
  { prenom: "Mariama", ville: "Labé", text: "J'apprécie de retrouver mes comparaisons sauvegardées à chaque connexion." },
]

export default function MonEspacePage() {
  const router = useRouter()
  const [mode, setMode] = useState<"landing" | "login" | "register">("landing")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [showPwd, setShowPwd] = useState(false)

  // Champs login
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPwd, setLoginPwd] = useState("")

  // Champs register
  const [regPrenom, setRegPrenom] = useState("")
  const [regNom, setRegNom] = useState("")
  const [regEmail, setRegEmail] = useState("")
  const [regPhone, setRegPhone] = useState("")
  const [regPwd, setRegPwd] = useState("")
  const [regConsent, setRegConsent] = useState(false)
  const [newsletterSectors, setNewsletterSectors] = useState<string[]>([])

  // Vérifier si déjà connecté
  useEffect(() => {
    fetch("/api/auth")
      .then((r) => r.json())
      .then((d) => { if (d.authenticated) router.push("/mon-espace/dashboard") })
      .catch(() => {})
  }, [router])

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true); setError("")
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "login", email: loginEmail, password: loginPwd }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Erreur de connexion")
      router.push("/mon-espace/dashboard")
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erreur inconnue")
    } finally {
      setLoading(false)
    }
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    if (!regConsent) { setError("Veuillez accepter les conditions d'utilisation."); return }
    setLoading(true); setError("")
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "register",
          email: regEmail,
          password: regPwd,
          prenom: regPrenom,
          nom: regNom,
          phone: regPhone,
          newsletterSectors,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Erreur d'inscription")
      router.push("/mon-espace/dashboard")
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erreur inconnue")
    } finally {
      setLoading(false)
    }
  }

  function toggleSector(s: string) {
    setNewsletterSectors((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s])
  }

  // ── LANDING ──────────────────────────────────────────────────────────────
  if (mode === "landing") {
    return (
      <div style={{ backgroundColor: "var(--color-surface)" }}>
        {/* Hero */}
        <section
          className="relative overflow-hidden py-20 md:py-32"
          style={{
            background: "linear-gradient(135deg, var(--color-primary-dark) 0%, var(--color-primary) 55%, #2d5198 100%)",
          }}
        >
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -top-32 right-0 w-[500px] h-[500px] rounded-full opacity-10" style={{ background: "radial-gradient(circle, var(--color-accent) 0%, transparent 70%)" }} />
            <div className="absolute bottom-0 -left-20 w-80 h-80 rounded-full opacity-10" style={{ background: "radial-gradient(circle, var(--color-secondary) 0%, transparent 70%)" }} />
          </div>

          <div className="container relative">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-6 text-white/80" style={{ backgroundColor: "rgba(255,255,255,0.1)" }}>
                  ✨ Espace personnel gratuit
                </div>
                <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-5">
                  Votre espace<br />
                  <span style={{ color: "var(--color-accent)" }}>HP Selectra</span>
                </h1>
                <p className="text-lg text-white/70 mb-8">
                  Sauvegardez vos comparaisons, activez des alertes prix
                  et suivez l&apos;historique de vos échanges avec nos experts.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => setMode("register")}
                    className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-base font-bold text-white transition-opacity hover:opacity-90"
                    style={{ backgroundColor: "var(--color-secondary)" }}
                  >
                    <UserPlus className="w-5 h-5" />
                    Créer mon espace gratuit
                  </button>
                  <button
                    onClick={() => setMode("login")}
                    className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-base font-semibold text-white border-2 border-white/30 hover:bg-white/10 transition-colors"
                  >
                    <LogIn className="w-4 h-4" />
                    Se connecter
                  </button>
                </div>
                <p className="text-white/50 text-xs mt-4">
                  Compte démo : demo@hp-selectra.gn / n&apos;importe quel mot de passe
                </p>
              </div>

              {/* Features preview */}
              <div className="grid grid-cols-2 gap-3">
                {FEATURES.map((f) => (
                  <div
                    key={f.title}
                    className="rounded-2xl p-4"
                    style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
                  >
                    <f.icon className="w-6 h-6 mb-2 text-white/80" />
                    <p className="text-sm font-semibold text-white">{f.title}</p>
                    <p className="text-xs text-white/50 mt-1 leading-snug">{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Témoignages */}
        <section className="py-16 container">
          <h2 className="text-xl font-bold text-center mb-8" style={{ color: "var(--color-text)" }}>
            Ce que disent nos utilisateurs
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.prenom} className="rounded-2xl p-6 border" style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}>
                <div className="flex gap-1 mb-3">
                  {[1,2,3,4,5].map((i) => <Star key={i} className="w-4 h-4 fill-current" style={{ color: "var(--color-accent)" }} />)}
                </div>
                <p className="text-sm italic mb-4" style={{ color: "var(--color-muted)" }}>&ldquo;{t.text}&rdquo;</p>
                <p className="text-sm font-bold" style={{ color: "var(--color-text)" }}>{t.prenom} — {t.ville}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA final */}
        <section className="py-12" style={{ backgroundColor: "var(--color-card)", borderTop: "1px solid var(--color-border)" }}>
          <div className="container text-center">
            <p className="text-base mb-4" style={{ color: "var(--color-muted)" }}>Prêt à profiter de toutes les fonctionnalités ?</p>
            <button
              onClick={() => setMode("register")}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: "var(--color-primary)" }}
            >
              Créer mon espace gratuit <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>
      </div>
    )
  }

  // ── FORMULAIRE LOGIN / REGISTER ──────────────────────────────────────────
  return (
    <div
      className="min-h-screen flex items-center justify-center py-16 px-4"
      style={{
        background: "linear-gradient(135deg, var(--color-primary-dark) 0%, var(--color-primary) 60%, #2d5198 100%)",
      }}
    >
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <span className="text-white font-bold text-2xl tracking-tight">
              HP<span style={{ color: "var(--color-accent)" }}>·</span>Selectra
            </span>
          </Link>
          <p className="text-white/60 text-sm mt-1">Espace personnel</p>
        </div>

        <div className="rounded-3xl overflow-hidden shadow-2xl" style={{ backgroundColor: "var(--color-card)" }}>
          {/* Tabs */}
          <div className="flex border-b" style={{ borderColor: "var(--color-border)" }}>
            <button
              onClick={() => { setMode("login"); setError("") }}
              className="flex-1 py-4 text-sm font-bold transition-colors"
              style={{
                color: mode === "login" ? "var(--color-primary)" : "var(--color-muted)",
                borderBottom: mode === "login" ? "2px solid var(--color-primary)" : "2px solid transparent",
              }}
            >
              <LogIn className="w-4 h-4 inline mr-1.5 -mt-0.5" />
              Se connecter
            </button>
            <button
              onClick={() => { setMode("register"); setError("") }}
              className="flex-1 py-4 text-sm font-bold transition-colors"
              style={{
                color: mode === "register" ? "var(--color-primary)" : "var(--color-muted)",
                borderBottom: mode === "register" ? "2px solid var(--color-primary)" : "2px solid transparent",
              }}
            >
              <UserPlus className="w-4 h-4 inline mr-1.5 -mt-0.5" />
              S&apos;inscrire
            </button>
          </div>

          <div className="p-8">
            {error && (
              <div className="mb-4 px-4 py-3 rounded-xl text-sm font-medium" style={{ backgroundColor: "#fde8e8", color: "var(--color-danger)" }}>
                {error}
              </div>
            )}

            {/* ── LOGIN FORM ── */}
            {mode === "login" && (
              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold mb-1.5 uppercase tracking-wide" style={{ color: "var(--color-muted)" }}>
                    Email
                  </label>
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="votre@email.com"
                    required
                    className="w-full px-4 py-3 rounded-xl border text-sm outline-none focus:ring-2"
                    style={{ borderColor: "var(--color-border)", color: "var(--color-text)", backgroundColor: "var(--color-surface)" }}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1.5 uppercase tracking-wide" style={{ color: "var(--color-muted)" }}>
                    Mot de passe
                  </label>
                  <div className="relative">
                    <input
                      type={showPwd ? "text" : "password"}
                      value={loginPwd}
                      onChange={(e) => setLoginPwd(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="w-full px-4 py-3 pr-10 rounded-xl border text-sm outline-none focus:ring-2"
                      style={{ borderColor: "var(--color-border)", color: "var(--color-text)", backgroundColor: "var(--color-surface)" }}
                    />
                    <button type="button" onClick={() => setShowPwd((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                      {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
                  style={{ backgroundColor: "var(--color-primary)" }}
                >
                  {loading ? "Connexion…" : "Se connecter"}
                </button>
                <p className="text-center text-xs" style={{ color: "var(--color-muted)" }}>
                  Compte démo : <span className="font-mono text-[11px]">demo@hp-selectra.gn</span> + n&apos;importe quel mot de passe
                </p>
              </form>
            )}

            {/* ── REGISTER FORM ── */}
            {mode === "register" && (
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold mb-1.5 uppercase tracking-wide" style={{ color: "var(--color-muted)" }}>Prénom *</label>
                    <input type="text" value={regPrenom} onChange={(e) => setRegPrenom(e.target.value)} placeholder="Mamadou" required
                      className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none focus:ring-2"
                      style={{ borderColor: "var(--color-border)", color: "var(--color-text)", backgroundColor: "var(--color-surface)" }} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1.5 uppercase tracking-wide" style={{ color: "var(--color-muted)" }}>Nom *</label>
                    <input type="text" value={regNom} onChange={(e) => setRegNom(e.target.value)} placeholder="Diallo" required
                      className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none focus:ring-2"
                      style={{ borderColor: "var(--color-border)", color: "var(--color-text)", backgroundColor: "var(--color-surface)" }} />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1.5 uppercase tracking-wide" style={{ color: "var(--color-muted)" }}>Email *</label>
                  <input type="email" value={regEmail} onChange={(e) => setRegEmail(e.target.value)} placeholder="votre@email.com" required
                    className="w-full px-4 py-3 rounded-xl border text-sm outline-none focus:ring-2"
                    style={{ borderColor: "var(--color-border)", color: "var(--color-text)", backgroundColor: "var(--color-surface)" }} />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1.5 uppercase tracking-wide" style={{ color: "var(--color-muted)" }}>Téléphone</label>
                  <input type="tel" value={regPhone} onChange={(e) => setRegPhone(e.target.value)} placeholder="+224 6xx xxx xxx"
                    className="w-full px-4 py-3 rounded-xl border text-sm outline-none focus:ring-2"
                    style={{ borderColor: "var(--color-border)", color: "var(--color-text)", backgroundColor: "var(--color-surface)" }} />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1.5 uppercase tracking-wide" style={{ color: "var(--color-muted)" }}>Mot de passe *</label>
                  <div className="relative">
                    <input type={showPwd ? "text" : "password"} value={regPwd} onChange={(e) => setRegPwd(e.target.value)} placeholder="Min. 8 caractères" required minLength={8}
                      className="w-full px-4 py-3 pr-10 rounded-xl border text-sm outline-none focus:ring-2"
                      style={{ borderColor: "var(--color-border)", color: "var(--color-text)", backgroundColor: "var(--color-surface)" }} />
                    <button type="button" onClick={() => setShowPwd((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                      {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                {/* Secteurs newsletter */}
                <div>
                  <label className="block text-xs font-bold mb-2 uppercase tracking-wide" style={{ color: "var(--color-muted)" }}>Alertes — secteurs (optionnel)</label>
                  <div className="flex flex-wrap gap-2">
                    {["telecom","mobile-money","banques","fai"].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => toggleSector(s)}
                        className="px-3 py-1.5 rounded-full text-xs font-semibold transition-colors border"
                        style={{
                          borderColor: newsletterSectors.includes(s) ? "var(--color-primary)" : "var(--color-border)",
                          backgroundColor: newsletterSectors.includes(s) ? "var(--color-primary-light)" : "transparent",
                          color: newsletterSectors.includes(s) ? "var(--color-primary)" : "var(--color-muted)",
                        }}
                      >
                        {newsletterSectors.includes(s) && <CheckCircle2 className="w-3 h-3 inline mr-1" />}
                        {s === "telecom" ? "📱 Télécom" : s === "mobile-money" ? "💸 Mobile Money" : s === "banques" ? "🏦 Banques" : "🌐 Internet"}
                      </button>
                    ))}
                  </div>
                </div>
                {/* Consentement */}
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input type="checkbox" checked={regConsent} onChange={(e) => setRegConsent(e.target.checked)}
                    className="mt-0.5 rounded" />
                  <span className="text-xs" style={{ color: "var(--color-muted)" }}>
                    J&apos;accepte les{" "}
                    <Link href="/mentions-legales/" className="underline" style={{ color: "var(--color-primary)" }}>
                      conditions d&apos;utilisation
                    </Link>{" "}
                    et la{" "}
                    <Link href="/confidentialite/" className="underline" style={{ color: "var(--color-primary)" }}>
                      politique de confidentialité
                    </Link>.
                  </span>
                </label>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
                  style={{ backgroundColor: "var(--color-secondary)" }}
                >
                  {loading ? "Création du compte…" : "Créer mon espace gratuit"}
                </button>
              </form>
            )}

            {/* Lien contact */}
            <div className="mt-6 pt-6 border-t text-center" style={{ borderColor: "var(--color-border)" }}>
              <p className="text-xs mb-3" style={{ color: "var(--color-muted)" }}>Besoin d&apos;aide ?</p>
              <a
                href={`https://wa.me/224628935335?text=${encodeURIComponent("Bonjour, j'ai un problème avec mon espace HP Selectra.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold"
                style={{ color: "var(--color-whatsapp)" }}
              >
                <MessageCircle className="w-4 h-4" />
                Contacter le support WhatsApp
                <ChevronRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        <p className="text-center text-white/40 text-xs mt-6">
          © {new Date().getFullYear()} HP Selectra Guinée — Help&apos;me Process
        </p>
      </div>
    </div>
  )
}
