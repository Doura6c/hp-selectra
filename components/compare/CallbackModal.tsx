"use client"

import { useState } from "react"
import { X, Phone, CheckCircle, AlertTriangle } from "lucide-react"

const CC_PHONE = process.env.NEXT_PUBLIC_CC_PHONE ?? "224620000000"
const CC_DISPLAY = process.env.NEXT_PUBLIC_CC_DISPLAY ?? "+224 620 00 00 00"

type Props = {
  offerName: string
  providerName: string
  verticalSlug: string
  onClose: () => void
}

type Step = "form" | "success"

export default function CallbackModal({ offerName, providerName, onClose }: Props) {
  const [step, setStep] = useState<Step>("form")
  const [phone, setPhone] = useState("")
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!phone.trim()) { setError("Votre numéro est requis."); return }
    setLoading(true)
    setError("")
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          channel: "callback",
          name: name.trim() || undefined,
          phone: phone.trim(),
          message: `Intéressé par : ${offerName} (${providerName})`,
          consentGiven: true,
        }),
      })
      setStep("success")
    } catch {
      setError("Erreur réseau. Réessayez ou appelez directement.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        className="w-full max-w-md rounded-2xl overflow-hidden shadow-2xl animate-hp-pop"
        style={{ backgroundColor: "var(--color-card)" }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-4"
          style={{ background: "linear-gradient(135deg, var(--color-primary-dark), var(--color-primary))" }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
              style={{ backgroundColor: "var(--color-secondary)" }}
            >HP</div>
            <div>
              <p className="text-sm font-semibold text-white leading-tight">Demander un rappel</p>
              <p className="text-[11px]" style={{ color: "rgba(255,255,255,0.7)" }}>Conseiller Help&apos;me Process · gratuit</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === "form" && (
          <form onSubmit={submit} className="p-6">
            {/* Résumé offre */}
            <div
              className="flex items-start gap-3 p-3 rounded-xl mb-5 text-sm"
              style={{ backgroundColor: "var(--color-primary-light)" }}
            >
              <span className="text-lg shrink-0">📋</span>
              <div>
                <p className="font-semibold" style={{ color: "var(--color-text)" }}>{offerName}</p>
                <p style={{ color: "var(--color-muted)" }}>par {providerName}</p>
              </div>
            </div>

            <p className="text-sm mb-5" style={{ color: "var(--color-muted)" }}>
              Laissez votre numéro. Un conseiller <strong style={{ color: "var(--color-text)" }}>Help&apos;me Process</strong> vous rappelle
              gratuitement pour finaliser votre dossier.
            </p>

            <div className="flex flex-col gap-3 mb-4">
              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: "var(--color-muted)" }}>
                  Votre prénom (optionnel)
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Mamadou"
                  className="w-full px-4 py-3 rounded-xl border text-sm outline-none focus:ring-2"
                  style={{ borderColor: "var(--color-border)", color: "var(--color-text)" }}
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: "var(--color-muted)" }}>
                  Votre numéro de téléphone *
                </label>
                <div className="flex gap-2">
                  <span
                    className="flex items-center px-3 py-3 rounded-xl border text-sm font-medium shrink-0"
                    style={{ borderColor: "var(--color-border)", color: "var(--color-muted)", backgroundColor: "var(--color-surface)" }}
                  >🇬🇳 +224</span>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    placeholder="6XX XX XX XX"
                    className="flex-1 px-4 py-3 rounded-xl border text-sm outline-none"
                    style={{ borderColor: "var(--color-border)", color: "var(--color-text)" }}
                  />
                </div>
              </div>
            </div>

            {error && (
              <p className="text-xs mb-3 flex items-center gap-1.5" style={{ color: "#DC2626" }}>
                <AlertTriangle className="w-3.5 h-3.5" /> {error}
              </p>
            )}

            <p className="text-[11px] mb-4" style={{ color: "var(--color-muted)" }}>
              En validant, vous acceptez d'être contacté par l'équipe Help'me Process à des fins d'accompagnement.
              Aucune souscription sans votre accord.
            </p>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
              style={{ backgroundColor: "var(--color-secondary)" }}
            >
              <Phone className="w-4 h-4" />
              {loading ? "Envoi en cours…" : "Programmer mon rappel gratuit"}
            </button>
          </form>
        )}

        {step === "success" && (
          <div className="p-6 text-center">
            {/* Icône succès */}
            <div className="flex items-center justify-center gap-3 mb-4">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "var(--color-secondary-light)" }}
              >
                <Phone className="w-7 h-7" style={{ color: "var(--color-secondary)" }} />
              </div>
            </div>

            <h2 className="text-xl font-extrabold mb-2" style={{ color: "var(--color-secondary)" }}>
              Rappel programmé avec succès !
            </h2>
            <p className="text-sm mb-5" style={{ color: "var(--color-muted)" }}>
              Un conseiller Help&apos;me Process vous contactera prochainement
              sur votre numéro <strong style={{ color: "var(--color-text)" }}>{phone}</strong>.
            </p>

            {/* Conseil désactivation blocage */}
            <div
              className="flex items-start gap-3 p-4 rounded-xl mb-5 text-left text-sm"
              style={{ backgroundColor: "var(--color-primary-light)" }}
            >
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "var(--color-warning)" }} />
              <p style={{ color: "var(--color-text)" }}>
                <strong>Pour ne pas manquer l'appel</strong> — si vous avez activé le blocage
                des numéros inconnus, pensez à l'<strong>désactiver temporairement</strong> ou
                enregistrez notre numéro ci-dessous.
              </p>
            </div>

            {/* Enregistrer le numéro */}
            <a
              href={`tel:+${CC_PHONE}`}
              className="flex items-center justify-center gap-2 w-full px-5 py-3.5 rounded-xl font-semibold text-white mb-3 transition-opacity hover:opacity-90"
              style={{ backgroundColor: "var(--color-primary)" }}
            >
              <CheckCircle className="w-4 h-4" />
              Enregistrer le {CC_DISPLAY}
            </a>

            <button
              onClick={onClose}
              className="w-full px-5 py-3 rounded-xl text-sm font-semibold border transition-colors hover:bg-surface"
              style={{ borderColor: "var(--color-border)", color: "var(--color-text)" }}
            >
              Voir les offres
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
