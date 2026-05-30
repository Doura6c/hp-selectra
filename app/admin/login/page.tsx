"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Lock } from "lucide-react"
import { Suspense } from "react"

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const from = searchParams.get("from") ?? "/admin"

  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      })
      if (res.ok) {
        router.push(from)
        router.refresh()
      } else {
        setError("Mot de passe incorrect.")
      }
    } catch {
      setError("Erreur réseau.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label className="block text-xs font-medium mb-1" style={{ color: "var(--color-muted)" }}>
          Mot de passe administrateur
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoFocus
          placeholder="••••••••"
          className="w-full px-4 py-3 rounded-xl border text-sm outline-none"
          style={{ borderColor: "var(--color-border)", color: "var(--color-text)" }}
        />
      </div>
      {error && (
        <p className="text-sm font-medium" style={{ color: "#DC2626" }}>
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={loading}
        className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
        style={{ backgroundColor: "var(--color-primary)" }}
      >
        <Lock className="w-4 h-4" />
        {loading ? "Connexion…" : "Accéder à l'admin"}
      </button>
    </form>
  )
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div
        className="w-full max-w-sm rounded-2xl border p-8 shadow-xl"
        style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}
      >
        <div className="text-center mb-6">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3"
            style={{ backgroundColor: "var(--color-primary)" }}
          >
            <Lock className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-xl font-extrabold" style={{ color: "var(--color-text)" }}>
            HP Selectra Admin
          </h1>
          <p className="text-xs mt-1" style={{ color: "var(--color-muted)" }}>
            Accès réservé à Help&apos;me Process
          </p>
        </div>
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  )
}
