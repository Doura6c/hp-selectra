"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "224000000000"

export default function HeroSection() {
  const router = useRouter()
  const [query, setQuery] = useState("")

  function submitSearch(e: React.FormEvent) {
    e.preventDefault()
    const q = query.trim()
    router.push(q ? `/recherche?q=${encodeURIComponent(q)}` : "/recherche")
  }

  return (
    <section
      className="relative overflow-hidden py-16 sm:py-24"
      style={{
        background: `linear-gradient(135deg, var(--color-primary-dark) 0%, var(--color-primary) 60%, var(--color-secondary-dark) 100%)`,
      }}
    >
      {/* Motif décoratif */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)`,
          backgroundSize: "20px 20px",
        }}
      />

      <div className="container relative">
        <div className="max-w-2xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-sm font-medium"
            style={{ backgroundColor: "rgba(255,255,255,0.15)", color: "#fff" }}>
            🇬🇳 Le comparateur indépendant de la Guinée
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-5 leading-tight">
            Comparez et économisez sur{" "}
            <span style={{ color: "var(--color-accent)" }}>tous vos services</span>
          </h1>

          <p className="text-base sm:text-lg mb-8 max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.8)" }}>
            Forfaits mobiles, mobile money, banques, assurances — trouvez la meilleure offre
            en Guinée en moins de 2 minutes. Comparaison 100 % gratuite et indépendante.
          </p>

          {/* Barre de recherche rapide */}
          <form onSubmit={submitSearch} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto mb-6">
            <div className="flex-1 flex items-center gap-2 px-4 py-3 rounded-xl bg-white shadow">
              <Search className="w-4 h-4 shrink-0" style={{ color: "var(--color-muted)" }} />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Que voulez-vous comparer ?"
                aria-label="Que voulez-vous comparer ?"
                className="flex-1 outline-none text-sm bg-transparent"
                style={{ color: "var(--color-text)" }}
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 rounded-xl text-sm font-semibold text-white text-center transition-opacity hover:opacity-90"
              style={{ backgroundColor: "var(--color-secondary)" }}
            >
              Comparer
            </button>
          </form>

          {/* CTA WhatsApp */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-sm">
            <a
              href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Bonjour HP Selectra, j'aimerais être conseillé pour choisir la meilleure offre.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: "var(--color-whatsapp)" }}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Conseils sur WhatsApp
            </a>
            <span style={{ color: "rgba(255,255,255,0.5)" }}>ou</span>
            <Link
              href="/contact/"
              className="text-white/80 hover:text-white underline underline-offset-2"
            >
              Demander un rappel gratuit
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
