"use client"

import { useState } from "react"
import Link from "next/link"
import { PROVIDERS, OFFERS, VERTICALS } from "@/lib/data/seed-data"
import HPScoreBadge from "@/components/ui/HPScoreBadge"
import { Globe, CheckCircle, ExternalLink, ArrowRight } from "lucide-react"

const LIVE_VERTICALS = VERTICALS.filter((v) => v.isLive)

const VERTICAL_LABELS: Record<string, { icon: string; color: string }> = {
  telecom: { icon: "📱", color: "#1D3461" },
  "mobile-money": { icon: "💸", color: "#6B8F3C" },
  banques: { icon: "🏦", color: "#003087" },
  fai: { icon: "🌐", color: "#0070C0" },
}

export default function AnnuairePage() {
  const [activeTab, setActiveTab] = useState("all")

  const displayedProviders =
    activeTab === "all"
      ? PROVIDERS.filter((p) => LIVE_VERTICALS.some((v) => v.slug === p.verticalSlug))
          .sort((a, b) => b.hpScoreNum - a.hpScoreNum)
      : PROVIDERS.filter((p) => p.verticalSlug === activeTab)
          .sort((a, b) => b.hpScoreNum - a.hpScoreNum)

  const totalByVertical = (slug: string) =>
    PROVIDERS.filter((p) => p.verticalSlug === slug).length

  return (
    <>
      {/* Hero */}
      <section
        className="py-12 sm:py-16"
        style={{
          background: `linear-gradient(135deg, var(--color-primary-dark) 0%, var(--color-primary) 100%)`,
        }}
      >
        <div className="container">
          <nav className="text-sm mb-4" style={{ color: "rgba(255,255,255,0.6)" }}>
            <Link href="/" className="hover:text-white">Accueil</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Annuaire des entreprises</span>
          </nav>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white mb-2">
            Annuaire des entreprises — Guinée
          </h1>
          <p className="text-base max-w-xl" style={{ color: "rgba(255,255,255,0.8)" }}>
            Retrouvez toutes les entreprises référencées sur HP Selectra : opérateurs télécom,
            services mobile money, banques et fournisseurs internet en Guinée.
          </p>
          <div className="mt-4 flex items-center gap-3">
            <span
              className="inline-flex items-center gap-1 text-sm font-semibold px-3 py-1.5 rounded-full text-white"
              style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
            >
              {PROVIDERS.filter((p) => LIVE_VERTICALS.some((v) => v.slug === p.verticalSlug)).length} entreprises référencées
            </span>
            <span
              className="inline-flex items-center gap-1 text-sm font-semibold px-3 py-1.5 rounded-full text-white"
              style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
            >
              {LIVE_VERTICALS.length} secteurs
            </span>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div
        className="sticky top-16 z-30 border-b overflow-x-auto"
        style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}
      >
        <div className="container">
          <div className="flex items-center gap-1 py-2 min-w-max">
            <button
              onClick={() => setActiveTab("all")}
              className="px-4 py-2 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap"
              style={{
                backgroundColor: activeTab === "all" ? "var(--color-primary)" : "transparent",
                color: activeTab === "all" ? "#fff" : "var(--color-muted)",
              }}
            >
              Tous ({PROVIDERS.filter((p) => LIVE_VERTICALS.some((v) => v.slug === p.verticalSlug)).length})
            </button>
            {LIVE_VERTICALS.map((v) => (
              <button
                key={v.slug}
                onClick={() => setActiveTab(v.slug)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap"
                style={{
                  backgroundColor: activeTab === v.slug ? "var(--color-primary)" : "transparent",
                  color: activeTab === v.slug ? "#fff" : "var(--color-muted)",
                }}
              >
                <span>{VERTICAL_LABELS[v.slug]?.icon ?? "🏢"}</span>
                {v.name}
                <span
                  className="text-[10px] px-1.5 py-0.5 rounded-full font-bold"
                  style={{
                    backgroundColor: activeTab === v.slug ? "rgba(255,255,255,0.25)" : "var(--color-border)",
                    color: activeTab === v.slug ? "#fff" : "var(--color-muted)",
                  }}
                >
                  {totalByVertical(v.slug)}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grille */}
      <section className="py-10">
        <div className="container">
          {activeTab !== "all" && (
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm" style={{ color: "var(--color-muted)" }}>
                {displayedProviders.length} entreprise{displayedProviders.length > 1 ? "s" : ""} dans ce secteur — classées par HP Score
              </p>
              <Link
                href={`/${activeTab}/comparateur/`}
                className="flex items-center gap-1 text-sm font-semibold"
                style={{ color: "var(--color-primary)" }}
              >
                Comparer les offres <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayedProviders.map((provider) => {
              const offerCount = OFFERS.filter(
                (o) => o.providerSlug === provider.slug && o.verticalSlug === provider.verticalSlug
              ).length
              const vertical = LIVE_VERTICALS.find((v) => v.slug === provider.verticalSlug)
              const vMeta = VERTICAL_LABELS[provider.verticalSlug]

              return (
                <div
                  key={provider.slug}
                  className="rounded-2xl border overflow-hidden transition-shadow hover:shadow-md"
                  style={{
                    borderColor: "var(--color-border)",
                    backgroundColor: "var(--color-card)",
                  }}
                >
                  {/* Bandeau secteur */}
                  <div
                    className="px-4 py-1.5 flex items-center gap-1.5 text-[11px] font-semibold text-white"
                    style={{ backgroundColor: vMeta?.color ?? "var(--color-primary)" }}
                  >
                    <span>{vMeta?.icon ?? "🏢"}</span>
                    {vertical?.name ?? provider.verticalSlug}
                  </div>

                  <div className="p-5">
                    {/* Identité */}
                    <div className="flex items-start gap-3 mb-4">
                      <div
                        className="w-14 h-14 rounded-xl flex items-center justify-center text-xl font-bold text-white shrink-0"
                        style={{ backgroundColor: provider.brandColor ?? "var(--color-primary)" }}
                      >
                        {provider.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <h3 className="font-bold text-sm truncate" style={{ color: "var(--color-text)" }}>
                            {provider.name}
                          </h3>
                          {provider.verified && (
                            <CheckCircle className="w-3.5 h-3.5 text-green-500 shrink-0" />
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <HPScoreBadge score={provider.hpScore} size="sm" />
                          {offerCount > 0 && (
                            <span className="text-[11px]" style={{ color: "var(--color-muted)" }}>
                              {offerCount} offre{offerCount > 1 ? "s" : ""}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p
                      className="text-xs line-clamp-2 mb-4"
                      style={{ color: "var(--color-muted)" }}
                    >
                      {provider.description}
                    </p>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-2">
                      {provider.website ? (
                        <a
                          href={provider.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-white transition-opacity hover:opacity-90"
                          style={{ backgroundColor: provider.brandColor ?? "var(--color-primary)" }}
                        >
                          <Globe className="w-3 h-3" /> Site officiel
                          <ExternalLink className="w-2.5 h-2.5 opacity-70" />
                        </a>
                      ) : (
                        <span
                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium"
                          style={{ backgroundColor: "var(--color-border)", color: "var(--color-muted)" }}
                        >
                          Site non référencé
                        </span>
                      )}
                      <Link
                        href={`/${provider.verticalSlug}/fournisseurs/${provider.slug}/`}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors hover:bg-surface"
                        style={{ borderColor: "var(--color-border)", color: "var(--color-text)" }}
                      >
                        Fiche <ArrowRight className="w-3 h-3" />
                      </Link>
                      {offerCount > 0 && (
                        <Link
                          href={`/${provider.verticalSlug}/comparateur/`}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold"
                          style={{ color: "var(--color-secondary)" }}
                        >
                          {offerCount} offre{offerCount > 1 ? "s" : ""}
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Note de transparence */}
      <div className="container pb-10">
        <div
          className="rounded-xl p-5 text-sm"
          style={{ backgroundColor: "var(--color-primary-light)", color: "var(--color-muted)" }}
        >
          <p className="font-semibold mb-1" style={{ color: "var(--color-text)" }}>
            📋 À propos de cet annuaire
          </p>
          <p>
            Cet annuaire recense les entreprises dont les offres sont comparées sur HP Selectra.
            Les données (sites, descriptions, HP Score) sont à titre indicatif et mises à jour
            régulièrement. Pour signaler une erreur ou référencer une entreprise,{" "}
            <Link href="/contact/" className="underline" style={{ color: "var(--color-primary)" }}>
              contactez-nous
            </Link>.
          </p>
        </div>
      </div>
    </>
  )
}
