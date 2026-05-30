import type { Metadata } from "next"
import Link from "next/link"
import { Home, Search, ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Page introuvable — HP Selectra Guinée",
  description: "Cette page n'existe pas. Retournez à l'accueil ou lancez une recherche.",
}

const SUGGESTIONS = [
  { label: "Comparer les forfaits mobiles", href: "/telecom/comparateur/" },
  { label: "Comparer le mobile money", href: "/mobile-money/comparateur/" },
  { label: "Comparer les banques", href: "/banques/comparateur/" },
  { label: "Rechercher une offre", href: "/recherche" },
]

export default function NotFound() {
  return (
    <div
      className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16"
      style={{ backgroundColor: "var(--color-surface)" }}
    >
      {/* Code */}
      <div
        className="text-[120px] sm:text-[180px] font-extrabold leading-none mb-2 select-none"
        style={{ color: "var(--color-primary-light)" }}
      >
        404
      </div>

      <h1 className="text-2xl sm:text-3xl font-extrabold mb-3" style={{ color: "var(--color-text)" }}>
        Page introuvable
      </h1>
      <p className="text-base max-w-md mb-8" style={{ color: "var(--color-muted)" }}>
        Cette page n'existe pas ou a été déplacée. Vous pouvez chercher une offre
        ou retourner à l'accueil.
      </p>

      {/* CTA principal */}
      <div className="flex flex-wrap gap-3 justify-center mb-10">
        <Link
          href="/"
          className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          <Home className="w-4 h-4" /> Retour à l'accueil
        </Link>
        <Link
          href="/recherche"
          className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold border transition-colors hover:bg-surface"
          style={{ borderColor: "var(--color-primary)", color: "var(--color-primary)" }}
        >
          <Search className="w-4 h-4" /> Rechercher une offre
        </Link>
      </div>

      {/* Suggestions */}
      <div
        className="rounded-2xl border p-6 max-w-sm w-full text-left"
        style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}
      >
        <p className="text-xs font-medium uppercase tracking-wide mb-4" style={{ color: "var(--color-muted)" }}>
          Vous cherchiez peut-être…
        </p>
        <ul className="flex flex-col gap-2">
          {SUGGESTIONS.map((s) => (
            <li key={s.href}>
              <Link
                href={s.href}
                className="flex items-center gap-2 text-sm font-medium hover:underline"
                style={{ color: "var(--color-primary)" }}
              >
                <ArrowLeft className="w-3 h-3 rotate-180" />
                {s.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
