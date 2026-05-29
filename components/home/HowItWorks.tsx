const STEPS = [
  {
    number: "1",
    icon: "🔍",
    title: "Choisissez votre secteur",
    description: "Télécom, Mobile Money, Banques… Sélectionnez le service que vous souhaitez comparer.",
  },
  {
    number: "2",
    icon: "⚖️",
    title: "Comparez les offres",
    description: "Notre moteur trie et note les offres selon des critères transparents : tarifs, qualité, couverture.",
  },
  {
    number: "3",
    icon: "✅",
    title: "Choisissez et économisez",
    description: "Sélectionnez la meilleure offre et contactez le fournisseur directement depuis notre site.",
  },
]

export default function HowItWorks() {
  return (
    <section className="py-14 sm:py-20" style={{ backgroundColor: "var(--color-primary-light)" }}>
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3" style={{ color: "var(--color-text)" }}>
            Comment ça marche ?
          </h2>
          <p className="text-base max-w-md mx-auto" style={{ color: "var(--color-muted)" }}>
            Trouver la meilleure offre en Guinée n'a jamais été aussi simple.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
          {STEPS.map((step, i) => (
            <div key={step.number} className="flex flex-col items-center text-center">
              {/* Numéro + ligne de connexion */}
              <div className="relative flex items-center justify-center mb-6">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-3xl shadow-md"
                  style={{ backgroundColor: "var(--color-card)" }}
                >
                  {step.icon}
                </div>
                <div
                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
                  style={{ backgroundColor: "var(--color-primary)" }}
                >
                  {step.number}
                </div>
              </div>

              <h3 className="font-bold text-base mb-2" style={{ color: "var(--color-text)" }}>
                {step.title}
              </h3>
              <p className="text-sm" style={{ color: "var(--color-muted)" }}>
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
