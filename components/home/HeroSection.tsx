"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Search, ArrowRight, TrendingDown } from "lucide-react"

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "224628935335"

// Providers à afficher dans le widget héro (les stars de chaque verticale)
const HERO_COMPARISONS = [
  {
    vertical: "📱 Forfait mobile",
    href: "/telecom/comparateur/",
    items: [
      { name: "Orange Guinée",  score: "A", detail: "Pass 1 Go",    price: "30 000 GNF", color: "#FF6600", winner: true },
      { name: "Telecel Guinée", score: "B", detail: "Pass 1,5 Go",  price: "25 000 GNF", color: "#E30613" },
      { name: "Cellcom",        score: "C", detail: "Pass 500 Mo",  price: "15 000 GNF", color: "#0070C0" },
    ],
  },
  {
    vertical: "💸 Mobile Money",
    href: "/mobile-money/comparateur/",
    items: [
      { name: "Soutra Money",    score: "A", detail: "Transfert 1 %",  price: "Le + bas 🏆", color: "#6B8F3C", winner: true },
      { name: "Orange Money",    score: "B", detail: "Transfert 2–3 %", price: "réseau étendu", color: "#FF6600" },
      { name: "MTN MoMo",        score: "C", detail: "Transfert 2–3 %", price: "réseau Telecel", color: "#FFCC00" },
    ],
  },
  {
    vertical: "🏦 Banques",
    href: "/banques/comparateur/",
    items: [
      { name: "Ecobank",   score: "A", detail: "App mobile",   price: "Meilleure app", color: "#2D3E8C", winner: true },
      { name: "BICIGUI",   score: "B", detail: "Réseau dense", price: "BNP Paribas",   color: "#003087" },
      { name: "Orabank",   score: "B", detail: "20 agences",   price: "Oragroup",      color: "#E30613" },
    ],
  },
]

// Ticker : tous les opérateurs avec leur couleur
const TICKER_ITEMS = [
  { name: "Orange Guinée",   color: "#FF6600", init: "OG" },
  { name: "Soutra Money",    color: "#6B8F3C", init: "SM" },
  { name: "Ecobank",         color: "#2D3E8C", init: "EC" },
  { name: "Telecel Guinée",  color: "#E30613", init: "TG" },
  { name: "MTN MoMo",        color: "#FFCC00", init: "MT" },
  { name: "BICIGUI",         color: "#003087", init: "BI" },
  { name: "Orange Money",    color: "#FF6600", init: "OM" },
  { name: "Orabank",         color: "#E30613", init: "OR" },
  { name: "UBA Guinée",      color: "#B02840", init: "UB" },
  { name: "Orange Box",      color: "#FF6600", init: "OB" },
  { name: "Afribone",        color: "#1A5276", init: "AF" },
  { name: "ETI SA",          color: "#0E6655", init: "ET" },
  { name: "Cellcom",         color: "#0070C0", init: "CC" },
  { name: "Vista Bank",      color: "#0070C0", init: "VB" },
  { name: "Telecel Box",     color: "#E30613", init: "TB" },
  { name: "PayCard",         color: "#2D3E8C", init: "PC" },
]
// Double pour boucle infinie
const TICKER_DOUBLED = [...TICKER_ITEMS, ...TICKER_ITEMS]

const SCORE_COLORS: Record<string, string> = {
  A: "#6b8f3c", B: "#8fb84e", C: "#f0a500",
}

