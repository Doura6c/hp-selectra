import type { Metadata } from "next"
import { buildJsonLd, webSiteSchema } from "@/lib/schema"
import HeroSection from "@/components/home/HeroSection"
import VerticalCards from "@/components/home/VerticalCards"
import HowItWorks from "@/components/home/HowItWorks"
import AdvisorsSection from "@/components/home/AdvisorsSection"
import ArticlesSection from "@/components/home/ArticlesSection"
import LeadCTA from "@/components/home/LeadCTA"
import Reveal from "@/components/ui/Reveal"

export const metadata: Metadata = {
  title: "HP Selectra Guinée — Comparez les meilleures offres",
  description:
    "Comparateur indépendant de forfaits mobiles, mobile money, banques et assurances en Guinée. Conseillers Help'me Process à votre écoute — 100 % gratuit.",
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: buildJsonLd(webSiteSchema()) }}
      />
      <HeroSection />
      <Reveal><VerticalCards /></Reveal>
      <Reveal><HowItWorks /></Reveal>
      <Reveal><AdvisorsSection /></Reveal>
      <Reveal><ArticlesSection /></Reveal>
      <Reveal><LeadCTA /></Reveal>
    </>
  )
}
