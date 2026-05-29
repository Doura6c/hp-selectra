import Link from "next/link"
import { formatDate } from "@/lib/utils"
import { ARTICLES } from "@/lib/data/seed-data"

export default function ArticlesSection() {
  const articles = ARTICLES.filter((a) => a.isPublished).slice(0, 3)

  return (
    <section className="py-14 sm:py-20">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: "var(--color-text)" }}>
              Actualités & Guides
            </h2>
            <p className="text-sm mt-1" style={{ color: "var(--color-muted)" }}>
              Restez informé sur les offres et services en Guinée
            </p>
          </div>
          <Link
            href="/actualites/"
            className="text-sm font-semibold hidden sm:block"
            style={{ color: "var(--color-primary)" }}
          >
            Voir tout →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/actualites/${article.verticalSlug}/${article.slug}/`}
              className="group flex flex-col rounded-2xl border overflow-hidden transition-shadow hover:shadow-md"
              style={{
                backgroundColor: "var(--color-card)",
                borderColor: "var(--color-border)",
              }}
            >
              {/* Placeholder image */}
              <div
                className="h-40 flex items-center justify-center text-4xl"
                style={{ backgroundColor: "var(--color-primary-light)" }}
              >
                {article.verticalSlug === "telecom" ? "📱" : "💸"}
              </div>

              <div className="p-5 flex flex-col flex-1">
                <p
                  className="text-xs font-medium uppercase tracking-wide mb-2"
                  style={{ color: "var(--color-secondary)" }}
                >
                  {article.verticalSlug === "telecom" ? "Télécom" : "Mobile Money"}
                </p>
                <h3
                  className="font-bold text-sm leading-snug mb-2 flex-1 group-hover:underline"
                  style={{ color: "var(--color-text)" }}
                >
                  {article.title}
                </h3>
                <p className="text-xs" style={{ color: "var(--color-muted)" }}>
                  {article.authorName} · {formatDate(article.publishedAt!)}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-6 sm:hidden">
          <Link
            href="/actualites/"
            className="text-sm font-semibold"
            style={{ color: "var(--color-primary)" }}
          >
            Voir tous les articles →
          </Link>
        </div>
      </div>
    </section>
  )
}
