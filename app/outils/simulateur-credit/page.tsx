"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { ChevronRight, MessageCircle, Phone } from "lucide-react"

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "224628935335"
const CC_PHONE  = process.env.NEXT_PUBLIC_CC_PHONE        ?? "224628935335"

// Données bancaires indicatives — à vérifier auprès des banques
const BANQUES = [
  { name: "Ecobank Guinée",       taux: 15, dureeMax: 60, montantMax: 100_000_000, hpScore: "A" },
  { name: "Société Générale",     taux: 14, dureeMax: 84, montantMax: 200_000_000, hpScore: "A" },
  { name: "BICIGUI",              taux: 16, dureeMax: 48, montantMax: 50_000_000,  hpScore: "B" },
  { name: "BOA Guinée",           taux: 17, dureeMax: 48, montantMax: 50_000_000,  hpScore: "B" },
  { name: "UBA Guinée",           taux: 16, dureeMax: 60, montantMax: 100_000_000, hpScore: "B" },
  { name: "Orabank Guinée",       taux: 18, dureeMax: 36, montantMax: 30_000_000,  hpScore: "C" },
]

const TYPES_CREDIT = [
  { label: "Crédit consommation", desc: "Achats, électroménager, véhicule" },
  { label: "Crédit immobilier", desc: "Construction, achat bien immobilier" },
  { label: "Crédit professionnel", desc: "Fonds de roulement, équipement PME" },
  { label: "Microfinance", desc: "Petits montants pour activités génératrices" },
]

function formatGNF(n: number) {
  return new Intl.NumberFormat("fr-GN", { style: "decimal", maximumFractionDigits: 0 }).format(n) + " GNF"
}

function calculerMensualite(montant: number, tauxAnnuel: number, dureeMois: number): number {
  const tauxMensuel = tauxAnnuel / 100 / 12
  if (tauxMensuel === 0) return montant / dureeMois
  return (montant * tauxMensuel * Math.pow(1 + tauxMensuel, dureeMois)) / (Math.pow(1 + tauxMensuel, dureeMois) - 1)
}

