import Link from "next/link"
import HPScoreBadge from "@/components/ui/HPScoreBadge"
import PriceTag from "@/components/ui/PriceTag"
import OfferClickTracker from "@/components/ui/OfferClickTracker"
import type { OfferData, ProviderData } from "@/lib/data/seed-data"

type Props = {
  offer: OfferData
  provider: ProviderData
  verticalSlug: string
}

export default function OfferCard({ offer, provider, verticalSlug }: Props) {
  return (
    <div
      className="rounded-2xl border shadow-sm overflow-hidden transition-shadow hover:shadow-md"
      style={{
        backgroundColor: "var(--color-card)",
        borderColor: offer.isFeatured ? "var(--color-secondary)" : "var(--color-border)",
        borderWidth: offer.isFeatured ? "2px" : "1px",
      }}
    >
      {offer.isFeatured && (
        <div
          className="px-4 py-1.5 text-xs font-semibold text-white text-center"
          style={{ backgroundColor: "var(--color-secondary)" }}
        >
          ⭐ Offre recommandée
        </div>
      )}

      <div className="p-5">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1 min-w-0">
            <p
              className="text-xs font-medium uppercase tracking-wide mb-1"
              style={{ color: "var(--color-muted)" }}
            >
              {provider.name}
            </p>
            <Link
              href={`/${verticalSlug}/offres/${offer.slug}/`}
              className="font-bold text-base leading-tight hover:underline"
              style={{ color: "var(--color-text)" }}
            >
              {offer.name}
            </Link>
          </div>
          <HPScoreBadge score={offer.hpScore} showLabel size="md" />
        </div>

        {/* Détails highlights */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          {offer.details
            .filter((d) => d.isHighlight)
            .slice(0, 4)
            .map((d) => (
              <div
                key={d.key}
                className="rounded-lg px-3 py-2"
                style={{ backgroundColor: "var(--color-primary-light)" }}
              >
                <p className="text-[10px] font-medium uppercase tracking-wide" style={{ color: "var(--color-muted)" }}>
                  {d.key}
                </p>
                <p className="text-sm font-bold" style={{ color: "var(--color-primary)" }}>
                  {d.value}
                  {d.unit && <span className="font-normal text-xs ml-1">{d.unit}</span>}
                </p>
              </div>
            ))}
        </div>

        {/* Prix */}
        <div className="mb-4">
          <PriceTag note={offer.priceNote} isExample={offer.priceIsExample} />
        </div>

        {/* CTA */}
        <div className="flex gap-2">
          <OfferClickTracker slug={offer.slug} vertical={verticalSlug} event="offer_view" source="card">
            <Link
              href={`/${verticalSlug}/offres/${offer.slug}/`}
              className="flex-1 text-center px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: "var(--color-primary)" }}
            >
              Voir l&apos;offre
            </Link>
          </OfferClickTracker>
          <OfferClickTracker slug={offer.slug} vertical={verticalSlug} event="offer_whatsapp" source="card">
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "224000000000"}?text=${encodeURIComponent(`Bonjour, je suis intéressé par l'offre ${offer.name} de ${provider.name}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center px-3 py-2.5 rounded-xl text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: "var(--color-whatsapp)" }}
              aria-label="Obtenir de l'aide sur WhatsApp"
            >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            </a>
          </OfferClickTracker>
        </div>
      </div>
    </div>
  )
}
