import type { Metadata } from "next"
import Link from "next/link"
import { ARTICLES } from "@/lib/data/seed-data"
import { formatDate } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Actualités & Guides — Télécom, Mobile Money, Banques en Guinée",
  description: "Guides pratiques et actualités sur les services financiers et télécom en Guinée.",
}

export default function ActualitesPage() {
  const articles = ARTICLES.filter((a) => a.isPublished)

  return (
    <>
      <section
        className="py-10"
        style={{ background: `linear-gradient(135deg, var(--color-primary-dark), var(--color-primary))` }}
      >
        <div className="container">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-1">Actualités & Guides</h1>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.75)" }}>
            {articles.length} article{articles.length > 1 ? "s" : ""} publiés
          </p>
        </div>
      </section>

      <section className="py-10">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={`/actualites/${article.verticalSlug}/${article.slug}/`}
                className="group flex flex-col rounded-2xl border overflow-hidden transition-shadow hover:shadow-md"
                style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}
              >
                <div
                  className="h-40 flex items-center justify-center text-5xl"
                  style={{ backgroundColor: "var(--color-primary-light)" }}
                >
                  {article.verticalSlug === "telecom" ? "📱" : "💸"}
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <p className="text-xs font-medium uppercase tracking-wide mb-2" style={{ color: "var(--color-secondary)" }}>
                    {article.verticalSlug === "telecom" ? "Télécom" : "Mobile Money"}
                  </p>
                  <h2 className="font-bold text-sm leading-snug mb-2 flex-1 group-hover:underline" style={{ color: "var(--color-text)" }}>
                    {article.title}
                  </h2>
                  <p className="text-xs mb-3 line-clamp-2" style={{ color: "var(--color-muted)" }}>
                    {article.excerpt}
                  </p>
                  <p className="text-xs" style={{ color: "var(--color-muted)" }}>
                    {article.authorName} · {formatDate(article.publishedAt!)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
