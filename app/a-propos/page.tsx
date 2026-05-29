import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "À propos — HP Selectra Guinée",
  description: "HP Selectra est le comparateur indépendant de services en Guinée, édité par Help'me Process.",
}

export default function AProposPage() {
  return (
    <div className="container py-12 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6" style={{ color: "var(--color-text)" }}>À propos de HP Selectra</h1>

      <div className="space-y-6 text-sm" style={{ color: "var(--color-muted)" }}>
        <section>
          <h2 className="text-base font-semibold mb-2" style={{ color: "var(--color-text)" }}>Notre mission</h2>
          <p>
            HP Selectra est un comparateur indépendant créé pour aider les consommateurs et les PME
            guinéens à faire les meilleurs choix dans leurs services du quotidien : télécom, mobile money,
            banque, assurance et énergie.
          </p>
          <p className="mt-2">
            Notre objectif : transparence totale. Chaque note HP Score est calculée automatiquement
            selon des critères publiés. Aucun fournisseur ne peut acheter une meilleure note.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold mb-2" style={{ color: "var(--color-text)" }}>Help'me Process</h2>
          <p>
            HP Selectra est un service édité par <strong>Help'me Process</strong>, call center basé en Guinée.
            Forts de notre expérience dans l'accompagnement client sur le marché guinéen, nous avons créé
            ce comparateur pour donner aux Guinéens les outils nécessaires pour comparer et choisir
            en toute connaissance de cause.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold mb-2" style={{ color: "var(--color-text)" }}>Le HP Score</h2>
          <p>
            Chaque offre reçoit une note de A (excellent) à E (déconseillé), calculée selon des
            critères spécifiques à chaque secteur : tarifs, couverture, services inclus, avis clients.
            Les pondérations sont publiques.{" "}
            <Link href="/methodologie/" style={{ color: "var(--color-primary)" }} className="underline">
              Lire la méthodologie complète →
            </Link>
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold mb-2" style={{ color: "var(--color-text)" }}>Indépendance éditoriale</h2>
          <p>
            Les fournisseurs peuvent acheter une mise en avant (badge « Sponsorisé »), mais cela
            n'influence jamais le HP Score. Notre comparateur est gratuit pour les utilisateurs
            et financé par des commissions sur les mises en relation et des abonnements fournisseurs.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold mb-2" style={{ color: "var(--color-text)" }}>Nous contacter</h2>
          <p>
            Pour toute question, demande de partenariat ou signalement d'erreur dans nos données :{" "}
            <Link href="/contact/" style={{ color: "var(--color-primary)" }} className="underline">
              formulaire de contact
            </Link>{" "}
            ou WhatsApp via le bouton flottant.
          </p>
        </section>
      </div>
    </div>
  )
}
