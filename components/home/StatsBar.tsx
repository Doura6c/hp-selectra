const STATS = [
  { value: "21", label: "Opérateurs analysés",   emoji: "🏢" },
  { value: "46", label: "Offres comparées",       emoji: "📊" },
  { value: "4",  label: "Secteurs actifs",         emoji: "✅" },
  { value: "0",  label: "Publicité cachée",        emoji: "🔒" },
]

export default function StatsBar() {
  return (
    <section
      className="border-y"
      style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}
    >
      <div className="container">
        <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-[var(--color-border)]">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 py-5 px-4 text-center sm:text-left"
            >
              <span className="text-2xl" aria-hidden>{s.emoji}</span>
              <div>
                <p
                  className="text-2xl sm:text-3xl font-extrabold leading-none"
                  style={{ color: i === 3 ? "var(--color-secondary)" : "var(--color-primary)" }}
                >
                  {s.value === "0" ? "Zéro" : s.value}
                </p>
                <p className="text-xs font-medium mt-0.5" style={{ color: "var(--color-muted)" }}>
                  {s.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
