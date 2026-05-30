"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Eye, Save, Send } from "lucide-react"

const VERTICALS = [
  { slug: "telecom", label: "📱 Télécom" },
  { slug: "mobile-money", label: "💸 Mobile Money" },
  { slug: "banques", label: "🏦 Banques" },
  { slug: "fai", label: "🌐 Internet Fixe" },
  { slug: "assurances", label: "🛡️ Assurances" },
  { slug: "general", label: "🗞️ Général" },
]

const TEMPLATES = [
  {
    label: "Article actualités",
    content: `## Introduction\n\nRédigez votre introduction ici. Expliquez le sujet principal en 2-3 phrases.\n\n## Contexte\n\nDonnez le contexte nécessaire à la compréhension.\n\n## Analyse HP Selectra\n\nVotre analyse indépendante ici.\n\n## Conclusion\n\nRésumez les points clés et les recommandations.\n\n*Source : [Nom de la source]*`,
  },
  {
    label: "Guide pratique",
    content: `## Pourquoi ce guide ?\n\nExpliquez l'utilité de ce guide pour le consommateur guinéen.\n\n## Étape 1 — Titre\n\nDescription de la première étape.\n\n## Étape 2 — Titre\n\nDescription de la deuxième étape.\n\n## Conclusion\n\nRésumé et appel à l'action.\n\n**Besoin d'aide ?** Contactez nos conseillers gratuitement.`,
  },
  {
    label: "Comparatif offres",
    content: `## Présentation\n\nPrésentez les offres comparées.\n\n## Tableau comparatif\n\n| Critère | Offre A | Offre B |\n|---------|---------|----------|\n| Prix | XXX GNF | XXX GNF |\n| Volume | X Go | X Go |\n\n## Notre recommandation\n\nQuelle offre recommandez-vous et pourquoi ?\n\n⚠️ *Tarifs indicatifs — vérifiez auprès du fournisseur.*`,
  },
]

