import { Phone, MessageCircle, Star, Award } from "lucide-react"

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "224000000000"
const CC_PHONE  = process.env.NEXT_PUBLIC_CC_PHONE ?? "224000000000"

const ADVISORS = [
  { initials: "AM", name: "Amadou M.", specialite: "Télécom & Mobile Money", stars: 5, color: "var(--color-secondary)" },
  { initials: "KD", name: "Kadiatou D.", specialite: "Banques & Microfinance", stars: 5, color: "var(--color-primary)" },
  { initials: "FB", name: "Fanta B.", specialite: "Assurances & Énergie", stars: 5, color: "var(--color-accent)" },
]

export default function AdvisorsSection() {
  const waMsg = encodeURIComponent(
    "Bonjour, je suis sur HP Selectra et j'aimerais parler à un conseiller Help'me Process."
  )

  return (
    <section className="py-14 sm:py-20" style={{ backgroundColor: "var(--color-primary-light)" }}>
      <div className="container">

        {/* En-tête */}
        <div className="text-center mb-10">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold mb-4"
            style={{ backgroundColor: "var(--color-primary)", color: "#fff" }}
          >
            <Award className="w-3.5 h-3.5" />
            Call Center Help&apos;me Process
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-3" style={{ color: "var(--color-text)" }}>
            Vos conseillers à l'écoute
          </h2>
          <p className="text-sm max-w-xl mx-auto" style={{ color: "var(--color-muted)" }}>
            Derrière chaque comparaison, une équipe guinéenne experte vous accompagne
            pour finaliser votre choix et souscrire — par téléphone, WhatsApp ou rappel gratuit.
          </p>
        </div>

        {/* Cartes conseillers */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
          {ADVISORS.map((a) => (
            <div
              key={a.initials}
              className="rounded-2xl p-6 text-center border"
              style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}
            >
              {/* Avatar */}
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-extrabold text-white mx-auto mb-3 shadow-md"
                style={{ backgroundColor: a.color }}
              >
                {a.initials}
              </div>

              {/* Étoiles */}
              <div className="flex justify-center gap-0.5 mb-2">
                {Array.from({ length: a.stars }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" style={{ color: "var(--color-accent)" }} />
                ))}
              </div>

              <p className="font-bold text-sm mb-0.5" style={{ color: "var(--color-text)" }}>{a.name}</p>
              <p className="text-xs" style={{ color: "var(--color-muted)" }}>{a.specialite}</p>

              {/* Badge disponible */}
              <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium"
                style={{ backgroundColor: "var(--color-secondary-light)", color: "var(--color-secondary)" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                Disponible
              </div>
            </div>
          ))}
        </div>

        {/* Bloc comment ça marche */}
        <div
          className="rounded-2xl p-6 sm:p-8 grid sm:grid-cols-3 gap-6 mb-8"
          style={{ backgroundColor: "var(--color-card)", border: "1px solid var(--color-border)" }}
        >
          {[
            { step: "1", title: "Vous comparez", desc: "Utilisez le moteur HP Selectra pour trouver les meilleures offres selon vos critères." },
            { step: "2", title: "Vous contactez", desc: "WhatsApp, appel ou rappel gratuit — un conseiller Help'me Process prend en charge." },
            { step: "3", title: "Vous souscrivez", desc: "Le conseiller vous accompagne jusqu'à la souscription finale auprès du fournisseur." },
          ].map((item) => (
            <div key={item.step} className="flex gap-4">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-extrabold text-white shrink-0 mt-0.5"
                style={{ backgroundColor: "var(--color-primary)" }}
              >
                {item.step}
              </div>
              <div>
                <p className="font-bold text-sm mb-1" style={{ color: "var(--color-text)" }}>{item.title}</p>
                <p className="text-xs leading-relaxed" style={{ color: "var(--color-muted)" }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={`https://wa.me/${WA_NUMBER}?text=${waMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white transition-all hover:scale-[1.02]"
            style={{ backgroundColor: "var(--color-whatsapp)" }}
          >
            <MessageCircle className="w-4 h-4" />
            Parler à un conseiller
          </a>
          <a
            href={`tel:+${CC_PHONE}`}
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold border transition-all hover:scale-[1.02]"
            style={{ borderColor: "var(--color-primary)", color: "var(--color-primary)" }}
          >
            <Phone className="w-4 h-4" />
            Appeler le centre
          </a>
        </div>

        <p className="text-center text-xs mt-4" style={{ color: "var(--color-muted)" }}>
          Service gratuit pour les utilisateurs · Help'me Process, Call Center in Guinea
        </p>
      </div>
    </section>
  )
}
