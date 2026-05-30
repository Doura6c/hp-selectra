"use client"

import { useState } from "react"
import Link from "next/link"
import { PROVIDERS, OFFERS, VERTICALS } from "@/lib/data/seed-data"
import HPScoreBadge from "@/components/ui/HPScoreBadge"
import { ArrowLeft, Search, CheckCircle2, Globe, ExternalLink, ChevronDown, ChevronUp } from "lucide-react"

const VERTICAL_LABELS: Record<string, string> = {
  telecom: "📱 Télécom",
  "mobile-money": "💸 Mobile Money",
  banques: "🏦 Banques",
  fai: "🌐 Internet Fixe",
  assurances: "🛡️ Assurances",
}

type SortKey = "name" | "hpScore" | "offers" | "vertical"

export default function AdminFournisseursPage() {
  const [search, setSearch] = useState("")
  const [verticalFilter, setVerticalFilter] = useState<string>("all")
  const [verifiedFilter, setVerifiedFilter] = useState<"all" | "verified" | "unverified">("all")
  const [sortKey, setSortKey] = useState<SortKey>("vertical")
  const [sortAsc, setSortAsc] = useState(true)
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null)

  const enriched = PROVIDERS.map((p) => ({
    ...p,
    offerCount: OFFERS.filter((o) => o.providerSlug === p.slug).length,
    verticalLabel: VERTICAL_LABELS[p.verticalSlug] ?? p.verticalSlug,
  }))

  const filtered = enriched
    .filter((p) => {
      const q = search.toLowerCase()
      const matchSearch = !search || p.name.toLowerCase().includes(q) || p.slug.includes(q)
      const matchVertical = verticalFilter === "all" || p.verticalSlug === verticalFilter
      const matchVerified = verifiedFilter === "all"
        || (verifiedFilter === "verified" && p.verified)
        || (verifiedFilter === "unverified" && !p.verified)
      return matchSearch && matchVertical && matchVerified
    })
    .sort((a, b) => {
      let cmp = 0
      if (sortKey === "name") cmp = a.name.localeCompare(b.name)
      else if (sortKey === "hpScore") cmp = a.hpScore.localeCompare(b.hpScore)
      else if (sortKey === "offers") cmp = a.offerCount - b.offerCount
      else if (sortKey === "vertical") cmp = a.verticalSlug.localeCompare(b.verticalSlug) || a.name.localeCompare(b.name)
      return sortAsc ? cmp : -cmp
    })

  function toggleSort(key: SortKey) {
    if (sortKey === key) setSortAsc((a) => !a)
    else { setSortKey(key); setSortAsc(true) }
  }

  const SortIcon = ({ k }: { k: SortKey }) => {
    if (sortKey !== k) return null
    return sortAsc ? <ChevronUp className="w-3 h-3 inline ml-1" /> : <ChevronDown className="w-3 h-3 inline ml-1" />
  }

  const verifiedCount = PROVIDERS.filter((p) => p.verified).length

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--color-surface)" }}>
      {/* Header */}
      <header className="border-b px-6 py-4 flex items-center gap-4" style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}>
        <Link href="/admin" className="flex items-center gap-2 text-sm" style={{ color: "var(--color-muted)" }}>
          <ArrowLeft className="w-4 h-4" /> Admin
        </Link>
        <span style={{ color: "var(--color-border)" }}>/</span>
        <span className="font-semibold text-sm" style={{ color: "var(--color-text)" }}>Fournisseurs</span>
      </header>

      <main className="p-6 max-w-6xl mx-auto">
        {/* Titre + stats */}
        <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
          <div>
            <h1 className="font-bold text-xl" style={{ color: "var(--color-text)" }}>Fournisseurs</h1>
            <p className="text-sm mt-1" style={{ color: "var(--color-muted)" }}>
              {PROVIDERS.length} opérateurs · {verifiedCount} vérifiés · {VERTICALS.filter((v) => v.isLive).length} verticales actives
            </p>
          </div>
          <div className="flex gap-3">
            {VERTICALS.filter((v) => v.isLive).map((v) => {
              const count = PROVIDERS.filter((p) => p.verticalSlug === v.slug).length
              return (
                <button
                  key={v.slug}
                  onClick={() => setVerticalFilter(verticalFilter === v.slug ? "all" : v.slug)}
                  className="text-xs px-3 py-1.5 rounded-full border font-medium transition-colors"
                  style={{
                    borderColor: verticalFilter === v.slug ? v.color : "var(--color-border)",
                    backgroundColor: verticalFilter === v.slug ? `${v.color}15` : "var(--color-card)",
                    color: verticalFilter === v.slug ? v.color : "var(--color-muted)",
                  }}
                >
                  {VERTICAL_LABELS[v.slug] ?? v.slug} ({count})
                </button>
              )
            })}
          </div>
        </div>

        {/* Filtres */}
        <div className="flex flex-wrap gap-3 mb-4">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--color-muted)" }} />
            <input
              type="search"
              placeholder="Rechercher un fournisseur…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border text-sm outline-none"
              style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-card)" }}
            />
          </div>
          <select
            value={verifiedFilter}
            onChange={(e) => setVerifiedFilter(e.target.value as typeof verifiedFilter)}
            className="px-3 py-2.5 rounded-xl border text-sm outline-none"
            style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-card)", color: "var(--color-text)" }}
          >
            <option value="all">Tous statuts</option>
            <option value="verified">✅ Vérifiés</option>
            <option value="unverified">⏳ Non vérifiés</option>
          </select>
        </div>

        {/* Table */}
        <div className="rounded-xl border overflow-hidden" style={{ borderColor: "var(--color-border)" }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ backgroundColor: "var(--color-surface)" }}>
                <th
                  className="text-left px-4 py-3 text-xs font-semibold cursor-pointer hover:opacity-80"
                  style={{ color: "var(--color-muted)" }}
                  onClick={() => toggleSort("name")}
                >
                  FOURNISSEUR <SortIcon k="name" />
                </th>
                <th
                  className="text-left px-4 py-3 text-xs font-semibold cursor-pointer hover:opacity-80 hidden sm:table-cell"
                  style={{ color: "var(--color-muted)" }}
                  onClick={() => toggleSort("vertical")}
                >
                  VERTICALE <SortIcon k="vertical" />
                </th>
                <th
                  className="text-left px-4 py-3 text-xs font-semibold cursor-pointer hover:opacity-80"
                  style={{ color: "var(--color-muted)" }}
                  onClick={() => toggleSort("hpScore")}
                >
                  HP SCORE <SortIcon k="hpScore" />
                </th>
                <th
                  className="text-left px-4 py-3 text-xs font-semibold cursor-pointer hover:opacity-80 hidden md:table-cell"
                  style={{ color: "var(--color-muted)" }}
                  onClick={() => toggleSort("offers")}
                >
                  OFFRES <SortIcon k="offers" />
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold hidden lg:table-cell" style={{ color: "var(--color-muted)" }}>
                  STATUT
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold" style={{ color: "var(--color-muted)" }}>
                  ACTIONS
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p, i) => {
                const isExpanded = expandedSlug === p.slug
                const offers = OFFERS.filter((o) => o.providerSlug === p.slug)
                return (
                  <>
                    <tr
                      key={p.slug}
                      style={{
                        backgroundColor: i % 2 === 0 ? "var(--color-card)" : "var(--color-surface)",
                        borderTop: "1px solid var(--color-border)",
                      }}
                    >
                      {/* Fournisseur */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold text-white shrink-0"
                            style={{ backgroundColor: p.brandColor ?? "var(--color-primary)" }}
                          >
                            {p.name.slice(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-semibold text-sm" style={{ color: "var(--color-text)" }}>{p.name}</p>
                            <p className="text-xs font-mono" style={{ color: "var(--color-muted)" }}>{p.slug}</p>
                          </div>
                        </div>
                      </td>

                      {/* Verticale */}
                      <td className="px-4 py-3 hidden sm:table-cell">
                        <span className="text-xs" style={{ color: "var(--color-text)" }}>
                          {p.verticalLabel}
                        </span>
                      </td>

                      {/* HP Score */}
                      <td className="px-4 py-3">
                        <HPScoreBadge score={p.hpScore} size="sm" />
                      </td>

                      {/* Nb offres */}
                      <td className="px-4 py-3 hidden md:table-cell">
                        <button
                          onClick={() => setExpandedSlug(isExpanded ? null : p.slug)}
                          className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg transition-colors hover:opacity-80"
                          style={{
                            backgroundColor: p.offerCount > 0 ? "var(--color-primary-light)" : "var(--color-surface)",
                            color: p.offerCount > 0 ? "var(--color-primary)" : "var(--color-muted)",
                          }}
                        >
                          {p.offerCount} offre{p.offerCount > 1 ? "s" : ""}
                          {p.offerCount > 0 && (isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />)}
                        </button>
                      </td>

                      {/* Statut */}
                      <td className="px-4 py-3 hidden lg:table-cell">
                        {p.verified ? (
                          <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full font-medium" style={{ backgroundColor: "#D1FAE5", color: "#065F46" }}>
                            <CheckCircle2 className="w-3 h-3" /> Vérifié
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full font-medium" style={{ backgroundColor: "#FEF3C7", color: "#92400E" }}>
                            ⏳ En attente
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {p.website && (
                            <a
                              href={p.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg border hover:opacity-80"
                              style={{ borderColor: "var(--color-border)", color: "var(--color-muted)" }}
                              title="Site officiel"
                            >
                              <Globe className="w-3 h-3" />
                            </a>
                          )}
                          <Link
                            href={`/${p.verticalSlug}/fournisseurs/${p.slug}/`}
                            target="_blank"
                            className="inline-flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg border hover:opacity-80"
                            style={{ borderColor: "var(--color-border)", color: "var(--color-primary)" }}
                            title="Voir la fiche publique"
                          >
                            <ExternalLink className="w-3 h-3" /> Fiche
                          </Link>
                          <button
                            className="text-xs px-2.5 py-1.5 rounded-lg text-white hover:opacity-80"
                            style={{ backgroundColor: "var(--color-primary)" }}
                            onClick={() => alert(`Éditeur pour "${p.name}" — à connecter à la base de données`)}
                          >
                            Éditer
                          </button>
                        </div>
                      </td>
                    </tr>

                    {/* Ligne expandée : offres du fournisseur */}
                    {isExpanded && (
                      <tr
                        key={`${p.slug}-expanded`}
                        style={{ backgroundColor: "var(--color-primary-light)", borderTop: "1px solid var(--color-border)" }}
                      >
                        <td colSpan={6} className="px-6 py-4">
                          <p className="text-xs font-semibold mb-3" style={{ color: "var(--color-primary)" }}>
                            Offres de {p.name} ({offers.length})
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                            {offers.map((o) => (
                              <div
                                key={o.slug}
                                className="flex items-center justify-between p-3 rounded-xl border text-xs"
                                style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}
                              >
                                <div className="flex-1 min-w-0">
                                  <p className="font-semibold truncate" style={{ color: "var(--color-text)" }}>{o.name}</p>
                                  <p className="text-[11px] mt-0.5" style={{ color: "var(--color-muted)" }}>
                                    {o.priceNote}
                                    {o.priceIsExample && " ⚠️"}
                                  </p>
                                </div>
                                <span
                                  className="ml-2 font-bold text-sm shrink-0"
                                  style={{ color: o.hpScore === "A" ? "var(--color-secondary)" : o.hpScore === "B" ? "#8FB84E" : "var(--color-accent)" }}
                                >
                                  {o.hpScore}
                                </span>
                              </div>
                            ))}
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                )
              })}
            </tbody>
          </table>
        </div>

        <p className="text-xs mt-4 text-center" style={{ color: "var(--color-muted)" }}>
          {filtered.length} fournisseur{filtered.length > 1 ? "s" : ""} affiché{filtered.length > 1 ? "s" : ""}
          {" · L'édition CRUD sera connectée à la base de données lors du déploiement."}
        </p>
      </main>
    </div>
  )
}
