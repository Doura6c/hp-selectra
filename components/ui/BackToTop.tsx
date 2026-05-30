"use client"

import { useState, useEffect } from "react"
import { ArrowUp } from "lucide-react"

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 300)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Retour en haut de page"
      className="
        fixed z-[60] animate-hp-pop
        flex items-center gap-2
        px-4 py-2.5
        rounded-full
        font-semibold text-sm text-white
        hover:scale-105 active:scale-95 transition-transform
        bottom-[152px] right-4
        sm:bottom-24 sm:right-5
      "
      style={{
        backgroundColor: "var(--color-primary)",
        boxShadow: "0 6px 24px rgba(0,0,0,0.22)",
      }}
    >
      <ArrowUp className="w-4 h-4 shrink-0" />
      <span>Haut de page</span>
    </button>
  )
}
