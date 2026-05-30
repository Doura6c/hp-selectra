"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Send, Users, Mail, Tag, Filter, CheckCircle2 } from "lucide-react"

const SEGMENTS = [
  { id: "all",          label: "Tous les abonnés",    icon: "👥", count: 0 },
  { id: "telecom",      label: "Télécom",              icon: "📱", count: 0 },
  { id: "mobile-money", label: "Mobile Money",         icon: "💸", count: 0 },
  { id: "banques",      label: "Banques",              icon: "🏦", count: 0 },
  { id: "fai",          label: "Internet Fixe",        icon: "🌐", count: 0 },
  { id: "assurances",   label: "Assurances",           icon: "🛡️", count: 0 },
]

const TEMPLATES = [
  {
    id: "weekly",
    label: "Récap hebdomadaire",
    subject: "📊 Récap HP Selectra — Les meilleures offres de la semaine",
    body: `Bonjour {prénom},

Cette semaine, voici les offres et actualités sélectionnées par HP Selectra pour vous.

🔥 **Offres à ne pas manquer**
— [Offre 1] : description brève
— [Offre 2] : description brève

📰 **Actualité de la semaine**
[Titre article] — [Résumé en 1-2 phrases]

→ Comparez toutes les offres sur hp-selectra-app.vercel.app

---
HP Selectra | Guinée Conakry
Pour vous désabonner, répondez "STOP" à cet email.`,
  },
  {
    id: "promo",
    label: "Offre promotionnelle",
    subject: "🎁 Offre spéciale pour vous — HP Selectra",
    body: `Bonjour {prénom},

Nous avons sélectionné une offre spéciale disponible cette semaine en Guinée.

📣 **[Nom de l'offre]**
✅ [Avantage 1]
✅ [Avantage 2]
✅ [Avantage 3]

💡 Cette offre est disponible jusqu'au [date]. Comparez et choisissez le meilleur :

→ Voir l'offre sur hp-selectra-app.vercel.app

---
HP Selectra | Conseil indépendant · Gratuit
Désabonnement : répondez "STOP".`,
  },
  {
    id: "guide",
    label: "Nouveau guide",
    subject: "📖 Nouveau guide HP Selectra — [Titre]",
    body: `Bonjour {prénom},

Notre équipe vient de publier un nouveau guide pour vous aider à mieux choisir en Guinée.

📘 **[Titre du guide]**
[Description du guide en 2-3 phrases. Ce guide vous aidera à faire le bon choix en tenant compte de votre situation.]

👉 Lire le guide gratuitement :
→ hp-selectra-app.vercel.app/[lien-guide]

Des questions ? Contactez-nous via WhatsApp ou téléphone — nos conseillers sont disponibles.

---
HP Selectra | Guide indépendant · 100 % gratuit
Désabonnement : répondez "STOP".`,
  },
]

