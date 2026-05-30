"use client"

import React, { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  BookmarkCheck, Bell, Phone, Star, LogOut, User, Settings,
  Trash2, CheckCircle2, Clock, XCircle, MessageCircle, ArrowRight,
  ChevronDown, Smartphone, Wallet, Building2, Wifi, Plus,
} from "lucide-react"

type SavedComparison = {
  id: string; verticalSlug: string; providerSlug: string
  offerSlug?: string; savedAt: string; note?: string
}
type PriceAlert = {
  id: string; verticalSlug: string; providerSlug: string
  threshold?: number; active: boolean; createdAt: string
}
type CallbackEntry = {
  id: string; requestedAt: string; status: "pending" | "done" | "missed"
  topic: string; advisorNote?: string
}
type UserProfile = {
  id: string; prenom: string; nom: string; email: string
  phone?: string; createdAt: string
  savedComparisons: SavedComparison[]
  alerts: PriceAlert[]
  callbackHistory: CallbackEntry[]
  newsletterSectors: string[]
}

const VERTICAL_META: Record<string, { label: string; icon: React.FC<{ className?: string; style?: React.CSSProperties }>; color: string; bg: string }> = {
  telecom: { label: "Télécom", icon: Smartphone, color: "#1d3461", bg: "#e8edf5" },
  "mobile-money": { label: "Mobile Money", icon: Wallet, color: "#6b8f3c", bg: "#eef4e6" },
  banques: { label: "Banques", icon: Building2, color: "#b45309", bg: "#fef3c7" },
  fai: { label: "Internet Fixe", icon: Wifi, color: "#7c3aed", bg: "#f3f0ff" },
}

const STATUS_META = {
  pending: { label: "En attente", color: "#f0a500", bg: "#fef3c7", icon: Clock },
  done: { label: "Traité", color: "#6b8f3c", bg: "#eef4e6", icon: CheckCircle2 },
  missed: { label: "Manqué", color: "#dc2626", bg: "#fde8e8", icon: XCircle },
}

