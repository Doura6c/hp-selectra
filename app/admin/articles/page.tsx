"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Plus, Eye, Edit3, Globe, Clock } from "lucide-react"
import { ARTICLES } from "@/lib/data/seed-data"

const VERTICAL_LABELS: Record<string, string> = {
  telecom: "📱 Télécom",
  "mobile-money": "💸 Mobile Money",
  banques: "🏦 Banques",
  fai: "🌐 Internet Fixe",
  assurances: "🛡️ Assurances",
  general: "🗞️ Général",
}

function formatDate(d: string | Date) {
  return new Date(d).toLocaleDateString("fr-GN", { day: "numeric", month: "short", year: "numeric" })
}

export default function AdminArticlesPage() {
  const [filter, setFilter] = useState<"all" | "published" | "draft">("all")
  const [search, setSearch] = useState("")

  const filtered = ARTICLES.filter((a) => {
    if (filter === "published" && !a.isPublished) return false
    if (filter === "draft" && a.isPublished) return false
    if (search && !a.title.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--color-surface)" }}>
      <header className="border-b px-6 py-4 flex items-center justify-between" style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}>
        <div className="flex items-center gap-3">
          <Link href="/admin" className="flex items-center gap-2 text-sm" style={{ color: "var(--color-muted)" }}>
            <ArrowLeft className="w-4 h-4" /> Admin
          </Link>
          <span className="text-sm font-bold" style={{ color: "var(--color-text)" }}>Articles & Actualités</span>
          <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: "var(--color-primary-light)", color: "var(--color-primary)" }}>
            {ARTICLES.filter((a) => a.isPublished).length} publiés
          </span>
        </div>
        <Link
          href="/admin/articles/nouveau"
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-white"
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          <Plus className="w-4 h-4" /> Nouvel article
        </Link>
      </header>

      <main className="p-6 max-w-5xl mx-auto">

        {/* Filtres */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="flex rounded-xl border overflow-hidden" style={{ borderColor: "var(--color-border)" }}>
            {(["all", "published", "draft"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="px-4 py-2 text-xs font-semibold"
                style={{
                  backgroundColor: filter === f ? "var(--color-primary)" : "var(--color-card)",
                  color: filter === f ? "#fff" : "var(--color-muted)",
                }}
              >
                {f === "all" ? "Tous" : f === "published" ? "Publiés" : "Brouillons"}
              </button>
            ))}
          </div>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher un article…"
            className="flex-1 max-w-xs text-sm px-3 py-2 rounded-xl border outline-none"
            style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-card)", color: "var(--color-text)" }}
          />
        </div>

        {/* Liste articles */}
        <div className="space-y-3">
          {filtered.map((article) => (
            <div
              key={article.slug}
              className="p-5 rounded-2xl border flex items-start gap-4"
              style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                    style={{
                      backgroundColor: article.isPublished ? "#e8f5e9" : "#fff3e0",
                      color: article.isPublished ? "#388e3c" : "#e65100",
                    }}
                  >
                    {article.isPublished ? "✅ Publié" : "📝 Brouillon"}
                  </span>
                  {article.verticalSlug && (
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full" style={{ backgroundColor: "var(--color-surface)", color: "var(--color-muted)" }}>
                      {VERTICAL_LABELS[article.verticalSlug] ?? article.verticalSlug}
                    </span>
                  )}
                </div>
                <p className="font-bold text-sm mb-1" style={{ color: "var(--color-text)" }}>{article.title}</p>
                <p className="text-xs line-clamp-2 mb-2" style={{ color: "var(--color-muted)" }}>{article.excerpt}</p>
                <div className="flex items-center gap-3 text-xs" style={{ color: "var(--color-muted)" }}>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {formatDate(article.publishedAt)}
                  </span>
                  {article.authorName && <span>Par {article.authorName}</span>}
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {article.isPublished && (
                  <Link
                    href={`/actualites/${article.slug}`}
                    target="_blank"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border"
                    style={{ borderColor: "var(--color-border)", color: "var(--color-muted)" }}
                  >
                    <Eye className="w-3.5 h-3.5" /> Voir
                  </Link>
                )}
                <Link
                  href={`/admin/articles/nouveau?slug=${article.slug}`}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-white"
                  style={{ backgroundColor: "var(--color-primary)" }}
                >
                  <Edit3 className="w-3.5 h-3.5" /> Modifier
                </Link>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-12" style={{ color: "var(--color-muted)" }}>
              <Globe className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p className="font-semibold">Aucun article trouvé</p>
              <p className="text-sm mt-1">Créez votre premier article avec le bouton &ldquo;Nouvel article&rdquo;.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
