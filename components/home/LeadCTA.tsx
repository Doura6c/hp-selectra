"use client"

import { useState } from "react"
import { Phone, MessageCircle } from "lucide-react"

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "224000000000"

export default function LeadCTA() {
  const [phone, setPhone] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!phone) return
    setLoading(true)
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, channel: "callback", consentGiven: true }),
      })
      setSubmitted(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section
      className="py-14 sm:py-20"
      style={{
        background: `linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary-dark) 100%)`,
      }}
    >
      <div className="container">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Besoin d'aide pour choisir ?
          </h2>
          <p className="mb-8 text-sm sm:text-base" style={{ color: "rgba(255,255,255,0.8)" }}>
            Nos conseillers vous rappellent gratuitement et vous guident vers la meilleure offre
            selon votre situation.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            {/* WhatsApp */}
            <a
              href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Bonjour, j'ai besoin d'aide pour choisir une offre.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 px-6 py-4 rounded-2xl font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: "var(--color-whatsapp)" }}
            >
              <MessageCircle className="w-5 h-5" />
              <span>
                Écrire sur WhatsApp
                <span className="block text-xs font-normal opacity-80">Réponse rapide</span>
              </span>
            </a>

            {/* Rappel */}
            {submitted ? (
              <div
                className="flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-medium text-white"
                style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
              >
                ✅ Demande envoyée — on vous rappelle !
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="tel"
                  placeholder="Votre numéro (ex: 620 00 00 00)"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="flex-1 px-4 py-4 rounded-2xl text-sm bg-white text-gray-900 placeholder-gray-400 border-0 focus:ring-2 focus:ring-accent outline-none"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="shrink-0 flex items-center gap-2 px-4 py-4 rounded-2xl font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
                  style={{ backgroundColor: "var(--color-accent)" }}
                >
                  <Phone className="w-4 h-4" />
                  {loading ? "…" : "Rappel"}
                </button>
              </form>
            )}
          </div>

          <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
            Gratuit et sans engagement. En soumettant ce formulaire, vous acceptez d'être contacté par HP Selectra.
          </p>
        </div>
      </div>
    </section>
  )
}