const TABS = [
  { id: "comparaisons", label: "Mes comparaisons", icon: BookmarkCheck },
  { id: "alertes", label: "Alertes prix", icon: Bell },
  { id: "rappels", label: "Mes rappels", icon: Phone },
  { id: "profil", label: "Mon profil", icon: User },
]

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("comparaisons")
  const [loggingOut, setLoggingOut] = useState(false)

  const loadUser = useCallback(async () => {
    try {
      const res = await fetch("/api/auth")
      if (!res.ok) { router.push("/mon-espace"); return }
      const data = await res.json()
      if (!data.authenticated) { router.push("/mon-espace"); return }
      setUser(data.user)
    } catch {
      router.push("/mon-espace")
    } finally {
      setLoading(false)
    }
  }, [router])

  useEffect(() => { loadUser() }, [loadUser])

  async function handleLogout() {
    setLoggingOut(true)
    await fetch("/api/auth", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "logout" }) })
    router.push("/mon-espace")
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "var(--color-surface)" }}>
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-4 border-t-transparent animate-spin mx-auto mb-4" style={{ borderColor: "var(--color-primary)", borderTopColor: "transparent" }} />
          <p style={{ color: "var(--color-muted)" }}>Chargement…</p>
        </div>
      </div>
    )
  }

  if (!user) return null

  const initials = `${user.prenom[0]}${user.nom[0]}`.toUpperCase()
  const memberSince = new Date(user.createdAt).toLocaleDateString("fr-FR", { month: "long", year: "numeric" })

  return (
    <div style={{ backgroundColor: "var(--color-surface)", minHeight: "100vh" }}>

      {/* ── Top bar ── */}
      <div style={{ backgroundColor: "var(--color-primary)", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-extrabold text-white"
              style={{ backgroundColor: "var(--color-secondary)" }}
            >
              {initials}
            </div>
            <div>
              <p className="text-sm font-bold text-white">{user.prenom} {user.nom}</p>
              <p className="text-xs text-white/50">Membre depuis {memberSince}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-white/70 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-50"
          >
            <LogOut className="w-3.5 h-3.5" />
            {loggingOut ? "Déconnexion…" : "Déconnexion"}
          </button>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid lg:grid-cols-[260px_1fr] gap-8">

          {/* ── Sidebar ── */}
          <aside>
            {/* Stats */}
            <div className="rounded-2xl p-5 mb-4 border" style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}>
              <p className="text-xs font-bold uppercase tracking-wide mb-4" style={{ color: "var(--color-muted)" }}>Vue d&apos;ensemble</p>
              <div className="space-y-3">
                {[
                  { label: "Comparaisons sauvegardées", value: user.savedComparisons.length, icon: BookmarkCheck, color: "var(--color-primary)" },
                  { label: "Alertes actives", value: user.alerts.filter((a) => a.active).length, icon: Bell, color: "var(--color-warning)" },
                  { label: "Rappels demandés", value: user.callbackHistory.length, icon: Phone, color: "var(--color-secondary)" },
                ].map((s) => (
                  <div key={s.label} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${s.color}15` }}>
                      <s.icon className="w-4 h-4" style={{ color: s.color }} />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs" style={{ color: "var(--color-muted)" }}>{s.label}</p>
                    </div>
                    <span className="text-sm font-extrabold" style={{ color: "var(--color-text)" }}>{s.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Nav */}
            <nav className="rounded-2xl overflow-hidden border" style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}>
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="w-full flex items-center gap-3 px-4 py-3.5 text-sm font-medium transition-colors text-left border-b last:border-b-0"
                  style={{
                    borderColor: "var(--color-border)",
                    backgroundColor: activeTab === tab.id ? "var(--color-primary-light)" : "transparent",
                    color: activeTab === tab.id ? "var(--color-primary)" : "var(--color-text)",
                    fontWeight: activeTab === tab.id ? 700 : 500,
                  }}
                >
                  <tab.icon className="w-4 h-4 shrink-0" />
                  {tab.label}
                  {activeTab === tab.id && <ChevronDown className="w-3.5 h-3.5 ml-auto rotate-[-90deg]" />}
                </button>
              ))}
            </nav>

            {/* CTA rappel */}
            <div
              className="rounded-2xl p-5 mt-4"
              style={{ background: "linear-gradient(135deg, var(--color-secondary) 0%, var(--color-secondary-dark) 100%)" }}
            >
              <p className="text-sm font-bold text-white mb-1">Besoin d&apos;un conseil ?</p>
              <p className="text-xs text-white/70 mb-3">Un expert vous rappelle gratuitement en 24 h.</p>
              <Link
                href="/contact/"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-bold text-white bg-white/20 hover:bg-white/30 transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                Demander un rappel
              </Link>
            </div>
          </aside>

          {/* ── Contenu principal ── */}
          <main>

            {/* ── COMPARAISONS ── */}
            {activeTab === "comparaisons" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-extrabold" style={{ color: "var(--color-text)" }}>
                    Mes comparaisons sauvegardées
                  </h2>
                  <Link href="/" className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg transition-colors hover:opacity-80"
                    style={{ backgroundColor: "var(--color-primary-light)", color: "var(--color-primary)" }}>
                    <Plus className="w-3.5 h-3.5" />
                    Nouvelle comparaison
                  </Link>
                </div>

                {user.savedComparisons.length === 0 ? (
                  <EmptyState icon={BookmarkCheck} text="Aucune comparaison sauvegardée pour l'instant." cta="Comparer maintenant" href="/" />
                ) : (
                  <div className="space-y-3">
                    {user.savedComparisons.map((sc) => {
                      const vm = VERTICAL_META[sc.verticalSlug]
                      return (
                        <div key={sc.id} className="rounded-2xl p-4 border flex items-center gap-4"
                          style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}>
                          {vm && (
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: vm.bg }}>
                              <vm.icon className="w-5 h-5" style={{ color: vm.color }} />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: vm?.bg, color: vm?.color }}>
                                {vm?.label ?? sc.verticalSlug}
                              </span>
                              <span className="text-xs font-semibold capitalize" style={{ color: "var(--color-text)" }}>
                                {sc.providerSlug.replace(/-/g, " ")}
                              </span>
                            </div>
                            {sc.note && <p className="text-xs truncate" style={{ color: "var(--color-muted)" }}>{sc.note}</p>}
                            <p className="text-[11px] mt-1" style={{ color: "var(--color-muted)" }}>
                              Sauvegardé le {new Date(sc.savedAt).toLocaleDateString("fr-FR")}
                            </p>
                          </div>
                          <Link
                            href={`/${sc.verticalSlug}/fournisseurs/${sc.providerSlug}/`}
                            className="shrink-0 flex items-center gap-1 text-xs font-semibold px-3 py-2 rounded-lg transition-opacity hover:opacity-80"
                            style={{ backgroundColor: "var(--color-primary-light)", color: "var(--color-primary)" }}
                          >
                            Voir <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )}

            {/* ── ALERTES ── */}
            {activeTab === "alertes" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-extrabold" style={{ color: "var(--color-text)" }}>
                    Mes alertes prix
                  </h2>
                  <span className="text-xs px-3 py-1 rounded-full font-semibold" style={{ backgroundColor: "var(--color-primary-light)", color: "var(--color-primary)" }}>
                    {user.alerts.filter((a) => a.active).length} actives
                  </span>
                </div>

                {user.alerts.length === 0 ? (
                  <EmptyState icon={Bell} text="Aucune alerte configurée." cta="Explorer les offres" href="/" />
                ) : (
                  <div className="space-y-3">
                    {user.alerts.map((alert) => {
                      const vm = VERTICAL_META[alert.verticalSlug]
                      return (
                        <div key={alert.id} className="rounded-2xl p-4 border flex items-center gap-4"
                          style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}>
                          {vm && (
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: vm.bg }}>
                              <vm.icon className="w-5 h-5" style={{ color: vm.color }} />
                            </div>
                          )}
                          <div className="flex-1">
                            <p className="text-sm font-semibold capitalize" style={{ color: "var(--color-text)" }}>
                              {alert.providerSlug.replace(/-/g, " ")}
                              <span className="ml-2 text-xs font-normal" style={{ color: "var(--color-muted)" }}>— {vm?.label}</span>
                            </p>
                            <p className="text-xs mt-0.5" style={{ color: "var(--color-muted)" }}>
                              Créée le {new Date(alert.createdAt).toLocaleDateString("fr-FR")}
                            </p>
                          </div>
                          <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold`}
                            style={{ backgroundColor: alert.active ? "#eef4e6" : "#f3f4f6", color: alert.active ? "#6b8f3c" : "#6b7280" }}>
                            {alert.active ? <Bell className="w-3 h-3" /> : <Bell className="w-3 h-3 opacity-40" />}
                            {alert.active ? "Active" : "Inactive"}
                          </div>
                          <button className="text-gray-300 hover:text-red-400 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      )
                    })}
                  </div>
                )}

                <div className="mt-6 p-4 rounded-2xl border-2 border-dashed" style={{ borderColor: "var(--color-border)" }}>
                  <p className="text-sm text-center" style={{ color: "var(--color-muted)" }}>
                    💡 Pour configurer de nouvelles alertes, rendez-vous sur la fiche d&apos;un opérateur et cliquez sur &ldquo;Activer l&apos;alerte&rdquo;.
                  </p>
                </div>
              </div>
            )}

            {/* ── RAPPELS ── */}
            {activeTab === "rappels" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-extrabold" style={{ color: "var(--color-text)" }}>
                    Historique de mes rappels
                  </h2>
                  <Link href="/contact/" className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg transition-colors hover:opacity-80"
                    style={{ backgroundColor: "var(--color-secondary-light)", color: "var(--color-secondary)" }}>
                    <Plus className="w-3.5 h-3.5" />
                    Nouveau rappel
                  </Link>
                </div>

                {user.callbackHistory.length === 0 ? (
                  <EmptyState icon={Phone} text="Aucun rappel demandé pour l'instant." cta="Demander un rappel" href="/contact/" />
                ) : (
                  <div className="space-y-4">
                    {user.callbackHistory.map((cb) => {
                      const sm = STATUS_META[cb.status]
                      return (
                        <div key={cb.id} className="rounded-2xl p-5 border" style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}>
                          <div className="flex items-start justify-between gap-3 mb-3">
                            <div>
                              <p className="font-semibold text-sm" style={{ color: "var(--color-text)" }}>{cb.topic}</p>
                              <p className="text-xs mt-0.5" style={{ color: "var(--color-muted)" }}>
                                Demandé le {new Date(cb.requestedAt).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
                              </p>
                            </div>
                            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold shrink-0"
                              style={{ backgroundColor: sm.bg, color: sm.color }}>
                              <sm.icon className="w-3 h-3" />
                              {sm.label}
                            </span>
                          </div>
                          {cb.advisorNote && (
                            <div className="rounded-xl p-3 text-xs" style={{ backgroundColor: "var(--color-surface)", color: "var(--color-muted)" }}>
                              <p className="font-semibold mb-1" style={{ color: "var(--color-text)" }}>Note du conseiller :</p>
                              {cb.advisorNote}
                            </div>
                          )}
                          {cb.status === "pending" && (
                            <a
                              href={`https://wa.me/224628935335?text=${encodeURIComponent(`Bonjour, je voulais des nouvelles de ma demande de rappel concernant : ${cb.topic}`)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-3 flex items-center gap-1.5 text-xs font-semibold"
                              style={{ color: "var(--color-whatsapp)" }}
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                              Relancer sur WhatsApp
                            </a>
                          )}
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )}

            {/* ── PROFIL ── */}
            {activeTab === "profil" && (
              <div>
                <h2 className="text-xl font-extrabold mb-6" style={{ color: "var(--color-text)" }}>Mon profil</h2>

                <div className="rounded-2xl border overflow-hidden" style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}>
                  {/* Avatar */}
                  <div className="px-6 py-8 flex items-center gap-5" style={{ background: "linear-gradient(135deg, var(--color-primary-light) 0%, var(--color-secondary-light) 100%)" }}>
                    <div className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-extrabold text-white shadow-lg"
                      style={{ backgroundColor: "var(--color-primary)" }}>
                      {initials}
                    </div>
                    <div>
                      <p className="font-extrabold text-lg" style={{ color: "var(--color-text)" }}>{user.prenom} {user.nom}</p>
                      <p className="text-sm" style={{ color: "var(--color-muted)" }}>{user.email}</p>
                      {user.phone && <p className="text-sm" style={{ color: "var(--color-muted)" }}>{user.phone}</p>}
                    </div>
                  </div>

                  {/* Détails */}
                  <div className="p-6 space-y-4">
                    {[
                      { label: "Prénom", value: user.prenom },
                      { label: "Nom", value: user.nom },
                      { label: "Email", value: user.email },
                      { label: "Téléphone", value: user.phone ?? "Non renseigné" },
                      { label: "Membre depuis", value: memberSince },
                    ].map((row) => (
                      <div key={row.label} className="flex items-center justify-between py-3 border-b last:border-b-0" style={{ borderColor: "var(--color-border)" }}>
                        <span className="text-sm font-semibold" style={{ color: "var(--color-muted)" }}>{row.label}</span>
                        <span className="text-sm font-bold" style={{ color: "var(--color-text)" }}>{row.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Newsletters */}
                  <div className="px-6 pb-6">
                    <p className="text-xs font-bold uppercase tracking-wide mb-3" style={{ color: "var(--color-muted)" }}>
                      Secteurs suivis
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {user.newsletterSectors.length === 0 ? (
                        <p className="text-xs" style={{ color: "var(--color-muted)" }}>Aucun secteur suivi.</p>
                      ) : (
                        user.newsletterSectors.map((s) => {
                          const vm = VERTICAL_META[s]
                          return (
                            <span key={s} className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
                              style={{ backgroundColor: vm?.bg ?? "#f3f4f6", color: vm?.color ?? "#6b7280" }}>
                              {vm && <vm.icon className="w-3 h-3" />}
                              {vm?.label ?? s}
                            </span>
                          )
                        })
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="px-6 pb-6 flex flex-wrap gap-3">
                    <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
                      style={{ backgroundColor: "var(--color-primary)" }}>
                      <Settings className="w-4 h-4" />
                      Modifier le profil
                    </button>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border transition-colors hover:bg-red-50"
                      style={{ borderColor: "var(--color-danger)", color: "var(--color-danger)" }}
                    >
                      <LogOut className="w-4 h-4" />
                      Se déconnecter
                    </button>
                  </div>
                </div>

                {/* Score HP */}
                <div className="mt-6 rounded-2xl p-5 border" style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}>
                  <p className="text-sm font-bold mb-1" style={{ color: "var(--color-text)" }}>
                    🌟 Votre score d&apos;activité
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="flex gap-0.5">
                      {[1,2,3,4,5].map((i) => (
                        <Star key={i} className={`w-5 h-5 ${i <= Math.min(5, Math.floor(user.savedComparisons.length / 1) + 1) ? "fill-current" : ""}`}
                          style={{ color: i <= Math.min(5, user.savedComparisons.length + 1) ? "var(--color-accent)" : "#E5E7EB" }} />
                      ))}
                    </div>
                    <span className="text-xs" style={{ color: "var(--color-muted)" }}>
                      Basé sur vos comparaisons et rappels
                    </span>
                  </div>
                </div>
              </div>
            )}

          </main>
        </div>
      </div>
    </div>
  )
}

function EmptyState({
  icon: Icon, text, cta, href
}: { icon: React.FC<{ className?: string; style?: React.CSSProperties }>; text: string; cta: string; href: string }) {
  return (
    <div className="rounded-2xl p-12 text-center border-2 border-dashed" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-card)" }}>
      <Icon className="w-10 h-10 mx-auto mb-4 opacity-30" style={{ color: "var(--color-muted)" }} />
      <p className="text-sm mb-4" style={{ color: "var(--color-muted)" }}>{text}</p>
      <Link href={href} className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-90"
        style={{ backgroundColor: "var(--color-primary)" }}>
        {cta} <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  )
}
