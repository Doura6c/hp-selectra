import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Politique de confidentialité — HP Selectra Guinée",
  description: "Politique de protection des données personnelles de HP Selectra.",
}

export default function ConfidentialitePage() {
  return (
    <div className="container py-12 max-w-2xl">
      <nav className="text-sm mb-6" style={{ color: "var(--color-muted)" }}>
        <Link href="/" style={{ color: "var(--color-primary)" }}>Accueil</Link>
        <span className="mx-2">/</span>
        <span>Données personnelles</span>
      </nav>
      <h1 className="text-2xl font-bold mb-8" style={{ color: "var(--color-text)" }}>Politique de confidentialité</h1>

      <div className="space-y-8 text-sm" style={{ color: "var(--color-muted)" }}>
        <section>
          <h2 className="text-base font-semibold mb-3" style={{ color: "var(--color-text)" }}>1. Responsable du traitement</h2>
          <p><strong>Help'me Process</strong> — Call Center in Guinea<br />
          Conakry, République de Guinée<br />
          Contact : <Link href="/contact/" style={{ color: "var(--color-primary)" }}>formulaire de contact</Link></p>
        </section>

        <section>
          <h2 className="text-base font-semibold mb-3" style={{ color: "var(--color-text)" }}>2. Données collectées</h2>
          <p>Nous collectons uniquement les données que vous nous fournissez volontairement :</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Nom, numéro de téléphone, email (formulaires de contact et de rappel)</li>
            <li>Message libre (formulaire de contact)</li>
            <li>Email (inscription newsletter)</li>
            <li>Données de navigation anonymisées (pages vues, temps de session)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-semibold mb-3" style={{ color: "var(--color-text)" }}>3. Finalités</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Vous rappeler sur votre demande expresse (rappel gratuit)</li>
            <li>Vous orienter vers le fournisseur le plus adapté (mise en relation)</li>
            <li>Vous envoyer notre newsletter (sur abonnement volontaire)</li>
            <li>Améliorer nos services (statistiques anonymes)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-semibold mb-3" style={{ color: "var(--color-text)" }}>4. Conservation</h2>
          <p>Vos données de contact sont conservées 12 mois à compter de votre dernière interaction.
          Les données newsletter sont conservées jusqu'à désinscription.</p>
        </section>

        <section>
          <h2 className="text-base font-semibold mb-3" style={{ color: "var(--color-text)" }}>5. Vos droits</h2>
          <p>Vous pouvez à tout moment demander l'accès, la rectification ou la suppression de vos données
          en nous contactant via le <Link href="/contact/" style={{ color: "var(--color-primary)" }}>formulaire de contact</Link> ou par WhatsApp.</p>
        </section>

        <section>
          <h2 className="text-base font-semibold mb-3" style={{ color: "var(--color-text)" }}>6. Cookies</h2>
          <p>Notre site utilise uniquement des cookies techniques nécessaires au fonctionnement (session).
          Aucun cookie publicitaire tiers n'est déposé.</p>
        </section>

        <p className="text-xs pt-4 border-t" style={{ borderColor: "var(--color-border)" }}>
          Dernière mise à jour : mai 2026
        </p>
      </div>
    </div>
  )
}
