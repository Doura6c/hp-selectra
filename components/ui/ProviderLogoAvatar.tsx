import Image from "next/image"
import type { ProviderData } from "@/lib/data/seed-data"

type Props = {
  provider: ProviderData
  /** Taille en px (width et height identiques). Défaut : 48 */
  size?: number
  className?: string
}

/**
 * Affiche le logo d'un fournisseur :
 * - Si `provider.logo` est défini → <Image> avec le fichier local
 * - Sinon → carré coloré avec les initiales du nom
 */
export default function ProviderLogoAvatar({ provider, size = 48, className = "" }: Props) {
  const radius = size >= 64 ? "rounded-2xl" : "rounded-xl"
  const fontSize = size >= 64 ? "text-2xl" : size >= 48 ? "text-xl" : "text-base"

  const initials = provider.name
    .split(/[\s\-()]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("")

  if (provider.logo) {
    return (
      <div
        className={`${radius} overflow-hidden shrink-0 shadow-sm ${className}`}
        style={{ width: size, height: size, minWidth: size }}
      >
        <Image
          src={provider.logo}
          alt={`Logo ${provider.name}`}
          width={size}
          height={size}
          className="w-full h-full object-cover"
          unoptimized
        />
      </div>
    )
  }

  return (
    <div
      className={`${radius} flex items-center justify-center shrink-0 font-bold text-white shadow-sm ${fontSize} ${className}`}
      style={{
        width: size,
        height: size,
        minWidth: size,
        backgroundColor: provider.brandColor ?? "var(--color-primary)",
      }}
    >
      {initials}
    </div>
  )
}
