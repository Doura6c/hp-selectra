import type { Metadata } from "next"
import { faqSchema, breadcrumbSchema, buildJsonLd } from "@/lib/schema"

export const metadata: Metadata = {
  title: "Meilleur internet fixe en Guinée 2026 — Comparatif FAI | HP Selectra",
  description:
    "Comparez les offres internet fixe (box 4G, ADSL, fibre, satellite) en Guinée. Classement HP Score, tarifs et conseils gratuits Help'me Process.",
}

const faqJsonLd = buildJsonLd(faqSchema([
  { question: "Quel est le meilleur fournisseur internet fixe en Guinée ?", answer: "Orange Guinée (HP Score A) domine avec sa box 4G fiable et son réseau national étendu. Pour les entreprises, GUILAB et Telco offrent des solutions dédiées avec garanties de débit." },
  { question: "Quelle est la différence entre box 4G et ADSL en Guinée ?", answer: "La box 4G utilise le réseau mobile pour la connexion internet, sans infrastructure filaire — plus flexible et disponible partout. L'ADSL passe par la ligne téléphonique fixe — généralement plus stable mais limité aux zones câblées." },
  { question: "Y a-t-il la fibre optique en Guinée ?", answer: "La fibre optique est disponible dans certaines zones de Conakry principalement pour les entreprises et zones résidentielles haut de gamme. Le déploiement grand public est en cours selon les plans de l'ARPT." },
  { question: "Quel débit internet peut-on espérer en Guinée ?", answer: "En box 4G, les débits varient de 5 à 50 Mbps selon l'opérateur et la zone. Les offres ADSL offrent 2 à 8 Mbps. La fibre peut atteindre 100 Mbps dans les zones couvertes. Nos conseillers peuvent vous orienter selon votre localisation." },
]))

const breadcrumbJsonLd = buildJsonLd(breadcrumbSchema([
  { name: "Accueil", href: "/" },
  { name: "Internet Fixe", href: "/fai/" },
  { name: "Comparateur" },
]))

export default function FaiComparateurLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd }} />
      {children}
    </>
  )
}