export default function SimulateurCreditPage() {
  const [montant, setMontant] = useState(5_000_000)
  const [duree, setDuree] = useState(24)
  const [typeCredit, setTypeCredit] = useState(0)

  const resultats = useMemo(() => {
    return BANQUES.map((b) => {
      const mensualite = calculerMensualite(montant, b.taux, duree)
      const totalRembourse = mensualite * duree
      const coutTotal = totalRembourse - montant
      return {
        ...b,
        mensualite,
        totalRembourse,
        coutTotal,
        eligible: montant <= b.montantMax && duree <= b.dureeMax,
      }
    }).sort((a, b) => a.mensualite - b.mensualite)
  }, [montant, duree])

  const meilleur = resultats.find((r) => r.eligible)

  return (
    <>
      {/* Hero */}
      <section className="py-10 sm:py-14" style={{ background: "linear-gradient(135deg, #1A374D 0%, #2E86C1 100%)" }}>
        <div className="container max-w-3xl">
          <nav className="flex items-center gap-1.5 text-xs mb-5" style={{ color: "rgba(255,255,255,0.5)" }}>
            <Link href="/" className="hover:text-white">Accueil</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/banques/" className="hover:text-white">Banques</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">Simulateur de crédit</span>
          </nav>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
            🏦 Simulateur de crédit bancaire
          </h1>
          <p className="text-sm mb-5" style={{ color: "rgba(255,255,255,0.75)" }}>
            Calculez votre mensualité et comparez les conditions de crédit des banques guinéennes.
            Résultats instantanés — données indicatives à confirmer auprès de la banque.
          </p>
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold"
            style={{ backgroundColor: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.9)" }}
          >
            ⚠️ Taux indicatifs — vérifiez auprès de votre banque avant toute décision
          </div>
        </div>
      </section>

      <div className="container py-8 max-w-4xl mx-auto">
        <div className="grid lg:grid-cols-[1fr_340px] gap-8 items-start">

          {/* Formulaire */}
          <div>
            {/* Type de crédit */}
            <div className="p-5 rounded-2xl border mb-5" style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}>
              <p className="text-sm font-bold mb-3" style={{ color: "var(--color-text)" }}>Type de crédit</p>
              <div className="grid grid-cols-2 gap-2">
                {TYPES_CREDIT.map((t, i) => (
                  <button
                    key={t.label}
                    onClick={() => setTypeCredit(i)}
                    className="text-left p-3 rounded-xl border-2 transition-all text-sm"
                    style={{
                      borderColor: typeCredit === i ? "var(--color-primary)" : "var(--color-border)",
                      backgroundColor: typeCredit === i ? "var(--color-primary-light)" : "var(--color-surface)",
                    }}
                  >
                    <p className="font-bold" style={{ color: "var(--color-text)" }}>{t.label}</p>
                    <p className="text-xs mt-0.5" style={{ color: "var(--color-muted)" }}>{t.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Montant */}
            <div className="p-5 rounded-2xl border mb-5" style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}>
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-bold" style={{ color: "var(--color-text)" }}>Montant du crédit</p>
                <p className="text-lg font-extrabold" style={{ color: "var(--color-primary)" }}>{formatGNF(montant)}</p>
              </div>
              <input
                type="range"
                min={500_000} max={50_000_000} step={500_000}
                value={montant}
                onChange={(e) => setMontant(Number(e.target.value))}
                className="w-full accent-[var(--color-primary)]"
              />
              <div className="flex justify-between text-xs mt-1" style={{ color: "var(--color-muted)" }}>
                <span>500 000 GNF</span>
                <span>50 000 000 GNF</span>
              </div>
              <div className="grid grid-cols-4 gap-2 mt-3">
                {[1_000_000, 5_000_000, 10_000_000, 20_000_000].map((v) => (
                  <button
                    key={v}
                    onClick={() => setMontant(v)}
                    className="text-xs font-semibold py-1.5 rounded-lg border"
                    style={{
                      borderColor: montant === v ? "var(--color-primary)" : "var(--color-border)",
                      backgroundColor: montant === v ? "var(--color-primary-light)" : "var(--color-surface)",
                      color: montant === v ? "var(--color-primary)" : "var(--color-muted)",
                    }}
                  >
                    {v >= 1_000_000 ? `${v / 1_000_000}M` : `${v / 1_000}K`}
                  </button>
                ))}
              </div>
            </div>

            {/* Durée */}
            <div className="p-5 rounded-2xl border mb-6" style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}>
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-bold" style={{ color: "var(--color-text)" }}>Durée de remboursement</p>
                <p className="text-lg font-extrabold" style={{ color: "var(--color-primary)" }}>
                  {duree} mois
                  <span className="text-xs font-normal ml-1" style={{ color: "var(--color-muted)" }}>
                    ({(duree / 12).toFixed(1).replace(".0", "")} ans)
                  </span>
                </p>
              </div>
              <input
                type="range"
                min={6} max={84} step={6}
                value={duree}
                onChange={(e) => setDuree(Number(e.target.value))}
                className="w-full accent-[var(--color-primary)]"
              />
              <div className="flex justify-between text-xs mt-1" style={{ color: "var(--color-muted)" }}>
                <span>6 mois</span>
                <span>84 mois (7 ans)</span>
              </div>
              <div className="grid grid-cols-5 gap-2 mt-3">
                {[6, 12, 24, 36, 60].map((v) => (
                  <button
                    key={v}
                    onClick={() => setDuree(v)}
                    className="text-xs font-semibold py-1.5 rounded-lg border"
                    style={{
                      borderColor: duree === v ? "var(--color-primary)" : "var(--color-border)",
                      backgroundColor: duree === v ? "var(--color-primary-light)" : "var(--color-surface)",
                      color: duree === v ? "var(--color-primary)" : "var(--color-muted)",
                    }}
                  >
                    {v}M
                  </button>
                ))}
              </div>
            </div>

            {/* Résultats par banque */}
            <h2 className="text-lg font-extrabold mb-3" style={{ color: "var(--color-text)" }}>
              📊 Comparaison banques — {TYPES_CREDIT[typeCredit].label}
            </h2>
            <div className="space-y-3">
              {resultats.map((b, i) => (
                <div
                  key={b.name}
                  className="p-4 rounded-2xl border"
                  style={{
                    backgroundColor: "var(--color-card)",
                    borderColor: i === 0 && b.eligible ? "#6B8F3C" : "var(--color-border)",
                    opacity: b.eligible ? 1 : 0.5,
                  }}
                >
                  {i === 0 && b.eligible && (
                    <div className="flex items-center gap-1.5 mb-2">
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: "#6B8F3C" }}>
                        🏆 Meilleure mensualité
                      </span>
                    </div>
                  )}
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-bold text-sm" style={{ color: "var(--color-text)" }}>{b.name}</p>
                      <div className="flex items-center gap-3 mt-1 text-xs" style={{ color: "var(--color-muted)" }}>
                        <span>Taux {b.taux}%/an <em>(indicatif)</em></span>
                        <span>•</span>
                        <span>HP Score <strong style={{ color: b.hpScore === "A" ? "#6B8F3C" : "#8FB84E" }}>{b.hpScore}</strong></span>
                      </div>
                      {!b.eligible && (
                        <p className="text-xs mt-1" style={{ color: "#E67E22" }}>
                          ⚠️ Montant ou durée dépasse les limites de cette banque
                        </p>
                      )}
                    </div>
                    {b.eligible && (
                      <div className="text-right shrink-0">
                        <p className="font-extrabold text-lg" style={{ color: i === 0 ? "#6B8F3C" : "var(--color-text)" }}>
                          {formatGNF(Math.round(b.mensualite))}
                        </p>
                        <p className="text-xs" style={{ color: "var(--color-muted)" }}>/mois</p>
                      </div>
                    )}
                  </div>
                  {b.eligible && (
                    <div className="grid grid-cols-2 gap-3 mt-3 pt-3 border-t text-xs" style={{ borderColor: "var(--color-border)" }}>
                      <div>
                        <span style={{ color: "var(--color-muted)" }}>Total remboursé :</span>
                        <span className="font-semibold ml-1" style={{ color: "var(--color-text)" }}>{formatGNF(Math.round(b.totalRembourse))}</span>
                      </div>
                      <div>
                        <span style={{ color: "var(--color-muted)" }}>Coût du crédit :</span>
                        <span className="font-semibold ml-1" style={{ color: "#E67E22" }}>{formatGNF(Math.round(b.coutTotal))}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <p className="text-xs mt-4" style={{ color: "var(--color-muted)" }}>
              ⚠️ Simulation indicative basée sur un taux fixe. Les taux réels, frais de dossier et assurances peuvent varier. Consultez votre banque pour une offre personnalisée.
            </p>
          </div>

          {/* Sidebar résumé */}
          <div className="lg:sticky lg:top-24 space-y-4">
            {/* Résumé */}
            <div className="p-5 rounded-2xl border" style={{ backgroundColor: "var(--color-primary-light)", borderColor: "var(--color-primary)" }}>
              <p className="text-xs font-bold uppercase tracking-wide mb-3" style={{ color: "var(--color-primary)" }}>Votre simulation</p>
              <div className="space-y-2 text-sm">
                {[
                  { label: "Montant emprunté", value: formatGNF(montant) },
                  { label: "Durée", value: `${duree} mois` },
                  { label: "Type", value: TYPES_CREDIT[typeCredit].label },
                ].map((r) => (
                  <div key={r.label} className="flex justify-between">
                    <span style={{ color: "var(--color-muted)" }}>{r.label}</span>
                    <span className="font-bold" style={{ color: "var(--color-text)" }}>{r.value}</span>
                  </div>
                ))}
              </div>
              {meilleur && (
                <div className="mt-4 pt-4 border-t" style={{ borderColor: "var(--color-border)" }}>
                  <p className="text-xs" style={{ color: "var(--color-muted)" }}>Meilleure mensualité estimée</p>
                  <p className="text-2xl font-extrabold mt-1" style={{ color: "var(--color-primary)" }}>
                    {formatGNF(Math.round(meilleur.mensualite))}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--color-muted)" }}>
                    chez {meilleur.name} à {meilleur.taux}%/an
                  </p>
                </div>
              )}
            </div>

            {/* CTA conseiller */}
            <div className="p-5 rounded-2xl border" style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}>
              <p className="font-bold text-sm mb-1" style={{ color: "var(--color-text)" }}>💬 Parlez à un conseiller</p>
              <p className="text-xs mb-4" style={{ color: "var(--color-muted)" }}>
                Un expert Help&apos;me Process vous aide à obtenir le meilleur taux auprès des banques guinéennes.
              </p>
              <a
                href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(`Bonjour, je souhaite un crédit de ${formatGNF(montant)} sur ${duree} mois. Pouvez-vous m'aider ?`)}`}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-white text-sm mb-2"
                style={{ backgroundColor: "#25D366" }}
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp gratuit
              </a>
              <a
                href={`tel:+${CC_PHONE}`}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl font-semibold text-sm border"
                style={{ borderColor: "var(--color-border)", color: "var(--color-text)" }}
              >
                <Phone className="w-4 h-4" /> Appeler
              </a>
            </div>

            {/* Lien comparateur */}
            <Link
              href="/banques/comparateur"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-sm border-2"
              style={{ borderColor: "var(--color-primary)", color: "var(--color-primary)", backgroundColor: "var(--color-primary-light)" }}
            >
              Comparer les banques →
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
