import Link from "next/link"
import HPScoreBadge from "@/components/ui/HPScoreBadge"
import type { ProviderData } from "@/lib/data/seed-data"

type Props = {
  provider: ProviderData
  verticalSlug: string
  offerCount?: number
}

export default function ProviderCard({ provider, verticalSlug, offerCount }: Props) {
  return (
    <Link
      href={`/${verticalSlug}/fournisseurs/${provider.slug}/`}
      className="group flex items-center gap-4 p-4 rounded-2xl border transition-all hover:shadow-md hover:border-primary/30"
      style={{
        backgroundColor: "var(--color-card)",
        borderColor: provider.sponsoredTier !== "free" ? "var(--color-accent)" : "var(--color-border)",
      }}
    >
      {/* Logo placeholder */}
      <div
        className="w-14 h-14 rounded-xl flex items-center justify-center text-xl font-bold text-white shrink-0"
        style={{ backgroundColor: "var(--color-primary)" }}
      >
        {provider.name.slice(0, 2).toUpperCase()}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <h3 className="font-bold text-sm truncate" style={{ color: "var(--color-text)" }}>
            {provider.name}
          </h3>
          {provider.verified && (
            <span className="text-[10px] font-semibold text-white px-1.5 py-0.5 rounded" style={{ backgroundColor: "var(--color-secondary)" }}>
              ✓ Vérifié
            </span>
          )}
          {provider.sponsoredTier !== "free" && (
            <span className="text-[10px] font-semibold text-white px-1.5 py-0.5 rounded" style={{ backgroundColor: "var(--color-accent)" }}>
              Sponsorisé
            </span>
          )}
        </div>
        <p className="text-xs line-clamp-2" style={{ color: "var(--color-muted)" }}>
          {provider.description}
        </p>
        {offerCount !== undefined && (
          <p className="text-xs mt-1 font-medium" style={{ color: "var(--color-secondary)" }}>
            {offerCount} offre{offerCount > 1 ? "s" : ""} disponible{offerCount > 1 ? "s" : ""}
          </p>
        )}
      </div>

      <HPScoreBadge score={provider.hpScore} size="sm" />
    </Link>
  )
}