export default function HeroSection() {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [activeTab, setActiveTab] = useState(0)

  function submitSearch(e: React.FormEvent) {
    e.preventDefault()
    const q = query.trim()
    router.push(q ? `/recherche?q=${encodeURIComponent(q)}` : "/recherche")
  }

  const comp = HERO_COMPARISONS[activeTab]

  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: `linear-gradient(150deg, #0d1f3c 0%, #1d3461 45%, #1a4d70 100%)`,
        minHeight: "calc(100vh - 64px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {/* Cercles décoratifs flous */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #FF6600 0%, transparent 70%)" }} />
        <div className="absolute top-1/3 -right-24 w-80 h-80 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #6B8F3C 0%, transparent 70%)" }} />
        <div className="absolute -bottom-20 left-1/3 w-72 h-72 rounded-full opacity-8"
          style={{ background: "radial-gradient(circle, #F0A500 0%, transparent 70%)" }} />
        {/* Grille subtile */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,.4) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,.4) 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }} />
      </div>

      <div className="container relative py-12 sm:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* ── Colonne gauche ── */}
          <div>
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-sm font-semibold border border-white/15"
              style={{ backgroundColor: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.9)" }}
            >
              🇬🇳 Comparateur indépendant · Guinée
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] mb-5">
              Comparez,<br />
              <span style={{ color: "#F0A500" }}>économisez</span>,<br />
              <span style={{ color: "rgba(255,255,255,0.7)" }}>choisissez.</span>
            </h1>

            <p className="text-base sm:text-lg mb-8 max-w-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.72)" }}>
              Forfaits mobiles, mobile money, banques, internet — 21 opérateurs guinéens
              analysés et notés. Comparaison <strong className="text-white">100 % gratuite</strong>.
            </p>

            {/* Barre de recherche */}
            <form onSubmit={submitSearch} className="flex gap-2 mb-6 max-w-md">
              <div
                className="flex-1 flex items-center gap-2 px-4 py-3 rounded-xl"
                style={{ backgroundColor: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.18)" }}
              >
                <Search className="w-4 h-4 shrink-0" style={{ color: "rgba(255,255,255,0.5)" }} />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Orange Money, Box 4G, Ecobank…"
                  className="flex-1 outline-none text-sm bg-transparent text-white placeholder-white/40"
                />
              </div>
              <button
                type="submit"
                className="shrink-0 px-5 py-3 rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#F0A500" }}
              >
                OK
              </button>
            </form>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mb-8">
              <Link
                href="/telecom/comparateur/"
                className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:scale-[1.03] active:scale-95"
                style={{ backgroundColor: "#FF6600" }}
              >
                📱 Forfaits mobiles <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Bonjour HP Selectra, j'aimerais être conseillé pour choisir la meilleure offre.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:scale-[1.03] active:scale-95"
                style={{ backgroundColor: "#25D366" }}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Conseils WhatsApp
              </a>
            </div>

            {/* Trust pills */}
            <div className="flex flex-wrap gap-2">
              {["✅ 21 opérateurs", "📊 46 offres", "🔒 Indépendant", "🇬🇳 100 % gratuit"].map((pill) => (
                <span
                  key={pill}
                  className="text-xs px-3 py-1.5 rounded-full font-medium"
                  style={{ backgroundColor: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.75)", border: "1px solid rgba(255,255,255,0.12)" }}
                >
                  {pill}
                </span>
              ))}
            </div>
          </div>

          {/* ── Colonne droite : widget comparaison ── */}
          <div className="flex flex-col gap-4 lg:pl-4">
            {/* Tabs verticales */}
            <div className="flex gap-2 flex-wrap">
              {HERO_COMPARISONS.map((c, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTab(i)}
                  className="text-xs px-3 py-1.5 rounded-full font-semibold transition-all"
                  style={
                    activeTab === i
                      ? { backgroundColor: "#F0A500", color: "#fff" }
                      : { backgroundColor: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.65)", border: "1px solid rgba(255,255,255,0.15)" }
                  }
                >
                  {c.vertical}
                </button>
              ))}
            </div>

            {/* Widget comparaison */}
            <div
              className="rounded-2xl overflow-hidden shadow-2xl"
              style={{ backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}
            >
              {/* Header du widget */}
              <div className="px-5 py-4 flex items-center justify-between" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                <span className="text-sm font-bold text-white">{comp.vertical}</span>
                <span className="flex items-center gap-1 text-xs" style={{ color: "#F0A500" }}>
                  <TrendingDown className="w-3.5 h-3.5" /> HP Score
                </span>
              </div>

              {/* Lignes comparaison */}
              {comp.items.map((item, i) => (
                <div
                  key={item.name}
                  className="flex items-center gap-3 px-5 py-4 transition-colors"
                  style={{
                    borderBottom: i < comp.items.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
                    backgroundColor: item.winner ? "rgba(107,143,60,0.12)" : "transparent",
                  }}
                >
                  {/* Monogramme */}
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold text-white shrink-0 shadow-lg"
                    style={{ backgroundColor: item.color }}
                  >
                    {item.name.slice(0, 2).toUpperCase()}
                  </div>

                  {/* Infos */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <p className="text-sm font-semibold text-white truncate">{item.name}</p>
                      {item.winner && (
                        <span className="shrink-0 text-[10px] font-bold px-1.5 py-0.5 rounded-full" style={{ backgroundColor: "#6B8F3C", color: "#fff" }}>
                          #1
                        </span>
                      )}
                    </div>
                    <p className="text-xs truncate" style={{ color: "rgba(255,255,255,0.55)" }}>{item.detail}</p>
                  </div>

                  {/* Prix + score */}
                  <div className="text-right shrink-0">
                    <p className="text-xs font-semibold text-white">{item.price}</p>
                    <span
                      className="inline-block text-[11px] font-extrabold px-2 py-0.5 rounded mt-1"
                      style={{ backgroundColor: `${SCORE_COLORS[item.score]}25`, color: SCORE_COLORS[item.score], border: `1px solid ${SCORE_COLORS[item.score]}50` }}
                    >
                      {item.score}
                    </span>
                  </div>
                </div>
              ))}

              {/* Footer */}
              <Link
                href={comp.href}
                className="flex items-center justify-center gap-2 py-3.5 text-sm font-semibold transition-colors hover:opacity-90"
                style={{ backgroundColor: "rgba(255,255,255,0.08)", color: "#F0A500" }}
              >
                Voir toutes les offres <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Note disclaimer */}
            <p className="text-xs text-center" style={{ color: "rgba(255,255,255,0.35)" }}>
              ⚠️ Tarifs indicatifs — à vérifier auprès de l'opérateur
            </p>
          </div>
        </div>
      </div>

      {/* ── Ticker opérateurs ── */}
      <div
        className="relative border-t overflow-hidden py-3"
        style={{ backgroundColor: "rgba(0,0,0,0.3)", borderColor: "rgba(255,255,255,0.08)" }}
      >
        <div className="hp-marquee-track">
          {TICKER_DOUBLED.map((item, i) => (
            <div key={i} className="flex items-center gap-2 mx-5 shrink-0">
              <div
                className="w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold text-white shrink-0"
                style={{ backgroundColor: item.color }}
              >
                {item.init}
              </div>
              <span className="text-xs font-medium whitespace-nowrap" style={{ color: "rgba(255,255,255,0.6)" }}>
                {item.name}
              </span>
              <span className="ml-3 text-white/20">·</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
