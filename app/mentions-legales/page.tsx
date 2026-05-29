import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales de HP Selectra Guinée.",
}

export default function MentionsLegalesPage() {
  return (
    <div className="container py-12 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6" style={{ color: "var(--color-text)" }}>
        Mentions légales
      </h1>
      <div className="prose prose-sm space-y-4" style={{ color: "var(--color-muted)" }}>
        <section>
          <h2 className="text-base font-semibold mb-2" style={{ color: "var(--color-text)" }}>Éditeur du site</h2>
          <p>
            HP Selectra est un service édité par <strong>Help'me Process</strong> — Call Center in Guinea.
            Adresse : Conakry, République de Guinée.
          </p>
        </section>
        <section>
          <h2 className="text-base font-semibold mb-2" style={{ color: "var(--color-text)" }}>Objet du site</h2>
          <p>
            HP Selectra est un comparateur indépendant de services (télécom, mobile money, banques,
            assurances, énergie) destiné aux consommateurs et PME en Guinée. Les informations publiées
            ont un caractère indicatif et non contractuel.
          </p>
        </section>
        <section>
          <h2 className="text-base font-semibold mb-2" style={{ color: "var(--color-text)" }}>Tarifs d'exemple</h2>
          <p>
            Les tarifs marqués « à vérifier » sont des données d'exemple fournis à titre indicatif uniquement.
            HP Selectra ne garantit pas leur exactitude. Vérifiez toujours les conditions et tarifs actuels
            directement auprès du fournisseur concerné avant toute souscription.
          </p>
        </section>
        <section>
          <h2 className="text-base font-semibold mb-2" style={{ color: "var(--color-text)" }}>Responsabilité</h2>
          <p>
            HP Selectra décline toute responsabilité quant aux erreurs, inexactitudes ou omissions dans
            les informations publiées. Le comparateur ne se substitue pas au conseil d'un professionnel.
          </p>
        </section>
        <section>
          <h2 className="text-base font-semibold mb-2" style={{ color: "var(--color-text)" }}>Propriété intellectuelle</h2>
          <p>
            L'ensemble des contenus du site (textes, design, logo HP Selectra) est la propriété exclusive
            de Help'me Process. Toute reproduction sans autorisation préalable est interdite.
          </p>
        </section>
        <section>
          <h2 className="text-base font-semibold mb-2" style={{ color: "var(--color-text)" }}>Contact</h2>
          <p>Pour toute question : contactez-nous via WhatsApp ou le formulaire de contact du site.</p>
        </section>
      </div>
    </div>
  )
}
