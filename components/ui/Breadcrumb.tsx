import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"

export type BreadcrumbItem = {
  label: string
  href?: string
}

type Props = {
  items: BreadcrumbItem[]
  /** "light" = fond sombre (heros), "dark" = fond clair (pages blanches) */
  variant?: "light" | "dark"
  className?: string
}

export default function Breadcrumb({ items, variant = "light", className = "" }: Props) {
  const textColor      = variant === "light" ? "rgba(255,255,255,0.55)" : "var(--color-muted)"
  const textColorHover = variant === "light" ? "#fff"                   : "var(--color-text)"
  const textColorLast  = variant === "light" ? "rgba(255,255,255,0.9)"  : "var(--color-text)"
  const chevronColor   = variant === "light" ? "rgba(255,255,255,0.35)" : "var(--color-border)"

  return (
    <nav
      aria-label="Fil d'Ariane"
      className={`flex items-center flex-wrap gap-0.5 text-xs ${className}`}
    >
      {/* Accueil icon */}
      <Link
        href="/"
        aria-label="Accueil"
        className="flex items-center transition-colors hover:opacity-80"
        style={{ color: textColor }}
      >
        <Home className="w-3 h-3" />
      </Link>

      {items.map((item, i) => {
        const isLast = i === items.length - 1
        return (
          <span key={i} className="flex items-center gap-0.5">
            <ChevronRight className="w-3 h-3 shrink-0" style={{ color: chevronColor }} />
            {isLast || !item.href ? (
              <span
                className="font-medium truncate max-w-[160px]"
                style={{ color: isLast ? textColorLast : textColor }}
                aria-current={isLast ? "page" : undefined}
              >
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className="transition-colors hover:opacity-80 truncate max-w-[160px]"
                style={{ color: textColor }}
              >
                {item.label}
              </Link>
            )}
          </span>
        )
      })}
    </nav>
  )
}
