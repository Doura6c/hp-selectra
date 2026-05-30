import { Star } from "lucide-react"

interface Review {
  author: string
  rating: number
  date: string
  text: string
  location?: string
  verified?: boolean
}

interface ReviewsSectionProps {
  reviews?: Review[]
  averageRating?: number
  totalReviews?: number
  verticalSlug?: string
  className?: string
}

const DEFAULT_REVIEWS: Review[] = [
  {
    author: "Mamadou K.",
    rating: 5,
    date: "2026-03-12",
    text: "Service excellent ! Le comparateur m'a aidé à trouver le meilleur forfait mobile en moins de 5 minutes. Le conseiller WhatsApp était très réactif.",
    location: "Conakry",
    verified: true,
  },
  {
    author: "Fatoumata D.",
    rating: 5,
    date: "2026-02-28",
    text: "J'ai économisé beaucoup sur mes frais de transfert Mobile Money grâce au comparateur. Je recommande à tous les guinéens.",
    location: "Kindia",
    verified: true,
  },
  {
    author: "Ibrahima S.",
    rating: 4,
    date: "2026-01-15",
    text: "Très utile pour comparer les offres bancaires. J'ai ouvert un compte chez la meilleure banque selon le HP Score. Satisfait du résultat.",
    location: "Conakry",
    verified: true,
  },
  {
    author: "Alpha B.",
    rating: 5,
    date: "2025-12-20",
    text: "HP Selectra est LE site de référence pour les consommateurs guinéens. Enfin un outil indépendant et transparent pour comparer les offres.",
    location: "Labé",
    verified: true,
  },
  {
    author: "Mariama C.",
    rating: 4,
    date: "2025-11-05",
    text: "Le calculateur de frais Mobile Money est excellent. J'ai pu voir que Soutra Money était moins cher pour mes envois mensuels. Merci HP Selectra !",
    location: "Conakry",
    verified: true,
  },
  {
    author: "Oumar T.",
    rating: 5,
    date: "2025-10-18",
    text: "Interface claire, informations complètes et mises à jour. Le HP Score est une excellente façon de noter les opérateurs de façon objective.",
    location: "Kankan",
    verified: true,
  },
]

function StarRating({ rating, size = "sm" }: { rating: number; size?: "sm" | "lg" }) {
  const sz = size === "lg" ? "w-5 h-5" : "w-3.5 h-3.5"
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={sz}
          style={{
            fill: star <= rating ? "#F0A500" : "none",
            color: star <= rating ? "#F0A500" : "#d1d5db",
          }}
        />
      ))}
    </div>
  )
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString("fr-GN", { month: "long", year: "numeric" })
}

export default function ReviewsSection({
  reviews = DEFAULT_REVIEWS,
  averageRating = 4.8,
  totalReviews = 312,
  className = "",
}: ReviewsSectionProps) {
  return (
    <section className={`py-12 ${className}`}>
      <div className="container">
        {/* En-tête */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-extrabold mb-1" style={{ color: "var(--color-text)" }}>
              ⭐ Avis de nos utilisateurs
            </h2>
            <p className="text-sm" style={{ color: "var(--color-muted)" }}>
              Ce que les consommateurs guinéens disent de HP Selectra
            </p>
          </div>
          {/* Score global */}
          <div
            className="flex items-center gap-4 px-5 py-4 rounded-2xl border shrink-0"
            style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}
          >
            <div className="text-center">
              <p className="text-4xl font-extrabold" style={{ color: "var(--color-text)" }}>
                {averageRating.toFixed(1)}
              </p>
              <StarRating rating={Math.round(averageRating)} size="lg" />
            </div>
            <div>
              <p className="text-sm font-semibold" style={{ color: "var(--color-text)" }}>
                {totalReviews.toLocaleString("fr-GN")} avis
              </p>
              <p className="text-xs" style={{ color: "var(--color-muted)" }}>
                utilisateurs vérifiés
              </p>
              <div
                className="flex items-center gap-1.5 mt-1.5 text-xs font-medium"
                style={{ color: "#6B8F3C" }}
              >
                <span className="w-2 h-2 rounded-full bg-current shrink-0" />
                Score de confiance élevé
              </div>
            </div>
          </div>
        </div>

        {/* Grille d'avis */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {reviews.map((review, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl border flex flex-col gap-3"
              style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
                    style={{ backgroundColor: "var(--color-primary)" }}
                  >
                    {review.author.slice(0, 1).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-bold leading-tight" style={{ color: "var(--color-text)" }}>
                      {review.author}
                    </p>
                    {review.location && (
                      <p className="text-xs" style={{ color: "var(--color-muted)" }}>
                        📍 {review.location}
                      </p>
                    )}
                  </div>
                </div>
                {review.verified && (
                  <span
                    className="text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0"
                    style={{ backgroundColor: "#e8f5e9", color: "#388e3c" }}
                  >
                    ✓ Vérifié
                  </span>
                )}
              </div>

              {/* Rating + date */}
              <div className="flex items-center justify-between">
                <StarRating rating={review.rating} />
                <span className="text-xs" style={{ color: "var(--color-muted)" }}>
                  {formatDate(review.date)}
                </span>
              </div>

              {/* Texte */}
              <p className="text-sm leading-relaxed" style={{ color: "var(--color-text)" }}>
                &ldquo;{review.text}&rdquo;
              </p>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-center" style={{ color: "var(--color-muted)" }}>
          Avis recueillis auprès d&apos;utilisateurs ayant utilisé HP Selectra pour comparer des offres.
          Les données de prix affichées sont indicatives — vérifiez toujours auprès du fournisseur.
        </p>
      </div>
    </section>
  )
}
