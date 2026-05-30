"use client"

import { useState, useEffect } from "react"
import { Phone, MessageCircle, X } from "lucide-react"

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "224628935335"
const CC_PHONE  = process.env.NEXT_PUBLIC_CC_PHONE        ?? "224628935335"

const WA_TEXT = encodeURIComponent(
  "Bonjour HP Selectra 👋 Je souhaite comparer des offres et être conseillé gratuitement."
)

export default function StickyCTA() {
  const [visible, setVisible]   = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 280 && !dismissed) setVisible(true)
      else if (window.scrollY <= 280) setVisible(false)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [dismissed])

  if (dismissed) return null

  return (
    <>
      {/* ── Barre sticky mobile (bottom bar) ── */}
      <div
        className={`
          fixed bottom-0 left-0 right-0 z-50
          lg:hidden
          transition-transform duration-300 ease-out
          ${visible ? "translate-y-0" : "translate-y-full"}
        `}
        style={{ boxShadow: "0 -4px 24px rgba(0,0,0,0.15)" }}
      >
        <div
          className="flex items-center gap-0 relative"
          style={{ backgroundColor: "var(--color-primary-dark)" }}
        >
          {/* WhatsApp */}
          <a
            href={`https://wa.me/${WA_NUMBER}?text=${WA_TEXT}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-4 text-sm font-bold text-white transition-opacity active:opacity-80"
            style={{ backgroundColor: "var(--color-whatsapp)" }}
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp gratuit
          </a>

          {/* Séparateur */}
          <div className="w-px h-8 bg-white/20 shrink-0" />

          {/* Rappel */}
          <a
            href={`tel:${CC_PHONE}`}
            className="flex-1 flex items-center justify-center gap-2 py-4 text-sm font-bold text-white transition-opacity active:opacity-80"
            style={{ backgroundColor: "var(--color-primary)" }}
          >
            <Phone className="w-4 h-4 shrink-0" />
            Rappel gratuit
          </a>

          {/* Fermer */}
          <button
            onClick={() => setDismissed(true)}
            aria-label="Fermer"
            className="absolute top-1 right-1 w-5 h-5 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "rgba(255,255,255,0.15)", color: "#fff" }}
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* ── Bouton flottant desktop (coin bas-droit) ── */}
      <div
        className={`
          hidden lg:flex fixed bottom-6 right-6 z-50 flex-col gap-2
          transition-all duration-300
          ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}
        `}
      >
        {/* Fermer */}
        <button
          onClick={() => setDismissed(true)}
          aria-label="Fermer les boutons de contact"
          className="self-end w-6 h-6 rounded-full flex items-center justify-center shadow-md transition-opacity hover:opacity-70"
          style={{ backgroundColor: "var(--color-muted)", color: "#fff" }}
        >
          <X className="w-3.5 h-3.5" />
        </button>

        {/* WhatsApp */}
        <a
          href={`https://wa.me/${WA_NUMBER}?text=${WA_TEXT}`}
          target="_blank"
          rel="noopener noreferrer"
          title="Nous contacter sur WhatsApp"
          className="flex items-center gap-2.5 px-4 py-3 rounded-full shadow-xl text-sm font-bold text-white transition-transform hover:scale-105"
          style={{ backgroundColor: "var(--color-whatsapp)" }}
        >
          <MessageCircle className="w-5 h-5 shrink-0" />
          Conseil gratuit
        </a>

        {/* Rappel */}
        <a
          href={`tel:${CC_PHONE}`}
          title="Demander un rappel gratuit"
          className="flex items-center gap-2.5 px-4 py-3 rounded-full shadow-xl text-sm font-bold text-white transition-transform hover:scale-105"
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          <Phone className="w-5 h-5 shrink-0" />
          Rappel gratuit
        </a>
      </div>
    </>
  )
}
