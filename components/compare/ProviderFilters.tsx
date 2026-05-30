"use client"

import { useState, useMemo } from "react"
import { SlidersHorizontal, X, ChevronDown } from "lucide-react"
import RankedProviderCard from "@/components/compare/RankedProviderCard"
import type { ProviderData, OfferData } from "@/lib/data/seed-data"

type FilterConfig = {
  operators?: { slug: string; name: string; color?: string }[]
  showScoreFilter?: boolean
  showDataFilter?: boolean   // pour télécom : filtrer par volume data
  showTypeFilter?: boolean   // pour banques : type de compte
  typeOptions?: { value: string; label: string }[]
}

type Props = {
  providers: ProviderData[]
  offersByProvider: Record<string, OfferData[]>
  verticalSlug: string
  config?: FilterConfig
}

const SCORE_OPTIONS = ["A", "B", "C", "D", "E"] as const

export default function ProviderFilters({ providers, offersByProvider, verticalSlug, config = {} }: Props) {
  const [selectedScores, setSelectedScores] = useState<string[]>([])
  const [selectedOps, setSelectedOps]       = useState<string[]>([])
  const [open, setOpen]                     = useState(false)
  const [sortKey, setSortKey]               = useState<"score" | "alpha">("score")

  // Filtrage
  const filtered = useMemo(() => {
    let result = [...providers]

    if (selectedScores.length > 0) {
      result = result.filter((p) => selectedScores.includes(p.hpScore))
    }
    if (selectedOps.length > 0) {
      result = result.filter((p) => selectedOps.includes(p.slug))
    }
    if (sortKey === "alpha") {
      result = result.sort((a, b) => a.name.localeCompare(b.name))
    } else {
      result = result.sort((a, b) => b.hpScoreNum - a.hpScoreNum)
    }

    return result
  }, [providers, selectedScores, selectedOps, sortKey])

  const hasFilters = selectedScores.length > 0 || selectedOps.length > 0

  function toggleScore(s: string) {
    setSelectedScores((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s])
  }
  function toggleOp(slug: string) {
    setSelectedOps((prev) => prev.includes(slug) ? prev.filter((x) => x !== slug) : [...prev, slug])
  }
  function reset() {
    setSelectedScores([])
    setSelectedOps([])
    setSortKey("score")
  }

  const scoreColors: Record<string, string> = {
    A: "#6b8f3c", B: "#8fb84e", C: "#f0a500", D: "#e06b00", E: "#dc2626"
  }

  return (
    <div>
      {/* Barre de filtres */}
      <div
        className="flex flex-wrap items-center gap-3 p-4 rounded-2xl border mb-6"
        style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}
      >
        {/* Bouton filtres avancés */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-2 px-3 py-2 rounded-xl border text-sm font-semibold transition-colors"
          style={{
            borderColor: open ? "var(--color-primary)" : "var(--color-border)",
            backgroundColor: open ? "var(--color-primary-light)" : "transparent",
            color: open ? "var(--color-primary)" : "var(--color-text)",
          }}
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filtrer
          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
        </button>

        {/* Filtre rapide HP Score */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {SCORE_OPTIONS.map((s) => (
            <button
              key={s}
              onClick={() => toggleScore(s)}
              className="w-8 h-8 rounded-lg text-xs font-extrabold text-white transition-all hover:scale-110"
              style={{
                backgroundColor: selectedScores.includes(s) ? scoreColors[s] : `${scoreColors[s]}40`,
                color: selectedScores.includes(s) ? "#fff" : scoreColors[s],
                border: selectedScores.includes(s) ? `2px solid ${scoreColors[s]}` : "2px solid transparent",
              }}
            >
              {s}
            </button>
          ))}
          <span className="text-xs ml-1" style={{ color: "var(--color-muted)" }}>Score</span>
        </div>

        {/* Séparateur */}
        <div className="hidden sm:block w-px h-6" style={{ backgroundColor: "var(--color-border)" }} />

        {/* Tri */}
        <select
          value={sortKey}
          onChange={(e) => setSortKey(e.target.value as "score" | "alpha")}
          className="text-sm rounded-xl px-3 py-2 border outline-none cursor-pointer"
          style={{ borderColor: "var(--color-border)", color: "var(--color-text)", backgroundColor: "var(--color-surface)" }}
        >
          <option value="score">Meilleur HP Score</option>
          <option value="alpha">Ordre alphabétique</option>
        </select>

        {/* Compteur + reset */}
        <div className="ml-auto flex items-center gap-2">
          <span
            className="text-xs font-bold px-2.5 py-1 rounded-full"
            style={{ backgroundColor: "var(--color-primary-light)", color: "var(--color-primary)" }}
          >
            {filtered.length} résultat{filtered.length > 1 ? "s" : ""}
          </span>
          {hasFilters && (
            <button
              onClick={reset}
              className="flex items-center gap-1 text-xs font-semibold transition-opacity hover:opacity-70"
              style={{ color: "var(--color-danger)" }}
            >
              <X className="w-3.5 h-3.5" />
              Réinitialiser
            </button>
          )}
        </div>
      </div>

      {/* Filtres avancés dépliables */}
      {open && (
        <div
          className="p-5 rounded-2xl border mb-6"
          style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}
        >
          {/* Filtre par opérateur */}
          {providers.length > 2 && (
            <div className="mb-4">
              <p className="text-xs font-bold uppercase tracking-wide mb-2.5" style={{ color: "var(--color-muted)" }}>
                Opérateur / fournisseur
              </p>
              <div className="flex flex-wrap gap-2">
                {providers.map((p) => (
                  <button
                    key={p.slug}
                    onClick={() => toggleOp(p.slug)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors"
                    style={{
                      borderColor: selectedOps.includes(p.slug) ? (p.brandColor ?? "var(--color-primary)") : "var(--color-border)",
                      backgroundColor: selectedOps.includes(p.slug) ? `${p.brandColor ?? "var(--color-primary)"}15` : "transparent",
                      color: selectedOps.includes(p.slug) ? (p.brandColor ?? "var(--color-primary)") : "var(--color-text)",
                    }}
                  >
                    <span
                      className="w-4 h-4 rounded-sm flex items-center justify-center text-[9px] font-extrabold text-white"
                      style={{ backgroundColor: p.brandColor ?? "var(--color-primary)" }}
                    >
                      {p.name[0]}
                    </span>
                    {p.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Info */}
          <p className="text-xs" style={{ color: "var(--color-muted)" }}>
            💡 Les filtres s&apos;appliquent en temps réel. Le classement HP Score reste la référence.
          </p>
        </div>
      )}

      {/* Résultats */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 rounded-2xl border" style={{ borderColor: "var(--color-border)" }}>
          <p className="text-4xl mb-3">🔍</p>
          <p className="font-semibold mb-2" style={{ color: "var(--color-text)" }}>Aucun résultat</p>
          <p className="text-sm mb-4" style={{ color: "var(--color-muted)" }}>Modifiez vos filtres pour voir des résultats.</p>
          <button onClick={reset} className="text-sm font-semibold underline" style={{ color: "var(--color-primary)" }}>
            Réinitialiser les filtres
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {filtered.map((provider, i) => {
            const offers = offersByProvider[provider.slug] ?? []
            const originalRank = providers.findIndex((p) => p.slug === provider.slug) + 1
            return (
              <RankedProviderCard
                key={provider.slug}
                provider={provider}
                rank={originalRank}
                verticalSlug={verticalSlug}
                topOffers={offers}
                isRecommended={originalRank === 1}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}
