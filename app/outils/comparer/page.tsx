"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { PROVIDERS, OFFERS, VERTICALS } from "@/lib/data/seed-data"
import { ChevronRight, X, ArrowLeftRight, Check } from "lucide-react"

type Vertical = { slug: string; name: string; icon: string }

const LIVE_VERTICALS: Vertical[] = VERTICALS.filter((v) => v.isLive).map((v) => ({
  slug: v.slug,
  name: v.name,
  icon: v.icon,
}))

function ScoreBadge({ score }: { score: string }) {
  const bg =
    score === "A" ? "#6B8F3C" :
    score === "B" ? "#8FB84E" :
    score === "C" ? "#F0A500" :
    score === "D" ? "#E67E22" : "#e74c3c"
  return (
    <span
      className="inline-flex w-7 h-7 items-center justify-center rounded-full text-sm font-extrabold text-white"
      style={{ backgroundColor: bg }}
    >
      {score}
    </span>
  )
}

export default function ComparateurCoteCotePage() {
  const [vertical, setVertical] = useState("telecom")
  const [leftSlug, setLeftSlug] = useState("")
  const [rightSlug, setRightSlug] = useState("")

  const verticalProviders = useMemo(
    () => PROVIDERS.filter((p) => p.verticalSlug === vertical).sort((a, b) => b.hpScoreNum - a.hpScoreNum),
    [vertical]
  )

  const leftProvider = verticalProviders.find((p) => p.slug === leftSlug) ?? null
  const rightProvider = verticalProviders.find((p) => p.slug === rightSlug) ?? null

  const leftOffers = useMemo(
    () => leftProvider ? OFFERS.filter((o) => o.providerSlug === leftProvider.slug && o.verticalSlug === vertical).sort((a, b) => b.hpScoreNum - a.hpScoreNum) : [],
    [leftProvider, vertical]
  )

  const rightOffers = useMemo(
    () => rightProvider ? OFFERS.filter((o) => o.providerSlug === rightProvider.slug && o.verticalSlug === vertical).sort((a, b) => b.hpScoreNum - a.hpScoreNum) : [],
    [rightProvider, vertical]
  )

  // Collect all detail keys across both providers' top offer
  const leftTopOffer = leftOffers[0]
  const rightTopOffer = rightOffers[0]

  const allDetailKeys: string[] = useMemo(() => {
    const keys = new Set<string>()
    leftTopOffer?.details.forEach((d) => keys.add(d.key))
    rightTopOffer?.details.forEach((d) => keys.add(d.key))
    return Array.from(keys)
  }, [leftTopOffer, rightTopOffer])

  function swap() {
    const tmp = leftSlug
    setLeftSlug(rightSlug)
    setRightSlug(tmp)
  }

  function reset() {
    setLeftSlug("")
    setRightSlug("")
  }

  const canCompare = leftProvider && rightProvider && leftProvider.slug !== rightProvider.slug

  return (
    <>
      {/* Hero */}
      <section
        className="py-10 sm:py-14"
        style={{ background: "linear-gradient(135deg, #1D3461 0%, #2E86C1 100%)" }}
      >
        <div className="container max-w-3xl">
          <nav className="flex items-center gap-1.5 text-xs mb-5" style={{ color: "rgba(255,255,255,0.5)" }}>
            <Link href="/" className="hover:text-white">Accueil</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/outils/calculateur-mobile-money" className="hover:text-white">Outils</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">Comparateur côte à côte</span>
          </nav>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
            ⚖️ Comparateur côte à côte
          </h1>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.75)" }}>
            Comparez 2 fournisseurs en détail — HP Score, offres phares, critères clés. Prenez la meilleure décision.
          </p>
        </div>
      </section>

      <div className="container py-8 max-w-5xl mx-auto">

        {/* Sélecteur vertical */}
        <div
          className="p-5 rounded-2xl border mb-8"
          style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}
        >
          <p className="text-sm font-bold mb-3" style={{ color: "var(--color-text)" }}>
            1. Choisir le secteur
          </p>
          <div className="flex flex-wrap gap-2">
            {LIVE_VERTICALS.map((v) => {
              const active = vertical === v.slug
              return (
                <button
                  key={v.slug}
                  onClick={() => { setVertical(v.slug); reset() }}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all"
                  style={{
                    backgroundColor: active ? "var(--color-primary)" : "var(--color-surface)",
                    color: active ? "#fff" : "var(--color-text)",
                    border: `2px solid ${active ? "var(--color-primary)" : "var(--color-border)"}`,
                  }}
                >
                  <span>{v.icon}</span>
                  {v.name}
                </button>
              )
            })}
          </div>
        </div>

        {/* Sélecteur providers */}
        <div className="grid grid-cols-[1fr_auto_1fr] gap-3 items-end mb-8">
          {/* Left */}
          <div className="p-4 rounded-2xl border" style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}>
            <p className="text-xs font-bold mb-2" style={{ color: "var(--color-muted)" }}>
              FOURNISSEUR 1
            </p>
            <select
              value={leftSlug}
              onChange={(e) => setLeftSlug(e.target.value)}
              className="w-full text-sm rounded-xl px-3 py-2.5 border outline-none"
              style={{ borderColor: "var(--color-border)", color: "var(--color-text)", backgroundColor: "var(--color-surface)" }}
            >
              <option value="">— Sélectionner —</option>
              {verticalProviders.map((p) => (
                <option key={p.slug} value={p.slug} disabled={p.slug === rightSlug}>
                  {p.name} ({p.hpScore})
                </option>
              ))}
            </select>
          </div>

          {/* Swap button */}
          <button
            onClick={swap}
            disabled={!leftSlug && !rightSlug}
            className="p-3 rounded-xl border transition-all hover:bg-[var(--color-primary-light)] disabled:opacity-40"
            style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-card)" }}
            title="Inverser"
          >
            <ArrowLeftRight className="w-5 h-5" style={{ color: "var(--color-primary)" }} />
          </button>

          {/* Right */}
          <div className="p-4 rounded-2xl border" style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}>
            <p className="text-xs font-bold mb-2" style={{ color: "var(--color-muted)" }}>
              FOURNISSEUR 2
            </p>
            <select
              value={rightSlug}
              onChange={(e) => setRightSlug(e.target.value)}
              className="w-full text-sm rounded-xl px-3 py-2.5 border outline-none"
              style={{ borderColor: "var(--color-border)", color: "var(--color-text)", backgroundColor: "var(--color-surface)" }}
            >
              <option value="">— Sélectionner —</option>
              {verticalProviders.map((p) => (
                <option key={p.slug} value={p.slug} disabled={p.slug === leftSlug}>
                  {p.name} ({p.hpScore})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Empty state */}
        {!canCompare && (
          <div
            className="text-center py-16 rounded-2xl border"
            style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}
          >
            <p className="text-4xl mb-3">⚖️</p>
            <p className="font-bold text-base mb-1" style={{ color: "var(--color-text)" }}>
              Sélectionnez 2 fournisseurs différents
            </p>
            <p className="text-sm" style={{ color: "var(--color-muted)" }}>
              Choisissez un secteur et deux fournisseurs pour voir la comparaison côte à côte.
            </p>
          </div>
        )}

        {/* Comparaison côte à côte */}
        {canCompare && leftProvider && rightProvider && (
          <div className="animate-hp-fade-up space-y-6">

            {/* En-têtes fournisseurs */}
            <div className="grid grid-cols-[200px_1fr_1fr] gap-px rounded-2xl overflow-hidden border" style={{ borderColor: "var(--color-border)" }}>
              {/* Coin vide */}
              <div className="p-4" style={{ backgroundColor: "var(--color-surface)" }} />

              {/* Fournisseur gauche */}
              {[leftProvider, rightProvider].map((p, i) => (
                <div
                  key={p.slug}
                  className="p-5 text-center"
                  style={{
                    backgroundColor: i === 0 ? "var(--color-primary-light)" : "var(--color-card)",
                    borderLeft: "1px solid var(--color-border)",
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-white text-sm font-extrabold mx-auto mb-3"
                    style={{ backgroundColor: p.brandColor ?? "var(--color-primary)" }}
                  >
                    {p.name.slice(0, 2).toUpperCase()}
                  </div>
                  <p className="font-extrabold text-base mb-1" style={{ color: "var(--color-text)" }}>{p.name}</p>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <ScoreBadge score={p.hpScore} />
                    <span className="text-xs font-semibold" style={{ color: "var(--color-muted)" }}>{p.hpScoreNum}/100</span>
                  </div>
                  {p.verified && (
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: "#e8f5e9", color: "#388e3c" }}>
                      ✓ Vérifié
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Tableau de comparaison — métriques fournisseur */}
            <div className="rounded-2xl border overflow-hidden" style={{ borderColor: "var(--color-border)" }}>
              <div className="px-5 py-3 border-b" style={{ backgroundColor: "var(--color-surface)", borderColor: "var(--color-border)" }}>
                <p className="text-xs font-bold uppercase tracking-wide" style={{ color: "var(--color-muted)" }}>
                  📊 Comparaison fournisseurs
                </p>
              </div>

              {[
                { label: "HP Score", left: `${leftProvider.hpScore} (${leftProvider.hpScoreNum}/100)`, right: `${rightProvider.hpScore} (${rightProvider.hpScoreNum}/100)`, winner: leftProvider.hpScoreNum > rightProvider.hpScoreNum ? "left" : leftProvider.hpScoreNum < rightProvider.hpScoreNum ? "right" : "tie" },
                { label: "Vérifié HP Selectra", left: leftProvider.verified ? "✅ Oui" : "❌ Non", right: rightProvider.verified ? "✅ Oui" : "❌ Non", winner: "tie" as const },
                { label: "Nombre d'offres", left: `${leftOffers.length} offre${leftOffers.length > 1 ? "s" : ""}`, right: `${rightOffers.length} offre${rightOffers.length > 1 ? "s" : ""}`, winner: leftOffers.length > rightOffers.length ? "left" : leftOffers.length < rightOffers.length ? "right" : "tie" },
                { label: "Site web", left: leftProvider.website ? "✅ Disponible" : "—", right: rightProvider.website ? "✅ Disponible" : "—", winner: "tie" as const },
              ].map((row, i) => (
                <div
                  key={row.label}
                  className="grid grid-cols-[200px_1fr_1fr]"
                  style={{ borderTop: i > 0 ? "1px solid var(--color-border)" : undefined, backgroundColor: i % 2 === 0 ? "var(--color-card)" : "var(--color-surface)" }}
                >
                  <div className="px-4 py-3 text-xs font-semibold" style={{ color: "var(--color-muted)" }}>
                    {row.label}
                  </div>
                  {[{ value: row.left, side: "left" }, { value: row.right, side: "right" }].map(({ value, side }) => (
                    <div
                      key={side}
                      className="px-4 py-3 text-sm font-semibold flex items-center gap-2"
                      style={{
                        borderLeft: "1px solid var(--color-border)",
                        color: row.winner === side ? "#6B8F3C" : "var(--color-text)",
                        backgroundColor: row.winner === side ? "rgba(107,143,60,0.07)" : "transparent",
                      }}
                    >
                      {row.winner === side && <Check className="w-3.5 h-3.5 shrink-0" style={{ color: "#6B8F3C" }} />}
                      {value}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Offre phare */}
            {(leftTopOffer || rightTopOffer) && (
              <div className="rounded-2xl border overflow-hidden" style={{ borderColor: "var(--color-border)" }}>
                <div className="px-5 py-3 border-b" style={{ backgroundColor: "var(--color-surface)", borderColor: "var(--color-border)" }}>
                  <p className="text-xs font-bold uppercase tracking-wide" style={{ color: "var(--color-muted)" }}>
                    🏆 Offre phare comparée (meilleur HP Score)
                  </p>
                </div>

                {/* Header offres */}
                <div className="grid grid-cols-[200px_1fr_1fr]">
                  <div className="px-4 py-3" style={{ backgroundColor: "var(--color-surface)" }} />
                  {[leftTopOffer, rightTopOffer].map((offer, i) => (
                    <div
                      key={i}
                      className="px-4 py-3 border-l"
                      style={{ borderColor: "var(--color-border)", backgroundColor: i === 0 ? "var(--color-primary-light)" : "var(--color-card)" }}
                    >
                      {offer ? (
                        <>
                          <p className="font-bold text-sm mb-0.5" style={{ color: "var(--color-text)" }}>{offer.name}</p>
                          <div className="flex items-center gap-2">
                            <ScoreBadge score={offer.hpScore} />
                            <span className="text-xs" style={{ color: "var(--color-muted)" }}>{offer.priceNote}</span>
                          </div>
                        </>
                      ) : (
                        <span className="text-xs" style={{ color: "var(--color-muted)" }}>—</span>
                      )}
                    </div>
                  ))}
                </div>

                {/* Detail rows */}
                {allDetailKeys.map((key, i) => {
                  const leftDetail = leftTopOffer?.details.find((d) => d.key === key)
                  const rightDetail = rightTopOffer?.details.find((d) => d.key === key)
                  return (
                    <div
                      key={key}
                      className="grid grid-cols-[200px_1fr_1fr]"
                      style={{ borderTop: "1px solid var(--color-border)", backgroundColor: i % 2 === 0 ? "var(--color-card)" : "var(--color-surface)" }}
                    >
                      <div className="px-4 py-2.5 text-xs font-semibold" style={{ color: "var(--color-muted)" }}>
                        {key}
                      </div>
                      {[leftDetail, rightDetail].map((detail, j) => (
                        <div
                          key={j}
                          className="px-4 py-2.5 text-sm border-l"
                          style={{
                            borderColor: "var(--color-border)",
                            color: detail?.isHighlight ? "#6B8F3C" : "var(--color-text)",
                            fontWeight: detail?.isHighlight ? 700 : 400,
                          }}
                        >
                          {detail ? `${detail.value}${detail.unit ? ` ${detail.unit}` : ""}` : <span style={{ color: "var(--color-muted)" }}>—</span>}
                        </div>
                      ))}
                    </div>
                  )
                })}
              </div>
            )}

            {/* Verdict */}
            <div
              className="p-6 rounded-2xl border"
              style={{
                backgroundColor: leftProvider.hpScoreNum >= rightProvider.hpScoreNum ? "var(--color-primary-light)" : "var(--color-card)",
                borderColor: "var(--color-primary)",
              }}
            >
              <p className="font-extrabold text-base mb-2" style={{ color: "var(--color-text)" }}>
                🏆 Verdict HP Selectra
              </p>
              {leftProvider.hpScoreNum === rightProvider.hpScoreNum ? (
                <p className="text-sm" style={{ color: "var(--color-text)" }}>
                  Les deux fournisseurs ont le même HP Score ({leftProvider.hpScoreNum}/100). Votre choix dépend de votre localisation et de vos besoins spécifiques. Contactez un conseiller pour vous aider.
                </p>
              ) : (
                <p className="text-sm" style={{ color: "var(--color-text)" }}>
                  <strong>
                    {leftProvider.hpScoreNum > rightProvider.hpScoreNum ? leftProvider.name : rightProvider.name}
                  </strong>{" "}
                  obtient le meilleur HP Score (
                  {Math.max(leftProvider.hpScoreNum, rightProvider.hpScoreNum)}/100 vs{" "}
                  {Math.min(leftProvider.hpScoreNum, rightProvider.hpScoreNum)}/100) avec le score{" "}
                  <strong>
                    {leftProvider.hpScoreNum > rightProvider.hpScoreNum ? leftProvider.hpScore : rightProvider.hpScore}
                  </strong>.
                  {" "}Il s&apos;impose sur les critères objectifs analysés par nos experts.
                </p>
              )}
              <div className="flex flex-wrap gap-3 mt-4">
                <Link
                  href={`/${vertical}/comparateur`}
                  className="text-sm font-bold px-4 py-2 rounded-xl text-white"
                  style={{ backgroundColor: "var(--color-primary)" }}
                >
                  Comparateur complet →
                </Link>
                {leftProvider && (
                  <Link
                    href={`/${vertical}/fournisseurs/${leftProvider.slug}/`}
                    className="text-sm font-semibold px-4 py-2 rounded-xl border"
                    style={{ borderColor: "var(--color-border)", color: "var(--color-text)" }}
                  >
                    Fiche {leftProvider.name}
                  </Link>
                )}
                {rightProvider && (
                  <Link
                    href={`/${vertical}/fournisseurs/${rightProvider.slug}/`}
                    className="text-sm font-semibold px-4 py-2 rounded-xl border"
                    style={{ borderColor: "var(--color-border)", color: "var(--color-text)" }}
                  >
                    Fiche {rightProvider.name}
                  </Link>
                )}
              </div>
            </div>

            {/* Reset */}
            <button
              onClick={reset}
              className="flex items-center gap-2 text-sm font-semibold mx-auto px-4 py-2 rounded-xl border"
              style={{ borderColor: "var(--color-border)", color: "var(--color-muted)" }}
            >
              <X className="w-4 h-4" /> Réinitialiser la comparaison
            </button>
          </div>
        )}

        {/* Disclaimer */}
        <p className="text-xs text-center mt-8" style={{ color: "var(--color-muted)" }}>
          ⚠️ Les HP Scores sont calculés par nos experts selon des critères objectifs. Les tarifs affichés sont indicatifs — vérifiez toujours auprès du fournisseur.
        </p>
      </div>
    </>
  )
}
