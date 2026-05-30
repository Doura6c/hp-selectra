"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { ArrowLeft, RefreshCw, TrendingUp, Users, MousePointer, Activity } from "lucide-react"

interface TrackStats {
  total: number
  eventCounts: Record<string, number>
  verticalCounts: Record<string, number>
  topSlugs: [string, number][]
  recent: { ts: number; event: string; slug?: string; vertical?: string }[]
}

interface LeadStats {
  byStatus: Record<string, number>
  byChannel: Record<string, number>
  byVertical: Record<string, number>
  total: number
}

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  nouveau:    { label: "Nouveau",     color: "#2E86C1", bg: "#e8f4fd" },
  contacte:   { label: "Contacté",   color: "#E67E22", bg: "#fff3e0" },
  "en-cours": { label: "En cours",   color: "#8B5CF6", bg: "#f3e8ff" },
  converti:   { label: "Converti",   color: "#6B8F3C", bg: "#e8f5e9" },
  perdu:      { label: "Perdu",       color: "#e74c3c", bg: "#fce4e4" },
}

const VERTICAL_LABELS: Record<string, string> = {
  telecom: "📱 Télécom",
  "mobile-money": "💸 Mobile Money",
  banques: "🏦 Banques",
  fai: "🌐 Internet Fixe",
  assurances: "🛡️ Assurances",
}

