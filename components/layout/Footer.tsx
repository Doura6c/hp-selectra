import Link from "next/link"

const FOOTER_LINKS = {
  Comparer: [
    { label: "Internet & Mobile", href: "/telecom/" },
    { label: "Mobile Money", href: "/mobile-money/" },
    { label: "Banques", href: "/banques/" },
    { label: "Internet Fixe (FAI)", href: "/fai/" },
    { label: "Assurances", href: "/assurances/" },
    { label: "Énergie & Solaire", href: "/energie/" },
  ],
  Outils: [
    { label: "Annuaire des entreprises", href: "/annuaire/" },
    { label: "Calculateur Mobile Money", href: "/outils/calculateur-mobile-money/" },
    { label: "Comparateur côte à côte", href: "/outils/comparer/" },
    { label: "Comparateur internet", href: "/fai/comparateur/" },
    { label: "Comparateur banques", href: "/banques/comparateur/" },
    { label: "Recherche toutes offres", href: "/recherche" },
    { label: "Conseiller gratuit", href: "/contact/" },
  ],
  "HP Selectra": [
    { label: "À propos", href: "/a-propos/" },
    { label: "Notre équipe d'experts", href: "/equipe/" },
    { label: "Méthodologie HP Score", href: "/methodologie/" },
    { label: "Actualités", href: "/actualites/" },
    { label: "Contact", href: "/contact/" },
    { label: "Mentions légales", href: "/mentions-legales/" },
    { label: "Données personnelles", href: "/confidentialite/" },
  ],
}

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "var(--color-primary-dark)", color: "#fff" }}>
      <div className="container py-12">
        {/* Logo + tagline */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-white font-bold text-xl tracking-tight">
              HP<span style={{ color: "var(--color-accent)" }}>·</span>Selectra
            </span>
            <span
              className="text-xs font-medium px-2 py-0.5 rounded-full"
              style={{ backgroundColor: "var(--color-secondary)", color: "#fff" }}
            >
              Guinée
            </span>
          </div>
          <p className="text-sm max-w-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
            Le comparateur indépendant pour les consommateurs guinéens. Comparez, choisissez, économisez.
          </p>
          <p className="text-xs mt-2" style={{ color: "rgba(255,255,255,0.4)" }}>
            Un service <strong>Help'me Process</strong> — Call Center in Guinea
          </p>
        </div>

        {/* Liens */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 mb-10">
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h3
                className="text-sm font-semibold mb-4 uppercase tracking-wider"
                style={{ color: "var(--color-accent)" }}
              >
                {title}
              </h3>
              <ul className="flex flex-col gap-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm transition-colors hover:text-white"
                      style={{ color: "rgba(255,255,255,0.6)" }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Régulateurs */}
        <div
          className="border-t pt-6 mb-6"
          style={{ borderColor: "rgba(255,255,255,0.1)" }}
        >
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
            Régulateurs de référence :{" "}
            <strong className="text-white/60">BCRG</strong> (Banque Centrale de la République de Guinée) ·{" "}
            <strong className="text-white/60">ARPT</strong> (Autorité de Régulation des Postes et Télécommunications)
          </p>
        </div>

        {/* Disclaimer */}
        <div
          className="border-t pt-6"
          style={{ borderColor: "rgba(255,255,255,0.1)" }}
        >
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
            © {new Date().getFullYear()} HP Selectra — Help'me Process. Tous droits réservés.
            Les tarifs marqués « à vérifier » sont des données d'exemple non contractuelles.
            Vérifiez toujours les conditions auprès du fournisseur avant toute souscription.
          </p>
        </div>
      </div>
    </footer>
  )
}
