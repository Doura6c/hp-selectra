"use client"

import { useState } from "react"
import Link from "next/link"
import { OFFERS, PROVIDERS } from "@/lib/data/seed-data"
import { ArrowLeft, AlertTriangle, CheckCircle2, Edit2 } from "lucide-react"

export default function AdminOffresPage() {
  const [search, setSearch] = useState("")

  const filtered = OFFERS.filter(
    (o) =>
      o.name.toLowerCase().includes(search.toLowerCase()) ||
      o.providerSlug.includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--color-surface)" }}>
      <header className="border-b px-6 py-4 flex items-center gap-4" style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}>
        <Link href="/admin" className="flex items-center gap-2 text-sm" style={{ color: "var(--color-muted)" }}>
          <ArrowLeft className="w-4 h-4" /> Admin
        </Link>
        <span style={{ color: "var(--color-border)" }}>/</span>
        <span className="font-semibold text-sm" style={{ color: "var(--color-text)" }}>Offres & Tarifs</span>
      </header>

      <main className="p-6 max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-bold text-xl" style={{ color: "var(--color-text)" }}>Offres & Tarifs</h1>
          <div className="text-xs px-3 py-1.5 rounded-full" style={{ backgroundColor: "#FFFBEB", color: "var(--color-accent)" }}>
            ⚠️ {OFFERS.filter((o) => o.priceIsExample).length} tarifs à vérifier
          </div>
        </div>

        <input
          type="search"
          placeholder="Rechercher une offre…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border text-sm mb-6 outline-none"
          style={{ borderColor: "var(--color-border)" }}
        />

        <div className="rounded-xl border overflow-hidden" style={{ borderColor: "var(--color-border)" }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ backgroundColor: "var(--color-surface)" }}>
                <th className="text-left px-4 py-3 text-xs font-semibold" style={{ color: "var(--color-muted)" }}>OFFRE</th>
                <th className="text-left px-4 py-3 text-xs font-semibold" style={{ color: "var(--color-muted)" }}>FOURNISSEUR</th>
                <th className="text-left px-4 py-3 text-xs font-semibold" style={{ color: "var(--color-muted)" }}>TARIF</th>
                <th className="text-left px-4 py-3 text-xs font-semibold" style={{ color: "var(--color-muted)" }}>STATUT</th>
                <th className="text-left px-4 py-3 text-xs font-semibold" style={{ color: "var(--color-muted)" }}>HP SCORE</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((offer, i) => {
                const provider = PROVIDERS.find((p) => p.slug === offer.providerSlug)
                return (
                  <tr
                    key={offer.slug}
                    style={{
                      backgroundColor: i % 2 === 0 ? "var(--color-card)" : "var(--color-surface)",
                      borderTop: `1px solid var(--color-border)`,
                    }}
                  >
                    <td className="px-4 py-3">
                      <p className="font-medium" style={{ color: "var(--color-text)" }}>{offer.name}</p>
                      <p className="text-xs mt-0.5" style={{ color: "var(--color-muted)" }}>{offer.category}</p>
                    </td>
                    <td className="px-4 py-3" style={{ color: "var(--color-muted)" }}>{provider?.name ?? offer.providerSlug}</td>
                    <td className="px-4 py-3">
                      <p className="text-xs" style={{ color: "var(--color-text)" }}>{offer.priceNote}</p>
                    </td>
                    <td className="px-4 py-3">
                      {offer.priceIsExample ? (
                        <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full font-medium" style={{ backgroundColor: "#FFFBEB", color: "#C48A00" }}>
                          <AlertTriangle className="w-3 h-3" /> À vérifier
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full font-medium" style={{ backgroundColor: "var(--color-secondary-light)", color: "var(--color-secondary)" }}>
                          <CheckCircle2 className="w-3 h-3" /> Vérifié
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-bold text-sm" style={{ color: offer.hpScore === "A" ? "var(--color-secondary)" : offer.hpScore === "B" ? "#8FB84E" : "var(--color-accent)" }}>
                        {offer.hpScore}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg border transition-colors hover:opacity-80"
                        style={{ borderColor: "var(--color-border)", color: "var(--color-primary)" }}
                        onClick={() => alert(`Éditeur pour "${offer.name}" — à connecter à la base de données`)}
                      >
                        <Edit2 className="w-3 h-3" /> Éditer
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <p className="text-xs mt-4 text-center" style={{ color: "var(--color-muted)" }}>
          {filtered.length} offre{filtered.length > 1 ? "s" : ""} · L'édition complète (formulaire CRUD) sera connectée à la base de données lors du déploiement.
        </p>
      </main>
    </div>
  )
}