function StatCard({ icon: Icon, label, value, sub, color }: { icon: React.ElementType; label: string; value: string | number; sub?: string; color: string }) {
  return (
    <div className="p-5 rounded-2xl border" style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}>
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${color}18` }}>
          <Icon className="w-5 h-5" style={{ color }} />
        </div>
      </div>
      <p className="text-2xl font-extrabold" style={{ color }}>{value}</p>
      <p className="text-sm font-semibold mt-0.5" style={{ color: "var(--color-text)" }}>{label}</p>
      {sub && <p className="text-xs mt-0.5" style={{ color: "var(--color-muted)" }}>{sub}</p>}
    </div>
  )
}

export default function AdminKpisPage() {
  const [trackStats, setTrackStats] = useState<TrackStats | null>(null)
  const [leadStats, setLeadStats] = useState<LeadStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date())

  const fetchStats = useCallback(async () => {
    setLoading(true)
    try {
      const [trackRes, leadRes] = await Promise.all([
        fetch("/api/track?secret=hp-admin-2026"),
        fetch("/api/leads"),
      ])
      if (trackRes.ok) {
        const data = await trackRes.json()
        setTrackStats(data)
      }
      if (leadRes.ok) {
        const data = await leadRes.json()
        setLeadStats(data.stats ?? null)
      }
    } catch {
      // silent
    } finally {
      setLoading(false)
      setLastRefresh(new Date())
    }
  }, [])

  useEffect(() => { fetchStats() }, [fetchStats])

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--color-surface)" }}>
      {/* Header */}
      <header className="border-b px-6 py-4 flex items-center justify-between" style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}>
        <div className="flex items-center gap-3">
          <Link href="/admin" className="flex items-center gap-2 text-sm" style={{ color: "var(--color-muted)" }}>
            <ArrowLeft className="w-4 h-4" /> Admin
          </Link>
          <span className="text-sm font-bold" style={{ color: "var(--color-text)" }}>Tableau de bord KPIs</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs" style={{ color: "var(--color-muted)" }}>
            Actualisé à {lastRefresh.toLocaleTimeString("fr-GN", { hour: "2-digit", minute: "2-digit" })}
          </span>
          <button
            onClick={fetchStats}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border"
            style={{ borderColor: "var(--color-border)", color: "var(--color-text)" }}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            Actualiser
          </button>
        </div>
      </header>

      <main className="p-6 max-w-5xl mx-auto">

        {/* KPIs principaux */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <StatCard icon={MousePointer} label="Clics trackés" value={trackStats?.total ?? "—"} sub="Total session" color="var(--color-primary)" />
          <StatCard icon={Users} label="Leads total" value={leadStats?.total ?? "—"} sub="Toutes sources" color="#6B8F3C" />
          <StatCard icon={TrendingUp} label="Leads convertis" value={leadStats?.byStatus?.converti ?? "—"} sub={leadStats ? `${((leadStats.byStatus?.converti ?? 0) / leadStats.total * 100).toFixed(0)}% taux` : ""} color="#E67E22" />
          <StatCard icon={Activity} label="Événements uniques" value={trackStats ? Object.keys(trackStats.eventCounts).length : "—"} sub="Types d'actions" color="#8B5CF6" />
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">

          {/* Leads par statut — funnel */}
          {leadStats && (
            <div className="p-5 rounded-2xl border" style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}>
              <p className="font-bold text-sm mb-4" style={{ color: "var(--color-text)" }}>🏆 Pipeline CRM — Statuts leads</p>
              <div className="space-y-2">
                {Object.entries(STATUS_CONFIG).map(([key, cfg]) => {
                  const count = leadStats.byStatus?.[key] ?? 0
                  const pct = leadStats.total > 0 ? (count / leadStats.total) * 100 : 0
                  return (
                    <div key={key}>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="font-semibold" style={{ color: "var(--color-text)" }}>{cfg.label}</span>
                        <span className="font-bold" style={{ color: cfg.color }}>{count}</span>
                      </div>
                      <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: "var(--color-surface)" }}>
                        <div
                          className="h-full rounded-full transition-all"
                          style={{ width: `${pct}%`, backgroundColor: cfg.color }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
              <Link href="/admin/leads" className="inline-flex items-center gap-1 text-xs font-semibold mt-4" style={{ color: "var(--color-primary)" }}>
                Gérer les leads →
              </Link>
            </div>
          )}

          {/* Leads par canal */}
          {leadStats && (
            <div className="p-5 rounded-2xl border" style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}>
              <p className="font-bold text-sm mb-4" style={{ color: "var(--color-text)" }}>📡 Sources d&apos;acquisition</p>
              <div className="space-y-3">
                {[
                  { key: "whatsapp",   label: "WhatsApp",    color: "#25D366", icon: "💬" },
                  { key: "callback",   label: "Rappel",      color: "#10B981", icon: "📞" },
                  { key: "form",       label: "Formulaire",  color: "var(--color-primary)", icon: "📝" },
                  { key: "newsletter", label: "Newsletter",  color: "#8B5CF6", icon: "📧" },
                ].map(({ key, label, color, icon }) => {
                  const count = leadStats.byChannel?.[key] ?? 0
                  const pct = leadStats.total > 0 ? (count / leadStats.total) * 100 : 0
                  return (
                    <div key={key} className="flex items-center gap-3">
                      <span className="text-base shrink-0">{icon}</span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between text-xs mb-0.5">
                          <span style={{ color: "var(--color-text)" }}>{label}</span>
                          <span className="font-bold" style={{ color }}>{count} ({pct.toFixed(0)}%)</span>
                        </div>
                        <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: "var(--color-surface)" }}>
                          <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: color }} />
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Leads par vertical */}
          {leadStats && (
            <div className="p-5 rounded-2xl border" style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}>
              <p className="font-bold text-sm mb-4" style={{ color: "var(--color-text)" }}>📊 Leads par vertical</p>
              <div className="space-y-2">
                {Object.entries(leadStats.byVertical)
                  .sort((a, b) => b[1] - a[1])
                  .map(([slug, count]) => (
                    <div key={slug} className="flex items-center justify-between text-sm py-1.5 border-b last:border-0" style={{ borderColor: "var(--color-border)" }}>
                      <span style={{ color: "var(--color-text)" }}>{VERTICAL_LABELS[slug] ?? slug}</span>
                      <span className="font-bold px-2 py-0.5 rounded-full text-xs" style={{ backgroundColor: "var(--color-primary-light)", color: "var(--color-primary)" }}>{count}</span>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Top clics trackés */}
          {trackStats && trackStats.topSlugs.length > 0 && (
            <div className="p-5 rounded-2xl border" style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}>
              <p className="font-bold text-sm mb-4" style={{ color: "var(--color-text)" }}>🖱️ Offres les plus cliquées</p>
              <div className="space-y-2">
                {trackStats.topSlugs.slice(0, 8).map(([slug, count]) => (
                  <div key={slug} className="flex items-center justify-between text-sm py-1.5 border-b last:border-0" style={{ borderColor: "var(--color-border)" }}>
                    <span className="truncate font-mono text-xs" style={{ color: "var(--color-text)" }}>{slug}</span>
                    <span className="font-bold text-xs px-2 py-0.5 rounded-full ml-2 shrink-0" style={{ backgroundColor: "var(--color-surface)", color: "var(--color-muted)" }}>{count}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Activité récente */}
        {trackStats && trackStats.recent.length > 0 && (
          <div className="p-5 rounded-2xl border" style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}>
            <p className="font-bold text-sm mb-4" style={{ color: "var(--color-text)" }}>⚡ Activité récente (clics)</p>
            <div className="space-y-1">
              {trackStats.recent.slice(0, 10).map((e, i) => (
                <div key={i} className="flex items-center gap-3 text-xs py-1.5 border-b last:border-0" style={{ borderColor: "var(--color-border)" }}>
                  <span className="font-mono" style={{ color: "var(--color-muted)" }}>
                    {new Date(e.ts).toLocaleTimeString("fr-GN", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
                  </span>
                  <span className="font-semibold px-2 py-0.5 rounded" style={{ backgroundColor: "var(--color-primary-light)", color: "var(--color-primary)" }}>{e.event}</span>
                  {e.slug && <span style={{ color: "var(--color-muted)" }}>{e.slug}</span>}
                  {e.vertical && <span className="ml-auto" style={{ color: "var(--color-muted)" }}>{VERTICAL_LABELS[e.vertical] ?? e.vertical}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {!trackStats && !loading && (
          <div className="text-center py-12" style={{ color: "var(--color-muted)" }}>
            <p className="text-4xl mb-3">📊</p>
            <p className="font-bold">Aucune donnée disponible</p>
            <p className="text-sm mt-1">Les KPIs apparaîtront dès que des utilisateurs interagiront avec le site.</p>
          </div>
        )}
      </main>
    </div>
  )
}
