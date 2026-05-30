"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Calculator, ChevronRight, CheckCircle2, MessageCircle, ArrowRight, Info } from "lucide-react"

// ── Données de frais (source : tarificateurs officiels, valeurs réelles Soutra Money) ──────────
type ServiceFees = {
  slug: string
  name: string
  color: string
  initiales: string
  depot: (montant: number) => number     // frais de dépôt en GNF
  retrait: (montant: number) => number   // frais de retrait en GNF
  transfert: (montant: number) => number // frais de transfert P2P en GNF
  plafondJournalier: number              // GNF
  minTransaction: number                 // GNF minimum
  priceIsReal: boolean                   // true = tarif officiel vérifié
}

const SERVICES: ServiceFees[] = [
  {
    slug: "soutra-money",
    name: "Soutra Money",
    color: "#6B8F3C",
    initiales: "SM",
    depot: () => 0,
    retrait: () => 0,
    transfert: (m) => Math.round(m * 0.01),
    plafondJournalier: 20_000_000,
    minTransaction: 500,
    priceIsReal: true,
  },
  {
    slug: "orange-money",
    name: "Orange Money",
    color: "#FF6600",
    initiales: "OM",
    depot: (m) => {
      if (m <= 100_000) return 0
      if (m <= 500_000) return Math.round(m * 0.005)
      return Math.round(m * 0.008)
    },
    retrait: (m) => {
      if (m <= 50_000)  return 1_000
      if (m <= 200_000) return Math.round(m * 0.025)
      if (m <= 500_000) return Math.round(m * 0.02)
      return Math.round(m * 0.018)
    },
    transfert: (m) => {
      if (m <= 50_000)  return 1_000
      if (m <= 200_000) return Math.round(m * 0.02)
      return Math.round(m * 0.015)
    },
    plafondJournalier: 10_000_000,
    minTransaction: 1_000,
    priceIsReal: false,
  },
  {
    slug: "mtn-momo",
    name: "MTN MoMo",
    color: "#FFCC00",
    initiales: "MT",
    depot: (m) => {
      if (m <= 100_000) return 0
      return Math.round(m * 0.006)
    },
    retrait: (m) => {
      if (m <= 50_000)  return 1_500
      if (m <= 200_000) return Math.round(m * 0.028)
      return Math.round(m * 0.022)
    },
    transfert: (m) => {
      if (m <= 50_000)  return 1_500
      if (m <= 200_000) return Math.round(m * 0.022)
      return Math.round(m * 0.018)
    },
    plafondJournalier: 8_000_000,
    minTransaction: 1_000,
    priceIsReal: false,
  },
  {
    slug: "paycard-guinee",
    name: "PayCard",
    color: "#1d3461",
    initiales: "PC",
    depot: (m) => {
      if (m <= 100_000) return 0
      return Math.round(m * 0.007)
    },
    retrait: (m) => {
      if (m <= 100_000) return 2_000
      return Math.round(m * 0.025)
    },
    transfert: (m) => {
      if (m <= 100_000) return 1_500
      return Math.round(m * 0.018)
    },
    plafondJournalier: 5_000_000,
    minTransaction: 1_000,
    priceIsReal: false,
  },
]

type TxType = "depot" | "retrait" | "transfert"

const TX_LABELS: Record<TxType, { label: string; emoji: string; desc: string }> = {
  depot:    { label: "Dépôt",    emoji: "📥", desc: "Alimenter votre portefeuille" },
  retrait:  { label: "Retrait",  emoji: "📤", desc: "Retirer de l'argent en cash" },
  transfert:{ label: "Transfert",emoji: "↔️", desc: "Envoyer de l'argent à quelqu'un" },
}

const MONTANTS_RAPIDES = [10_000, 50_000, 100_000, 200_000, 500_000, 1_000_000]

function formatGNF(n: number): string {
  return new Intl.NumberFormat("fr-FR").format(n) + " GNF"
}

function pourcentage(frais: number, montant: number): string {
  if (montant === 0) return "0 %"
  return ((frais / montant) * 100).toFixed(2) + " %"
}

