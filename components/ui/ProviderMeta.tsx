import { CalendarDays, ShieldCheck, UserCheck } from "lucide-react"

// Mapping slug expert → vertical
const EXPERT_BY_VERTICAL: Record<string, { name: string; titre: string; initiales: string; color: string }> = {
  telecom:       { name: "Mamadou Baldé",    titre: "Expert Télécom",          initiales: "MB", color: "#1d3461" },
  "mobile-money":{ name: "Fatoumata Diallo", titre: "Experte Mobile Money",     initiales: "FD", color: "#6b8f3c" },
  banques:       { name: "Ibrahima Camara",  titre: "Expert Bancaire",          initiales: "IC", color: "#b45309" },
  fai:           { name: "Mariama Sylla",    titre: "Experte Internet Fixe",    initiales: "MS", color: "#7c3aed" },
  assurances:    { name: "Alpha Barry",      titre: "Expert Assurances",        initiales: "AB", color: "#0891b2" },
}

type Props = {
  verticalSlug: string
  /** Date de dernière vérification (ISO string ou Date) */
  updatedAt?: string | Date
  verified?: boolean
  variant?: "card" | "inline"
}

export default function ProviderMeta({ verticalSlug, updatedAt, verified = true, variant = "card" }: Props) {
  const expert = EXPERT_BY_VERTICAL[verticalSlug]
  const date = updatedAt ? new Date(updatedAt) : new Date()
  const dateStr = date.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })

  if (variant === "inline") {
    return (
      <div className="flex flex-wrap items-center gap-3 text-xs" style={{ color: "var(--color-muted)" }}>
        {expert && (
          <span className="flex items-center gap-1.5">
            <UserCheck className="w-3.5 h-3.5" style={{ color: expert.color }} />
            Vérifié par <strong style={{ color: "var(--color-text)" }}>{expert.name}</strong>
          </span>
        )}
        <span className="flex items-center gap-1.5">
          <CalendarDays className="w-3.5 h-3.5" />
          Mis à jour le <strong style={{ color: "var(--color-text)" }}>{dateStr}</strong>
        </span>
        {verified && (
          <span className="flex items-center gap-1" style={{ color: "#6b8f3c" }}>
            <ShieldCheck className="w-3.5 h-3.5" />
            Données vérifiées
          </span>
        )}
      </div>
    )
  }

  return (
    <div
      className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 rounded-xl border text-xs"
      style={{ backgroundColor: "var(--color-surface)", borderColor: "var(--color-border)" }}
    >
      {/* Expert */}
      {expert && (
        <div className="flex items-center gap-2.5">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-extrabold text-white shrink-0"
            style={{ backgroundColor: expert.color }}
          >
            {expert.initiales}
          </div>
          <div>
            <p className="font-semibold" style={{ color: "var(--color-text)" }}>{expert.name}</p>
            <p style={{ color: "var(--color-muted)" }}>{expert.titre}</p>
          </div>
        </div>
      )}

      <div className="flex items-center gap-4">
        {/* Date */}
        <div className="flex items-center gap-1.5">
          <CalendarDays className="w-3.5 h-3.5 shrink-0" style={{ color: "var(--color-muted)" }} />
          <span style={{ color: "var(--color-muted)" }}>
            Mis à jour le{" "}
            <strong style={{ color: "var(--color-text)" }}>{dateStr}</strong>
          </span>
        </div>
        {/* Badge vérifié */}
        {verified && (
          <span
            className="flex items-center gap-1 px-2 py-0.5 rounded-full font-semibold"
            style={{ backgroundColor: "#eef4e6", color: "#6b8f3c" }}
          >
            <ShieldCheck className="w-3 h-3" />
            Vérifié
          </span>
        )}
      </div>
    </div>
  )
}
