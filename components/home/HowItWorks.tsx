import Link from "next/link"
import { ArrowRight } from "lucide-react"

const STEPS = [
  {
    number: "01",
    icon: "🔍",
    title: "Choisissez votre secteur",
    description: "Télécom, Mobile Money, Banques, Internet fixe — sélectionnez le service à comparer.",
    color: "#FF6600",
  },
  {
    number: "02",
    icon: "⚖️",
    title: "Comparez les offres",
    description: "Le HP Score note chaque offre sur des critères transparents : tarifs, qualité de service, couverture.",
    color: "#6B8F3C",
  },
  {
    number: "03",
    icon: "📞",
    title: "Contactez un conseiller",
    description: "Un expert guinéen vous aide à finaliser gratuitement votre choix — par WhatsApp ou rappel.",
    color: "#1D3461",
  },
  {
    number: "04",
    icon: "🎉",
    title: "Souscrivez et économisez",
    description: "Passez directement chez l'opérateur ou faites-le faire par votre conseiller Help'me Process.",
    color: "#F0A500",
  },
]

export default function HowItWorks() {
  return (
    <section className="py-16 sm:py-24" style={{ backgroundColor: "var(--color-surface)" }}>
      <div className="container">
        {/* En-tête */}
        <div className="text-center mb-16">
          <p
            className="inline-block text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3"
            style={{ backgroundColor: "var(--color-primary-light)", color: "var(--color-primary)" }}
          >
            Comment ça marche
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4" style={{ color: "var(--color-text)" }}>
            En 4 étapes, c&apos;est réglé
          </h2>
          <p className="text-base max-w-md mx-auto" style={{ color: "var(--color-muted)" }}>
            Trouver la meilleure offre en Guinée n&apos;a jamais été aussi rapide.
          </p>
        </div>

        {/* Étapes */}
        <div className="relative">
          {/* Ligne de connexion desktop */}
          <div
            className="hidden lg:block absolute top-[52px] left-[12.5%] right-[12.5%] h-px"
            style={{ backgroundColor: "var(--color-border)" }}
            aria-hidden
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {STEPS.map((step, i) => (
              <div key={step.number} className="flex flex-col items-center text-center relative">
                {/* Icône + numéro */}
                <div className="relative mb-6">
                  <div
                    className="w-24 h-24 rounded-2xl flex items-center justify-center text-4xl shadow-lg transition-transform hover:scale-105"
                    style={{
                      background: `linear-gradient(135deg, ${step.color}20 0%, ${step.color}10 100%)`,
                      border: `2px solid ${step.color}30`,
                    }}
                  >
                    {step.icon}
                  </div>
                  {/* Badge numéro */}
                  <div
                    className="absolute -top-3 -right-3 w-8 h-8 rounded-full flex items-center justify-center text-xs font-extrabold text-white shadow-md"
                    style={{ backgroundColor: step.color }}
                  >
                    {i + 1}
                  </div>
                  {/* Flèche entre étapes (mobile uniquement) */}
                  {i < STEPS.length - 1 && (
                    <div
                      className="sm:hidden absolute -bottom-10 left-1/2 -translate-x-1/2 w-6 h-6 flex items-center justify-center rounded-full"
                      style={{ color: "var(--color-muted)" }}
                      aria-hidden
                    >
                      ↓
                    </div>
                  )}
                </div>

                <h3 className="font-extrabold text-base mb-2" style={{ color: "var(--color-text)" }}>
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--color-muted)" }}>
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA final */}
        <div className="flex justify-center mt-14">
          <Link
            href="/telecom/comparateur/"
            className="flex items-center gap-3 px-8 py-4 rounded-2xl text-white font-bold text-base transition-all hover:scale-[1.03] hover:shadow-xl active:scale-95 shadow-lg"
            style={{ background: "linear-gradient(135deg, var(--color-primary-dark) 0%, var(--color-primary) 100%)" }}
          >
            Je commence à comparer
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