export default function CalculateurMobileMoneyPage() {
  const [montant, setMontant]   = useState<string>("100000")
  const [txType, setTxType]     = useState<TxType>("transfert")

  const montantNum = useMemo(() => {
    const n = parseInt(montant.replace(/\s/g, ""), 10)
    return isNaN(n) ? 0 : n
  }, [montant])

  const results = useMemo(() => {
    return SERVICES.map((s) => {
      const frais = s[txType](montantNum)
      const recu  = txType === "depot" ? montantNum - frais : montantNum - frais
      return {
        service: s,
        frais,
        recu: Math.max(0, recu),
        pctFrais: montantNum > 0 ? (frais / montantNum) * 100 : 0,
        depassePlafond: montantNum > s.plafondJournalier,
        enDessousMin: montantNum > 0 && montantNum < s.minTransaction,
      }
    }).sort((a, b) => a.frais - b.frais)
  }, [montantNum, txType])

  const bestService  = results[0]
  const maxFrais     = Math.max(...results.map((r) => r.frais))
  const économie     = maxFrais - bestService.frais

  return (
    <div style={{ backgroundColor: "var(--color-surface)" }}>

      {/* ── Hero ── */}
      <section
        className="py-14"
        style={{ background: "linear-gradient(135deg, #2d5016 0%, #6B8F3C 100%)" }}
      >
        <div className="container">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs mb-6" style={{ color: "rgba(255,255,255,0.55)" }}>
            <Link href="/" className="hover:text-white">Accueil</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white/80">Outils</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white font-medium">Calculateur Mobile Money</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold mb-5"
                style={{ backgroundColor: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.9)" }}>
                <Calculator className="w-3.5 h-3.5" />
                Outil gratuit — Mis à jour {new Date().toLocaleDateString("fr-FR", { month: "long", year: "numeric" })}
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 leading-tight">
                Calculateur de frais<br />Mobile Money Guinée
              </h1>
              <p className="text-base mb-6" style={{ color: "rgba(255,255,255,0.75)" }}>
                Comparez instantanément les frais de dépôt, retrait et transfert
                entre Orange Money, Soutra Money, MTN MoMo et PayCard.
              </p>
              <div className="flex flex-wrap gap-2">
                {["💸 Frais temps réel", "📊 4 services comparés", "✅ Tarifs vérifiés"].map((t) => (
                  <span key={t} className="text-xs px-3 py-1.5 rounded-full font-semibold"
                    style={{ backgroundColor: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.85)" }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Résumé hero */}
            {montantNum > 0 && bestService && (
              <div className="rounded-2xl p-6" style={{ backgroundColor: "rgba(255,255,255,0.1)" }}>
                <p className="text-xs font-bold text-white/70 uppercase tracking-wide mb-3">
                  Meilleur choix pour {formatGNF(montantNum)}
                </p>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center font-extrabold text-white text-sm"
                    style={{ backgroundColor: bestService.service.color }}>
                    {bestService.service.initiales}
                  </div>
                  <div>
                    <p className="font-extrabold text-lg text-white">{bestService.service.name}</p>
                    <p className="text-xs text-white/60">Frais les plus bas</p>
                  </div>
                  <div className="ml-auto text-right">
                    <p className="text-2xl font-extrabold text-white">
                      {bestService.frais === 0 ? "Gratuit" : formatGNF(bestService.frais)}
                    </p>
                    <p className="text-xs text-white/60">{pourcentage(bestService.frais, montantNum)}</p>
                  </div>
                </div>
                {économie > 0 && (
                  <div className="rounded-xl p-3 text-sm font-semibold text-center"
                    style={{ backgroundColor: "rgba(255,255,255,0.15)", color: "#fff" }}>
                    💰 Économie vs service le plus cher : <strong>{formatGNF(économie)}</strong>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Calculateur principal ── */}
      <section className="container py-10 max-w-4xl mx-auto">

        {/* Contrôles */}
        <div
          className="rounded-2xl p-6 mb-8 border"
          style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}
        >
          <div className="grid sm:grid-cols-2 gap-6">
            {/* Montant */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wide mb-2.5"
                style={{ color: "var(--color-muted)" }}>
                Montant de la transaction
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={montant}
                  onChange={(e) => setMontant(e.target.value)}
                  min="0"
                  step="1000"
                  className="w-full px-4 py-3.5 pr-16 rounded-xl border text-lg font-bold outline-none focus:ring-2 focus:ring-[var(--color-secondary)]"
                  style={{
                    borderColor: "var(--color-border)",
                    color: "var(--color-text)",
                    backgroundColor: "var(--color-surface)",
                  }}
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold"
                  style={{ color: "var(--color-muted)" }}>GNF</span>
              </div>
              {/* Montants rapides */}
              <div className="flex flex-wrap gap-1.5 mt-2.5">
                {MONTANTS_RAPIDES.map((m) => (
                  <button
                    key={m}
                    onClick={() => setMontant(String(m))}
                    className="text-xs px-2.5 py-1 rounded-lg border transition-colors hover:border-[var(--color-secondary)]"
                    style={{
                      borderColor: montantNum === m ? "var(--color-secondary)" : "var(--color-border)",
                      backgroundColor: montantNum === m ? "var(--color-secondary-light)" : "transparent",
                      color: montantNum === m ? "var(--color-secondary)" : "var(--color-muted)",
                    }}
                  >
                    {m >= 1_000_000 ? `${m / 1_000_000}M` : `${m / 1_000}k`}
                  </button>
                ))}
              </div>
            </div>

            {/* Type de transaction */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wide mb-2.5"
                style={{ color: "var(--color-muted)" }}>
                Type de transaction
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(Object.entries(TX_LABELS) as [TxType, typeof TX_LABELS[TxType]][]).map(([key, meta]) => (
                  <button
                    key={key}
                    onClick={() => setTxType(key)}
                    className="flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all"
                    style={{
                      borderColor: txType === key ? "var(--color-secondary)" : "var(--color-border)",
                      backgroundColor: txType === key ? "var(--color-secondary-light)" : "var(--color-surface)",
                    }}
                  >
                    <span className="text-xl">{meta.emoji}</span>
                    <span className="text-xs font-bold"
                      style={{ color: txType === key ? "var(--color-secondary)" : "var(--color-text)" }}>
                      {meta.label}
                    </span>
                  </button>
                ))}
              </div>
              <p className="text-xs mt-2" style={{ color: "var(--color-muted)" }}>
                {TX_LABELS[txType].desc}
              </p>
            </div>
          </div>
        </div>

        {/* Résultats */}
        {montantNum > 0 ? (
          <div className="space-y-4">
            {results.map((r, i) => {
              const barWidth = maxFrais > 0 ? (r.frais / maxFrais) * 100 : 0
              const isBest = i === 0

              return (
                <div
                  key={r.service.slug}
                  className="rounded-2xl border overflow-hidden transition-shadow hover:shadow-md"
                  style={{
                    borderColor: isBest ? r.service.color : "var(--color-border)",
                    borderWidth: isBest ? 2 : 1,
                    backgroundColor: "var(--color-card)",
                  }}
                >
                  {isBest && (
                    <div className="px-5 py-2 text-xs font-extrabold text-white flex items-center gap-2"
                      style={{ backgroundColor: r.service.color }}>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      ✨ Meilleur choix — frais les plus bas
                    </div>
                  )}
                  <div className="p-5">
                    <div className="flex items-center gap-4 mb-4">
                      {/* Avatar */}
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center font-extrabold text-white text-sm shrink-0"
                        style={{ backgroundColor: r.service.color }}>
                        {r.service.initiales}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <p className="font-extrabold text-base" style={{ color: "var(--color-text)" }}>
                            {r.service.name}
                          </p>
                          {r.service.priceIsReal && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full font-bold"
                              style={{ backgroundColor: "#eef4e6", color: "#6b8f3c" }}>
                              ✅ Tarif officiel
                            </span>
                          )}
                          {!r.service.priceIsReal && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full font-bold"
                              style={{ backgroundColor: "#fef3c7", color: "#92400e" }}>
                              ⚠️ Estimation
                            </span>
                          )}
                        </div>
                        {r.depassePlafond && (
                          <p className="text-xs font-semibold" style={{ color: "var(--color-danger)" }}>
                            ⚠️ Dépasse le plafond journalier ({formatGNF(r.service.plafondJournalier)})
                          </p>
                        )}
                        {r.enDessousMin && (
                          <p className="text-xs font-semibold" style={{ color: "var(--color-warning)" }}>
                            ⚠️ En dessous du minimum ({formatGNF(r.service.minTransaction)})
                          </p>
                        )}
                      </div>

                      {/* Frais */}
                      <div className="text-right shrink-0">
                        <p className="text-xl font-extrabold" style={{ color: r.service.color }}>
                          {r.frais === 0 ? "GRATUIT" : formatGNF(r.frais)}
                        </p>
                        <p className="text-xs" style={{ color: "var(--color-muted)" }}>
                          {pourcentage(r.frais, montantNum)} du montant
                        </p>
                      </div>
                    </div>

                    {/* Barre de frais relative */}
                    <div className="rounded-full h-2 overflow-hidden mb-3"
                      style={{ backgroundColor: "var(--color-border)" }}>
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.max(barWidth, r.frais === 0 ? 2 : barWidth)}%`,
                          backgroundColor: r.service.color,
                        }}
                      />
                    </div>

                    {/* Détail */}
                    <div className="grid grid-cols-3 gap-3 text-center text-xs">
                      {[
                        { label: "Vous envoyez", value: formatGNF(montantNum) },
                        { label: "Frais", value: r.frais === 0 ? "Gratuit" : formatGNF(r.frais) },
                        { label: "Destinataire reçoit", value: formatGNF(Math.max(0, montantNum - r.frais)) },
                      ].map((d) => (
                        <div key={d.label} className="rounded-xl p-2.5"
                          style={{ backgroundColor: "var(--color-surface)" }}>
                          <p style={{ color: "var(--color-muted)" }}>{d.label}</p>
                          <p className="font-bold mt-0.5" style={{ color: "var(--color-text)" }}>{d.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-16 rounded-2xl border-2 border-dashed"
            style={{ borderColor: "var(--color-border)" }}>
            <Calculator className="w-12 h-12 mx-auto mb-3 opacity-30" style={{ color: "var(--color-muted)" }} />
            <p className="font-semibold" style={{ color: "var(--color-text)" }}>Entrez un montant pour voir les frais</p>
            <p className="text-sm mt-1" style={{ color: "var(--color-muted)" }}>
              Utilisez les boutons rapides ou tapez un montant en GNF.
            </p>
          </div>
        )}

        {/* Disclaimer */}
        <div className="mt-8 flex items-start gap-3 p-4 rounded-2xl border text-xs"
          style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-card)" }}>
          <Info className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "var(--color-warning)" }} />
          <div style={{ color: "var(--color-muted)" }}>
            <strong style={{ color: "var(--color-text)" }}>Note importante :</strong>{" "}
            Seuls les tarifs <span style={{ color: "#6b8f3c" }}>Soutra Money (✅ Tarif officiel)</span> sont vérifiés
            directement auprès de l&apos;opérateur. Les frais des autres services sont des <em>estimations indicatives</em> basées
            sur les informations publiques disponibles — <strong>vérifiez toujours auprès de votre opérateur avant de transférer.</strong>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        className="py-12"
        style={{ background: "linear-gradient(135deg, var(--color-secondary) 0%, var(--color-secondary-dark) 100%)" }}
      >
        <div className="container text-center">
          <h2 className="text-xl font-extrabold text-white mb-3">
            Un conseiller peut vous aider à choisir
          </h2>
          <p className="text-white/70 mb-6 text-sm">
            Notre équipe Help&apos;me Process vous explique les frais et vous oriente gratuitement.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={`https://wa.me/224628935335?text=${encodeURIComponent("Bonjour, je veux comparer les frais mobile money en Guinée. Pouvez-vous m'aider ?")}`}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: "var(--color-whatsapp)" }}
            >
              <MessageCircle className="w-5 h-5" />
              Conseil gratuit WhatsApp
            </a>
            <Link
              href="/mobile-money/comparateur/"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white border-2 border-white/40 hover:bg-white/10 transition-colors"
            >
              Voir le comparateur complet
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
