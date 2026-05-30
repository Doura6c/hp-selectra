import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { OFFERS, PROVIDERS } from "@/lib/data/seed-data"
import OfferDetail from "@/components/compare/OfferDetail"

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return OFFERS.filter((o) => o.verticalSlug === "fai").map((o) => ({ slug: o.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const offer = OFFERS.find((o) => o.slug === slug && o.verticalSlug === "fai")
  if (!offer) return {}
  const provider = PROVIDERS.find((p) => p.slug === offer.providerSlug)
  return {
    title: `${offer.name} — ${provider?.name ?? ""} | HP Selectra Guinée`,
    description: offer.description,
  }
}

export default async function FaiOfferPage({ params }: Props) {
  const { slug } = await params
  const offer = OFFERS.find((o) => o.slug === slug && o.verticalSlug === "fai")
  if (!offer) notFound()
  const provider = PROVIDERS.find((p) => p.slug === offer.providerSlug)
  if (!provider) notFound()

  return <OfferDetail offer={offer} provider={provider} verticalSlug="fai" />
}
