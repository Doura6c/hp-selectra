"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { ArrowLeft, Mail, Phone, MessageSquare, RefreshCw, Download, Search, Filter } from "lucide-react"
import type { Lead, LeadChannel } from "@/lib/leads-store"

const CHANNEL_LABELS: Record<LeadChannel, string> = {
  callback: "Rappel",
  whatsapp: "WhatsApp",
  form: "Formulaire",
  newsletter: "Newsletter",
}

const CHANNEL_COLORS: Record<LeadChannel, string> = {
  callback: "#10B981",
  whatsapp: "#25D366",
  form: "var(--color-primary)",
  newsletter: "#8B5CF6",
}

const VERTICAL_LABELS: Record<string, string> = {
  telecom: "📱 Télécom",
  "mobile-money": "💸 Mobile Money",
  banques: "🏦 Banques",
  fai: "🌐 Internet Fixe",
  assurances: "🛡️ Assurances",
}

function formatDate(iso: string) {
  const d = new Date(iso)
  const now = new Date()
  const diff = now.getTime() - d.getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `il y a ${mins} min`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `il y a ${hours}h`
  return d.toLocaleDateString("fr-GN", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })
}

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState("")
  const [channelFilter, setChannelFilter] = useState<LeadChannel | "all">("all")
  const [verticalFilter, setVerticalFilter] = useState<string>("all")
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null)

  const loadLeads = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/leads")
      if (!res.ok) {
        setError("Accès non autorisé — veuillez vous reconnecter.")
        return
      }
      const data = await res.json()
      setLeads(data.leads ?? [])
      setLastRefresh(new Date())
    } catch {
      setError("Impossible de charger les leads.")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { loadLeads() }, [loadLeads])

  const filtered = leads.filter((l) => {
    const matchSearch = !search || [l.name, l.phone, l.email, l.message]
      .some((v) => v?.toLowerCase().includes(search.toLowerCase()))
    const matchChannel = channelFilter === "all" || l.channel === channelFilter
    const matchVertical = verticalFilter === "all" || l.verticalSlug === verticalFilter
    return matchSearch && matchChannel && matchVertical
  })

  const realLeads = leads.filter((l) => !l.id.startsWith("demo-"))
  const demoLeads = leads.filter((l) => l.id.startsWith("demo-"))

  function exportCsv() {
    const rows = [
      ["ID", "Canal", "Nom", "Téléphone", "Email", "Message", "Verticale", "Date"],
      ...filtered.map((l) => [
        l.id, l.channel, l.name ?? "", l.phone ?? "", l.email ?? "",
        (l.message ?? "").replace(/,/g, " "), l.verticalSlug ?? "", l.createdAt,
      ]),
    ]
    const csv = rows.map((r) => r.map((v) => `"${v}"`).join(",")).join("\n")
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `hp-leads-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--color-surface)" }}>
      {/* Header */}
      <header className="border-b px-6 py-4 flex items-center gap-4" style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}>
        <Link href="/admin" className="flex items-center gap-2 text-sm" style={{ color: "var(--color-muted)" }}>
          <ArrowLeft className="w-4 h-4" /> Admin
        </Link>
        <span style={{ color: "var(--color-border)" }}>/</span>
        <span className="font-semibold text-sm" style={{ color: "var(--color-text)" }}>Leads & Contacts</span>
      </header>

      <main className="p-6 max-w-6xl mx-auto">
        {/* Titre + actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="font-bold text-xl" style={{ color: "var(--color-text)" }}>Leads & Contacts</h1>
            {lastRefresh && (
              <p className="text-xs mt-1" style={{ color: "var(--color-muted)" }}>
                Actualisé à {lastRefresh.toLocaleTimeString("fr-GN")}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={exportCsv}
              disabled={filtered.length === 0}
              className="flex items-center gap-1.5 text-xs px-3 py-2 rounded-lg border transition-opacity hover:opacity-80 disabled:opacity-40"
              style={{ borderColor: "var(--color-border)", color: "var(--color-text)" }}
            >
              <Download className="w-3.5 h-3.5" /> CSV
            </button>
            <button
              onClick={loadLeads}
              disabled={loading}
              className="flex items-center gap-1.5 text-xs px-3 py-2 rounded-lg text-white transition-opacity hover:opacity-90 disabled:opacity-60"
              style={{ backgroundColor: "var(--color-primary)" }}
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} /> Actualiser
            </button>
          </div>
        </div>

        {/* Stats rapides */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {(["all", "callback", "whatsapp", "form"] as const).map((ch) => {
            const count = ch === "all" ? leads.length : leads.filter((l) => l.channel === ch).length
            const label = ch === "all" ? "Total" : CHANNEL_LABELS[ch]
            const color = ch === "all" ? "var(--color-primary)" : CHANNEL_COLORS[ch]
            return (
              <button
                key={ch}
                onClick={() => setChannelFilter(ch)}
                className="p-4 rounded-xl border text-left transition-shadow hover:shadow-sm"
                style={{
                  backgroundColor: channelFilter === ch ? `${color}10` : "var(--color-card)",
                  borderColor: channelFilter === ch ? color : "var(--color-border)",
                }}
              >
                <p className="text-2xl font-bold" style={{ color }}>{count}</p>
                <p className="text-xs mt-1" style={{ color: "var(--color-muted)" }}>{label}</p>
              </button>
            )
          })}
        </div>

        {/* Bandeau DB */}
        {realLeads.length === 0 && demoLeads.length > 0 && (
          <div className="flex items-start gap-3 p-4 rounded-xl border mb-6 text-sm"
            style={{ backgroundColor: "#EFF6FF", borderColor: "#BFDBFE" }}>
            <span className="text-lg shrink-0">💡</span>
            <div>
              <p className="font-semibold" style={{ color: "#1E40AF" }}>Mode démo — données d'exemple affichées</p>
              <p className="text-xs mt-1" style={{ color: "#3B82F6" }}>
                Aucun vrai lead reçu en cette session. Les vrais leads apparaîtront ici en temps réel.
                Pour la persistance entre redémarrages, configurez{" "}
                <code className="font-mono bg-blue-100 px-1 rounded">DATABASE_URL</code> et activez Prisma.
              </p>
            </div>
          </div>
        )}

        {/* Filtres */}
        <div className="flex flex-wrap gap-3 mb-4">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--color-muted)" }} />
            <input
              type="search"
              placeholder="Nom, téléphone, email, message…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border text-sm outline-none"
              style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-card)" }}
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 shrink-0" style={{ color: "var(--color-muted)" }} />
            <select
              value={verticalFilter}
              onChange={(e) => setVerticalFilter(e.target.value)}
              className="px-3 py-2.5 rounded-xl border text-sm outline-none"
              style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-card)", color: "var(--color-text)" }}
            >
              <option value="all">Toutes verticales</option>
              {Object.entries(VERTICAL_LABELS).map(([k, v]) => (
                <option key={k} value={k}>{v}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Table */}
        {error ? (
          <div className="text-center py-16" style={{ color: "var(--color-muted)" }}>
            <p className="text-4xl mb-3">🔒</p>
            <p className="font-semibold" style={{ color: "var(--color-text)" }}>{error}</p>
            <Link href="/admin/login" className="text-sm mt-2 block" style={{ color: "var(--color-primary)" }}>
              Se reconnecter
            </Link>
          </div>
        ) : loading ? (
          <div className="text-center py-16" style={{ color: "var(--color-muted)" }}>
            <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-3" />
            <p>Chargement des leads…</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 rounded-2xl border" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-card)" }}>
            <p className="text-4xl mb-3">📬</p>
            <p className="font-semibold" style={{ color: "var(--color-text)" }}>Aucun lead trouvé</p>
            <p className="text-sm mt-1" style={{ color: "var(--color-muted)" }}>Modifiez vos filtres ou attendez les premières demandes</p>
          </div>
        ) : (
          <div className="rounded-xl border overflow-hidden" style={{ borderColor: "var(--color-border)" }}>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ backgroundColor: "var(--color-surface)" }}>
                  <th className="text-left px-4 py-3 text-xs font-semibold" style={{ color: "var(--color-muted)" }}>CANAL</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold" style={{ color: "var(--color-muted)" }}>CONTACT</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold hidden sm:table-cell" style={{ color: "var(--color-muted)" }}>MESSAGE</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold hidden md:table-cell" style={{ color: "var(--color-muted)" }}>VERTICALE</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold" style={{ color: "var(--color-muted)" }}>DATE</th>
                  <th className="px-4 py-3 text-xs font-semibold text-right" style={{ color: "var(--color-muted)" }}>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((lead, i) => {
                  const isDemo = lead.id.startsWith("demo-")
                  const color = CHANNEL_COLORS[lead.channel]
                  return (
                    <tr
                      key={lead.id}
                      style={{
                        backgroundColor: i % 2 === 0 ? "var(--color-card)" : "var(--color-surface)",
                        borderTop: "1px solid var(--color-border)",
                        opacity: isDemo ? 0.75 : 1,
                      }}
                    >
                      {/* Canal */}
                      <td className="px-4 py-3">
                        <span
                          className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full"
                          style={{ backgroundColor: `${color}18`, color }}
                        >
                          {CHANNEL_LABELS[lead.channel]}
                        </span>
                      </td>

                      {/* Contact */}
                      <td className="px-4 py-3">
                        {lead.name && (
                          <p className="font-medium text-sm" style={{ color: "var(--color-text)" }}>{lead.name}</p>
                        )}
                        {lead.phone && (
                          <a
                            href={`tel:${lead.phone}`}
                            className="flex items-center gap-1 text-xs mt-0.5 hover:underline"
                            style={{ color: "var(--color-primary)" }}
                          >
                            <Phone className="w-3 h-3" /> {lead.phone}
                          </a>
                        )}
                        {lead.email && (
                          <a
                            href={`mailto:${lead.email}`}
                            className="flex items-center gap-1 text-xs mt-0.5 hover:underline"
                            style={{ color: "var(--color-muted)" }}
                          >
                            <Mail className="w-3 h-3" /> {lead.email}
                          </a>
                        )}
                        {!lead.name && !lead.phone && !lead.email && (
                          <span className="text-xs" style={{ color: "var(--color-muted)" }}>Anonyme</span>
                        )}
                      </td>

                      {/* Message */}
                      <td className="px-4 py-3 hidden sm:table-cell max-w-[260px]">
                        {lead.message ? (
                          <p className="text-xs line-clamp-2" style={{ color: "var(--color-muted)" }}>
                            {lead.message}
                          </p>
                        ) : (
                          <span className="text-xs" style={{ color: "var(--color-border)" }}>—</span>
                        )}
                      </td>

                      {/* Verticale */}
                      <td className="px-4 py-3 hidden md:table-cell">
                        {lead.verticalSlug ? (
                          <span className="text-xs" style={{ color: "var(--color-text)" }}>
                            {VERTICAL_LABELS[lead.verticalSlug] ?? lead.verticalSlug}
                          </span>
                        ) : (
                          <span className="text-xs" style={{ color: "var(--color-border)" }}>—</span>
                        )}
                      </td>

                      {/* Date */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="text-xs" style={{ color: "var(--color-muted)" }}>
                          {formatDate(lead.createdAt)}
                        </span>
                        {isDemo && (
                          <span className="ml-1 text-[10px] px-1 py-0.5 rounded" style={{ backgroundColor: "var(--color-surface)", color: "var(--color-border)" }}>
                            démo
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3 text-right">
                        {lead.channel === "callback" && lead.phone && (
                          <a
                            href={`tel:${lead.phone}`}
                            className="inline-flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg text-white"
                            style={{ backgroundColor: CHANNEL_COLORS.callback }}
                          >
                            <Phone className="w-3 h-3" /> Rappeler
                          </a>
                        )}
                        {lead.channel === "whatsapp" && lead.phone && (
                          <a
                            href={`https://wa.me/${lead.phone.replace(/\D/g, "")}?text=${encodeURIComponent("Bonjour, je vous contacte depuis HP Selectra suite à votre demande.")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg text-white"
                            style={{ backgroundColor: CHANNEL_COLORS.whatsapp }}
                          >
                            <MessageSquare className="w-3 h-3" /> WA
                          </a>
                        )}
                        {lead.channel === "form" && lead.email && (
                          <a
                            href={`mailto:${lead.email}?subject=${encodeURIComponent("Votre demande HP Selectra")}`}
                            className="inline-flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg text-white"
                            style={{ backgroundColor: "var(--color-primary)" }}
                          >
                            <Mail className="w-3 h-3" /> Email
                          </a>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}

        <p className="text-xs mt-4 text-center" style={{ color: "var(--color-muted)" }}>
          {filtered.length} lead{filtered.length > 1 ? "s" : ""} affiché{filtered.length > 1 ? "s" : ""}
          {realLeads.length > 0 ? ` · ${realLeads.length} réel${realLeads.length > 1 ? "s" : ""}` : " · mode démo"}
          {" · Persistance DB : configurer DATABASE_URL"}
        </p>
      </main>
    </div>
  )
}
