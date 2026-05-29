import type { Metadata } from "next"
import HeroSection from "@/components/home/HeroSection"
import VerticalCards from "@/components/home/VerticalCards"
import HowItWorks from "@/components/home/HowItWorks"
import AdvisorsSection from "@/components/home/AdvisorsSection"
import ArticlesSection from "@/components/home/ArticlesSection"
import LeadCTA from "@/components/home/LeadCTA"

export const metadata: Metadata = {
  title: "HP Selectra Guinée — Comparez les meilleures offres",
  description:
    "Comparateur indépendant de forfaits mobiles, mobile money, banques et assurances en Guinée. Conseillers Help'me Process à votre écoute — 100 % gratuit.",
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <VerticalCards />
      <HowItWorks />
      <AdvisorsSection />
      <ArticlesSection />
      <LeadCTA />
    </>
  )
}
