"use client"

import { useState } from "react"
import { Phone, MessageCircle, Clock, ShieldCheck, Users } from "lucide-react"

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "224000000000"
const CC_PHONE  = process.env.NEXT_PUBLIC_CC_PHONE ?? "224000000000"

const ADVISORS = ["AM", "KD", "FB", "MS"]

export default function LeadCTA() {
  const [phone, setPhone] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading]  = useState(false)

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

  const waMsg = encodeURIComponent(
    "Bonjour, je suis sur HP Selectra et j'aimerais être conseillé par un expert Help'me Process pour choisir la meilleure offre."
  )

  return (
    <section
      className="py-14 sm:py-20"
      style={{
        background: "linear-gradient(135deg, var(--color-primary-dark) 0%, var(--color-primary) 60%, var(--color-secondary-dark) 100%)",
      }}
    >
      <div className="container">
        <div className="max-w-3xl mx-auto">

          {/* En-tête */}
          <div className="text-center mb-10">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-5 text-sm font-semibold"
              style={{ backgroundColor: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.95)" }}
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse shrink-0" />
              Conseillers Help&apos;me Process disponibles
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
              Parlez à un expert, c&apos;est gratuit
            </h2>
            <p className="text-sm sm:text-base max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.75)" }}>
              Notre call center guinéen analyse votre situation et vous guide vers
              la meilleure offre — en moins de 3 minutes.
            </p>
          </div>

          {/* Avatars conseillers */}
          <div className="flex justify-center mb-8">
            <div
              className="flex items-center gap-3 px-5 py-3 rounded-2xl"
              style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
            >
              <div className="flex -space-x-3">
                {ADVISORS.map((initials, i) => (
                  <div
                    key={initials}
                    className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white border-2 shrink-0"
                    style={{
                      backgroundColor: i % 2 === 0 ? "var(--color-secondary)" : "var(--color-accent)",
                      borderColor: "rgba(255,255,255,0.3)",
                      zIndex: ADVISORS.length - i,
                    }}
                  >
                    {initials}
                  </div>
                ))}
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white border-2 shrink-0"
                  style={{ backgroundColor: "rgba(255,255,255,0.2)", borderColor: "rgba(255,255,255,0.3)", zIndex: 0 }}
                >
                  +
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Équipe Help&apos;me Process</p>
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.65)" }}>Call Center in Guinea</p>
              </div>
            </div>
          </div>

          {/* CTAs directs */}
          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <a
              href={`https://wa.me/${WA_NUMBER}?text=${waMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 px-6 py-4 rounded-2xl font-semibold text-white transition-all hover:scale-[1.02] active:scale-95"
              style={{ backgroundColor: "var(--color-whatsapp)" }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: "rgba(255,255,255,0.2)" }}>
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold">Chat WhatsApp</p>
                <p className="text-xs font-normal" style={{ color: "rgba(255,255,255,0.8)" }}>Un conseiller répond en direct</p>
              </div>
            </a>

            <a
              href={`tel:+${CC_PHONE}`}
              className="flex items-center gap-4 px-6 py-4 rounded-2xl font-semibold text-white transition-all hover:bg-white/10 border border-white/30 active:scale-95"
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: "rgba(255,255,255,0.2)" }}>
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold">Appeler le centre</p>
                <p className="text-xs font-normal" style={{ color: "rgba(255,255,255,0.8)" }}>Help&apos;me Process — Appel direct</p>
              </div>
            </a>
          </div>

          {/* Formulaire rappel */}
          <div className="rounded-2xl p-6" style={{ backgroundColor: "rgba(255,255,255,0.08)" }}>
            <p className="text-white font-semibold text-sm mb-4 flex items-center gap-2">
              <Phone className="w-4 h-4" style={{ color: "var(--color-accent)" }} />
              Rappel gratuit — un conseiller vous appelle
            </p>
            {submitted ? (
              <div className="flex items-center gap-3 py-2">
                <span className="text-2xl">✅</span>
                <div>
                  <p className="text-white font-semibold text-sm">Demande reçue !</p>
                  <p className="text-xs" style={{ color: "rgba(255,255,255,0.7)" }}>
                    Un conseiller Help&apos;me Process vous rappelle très prochainement.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex gap-3 flex-col sm:flex-row">
                <input
                  type="tel"
                  placeholder="Votre numéro (ex: 620 00 00 00)"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="flex-1 px-4 py-3 rounded-xl text-sm bg-white text-gray-900 placeholder-gray-400 border-0 outline-none"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="shrink-0 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
                  style={{ backgroundColor: "var(--color-accent)" }}
                >
                  <Phone className="w-4 h-4" />
                  {loading ? "…" : "Me faire rappeler"}
                </button>
              </form>
            )}
          </div>

          {/* Réassurances */}
          <div className="grid grid-cols-3 gap-3 mt-6 text-center">
            {[
              { icon: Clock,       label: "Réponse rapide" },
              { icon: ShieldCheck, label: "100 % gratuit"  },
              { icon: Users,       label: "Experts locaux" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-1">
                <Icon className="w-4 h-4" style={{ color: "var(--color-accent)" }} />
                <span className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.7)" }}>{label}</span>
              </div>
            ))}
          </div>

          <p className="text-center text-xs mt-5" style={{ color: "rgba(255,255,255,0.35)" }}>
            En soumettant vos coordonnées, vous acceptez d&apos;être contacté par l&apos;équipe Help&apos;me Process. Sans engagement.
          </p>
        </div>
      </div>
    </section>
  )
}
