"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { MessageCircle, X, Phone } from "lucide-react"

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "224000000000"
const CC_PHONE = process.env.NEXT_PUBLIC_CC_PHONE ?? "224000000000"

type Action =
  | { kind: "link"; label: string; href: string }
  | { kind: "wa"; label: string; text: string }
  | { kind: "tel"; label: string }
  | { kind: "step"; label: string; to: string }

type Step = {
  bot: string
  actions: Action[]
}

const STEPS: Record<string, Step> = {
  start: {
    bot: "Bonjour 👋 Je suis HP Assistant, l'assistant de Help'me Process. Que souhaitez-vous comparer aujourd'hui ?",
    actions: [
      { kind: "step", label: "📱 Forfaits mobiles", to: "telecom" },
      { kind: "step", label: "💸 Mobile Money", to: "mobilemoney" },
      { kind: "step", label: "🏦 Banques", to: "banques" },
      { kind: "step", label: "🌐 Internet fixe", to: "fai" },
      { kind: "step", label: "🗣️ Parler à un conseiller", to: "advisor" },
    ],
  },
  telecom: {
    bot: "Bon choix ! Cherchez-vous plutôt un forfait mobile, un pass data ponctuel, ou une box internet pour la maison ?",
    actions: [
      { kind: "link", label: "Comparer les forfaits", href: "/telecom/comparateur/" },
      { kind: "link", label: "Meilleur forfait 2026", href: "/telecom/meilleur-forfait-mobile/" },
      { kind: "link", label: "Tous les opérateurs", href: "/telecom/fournisseurs/" },
      { kind: "step", label: "Être conseillé", to: "advisor" },
    ],
  },
  mobilemoney: {
    bot: "Pour le mobile money, Soutra Money est le moins cher du marché : dépôts & retraits gratuits, transfert ≤ 1 %. Que souhaitez-vous faire ?",
    actions: [
      { kind: "link", label: "Comparer les frais", href: "/mobile-money/comparateur/" },
      { kind: "link", label: "Meilleur transfert", href: "/mobile-money/meilleur-transfert-argent/" },
      { kind: "link", label: "Tous les services", href: "/mobile-money/fournisseurs/" },
      { kind: "step", label: "Être conseillé", to: "advisor" },
    ],
  },
  banques: {
    bot: "Pour les banques guinéennes, Ecobank a le meilleur HP Score. Cherchez-vous un compte courant, une carte bancaire ou un placement épargne ?",
    actions: [
      { kind: "link", label: "Comparer les comptes", href: "/banques/comparateur/" },
      { kind: "link", label: "Toutes les banques", href: "/banques/fournisseurs/" },
      { kind: "wa", label: "Ouvrir un compte (aide)", text: "Bonjour, je souhaite ouvrir un compte bancaire en Guinée. Pouvez-vous m'orienter ?" },
      { kind: "step", label: "← Menu principal", to: "start" },
    ],
  },
  fai: {
    bot: "Pour l'internet fixe, Box 4G Orange est la solution la plus rapide à installer. Votre usage est résidentiel ou professionnel ?",
    actions: [
      { kind: "link", label: "Comparer les FAI", href: "/fai/comparateur/" },
      { kind: "link", label: "Meilleur FAI 2026", href: "/fai/meilleur-fai/" },
      { kind: "link", label: "Tous les fournisseurs", href: "/fai/fournisseurs/" },
      { kind: "step", label: "Être conseillé", to: "advisor" },
    ],
  },
  advisor: {
    bot: "Avec plaisir 🙌 Un conseiller Help'me Process vous accompagne gratuitement, par WhatsApp ou par téléphone. Comment préférez-vous être contacté ?",
    actions: [
      { kind: "wa", label: "💬 WhatsApp", text: "Bonjour, je viens de HP Selectra (HP Assistant) et j'aimerais être conseillé pour choisir la meilleure offre." },
      { kind: "tel", label: "📞 Appeler le centre" },
      { kind: "step", label: "← Retour au menu", to: "start" },
    ],
  },
}

type Msg = { from: "bot" | "user"; text: string }

