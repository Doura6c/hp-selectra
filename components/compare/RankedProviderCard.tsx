"use client"

import { useState } from "react"
import Link from "next/link"
import { Globe, ChevronDown, ChevronUp, CheckCircle2, XCircle, Award, MessageCircle } from "lucide-react"
import HPScoreBadge from "@/components/ui/HPScoreBadge"
import type { ProviderData, OfferData } from "@/lib/data/seed-data"

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "224628935335"

const SCORE_STARS: Record<string, number> = { A: 5, B: 4, C: 3, D: 2, E: 1 }
const SCORE_BG: Record<string, string> = {
  A: "linear-gradient(135deg, #e8f5d0 0%, #f0f9e0 100%)",
  B: "linear-gradient(135deg, #eef9e6 0%, #f5fced 100%)",
  C: "linear-gradient(135deg, #fff8e1 0%, #fffde7 100%)",
  D: "linear-gradient(135deg, #fff3e0 0%, #fff8f0 100%)",
  E: "linear-gradient(135deg, #fde8e8 0%, #fff0f0 100%)",
}

type Props = {
  provider: ProviderData
  rank: number
  verticalSlug: string
  topOffers?: OfferData[]
  isRecommended?: boolean
}

export default function RankedProviderCard({
  provider,
  rank,
  verticalSlug,
  topOffers = [],
  isRecommended = false,
}: Props) {
  const [expanded, setExpanded] = useState(false)
  const stars = SCORE_STARS[provider.hpScore] ?? 3
  const bg = SCORE_BG[provider.hpScore] ?? SCORE_BG.C

  const waText = encodeURIComponent(
    `Bonjour, je suis intéressé par ${provider.name} (${verticalSlug}). Pouvez-vous me conseiller ?`
  )

  const bestOffer = topOffers[0]

  return (
    <article
      className="rounded-2xl overflow-hidden transition-shadow hover:shadow-xl"
      style={{
        border: isRecommended ? "2px solid var(--color-secondary)" : "1px solid var(--color-border)",
        backgroundColor: "var(--color-card)",
      }}
      id={`provider-${provider.slug}`}
    >
      {/* Bandeau recommandé */}
      {isRecommended && (
        <div
          className="flex items-center justify-between px-5 py-2.5 text-xs font-bold text-white"
          style={{ backgroundColor: "var(--color-secondary)" }}
        >
          <div className="flex items-center gap-2">
            <Award className="w-3.5 h-3.5" />
            🏆 Recommandé par HP Selectra
          </div>
          <span className="opacity-80">{new Date().getFullYear()}</span>
        </div>
      )}

      {/* Corps principal */}
      <div className="grid md:grid-cols-[220px_1fr_200px] gap-0">

        {/* ── Colonne gauche : identité provider ── */}
        <div
          className="flex flex-col items-center justify-center p-6 gap-3"
          style={{ background: bg, borderRight: "1px solid var(--color-border)" }}
        >
          {/* Rang */}
          <div
            className="absolute md:relative text-xs font-extrabold px-2 py-0.5 rounded-full text-white self-start md:self-center"
            style={{ backgroundColor: rank === 1 ? "#F0A500" : rank === 2 ? "#6b7280" : "#9ca3af" }}
          >
            #{rank}
          </div>

          {/* Monogramme */}
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-extrabold text-white shadow-lg"
            style={{ backgroundColor: provider.brandColor ?? "var(--color-primary)" }}
          >
            {provider.name.slice(0, 2).toUpperCase()}
          </div>

          {/* Nom */}
          <div className="text-center">
            <p className="font-extrabold text-base leading-tight" style={{ color: "var(--color-text)" }}>
              {provider.name}
            </p>
            {provider.tagline && (
              <p className="text-xs mt-1 leading-snug" style={{ color: "var(--color-muted)" }}>
                {provider.tagline}
              </p>
            )}
          </div>

          {/* HP Score + étoiles */}
          <div className="flex flex-col items-center gap-1.5">
            <HPScoreBadge score={provider.hpScore} showLabel size="lg" />
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} className="w-3.5 h-3.5" viewBox="0 0 20 20" fill={i < stars ? "#F0A500" : "#E5E7EB"}>
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-[11px]" style={{ color: "var(--color-muted)" }}>
              {provider.hpScoreNum}/100
            </p>
          </div>
        </div>

        {/* ── Colonne milieu : avantages / inconvénients ── */}
        <div className="p-6">
          <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--color-muted)" }}>
            {provider.description}
          </p>

          {/* Pros */}
          {provider.pros && provider.pros.length > 0 && (
            <ul className="space-y-2 mb-3">
              {provider.pros.slice(0, expanded ? provider.pros.length : 4).map((p) => (
                <li key={p} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "var(--color-secondary)" }} />
                  <span style={{ color: "var(--color-text)" }}>{p}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Cons */}
          {provider.cons && provider.cons.length > 0 && (
            <ul className="space-y-1.5 mb-3">
              {provider.cons.map((c) => (
                <li key={c} className="flex items-start gap-2 text-sm">
                  <XCircle className="w-4 h-4 mt-0.5 shrink-0 opacity-60" style={{ color: "var(--color-danger)" }} />
                  <span style={{ color: "var(--color-muted)" }}>{c}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Expand / collapse */}
          {provider.pros && provider.pros.length > 4 && (
            <button
              onClick={() => setExpanded((e) => !e)}
              className="flex items-center gap-1 text-xs font-semibold mt-2 transition-opacity hover:opacity-70"
              style={{ color: "var(--color-primary)" }}
            >
              {expanded ? (
                <><ChevronUp className="w-3.5 h-3.5" /> Voir moins</>
              ) : (
                <><ChevronDown className="w-3.5 h-3.5" /> Voir plus d&apos;avantages</>
              )}
            </button>
          )}

          {/* Top offre en bas si disponible */}
          {bestOffer && (
            <div
              className="mt-4 p-3 rounded-xl border text-xs flex items-center gap-3"
              style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-surface)" }}
            >
              <div>
                <p className="font-semibold" style={{ color: "var(--color-text)" }}>
                  🌟 Meilleure offre : {bestOffer.name}
                </p>
                <p style={{ color: "var(--color-muted)" }}>
                  {bestOffer.priceNote}
                  {bestOffer.priceIsExample && " ⚠️ à vérifier"}
                </p>
              </div>
              <Link
                href={`/${verticalSlug}/offres/${bestOffer.slug}/`}
                className="ml-auto shrink-0 text-xs font-semibold px-3 py-1.5 rounded-lg"
                style={{ backgroundColor: "var(--color-primary-light)", color: "var(--color-primary)" }}
              >
                Détails
              </Link>
            </div>
          )}
        </div>

        {/* ── Colonne droite : prix + CTAs ── */}
        <div
          className="flex flex-col justify-center gap-3 p-6 border-t md:border-t-0 md:border-l"
          style={{ borderColor: "var(--color-border)" }}
        >
          {/* Tarif indicatif */}
          {bestOffer && (
            <div className="text-center pb-3 border-b" style={{ borderColor: "var(--color-border)" }}>
              <p className="text-xs uppercase tracking-wide mb-1" style={{ color: "var(--color-muted)" }}>
                À partir de
              </p>
              <p className="text-xl font-extrabold" style={{ color: "var(--color-primary)" }}>
                {bestOffer.priceNote}
              </p>
              {bestOffer.priceIsExample && (
                <p className="text-[10px] mt-0.5" style={{ color: "var(--color-warning)" }}>
                  ⚠️ Tarif indicatif
                </p>
              )}
            </div>
          )}

          {/* CTA site officiel */}
          {provider.website ? (
            <a
              href={provider.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: provider.brandColor ?? "var(--color-primary)" }}
            >
              <Globe className="w-4 h-4" />
              Voir le site
            </a>
          ) : (
            <Link
              href={`/${verticalSlug}/fournisseurs/${provider.slug}/`}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: provider.brandColor ?? "var(--color-primary)" }}
            >
              Voir la fiche
            </Link>
          )}

          {/* CTA WhatsApp conseiller */}
          <a
            href={`https://wa.me/${WA_NUMBER}?text=${waText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: "var(--color-whatsapp)" }}
          >
            <MessageCircle className="w-4 h-4" />
            Être conseillé
          </a>

          {/* Fiche détail */}
          <Link
            href={`/${verticalSlug}/fournisseurs/${provider.slug}/`}
            className="text-center text-xs py-2 transition-opacity hover:opacity-70 underline underline-offset-2"
            style={{ color: "var(--color-muted)" }}
          >
            Voir toutes les offres →
          </Link>
        </div>
      </div>

      {/* Disclaimer sponsored */}
      {provider.sponsoredTier === "gold" && (
        <div className="px-5 py-2 text-[11px] border-t" style={{ borderColor: "var(--color-border)", color: "var(--color-muted)", backgroundColor: "var(--color-surface)" }}>
          🌟 Ce fournisseur est partenaire de HP Selectra — notre notation reste indépendante.
        </div>
      )}
    </article>
  )
}