export default function AdminNewsletterPage() {
  const [segment, setSegment] = useState("all")
  const [subject, setSubject] = useState("")
  const [body, setBody] = useState("")
  const [preview, setPreview] = useState(false)
  const [sent, setSent] = useState(false)
  const [templateId, setTemplateId] = useState<string | null>(null)

  function applyTemplate(t: typeof TEMPLATES[0]) {
    setSubject(t.subject)
    setBody(t.body)
    setTemplateId(t.id)
    setPreview(false)
  }

  function handleSend() {
    // En production : POST /api/admin/newsletter avec { segment, subject, body }
    setSent(true)
    setTimeout(() => setSent(false), 4000)
  }

  const selectedSegment = SEGMENTS.find((s) => s.id === segment)!

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--color-surface)" }}>
      {/* Header */}
      <header
        className="border-b px-6 py-4 flex items-center justify-between sticky top-0 z-20"
        style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}
      >
        <div className="flex items-center gap-3">
          <Link href="/admin" className="flex items-center gap-2 text-sm" style={{ color: "var(--color-muted)" }}>
            <ArrowLeft className="w-4 h-4" /> Admin
          </Link>
          <span className="text-sm font-bold" style={{ color: "var(--color-text)" }}>Newsletter</span>
          <span
            className="text-xs px-2 py-0.5 rounded-full"
            style={{ backgroundColor: "var(--color-primary-light)", color: "var(--color-primary)" }}
          >
            {selectedSegment.icon} {selectedSegment.label}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPreview((v) => !v)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border"
            style={{
              borderColor: "var(--color-border)",
              color: "var(--color-text)",
              backgroundColor: preview ? "var(--color-primary-light)" : "var(--color-card)",
            }}
          >
            <Mail className="w-3.5 h-3.5" /> {preview ? "Éditer" : "Aperçu"}
          </button>
          <button
            onClick={handleSend}
            disabled={!subject || !body}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-bold text-white disabled:opacity-50"
            style={{ backgroundColor: sent ? "#6B8F3C" : "var(--color-primary)" }}
          >
            {sent ? (
              <><CheckCircle2 className="w-3.5 h-3.5" /> Envoyé !</>
            ) : (
              <><Send className="w-3.5 h-3.5" /> Envoyer la campagne</>
            )}
          </button>
        </div>
      </header>

      <main className="p-6 max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-[1fr_280px] gap-6">

          {/* Zone de rédaction */}
          <div className="space-y-4">

            {/* Templates */}
            <div className="p-4 rounded-2xl border" style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}>
              <p className="text-xs font-bold mb-3" style={{ color: "var(--color-muted)" }}>MODÈLES</p>
              <div className="flex flex-wrap gap-2">
                {TEMPLATES.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => applyTemplate(t)}
                    className="text-xs font-semibold px-3 py-1.5 rounded-xl border transition-colors"
                    style={{
                      borderColor: templateId === t.id ? "var(--color-primary)" : "var(--color-border)",
                      color: templateId === t.id ? "var(--color-primary)" : "var(--color-text)",
                      backgroundColor: templateId === t.id ? "var(--color-primary-light)" : "var(--color-surface)",
                    }}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Objet */}
            <input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Objet de l'email…"
              className="w-full text-base font-semibold p-4 rounded-2xl border outline-none"
              style={{
                borderColor: "var(--color-border)",
                backgroundColor: "var(--color-card)",
                color: "var(--color-text)",
              }}
            />

            {/* Corps */}
            {!preview ? (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-bold" style={{ color: "var(--color-muted)" }}>CORPS DU MESSAGE</p>
                  <p className="text-xs" style={{ color: "var(--color-muted)" }}>{body.length} car.</p>
                </div>
                <textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="Rédigez votre email ici…&#10;&#10;Utilisez {prénom} pour personnaliser."
                  rows={18}
                  className="w-full font-mono text-sm p-4 rounded-2xl border outline-none resize-none"
                  style={{
                    borderColor: "var(--color-border)",
                    backgroundColor: "var(--color-card)",
                    color: "var(--color-text)",
                  }}
                />
              </div>
            ) : (
              <div
                className="p-6 rounded-2xl border min-h-[350px]"
                style={{
                  borderColor: "var(--color-border)",
                  backgroundColor: "var(--color-card)",
                }}
              >
                <div
                  className="text-sm font-bold mb-1 pb-2 border-b"
                  style={{ color: "var(--color-text)", borderColor: "var(--color-border)" }}
                >
                  Objet : {subject || <em style={{ color: "var(--color-muted)" }}>Aucun objet</em>}
                </div>
                <pre
                  className="whitespace-pre-wrap text-sm mt-4 leading-relaxed font-sans"
                  style={{ color: "var(--color-text)" }}
                >
                  {body || <span style={{ color: "var(--color-muted)" }}>Aucun contenu à prévisualiser…</span>}
                </pre>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">

            {/* Segment */}
            <div className="p-4 rounded-2xl border" style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}>
              <p className="text-xs font-bold mb-3 flex items-center gap-1.5" style={{ color: "var(--color-muted)" }}>
                <Filter className="w-3.5 h-3.5" /> SEGMENT CIBLE
              </p>
              <div className="space-y-1.5">
                {SEGMENTS.map((seg) => (
                  <label key={seg.id} className="flex items-center justify-between cursor-pointer group">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="segment"
                        value={seg.id}
                        checked={segment === seg.id}
                        onChange={() => setSegment(seg.id)}
                        className="accent-[var(--color-primary)]"
                      />
                      <span className="text-sm" style={{ color: "var(--color-text)" }}>
                        {seg.icon} {seg.label}
                      </span>
                    </div>
                    <span
                      className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: "var(--color-surface)", color: "var(--color-muted)" }}
                    >
                      {seg.count}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Stats abonnés */}
            <div className="p-4 rounded-2xl border" style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}>
              <p className="text-xs font-bold mb-3 flex items-center gap-1.5" style={{ color: "var(--color-muted)" }}>
                <Users className="w-3.5 h-3.5" /> ABONNÉS
              </p>
              <div className="space-y-2">
                {[
                  { label: "Total abonnés",    value: "0",   color: "var(--color-primary)" },
                  { label: "Actifs (30 jours)", value: "0",  color: "#6B8F3C" },
                  { label: "Taux ouverture",   value: "—",   color: "#E67E22" },
                  { label: "Taux clic",        value: "—",   color: "#8B5CF6" },
                ].map(({ label, value, color }) => (
                  <div key={label} className="flex items-center justify-between text-sm">
                    <span style={{ color: "var(--color-muted)" }}>{label}</span>
                    <span className="font-bold" style={{ color }}>{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Labels */}
            <div className="p-4 rounded-2xl border" style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}>
              <p className="text-xs font-bold mb-3 flex items-center gap-1.5" style={{ color: "var(--color-muted)" }}>
                <Tag className="w-3.5 h-3.5" /> PARAMÈTRES
              </p>
              <div className="space-y-2 text-xs" style={{ color: "var(--color-muted)" }}>
                <div className="flex items-center justify-between">
                  <span>Personnalisation {"{prénom}"}</span>
                  <span className="text-green-600 font-semibold">✅ Actif</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Lien de désabonnement</span>
                  <span className="text-green-600 font-semibold">✅ Auto</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Suivi ouvertures</span>
                  <span className="font-semibold" style={{ color: "var(--color-muted)" }}>⏳ Config</span>
                </div>
              </div>
            </div>

            {/* Note dev */}
            <div className="p-3 rounded-xl text-xs" style={{ backgroundColor: "#fff3e0", color: "#c04000" }}>
              <strong>Note dev :</strong> L&apos;envoi est simulé (démo). En production, connecter à un ESP
              (Mailchimp, Brevo, etc.) via <code>/api/admin/newsletter</code>.
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