export default function NouvelArticlePage() {
  const [title, setTitle] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [content, setContent] = useState("")
  const [slug, setSlug] = useState("")
  const [vertical, setVertical] = useState("general")
  const [author, setAuthor] = useState("Équipe HP Selectra")
  const [published, setPublished] = useState(false)
  const [saved, setSaved] = useState(false)
  const [preview, setPreview] = useState(false)

  function generateSlug(t: string) {
    return t.toLowerCase()
      .normalize("NFD").replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim().replace(/\s+/g, "-")
      .slice(0, 80)
  }

  function handleTitleChange(v: string) {
    setTitle(v)
    if (!slug || slug === generateSlug(title)) {
      setSlug(generateSlug(v))
    }
  }

  function handleSave() {
    // In production: POST /api/admin/articles
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  function applyTemplate(idx: number) {
    setContent(TEMPLATES[idx].content)
  }

  // Basic markdown → HTML preview (très simplifié)
  function renderPreview(md: string) {
    return md
      .replace(/^## (.+)$/gm, "<h2 class='text-lg font-bold mt-4 mb-2'>$1</h2>")
      .replace(/^### (.+)$/gm, "<h3 class='text-base font-semibold mt-3 mb-1'>$1</h3>")
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>")
      .replace(/\n\n/g, "</p><p class='mb-3'>")
      .replace(/^/, "<p class='mb-3'>")
      .replace(/$/, "</p>")
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--color-surface)" }}>
      <header className="border-b px-6 py-4 flex items-center justify-between sticky top-0 z-20" style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}>
        <div className="flex items-center gap-3">
          <Link href="/admin/articles" className="flex items-center gap-2 text-sm" style={{ color: "var(--color-muted)" }}>
            <ArrowLeft className="w-4 h-4" /> Articles
          </Link>
          <span className="text-sm font-bold" style={{ color: "var(--color-text)" }}>
            {title || "Nouvel article"}
          </span>
          <span
            className="text-[10px] font-bold px-2 py-0.5 rounded-full"
            style={{ backgroundColor: published ? "#e8f5e9" : "#fff3e0", color: published ? "#388e3c" : "#e65100" }}
          >
            {published ? "✅ Publié" : "📝 Brouillon"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPreview((v) => !v)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border"
            style={{ borderColor: "var(--color-border)", color: "var(--color-text)", backgroundColor: preview ? "var(--color-primary-light)" : "var(--color-card)" }}
          >
            <Eye className="w-3.5 h-3.5" /> {preview ? "Éditer" : "Aperçu"}
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border"
            style={{ borderColor: "var(--color-border)", color: "var(--color-text)" }}
          >
            <Save className="w-3.5 h-3.5" /> {saved ? "Sauvegardé ✓" : "Sauvegarder"}
          </button>
          <button
            onClick={() => { setPublished(true); handleSave() }}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-bold text-white"
            style={{ backgroundColor: "var(--color-primary)" }}
          >
            <Send className="w-3.5 h-3.5" /> Publier
          </button>
        </div>
      </header>

      <main className="p-6 max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-[1fr_280px] gap-6">

          {/* Éditeur principal */}
          <div className="space-y-4">
            {/* Titre */}
            <input
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Titre de l'article…"
              className="w-full text-xl font-bold p-4 rounded-2xl border outline-none"
              style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-card)", color: "var(--color-text)" }}
            />

            {/* Extrait */}
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Extrait / résumé (affiché dans les listes et les meta description)…"
              rows={2}
              className="w-full text-sm p-4 rounded-2xl border outline-none resize-none"
              style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-card)", color: "var(--color-text)" }}
            />

            {/* Templates */}
            {!content && (
              <div className="p-4 rounded-2xl border" style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}>
                <p className="text-xs font-bold mb-3" style={{ color: "var(--color-muted)" }}>DÉMARRER AVEC UN MODÈLE</p>
                <div className="flex flex-wrap gap-2">
                  {TEMPLATES.map((t, i) => (
                    <button
                      key={t.label}
                      onClick={() => applyTemplate(i)}
                      className="text-xs font-semibold px-3 py-1.5 rounded-xl border"
                      style={{ borderColor: "var(--color-border)", color: "var(--color-text)", backgroundColor: "var(--color-surface)" }}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Contenu */}
            {!preview ? (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-bold" style={{ color: "var(--color-muted)" }}>CONTENU (MARKDOWN)</p>
                  <p className="text-xs" style={{ color: "var(--color-muted)" }}>{content.length} car.</p>
                </div>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Rédigez votre article en Markdown…&#10;&#10;## Titre section&#10;Votre texte ici.&#10;&#10;**Texte en gras**, *italique*"
                  rows={20}
                  className="w-full font-mono text-sm p-4 rounded-2xl border outline-none resize-none"
                  style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-card)", color: "var(--color-text)" }}
                />
              </div>
            ) : (
              <div
                className="p-6 rounded-2xl border min-h-[400px] text-sm leading-relaxed"
                style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-card)", color: "var(--color-text)" }}
                dangerouslySetInnerHTML={{ __html: renderPreview(content) || "<p style='color:var(--color-muted)'>Aucun contenu à prévisualiser…</p>" }}
              />
            )}
          </div>

          {/* Sidebar métadonnées */}
          <div className="space-y-4">

            {/* Publication */}
            <div className="p-4 rounded-2xl border" style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}>
              <p className="text-xs font-bold mb-3" style={{ color: "var(--color-muted)" }}>PUBLICATION</p>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm" style={{ color: "var(--color-text)" }}>Statut</span>
                <button
                  onClick={() => setPublished((v) => !v)}
                  className="text-xs font-bold px-3 py-1 rounded-full"
                  style={{ backgroundColor: published ? "#e8f5e9" : "#fff3e0", color: published ? "#388e3c" : "#e65100" }}
                >
                  {published ? "✅ Publié" : "📝 Brouillon"}
                </button>
              </div>
              <button
                onClick={() => { setPublished(true); handleSave() }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold text-white"
                style={{ backgroundColor: "var(--color-primary)" }}
              >
                <Send className="w-4 h-4" /> {published ? "Mettre à jour" : "Publier l'article"}
              </button>
            </div>

            {/* Vertical */}
            <div className="p-4 rounded-2xl border" style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}>
              <p className="text-xs font-bold mb-3" style={{ color: "var(--color-muted)" }}>VERTICAL / CATÉGORIE</p>
              <div className="space-y-1.5">
                {VERTICALS.map((v) => (
                  <label key={v.slug} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="vertical"
                      value={v.slug}
                      checked={vertical === v.slug}
                      onChange={() => setVertical(v.slug)}
                      className="accent-[var(--color-primary)]"
                    />
                    <span className="text-sm" style={{ color: "var(--color-text)" }}>{v.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* SEO */}
            <div className="p-4 rounded-2xl border" style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}>
              <p className="text-xs font-bold mb-3" style={{ color: "var(--color-muted)" }}>SEO</p>
              <div className="space-y-3">
                <div>
                  <label className="text-xs mb-1 block" style={{ color: "var(--color-muted)" }}>Slug URL</label>
                  <input
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="slug-de-l-article"
                    className="w-full text-xs font-mono p-2 rounded-lg border outline-none"
                    style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-surface)", color: "var(--color-text)" }}
                  />
                  {slug && <p className="text-[10px] mt-1 break-all" style={{ color: "var(--color-muted)" }}>/actualites/{slug}</p>}
                </div>
                <div>
                  <label className="text-xs mb-1 block" style={{ color: "var(--color-muted)" }}>Auteur</label>
                  <input
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full text-sm p-2 rounded-lg border outline-none"
                    style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-surface)", color: "var(--color-text)" }}
                  />
                </div>
              </div>
            </div>

            {/* Note dev */}
            <div className="p-3 rounded-xl text-xs" style={{ backgroundColor: "#fff3e0", color: "#c04000" }}>
              <strong>Note dev :</strong> L&apos;éditeur sauvegarde en local pour cette démo.
              En production, connecter à <code>/api/admin/articles</code> (POST) et brancher une base de données.
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
