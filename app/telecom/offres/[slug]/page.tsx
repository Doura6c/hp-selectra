import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { PROVIDERS, OFFERS } from "@/lib/data/seed-data"
import OfferDetail from "@/components/compare/OfferDetail"

const VERTICAL = "telecom"
type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return OFFERS.filter((o) => o.verticalSlug === VERTICAL).map((o) => ({ slug: o.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const offer = OFFERS.find((o) => o.slug === slug && o.verticalSlug === VERTICAL)
  if (!offer) return {}
  const provider = PROVIDERS.find((p) => p.slug === offer.providerSlug)
  return {
    title: `${offer.name} — ${provider?.name ?? ""} | HP Selectra Guinée`,
    description: offer.description,
  }
}

export default async function TelecomOfferPage({ params }: Props) {
  const { slug } = await params
  const offer = OFFERS.find((o) => o.slug === slug && o.verticalSlug === VERTICAL)
  if (!offer) notFound()
  const provider = PROVIDERS.find((p) => p.slug === offer.providerSlug)
  if (!provider) notFound()

  return <OfferDetail offer={offer} provider={provider} verticalSlug={VERTICAL} />
}
