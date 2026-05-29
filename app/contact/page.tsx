"use client"

import { useState } from "react"
import { MessageCircle, Phone } from "lucide-react"

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "224000000000"

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, channel: "form", consentGiven: true }),
      })
      setSent(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container py-12 max-w-xl">
      <h1 className="text-2xl font-bold mb-2" style={{ color: "var(--color-text)" }}>Contactez-nous</h1>
      <p className="text-sm mb-8" style={{ color: "var(--color-muted)" }}>
        Notre équipe vous répond rapidement pour vous aider à trouver la meilleure offre.
      </p>

      {/* CTAs directs */}
      <div className="grid grid-cols-2 gap-3 mb-8">
        <a
          href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Bonjour HP Selectra, j'ai besoin d'aide.")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-white"
          style={{ backgroundColor: "var(--color-whatsapp)" }}
        >
          <MessageCircle className="w-4 h-4" />
          WhatsApp
        </a>
        <a
          href="tel:+224000000000"
          className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold border"
          style={{ borderColor: "var(--color-primary)", color: "var(--color-primary)" }}
        >
          <Phone className="w-4 h-4" />
          Rappel gratuit
        </a>
      </div>

      {/* Formulaire */}
      {sent ? (
        <div
          className="p-6 rounded-2xl text-center text-sm font-medium"
          style={{ backgroundColor: "var(--color-secondary-light)", color: "var(--color-secondary)" }}
        >
          ✅ Message envoyé ! Notre équipe vous contactera très bientôt.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-medium mb-1" style={{ color: "var(--color-muted)" }}>
              Nom complet
            </label>
            <input
              type="text"
              placeholder="Votre nom"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border text-sm outline-none"
              style={{ borderColor: "var(--color-border)", color: "var(--color-text)" }}
            />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1" style={{ color: "var(--color-muted)" }}>
              Téléphone *
            </label>
            <input
              type="tel"
              placeholder="6XX XX XX XX"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              required
              className="w-full px-4 py-3 rounded-xl border text-sm outline-none"
              style={{ borderColor: "var(--color-border)", color: "var(--color-text)" }}
            />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1" style={{ color: "var(--color-muted)" }}>
              Email (optionnel)
            </label>
            <input
              type="email"
              placeholder="votre@email.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border text-sm outline-none"
              style={{ borderColor: "var(--color-border)", color: "var(--color-text)" }}
            />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1" style={{ color: "var(--color-muted)" }}>
              Votre question
            </label>
            <textarea
              placeholder="Comment pouvons-nous vous aider ?"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 rounded-xl border text-sm outline-none resize-none"
              style={{ borderColor: "var(--color-border)", color: "var(--color-text)" }}
            />
          </div>
          <p className="text-xs" style={{ color: "var(--color-muted)" }}>
            En soumettant ce formulaire, vous acceptez d'être contacté par HP Selectra.
          </p>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 rounded-xl font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
            style={{ backgroundColor: "var(--color-primary)" }}
          >
            {loading ? "Envoi en cours…" : "Envoyer le message"}
          </button>
        </form>
      )}
    </div>
  )
}