export default function HPAssistant() {
  const [open, setOpen] = useState(false)
  const [stepKey, setStepKey] = useState<string>("start")
  const [history, setHistory] = useState<Msg[]>([{ from: "bot", text: STEPS.start.bot }])
  const scrollRef = useRef<HTMLDivElement>(null)

  const step = STEPS[stepKey]

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
  }, [history, open])

  function goToStep(to: string, userLabel: string) {
    setHistory((h) => [...h, { from: "user", text: userLabel }, { from: "bot", text: STEPS[to].bot }])
    setStepKey(to)
  }

  return (
    <>
      {/* Panneau de chat */}
      {open && (
        <div
          className="fixed z-50 flex flex-col overflow-hidden shadow-2xl animate-hp-pop
                     bottom-0 right-0 w-full h-[80vh] rounded-t-2xl
                     sm:bottom-24 sm:right-5 sm:w-[360px] sm:h-[520px] sm:rounded-2xl"
          style={{ backgroundColor: "var(--color-card)", border: "1px solid var(--color-border)" }}
        >
          {/* En-tête */}
          <div
            className="flex items-center justify-between px-4 py-3 shrink-0"
            style={{ background: "linear-gradient(135deg, var(--color-primary-dark), var(--color-primary))" }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-white shrink-0"
                style={{ backgroundColor: "var(--color-secondary)" }}
              >
                HP
              </div>
              <div>
                <p className="text-white font-semibold text-sm leading-tight">HP Assistant</p>
                <p className="text-[11px] flex items-center gap-1" style={{ color: "rgba(255,255,255,0.7)" }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400" /> Help&apos;me Process · en ligne
                </p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Fermer l'assistant"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3" style={{ backgroundColor: "var(--color-surface)" }}>
            {history.map((m, i) => (
              <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className="max-w-[80%] px-3.5 py-2.5 text-sm leading-relaxed rounded-2xl"
                  style={
                    m.from === "user"
                      ? { backgroundColor: "var(--color-primary)", color: "#fff", borderBottomRightRadius: 4 }
                      : { backgroundColor: "var(--color-card)", color: "var(--color-text)", border: "1px solid var(--color-border)", borderBottomLeftRadius: 4 }
                  }
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Actions rapides */}
          <div className="px-4 py-3 flex flex-wrap gap-2 shrink-0 border-t" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-card)" }}>
            {step.actions.map((a, i) => {
              const cls = "px-3 py-2 rounded-xl text-xs font-semibold transition-all hover:scale-[1.03] active:scale-95"
              if (a.kind === "wa") {
                return (
                  <a
                    key={i}
                    href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(a.text)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${cls} flex items-center gap-1.5 text-white`}
                    style={{ backgroundColor: "var(--color-whatsapp)" }}
                  >
                    <MessageCircle className="w-3.5 h-3.5" /> {a.label}
                  </a>
                )
              }
              if (a.kind === "tel") {
                return (
                  <a
                    key={i}
                    href={`tel:+${CC_PHONE}`}
                    className={`${cls} flex items-center gap-1.5 text-white`}
                    style={{ backgroundColor: "var(--color-secondary)" }}
                  >
                    <Phone className="w-3.5 h-3.5" /> {a.label}
                  </a>
                )
              }
              if (a.kind === "link") {
                return (
                  <Link
                    key={i}
                    href={a.href}
                    onClick={() => setOpen(false)}
                    className={cls}
                    style={{ backgroundColor: "var(--color-primary-light)", color: "var(--color-primary)" }}
                  >
                    {a.label}
                  </Link>
                )
              }
              return (
                <button
                  key={i}
                  onClick={() => goToStep(a.to, a.label)}
                  className={cls}
                  style={{ backgroundColor: "var(--color-surface)", color: "var(--color-text)", border: "1px solid var(--color-border)" }}
                >
                  {a.label}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* WhatsApp direct (au-dessus du lanceur) */}
      <a
        href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Bonjour, je suis sur HP Selectra et j'aimerais être conseillé par un expert Help'me Process.")}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Parler à un conseiller sur WhatsApp"
        className={`fixed bottom-24 right-5 z-40 w-12 h-12 rounded-full items-center justify-center shadow-lg transition-transform hover:scale-110 ${open ? "hidden sm:flex" : "flex"}`}
        style={{ backgroundColor: "var(--color-whatsapp)" }}
      >
        <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>

      {/* Lanceur chatbot */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Fermer HP Assistant" : "Ouvrir HP Assistant"}
        className={`fixed bottom-5 right-5 z-50 items-center gap-2 px-4 h-14 rounded-full shadow-xl text-white font-semibold transition-transform hover:scale-105 ${open ? "hidden sm:flex" : "flex"}`}
        style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))" }}
      >
        {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        <span className="text-sm hidden sm:inline">{open ? "Fermer" : "HP Assistant"}</span>
        {!open && (
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-white" style={{ backgroundColor: "#4ade80" }} />
        )}
      </button>
    </>
  )
}
